---
title: "Server API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/server/test/test.js_ as needed.
   
    ```javascript
    // the path of the root certificate
    const GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt';

    // the address of the gateway
    const GATEWAY_IP = '192.168.0.2';
    const GATEWAY_PORT = 4000;

    // the ip address of the target device
    const DEVICE_IP = '192.168.0.110';
    const DEVICE_PORT = 51211;
    const USE_SSL = false;
    ```
5. Install packages.

    ```
    npm install
    ```
6. Run.
   
    ```
    cd example/server/test
    node test.js
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```javascript
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);

  var deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);
  ```   

## 2. Subscribe

To receive requests from devices, you have to configure the related options [as described]({{'/api/server/' | relative_url}}#RelatedOptions), first.

  ```javascript
  const testAuthConfig = origAuthConfig.cloneMessage();
  testAuthConfig.setUseservermatching(true);

  await auth.setConfig(devID, testAuthConfig);
  ```

Then, you have to subscribe to the request channel.

  ```javascript
  const sub = await server.subscribe(QUEUE_SIZE);
  ```

## 3. Handle verification requests

With server matching enabled, the device will send a verification request to the gateway when it reads a card. You can implement your own logic and return its result to the device using [HandleVerify]({{'/api/server/' | relative_url}}#handleverify).

  ```javascript
  sub.on('data', (req) => {
    if(returnError) { // emulate authentication failure
      server.handleVerify(req, server.serverMessage.ServerErrorCode.VERIFY_FAIL, null);
    } else { // emulate authentication success
      const userHdr = new user.userMessage.UserHdr();
      userHdr.setId(TEST_USER_ID);
      userHdr.setNumofcard(1);

      const cardData = new card.cardMessage.CSNCardData();
      cardData.setData(req.getVerifyreq().getCarddata());
      
      const userInfo = new user.userMessage.UserInfo();
      userInfo.setHdr(userHdr);
      userInfo.addCards(cardData);
      
      server.handleVerify(req, server.serverMessage.ServerErrorCode.SUCCESS, userInfo);
    }
  });
  ```

## 4. Handle identification requests

With server matching enabled, the device will send an identification request to the gateway when it reads a fingerprint. You can implement your own logic and return its result to the device using [HandleIdentify]({{'/api/server/' | relative_url}}#handleidentify).

  ```javascript
  sub.on('data', (req) => {
    if(returnError) { // emulate authentication failure
      server.handleIdentify(req, server.serverMessage.ServerErrorCode.IDENTIFY_FAIL, null);
    } else { // emulate authentication success
      const userHdr = new user.userMessage.UserHdr();
      userHdr.setId(TEST_USER_ID);
      userHdr.setNumoffinger(1);

      const fingerData = new finger.fingerMessage.FingerData();
      fingerData.addTemplates(req.getIdentifyreq().getTemplatedata());
      fingerData.addTemplates(req.getIdentifyreq().getTemplatedata());
      
      const userInfo = new user.userMessage.UserInfo();
      userInfo.setHdr(userHdr);
      userInfo.addFingers(fingerData);
      
      server.handleIdentify(req, server.serverMessage.ServerErrorCode.SUCCESS, userInfo);
    }
  });
  ```

