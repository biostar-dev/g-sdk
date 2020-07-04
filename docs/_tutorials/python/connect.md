---
title: "Connect API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server information in _example/connect/test/test.py_ as needed.
   
    ```python
    # the path of the root certificate
    GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt'

    # the address of the gateway
    GATEWAY_IP = '192.168.0.2'
    GATEWAY_PORT = 4000
    ```
5. Run.
    ```
    cd example/connect/test
    python test.py    
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
***** Found devices: 9
[deviceID: 544114231
type: BIOENTRY_W2
useDHCP: true
IPAddr: "192.168.0.104"
port: 51211
, deviceID: 540092578
type: BIOSTATION_L2
useDHCP: true
IPAddr: "192.168.0.120"
port: 51211
useSSL: true
, deviceID: 846
type: BIOLITE_N2
useDHCP: true
IPAddr: "192.168.0.117"
port: 51211
```

### (2) Connect to a device synchronously

The simplest way of connecting to a device is to use [Connect.Connect]({{'/api/connect/' | relative_url }}#connect). 

```
>>>>> Select a menu: 2
>> Enter the IP address of the device: 192.168.0.104
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
Connecting to 192.168.0.104:51211...
[TCP_CONNECTED] Device 544114231
Connected to 544114231
```

### (3) Manage asynchronous connections 

When you have to manage permanent connections to multiple devices, [asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection) would be a better choice. With these APIs, the gateway will handle connections to devices in the background. For example, if some devices are disconnected, the gateway will try to reconnect them automatically. 

```
>>>>> Select a menu: 3

***** Async connections: 0
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

***** Async connections: 2
[deviceID: 939504224
IPAddr: "192.168.0.110"
port: 51211
autoReconnect: true
, deviceID: 540092578
IPAddr: "192.168.0.120"
port: 51211
autoReconnect: true
useSSL: true
]

[TCP_CONNECTED] Device 939504224
[TLS_CONNECTED] Device 540092578
```

### (4) Accept devices

In some environments, the devices should connect to the gateway, not vice versa. For devices to connect to the gateway, you have to do the followings;

1. Change the connection mode to __DEVICE_TO_SERVER__ using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode).
2. By default, the gateway will not accept any incoming connections. You have to add the devices to the accept filter using [Connect.SetAcceptFilter]({{'/api/connect' | relative_url}}#setacceptfilter). 

```
>>>>> Select a menu: 4
***** Pending devices: 1
[deviceID: 939342898
IPAddr: "192.168.0.121"
lastTry: 1584650963
]
***** Accept filter:

===== Accept Menu =====

(1) Add devices to the filter
(2) Delete devices from the filter
(3) Allow all devices
(4) Disallow all devices
(5) Refresh the pending device list
(q) Return to Main Menu

>>>>> Select a menu: 3
***** Accept filter:  allowAll: true

[TLS_CONNECTED] Device 939342898
```

### (5) Configure connection-related options

Apart from the IP address, there are two important options for device connections. You can change the connection mode using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode) and enable/disable SSL using the [SSL APIs]({{'/api/connect' | relative_url}}#ssl).

```
>>>>> Select a menu: 5
***** Managed devices: 1
[deviceID: 939342898
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
(5) Disconnect All
(6) Refresh the device list
(q) Return to Main Menu

>>>>> Select a menu: 3
Enter the device ID (Press just ENTER if no more device): 939342898
Enter the device ID (Press just ENTER if no more device):
```

To change these options, you have to connect to the devices first using menu (2) ~ (4). 
{: .notice--warning}


## 2. Synchronous connections

You can use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) to manage the connections by yourself. 

```python
class ConnectSvc:
  # ...

  def connect(self, connInfo):
    response = self.stub.Connect(connect_pb2.ConnectRequest(connectInfo=connInfo))
    return response.deviceID

  def disconnect(self, deviceIDs):
    self.stub.Disconnect(connect_pb2.DisconnectRequest(deviceIDs=deviceIDs))
```

```python
connInfo = getConnectInfo(); # getting the connection info from user

try:
  devID = connectSvc.connect(connInfo)

  # do something with the device

  deviceIDs = [devID]
  connectSvc.disconnect(deviceIDs)

except grpc.RpcError as e:
  print(f'Cannot connect to the device: {e}')
```

## 3. Asynchronous connections

With the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection), you only have to register or deregister devices. The gateway will handle all the connection related tasks in the background. 

```python
class ConnectSvc:
  # ...
  def addAsyncConnection(self, connInfos):
    self.stub.AddAsyncConnection(connect_pb2.AddAsyncConnectionRequest(connectInfos=connInfos))

  def deleteAsyncConnection(self, deviceIDs):
    self.stub.DeleteAsyncConnection(connect_pb2.DeleteAsyncConnectionRequest(deviceIDs=deviceIDs))
}  
```

You have to use [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist) to get the status of the registered devices. 

```python
connInfos = []

try:
  devList = connectSvc.getDeviceList()

  for dev in devList:
    if dev.autoReconnect:
      connInfos.append(dev)

  print(f'\n***** Async connections: {len(connInfos)}', flush=True)

except grpc.RpcError as e:
  print(f'Cannot show the async connections: {e}')      
```

## 4. Accept devices

```python
class ConnectSvc:
  # ...
  def getAcceptFilter(self):
    response = self.stub.GetAcceptFilter(connect_pb2.GetAcceptFilterRequest())
    return response.filter

  def setAcceptFilter(self, filter):
    self.stub.SetAcceptFilter(connect_pb2.SetAcceptFilterRequest(filter=filter))      
}
```

By default, the gateway will not accept any incoming connections. [Connect.GetPendingList]({{'/api/connect/' | relative_url }}#getpendinglist) can be used to get the devices, which are trying to connect to the gateway but not in the accept filter. 

```python
class ConnectSvc:
  # ...
  def getPendingList(self):
    response = self.stub.GetPendingList(connect_pb2.GetPendingListRequest())
    return response.deviceInfos
}
```

You can allow all the incoming connections by setting [AcceptFilter.allowAll]({{'/api/connect/' | relative_url }}#AcceptFilter) to true. Or, you can specify the devices to be allowed in [AcceptFilter.deviceIDs]({{'/api/connect/' | relative_url }}#AcceptFilter).

```python
# allow all devices
filter = connect_pb2.AcceptFilter(allowAll=True)
connectSvc.setAcceptFilter(filter)

# add specific devices to the filter
deviceIDs = getDeviceIDs()

filter = connectSvc.getAcceptFilter()
filter.allowAll = False

for devID in deviceIDs:
  existing = False
  for existingDevID in filter.deviceIDs:
    if devID == existingDevID:
      existing = True
      break

  if not existing:
    filter.deviceIDs.append(devID)

connectSvc.setAcceptFilter(filter)
```


## 5. Connection status

Apart from [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist), you can also get the realtime update using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url }}#subscribestatus).

```python
def getDeviceStatus(statusCh):
  try:
    for status in statusCh:
      if status.status == connect_pb2.DISCONNECTED:
        print(f'[DISCONNECTED] Device {status.deviceID}', flush=True)
      elif status.status == connect_pb2.TLS_CONNECTED:
        print(f'[TLS_CONNECTED] Device {status.deviceID}', flush=True)
      elif status.status == connect_pb2.TCP_CONNECTED:
        print(f'[TCP_CONNECTED] Device {status.deviceID}', flush=True)

  except grpc.RpcError as e:
    if e.code() == grpc.StatusCode.CANCELLED:
      print('Subscription is cancelled', flush=True)    
    else:
      print(f'Cannot get the device status: {e}')   
```

```python
# start monitoring the status changes
statusCh = connectSvc.subscribe(QUEUE_SIZE)
statusThread = threading.Thread(target=getDeviceStatus, args=(statusCh,))
statusThread.start()

# stop monitoring
statusCh.cancel()
statusThread.join()
```

## 6. Connection mode

```python
class ConnectSvc:
  # ...
  def setConnectionMode(self, deviceIDs, mode):
    self.stub.SetConnectionModeMulti(connect_pb2.SetConnectionModeMultiRequest(deviceIDs=deviceIDs, connectionMode=mode))
```

After setting the connection mode, you have to use different APIs accordingly. With __SERVER_TO_DEVICE__, you should use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) or the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection). to connect to the devices. With __DEVICE_TO_SERVER__, the [AcceptFilter]({{'/api/connect' | relative_url}}#AcceptFilter) should be configured correctly. 
{: .notice--warning}

## 7. SSL

TLS 1.2 can be used for more secure communication between the gateway and devices. Refer to [Secure Communication]({{'/api/connect/' | relative_url }}#secure-communication) for details. 

```python
class ConnectSvc:
  # ...
  def enableSSL(self, deviceIDs):
    self.stub.EnableSSLMulti(connect_pb2.EnableSSLMultiRequest(deviceIDs=deviceIDs))

  def disableSSL(self, deviceIDs):
    self.stub.DisableSSLMulti(connect_pb2.DisableSSLMultiRequest(deviceIDs=deviceIDs))
```

