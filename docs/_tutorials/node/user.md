---
title: "User API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/user/test/test.js_ as needed.
   
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
    cd example/user/test
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

## 2. Change the auth configuration

To test the authentication modes of the test user, [AuthConfig.usePrivateAuth]({{'/api/auth' | relative_url}}#AuthConfig) will be enabled. 

  ```javascript
  const origConfig = await auth.getConfig(devID);

  // Enable private authentication for test
  var testConfig = origConfig.cloneMessage();
  testConfig.setUseprivateauth(true);

  await auth.setConfig(devID, testConfig);
  ```

## 3. Enroll users

Enroll a test user and set the authentication modes. For brevity, the example sets only the simple authentication modes. You can test [all the modes]({{'/api/auth' | relative_url}}#AuthMode) by changing these values. 

  ```javascript
  const newUserID = util.format('%d', Date.now());
  var newUserHdr = new user.userMessage.UserHdr();
  newUserHdr.setId(newUserID);

  var newUser = new user.userMessage.UserInfo();
  newUser.setHdr(newUserHdr);

  var newUserSetting = new user.userMessage.UserSetting();
  if(devType == device.deviceMessage.Type.FACESTATION_F2 || devType == device.deviceMessage.Type.FACESTATION_F2_FP) {
    newUserSetting.setCardauthextmode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_ONLY);
    newUserSetting.setFingerauthextmode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FINGERPRINT_ONLY);
    newUserSetting.setFaceauthextmode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FACE_ONLY);
  } else {
    newUserSetting.setCardauthmode(auth.authMessage.AuthMode.AUTH_MODE_CARD_ONLY);
    newUserSetting.setBiometricauthmode(auth.authMessage.AuthMode.AUTH_MODE_BIOMETRIC_ONLY);
  }
  newUser.setSetting(newUserSetting);

  await user.enroll(devID, [newUser]);
  ```

## 4. Add credentials to users

Add cards, fingerprints, or faces to the test user. To know the supported credentials of each device, you can use [Device.GetCapabilityInfo]({{'/api/device' | relative_url}}#getcapabilityinfo). For added credentials, check whether you can authenticate them on the device. 

  ```javascript
  const capInfo = await device.getCapabilityInfo(deviceID);

  if(capInfo.cardsupported) {
    await testCard.test(deviceID, testUserID);
  } 

  if(capInfo.fingersupported) {
    await testFinger.test(deviceID, testUserID);
  }    

  if(capInfo.facesupported) {
    await testFace.test(deviceID, testUserID);
  }   
  ```
  
  ```javascript
  const cardData = await card.scan(devID);
  var userCard = new user.userMessage.UserCard();
  userCard.setUserid(userID);
  userCard.addCards(cardData.getCsncarddata(), 0);

  await user.setCard(devID, [userCard]);
  await menu.pressEnter('>> Try to authenticate the enrolled card. And, press ENTER to end the test.\n');
  ```

  ```javascript
  var fingerData = new finger.fingerMessage.FingerData();

  var templateData = await finger.scan(devID);
  fingerData.addTemplates(templateData, 0);

  templateData = await finger.scan(devID);
  fingerData.addTemplates(templateData, 1);

  var userFinger = new user.userMessage.UserFinger();
  userFinger.setUserid(userID);
  userFinger.addFingers(fingerData, 0);

  await user.setFinger(devID, [userFinger]);
  await menu.pressEnter('>> Try to authenticate the enrolled finger. And, press ENTER to end the test.\n');
  ```

  ```javascript
  var faceData = await face.scan(devID, face.faceMessage.FaceEnrollThreshold.BS2_FACE_ENROLL_THRESHOLD_DEFAULT);

  var userFace = new user.userMessage.UserFace();
  userFace.setUserid(userID);
  userFace.addFaces(faceData, 0);

  await user.setFace(devID, [userFace]);
  await menu.pressEnter('>> Try to authenticate the enrolled face. And, press ENTER to end the test.\n');
  ```

## 5. Test the authentication modes

You can set the authentication modes of a device using [AuthConfig]({{'/api/auth' | relative_url}}#AuthConfig). 

At this step, __AuthConfig.usePrivateAuth__ is set to false. In other words, these authentication modes will be applied to all the users.
{: .notice--info}

  ```javascript
  const config = new auth.authMessage.AuthConfig();
  config.setMatchtimeout(10);
  config.setAuthtimeout(15);
  config.setUseprivateauth(false);

  if(devType == device.deviceMessage.Type.FACESTATION_F2 || devType == device.deviceMessage.Type.FACESTATION_F2_FP) {
    let authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_ONLY); // Card Only
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 0);

    authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FACE_ONLY); // Face Only
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 1);

    authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_FINGERPRINT_ONLY); // Fingerprint Only
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 2);
  } else {
    let authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_MODE_CARD_ONLY); // Card Only
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 0);

    authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_MODE_BIOMETRIC_ONLY); // Biometric Only
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 1);
  }

  await auth.setConfig(devID, config);

  await menu.pressEnter('>> Try to authenticate card or fingerprint or face. And, press ENTER for the next test.\n');

  config.clearAuthschedulesList();

  if(devType == device.deviceMessage.Type.FACESTATION_F2 || devType == device.deviceMessage.Type.FACESTATION_F2_FP) {
    let authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_FACE); // Card + Face
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 0);

    authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_EXT_MODE_CARD_FINGERPRINT); // Card + Fingerprint
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 1);
  } else {
    let authSched = new auth.authMessage.AuthSchedule();
    authSched.setMode(auth.authMessage.AuthMode.AUTH_MODE_CARD_BIOMETRIC); // Card + Biometric
    authSched.setScheduleid(1); // Always
    config.addAuthschedules(authSched, 0);
  }

  await auth.setConfig(devID, config);

  await menu.pressEnter('>> Try to authenticate (card + fingerprint) or (card + face). And, press ENTER to end the test.\n');
  ```

## 6. Get the event logs

You can apply filters when reading log records. In a filter, userID or [eventCode]({{'/api/event' | relative_url}}#EventCode) can be specified.

  ```javascript
  var eventFilter = new event.eventMessage.EventFilter();
  eventFilter.setUserid(userID);

  var events = await event.getLogWithFilter(devID, firstEventID, 0, eventFilter);

  // do something with the events

  eventFilter.setEventcode(0x1000); // BS2_EVENT_VERIFY_SUCCESS
  events = await event.getLogWithFilter(devID, firstEventID, 0, eventFilter);

  // do something with the events
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```javascript
  await event.enableMonitoring(devID);

  sub = event.subscribe(EVENT_QUEUE_SIZE);

  sub.on('data', (event) => {
    console.log('Event: ', event.toObject());
  });

  sub.on('end', () => {
    console.log('Subscription is finished');
  });

  sub.on('error', (err) => {
    if(err.details === 'Cancelled') {
      console.log("Subscription is cancelled");
    } else {
      console.log('Subscription error: ', err);
    }
  })
  ```

