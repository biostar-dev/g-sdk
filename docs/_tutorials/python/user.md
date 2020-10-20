---
title: "User API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/user/test/test.py_ as needed.
   
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
    cd example/user/test
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

## 2. Change the auth configuration

To test the authentication modes of the test user, [AuthConfig.usePrivateAuth]({{'/api/auth' | relative_url}}#AuthConfig) will be enabled. 

  ```python
  config = authSvc.getConfig(deviceID)

  # Backup the original configuration
  origConfig = auth_pb2.AuthConfig()
  origConfig.CopyFrom(config)

  # Enable private authentication for test
  config.usePrivateAuth = True
  authSvc.setConfig(deviceID, config)
  ```

## 3. Enroll users

Enroll a test user and set the authentication modes. For brevity, the example sets only the simple authentication modes. You can test [all the modes]({{'/api/auth' | relative_url}}#AuthMode) by changing these values. 

  ```python
  newUserID = "%d" % int(time.time())
  newUserHdr = user_pb2.UserHdr(ID=newUserID)
  newUser = user_pb2.UserInfo(hdr=newUserHdr, setting=user_pb2.UserSetting())

  if deviceType == device_pb2.FACESTATION_F2 or deviceType == device_pb2.FACESTATION_F2_FP:
    newUser.setting.cardAuthExtMode = auth_pb2.AUTH_EXT_MODE_CARD_ONLY
    newUser.setting.fingerAuthExtMode = auth_pb2.AUTH_EXT_MODE_FINGERPRINT_ONLY
    newUser.setting.faceAuthExtMode = auth_pb2.AUTH_EXT_MODE_FACE_ONLY
  else:
    newUser.setting.cardAuthMode = auth_pb2.AUTH_MODE_CARD_ONLY
    newUser.setting.biometricAuthMode = auth_pb2.AUTH_MODE_BIOMETRIC_ONLY

  userSvc.enroll(deviceID, [newUser], True)
  ```

## 4. Add credentials to users

Add cards, fingerprints, or faces to the test user. To know the supported credentials of each device, you can use [Device.GetCapabilityInfo]({{'/api/device' | relative_url}}#getcapabilityinfo). For added credentials, check whether you can authenticate them on the device. 

  ```python
  capInfo = deviceSvc.getCapInfo(devID)

  if capInfo.cardSupported: 
    cardSvc = CardSvc(channel)
    TestCard(cardSvc, userSvc).test(devID, testUserID)

  if capInfo.fingerSupported: 
    fingerSvc = FingerSvc(channel)
    TestFinger(fingerSvc, userSvc).test(devID, testUserID)

  if capInfo.faceSupported: 
    faceSvc = FaceSvc(channel)
    TestFace(faceSvc, userSvc).test(devID, testUserID)
  ```
  
  ```python
  cardData = cardSvc.scan(deviceID)
  userCard = user_pb2.UserCard(userID=userID, cards=[cardData.CSNCardData])
  userSvc.setCard(deviceID, [userCard])

  pressEnter('>> Try to authenticate the enrolled card. And, press ENTER to end the test.\n') 
  ```

  ```python
  fingerData = finger_pb2.FingerData()

  fingerData.templates.append(fingerSvc.scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD))
  fingerData.templates.append(fingerSvc.scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD))

  userFinger = user_pb2.UserFinger(userID=userID, fingers=[fingerData])
  userSvc.setFinger(deviceID, [userFinger])

  pressEnter('>> Try to authenticate the enrolled finger. And, press ENTER to end the test.\n')
  ```

  ```python
  faceData = faceSvc.scan(deviceID, ENROLL_THRESHOLD)
  userFace = user_pb2.UserFace(userID=userID, faces=[faceData])
  userSvc.setFace(deviceID, [userFace])

  pressEnter('>> Try to authenticate the enrolled face. And, press ENTER to end the test.\n')
  ```

## 5. Test the authentication modes

You can set the authentication modes of a device using [AuthConfig]({{'/api/auth' | relative_url}}#AuthConfig). 

At this step, __AuthConfig.usePrivateAuth__ is set to false. In other words, these authentication modes will be applied to all the users.
{: .notice--info}

  ```python
  config = auth_pb2.AuthConfig(matchTimeout=10, authTimeout=15, usePrivateAuth=False)

  if deviceType == device_pb2.FACESTATION_F2 or deviceType == device_pb2.FACESTATION_F2_FP:
    config.authSchedules.add(mode=auth_pb2.AUTH_EXT_MODE_CARD_ONLY, scheduleID=1) # Card Only, Always
    config.authSchedules.add(mode=auth_pb2.AUTH_EXT_MODE_FACE_ONLY, scheduleID=1) # Face Only, Always
    config.authSchedules.add(mode=auth_pb2.AUTH_EXT_MODE_FINGERPRINT_ONLY, scheduleID=1) # Fingerprint Only, Always
  else:
    config.authSchedules.add(mode=auth_pb2.AUTH_MODE_CARD_ONLY, scheduleID=1) # Card Only, Always
    config.authSchedules.add(mode=auth_pb2.AUTH_MODE_BIOMETRIC_ONLY, scheduleID=1) # Biometric Only, Always

  authSvc.setConfig(deviceID, config)

  pressEnter('>> Try to authenticate card or fingerprint or face. And, press ENTER for the next test.\n')

  del config.authSchedules[:]

  if deviceType == device_pb2.FACESTATION_F2 or deviceType == device_pb2.FACESTATION_F2_FP:
    config.authSchedules.add(mode=auth_pb2.AUTH_EXT_MODE_CARD_FACE, scheduleID=1) # Card + Face, Always
    config.authSchedules.add(mode=auth_pb2.AUTH_EXT_MODE_CARD_FINGERPRINT, scheduleID=1) # Card + Fingerprint, Always
  else:
    config.authSchedules.add(mode=auth_pb2.AUTH_MODE_CARD_BIOMETRIC, scheduleID=1) # Card + Biometric, Always

  authSvc.setConfig(deviceID, config)

  pressEnter('>> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER for the next test.\n')
  ```

## 6. Get the event logs

You can apply filters when reading log records. In a filter, userID or [eventCode]({{'/api/event' | relative_url}}#EventCode) can be specified.

  ```python
  filter = event_pb2.EventFilter(userID=userID)
  events = eventSvc.getLogWithFilter(deviceID, firstEventID, 0, filter)

  # do something with the events

  filter.eventCode = 0x1000 # BS2_EVENT_VERIFY_SUCCESS
  events = eventSvc.getLogWithFilter(deviceID, firstEventID, 0, filter)

  # do something with the events
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```python
  eventSvc.enableMonitoring(deviceID)
  eventCh = eventSvc.subscribe(EVENT_QUEUE_SIZE)

  statusThread = threading.Thread(target=handleEvent)
  statusThread.start()  

  # ..

  def handleEvent():
    for event in eventCh:
      # do something with the event
  ```

