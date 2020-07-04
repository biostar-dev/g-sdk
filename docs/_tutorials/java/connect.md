---
title: "Connect API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server information in _src/main/java/com/supremainc/sdk/example/connect/test/ConnectTest.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String CA_FILE = "ca.crt";

    // the ip address of the gateway
    private static final String SERVER_ADDR = "192.168.0.2";
    private static final int SERVER_PORT = 4000;
    ```
5. Build.

    ```
    ./gradlew installDist
    ```
6. Run.
   
    ```
    ./build/install/java/bin/connectTest
    ```


## 1. CLI 

With the Command-Line Interface(CLI), you can test 5 functions related to connection management. 

```
$ ./build/install/java/bin/connectTest

===== Main Menu =====

(1) Search devices
(2) Connect to a device synchronously
(3) Manage asynchronous connections
(4) Accept devices
(5) Device menu
(q) Quit

>>>>> Select a menu:
```

### (1) Search devices

To connect devices, you have to know their addresses and related options such as connection mode. By using [Connect.SearchDevice]({{'/api/connect/' | relative_url }}#searchdevice), you can get these information in a subnet. 


```
>>>>> Select a menu: 1
Searching devices in the subnet...

***** Found devices:
[deviceID: 540092578
type: BIOSTATION_L2
useDHCP: true
IPAddr: "192.168.0.120"
port: 51211
useSSL: true
, deviceID: 544114231
type: BIOENTRY_W2
useDHCP: true
IPAddr: "192.168.0.104"
port: 51211
, deviceID: 939342898
type: BIOSTATION_A2
useDHCP: true
connectionMode: DEVICE_TO_SERVER
IPAddr: "192.168.0.121"
port: 51211
useSSL: true
```

### (2) Connect to a device synchronously

The simplest way of connecting to a device is to use [Connect.Connect]({{'/api/connect/' | relative_url }}#connect). 

```
>>>>> Select a menu: 2
>> Enter the IP address of the device: 192.168.0.104
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
Connecting to a device synchronously...

[STATUS] Device status change:
deviceID: 544114231
status: TCP_CONNECTED
timestamp: 1582827165


***** Connected to device 544114231
```

### (3) Manage asynchronous connections 

When you have to manage permanent connections to multiple devices, [asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection) would be a better choice. With these APIs, the gateway will handle connections to devices in the background. For example, if some devices are disconnected, the gateway will try to reconnect them automatically. 

```
>>>>> Select a menu: 3
Getting the asynchronous connections...

***** Async Connections:
[]

===== Async Menu =====

(1) Add async connections
(2) Delete async connections
(3) Refresh the connection list
(q) Return to Main Menu

>>>>> Select a menu: 1
>> Enter the device ID (Press just ENTER if no more device): 540092578
>> Enter the IP address of the device: 192.168.0.120
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n): y
>> Enter the device ID (Press just ENTER if no more device): 939504224
>> Enter the IP address of the device: 192.168.0.110
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
>> Enter the device ID (Press just ENTER if no more device):
Getting the asynchronous connections...

***** Async Connections:
[deviceID: 540092578
IPAddr: "192.168.0.120"
port: 51211
autoReconnect: true
useSSL: true
, deviceID: 939504224
IPAddr: "192.168.0.110"
port: 51211
autoReconnect: true
]

[STATUS] Device status change:
deviceID: 939504224
status: TCP_CONNECTED
timestamp: 1582827244

[STATUS] Device status change:
deviceID: 540092578
status: TLS_CONNECTED
timestamp: 1582827246
```

### (4) Accept devices

In some environments, the devices should connect to the gateway, not vice versa. For devices to connect to the gateway, you have to do the followings;

1. Change the connection mode to __DEVICE_TO_SERVER__ using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode).
2. By default, the gateway will not accept any incoming connections. You have to add the devices to the accept filter using [Connect.SetAcceptFilter]({{'/api/connect' | relative_url}}#setacceptfilter). 

```
>>>>> Select a menu: 4
Getting the accept filter...

***** Accept Filter:

Getting the pending device list...

***** Pending Devices:
[deviceID: 939342898
IPAddr: "192.168.0.121"
lastTry: 1582827310
]

===== Accept Menu =====

(1) Add devices to the filter
(2) Delete devices from the filter
(3) Allow all devices
(4) Disallow all devices
(5) Refresh the pending device list
(q) Return to Main Menu

>>>>> Select a menu: 3
Getting the accept filter...

***** Accept Filter:
allowAll: true

[STATUS] Device status change:
deviceID: 939342898
status: TLS_CONNECTED
timestamp: 1582827334
```

### (5) Configure connection-related options

Apart from the IP address, there are two important options for device connections. You can change the connection mode using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode) and enable/disable SSL using the [SSL APIs]({{'/api/connect' | relative_url}}#ssl).

```
>>>>> Select a menu: 5
Getting the devices managed by the gateway...

***** Managed Devices:
[deviceID: 544114231
IPAddr: "192.168.0.104"
port: 51211
status: TCP_CONNECTED
, deviceID: 540092578
IPAddr: "192.168.0.120"
port: 51211
status: TLS_CONNECTED
autoReconnect: true
useSSL: true
, deviceID: 939504224
IPAddr: "192.168.0.110"
port: 51211
status: TCP_CONNECTED
autoReconnect: true
, deviceID: 939342898
connectionMode: DEVICE_TO_SERVER
IPAddr: "192.168.0.121"
status: TLS_CONNECTED
useSSL: true
]

===== Device Menu =====

(1) Set connection mode
(2) Enable SSL
(3) Disable SSL
(4) Disconnect
(5) Disconnect all
(6) Refresh the device list
(q) Return to Main Menu

>>>>> Select a menu: 2

Enter the device IDs to enable SSL
>> Enter the device ID (Press just ENTER if no more device): 54414231
>> Enter the device ID (Press just ENTER if no more device):
```

To change these options, you have to connect to the devices first using menu (2) ~ (4). 
{: .notice--warning}


## 2. Synchronous connections

You can use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) to manage the connections by yourself. 

```java
public class ConnectSvc {
  //...
  public int connect(ConnectInfo connInfo) throws Exception {
    ConnectRequest request = ConnectRequest.newBuilder().setConnectInfo(connInfo).build();

    ConnectResponse response = connectStub.connect(request);

    return response.getDeviceID();
  }

  public void disconnect(int deviceID) throws Exception {
    DisconnectRequest request = DisconnectRequest.newBuilder().addDeviceIDs(deviceID).build();
    connectStub.disconnect(request);
  }  
}
```

```java
ConnectInfo connInfo = MenuUtil.getConnectInfo(); // getting the connection info from user

try {
  int deviceID = connectSvc.connect(connInfo);
  System.out.printf("\n***** Connected to device %d\n", deviceID);

  // do something with the devID

  connectSvc.disconnect(deviceID);
} catch (Exception e) {
  System.out.printf("Cannot connect to the device: %s\n", e.getMessage());
}
```

## 3. Asynchronous connections

With the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection), you only have to register or deregister devices. The gateway will handle all the connection related tasks in the background. 

```java
public class ConnectSvc {
  //...
  public void addAsyncConnection(List<AsyncConnectInfo> connectInfos) throws Exception {
    AddAsyncConnectionRequest request = AddAsyncConnectionRequest.newBuilder().addAllConnectInfos(connectInfos).build();
    connectStub.addAsyncConnection(request);
  } 

  public void deleteAsyncConnection(List<Integer> deviceIDs) throws Exception {
    DeleteAsyncConnectionRequest request = DeleteAsyncConnectionRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.deleteAsyncConnection(request);
  } 
}  
```

You have to use [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist) to get the status of the registered devices. 

```java
public void showAsyncConnection() {
  try {
    List<DeviceInfo> asyncConnList = new ArrayList();

    List<DeviceInfo> devList = connectSvc.getDeviceList();

    for(int i = 0; i < devList.size(); i++) {
      if(devList.get(i).getAutoReconnect()) { // autoReconnect is true for the devices added by addAsyncConnection
        asyncConnList.add(devList.get(i));
      }
    }

    System.out.printf("\n***** Async Connections: \n%s\n", asyncConnList);
  } catch (Exception e) {
    System.out.printf("Cannot get the device list: %s\n", e.getMessage());
    return;
  }      
}
```

## 4. Accept devices

```java
public class ConnectSvc {
  //...
  public AcceptFilter getAcceptFilter() throws Exception {
    GetAcceptFilterRequest request = GetAcceptFilterRequest.newBuilder().build();
    GetAcceptFilterResponse response = connectStub.getAcceptFilter(request);

    return response.getFilter();
  }

  public void setAcceptFilter(AcceptFilter filter) throws Exception {
    SetAcceptFilterRequest request = SetAcceptFilterRequest.newBuilder().setFilter(filter).build();
    connectStub.setAcceptFilter(request);
  }
}
```

By default, the gateway will not accept any incoming connections. [Connect.GetPendingList]({{'/api/connect/' | relative_url }}#getpendinglist) can be used to get the devices, which are trying to connect to the gateway but not in the accept filter. 

```java
public class ConnectSvc {
  //...
  public List<PendingDeviceInfo> getPendingList() throws Exception {
    GetPendingListRequest request = GetPendingListRequest.newBuilder().build();
    GetPendingListResponse response = connectStub.getPendingList(request);
    return response.getDeviceInfosList();
  } 
}
```

You can allow all the incoming connections by setting [AcceptFilter.allowAll]({{'/api/connect/' | relative_url }}#AcceptFilter) to true. Or, you can specify the devices to be allowed in [AcceptFilter.deviceIDs]({{'/api/connect/' | relative_url }}#AcceptFilter).

```java
class AllowAll implements MenuCallback {
  public void run() {
    AcceptFilter filter = AcceptFilter.newBuilder().setAllowAll(true).build();

    try {
      connectSvc.setAcceptFilter(filter);
      showAcceptFilter();
    } catch (Exception e) {
      System.out.printf("Cannot allow all devices: %s\n", e.getMessage());
    }
  }
}

class AddDevices implements MenuCallback {
  public void run() {
    System.out.printf("\nEnter the device IDs to add\n");

    List<Integer> deviceIDs = Menu.getDeviceIDs();      

    try {
      AcceptFilter oldFilter = connectSvc.getAcceptFilter();

      List<Integer> newDeviceIDs = new ArrayList<Integer>();
      for(int i = 0; i < oldFilter.getDeviceIDsCount(); i++) {
        newDeviceIDs.add(oldFilter.getDeviceIDs(i));
      }

      for(int i = 0; i < deviceIDs.size(); i++) {
        if(!newDeviceIDs.contains(deviceIDs.get(i))) {
          newDeviceIDs.add(deviceIDs.get(i));
        }
      }

      AcceptFilter newFilter = AcceptFilter.newBuilder().setAllowAll(false).addAllDeviceIDs(newDeviceIDs).build();

      connectSvc.setAcceptFilter(newFilter);
      showAcceptFilter();
    } catch (Exception e) {
      System.out.printf("Cannot add devices to the filter: %s\n", e.getMessage()); 
    }
  }
}
```

## 5. Connection status

Apart from [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist), you can also get the realtime update using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url }}#subscribestatus).

```java
public class ConnectSvc {
  //...
  public Iterator<StatusChange> subscribe() throws Exception {
    SubscribeStatusRequest request = SubscribeStatusRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).build();
    Iterator<StatusChange> statusStream = connectStub.subscribeStatus(request);

    return statusStream;
  }
}
```

```java
class StatusMonitoring implements Runnable {
  public void run() {
    monitoringCtx = Context.current().withCancellation();
    Context prevCtx = monitoringCtx.attach();

    try {
      Iterator<StatusChange> statusStream = connectSvc.subscribe();

      while(statusStream.hasNext()) {
        StatusChange change = statusStream.next();

        if(change.getStatus() != Status.TCP_NOT_ALLOWED && change.getStatus() != Status.TLS_NOT_ALLOWED) {
          System.out.printf("\n[STATUS] Device status change: \n%s\n", change);
        }
      }
    } catch(Exception e) {
      System.out.printf("Monitoring error: %s\n", e);
    } finally {
      monitoringCtx.detach(prevCtx);
    }
  }
} 
```

## 6. Connection mode

```java
public class ConnectSvc {
  //...
  public void setConnectionMode(List<Integer> deviceIDs, ConnectionMode mode) throws Exception {
    SetConnectionModeMultiRequest request = SetConnectionModeMultiRequest.newBuilder().addAllDeviceIDs(deviceIDs).setConnectionMode(mode).build();
    connectStub.setConnectionModeMulti(request);
  }
}
```

After setting the connection mode, you have to use different APIs accordingly. With __SERVER_TO_DEVICE__, you should use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) or the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection). to connect to the devices. With __DEVICE_TO_SERVER__, the [AcceptFilter]({{'/api/connect' | relative_url}}#AcceptFilter) should be configured correctly. 
{: .notice--warning}

## 7. SSL

TLS 1.2 can be used for more secure communication between the gateway and devices. Refer to [Secure Communication]({{'/api/connect/' | relative_url }}#secure-communication) for details. 

```java
public class ConnectSvc {
  //...
  public void enableSSL(List<Integer> deviceIDs) throws Exception {
    EnableSSLMultiRequest request = EnableSSLMultiRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.enableSSLMulti(request);
  }

  public void disableSSL(List<Integer> deviceIDs) throws Exception {
    DisableSSLMultiRequest request = DisableSSLMultiRequest.newBuilder().addAllDeviceIDs(deviceIDs).build();
    connectStub.disableSSLMulti(request);
  }
}
```

