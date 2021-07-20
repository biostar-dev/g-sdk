---
title: "User Synchronization"
toc: true
toc_label: "Table of Contents"
---

This example shows how to synchronize user information between devices. You need an enrollment device and one or more other devices. The example will monitor the realtime events of the enrollment device, and propagate user information to the other devices whenever there is any change. 

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway information in _src/example/sync/sync.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000
    ```
5. Change the device configurations in _src/example/sync/config.json_ as needed.

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
   
6. Build.

    ```
    cd src/example/sync
    go build .
    ```
7. Run.
   
    ```
    ./sync
    ```

## 1. CLI

With the Command-Line Interface(CLI), you can select one of 6 menus.

```
$ ./sync
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

It shows the test configuration and the connected devices. Connections will be done in background using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). See [DeviceMgr](#2-device-manager) for the related codes.

```
>>>>> Select a menu: 1
***** Test Configuration:
{
  "enroll_device": {
    "device_id": 939504224,
    "ip_addr": "192.168.0.110",
    "port": 51211,
    "use_ssl": false,
    "last_event_id": 35104
  },
  "devices": [
    {
      "device_id": 543664528,
      "ip_addr": "192.168.0.135",
      "port": 51211,
      "use_ssl": false,
      "last_event_id": 6341
    },
    {
      "device_id": 547634389,
      "ip_addr": "192.168.0.100",
      "port": 51211,
      "use_ssl": true,
      "last_event_id": 295360
    }
  ]
}

***** Connected Devices: [939504224 543664528 547634389]
```

### (2) Enroll a user

Enroll a user with a card on the enrollment device. The new user will be enrolled to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```
>>>>> Select a menu: 4
>> Enter the user ID: 1000
>>> Place a unregistered CSN card on the device 939504224...

[EVENT] 2021-06-19 17:03:43 -0400 EDT: Device 939504224, User 1000, User enrollment success
Trying to synchronize the enrolled user 1000...
[EVENT] 2021-06-19 17:03:40 -0400 EDT: Device 543664528, User 1000, User enrollment success
[EVENT] 2021-06-19 17:03:50 -0400 EDT: Device 547634389, User 1000, User enrollment success
```

### (3) Show the new user

Check if the user is enrolled to all the devices.

```
>>>>> Select a menu: 3
Read new users from device 939504224...
New users: [hdr:<ID:"1000" numOfCard:1 > setting:<biometricAuthMode:255 cardAuthMode:255 IDAuthMode:255 securityLevel:2 faceAuthExtMode:255 fingerAuthExtMode:255 cardAuthExtMode:255 IDAuthExtMode:255 > cards:<type:CARD_TYPE_CSN size:32 data:"\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200" > ]
Read new users from device 543664528...
New users: [hdr:<ID:"1000" numOfCard:1 > setting:<biometricAuthMode:255 cardAuthMode:255 IDAuthMode:255 securityLevel:2 faceAuthExtMode:255 fingerAuthExtMode:255 cardAuthExtMode:255 IDAuthExtMode:255 > cards:<type:CARD_TYPE_CSN size:32 data:"\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200" > ]
Read new users from device 547634389...
New users: [hdr:<ID:"1000" numOfCard:1 > setting:<biometricAuthMode:255 cardAuthMode:255 IDAuthMode:255 securityLevel:2 faceAuthExtMode:255 fingerAuthExtMode:255 cardAuthExtMode:255 IDAuthExtMode:255 > cards:<type:CARD_TYPE_CSN size:32 data:"\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200" > ]
```

### (4) Delete the new user

Delete the new user on the enrollment device. The new user will also be deleted from the other devices using [User.DeleteMulti]({{'/api/user/' | relative_url}}#deletemulti).

```
>>>>> Select a menu: 5
>> Enter the user ID: 1000

[EVENT] 2021-06-19 17:06:20 -0400 EDT: Device 939504224, User 1000, User delete success
Trying to synchronize the deleted user 1000...
[EVENT] 2021-06-19 17:06:20 -0400 EDT: Device 547634389, User 1000, User delete success
[EVENT] 2021-06-19 17:06:17 -0400 EDT: Device 543664528, User 1000, User delete success
```

### (5) Show new events

Show the event logs generated during the test. 

```
>>>>> Select a menu: 2
Read new event logs from device 939504224...
Read 2 event logs
Show the last 2 events...
2021-06-19 17:06:20 -0400 EDT: Device 939504224, User 1000, User delete success
2021-06-19 17:04:59 -0400 EDT: Device 939504224, User 1000, User enrollment success
Read new event logs from device 543664528...
Read 2 event logs
Show the last 2 events...
2021-06-19 17:06:17 -0400 EDT: Device 543664528, User 1000, User delete success
2021-06-19 17:04:55 -0400 EDT: Device 543664528, User 1000, User enrollment success
Read new event logs from device 547634389...
Read 2 event logs
Show the last 2 events...
2021-06-19 17:06:20 -0400 EDT: Device 547634389, User 1000, User delete success
2021-06-19 17:04:59 -0400 EDT: Device 547634389, User 1000, User enrollment success
```

## 2. Device Manager

DeviceMgr connects to the devices using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). 

```go
func (m *DeviceMgr) ConnectToDevices() error {
  connInfos := m.testConfig.GetAsyncConnectInfo()
  m.connectSvc.AddAsyncConnection(connInfos)
}
```

And, it monitors the connection events from the devices using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url}}#subscribestatus). If a new connection is detected, it will call the callback function, __EventMgr.ConnectCallback__.

```go
devMgr.HandleConnection(eventMgr.ConnectCallback)

func (m *DeviceMgr) HandleConnection(callback func(devID uint32) error) error {
  statusStream, cancelFunc, err := m.connectSvc.Subscribe()

  go func() {
    for {
      devStatus, err := statusStream.Recv()

      if devStatus.Status == connect.Status_TCP_CONNECTED || devStatus.Status == connect.Status_TLS_CONNECTED {
        m.connectedIDs = append(m.connectedIDs, devStatus.DeviceID)

        if callback != nil {
          callback(devStatus.DeviceID)
        }
      } else if devStatus.Status == connect.Status_DISCONNECTED {
        for i := 0; i < len(m.connectedIDs); i++ {
          if m.connectedIDs[i] == devStatus.DeviceID {
            m.connectedIDs = append(m.connectedIDs[:i], m.connectedIDs[i+1:]...)
            break
          }
        }
      }
    }
  } ()

  return nil
}
```

## 3. Event Manager

EventMgr monitors the events from the devices using [Event.SubscribeRealtimeLog]({{'/api/event/' | relative_url}}#subscriberealtimelog). If an event is detected, it will call the callback function, __UserMgr.SyncUser__.

```go
eventMgr.HandleEvent(len(testConfig.GetAsyncConnectInfo()), userMgr.SyncUser)

func (m *EventMgr) HandleEvent(queueSize int, callback func(eventLog *event.EventLog) error) error {
  subReq := &event.SubscribeRealtimeLogRequest{
    QueueSize: int32(queueSize),
  }

  ctx, cancelFunc := context.WithCancel(context.Background())

  eventStream, err := m.eventSvc.GetClient().SubscribeRealtimeLog(ctx, subReq)

  go func() {
    for {
      eventLog, err := eventStream.Recv()

      if callback != nil {
        callback(eventLog)
      }
    }		
  } ()

  return nil
```

## 4. User Manager

__UserMgr.SyncUser__ shows how to synchronize user information based on the realtime events. If a user is enrolled on the enrollment device, it will get the user information first using [User.Get]({{'/api/user/' | relative_url}}#get). Then, it will propagate the new user to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```go
func (m *UserMgr) SyncUser(eventLog *event.EventLog) error {
  // Handle only the events of the enrollment device
  if eventLog.DeviceID != m.testConfig.GetEnrollDeviceID() {
    return nil
  }

  connectedIDs, _ := m.deviceMgr.GetConnectedDevices(false)
  targetDeviceIDs := m.testConfig.GetTargetDeviceIDs(connectedIDs) 

  if eventLog.EventCode == BS2_EVENT_USER_ENROLL_SUCCESS || eventLog.EventCode == BS2_EVENT_USER_UPDATE_SUCCESS {
    newUserInfos, err := m.userSvc.GetUser(eventLog.DeviceID, []string{eventLog.UserID})
    m.userSvc.EnrollMulti(targetDeviceIDs, newUserInfos)		
  } else if eventLog.EventCode == BS2_EVENT_USER_DELETE_SUCCESS {
    m.userSvc.DeleteMulti(targetDeviceIDs, []string{eventLog.UserID})		
  } 

  return nil
}
```

## 5. Multi Error Handling

When a [Multi command]({{'/api/' | relative_url}}#xxx_multi-command) fails on one or more devices, the gateway will return a [Err.MultiErrorResponse]({{'/api/err/' | relative_url}}#MultiErrorResponse). You can get the information as below.

```go
import (
  "google.golang.org/grpc/status"
  biostarErr "biostar/service/err"
)

func GetMultiError(err error) *biostarErr.MultiErrorResponse {
  st, ok := status.FromError(err)
  if ok && len(st.Details()) == 1 {
    errInfo, ok := st.Details()[0].(*biostarErr.MultiErrorResponse)

    if ok {
      return errInfo
    }
  }

  return nil
}

```

