---
title: "Server API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/server/test/main.cpp_ as needed.
   
    ```cpp
    // the path of the root certificate
    const std::string GATEWAY_CA_FILE = "../cert/gateway/ca.crt";

    // the address of the gateway
    const std::string GATEWAY_ADDR = "192.168.0.2";
    const int GATEWAY_PORT = 4000;
    
    // the ip address of the target device
    const std::string DEVICE_IP = "192.168.0.110";
    const int DEVICE_PORT = 51211;
    const bool USE_SSL = false;
    ```
6. Build and run.
 
    * Windows
    
      ```
      cmake .
      ```

      Open _testServer.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testServer
      ```

    * Linux

      ```
      cmake .
      make testServer
      ./testServer
      ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```cpp
  auto gatewayClient = std::make_shared<GatewayClient>();
  gatewayClient->Connect(GATEWAY_ADDR, GATEWAY_PORT, GATEWAY_CA_FILE);

  ConnectSvc connectSvc(gatewayClient->GetChannel());

  ConnectInfo connInfo;
  connInfo.set_ipaddr(DEVICE_IP);
  connInfo.set_port(DEVICE_PORT);
  connInfo.set_usessl(USE_SSL);

  uint32_t deviceID = 0;
  connectSvc.Connect(connInfo, &deviceID);
  ```  

## 2. Subscribe

To receive requests from devices, you have to configure the related options [as described]({{'/api/server/' | relative_url}}#RelatedOptions), first.

  ```cpp
  AuthConfig testConfig;
  testConfig.CopyFrom(origConfig);
  testConfig.set_useservermatching(true);

  authSvc.SetConfig(deviceID, testConfig);
  ```

Then, you have to subscribe to the request channel.

  ```cpp
  ClientContext context;
  auto reqReader(serverSvc.Subscribe(&context, QUEUE_SIZE));
  ```

## 3. Handle verification requests

With server matching enabled, the device will send a verification request to the gateway when it reads a card. You can implement your own logic and return its result to the device using [HandleVerify]({{'/api/server/' | relative_url}}#handleverify).

  ```cpp
  void handleVerify(ServerSvc& serverSvc, std::unique_ptr<ClientReader<ServerRequest>> reqReader) {
    ServerRequest req;

    while (reqReader->Read(&req)) {
      if(s_ReturnError) { // emulate authentication failure
        serverSvc.HandleVerify(req, ServerErrorCode::VERIFY_FAIL, NULL);
      } else { // emulate authentication success
        UserHdr hdr;
        hdr.set_id(TEST_USER_ID);
        hdr.set_numofcard(1);

        CSNCardData card;
        *card.mutable_data() = req.verifyreq().carddata();

        UserInfo userInfo;
        *userInfo.mutable_hdr() = hdr;
        *userInfo.add_cards() = card;

        serverSvc.HandleVerify(req, ServerErrorCode::SUCCESS, &userInfo);
      }
    }
  }

  auto serverThread(std::thread(handleVerify, std::ref(serverSvc), std::move(reqReader)));
  ```

## 4. Handle identification requests

With server matching enabled, the device will send an identification request to the gateway when it reads a fingerprint. You can implement your own logic and return its result to the device using [HandleIdentify]({{'/api/server/' | relative_url}}#handleidentify).

  ```cpp
  void handleIdentify(ServerSvc& serverSvc, std::unique_ptr<ClientReader<ServerRequest>> reqReader) {
    ServerRequest req;

    while (reqReader->Read(&req)) {
      if(s_ReturnError) { // emulate authentication failure
        serverSvc.HandleIdentify(req, ServerErrorCode::IDENTIFY_FAIL, NULL);
      } else { // emulate authentication success 
        UserHdr hdr;
        hdr.set_id(TEST_USER_ID);
        hdr.set_numoffinger(1);

        FingerData finger;
        *finger.add_templates() = req.identifyreq().templatedata();
        *finger.add_templates() = req.identifyreq().templatedata();

        UserInfo userInfo;
        *userInfo.mutable_hdr() = hdr;
        *userInfo.add_fingers() = finger;

        serverSvc.HandleIdentify(req, ServerErrorCode::SUCCESS, &userInfo);
      }
    }

    std::cout << "Server thread is stopped" << std::endl;
    reqReader->Finish();
  }

  auto serverThread(std::thread(handleIdentify, std::ref(serverSvc), std::move(reqReader)));
  ```

