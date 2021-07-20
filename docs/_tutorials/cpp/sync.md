---
title: "User Synchronization"
toc: true
toc_label: "Table of Contents"
---

This example shows how to synchronize user information between devices. You need an enrollment device and one or more other devices. The example will monitor the realtime events of the enrollment device, and propagate user information to the other devices whenever there is any change. 

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway information in _example/sync/main.cpp_ as needed.

    ```cpp
    const std::string GATEWAY_CA_FILE = "../cert/gateway/ca.crt";
    const std::string GATEWAY_ADDR = "192.168.0.2";
    const int GATEWAY_PORT = 4000;
    ```
6. Change the device configurations in _sync_config.json_ as needed.

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
   
7. Build and run.

    * Windows
    
      ```
      cmake .
      ```

      Open _testSync.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testSync
      ```

    * Linux

      ```
      cmake .
      make testSync
      ./testSync
      ```

## 1. CLI

With the Command-Line Interface(CLI), you can select one of 6 menus.

```
$ ./Debug/testSync
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
  "devices": [
    {
      "device_id": 543664528,
      "ip_addr": "192.168.0.135",
      "last_event_id": 6387,
      "port": 51211,
      "use_ssl": false
    },
    {
      "device_id": 547634389,
      "ip_addr": "192.168.0.100",
      "last_event_id": 295409,
      "port": 51211,
      "use_ssl": true
    }
  ],
  "enroll_device": {
    "device_id": 939504224,
    "ip_addr": "192.168.0.110",
    "last_event_id": 35153,
    "port": 51211,
    "use_ssl": false
  }
}
***** Connected Devices: 939504224 543664528 547634389
```

### (2) Enroll a user

Enroll a user with a card on the enrollment device. The new user will be enrolled to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```
>>>>> Select a menu: 4
>> Enter the user ID: 1000
>>> Place a unregistered CSN card on the device 939504224...
[EVENT] 2021-06-20 22:12:57: Device 939504224, User 1000, User enrollment success
Trying to synchronize the enrolled user 1000...
[EVENT] 2021-06-20 22:12:54: Device 543664528, User 1000, User enrollment success
[EVENT] 2021-06-20 22:12:57: Device 547634389, User 1000, User enrollment success
```

### (3) Show the new user

Check if the user is enrolled to all the devices.

```
>>>>> Select a menu: 3
Read new users from device 939504224...
hdr { ID: "1000" numOfCard: 1 } setting { biometricAuthMode: 255 cardAuthMode: 255 IDAuthMode: 255 securityLevel: 2 faceAuthExtMode: 255 fingerAuthExtMode: 255 cardAuthExtMode: 255 IDAuthExtMode: 255 } cards { type: CARD_TYPE_CSN size: 32 data: "\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200" }
Read new users from device 543664528...
hdr { ID: "1000" numOfCard: 1 } setting { biometricAuthMode: 255 cardAuthMode: 255 IDAuthMode: 255 securityLevel: 2 faceAuthExtMode: 255 fingerAuthExtMode: 255 cardAuthExtMode: 255 IDAuthExtMode: 255 } cards { type: CARD_TYPE_CSN size: 32 data: "\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200" }
Read new users from device 547634389...
hdr { ID: "1000" numOfCard: 1 } setting { biometricAuthMode: 255 cardAuthMode: 255 IDAuthMode: 255 securityLevel: 2 faceAuthExtMode: 255 fingerAuthExtMode: 255 cardAuthExtMode: 255 IDAuthExtMode: 255 } cards { type: CARD_TYPE_CSN size: 32 data: "\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200" }
```

### (4) Delete the new user

Delete the new user on the enrollment device. The new user will also be deleted from the other devices using [User.DeleteMulti]({{'/api/user/' | relative_url}}#deletemulti).

```
>>>>> Select a menu: 5
>> Enter the user ID: 1000
[EVENT] 2021-06-20 22:14:13: Device 939504224, User 1000, User delete success
Trying to synchronize the deleted user 1000...
[EVENT] 2021-06-20 22:14:12: Device 547634389, User 1000, User delete success
[EVENT] 2021-06-20 22:14:09: Device 543664528, User 1000, User delete success
```

### (5) Show new events

Show the event logs generated during the test. 

```
>>>>> Select a menu: 2
Read new event logs from device 939504224...
Read 2 event logs
Show the last 2 events...
2021-06-20 22:14:13: Device 939504224, User 1000, User delete success
2021-06-20 22:12:57: Device 939504224, User 1000, User enrollment success
Read new event logs from device 543664528...
Read 2 event logs
Show the last 2 events...
2021-06-20 22:14:09: Device 543664528, User 1000, User delete success
2021-06-20 22:12:54: Device 543664528, User 1000, User enrollment success
Read new event logs from device 547634389...
Read 2 event logs
Show the last 2 events...
2021-06-20 22:14:12: Device 547634389, User 1000, User delete success
2021-06-20 22:12:57: Device 547634389, User 1000, User enrollment success
```

## 2. Device Manager

DeviceMgr connects to the devices using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). 

```cpp
void DeviceMgr::ConnectToDevices() {
  RepeatedPtrField<AsyncConnectInfo> connInfos;
  testConfig_->GetAsyncConnectInfo(connInfos);

  connectSvc_->AddAsyncConnection(connInfos);
}
```

And, it monitors the connection events from the devices using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url}}#subscribestatus). If a new connection is detected, it will call the callback function, __EventMgr.HandleConnection__.

```cpp
deviceMgr->HandleConnection(EventMgr::HandleConnection, eventMgr.get());

void DeviceMgr::HandleConnection(ConnectionCallback callback, void* arg) {
  connCallback_ = callback;
  callbackArg_ = arg;
  statusReader_ = connectSvc_->Subscribe(&subContext_, STATUS_QUEUE_SIZE);
  subThread_ = std::thread(&DeviceMgr::ReceiveStatus, this);
}

void DeviceMgr::ReceiveStatus() {
  StatusChange devStatus;

  while(statusReader_->Read(&devStatus)) {
    if(devStatus.status() == connect::Status::TCP_CONNECTED || devStatus.status() == connect::Status::TLS_CONNECTED) {
      if(connCallback_ != NULL) {
        connCallback_(callbackArg_, devStatus.deviceid());
      }
    } 
  }  

  statusReader_->Finish();    
} 
```

## 3. Event Manager

EventMgr monitors the events from the devices using [Event.SubscribeRealtimeLog]({{'/api/event/' | relative_url}}#subscriberealtimelog). If an event is detected, it will call the callback function, __UserMgr.SyncUser__.

```cpp
eventMgr->HandleEvent(UserMgr::SyncUser, userMgr.get());

void EventMgr::HandleEvent(EventCallback callback, void* arg) {
  eventCallback_ = callback;
  callbackArg_ = arg;
  eventReader_ = eventSvc_->Subscribe(&monitoringContext_, MONITORING_QUEUE_SIZE);
  monitoringThread_ = std::thread(&EventMgr::ReceiveEvent, this);
}

void EventMgr::ReceiveEvent() {
  EventLog eventLog;

  while(eventReader_->Read(&eventLog)) {
    if(eventCallback_) {
      eventCallback_(callbackArg_, eventLog);
    } else {
      std::cout << "[EVENT] " << eventLog.ShortDebugString() << std::endl;
    }
  }  

  eventReader_->Finish();    
}
```

## 4. User Manager

__UserMgr.SyncUser__ shows how to synchronize user information based on the realtime events. If a user is enrolled on the enrollment device, it will get the user information first using [User.Get]({{'/api/user/' | relative_url}}#get). Then, it will propagate the new user to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```cpp
void UserMgr::SyncUser(void* arg, EventLog& eventLog) {
  auto userMgr = static_cast<UserMgr*>(arg);
  uint32_t enrollDeviceID = userMgr->testConfig_->GetConfigData()["enroll_device"]["device_id"];

  // Handle only the events of the enrollment device
  if(eventLog.deviceid() != enrollDeviceID) {
    return;
  }

  std::vector<uint32_t> connectedIDs;
  userMgr->deviceMgr_->GetConnectedDevices(false, connectedIDs);
  std::vector<uint32_t> targetDeviceIDs;
  userMgr->testConfig_->GetTargetDeviceIDs(connectedIDs, targetDeviceIDs);

  if(eventLog.eventcode() == BS2_EVENT_USER_ENROLL_SUCCESS || eventLog.eventcode() == BS2_EVENT_USER_UPDATE_SUCCESS) {
    std::vector<std::string> userIDs;
    userIDs.push_back(eventLog.userid());

    RepeatedPtrField<UserInfo> newUserInfos;
    userMgr->userSvc_->GetUser(eventLog.deviceid(), userIDs, &newUserInfos);

    userMgr->userSvc_->EnrollMulti(targetDeviceIDs, newUserInfos);
  } else if(eventLog.eventcode() == BS2_EVENT_USER_DELETE_SUCCESS) {
    std::vector<std::string> userIDs;
    userIDs.push_back(eventLog.userid()); 

    userMgr->userSvc_->DeleteMulti(targetDeviceIDs, userIDs);
  }
}
```

## 5. Multi Error Handling

When a [Multi command]({{'/api/' | relative_url}}#xxx_multi-command) fails on one or more devices, the gateway will return a [Err.MultiErrorResponse]({{'/api/err/' | relative_url}}#MultiErrorResponse). You can get the information as below.

You have to link _grpc++_error_details_ library. See _CMakeLists.txt_.
{: .notice--info}


```cpp
#include "ErrSvc.h"
#include "grpc/status/status.pb.h"

using google::protobuf::Any;
using RpcStatus = google::rpc::Status;

namespace example {
  bool ErrSvc::GetMultiError(Status& status, MultiErrorResponse* multiError) {
    RpcStatus rpcStatus;
    bool ok = rpcStatus.ParseFromString(status.error_details());
    if(ok) {
      for(auto& any : rpcStatus.details()) {
        if(any.UnpackTo(multiError)) {
          return true;
        }
      }
    }

    return false;
  }
}
```

