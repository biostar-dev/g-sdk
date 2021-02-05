---
title: "Server API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/server/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/server/test/Program.cs_ as needed.
   
    ```csharp
    // the path of the root certificate
    private const string GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt";

    // the address of the gateway
    private const string GATEWAY_ADDR = "192.168.0.2";
    private const int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private const string DEVICE_ADDR = "192.168.0.110";
    private const int DEVICE_PORT = 51211;
    ```
6. Build and run.

    ```
    cd example/server/test
    dotnet run
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```csharp
  GatewayClient gatewayClient = new GatewayClient();
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  var connectInfo = new ConnectInfo{ IPAddr = DEVICE_ADDR, Port = DEVICE_PORT, UseSSL = USE_SSL };
  uint devID = userTest.connectSvc.Connect(connectInfo); 
  ```  

## 2. Subscribe

To receive requests from devices, you have to configure the related options [as described]({{'/api/server/' | relative_url}}#RelatedOptions), first.

  ```csharp
  var testConfig = origAuthConfig.Clone();
  testConfig.UseServerMatching = true;

  authSvc.SetConfig(deviceID, testConfig);
  ```

Then, you have to subscribe to the request channel.

  ```csharp
  var reqStream = serverSvc.Subscribe(QUEUE_SIZE);
  ```

## 3. Handle verification requests

With server matching enabled, the device will send a verification request to the gateway when it reads a card. You can implement your own logic and return its result to the device using [HandleVerify]({{'/api/server/' | relative_url}}#handleverify).

  ```csharp
  async void HandleVerify(IAsyncStreamReader<ServerRequest> reqStream, CancellationToken token) {
    try {
      while(await reqStream.MoveNext(token)) {
        var serverReq = reqStream.Current;

        if(returnError) { // emulate authentication failure
          serverSvc.HandleVerify(serverReq, ServerErrorCode.VerifyFail, null);
        } else { // emulate authentication success
          var userInfo = new UserInfo{ Hdr = new UserHdr{ ID = TEST_USER_ID, NumOfCard = 1 } };
          userInfo.Cards.Add(new CSNCardData{ Data = serverReq.VerifyReq.CardData });
          serverSvc.HandleVerify(serverReq, ServerErrorCode.Success, userInfo);
        }
      }
    } 
  }
  
  CancellationTokenSource cancelToken = new CancellationTokenSource();
  HandleVerify(reqStream, cancelToken.Token);
  ```

## 4. Handle identification requests

With server matching enabled, the device will send an identification request to the gateway when it reads a fingerprint. You can implement your own logic and return its result to the device using [HandleIdentify]({{'/api/server/' | relative_url}}#handleidentify).

  ```csharp
  async void HandleIdentify(IAsyncStreamReader<ServerRequest> reqStream, CancellationToken token) {
    try {
      while(await reqStream.MoveNext(token)) {
        var serverReq = reqStream.Current;

        if(returnError) { // emulate authentication failure
          serverSvc.HandleIdentify(serverReq, ServerErrorCode.IdentifyFail, null);
        } else { // emulate authentication success
          var fingerData = new FingerData();
          fingerData.Templates.Add(serverReq.IdentifyReq.TemplateData);
          fingerData.Templates.Add(serverReq.IdentifyReq.TemplateData);
          
          var userInfo = new UserInfo{ Hdr = new UserHdr{ ID = TEST_USER_ID, NumOfFinger = 1 } };
          userInfo.Fingers.Add(fingerData);
          serverSvc.HandleIdentify(serverReq, ServerErrorCode.Success, userInfo);
        }
      }
    }

  CancellationTokenSource cancelToken = new CancellationTokenSource();
  HandleIdentify(reqStream, cancelToken.Token);    
  ```

