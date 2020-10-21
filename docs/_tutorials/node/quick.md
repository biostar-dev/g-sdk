---
title: "Quick Start Guide for Device Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/quick/quick.js_ as needed.
   
    ```javascript
    // the path of the root certificate
    const GATEWAY_CA_FILE = '../../../cert/gateway/ca.crt';

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
    cd example/quick
    node quick.js
    ```


## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the device gateway and get a service client such as ___ConnectClient___ using the connection. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```javascript
    const connectService = require('../../biostar/service/connect_grpc_pb');

    var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa);
    var connClient = new connectService.ConnectClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

2. Call the functions of the service using the client. 
   
    ```javascript
    const connectMessage = require('../../biostar/service/connect_pb');

    var connInfo = new connectMessage.ConnectInfo();
    connInfo.setIpaddr(addr);
    connInfo.setPort(port);
    connInfo.setUsessl(useSSL);

    var req = new connectMessage.ConnectRequest();
    req.setConnectinfo(connInfo);

    connClient.connect(req, (err, response) => {
      var devID = response.getDeviceid();

      // do something
    });
    ```

The functions in _example_ are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample functions.
{: .notice--warning}


## 2. Connect to the gateway and get service clients

The first thing to do is to connect to the gateway and get service clients such as ___ConnectClient___, which will be used for further communication. You have to know the IP address and port number of the gateway. And, you should also have the root certificate of the gateway for TLS/SSL communication. 

```javascript
var connClient = null;

function initClient(addr, credential) {
  connClient = new connectService.ConnectClient(addr, credential);
}

function getClient() {
  return connClient;
}
```

1. Create the credential.

    ```javascript
    var rootCa = fs.readFileSync(CA_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa);
    ```

2. Connect to the gateway and get the client.

    ```javascript
    connect.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect API]({{'/api/connect/' | relative_url}}) and [the tutorial]({{'/node/connect/' | relative_url}}).

```javascript
// Example functions showing the usage of the Connect API
function getDeviceList() {
  var req = new connectMessage.GetDeviceListRequest();

  return new Promise((resolve, reject) => {
    connClient.getDeviceList(req, (err, response) => {
      resolve(response.toObject().deviceinfosList);
    });
  });
}

function searchDevice(timeout) {
  var req = new connectMessage.SearchDeviceRequest();
  req.setTimeout(timeout);

  return new Promise((resolve, reject) => {
    connClient.searchDevice(req, (err, response) => {
      resolve(response.toObject().deviceinfosList);
    });
  });
}

function connectToDevice(addr, port, useSSL) {
  var connInfo = new connectMessage.ConnectInfo();
  connInfo.setIpaddr(addr);
  connInfo.setPort(port);
  connInfo.setUsessl(useSSL);

  var req = new connectMessage.ConnectRequest();
  req.setConnectinfo(connInfo);

  return new Promise((resolve, reject) => {
    connect.getClient().connect(req, (err, response) => {
      resolve(response.getDeviceid());
    });
  });
}

function disconnect(deviceIDs) {
  var req = new connectMessage.DisconnectRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connect.getClient().disconnect(req, (err, response) => {
      resolve(response);
    });
  });
}
```

1. Initialize the Connect client.
   
    ```javascript
    connect.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [Connect.EnableSSL]({{'/api/connect/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```javascript
    const devID = await connect.connectToDevice(deviceIP, devicePort, useSSL);
    ```

3. Get the devices, which are managed by the gateway.
   
    ```javascript
    const devList = await connect.getDeviceList();
    ```

4. Disconnect the device.
   
    ```javascript  
    await connect.disconnect([deviceID]);
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```javascript
// Example functions showing the usage of the Device API
var deviceClient = null;

function initClient(addr, credential) {
  deviceClient = new deviceService.DeviceClient(addr, credential);

  return deviceClient
}

function getInfo(devID) {
  var req = new deviceMessage.GetInfoRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    deviceClient.getInfo(req, (err, response) => {
      resolve(response.toObject().info);
    });
  });
}

function getCapabilityInfo(devID) {
  var req = new deviceMessage.GetCapabilityInfoRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    deviceClient.getCapabilityInfo(req, (err, response) => {
      resolve(response.toObject().capinfo);
    });
  });
}
```

1. Initialize the Device client.

    ```javascript
    device.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```
2. Get the version information of the device.

    ```javascript
    const info = await device.getInfo(devID);
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```javascript
    const capInfo = await device.getCapabilityInfo(devID);
    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```javascript
// Example functions showing the usage of the Finger API
var fingerClient = null;

function initClient(addr, credential) {
  fingerClient = new fingerService.FingerClient(addr, credential);

  return fingerClient
}

function scan(devID, format, threshold) {
  var req = new fingerMessage.ScanRequest();
  req.setDeviceid(devID);
  req.setTemplateformat(format);
  req.setQualitythreshold(threshold);

  return new Promise((resolve, reject) => {
    fingerClient.scan(req, (err, response) => {
      resolve(response.getTemplatedata());
    });
  });
}

function getImage(devID) {
  var req = new fingerMessage.GetImageRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    fingerClient.getImage(req, (err, response) => {
      resolve(response.getBmpimage());
    });
  });
}

function getConfig(devID) {
  var req = new fingerMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    fingerClient.getConfig(req, (err, response) => {
      resolve(response.toObject().config);
    });
  });
}

```

1. Initialize the Finger client.
 
    ```javascript
    finger.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```javascript
    const templateData = await finger.scan(devID, TEMPLATE_FORMAT, 50);
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```javascript
    const bmpImage = await finger.getImage(devID);
    fs.writeFileSync(IMAGE_FILENAME, bmpImage);
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```javascript
    const config = await finger.getConfig(devID);
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```javascript
// Example functions showing the usage of the Card API
var cardClient = null;

function initClient(addr, credential) {
  cardClient = new cardService.CardClient(addr, credential);

  return cardClient
}

function scan(devID, format, threshold) {
  var req = new cardMessage.ScanRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    cardClient.scan(req, (err, response) => {
      resolve(response.toObject().carddata);
    });
  });
}

function getBlacklist(devID) {
  var req = new cardMessage.GetBlacklistRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reflect) => {
    cardClient.getBlacklist(req, (err, response) => {
      resolve(response.toObject().blacklistList);
    });
  });
}

function addBlacklist(devID, cardInfos) {
  var req = new cardMessage.AddBlacklistRequest();
  req.setDeviceid(devID);
  req.setCardinfosList(cardInfos);

  return new Promise((resolve, reflect) => {
    cardClient.addBlacklist(req, (err, response) => {
      resolve(response);
    });
  });
}


function deleteBlacklist(devID, cardInfos) {
  var req = new cardMessage.DeleteBlacklistRequest();
  req.setDeviceid(devID);
  req.setCardinfosList(cardInfos);

  return new Promise((resolve, reflect) => {
    cardClient.deleteBlacklist(req, (err, response) => {
      resolve(response);
    });
  });
}


function getConfig(devID) {
  var req = new cardMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    cardClient.getConfig(req, (err, response) => {
      resolve(response.toObject().config);
    });
  });
}
```

1. Initialize the Card client.

    ```javascript
    card.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

2. Scan a card.

    ```javascript
    const cardData = await card.scan(devID);
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```javascript
    // Get the current blacklist
    var blacklist = await card.getBlacklist(devID);

    // Add new items into the blacklist
    var cardInfos = [];

    for(i = 0; i < NUM_OF_NEW_BLACKLIST; i++) {
      let item = new card.cardMessage.BlacklistItem();
      item.setCardid(Buffer.from(`${FIRST_BLACKLISTED_CARD_ID + i}`, 'utf-8'));
      item.setIssuecount(ISSUE_COUNT);

      cardInfos.push(item);
    }

    await card.addBlacklist(devID, cardInfos);
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```javascript
// Example functions showing the usage of the User API
var userClient = null;

function initClient(addr, credential) {
  userClient = new userService.UserClient(addr, credential);

  return userClient
}

function getList(devID) {
  var req = new userMessage.GetListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    userClient.getList(req, (err, response) => {
      resolve(response.toObject().hdrsList);
    })
  })
}

function getUser(devID, userIDs) {
  var req = new userMessage.GetRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.get(req, (err, response) => {
      resolve(response.toObject().usersList);
    })
  })
}


function enroll(devID, userInfos) {
  var req = new userMessage.EnrollRequest();
  req.setDeviceid(devID);
  req.setUsersList(userInfos);

  return new Promise((resolve, reject) => {
    userClient.enroll(req, (err, response) => {
      resolve(response);
    })
  })
}


function deleteUser(devID, userIDs) {
  var req = new userMessage.DeleteRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.delete(req, (err, response) => {
      resolve(response);
    })
  })
}


function setFinger(devID, userFingerInfos) {
  var req = new userMessage.SetFingerRequest();
  req.setDeviceid(devID);
  req.setUserfingersList(userFingerInfos);

  return new Promise((resolve, reject) => {
    userClient.setFinger(req, (err, response) => {
      resolve(response);
    })
  })
}
```

1. Initialize the User client.

    ```javascript
    user.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

2. Get the user list and detailed information.

    ```javascript
    var hdrs = await user.getList(devID);
    var userIDs = [];

    for(i = 0; i < hdrs.length; i++) {
      userIDs.push(hdrs[i].id);
    }

    const userInfos = await user.getUser(devID, userIDs);
    ```

3. Enroll new users.

    ```javascript
    var userInfos = [];

    for(i = 0; i < NUM_OF_NEW_USER; i++) {
      let userInfo = new user.userMessage.UserInfo();
      let userHdr = new user.userMessage.UserHdr();
      userHdr.setId(`${START_USER_ID + i}`);
      userInfo.setHdr(userHdr);

      userInfos.push(userInfo);
    }

    await user.enroll(devID, userInfos);
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```javascript
    var fingerData = new finger.fingerMessage.FingerData();

    var userIDs = []
    userIDs.push(userID);

    var userInfos = await user.getUser(devID, userIDs);

    var templateData = await finger.scan(devID, TEMPLATE_FORMAT, 50);
    fingerData.addTemplates(templateData, 0);

    templateData = await finger.scan(devID, TEMPLATE_FORMAT, 50);
    fingerData.addTemplates(templateData, 1);    

    var userFingers = [];
    var userFinger = new user.userMessage.UserFinger();
    userFinger.setUserid(userID);
    userFinger.addFingers(fingerData, 0);
    userFingers.push(userFinger);

    await user.setFinger(devID, userFingers);
    ```

5. Delete new users.

    ```javascript
    await user.deleteUser(devID, userIDs);
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```javascript
// Example functions showing the usage of the Event API
var eventClient = null;

function initClient(addr, credential) {
  eventClient = new eventService.EventClient(addr, credential);

  return eventClient
}

function getLog(devID, startEventID, maxNumOfLog) {
  var req = new eventMessage.GetLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    eventClient.getLog(req, (err, response) => {
      resolve(response.toObject().eventsList);
    })
  })
}

function getImageLog(devID, startEventID, maxNumOfLog) {
  var req = new eventMessage.GetImageLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    eventClient.getImageLog(req, (err, response) => {
  })
}

function enableMonitoring(devID) {
  var req = new eventMessage.EnableMonitoringRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    eventClient.enableMonitoring(req, (err, response) => {
      resolve(response);
    })
  })  
}

function subscribe(queueSize) {
  var req = new eventMessage.SubscribeRealtimeLogRequest();
  req.setQueuesize(queueSize);

  return eventClient.subscribeRealtimeLog(req);
}

function disableMonitoring(devID) {
  var req = new eventMessage.DisableMonitoringRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    eventClient.disableMonitoring(req, (err, response) => {
      resolve(response);
    })
  })  
}
```

1. Initialize the Event client.

    ```javascript
    event.initClient(`${GATEWAY_IP}:${GATEWAY_PORT}`, sslCreds);
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```javascript
    const events = await event.getLog(devID, 0, MAX_NUM_OF_LOG);
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```javascript
    const imageEvents = await event.getImageLog(devID, 0, MAX_NUM_OF_IMAGE_LOG);
    if(imageEvents.length > 0) {
      let buf = new Buffer(imageEvents[0].jpgimage, 'base64');

      fs.writeFileSync(LOG_IMAGE_NAME, buf);
    }  
    ```

4. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```javascript
    await event.enableMonitoring(devID);

    const sub = event.subscribe(EVENT_QUEUE_SIZE);

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

5. Stop monitoring.

    ```javascript
    sub.cancel();
    
    await event.disableMonitoring(devID);
    ```




