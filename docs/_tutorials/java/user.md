---
title: "User API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/user/test/UserTest.java_ as needed.
   
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
    ./build/install/java/bin/userTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```   

## 2. Change the auth configuration

To test the authentication modes of the test user, [AuthConfig.usePrivateAuth]({{'/api/auth' | relative_url}}#AuthConfig) will be enabled. 

  ```java
  AuthConfig origConfig = authSvc.getConfig(deviceID);

  // Enable private authentication for test
  AuthConfig testConfig = origConfig.toBuilder().setUsePrivateAuth(true).build();
  authSvc.setConfig(deviceID, testConfig);
  ```

## 3. Enroll users

Enroll a test user and set the authentication modes. For brevity, the example sets only the simple authentication modes. You can test [all the modes]({{'/api/auth' | relative_url}}#AuthMode) by changing these values. 

  ```java
  String newUserID = String.format("%d", Instant.now().getEpochSecond());
  List<UserInfo> newUsers = new ArrayList<UserInfo>();
  UserHdr hdr = UserHdr.newBuilder().setID(newUserID).build();
  UserSetting setting;

  if(deviceType == Type.FACESTATION_F2 || deviceType == Type.FACESTATION_F2_FP) {
    setting = UserSetting.newBuilder()
                .setCardAuthExtMode(AuthMode.AUTH_EXT_MODE_CARD_ONLY_VALUE)
                .setFingerAuthExtMode(AuthMode.AUTH_EXT_MODE_FINGERPRINT_ONLY_VALUE)
                .setFaceAuthExtMode(AuthMode.AUTH_EXT_MODE_FACE_ONLY_VALUE)
                .build();
  } else {
    setting = UserSetting.newBuilder()
                .setCardAuthMode(AuthMode.AUTH_MODE_CARD_ONLY_VALUE)
                .setBiometricAuthMode(AuthMode.AUTH_MODE_BIOMETRIC_ONLY_VALUE)
                .build();
  }

  newUsers.add(UserInfo.newBuilder().setHdr(hdr).setSetting(setting).build());
  userSvc.enroll(deviceID, newUsers);
  ```

## 4. Add credentials to users

Add cards, fingerprints, or faces to the test user. To know the supported credentials of each device, you can use [Device.GetCapabilityInfo]({{'/api/device' | relative_url}}#getcapabilityinfo). For added credentials, check whether you can authenticate them on the device. 

  ```java
    CapabilityInfo capInfo = null;
    capInfo = userTest.deviceSvc.getCapabilityInfo(deviceID);

    if(capInfo.getCardSupported()) {
      CardTest cardTest = new CardTest(userTest.cardSvc, userTest.userSvc);
      cardTest.test(deviceID, userID);
    } 

    if(capInfo.getFingerSupported()) {
      FingerTest fingerTest = new FingerTest(userTest.fingerSvc, userTest.userSvc);
      fingerTest.test(deviceID, userID);
    }    
    
    if(capInfo.getFaceSupported()) {
      FaceTest faceTest = new FaceTest(userTest.faceSvc, userTest.userSvc);
      faceTest.test(deviceID, userID);
    }  
  ```
  
  ```java
  CardData cardData = cardSvc.scan(deviceID);

  List<UserCard> userCards = new ArrayList<UserCard>();
  userCards.add(UserCard.newBuilder().setUserID(userID).addCards(cardData.getCSNCardData()).build());
  userSvc.setCard(deviceID, userCards);

  KeyInput.pressEnter(">> Try to authenticate the enrolled card. And, press ENTER to end the test.\n");
  ```

  ```java
  List<ByteString> templateData = new ArrayList<ByteString>();
  for(int i = 0; i < NUM_OF_TEMPLATE; i++) {
    templateData.add(fingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD));
  }

  FingerData fingerData = FingerData.newBuilder().addAllTemplates(templateData).build();
  List<UserFinger> userFingers = new ArrayList<UserFinger>();
  userFingers.add(UserFinger.newBuilder().setUserID(userID).addFingers(fingerData).build());
  userSvc.setFinger(deviceID, userFingers);

  KeyInput.pressEnter(">> Try to authenticate the enrolled finger. And, press ENTER to end the test.\n");
  ```

  ```java
  FaceData faceData = faceSvc.scan(deviceID, FaceEnrollThreshold.BS2_FACE_ENROLL_THRESHOLD_DEFAULT);

  List<UserFace> userFaces = new ArrayList<UserFace>();
  userFaces.add(UserFace.newBuilder().setUserID(userID).addFaces(faceData).build());
  userSvc.setFace(deviceID, userFaces);

  KeyInput.pressEnter(">> Try to authenticate the enrolled face. And, press ENTER to end the test.\n");
  ```

## 5. Test the authentication modes

You can set the authentication modes of a device using [AuthConfig]({{'/api/auth' | relative_url}}#AuthConfig). 

At this step, __AuthConfig.usePrivateAuth__ is set to false. In other words, these authentication modes will be applied to all the users.
{: .notice--info}

  ```java
  AuthConfig config;  

  if(deviceType == Type.FACESTATION_F2 || deviceType == Type.FACESTATION_F2_FP) {
    config = AuthConfig.newBuilder().setMatchTimeout(10).setAuthTimeout(15)
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_EXT_MODE_CARD_ONLY).setScheduleID(1)) // Card Only, Always
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_EXT_MODE_FINGERPRINT_ONLY).setScheduleID(1)) // Fingerprint Only, Always
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_EXT_MODE_FACE_ONLY).setScheduleID(1)) // Face Only, Always
              .build();
  } else {
    config = AuthConfig.newBuilder().setMatchTimeout(10).setAuthTimeout(15)
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_MODE_CARD_ONLY).setScheduleID(1)) // Card Only, Always
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_MODE_BIOMETRIC_ONLY).setScheduleID(1)) // Biometric Only, Always
              .build();
  }

  authSvc.setConfig(deviceID, config);

  KeyInput.pressEnter(">> Try to authenticate card or fingerprint or face. And, press ENTER for the next test.\n");

  if(deviceType == Type.FACESTATION_F2 || deviceType == Type.FACESTATION_F2_FP) {
    config = AuthConfig.newBuilder().setMatchTimeout(10).setAuthTimeout(15)
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_EXT_MODE_CARD_FACE).setScheduleID(1)) // Card + Face, Always
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_EXT_MODE_CARD_FINGERPRINT).setScheduleID(1)) // Card + Fingerprint, Always
              .build();
  } else {
    config = AuthConfig.newBuilder().setMatchTimeout(10).setAuthTimeout(15)
              .addAuthSchedules(AuthSchedule.newBuilder().setMode(AuthMode.AUTH_MODE_CARD_BIOMETRIC).setScheduleID(1)) // Card + Biometric, Always
              .build();
  }

  authSvc.setConfig(deviceID, config);

  KeyInput.pressEnter(">> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER to end the test.\n");    
  ```

## 6. Get the event logs

You can apply filters when reading log records. In a filter, userID or [eventCode]({{'/api/event' | relative_url}}#EventCode) can be specified.

  ```java
  EventFilter filter = EventFilter.newBuilder().setUserID(userID).build();
  List<EventLog> events = eventSvc.getLogWithFilter(deviceID, firstEventID, 0, filter);

  // do something with the events

  filter = EventFilter.newBuilder().setUserID(userID).setEventCode(0x1000).build(); // BS2_EVENT_VERIFY_SUCCESS
  events = eventSvc.getLogWithFilter(deviceID, firstEventID, 0, filter);

  // do something with the events
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```java
  CancellableContext monitoringCtx = Context.current().withCancellation();
  Context prevCtx = monitoringCtx.attach();

  eventSvc.setCancellableContext(monitoringCtx);

  SubscribeRealtimeLogRequest subscribeRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).addDeviceIDs(deviceID).build();
  Iterator<EventLog> eventStream = eventSvc.getStub().subscribeRealtimeLog(subscribeRequest);

  while(eventStream.hasNext()) {
    EventLog eventLog = eventStream.next();
    eventSvc.getEventCallback().handle(eventLog);
  }
  ```

