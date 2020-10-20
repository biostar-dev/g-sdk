---
title: "User API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/user/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the target device
    DEV_IP = "192.168.0.110"
    DEV_PORT = 51211
    USE_SSL = false
    ```
5. Build.

    ```
    cd src/example/user/test
    go build .
    ```
6. Run.
   
    ```
    ./test
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```go
  gatewayClient := &client.GatewayClient{}
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_IP, GATEWAY_PORT)

  connectSvc = connect.NewConnectSvc(gatewayClient.GetConn())
  deviceID, _ := connectSvc.Connect(DEV_IP, DEV_PORT, USE_SSL)
  ```   

## 2. Change the auth configuration

To test the authentication modes of the test user, [AuthConfig.usePrivateAuth]({{'/api/auth' | relative_url}}#AuthConfig) will be enabled. 

  ```go
  origConfig, _ := authSvc.GetConfig(deviceID)
  newConfig := proto.Clone(origConfig).(*auth.AuthConfig)
  newConfig.UsePrivateAuth = true

  authSvc.SetConfig(deviceID, newConfig)
  ```

## 3. Enroll users

Enroll a test user and set the authentication modes. For brevity, the example sets only the simple authentication modes. You can test [all the modes]({{'/api/auth' | relative_url}}#AuthMode) by changing these values. 

  ```go
  newUserID := fmt.Sprintf("%v", time.Now().Unix())
  newUser := &user.UserInfo{
    Hdr: &user.UserHdr{
      ID: newUserID,
    },
    Setting: &user.UserSetting{
    },
  }

  // Set authentication modes for test
  if deviceType == device.Type_FACESTATION_F2 || deviceType == device.Type_FACESTATION_F2_FP {
    newUser.Setting.CardAuthExtMode = uint32(auth.AuthMode_AUTH_EXT_MODE_CARD_ONLY)
    newUser.Setting.FingerAuthExtMode = uint32(auth.AuthMode_AUTH_EXT_MODE_FINGERPRINT_ONLY)
    newUser.Setting.FaceAuthExtMode = uint32(auth.AuthMode_AUTH_EXT_MODE_FACE_ONLY)
  } else {
    newUser.Setting.CardAuthMode = uint32(auth.AuthMode_AUTH_MODE_CARD_ONLY)
    newUser.Setting.BiometricAuthMode = uint32(auth.AuthMode_AUTH_MODE_BIOMETRIC_ONLY)
  }

  userSvc.Enroll(deviceID, []*user.UserInfo{ newUser })
  ```

## 4. Add credentials to users

Add cards, fingerprints, or faces to the test user. To know the supported credentials of each device, you can use [Device.GetCapabilityInfo]({{'/api/device' | relative_url}}#getcapabilityinfo). For added credentials, check whether you can authenticate them on the device. 

  ```go
  capInfo, _ := deviceSvc.GetCapabilityInfo(deviceID)

  if capInfo.CardSupported {
    cardSvc = card.NewCardSvc(gatewayClient.GetConn())
    testCard(deviceID, testUserID)
  } 

  if capInfo.FingerSupported {
    fingerSvc = finger.NewFingerSvc(gatewayClient.GetConn())
    testFinger(deviceID, testUserID)
  } 	

  if capInfo.FaceSupported {
    faceSvc = face.NewFaceSvc(gatewayClient.GetConn())
    testFace(deviceID, testUserID)
  } 
  ```
  
  ```go
  cardData, _ := cardSvc.Scan(deviceID)

  userCard := &user.UserCard{
    UserID: userID,
    Cards: []*card.CSNCardData{
      cardData.CSNCardData,
    },
  }

  userSvc.SetCard(deviceID, []*user.UserCard{ userCard })

  cli.PressEnter(">> Try to authenticate the enrolled card. And, press ENTER to end the test.\n")	  
  ```

  ```go
  fingerData := &finger.FingerData{
    Templates: [][]byte{},
  }

  for i := 0; i < NUM_OF_TEMPLATE; i++ {
    templateData, _, _ := fingerSvc.Scan(deviceID, finger.TemplateFormat_TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD)
    fingerData.Templates = append(fingerData.Templates, templateData)
  }

  userFinger := &user.UserFinger{
    UserID: userID,
    Fingers: []*finger.FingerData{
      fingerData,
    },
  }

  userSvc.SetFinger(deviceID, []*user.UserFinger{ userFinger })

  cli.PressEnter(">> Try to authenticate the enrolled finger. And press ENTER to end the test.\n")
  ```

  ```go
  faceData, _ := faceSvc.Scan(deviceID, ENROLL_THRESHOLD)

  userFace := &user.UserFace{
    UserID: userID,
    Faces: []*face.FaceData{
      faceData,
    },
  }

  userSvc.SetFace(deviceID, []*user.UserFace{ userFace })

  cli.PressEnter(">> Try to authenticate the enrolled face. And, press ENTER to end the test.\n")
  ```

## 5. Test the authentication modes

You can set the authentication modes of a device using [AuthConfig]({{'/api/auth' | relative_url}}#AuthConfig). 

At this step, __AuthConfig.usePrivateAuth__ is set to false. In other words, these authentication modes will be applied to all the users.
{: .notice--info}

  ```go
  authConfig := &auth.AuthConfig{
    MatchTimeout: 10,
    AuthTimeout: 15,
  }

  if deviceType == device.Type_FACESTATION_F2 || deviceType == device.Type_FACESTATION_F2_FP {
    authConfig.AuthSchedules = []*auth.AuthSchedule{ 
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_EXT_MODE_FACE_ONLY, ScheduleID: 1 }, // Face Only, Always
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_EXT_MODE_FINGERPRINT_ONLY, ScheduleID: 1 }, // Fingerprint Only, Always
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_EXT_MODE_CARD_ONLY, ScheduleID: 1 }, // Card Only, Always
    }
  } else {
    authConfig.AuthSchedules = []*auth.AuthSchedule{
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_MODE_BIOMETRIC_ONLY, ScheduleID: 1 }, // Biometric Only, Always
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_MODE_CARD_ONLY, ScheduleID: 1 }, // Card Only, Always
    }
  }

  authSvc.SetConfig(deviceID, authConfig)

  cli.PressEnter(">> Try to authenticate card or fingerprint or face. And, press ENTER for the next test.\n")

  if deviceType == device.Type_FACESTATION_F2 || deviceType == device.Type_FACESTATION_F2_FP {
    authConfig.AuthSchedules = []*auth.AuthSchedule{ 
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_EXT_MODE_CARD_FACE, ScheduleID: 1 }, // Card + Face, Always
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_EXT_MODE_CARD_FINGERPRINT, ScheduleID: 1 }, // Card + Fingerprint, Always
    }
  } else {
    authConfig.AuthSchedules = []*auth.AuthSchedule{
      &auth.AuthSchedule{ Mode: auth.AuthMode_AUTH_MODE_CARD_BIOMETRIC, ScheduleID: 1 }, // Card + Biometric, Always
    }
  }

  authSvc.SetConfig(deviceID, authConfig)

  cli.PressEnter(">> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER to end the test.\n")
  ```

## 6. Get the event logs

You can apply filters when reading log records. In a filter, userID or [eventCode]({{'/api/event' | relative_url}}#EventCode) can be specified.

  ```go
  userFilter := &event.EventFilter{
    UserID: userID,
  }

  events, _ := eventSvc.GetLogWithFilter(deviceID, 0, 0, userFilter)

  // do something with the events

  eventFilter := &event.EventFilter{
    UserID: userID,
    EventCode: 0x1000, // BS2_EVENT_VERIFY_SUCCESS
  }

  events, _ = eventSvc.GetLogWithFilter(deviceID, 0, 0, eventFilter)

  // do something with the events
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```go
  enableReq := &event.EnableMonitoringRequest{
    DeviceID: deviceID,
  }

  s.client.EnableMonitoring(context.Background(), enableReq)

  subReq := &event.SubscribeRealtimeLogRequest{
    QueueSize: MONITORING_QUEUE_SIZE,
    DeviceIDs: []uint32 { deviceID },
  }

  ctx, cancelFunc := context.WithCancel(context.Background())
  eventStream, _ = s.client.SubscribeRealtimeLog(ctx, subReq)

  go func() {
    for {
      eventLog, _ := eventStream.Recv()
      eventCallback(eventLog)
    }
  } ()
  ```

