---
title: "User Synchronization"
toc: true
toc_label: "Table of Contents"
---

This example shows how to synchronize user information between devices. You need an enrollment device and one or more other devices. The example will monitor the realtime events of the enrollment device, and propagate user information to the other devices whenever there is any change. 

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/javascript/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway information in _example/sync/test.js_ as needed.

    ```javascript
    const GATEWAY_CA_FILE = '../../../cert/gateway/ca.crt';
    const GATEWAY_IP = '192.168.0.2';
    const GATEWAY_PORT = 4000;
    ```
5. Change the device configurations in _sync_config.json_ as needed.

    ```json
    {
      "enroll_device": {
        "device_id": 939504224,
        "ip_addr": "192.168.0.110",
        "port": 51211,
        "use_ssl": false,
        "last_event_id": 34667
      },
      "devices": [
        {
          "device_id": 543664528,
          "ip_addr": "192.168.0.135",
          "port": 51211,
          "use_ssl": false,
          "last_event_id": 5984
        },
        {
          "device_id": 547634389,
          "ip_addr": "192.168.0.100",
          "port": 51211,
          "use_ssl": true,
          "last_event_id": 295005
        }
      ]
    }
    ```
6. Install packages.
    ```
    npm install
    ```

7. Run.

    ```
    cd example/sync
    node test.js
    ```

## 1. CLI

With the Command-Line Interface(CLI), you can select one of 6 menus.

```
$ node test.js
Trying to connect to the devices...
>>> Press ENTER to show the test menu

===== Test Menu =====

(1) Show test devices
(2) Show new events
(3) Show new users
(4) Enroll a user
(5) Delete a user
(q) Quit

>>>>> Select a menu:
```

### (1) Show the test configuration

It shows the test configuration and the connected devices. Connections will be done in background using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). See [deviceMgr](#2-device-manager) for the related codes.

```
>>>>> Select a menu: 1
***** Test Configuration:  { enroll_device:
   { device_id: 939504224,
     ip_addr: '192.168.0.110',
     port: 51211,
     use_ssl: false,
     last_event_id: 34883 },
  devices:
   [ { device_id: 543664528,
       ip_addr: '192.168.0.135',
       port: 51211,
       use_ssl: false,
       last_event_id: 6164 },
     { device_id: 547634389,
       ip_addr: '192.168.0.100',
       port: 51211,
       use_ssl: true,
       last_event_id: 295393 } ] }
***** Connected Devices:  [ 939504224, 543664528, 547634389 ]
```

### (2) Enroll a user

Enroll a user with a card on the enrollment device. The new user will be enrolled to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```
>>>>> Select a menu: 4
>> Enter the user ID: 1000
>>> Place a unregistered CSN card on the device 939504224

[EVENT] Sun Jun 20 2021 21:39:00 GMT-0400 (Eastern Daylight Time): Device 939504224, User 1000, User enrollment success
Trying to synchronize the enrolled user 1000...
[EVENT] Sun Jun 20 2021 21:38:59 GMT-0400 (Eastern Daylight Time): Device 547634389, User 1000, User enrollment success
[EVENT] Sun Jun 20 2021 21:38:56 GMT-0400 (Eastern Daylight Time): Device 543664528, User 1000, User enrollment success
```

### (3) Show the new user

Check if the user is enrolled to all the devices.

```
>>>>> Select a menu: 3
Read new users from device 939504224...
New User:  [ { hdr:
     { id: '1000',
       numofcard: 1,
       numoffinger: 0,
       numofface: 0,
       authgroupid: 0 },
    setting:
     { starttime: 0,
       endtime: 0,
       biometricauthmode: 255,
       cardauthmode: 255,
       idauthmode: 255,
       securitylevel: 2,
       faceauthextmode: 255,
       fingerauthextmode: 255,
       cardauthextmode: 255,
       idauthextmode: 255 },
    name: '',
    cardsList: [ [Object] ],
    fingersList: [],
    facesList: [],
    accessgroupidsList: [],
    jobcodesList: [],
    pin: '',
    photo: '' } ]
Read new users from device 543664528...
New User:  [ { hdr:
     { id: '1000',
       numofcard: 1,
       numoffinger: 0,
       numofface: 0,
       authgroupid: 0 },
    setting:
     { starttime: 0,
       endtime: 0,
       biometricauthmode: 255,
       cardauthmode: 255,
       idauthmode: 255,
       securitylevel: 2,
       faceauthextmode: 255,
       fingerauthextmode: 255,
       cardauthextmode: 255,
       idauthextmode: 255 },
    name: '',
    cardsList: [ [Object] ],
    fingersList: [],
    facesList: [],
    accessgroupidsList: [],
    jobcodesList: [],
    pin: '',
    photo: '' } ]
```

### (4) Delete the new user

Delete the new user on the enrollment device. The new user will also be deleted from the other devices using [User.DeleteMulti]({{'/api/user/' | relative_url}}#deletemulti).

```
>>>>> Select a menu: 5
>> Enter the user ID: 1000
[EVENT] Sun Jun 20 2021 21:40:07 GMT-0400 (Eastern Daylight Time): Device 939504224, User 1000, User delete success

Trying to synchronize the deleted user 1000...
[EVENT] Sun Jun 20 2021 21:40:06 GMT-0400 (Eastern Daylight Time): Device 547634389, User 1000, User delete success
[EVENT] Sun Jun 20 2021 21:40:04 GMT-0400 (Eastern Daylight Time): Device 543664528, User 1000, User delete success
```

### (5) Show new events

Show the event logs generated during the test. 

```
>>>>> Select a menu: 2
Read new event logs from device 939504224...
Read 2 event logs
Show the last 2 events...
[EVENT] Sun Jun 20 2021 21:40:07 GMT-0400 (Eastern Daylight Time): Device 939504224, User 1000, User delete success
[EVENT] Sun Jun 20 2021 21:39:00 GMT-0400 (Eastern Daylight Time): Device 939504224, User 1000, User enrollment success
Read new event logs from device 543664528...
Read 2 event logs
Show the last 2 events...
[EVENT] Sun Jun 20 2021 21:40:04 GMT-0400 (Eastern Daylight Time): Device 543664528, User 1000, User delete success
[EVENT] Sun Jun 20 2021 21:38:56 GMT-0400 (Eastern Daylight Time): Device 543664528, User 1000, User enrollment success
Read new event logs from device 547634389...
Read 2 event logs
Show the last 2 events...
[EVENT] Sun Jun 20 2021 21:40:06 GMT-0400 (Eastern Daylight Time): Device 547634389, User 1000, User delete success
[EVENT] Sun Jun 20 2021 21:38:59 GMT-0400 (Eastern Daylight Time): Device 547634389, User 1000, User enrollment success
```

## 2. Device Manager

deviceMgr connects to the devices using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). 

```javascript
async function connectToDevice() {
  var connInfos = config.getAsyncConnectInfo();
  await connect.addAsyncConnection(connInfos);
}
```

And, it monitors the connection events from the devices using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url}}#subscribestatus). If a new connection is detected, it will call the callback function, __eventMgr.connectionCallback__.

```javascript
deviceMgr.handleConnection(eventMgr.connectionCallback);

function handleConnection(connCallback) {
  sub = connect.subscribe(QUEUE_SIZE);

  sub.on('data', (status) => {
    var devStatus = status.getStatus();

    switch(devStatus) {
      case connect.connectMessage.Status.TCP_CONNECTED:
        if(connCallback) {
          connCallback(status.getDeviceid());
        }
        break;

      case connect.connectMessage.Status.TLS_CONNECTED:
        if(connCallback) {
          connCallback(status.getDeviceid());
        }
        break;
    }
  });
}
```

## 3. Event Manager

eventMgr monitors the events from the devices using [Event.SubscribeRealtimeLog]({{'/api/event/' | relative_url}}#subscriberealtimelog). If an event is detected, it will call the callback function, __userMgr.syncUser__.

```javascript
eventMgr.handleEvent(userMgr.eventCallback);

function handleEvent(eventCallback) {
  sub = event.subscribe(QUEUE_SIZE);

  sub.on('data', (event) => {
    if(eventCallback != null) {
      eventCallback(event.toObject());
    } else {
      console.log('Event: ', event.toObject());
    }
  });
}
```

## 4. User Manager

__userMgr.syncUser__ shows how to synchronize user information based on the realtime events. If a user is enrolled on the enrollment device, it will get the user information first using [User.Get]({{'/api/user/' | relative_url}}#get). Then, it will propagate the new user to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```javascript
async function syncUser(eventLog) {
  const enrollDeviceID = config.getConfigData().enroll_device.device_id;

  // Handle only the events of the enrollment device
  if(eventLog.deviceid != enrollDeviceID) {
    return;
  }

  var connectedIDs = await deviceMgr.getConnectedDevices(false);
  var targetDeviceIDs = config.getTargetDeviceIDs(connectedIDs);

  if(eventLog.eventcode == BS2_EVENT_USER_ENROLL_SUCCESS || eventLog.eventcode == BS2_EVENT_USER_UPDATE_SUCCESS) {
    var userInfos = await user.getUser(eventLog.deviceid, [eventLog.userid]);
    await user.enrollMulti(targetDeviceIDs, userInfos);
  } else if(eventLog.eventcode == BS2_EVENT_USER_DELETE_SUCCESS) {
    await user.deleteUserMulti(targetDeviceIDs, [eventLog.userid]);
  }
}

```

## 5. Multi Error Handling

When a [Multi command]({{'/api/' | relative_url}}#xxx_multi-command) fails on one or more devices, the gateway will return a [Err.MultiErrorResponse]({{'/api/err/' | relative_url}}#MultiErrorResponse). You can get the information as below.

```javascript
const errMessage = require('../../biostar/service/err_pb');
const grpcExt= require('../../biostar/service/ext/status_pb.js');

function getMultiError(err) {
  const buffer = err.metadata.get('grpc-status-details-bin')[0];

  if(buffer) {
    const status = grpcExt.Status.deserializeBinary(buffer);
    
    if(status) {
      var details = status.getDetailsList();

      for(any of details) {
        const multiErr = any.unpack(errMessage.MultiErrorResponse.deserializeBinary, "err.MultiErrorResponse");

        if(multiErr) {
          return multiErr.toObject();
        }
      }
    }
  }

  return null;
}
```

