---
title: "Server API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/server/test/test.py_ as needed.
   
    ```python
    # the path of the root certificate
    GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt'

    # the ip address of the gateway
    GATEWAY_IP = '192.168.0.2'
    GATEWAY_PORT = 4000

    # the ip address of the target device
    DEVICE_IP = '192.168.0.110'
    DEVICE_PORT = 51211
    USE_SSL = False
    ```
5. Run.
   
    ```
    cd example/server/test
    python test.py
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```python
  client = GatewayClient(GATEWAY_IP, GATEWAY_PORT, GATEWAY_CA_FILE)
  channel = client.getChannel()
  
  connectSvc = ConnectSvc(channel)
  connInfo = connect_pb2.ConnectInfo(IPAddr=DEVICE_IP, port=DEVICE_PORT, useSSL=USE_SSL)

  devID = connectSvc.connect(connInfo)
  ```   

## 2. Subscribe

To receive requests from devices, you have to configure the related options [as described]({{'/api/server/' | relative_url}}#RelatedOptions), first.

  ```python
  testConfig = auth_pb2.AuthConfig()
  testConfig.CopyFrom(origAuthConfig)
  testConfig.useServerMatching = True

  self.authSvc.setConfig(deviceID, testConfig)
  ```

Then, you have to subscribe to the request channel.

  ```python
  self.reqCh = self.serverSvc.subscribe(QUEUE_SIZE)
  ```

## 3. Handle verification requests

With server matching enabled, the device will send a verification request to the gateway when it reads a card. You can implement your own logic and return its result to the device using [HandleVerify]({{'/api/server/' | relative_url}}#handleverify).

  ```python
  def handleVerify(self):
    try:
      for req in self.reqCh:
        if self.returnError: # emulate authentication failure
          self.serverSvc.handleVerify(req, server_pb2.VERIFY_FAIL, None)
        else: # emulate authentication success
          userHdr = user_pb2.UserHdr(ID=TEST_USER_ID, numOfCard=1)
          cardData = card_pb2.CSNCardData(data=req.verifyReq.cardData)
          userInfo = user_pb2.UserInfo(hdr=userHdr, cards=[cardData])

          self.serverSvc.handleVerify(req, server_pb2.SUCCESS, userInfo)
  
  verifyThread = threading.Thread(target=self.handleVerify)
  verifyThread.start()
  ```

## 4. Handle identification requests

With server matching enabled, the device will send an identification request to the gateway when it reads a fingerprint. You can implement your own logic and return its result to the device using [HandleIdentify]({{'/api/server/' | relative_url}}#handleidentify).

  ```python
  def handleIdentify(self):
    try:
      for req in self.reqCh:
        if self.returnError: # emulate authentication failure
          self.serverSvc.handleIdentify(req, server_pb2.IDENTIFY_FAIL, None)
        else: # emulate authentication success
          userHdr = user_pb2.UserHdr(ID=TEST_USER_ID, numOfFinger=1)
          fingerData = finger_pb2.FingerData(templates=[req.identifyReq.templateData, req.identifyReq.templateData,])
          userInfo = user_pb2.UserInfo(hdr=userHdr, fingers=[fingerData])

          self.serverSvc.handleIdentify(req, server_pb2.SUCCESS, userInfo)

  identifyThread = threading.Thread(target=self.handleIdentify)
  identifyThread.start()    
  ```

