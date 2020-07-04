---
title: "Connect API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server information in _src/example/connect/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
	  CA_FILE = "../../../../../cert/ca.crt"

    // the ip address of the gateway
	  SERVER_IP = "192.168.0.2"
	  SERVER_PORT = 4000
    ```
5. Build.

    ```
    cd src/example/connect/test
    go build .
    ```
6. Run.
   
    ```
    ./test
    ```


## 1. CLI 

With the Command-Line Interface(CLI), you can test 5 functions related to connection management. 

```
$ ./test

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

***** Found 8 devices
deviceID:544114231 type:BIOENTRY_W2 useDHCP:true IPAddr:"192.168.0.104" port:51211
deviceID:540092578 type:BIOSTATION_L2 useDHCP:true IPAddr:"192.168.0.120" port:51211 useSSL:true
deviceID:846 type:BIOLITE_N2 useDHCP:true IPAddr:"192.168.0.117" port:51211
deviceID:939342898 type:BIOSTATION_A2 useDHCP:true connectionMode:DEVICE_TO_SERVER IPAddr:"192.168.0.121" port:51211 useSSL:true
deviceID:939504224 type:BIOSTATION_A2 useDHCP:true IPAddr:"192.168.0.110" port:51211
deviceID:939342902 type:BIOSTATION_A2 useDHCP:true IPAddr:"192.168.0.125" port:51211 useSSL:true
deviceID:542190033 type:FACESTATION_2 useDHCP:true IPAddr:"192.168.0.123" port:51211
deviceID:547634480 type:BIOSTATION_2 useDHCP:true IPAddr:"192.168.0.106" port:51211
```

### (2) Connect to a device synchronously

The simplest way of connecting to a device is to use [Connect.Connect]({{'/api/connect/' | relative_url }}#connect). 

```
>>>>> Select a menu: 2
Connect to a device synchronously...
>> Enter the IP address of the device: 192.168.0.104
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
Trying to connect to 192.168.0.104:51211...
Connected to 544114231
```

### (3) Manage asynchronous connections 

When you have to manage permanent connections to multiple devices, [asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection) would be a better choice. With these APIs, the gateway will handle connections to devices in the background. For example, if some devices are disconnected, the gateway will try to reconnect them automatically. 

```
>>>>> Select a menu: 3

***** Async connections: 0

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
Adding asynchronous connections for 2 devices...

***** Async connections: 2
deviceID:540092578 IPAddr:"192.168.0.120" port:51211 autoReconnect:true useSSL:true
deviceID:939504224 IPAddr:"192.168.0.110" port:51211 autoReconnect:true
```

### (4) Accept devices

In some environments, the devices should connect to the gateway, not vice versa. For devices to connect to the gateway, you have to do the followings;

1. Change the connection mode to __DEVICE_TO_SERVER__ using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode).
2. By default, the gateway will not accept any incoming connections. You have to add the devices to the accept filter using [Connect.SetAcceptFilter]({{'/api/connect' | relative_url}}#setacceptfilter). 

```
>>>>> Select a menu: 4

***** Accept filter:

***** Pending devices: 1
deviceID:939342898 IPAddr:"192.168.0.121" lastTry:1582762543

===== Accept Menu =====

(1) Add devices to the filter
(2) Delete devices from the filter
(3) Allow all devices
(4) Disallow all devices
(5) Refresh the pending device list
(q) Return to Main Menu

>>>>> Select a menu: 3
Allowing all devices...

***** Accept filter: allowAll:true
```

### (5) Configure connection-related options

Apart from the IP address, there are two important options for device connections. You can change the connection mode using [Connect.SetConnectionMode]({{'/api/connect/' | relative_url }}#setconnectionmode) and enable/disable SSL using the [SSL APIs]({{'/api/connect' | relative_url}}#ssl).

```
>>>>> Select a menu: 5

***** Managed devices: 4
deviceID:544114231 IPAddr:"192.168.0.104" port:51211 status:TCP_CONNECTED
deviceID:540092578 IPAddr:"192.168.0.120" port:51211 status:TLS_CONNECTED autoReconnect:true useSSL:true
deviceID:939504224 IPAddr:"192.168.0.110" port:51211 status:TCP_CONNECTED autoReconnect:true
deviceID:939342898 connectionMode:DEVICE_TO_SERVER IPAddr:"192.168.0.121" status:TLS_CONNECTED useSSL:true

===== Device Menu =====

(1) Set connection mode
(2) Enable SSL
(3) Disable SSL
(4) Disconnect
(5) Disconnect All
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

```go
func (s *ConnectSvc) Connect(deviceIP string, devicePort int, useSSL bool) (uint32, error) {
  req := &connect.ConnectRequest{
    ConnectInfo: &connect.ConnectInfo{
      IPAddr: deviceIP,
      Port: int32(devicePort),
      UseSSL: useSSL,
    },
  }

  resp, _ := s.client.Connect(context.Background(), req)

  return resp.GetDeviceID(), nil
}

func (s *ConnectSvc) Disconnect(deviceIDs []uint32) error {
  req := &connect.DisconnectRequest{
    DeviceIDs: deviceIDs,
  }

  s.client.Disconnect(context.Background(), req)

  return nil
}
```

```go
devID, err := connectSvc.Connect(IP_ADDR, PORT, false)

// do something with the devID

connectSvc.Disconnect([]uint32{ devID })
```

## 3. Asynchronous connections

With the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection), you only have to register or deregister devices. The gateway will handle all the connection related tasks in the background. 

```go
func (s *ConnectSvc) AddAsyncConnection(connInfos []*connect.AsyncConnectInfo) error {
  req := &connect.AddAsyncConnectionRequest{
    ConnectInfos: connInfos,
  }

  s.client.AddAsyncConnection(context.Background(), req)

  return nil
}


func (s *ConnectSvc) DeleteAsyncConnection(deviceIDs []uint32) error {
  req := &connect.DeleteAsyncConnectionRequest{
    DeviceIDs: deviceIDs,
  }

  s.client.DeleteAsyncConnection(context.Background(), req)

  return nil
}
```

You have to use [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist) to get the status of the registered devices. 

```go
func showAsyncConnection() error {
  devList, _ := connectSvc.GetDeviceList()

  asyncList := []*connect.DeviceInfo{}

  for _, device := range devList {
    if device.AutoReconnect { // AutoReconnect is true for the devices added by AddAsyncConnection
      asyncList = append(asyncList, device)
    }
  }

  fmt.Printf("\n***** Async connections: %v\n", len(asyncList))

  for _, device := range asyncList {
    fmt.Printf("%v\n", device)
  }

  return nil
}

```

## 4. Accept devices

```go

func (s *ConnectSvc) GetAcceptFilter() (*connect.AcceptFilter, error) {
  req := &connect.GetAcceptFilterRequest{}

  resp, _ := s.client.GetAcceptFilter(context.Background(), req)

  return resp.GetFilter(), nil
}


func (s *ConnectSvc) SetAcceptFilter(filter *connect.AcceptFilter) error {
  req := &connect.SetAcceptFilterRequest{
    Filter: filter,
  }

  s.client.SetAcceptFilter(context.Background(), req)

  return nil
}

```

By default, the gateway will not accept any incoming connections. [Connect.GetPendingList]({{'/api/connect/' | relative_url }}#getpendinglist) can be used to get the devices, which are trying to connect to the gateway but not in the accept filter. 

```go
func (s *ConnectSvc) GetPendingList() ([]*connect.PendingDeviceInfo, error) {
  req := &connect.GetPendingListRequest{}

  resp, _ := s.client.GetPendingList(context.Background(), req)

  return resp.GetDeviceInfos(), nil
}

```

You can allow all the incoming connections by setting [AcceptFilter.allowAll]({{'/api/connect/' | relative_url }}#AcceptFilter) to true. Or, you can specify the devices to be allowed in [AcceptFilter.deviceIDs]({{'/api/connect/' | relative_url }}#AcceptFilter).

```go
func allowAllDevices() error {
  filter := &connect.AcceptFilter{
    AllowAll: true,
    DeviceIDs: []uint32{},
  }

  connectSvc.SetAcceptFilter(filter)

  return nil		
}

func (s *ConnectSvc) AddDeviceToAcceptFilter(deviceIDs []uint32) error {
  getReq := &connect.GetAcceptFilterRequest{}

  getResp, _ := s.client.GetAcceptFilter(context.Background(), getReq)

  filter := getResp.GetFilter()
  filter.AllowAll = false

  for _, deviceID := range deviceIDs {
    exist := false;

    for i := 0; i < len(filter.DeviceIDs); i++ {
      if filter.DeviceIDs[i] == deviceID {
        exist = true;
        break
      }
    }

    if !exist {
      filter.DeviceIDs = append(filter.DeviceIDs, deviceID)
    }
  }

  setReq := &connect.SetAcceptFilterRequest{
    Filter: filter,
  }

  SetAcceptFilter(context.Background(), setReq)

  return nil
}
```

## 5. Connection status

Apart from [Connect.GetDeviceList]({{'/api/connect/' | relative_url }}#getdevicelist), you can also get the realtime update using [Connect.SubscribeStatus]({{'/api/connect/' | relative_url }}#subscribestatus).

```go
func (s *ConnectSvc) Subscribe() (connect.Connect_SubscribeStatusClient, context.CancelFunc, error) {
  ctx, cancel := context.WithCancel(context.Background())

  req := &connect.SubscribeStatusRequest{
    QueueSize: QUEUE_SIZE,
  }

  statusStream, _ := s.client.SubscribeStatus(ctx, req)

  return statusStream, cancel, nil
}
```

```go
  statusStream, cancelFunc, _ := connectSvc.Subscribe()
  defer cancelFunc()

  go func(statusStream connectService.Connect_SubscribeStatusClient) {
    for {
      statusChange, err := statusStream.Recv()

      if err != nil {
        fmt.Printf("Cannot get device status: %v", err)
        return
      }      

      // do something with statusChange
    }
  } (statusStream) 
```


## 6. Connection mode

```go
func (s *ConnectSvc) SetConnectionModeMulti(deviceIDs []uint32, mode connect.ConnectionMode) error {
  req := &connect.SetConnectionModeMultiRequest{
    DeviceIDs:      deviceIDs,
    ConnectionMode: mode,
  }

  s.client.SetConnectionModeMulti(context.Background(), req)

  return nil
}
```

After setting the connection mode, you have to use different APIs accordingly. With __SERVER_TO_DEVICE__, you should use the [Synchronous APIs]({{'/api/connect/' | relative_url }}#synchronous-connection) or the [Asynchronous APIs]({{'/api/connect/' | relative_url }}#asynchronous-connection). to connect to the devices. With __DEVICE_TO_SERVER__, the [AcceptFilter]({{'/api/connect' | relative_url}}#AcceptFilter) should be configured correctly. 
{: .notice--warning}

## 7. SSL

TLS 1.2 can be used for more secure communication between the gateway and devices. Refer to [Secure Communication]({{'/api/connect/' | relative_url }}#secure-communication) for details. 

```go
func (s *ConnectSvc) EnableSSL(deviceIDs []uint32) error {
  req := &connect.EnableSSLMultiRequest{
    DeviceIDs:      deviceIDs,
  }

  s.client.EnableSSLMulti(context.Background(), req)
  
  return nil
}


func (s *ConnectSvc) DisableSSL(deviceIDs []uint32) error {
  req := &connect.DisableSSLMultiRequest{
    DeviceIDs:      deviceIDs,
  }

  s.client.DisableSSLMulti(context.Background(), req)

  return nil
}
```

