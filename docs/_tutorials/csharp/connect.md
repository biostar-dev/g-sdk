---
title: "Connect API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/connect/test/test.csproj_ file as needed.
5. Change the server information in _example/connect/test/Program.cs_ as needed.
   
    ```csharp
    // the path of the root certificate
    private const string GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt";

    // the ip address of the gateway
    private const string GATEWAY_ADDR = "192.168.0.2";
    private const int GATEWAY_PORT = 4000;
    ```
6. Build and run.

    ```
    cd example/connect/test
    dotnet run
    ```

## 1. CLI 

With the Command-Line Interface(CLI), you can test 5 functions related to connection management. 

```
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

***** Found Devices: 9
{ "deviceID": 544114231, "type": "BIOENTRY_W2", "useDHCP": true, "IPAddr": "192.168.0.104", "port": 51211 }
{ "deviceID": 540092578, "type": "BIOSTATION_L2", "useDHCP": true, "IPAddr": "192.168.0.120", "port": 51211, "useSSL": true }
{ "deviceID": 846, "type": "BIOLITE_N2", "useDHCP": true, "IPAddr": "192.168.0.117", "port": 51211 }
{ "deviceID": 939342898, "type": "BIOSTATION_A2", "useDHCP": true, "connectionMode": "DEVICE_TO_SERVER", "IPAddr": "192.168.0.121", "port": 51211, "useSSL": true }
{ "deviceID": 939342902, "type": "BIOSTATION_A2", "useDHCP": true, "IPAddr": "192.168.0.125", "port": 51211, "useSSL": true }
{ "deviceID": 939504224, "type": "BIOSTATION_A2", "useDHCP": true, "IPAddr": "192.168.0.110", "port": 51211 }
{ "deviceID": 542190033, "type": "FACESTATION_2", "useDHCP": true, "IPAddr": "192.168.0.123", "port": 51211 }
{ "deviceID": 547634389, "type": "BIOSTATION_2", "useDHCP": true, "IPAddr": "192.168.0.100", "port": 51211 }
{ "deviceID": 547634480, "type": "BIOSTATION_2", "useDHCP": true, "IPAddr": "192.168.0.106", "port": 51211 }
```

### (2) Connect to a device synchronously

The simplest way of connecting to a device is to use [Connect.Connect]({{'/api/connect/' | relative_url }}#connect). 

```
>>>>> Select a menu: 2
>> Enter the IP address of the device: 192.168.0.104
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
Connecting to the device...
Connected to 544114231

Status: { "deviceID": 544114231, "status": "TCP_CONNECTED", "timestamp": 1582834749 }
```

### (3) Manage asynchronous connections 

When you have to manage permanent connections to multiple devices, [asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection) would be a better choice. With these APIs, the gateway will handle connections to devices in the background. For example, if some devices are disconnected, the gateway will try to reconnect them automatically. 

```
>>>>> Select a menu: 3
Getting the async connections...

***** Async Connections: 0

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
Adding async connections...
Getting the async connections...

***** Async Connections: 2
{ "deviceID": 540092578, "IPAddr": "192.168.0.120", "port": 51211, "autoReconnect": true, "useSSL": true }
{ "deviceID": 939504224, "IPAddr": "192.168.0.110", "port": 51211, "autoReconnect": true }

Status: { "deviceID": 939504224, "status": "TCP_CONNECTED", "timestamp": 1582834990 }
Status: { "deviceID": 540092578, "status": "TLS_CONNECTED", "timestamp": 1582834992 }
```

### (4) Accept devices

In some environments, the devices should connect to the gateway, not vice versa. For devices to connect to the gateway, you have to do the followings;

1. Change the connection mode to __DEVICE_TO_SERVER__ using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode).
2. By default, the gateway will not accept any incoming connections. You have to add the devices to the accept filter using [Connect.SetAcceptFilter]({{'/api/connect' | relative_url}}#setacceptfilter). 

```
>>>>> Select a menu: 4
Getting the accept filter...

***** Accept Filter: { }

Getting the pending device list...

***** Pending Devices: 1
{ "deviceID": 939342898, "IPAddr": "192.168.0.121", "lastTry": 1582835070 }

===== Accept Menu =====

(1) Add devices to the filter
(2) Delete devices from the filter
(3) Allow all devices
(4) Disallow all devices
(5) Refresh the pending device list
(q) Return to Main Menu

>>>>> Select a menu: 3
Getting the accept filter...

***** Accept Filter: { "allowAll": true }

Status: { "deviceID": 939342898, "status": "TLS_CONNECTED", "timestamp": 1582835082 }
```

### (5) Configure connection-related options

Apart from the IP address, there are two important options for device connections. You can change the connection mode using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode) and enable/disable SSL using the [SSL APIs]({{'/api/connect' | relative_url}}#ssl).

```
>>>>> Select a menu: 5
Getting the devices managed by the gateway...

***** Managed Devices: 4
{ "deviceID": 544114231, "IPAddr": "192.168.0.104", "port": 51211, "status": "TCP_CONNECTED" }
{ "deviceID": 540092578, "IPAddr": "192.168.0.120", "port": 51211, "status": "TLS_CONNECTED", "autoReconnect": true, "useSSL": true }
{ "deviceID": 939504224, "IPAddr": "192.168.0.110", "port": 51211, "status": "TCP_CONNECTED", "autoReconnect": true }
{ "deviceID": 939342898, "connectionMode": "DEVICE_TO_SERVER", "IPAddr": "192.168.0.121", "status": "TLS_CONNECTED", "useSSL": true }

===== Device Menu =====

(1) Set connection mode
(2) Enable SSL
(3) Disable SSL
(4) Disconnect devices
(5) Disconnect all devices
(6) Refresh the managed device list
(q) Return to Main Menu

>>>>> Select a menu: 2
Enter the device IDs to enable
>> Enter the device ID (Press just ENTER if no more device): 54414231
>> Enter the device ID (Press just ENTER if no more device):
```

To change these options, you have to connect to the devices first using menu (2) ~ (4). 
{: .notice--warning}


## 2. Synchronous connections

You can use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) to manage the connections by yourself. 

```csharp
class ConnectSvc {
  //...
  public uint Connect(ConnectInfo connectInfo) {
    var request = new ConnectRequest{ ConnectInfo = connectInfo };
    var response = connectClient.Connect(request);

    return response.DeviceID;
  } 

  public void Disconnect(uint[] deviceIDs) {
    var request = new DisconnectRequest{};
    request.DeviceIDs.AddRange(deviceIDs);

    connectClient.Disconnect(request);
  }  
}
```

```csharp
  var connInfo = GetConnectInfo();

  if(connInfo != null) {
    try {
      uint devID = connectSvc.Connect(connInfo);
      Console.WriteLine("Connected to {0}", devID);

      // do something with devID

      connectSvc.Disconnect(new uint[]{devID});
    } catch(Exception e) {
      Console.WriteLine("Cannot connect to the device: {0}", e);
    }
  }
```

## 3. Asynchronous connections

With the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection), you only have to register or deregister devices. The gateway will handle all the connection related tasks in the background. 

```csharp
class ConnectSvc {
  //...
  public void AddAsyncConnection(AsyncConnectInfo[] asyncConns) {
    var request = new AddAsyncConnectionRequest{};
    request.ConnectInfos.AddRange(asyncConns);

    connectClient.AddAsyncConnection(request);
  }

  public void DeleteAsyncConnection(uint[] deviceIDs) {
    var request = new DeleteAsyncConnectionRequest{};
    request.DeviceIDs.AddRange(deviceIDs);

    connectClient.DeleteAsyncConnection(request);
  }  
}  
```

You have to use [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist) to get the status of the registered devices. 

```csharp
public static void ShowAsyncConnection() {
  try {
    var devList = connectSvc.GetDeviceList();
    var asyncConns = new List<DeviceInfo>();

    for(int i = 0; i < devList.Count; i++) {
      if(devList[i].AutoReconnect) { // AutoReconnect is true for the devices added by AddAsyncConnection
        asyncConns.Add(devList[i]);
      }
    }

    // show asyncConns

  } catch(Exception e) {
    Console.WriteLine("Cannot get the async connections: {0}", e);
  }
}
```

## 4. Accept devices

```csharp
class ConnectSvc {
  //...
  public AcceptFilter GetAcceptFilter() {
    var request = new GetAcceptFilterRequest{};
    var response = connectClient.GetAcceptFilter(request);

    return response.Filter;
  }    

  public void SetAcceptFilter(AcceptFilter filter) {
    var request = new SetAcceptFilterRequest{ Filter = filter };
    connectClient.SetAcceptFilter(request);
  } 
}
```

By default, the gateway will not accept any incoming connections. [Connect.GetPendingList]({{'/api/connect/' | relative_url }}#getpendinglist) can be used to get the devices, which are trying to connect to the gateway but not in the accept filter. 

```csharp
class ConnectSvc {
  //...
  public RepeatedField<Connect.PendingDeviceInfo> GetPendingList() {
    var request = new GetPendingListRequest{};
    var response = connectClient.GetPendingList(request);

    return response.DeviceInfos;
  }
}
```

You can allow all the incoming connections by setting [AcceptFilter.allowAll]({{'/api/connect/' | relative_url }}#AcceptFilter) to true. Or, you can specify the devices to be allowed in [AcceptFilter.deviceIDs]({{'/api/connect/' | relative_url }}#AcceptFilter).

```csharp
public static void AllowAll() {
  AcceptFilter filter = new AcceptFilter{ AllowAll = true };

  try {
    connectSvc.SetAcceptFilter(filter);
    ShowAcceptFilter();
  } catch(Exception e) {
    Console.WriteLine("Cannot allow all devices: {0}", e);
  }
}

public static void AddDevices() {
  Console.WriteLine("Enter the device IDs to add");

  uint[] deviceIDs = Menu.GetDeviceIDs();

  if(deviceIDs == null) {
    return;
  }

  try {
    AcceptFilter filter = connectSvc.GetAcceptFilter();
    
    for(int i = 0; i < deviceIDs.Length; i++) {
      if(!filter.DeviceIDs.Contains(deviceIDs[i])) {
        filter.DeviceIDs.Add(deviceIDs[i]);
      }
    }

    filter.AllowAll = false;

    connectSvc.SetAcceptFilter(filter);
    ShowAcceptFilter();
  } catch(Exception e) {
    Console.WriteLine("Cannot add the devices to the filter: {0}", e);
  }     
}
```

## 5. Connection status

Apart from [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist), you can also get the realtime update using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url }}#subscribestatus).

```csharp
class ConnectSvc {
  //...
  public IAsyncStreamReader<StatusChange> Subscribe(int queueSize) {
    var request = new SubscribeStatusRequest{ QueueSize = queueSize };
    var streamCall = connectClient.SubscribeStatus(request);

    return streamCall.ResponseStream;
  }
}
```

```csharp
public CancellationTokenSource SubscribeDeviceStatus() {
    var devStatusStream = connectSvc.Subscribe(STATUS_QUEUE_SIZE);

    CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();

    ReceiveStatus(devStatusStream, cancellationTokenSource.Token);

    return cancellationTokenSource;
}

static async void ReceiveStatus(IAsyncStreamReader<StatusChange> stream, CancellationToken token) {
    Console.WriteLine("Start receiving device status");

    try {
        while(await stream.MoveNext(token)) {
            var statusChange = stream.Current;
            if(statusChange.Status != Connect.Status.TlsNotAllowed && statusChange.Status != Connect.Status.TcpNotAllowed) {
                Console.WriteLine("\n\nStatus: {0}\n", statusChange);        
            }
        }
    } catch (Exception e) {
        Console.WriteLine("Monitoring error: {0}", e);
    } finally {
        Console.WriteLine("Stop receiving device status");
    }
}
```

## 6. Connection mode

```csharp
class ConnectSvc {
  //...
  public void SetConnectionMode(uint[] deviceIDs, ConnectionMode mode) {
    var request = new SetConnectionModeMultiRequest{ ConnectionMode = mode };
    request.DeviceIDs.AddRange(deviceIDs);

    connectClient.SetConnectionModeMulti(request);
  }
}
```

After setting the connection mode, you have to use different APIs accordingly. With __SERVER_TO_DEVICE__, you should use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) or the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection). to connect to the devices. With __DEVICE_TO_SERVER__, the [AcceptFilter]({{'/api/connect' | relative_url}}#AcceptFilter) should be configured correctly. 
{: .notice--warning}

## 7. SSL

TLS 1.2 can be used for more secure communication between the gateway and devices. Refer to [Secure Communication]({{'/api/connect/' | relative_url }}#secure-communication) for details. 

```csharp
class ConnectSvc {
  //...
  public void EnableSSL(uint[] deviceIDs) {
    var request = new EnableSSLMultiRequest{};
    request.DeviceIDs.AddRange(deviceIDs);

    connectClient.EnableSSLMulti(request);
  }

  public void DisableSSL(uint[] deviceIDs) {
    var request = new DisableSSLMultiRequest{};
    request.DeviceIDs.AddRange(deviceIDs);

    connectClient.DisableSSLMulti(request);
  }
}
```

