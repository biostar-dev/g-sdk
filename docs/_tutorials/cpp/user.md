---
title: "User API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/user/test/main.cpp_ as needed.
   
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

      Open _testUser.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testUser
      ```

    * Linux

      ```
      cmake .
      make testUser
      ./testUser
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

## 2. Change the auth configuration

To test the authentication modes of the test user, [AuthConfig.usePrivateAuth]({{'/api/auth' | relative_url}}#AuthConfig) will be enabled. 

  ```cpp
  auto origConfig = std::make_shared<AuthConfig>();
  svc.GetConfig(deviceID, origConfig.get());

  // Enable private authentication for test
  AuthConfig config;
  config.CopyFrom(*origConfig.get());

  config.set_useprivateauth(true);
  svc.SetConfig(deviceID, config);
  ```

## 3. Enroll users

Enroll a test user and set the authentication modes. For brevity, the example sets only the simple authentication modes. You can test [all the modes]({{'/api/auth' | relative_url}}#AuthMode) by changing these values. 

  ```cpp
  RepeatedPtrField<UserInfo> newUserInfos;

  UserInfo userInfo;
  std::string userID = std::to_string(std::time(0));
  *userInfo.mutable_hdr()->mutable_id() = userID;

  UserSetting setting;
  if(deviceType == device::FACESTATION_F2 || deviceType == device::FACESTATION_F2_FP) {
    setting.set_cardauthextmode(auth::AUTH_EXT_MODE_CARD_ONLY);
    setting.set_fingerauthextmode(auth::AUTH_EXT_MODE_FINGERPRINT_ONLY);
    setting.set_faceauthextmode(auth::AUTH_EXT_MODE_FACE_ONLY);
  } else {
    setting.set_cardauthmode(auth::AUTH_MODE_CARD_ONLY);
    setting.set_biometricauthmode(auth::AUTH_MODE_BIOMETRIC_ONLY);
  }  

  *userInfo.mutable_setting() = setting;
  newUserInfos.Add(std::forward<UserInfo>(userInfo));

  svc.Enroll(deviceID, newUserInfos);
  ```

## 4. Add credentials to users

Add cards, fingerprints, or faces to the test user. To know the supported credentials of each device, you can use [Device.GetCapabilityInfo]({{'/api/device' | relative_url}}#getcapabilityinfo). For added credentials, check whether you can authenticate them on the device. 

  ```cpp
  DeviceSvc deviceSvc(gatewayClient->GetChannel());
  CapabilityInfo capInfo;
  deviceSvc.GetCapabilityInfo(deviceID, &capInfo);

  if(capInfo.cardsupported()) {
    CardSvc cardSvc(gatewayClient->GetChannel());
    testCard(cardSvc, userSvc, deviceID, userID);
  } 

  if(capInfo.fingersupported()) {
    FingerSvc fingerSvc(gatewayClient->GetChannel());
    testFinger(fingerSvc, userSvc, deviceID, userID);
  } 

  if(capInfo.facesupported()) {
    FaceSvc faceSvc(gatewayClient->GetChannel());
    testFace(faceSvc, userSvc, deviceID, userID);
  } 
  ```
  
  ```cpp
  CardData cardData;
  cardSvc.Scan(deviceID, &cardData);

  UserCard userCard;
  userCard.set_userid(userID);
  *userCard.add_cards() = cardData.csncarddata();

  RepeatedPtrField<UserCard> userCards;
  userCards.Add(std::forward<UserCard>(userCard));
  userSvc.SetCard(deviceID, userCards);

  Menu::PressEnter(">> Try to authenticate the enrolled card. And, press ENTER to end the test.\n");  
  ```

  ```cpp
  FingerData fingerData;
  std::string templateData;

  fingerSvc.Scan(deviceID, finger::TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD, templateData);
  fingerData.add_templates(templateData);

  fingerSvc.Scan(deviceID, finger::TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD, templateData);
  fingerData.add_templates(templateData);  

  RepeatedPtrField<UserFinger> userFingers;
  
  UserFinger userFinger;
  userFinger.set_userid(userID);
  userFinger.mutable_fingers()->Add(std::forward<FingerData>(fingerData));

  userFingers.Add(std::forward<UserFinger>(userFinger));
  userSvc.SetFinger(deviceID, userFingers);

  Menu::PressEnter(">> Try to authenticate the enrolled finger. And, press ENTER to end the test.\n");
  ```

  ```cpp
  FaceData faceData;
  faceSvc.Scan(deviceID, face::BS2_FACE_ENROLL_THRESHOLD_DEFAULT, &faceData);

  UserFace userFace;
  userFace.set_userid(userID);
  userFace.mutable_faces()->Add(std::forward<FaceData>(faceData));

  RepeatedPtrField<UserFace> userFaces;
  userFaces.Add(std::forward<UserFace>(userFace));
  userSvc.SetFace(deviceID, userFaces);

  Menu::PressEnter(">> Try to authenticate the enrolled face. And, press ENTER to end the test.\n");
  ```

## 5. Test the authentication modes

You can set the authentication modes of a device using [AuthConfig]({{'/api/auth' | relative_url}}#AuthConfig). 

At this step, __AuthConfig.usePrivateAuth__ is set to false. In other words, these authentication modes will be applied to all the users.
{: .notice--info}

  ```cpp
  AuthConfig config;
  config.set_matchtimeout(10);
  config.set_authtimeout(15);

  AuthSchedule authSchedule;
  authSchedule.set_scheduleid(1); // Always

  if(deviceType == device::FACESTATION_F2 || deviceType == device::FACESTATION_F2_FP) {
    authSchedule.set_mode(auth::AUTH_EXT_MODE_CARD_ONLY); // Card Only
    *config.add_authschedules() = authSchedule; 
    authSchedule.set_mode(auth::AUTH_EXT_MODE_FINGERPRINT_ONLY); // Fingerprint Only
    *config.add_authschedules() = authSchedule; 
    authSchedule.set_mode(auth::AUTH_EXT_MODE_FACE_ONLY); // Face Only
    *config.add_authschedules() = authSchedule; 
  } else {
    authSchedule.set_mode(auth::AUTH_MODE_CARD_ONLY); // Card Only
    *config.add_authschedules() = authSchedule; 
    authSchedule.set_mode(auth::AUTH_MODE_BIOMETRIC_ONLY); // Biometric Only
    *config.add_authschedules() = authSchedule; 
  }

  svc.SetConfig(deviceID, config);

  Menu::PressEnter(">> Try to authenticate card or fingerprint or face. And, press ENTER for the next test.\n");

  config.clear_authschedules();

  if(deviceType == device::FACESTATION_F2 || deviceType == device::FACESTATION_F2_FP) {
    authSchedule.set_mode(auth::AUTH_EXT_MODE_CARD_FINGERPRINT); // Card + Fingerprint
    *config.add_authschedules() = authSchedule; 
    authSchedule.set_mode(auth::AUTH_EXT_MODE_CARD_FACE); // Card + Face
    *config.add_authschedules() = authSchedule; 
  } else {
    authSchedule.set_mode(auth::AUTH_MODE_CARD_BIOMETRIC); // Card + Biometric
    *config.add_authschedules() = authSchedule; 
  }

  SetConfig(deviceID, config);

  Menu::PressEnter(">> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER to end the test.\n"); 
  ```

## 6. Get the event logs

You can apply filters when reading log records. In a filter, userID or [eventCode]({{'/api/event' | relative_url}}#EventCode) can be specified.

  ```cpp
  EventFilter filter;
  filter.set_userid(userID);

  RepeatedPtrField<EventLog> events;
  svc.GetLogWithFilter(deviceID, s_FirstEventID, 0, filter, &events);

  // do something with the events

  filter.set_eventcode(0x1000); // BS2_EVENT_VERIFY_SUCCESS
  svc.GetLogWithFilter(deviceID, s_FirstEventID, 0, filter, &events);

  // do something with the events
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```cpp
  svc.EnableMonitoring(deviceID);

  s_Context = std::make_shared<ClientContext>();
  auto eventReader(svc.Subscribe(s_Context.get(), EVENT_QUEUE_SIZE));

  s_MonitoringThread = std::thread(handleEvent, std::move(eventReader));

  // ...

  void handleEvent(std::unique_ptr<ClientReader<EventLog>> eventReader) {
    EventLog realtimeEvent;

    while (eventReader->Read(&realtimeEvent)) {
      std::cout << "[EVENT] " << realtimeEvent.ShortDebugString() << std::endl;
    }

    std::cout << "Monitoring thread is stopped" << std::endl;

    eventReader->Finish();
  }  
  ```

