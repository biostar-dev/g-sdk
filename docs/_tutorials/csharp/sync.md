---
title: "User Synchronization"
toc: true
toc_label: "Table of Contents"
---

This example shows how to synchronize user information between devices. You need an enrollment device and one or more other devices. The example will monitor the realtime events of the enrollment device, and propagate user information to the other devices whenever there is any change. 

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/sync/sync.csproj_ file as needed.
5. Change the gateway information in _example/sync/Program.cs_ as needed.

    ```csharp
    private const string GATEWAY_CA_FILE = "../../../cert/gateway/ca.crt";
    private const string GATEWAY_ADDR = "192.168.0.2";
    private const int GATEWAY_PORT = 4000;
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

    ```
    cd example/sync
    dotnet run
    ```

## 1. CLI

With the Command-Line Interface(CLI), you can select one of 6 menus.

```
$ dotnet run
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
    "last_event_id": 35122
  },
  "devices": [
    {
      "device_id": 543664528,
      "ip_addr": "192.168.0.135",
      "port": 51211,
      "use_ssl": false,
      "last_event_id": 6359
    },
    {
      "device_id": 547634389,
      "ip_addr": "192.168.0.100",
      "port": 51211,
      "use_ssl": true,
      "last_event_id": 295381
    }
  ]
}

***** Connected Devices: 939504224, 543664528, 547634389
```

### (2) Enroll a user

Enroll a user with a card on the enrollment device. The new user will be enrolled to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```
>>>>> Select a menu: 4
>> Enter the user ID: 1000
>>> Place a unregistered CSN card on the device 939504224...

[EVENT] 6/20/2021 2:34:12 PM: Device 939504224, User 1000, User enrollment success
Trying to synchronize the enrolled user 1000...
[EVENT] 6/20/2021 2:34:09 PM: Device 543664528, User 1000, User enrollment success
[EVENT] 6/20/2021 2:34:13 PM: Device 547634389, User 1000, User enrollment success
```

### (3) Show the new user

Check if the user is enrolled to all the devices.

```
>>>>> Select a menu: 3
Read new users from device 939504224...
New users: [ { "hdr": { "ID": "1000", "numOfCard": 1 }, "setting": { "biometricAuthMode": 255, "cardAuthMode": 255, "IDAuthMode": 255, "securityLevel": 2, "faceAuthExtMode": 255, "fingerAuthExtMode": 255, "cardAuthExtMode": 255, "IDAuthExtMode": 255 }, "cards": [ { "type": "CARD_TYPE_CSN", "size": 32, "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdGOrTU4A=" } ] } ]
Read new users from device 543664528...
New users: [ { "hdr": { "ID": "1000", "numOfCard": 1 }, "setting": { "biometricAuthMode": 255, "cardAuthMode": 255, "IDAuthMode": 255, "securityLevel": 2, "faceAuthExtMode": 255, "fingerAuthExtMode": 255, "cardAuthExtMode": 255, "IDAuthExtMode": 255 }, "cards": [ { "type": "CARD_TYPE_CSN", "size": 32, "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdGOrTU4A=" } ] } ]
Read new users from device 547634389...
New users: [ { "hdr": { "ID": "1000", "numOfCard": 1 }, "setting": { "biometricAuthMode": 255, "cardAuthMode": 255, "IDAuthMode": 255, "securityLevel": 2, "faceAuthExtMode": 255, "fingerAuthExtMode": 255, "cardAuthExtMode": 255, "IDAuthExtMode": 255 }, "cards": [ { "type": "CARD_TYPE_CSN", "size": 32, "data": "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQdGOrTU4A=" } ] } ]
```

### (4) Delete the new user

Delete the new user on the enrollment device. The new user will also be deleted from the other devices using [User.DeleteMulti]({{'/api/user/' | relative_url}}#deletemulti).

```
>>>>> Select a menu: 5
>> Enter the user ID: 1000

[EVENT] 6/20/2021 2:35:29 PM: Device 939504224, User 1000, User delete success
Trying to synchronize the deleted user 1000...
[EVENT] 6/20/2021 2:35:27 PM: Device 543664528, User 1000, User delete success
[EVENT] 6/20/2021 2:35:31 PM: Device 547634389, User 1000, User delete success
```

### (5) Show new events

Show the event logs generated during the test. 

```
>>>>> Select a menu: 2
Read new event logs from device 939504224...
Read 2 event logs
Show the last 2 events...
[EVENT] 6/20/2021 2:37:08 PM: Device 939504224, User 1000, User delete success
[EVENT] 6/20/2021 2:37:04 PM: Device 939504224, User 1000, User enrollment success
Read new event logs from device 543664528...
Read 2 event logs
Show the last 2 events...
[EVENT] 6/20/2021 2:37:05 PM: Device 543664528, User 1000, User delete success
[EVENT] 6/20/2021 2:37:01 PM: Device 543664528, User 1000, User enrollment success
Read new event logs from device 547634389...
Read 2 event logs
Show the last 2 events...
[EVENT] 6/20/2021 2:37:09 PM: Device 547634389, User 1000, User delete success
[EVENT] 6/20/2021 2:37:05 PM: Device 547634389, User 1000, User enrollment success
```

## 2. Device Manager

DeviceMgr connects to the devices using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). 

```csharp
public void ConnectToDevices() {
  var connInfos = testConfig.GetAsyncConnectInfo();
  connectSvc.AddAsyncConnection(connInfos);
}
```

And, it monitors the connection events from the devices using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url}}#subscribestatus). If a new connection is detected, it will call the callback function, __EventMgr.HandleConnection__.

```csharp
syncTest.deviceMgr.HandleConnection(syncTest.eventMgr.HandleConnection);

public void HandleConnection(ConnectionCallback callback) {
  connCallback = callback;
  var devStatusStream = connectSvc.Subscribe(STATUS_QUEUE_SIZE);
  cancelToken = new CancellationTokenSource();
  ReceiveStatus(this, devStatusStream, cancelToken.Token);
}

static async void ReceiveStatus(DeviceMgr mgr, IAsyncStreamReader<StatusChange> stream, CancellationToken token) {
  try {
    while(await stream.MoveNext(token)) {
      var statusChange = stream.Current;
      if(statusChange.Status == Connect.Status.TcpConnected || statusChange.Status == Connect.Status.TlsConnected) {
        mgr.connectedIDs.Add(statusChange.DeviceID);

        if(mgr.connCallback != null) {
          mgr.connCallback(statusChange.DeviceID);
        }
      } else if(statusChange.Status == Connect.Status.Disconnected) {
        mgr.connectedIDs.Remove(statusChange.DeviceID);
      }
    }
  } 
}   
```

## 3. Event Manager

EventMgr monitors the events from the devices using [Event.SubscribeRealtimeLog]({{'/api/event/' | relative_url}}#subscriberealtimelog). If an event is detected, it will call the callback function, __UserMgr.SyncUser__.

```csharp
syncTest.eventMgr.HandleEvent(syncTest.userMgr.SyncUser);

public void HandleEvent(EventCallback callback) {
  eventSvc.SetCallback(callback);
  eventSvc.StartMonitoring();
}

class EventSvc{
  public void StartMonitoring() {
    try {
      var subscribeRequest = new SubscribeRealtimeLogRequest{ QueueSize = MONITORING_QUEUE_SIZE };
      var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

      cancellationTokenSource = new CancellationTokenSource();

      ReceiveEvents(this, call.ResponseStream, cancellationTokenSource.Token);
    } 
  }    

  static async void ReceiveEvents(EventSvc svc, IAsyncStreamReader<EventLog> stream, CancellationToken token) {
    try {
      while(await stream.MoveNext(token)) {
        var eventLog = stream.Current;

        if(svc.callback != null) {
          svc.callback(eventLog);
        } else {
          Console.WriteLine("Event: {0}", eventLog);        
        }
      }
    } 
  }
}
```

## 4. User Manager

__UserMgr.SyncUser__ shows how to synchronize user information based on the realtime events. If a user is enrolled on the enrollment device, it will get the user information first using [User.Get]({{'/api/user/' | relative_url}}#get). Then, it will propagate the new user to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```csharp
public void SyncUser(EventLog eventLog) {
  // Handle only the events of the enrollment device
  if(eventLog.DeviceID != testConfig.configData.enroll_device.device_id) {
    return;
  }

  var connectedIDs = deviceMgr.GetConnectedDevices(false);
  var targetDeviceIDs = testConfig.GetTargetDeviceIDs(connectedIDs);

  if(eventLog.EventCode == BS2_EVENT_USER_ENROLL_SUCCESS || eventLog.EventCode == BS2_EVENT_USER_UPDATE_SUCCESS) {
    string[] userIDs = { eventLog.UserID };
    UserInfo[] newUserInfos = { userSvc.GetUser(eventLog.DeviceID, userIDs)[0] };

    userSvc.EnrollMulti(targetDeviceIDs, newUserInfos);
  } else if(eventLog.EventCode == BS2_EVENT_USER_DELETE_SUCCESS) {
    string[] userIDs = { eventLog.UserID };
    userSvc.DeleteMulti(targetDeviceIDs, userIDs);
  }
}
```

## 5. Multi Error Handling

When a [Multi command]({{'/api/' | relative_url}}#xxx_multi-command) fails on one or more devices, the gateway will return a [Err.MultiErrorResponse]({{'/api/err/' | relative_url}}#MultiErrorResponse). You can get the information as below.

```csharp
using System;
using Err;
using Grpc.Core;
using Google.Protobuf.WellKnownTypes;

class ErrSvc
{
  public static MultiErrorResponse GetMultiError(RpcException e) {
    var enumerator = e.Trailers.GetEnumerator();

    while(enumerator.MoveNext()) {
      var status = Google.Rpc.Status.Parser.ParseFrom(enumerator.Current.ValueBytes);

      foreach(Any any in status.Details) {
        if(any.TryUnpack(out MultiErrorResponse errResponse)) {
          return errResponse;
        }
      }
    }

    return null; 
  }
}
```

