---
title: "User Synchronization"
toc: true
toc_label: "Table of Contents"
---

This example shows how to synchronize user information between devices. You need an enrollment device and one or more other devices. The example will monitor the realtime events of the enrollment device, and propagate user information to the other devices whenever there is any change. 

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway information in _src/main/java/com/supremainc/sdk/example/sync/SyncTest.java_ as needed.

    ```java
    private static final String GATEWAY_CA_FILE = "cert/gateway/ca.crt";
    private static final String GATEWAY_ADDR = "192.168.0.2";
    private static final int GATEWAY_PORT = 4000;
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
   
7. Build.

    ```
    ./gradlew installDist
    ```
8. Run.
   
    ```
    ./build/install/java/bin/syncTest
    ```

## 1. CLI

With the Command-Line Interface(CLI), you can select one of 6 menus.

```
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
    "last_event_id": 35110
  },
  "devices": [
    {
      "device_id": 543664528,
      "ip_addr": "192.168.0.135",
      "port": 51211,
      "use_ssl": false,
      "last_event_id": 6347
    },
    {
      "device_id": 547634389,
      "ip_addr": "192.168.0.100",
      "port": 51211,
      "use_ssl": true,
      "last_event_id": 295368
    }
  ]
}

***** Connected Devices: [939504224, 543664528, 547634389]
```

### (2) Enroll a user

Enroll a user with a card on the enrollment device. The new user will be enrolled to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```
>>>>> Select a menu: 4
>> Enter the user ID: 1000
>>> Place a unregistered CSN card on the device 939504224...

[EVENT] 2021-06-20T01:57:36Z: Device 939504224, User 1000, User enrollment success
Trying to synchronize the enrolled user 1000...
[EVENT] 2021-06-20T01:57:35Z: Device 547634389, User 1000, User enrollment success
[EVENT] 2021-06-20T01:57:32Z: Device 543664528, User 1000, User enrollment success
```

### (3) Show the new user

Check if the user is enrolled to all the devices.

```
>>>>> Select a menu: 3
Read new users from device 543664528...
New users: [hdr {
  ID: "1000"
  numOfCard: 1
}
setting {
  biometricAuthMode: 255
  cardAuthMode: 255
  IDAuthMode: 255
  securityLevel: 2
  faceAuthExtMode: 255
  fingerAuthExtMode: 255
  cardAuthExtMode: 255
  IDAuthExtMode: 255
}
cards {
  type: CARD_TYPE_CSN
  size: 32
  data: "\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200"
}
]
Read new users from device 939504224...
New users: [hdr {
  ID: "1000"
  numOfCard: 1
}
setting {
  biometricAuthMode: 255
  cardAuthMode: 255
  IDAuthMode: 255
  securityLevel: 2
  faceAuthExtMode: 255
  fingerAuthExtMode: 255
  cardAuthExtMode: 255
  IDAuthExtMode: 255
}
cards {
  type: CARD_TYPE_CSN
  size: 32
  data: "\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\000\004\035\030\352\323S\200"
}
]
```

### (4) Delete the new user

Delete the new user on the enrollment device. The new user will also be deleted from the other devices using [User.DeleteMulti]({{'/api/user/' | relative_url}}#deletemulti).

```
>>>>> Select a menu: 5
>> Enter the user ID: 1000

[EVENT] 2021-06-20T02:00:50Z: Device 939504224, User 1000, User delete success
Trying to synchronize the deleted user 1000...
[EVENT] 2021-06-20T02:00:49Z: Device 547634389, User 1000, User delete success
[EVENT] 2021-06-20T02:00:46Z: Device 543664528, User 1000, User delete success
```

### (5) Show new events

Show the event logs generated during the test. 

```
>>>>> Select a menu: 2
Read new event logs from device 543664528...
Read 2 event logs
Show the last 2 events...
[EVENT] 2021-06-20T02:00:46Z: Device 543664528, User 1000, User delete success
[EVENT] 2021-06-20T01:57:32Z: Device 543664528, User 1000, User enrollment success
Read new event logs from device 939504224...
Read 2 event logs
Show the last 2 events...
[EVENT] 2021-06-20T02:00:50Z: Device 939504224, User 1000, User delete success
[EVENT] 2021-06-20T01:57:36Z: Device 939504224, User 1000, User enrollment success
Read new event logs from device 547634389...
Read 2 event logs
Show the last 2 events...
[EVENT] 2021-06-20T02:00:49Z: Device 547634389, User 1000, User delete success
[EVENT] 2021-06-20T01:57:35Z: Device 547634389, User 1000, User enrollment success
```

## 2. Device Manager

DeviceMgr connects to the devices using [Asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection). 

```java
public void connectToDevices() throws Exception {
  List<AsyncConnectInfo> connInfos = testConfig.getAsyncConnectInfo();
  connectSvc.addAsyncConnection(connInfos);
}
```

And, it monitors the connection events from the devices using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url}}#subscribestatus). If a new connection is detected, it will call the callback function, __EventMgr.handleConnected__.

```java
syncTest.deviceMgr.handleConnection(syncTest.eventMgr);

public void handleConnection(ConnectionCallback callback) throws Exception {
  monitoringCtx = Context.current().withCancellation();
  prevCtx = monitoringCtx.attach();

  connCallback = callback;
  statusStream = connectSvc.subscribe();

  new Thread(new ConnectionHandler()).start();
}

class ConnectionHandler implements Runnable {
  public void run() {
    try {
      while(statusStream.hasNext()) {
        StatusChange change = statusStream.next();

        if(change.getStatus() == Status.TCP_CONNECTED || change.getStatus() == Status.TLS_CONNECTED) {
          connectedIDs.add(change.getDeviceID());

          if(connCallback != null) {
            connCallback.handleConnected(change.getDeviceID());
          }
        } else if(change.getStatus() == Status.DISCONNECTED) {
          connectedIDs.remove(new Integer(change.getDeviceID()));
        }
      }
    } 
  }
}
```

## 3. Event Manager

EventMgr monitors the events from the devices using [Event.SubscribeRealtimeLog]({{'/api/event/' | relative_url}}#subscriberealtimelog). If an event is detected, it will call the callback function, __UserMgr.syncUser__.

```java
syncTest.eventMgr.handleEvent(syncTest.userMgr);

public void handleEvent(EventCallback callback) throws Exception {
  eventSvc.setEventCallback(callback);
  eventSvc.startMonitoring();
}

class EventMonitoring implements Runnable {
  public void run() {
    CancellableContext monitoringCtx = Context.current().withCancellation();
    Context prevCtx = monitoringCtx.attach();

    eventSvc.setCancellableContext(monitoringCtx);

    try {
      SubscribeRealtimeLogRequest subscribeRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).build();
      Iterator<EventLog> eventStream = eventSvc.getStub().subscribeRealtimeLog(subscribeRequest);

      while(eventStream.hasNext()) {
        EventLog eventLog = eventStream.next();

        if(eventSvc.getEventCallback() != null) {
          eventSvc.getEventCallback().handle(eventLog);
        } else {
          System.out.printf("Event: %s\n", eventLog);
        }
      }
    } 
  }
}
```

## 4. User Manager

__UserMgr.SyncUser__ shows how to synchronize user information based on the realtime events. If a user is enrolled on the enrollment device, it will get the user information first using [User.Get]({{'/api/user/' | relative_url}}#get). Then, it will propagate the new user to the other devices using [User.EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```java
public void syncUser(EventLog eventLog) throws Exception {
  // Handle only the events of the enrollment device
  if(eventLog.getDeviceID() != testConfig.getEnrollDevice().getDeviceID()) {
    return;
  }

  List<Integer> connectedIDs = devMgr.getConnectedDevices(false);
  List<Integer> targetDeviceIDs = testConfig.getTargetDeviceIDs(connectedIDs);

  if(eventLog.getEventCode() == BS2_EVENT_USER_ENROLL_SUCCESS || eventLog.getEventCode() == BS2_EVENT_USER_UPDATE_SUCCESS) {
    List<String> userIDs = new ArrayList<String>();
    userIDs.add(eventLog.getUserID());
    List<UserInfo> newUserInfos = userSvc.getUser(eventLog.getDeviceID(), userIDs);

    try {
      userSvc.enrollMulti(targetDeviceIDs, newUserInfos);
    } catch (Exception e) {
      MultiErrorResponse deviceErrs = ErrSvc.getMultiError(e);
      System.out.printf("Enroll errors: %s", deviceErrs);
    } 
  } else if(eventLog.getEventCode() == BS2_EVENT_USER_DELETE_SUCCESS) {
    List<String> userIDs = new ArrayList<String>();
    userIDs.add(eventLog.getUserID());
    userSvc.deleteMulti(targetDeviceIDs, userIDs);
  } else if(eventLog.getEventCode() == BS2_EVENT_USER_DELETE_ALL_SUCCESS) {
    userSvc.deleteAllMulti(targetDeviceIDs);
  }
}

```

## 5. Multi Error Handling

When a [Multi command]({{'/api/' | relative_url}}#xxx_multi-command) fails on one or more devices, the gateway will return a [Err.MultiErrorResponse]({{'/api/err/' | relative_url}}#MultiErrorResponse). You can get the information as below.

```java
import com.supremainc.sdk.err.MultiErrorResponse;
import com.google.protobuf.Any;
import com.google.rpc.Status;
import io.grpc.protobuf.StatusProto;

public class ErrSvc {
  static public MultiErrorResponse getMultiError(Exception e) {
    Status status = StatusProto.fromThrowable(e);
    MultiErrorResponse response = null;

    for(Any any: status.getDetailsList()) {
      if(any.is(MultiErrorResponse.class)) {
        try {
          response = any.unpack(MultiErrorResponse.class);
        } catch (Exception ge) {
          System.out.printf("Cannot unpack MultiErrorResponse: %s", ge); 
        }
        break;
      }
    }

    return response;
  }
}
```

