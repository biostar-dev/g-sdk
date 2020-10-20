---
title: "Quick Start Guide for Master Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the Node.js client library]({{'/node/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. Change the gateway and the device information in _example/quick/quick.js_ as needed.
   
    ```javascript
    // the path of the root certificate
    const MASTER_CA_FILE = '../../../cert/master/ca.crt'; 

    // the address of the master gateway
    const MASTER_IP = '192.168.0.2';
    const MASTER_PORT = 4010;

    // the paths of the administrator certificate and its key 
    const ADMIN_CERT_FILE = '../../../cert/master/admin.crt';
    const ADMIN_KEY_FILE = '../../../cert/master/admin_key.pem';

    // the paths of the tenant certificate and its key    
    const TENANT_CERT_FILE = '../../../cert/master/tenant1.crt';
    const TENANT_KEY_FILE = '../../../cert/master/tenant1_key.pem';    

    // the following values should be same as the IDs in the corresponding certificates
    const TENANT_ID = "tenant1";
    const GATEWAY_ID = "gateway1";   
    
    // the ip address of the target device
    const DEVICE_IP = '192.168.0.110';
    const DEVICE_PORT = 51211;
    const USE_SSL = false;    
    ```

6. Install packages.

    ```
    npm install
    ```
7. Run.
   
    ```
    cd example/quick
    node quick.js -m 
    ```

    To initialize the database, you have to run with __-mi__ option once. 
    {: .notice--info}


## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the gateway and login as a tenant or an administrator. If login succeeds, the master gateway will return a JWT token, which should be used as a call credential. You should use the credential when creating other service clients such as ConnectMasterClient.
  
   
    ```javascript
    const loginService = require('../../biostar/service/login_grpc_pb');
    const loginMessage = require('../../biostar/service/login_pb');

    const connectMasterService = require('../../biostar/service/connect_master_grpc_pb');

    var rootCa = fs.readFileSync(MASTER_CA_FILE);
    var tenantCert = fs.readFileSync(TENANT_CERT_FILE);
    var tenantKey = fs.readFileSync(TENANT_KEY_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa, tenantKey, tenantCert);     

    var loginClient = new loginService.LoginClient(`${MASTER_IP}:${MASTER_PORT}`, sslCreds);

    var req = new loginMessage.LoginRequest();
    req.setTenantcert(tenantCert);    

    loginClient.login(req, (err, response) => {
      var callCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
        const metadata = new grpc.Metadata();
        metadata.set('token', response.toObject().jwttoken);
        callback(null, metadata);
      });

      var creds = grpc.credentials.combineChannelCredentials(sslCreds, callCreds);

      var connMasterClient = new connectMasterService.ConnectMasterClient(`${MASTER_IP}:${MASTER_PORT}`, creds); 
    });
    ```

2. Call the functions of the service using the client. 
   
    ```javascript
    const connectMasterMessage = require('../../biostar/service/connect_master_pb');
    const connectMessage = require('../../biostar/service/connect_pb');

    var connInfo = new connectMessage.ConnectInfo();
    connInfo.setIpaddr(addr);
    connInfo.setPort(port);
    connInfo.setUsessl(useSSL);

    var req = new connectMasterMessage.ConnectRequest();
    req.setGatewayid(gatewayID);
    req.setConnectinfo(connInfo);

    connMasterClient.connect(req, (err, response) => {
      var devID = response.getDeviceid();

      // do something
    });
    ```

The functions in _example_ are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample functions.
{: .notice--warning}


## 2. Connect to the master gateway and get service clients

The first thing to do is to connect to the master gateway. You have to know the address and port number of the gateway. And, you should also have the following certificates.

* The root CA certificate of the master gateway
* The client certificate of a tenant and its key file
* For administrative tasks such as creating tenants, the client certificate of an administrator and its key file

After connecting to the master gateway, you have to login with either a tenant certificate or an administrator certificate. When login succeeds, the master gateway will return a JWT token, which will be used as a call credential for further API calls.

```javascript
var loginClient = null;

function initClient(addr, credential) {
  loginClient = new loginService.LoginClient(addr, credential);

  return loginClient
}

function getClient() {
  return loginClient;
}

function login(tenantCert) {
  var req = new loginMessage.LoginRequest();
  req.setTenantcert(tenantCert);

  return new Promise((resolve, reject) => {
    loginClient.login(req, (err, response) => {
      if(err) {
        console.error('Cannot login: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().jwttoken);
    });
  });
}
```

1. Create the credential.

    ```javascript
    var rootCa = fs.readFileSync(MASTER_CA_FILE);
    var tenantCert = fs.readFileSync(TENANT_CERT_FILE);
    var tenantKey = fs.readFileSync(TENANT_KEY_FILE);
    var sslCreds = grpc.credentials.createSsl(rootCa, tenantKey, tenantCert); 

    var addr = `${MASTER_IP}:${MASTER_PORT}`;
    ```

2. Login to the master gateway and get a JWT token.

    ```javascript
    var channelCreds = sslCreds;

    login.initClient(addr, sslCreds);
    
    const jwtToken = await login.login(tenantCert.toString());
    var callCreds = grpc.credentials.createFromMetadataGenerator((args, callback) => {
      const metadata = new grpc.Metadata();
      metadata.set('token', jwtToken);
      callback(null, metadata);
    });
    
    const creds = grpc.credentials.combineChannelCredentials(sslCreds, callCreds);
    connectMaster.initClient(addr, creds);
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) and [the tutorial]({{'/node/connectMaster/' | relative_url}}).

```javascript
// Example functions showing the usage of the Connect Master API
const connectMasterMessage = require('../../biostar/service/connect_master_pb');
const connectMasterService = require('../../biostar/service/connect_master_grpc_pb');

var connMasterClient = null;

function initClient(addr, credential) {
  connMasterClient = new connectMasterService.ConnectMasterClient(addr, credential);
}

function getClient() {
  return connMasterClient;
}

function getDeviceList(gatewayID) {
  var req = new connectMasterMessage.GetDeviceListRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connMasterClient.getDeviceList(req, (err, response) => {
      resolve(response.toObject().deviceinfosList);
    });
  });
}

function searchDevice(gatewayID, timeout) {
  var req = new connectMasterMessage.SearchDeviceRequest();
  req.setGatewayid(gatewayID);
  req.setTimeout(timeout);

  return new Promise((resolve, reject) => {
    connMasterClient.searchDevice(req, (err, response) => {
      resolve(response.toObject().deviceinfosList);
    });
  });
}

function connectToDevice(gatewayID, addr, port, useSSL) {
  var connInfo = new connectMessage.ConnectInfo();
  connInfo.setIpaddr(addr);
  connInfo.setPort(port);
  connInfo.setUsessl(useSSL);

  var req = new connectMasterMessage.ConnectRequest();
  req.setGatewayid(gatewayID);
  req.setConnectinfo(connInfo);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().connect(req, (err, response) => {
      resolve(response.getDeviceid());
    });
  });
}

function disconnect(deviceIDs) {
  var req = new connectMasterMessage.DisconnectRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().disconnect(req, (err, response) => {
      resolve(response);
    });
  });
}
```

1. Initialize the Connect Master client.
   
    ```javascript
    connectMaster.initClient(`${MASTER_IP}:${MASTER_PORT}`, channelCreds);
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [ConnectMaster.EnableSSL]({{'/api/connectMaster/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```javascript
    const devID = await connectMaster.connectToDevice(gatewayID, DEVICE_IP, DEVICE_PORT, USE_SSL);
    ```

3. Get the devices, which are managed by the gateway.
   
    ```javascript
    const devList = await connectMaster.getDeviceList(gatewayID);
    ```

4. Disconnect the device.
   
    ```javascript  
    var deviceIDs = [];
    deviceIDs.push(deviceID);

    await connectMaster.disconnect(deviceIDs);
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
    device.initClient(`${MASTER_IP}:${MASTER_PORT}`, sslCreds);
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
    finger.initClient(`${MASTER_IP}:${MASTER_PORT}`, sslCreds);
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
    card.initClient(`${MASTER_IP}:${MASTER_PORT}`, sslCreds);
    ```

2. Scan a card.

    ```javascript
    const cardData = await card.scan(devID);
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```javascript
    // Get the current blacklist
    const blacklist = await card.getBlacklist(devID);

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
    user.initClient(`${MASTER_IP}:${MASTER_PORT}`, sslCreds);
    ```

2. Get the user list and detailed information.

    ```javascript
    const hdrs = await return user.getList(devID);
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

    await user.enroll(devID, userInfos;
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
    event.initClient(`${MASTER_IP}:${MASTER_PORT}`, sslCreds);
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




