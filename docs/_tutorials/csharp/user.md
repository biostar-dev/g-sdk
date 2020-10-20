---
title: "User API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/user/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/user/test/Program.cs_ as needed.
   
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
    cd example/user/test
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

## 2. Change the auth configuration

To test the authentication modes of the test user, [AuthConfig.usePrivateAuth]({{'/api/auth' | relative_url}}#AuthConfig) will be enabled. 

  ```csharp
  AuthConfig origConfig = authSvc.GetConfig(deviceID);

  // Enable private authentication for test
  AuthConfig testConfig = origConfig.Clone();
  testConfig.UsePrivateAuth = true;
  authSvc.SetConfig(deviceID, testConfig);
  ```

## 3. Enroll users

Enroll a test user and set the authentication modes. For brevity, the example sets only the simple authentication modes. You can test [all the modes]({{'/api/auth' | relative_url}}#AuthMode) by changing these values. 

  ```csharp
  string newUserID = string.Format("{0}", DateTimeOffset.UtcNow.ToUnixTimeSeconds());
  UserInfo newUser = new UserInfo{ Hdr = new UserHdr{ ID = newUserID } };

  if(deviceType == Device.Type.FacestationF2 || deviceType == Device.Type.FacestationF2Fp) {
    newUser.Setting = new UserSetting{ CardAuthExtMode = (uint)AuthMode.AuthExtModeCardOnly, FingerAuthExtMode = (uint)AuthMode.AuthExtModeFingerprintOnly, FaceAuthExtMode = (uint)AuthMode.AuthExtModeFaceOnly };
  } else {
    newUser.Setting = new UserSetting{ CardAuthMode = (uint)AuthMode.CardOnly, BiometricAuthMode = (uint)AuthMode.BiometricOnly };
  }

  userSvc.Enroll(deviceID, new UserInfo[]{ newUser });
  ```

## 4. Add credentials to users

Add cards, fingerprints, or faces to the test user. To know the supported credentials of each device, you can use [Device.GetCapabilityInfo]({{'/api/device' | relative_url}}#getcapabilityinfo). For added credentials, check whether you can authenticate them on the device. 

  ```csharp
  CapabilityInfo capInfo = userTest.deviceSvc.GetCapabilityInfo(devID);

  if(capInfo.CardSupported) {
    new CardTest(userTest.cardSvc, userTest.userSvc).Test(devID, newUserID);
  } 

  if(capInfo.FingerSupported) {
    new FingerTest(userTest.fingerSvc, userTest.userSvc).Test(devID, newUserID);
  }       

  if(capInfo.FaceSupported) {
    new FaceTest(userTest.faceSvc, userTest.userSvc).Test(devID, newUserID);
  }    
  ```
  
  ```csharp
  var cardData = cardSvc.Scan(deviceID);
  var userCard = new UserCard{ UserID = userID };
  userCard.Cards.Add( cardData.CSNCardData );
  userSvc.SetCard(deviceID, new UserCard[]{ userCard });

  KeyInput.PressEnter(">> Try to authenticate the enrolled card. And, press ENTER to end the test." + Environment.NewLine);
  ```

  ```csharp
  var templateData = new ByteString[NUM_OF_TEMPLATE];
  for(int i = 0; i < NUM_OF_TEMPLATE; i++) {
    templateData[i] =  fingerSvc.Scan(deviceID, TemplateFormat.Suprema, QUALITY_THRESHOLD);
  }

  var fingerData = new FingerData();
  fingerData.Templates.AddRange(templateData);

  var userFinger = new UserFinger{ UserID = userID };
  userFinger.Fingers.Add( fingerData );
  userSvc.SetFinger(deviceID, new UserFinger[]{ userFinger });

  KeyInput.PressEnter(">> Try to authenticate the enrolled finger. And, press ENTER to end the test." + Environment.NewLine);
  ```

  ```csharp
  var faceData = faceSvc.Scan(deviceID, FaceEnrollThreshold.Bs2FaceEnrollThresholdDefault);
  var userFace = new UserFace{ UserID = userID };
  userFace.Faces.Add( faceData );
  userSvc.SetFace(deviceID, new UserFace[]{ userFace });

  KeyInput.PressEnter(">> Try to authenticate the enrolled face. And, press ENTER to end the test." + Environment.NewLine);
  ```

## 5. Test the authentication modes

You can set the authentication modes of a device using [AuthConfig]({{'/api/auth' | relative_url}}#AuthConfig). 

At this step, __AuthConfig.usePrivateAuth__ is set to false. In other words, these authentication modes will be applied to all the users.
{: .notice--info}

  ```csharp
  AuthConfig config = new AuthConfig{ MatchTimeout = 10, AuthTimeout = 15 };

  if(deviceType == Device.Type.FacestationF2 || deviceType == Device.Type.FacestationF2Fp) {
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.AuthExtModeCardOnly, ScheduleID = 1 }); // Card Only, Always
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.AuthExtModeFingerprintOnly, ScheduleID = 1 }); // Fingerprint Only, Always
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.AuthExtModeFaceOnly, ScheduleID = 1 }); // Face Only, Always
  } else {
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.CardOnly, ScheduleID = 1 }); // Card Only, Always
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.BiometricOnly, ScheduleID = 1 }); // Biometric Only, Always
  }

  authSvc.SetConfig(deviceID, config);

  KeyInput.PressEnter(">> Try to authenticate card or fingerprint or face. And, press ENTER for the next test." + Environment.NewLine);

  config.AuthSchedules.Clear();

  if(deviceType == Device.Type.FacestationF2 || deviceType == Device.Type.FacestationF2Fp) {
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.AuthExtModeCardFace, ScheduleID = 1 }); // Card + Face, Always
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.AuthExtModeCardFingerprint, ScheduleID = 1 }); // Card + Fingerprint, Always
  } else {
    config.AuthSchedules.Add(new AuthSchedule{ Mode = AuthMode.CardBiometric, ScheduleID = 1 }); // Card + Biometric, Always
  }

  authSvc.SetConfig(deviceID, config);

  KeyInput.PressEnter(">> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER for the next test." + Environment.NewLine);      
  ```

## 6. Get the event logs

You can apply filters when reading log records. In a filter, userID or [eventCode]({{'/api/event' | relative_url}}#EventCode) can be specified.

  ```csharp
  var filter = new EventFilter{ UserID = userID };
  var events = eventSvc.GetLogWithFilter(deviceID, firstEventID, 0, filter);

  // do something with the events

  filter.EventCode = 0x1000; // BS2_EVENT_VERIFY_SUCCESS
  events = eventSvc.GetLogWithFilter(deviceID, firstEventID, 0, filter);

  // do something with the events
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```csharp
  var enableRequest = new EnableMonitoringRequest{ DeviceID = deviceID };
  eventClient.EnableMonitoring(enableRequest);

  var subscribeRequest = new SubscribeRealtimeLogRequest{ DeviceIDs = {deviceID}, QueueSize = MONITORING_QUEUE_SIZE };
  var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

  cancellationTokenSource = new CancellationTokenSource();

  ReceiveEvents(this, call.ResponseStream, cancellationTokenSource.Token);

  static async void ReceiveEvents(EventSvc svc, IAsyncStreamReader<EventLog> stream, CancellationToken token) {
    while(await stream.MoveNext(token)) {
      var eventLog = stream.Current;

      if(svc.callback != null) {
        svc.callback(eventLog);
      } 
    }
  }  
  ```

