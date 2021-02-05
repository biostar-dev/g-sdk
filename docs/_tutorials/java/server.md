---
title: "Server API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/server/test/ServerTest.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String GATEWAY_CA_FILE = "cert/gateway/ca.crt";

    // the address of the gateway
    private static final String GATEWAY_ADDR = "192.168.0.2";
    private static final int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private static final String DEVICE_ADDR = "192.168.0.110"; 
    private static final int DEVICE_PORT = 51211;
    ```
6. Build.

    ```
    ./gradlew installDist
    ```
7. Run.
   
    ```
    ./build/install/java/bin/serverTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Subscribe

To receive requests from devices, you have to configure the related options [as described]({{'/api/server/' | relative_url}}#RelatedOptions), first.

  ```java
  AuthConfig testConfig = origConfig.toBuilder().setUseServerMatching(true).build();
  authSvc.setConfig(deviceID, testConfig);
  ```

Then, you have to subscribe to the request channel.

  ```java
  subscriptionCtx = Context.current().withCancellation();
  restoreCtx = subscriptionCtx.attach();

  Iterator<ServerRequest> requestStream = serverSvc.subscribe(QUEUE_SIZE);
  ```

## 3. Handle verification requests

With server matching enabled, the device will send a verification request to the gateway when it reads a card. You can implement your own logic and return its result to the device using [HandleVerify]({{'/api/server/' | relative_url}}#handleverify).

  ```java
  while(requestStream.hasNext()) {
    ServerRequest req = requestStream.next();

    if(returnError) { // emulate authentication failure
      serverSvc.handleVerify(req, ServerErrorCode.VERIFY_FAIL, null);
    } else { // emulate authentication success
      ArrayList<CSNCardData> cards = new ArrayList<CSNCardData>();
      cards.add(CSNCardData.newBuilder().setData(req.getVerifyReq().getCardData()).build());

      UserInfo userInfo = UserInfo.newBuilder()
                            .setHdr(UserHdr.newBuilder().setID(TEST_USER_ID).setNumOfCard(1).build())
                            .addAllCards(cards)
                            .build();

      serverSvc.handleVerify(req, ServerErrorCode.SUCCESS, userInfo);
    }
  }
  ```

## 4. Handle identification requests

With server matching enabled, the device will send an identification request to the gateway when it reads a fingerprint. You can implement your own logic and return its result to the device using [HandleIdentify]({{'/api/server/' | relative_url}}#handleidentify).

  ```java
  while(requestStream.hasNext()) {
    ServerRequest req = requestStream.next();

    if(returnError) { // emulate authentication failure
      serverSvc.handleIdentify(req, ServerErrorCode.IDENTIFY_FAIL, null);
    } else { // emulate authentication success
      ArrayList<FingerData> fingers = new ArrayList<FingerData>();
      fingers.add(FingerData.newBuilder().addTemplates(req.getIdentifyReq().getTemplateData()).addTemplates(req.getIdentifyReq().getTemplateData()).build());

      UserInfo userInfo = UserInfo.newBuilder()
                            .setHdr(UserHdr.newBuilder().setID(TEST_USER_ID).setNumOfFinger(1).build())
                            .addAllFingers(fingers)
                            .build();

      serverSvc.handleIdentify(req, ServerErrorCode.SUCCESS, userInfo);
    }
  }
  ```

