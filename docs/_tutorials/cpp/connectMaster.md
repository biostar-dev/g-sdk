---
title: "Connect Master API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
6. Change the gateway and the device information in _example/connectMaster/test/main.cpp_ as needed.
   
    ```cpp
    // the path of the root certificate
    const std::string MASTER_CA_FILE = "../cert/master/ca.crt"; 

    // the address of the master gateway
    const std::string MASTER_ADDR = "192.168.0.2";
    const int MASTER_PORT = 4010;

    // the paths of the administrator certificate and its key 
    const std::string ADMIN_CERT_FILE = "../cert/master/admin.crt";
    const std::string ADMIN_KEY_FILE = "../cert/master/admin_key.pem";

    // the paths of the tenant certificate and its key    
    const std::string TENANT_CERT_FILE = "../cert/master/tenant1.crt";
    const std::string TENANT_KEY_FILE = "../cert/master/tenant1_key.pem";  

    // the following values should be same as the IDs in the corresponding certificates
    const std::string TENANT_ID = "tenant1";
    const std::string GATEWAY_ID = "gateway1";   
    ```
7. Build and run.
 
    * Windows
    
      ```
      cmake .
      ```

      Open _testConnectMaster.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testConnectMaster
      ```

    * Linux

      ```
      cmake .
      make testConnectMaster
      ./testConnectMaster
      ```

  To initialize the database, you have to run with __-i__ option once. 
  {: .notice--info}

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

To connect devices, you have to know their addresses and related options such as connection mode. By using [ConnectMaster.SearchDevice]({{'/api/connectMaster/' | relative_url }}#searchdevice), you can get these information in a subnet. 


```
>>>>> Select a menu: 1
Searching devices in the subnet...

***** Found Devices: 14
deviceID: 542391552 type: FACELITE useDHCP: true IPAddr: "192.168.0.127" port: 51211 useSSL: true
deviceID: 540092578 type: BIOSTATION_L2 useDHCP: true IPAddr: "192.168.0.120" port: 51211
deviceID: 542070158 type: CORESTATION_40 useDHCP: true IPAddr: "192.168.0.124" port: 51211
deviceID: 546090919 type: XPASS2_KEYPAD useDHCP: true IPAddr: "192.168.0.126" port: 51211
deviceID: 541150405 type: BIOENTRY_P2 useDHCP: true IPAddr: "192.168.0.129" port: 51211
deviceID: 544114231 type: BIOENTRY_W2 useDHCP: true IPAddr: "192.168.0.104" port: 51211 useSSL: true
deviceID: 846 type: BIOLITE_N2 useDHCP: true IPAddr: "192.168.0.117" port: 51211
deviceID: 939342900 type: BIOSTATION_A2 useDHCP: true IPAddr: "169.254.0.1" port: 51211 useSSL: true
deviceID: 939504224 type: BIOSTATION_A2 useDHCP: true IPAddr: "169.254.0.1" port: 51211
deviceID: 939342898 type: BIOSTATION_A2 useDHCP: true connectionMode: DEVICE_TO_SERVER IPAddr: "169.254.0.1" port: 51211 useSSL: true
deviceID: 666666666 type: BIOENTRY_W2 useDHCP: true IPAddr: "192.168.0.109" port: 51211
deviceID: 542190033 type: FACESTATION_2 useDHCP: true IPAddr: "169.254.0.1" port: 51211
deviceID: 547634389 type: BIOSTATION_2 useDHCP: true connectionMode: DEVICE_TO_SERVER IPAddr: "192.168.0.100" port: 51211 useSSL: true
deviceID: 547634480 type: BIOSTATION_2 useDHCP: true IPAddr: "192.168.0.106" port: 51211
```

### (2) Connect to a device synchronously

The simplest way of connecting to a device is to use [ConnectMaster.Connect]({{'/api/connectMaster/' | relative_url }}#connect). 

```
>>>>> Select a menu: 2
>> Enter the IP address of the device: 192.168.0.104
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n): y
Connecting to the device...
Connected to 544114231

[STATUS] deviceID: 544114231 status: TLS_CONNECTED timestamp: 1593457199
```

### (3) Manage asynchronous connections 

When you have to manage permanent connections to multiple devices, [asynchronous APIs]({{'/api/connectMaster/' | relative_url }}#asynchronous-connection) would be a better choice. With these APIs, the gateway will handle connections to devices in the background. For example, if some devices are disconnected, the gateway will try to reconnect them automatically. 

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
>> Use SSL y/n (default: n):
>> Enter the device ID (Press just ENTER if no more device): 939504224
>> Enter the IP address of the device:
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
>> Enter the device ID (Press just ENTER if no more device):
Adding async connections...
Getting the async connections...
***** Async Connections: 2
deviceID: 540092578 IPAddr: "192.168.0.120" port: 51211 autoReconnect: true
deviceID: 939504224 port: 51211 autoReconnect: true

[STATUS] deviceID: 939504224 status: TCP_CANNOT_CONNECT timestamp: 1593457295
[STATUS] deviceID: 540092578 status: TCP_CONNECTED timestamp: 1593457295
```

### (4) Accept devices

In some environments, the devices should connect to the gateway, not vice versa. For devices to connect to the gateway, you have to do the followings;

1. Change the connection mode to __DEVICE_TO_SERVER__ using [ConnectMaster.SetConnectionMode]({{'/api/connectMaster/' | relative_url }}#setconnectionmode).
2. By default, the gateway will not accept any incoming connections. You have to add the devices to the accept filter using [ConnectMaster.SetAcceptFilter]({{'/api/connectMaster' | relative_url}}#setacceptfilter). 

```
>>>>> Select a menu: 4

Getting the accept filter...
***** Accept Filter:

Getting the pending list...
***** Pending Devices: 2
deviceID: 547634389 IPAddr: "192.168.0.100" lastTry: 1593457356
deviceID: 939342898 IPAddr: "192.168.0.121" lastTry: 1593457357

===== Accept Menu =====

(1) Add devices to the filter
(2) Delete devices from the filter
(3) Allow all devices
(4) Disallow all devices
(5) Refresh the pending device list
(q) Return to Main Menu

>>>>> Select a menu: 3
Getting the accept filter...
***** Accept Filter: allowAll: true

[STATUS] deviceID: 547634389 status: TLS_CONNECTED timestamp: 1593457392
[STATUS] deviceID: 939342898 status: TLS_CONNECTED timestamp: 1593457393
```

### (5) Configure connection-related options

Apart from the IP address, there are two important options for device connections. You can change the connection mode using [ConnectMaster.SetConnectionMode]({{'/api/connectMaster/' | relative_url }}#setconnectionmode) and enable/disable SSL using the [SSL APIs]({{'/api/connectMaster' | relative_url}}#ssl).

```
>>>>> Select a menu: 5
Getting the devices managed by the gateway...
***** Managed Devices: 5
deviceID: 544114231 IPAddr: "192.168.0.104" port: 51211 status: TLS_CONNECTED useSSL: true
deviceID: 540092578 IPAddr: "192.168.0.120" port: 51211 status: TCP_CONNECTED autoReconnect: true
deviceID: 939504224 port: 51211 status: TCP_CANNOT_CONNECT autoReconnect: true
deviceID: 547634389 connectionMode: DEVICE_TO_SERVER IPAddr: "192.168.0.100" status: TLS_CONNECTED useSSL: true
deviceID: 939342898 connectionMode: DEVICE_TO_SERVER IPAddr: "192.168.0.121" status: TLS_CONNECTED useSSL: true

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

You can use the [Synchronous APIs]({{'/api/connectMaster/' | relative_url }}#synchronous-connection) to manage the connections by yourself. 

```cpp
Status ConnectMasterSvc::Connect(std::string gatewayID, ConnectInfo& connInfo, uint32_t* deviceID) {
  ConnectRequest request;
  request.set_gatewayid(gatewayID);
  *request.mutable_connectinfo() = connInfo;

  ConnectResponse response;
  ClientContext context;

  Status status = stub_->Connect(&context, request, &response);

  *deviceID = response.deviceid();

  return status;
}

Status ConnectMasterSvc::Disconnect(std::vector<uint32_t>& deviceIDs) {
  DisconnectRequest request;
  for(int i = 0; i < deviceIDs.size(); i++) {
    request.add_deviceids(deviceIDs[i]);
  }

  DisconnectResponse response;
  ClientContext context;

  Status status = stub_->Disconnect(&context, request, &response);

  return status;
}
```

```cpp
  MainMenu* menu = static_cast<MainMenu*>(arg);

  std::shared_ptr<ConnectInfo> connInfo = Util::GetConnectInfo();

  std::cout << "Connecting to the device..." << std::endl;

  uint32_t deviceID;
  Status status = menu->GetConnectMasterSvc()->Connect(menu->GetGatewayID(), *connInfo, &deviceID);

  if(!status.ok()) {
    std::cerr << "Cannot connect to the device" << std::endl;
    return;
  }

  std::cout << "Connected to " << deviceID << std::endl;
```

## 3. Asynchronous connections

With the [Asynchronous APIs]({{'/api/connectMaster/' | relative_url }}#asynchronous-connection), you only have to register or deregister devices. The gateway will handle all the connection related tasks in the background. 

```cpp
Status ConnectMasterSvc::AddAsyncConnection(std::string gatewayID, RepeatedPtrField<AsyncConnectInfo>& asyncInfos) {
  AddAsyncConnectionRequest request;
  request.set_gatewayid(gatewayID);
  *request.mutable_connectinfos() = asyncInfos;

  AddAsyncConnectionResponse response;
  ClientContext context;

  Status status = stub_->AddAsyncConnection(&context, request, &response);

  return status;
}

Status ConnectMasterSvc::DeleteAsyncConnection(std::string gatewayID, std::vector<uint32_t>& deviceIDs) {
  DeleteAsyncConnectionRequest request;
  request.set_gatewayid(gatewayID);
    for(int i = 0; i < deviceIDs.size(); i++) {
    request.add_deviceids(deviceIDs[i]);
  }

  DeleteAsyncConnectionResponse response;
  ClientContext context;

  Status status = stub_->DeleteAsyncConnection(&context, request, &response);

  return status;
}
```

You have to use [ConnectMaster.GetDeviceList]({{'/api/connectMaster/' | relative_url }}#getdevicelist) to get the status of the registered devices. 

```cpp
void AsyncMenu::RefreshAsyncList(void* arg) {
  AsyncMenu* menu = static_cast<AsyncMenu*>(arg);

  std::cout << "Getting the async connections..." << std::endl;

  RepeatedPtrField<DeviceInfo> deviceInfos;
  Status status = menu->GetConnectMasterSvc()->GetDeviceList(menu->GetGatewayID(), &deviceInfos);

  std::vector<DeviceInfo*> asyncInfos;
  for(int i = 0; i < deviceInfos.size(); i++) {
    if(deviceInfos[i].autoreconnect()) {
      asyncInfos.push_back(&deviceInfos[i]);
    }
  }

  std::cout << "***** Async Connections: " << asyncInfos.size() << std::endl;
}
```

## 4. Accept devices

```cpp
Status ConnectMasterSvc::GetAcceptFilter(std::string gatewayID, AcceptFilter* filter) {
  GetAcceptFilterRequest request;
  request.set_gatewayid(gatewayID);

  GetAcceptFilterResponse response;
  ClientContext context;

  Status status = stub_->GetAcceptFilter(&context, request, &response);

  *filter = response.filter();

  return status;    
}

Status ConnectMasterSvc::SetAcceptFilter(std::string gatewayID, AcceptFilter& filter) {
  SetAcceptFilterRequest request;
  request.set_gatewayid(gatewayID);
  *request.mutable_filter() = filter;

  SetAcceptFilterResponse response;
  ClientContext context;

  Status status = stub_->SetAcceptFilter(&context, request, &response);

  return status;    
}
```

By default, the gateway will not accept any incoming connections. [ConnectMaster.GetPendingList]({{'/api/connectMaster/' | relative_url }}#getpendinglist) can be used to get the devices, which are trying to connect to the gateway but not in the accept filter. 

```cpp
Status ConnectMasterSvc::GetPendingList(std::string gatewayID, RepeatedPtrField<PendingDeviceInfo>* deviceInfos) {
  GetPendingListRequest request;
  request.set_gatewayid(gatewayID);

  GetPendingListResponse response;
  ClientContext context;

  Status status = stub_->GetPendingList(&context, request, &response);

  *deviceInfos = response.deviceinfos();

  return status;
}   
```

You can allow all the incoming connections by setting [AcceptFilter.allowAll]({{'/api/connect/' | relative_url }}#AcceptFilter) to true. Or, you can specify the devices to be allowed in [AcceptFilter.deviceIDs] ({{'/api/connect/' | relative_url }}#AcceptFilter).

```cpp
void AcceptMenu::AllowAll(void* arg) {
  AcceptMenu* menu = static_cast<AcceptMenu*>(arg);

  AcceptFilter filter;
  filter.set_allowall(true);

  Status status = menu->GetConnectMasterSvc()->SetAcceptFilter(menu->GetGatewayID(), filter);

  ShowAcceptFilter(arg);
} 

void AcceptMenu::AddDeviceToFilter(void* arg) {
  AcceptMenu* menu = static_cast<AcceptMenu*>(arg);

  std::cout << "Enter the device IDs to add" << std::endl;

  std::vector<uint32_t> deviceIDs;
  Menu::GetDeviceID(deviceIDs);

  AcceptFilter filter;
  Status status = menu->GetConnectMasterSvc()->GetAcceptFilter(menu->GetGatewayID(), &filter);

  filter.set_allowall(false);

  for(int i = 0; i < deviceIDs.size(); i++) {
    bool exist = false;

    for(int j = 0; j < filter.deviceids_size(); j++) {
      if(deviceIDs[i] == filter.deviceids(j)) {
        exist = true;
        break;
      }
    }

    if(!exist) {
      filter.add_deviceids(deviceIDs[i]);
    }
  }

  status = menu->GetConnectMasterSvc()->SetAcceptFilter(menu->GetGatewayID(), filter);
}
```

## 5. Connection status

Apart from [ConnectMaster.GetDeviceList]({{'/api/connectMaster/' | relative_url }}#getdevicelist), you can also get the realtime update using [ConnectMaster.SubscribeStatus]({{'/api/connectMaster/' | relative_url }}#subscribestatus).

```cpp
std::unique_ptr<ClientReader<StatusChange>> ConnectMasterSvc::Subscribe(ClientContext* context, int queueSize) {
  SubscribeStatusRequest request;
  request.set_queuesize(queueSize);

  return stub_->SubscribeStatus(context, request);
}   
```

```cpp
void subscribeStatus(std::unique_ptr<ClientReader<StatusChange>> statusReader) {
  StatusChange devStatus;

  while(statusReader->Read(&devStatus)) {
    if(devStatus.status() != connect::Status::TCP_NOT_ALLOWED && devStatus.status() != connect::Status::TLS_NOT_ALLOWED) {
      std::stringstream s;

      s << std::endl << "[STATUS] " << devStatus.ShortDebugString() << std::endl << std::endl;

      std::cout << s.str() << std::flush;
    }
  }  

  std::cout << "Subscribing thread is stopped" << std::endl;

  statusReader->Finish();
}

int main(int argc, char** argv) {
  // ...

	auto connectMasterSvc = std::make_shared<ConnectMasterSvc>(client.GetChannel());

  ClientContext context;
  auto statusReader(connectMasterSvc->Subscribe(&context, STATUS_QUEUE_SIZE));
  std::thread subThread(subscribeStatus, std::move(statusReader));
  
  MainMenu mainMenu;
  mainMenu.SetConnectMasterSvc(connectMasterSvc, GATEWAY_ID);
  mainMenu.Show();

  context.TryCancel();
  subThread.join();
  // ...
}
```

## 6. Connection mode

```cpp
Status ConnectMasterSvc::SetConnectionMode(std::vector<uint32_t>& deviceIDs, ConnectionMode mode) {
  SetConnectionModeMultiRequest request;
  for(int i = 0; i < deviceIDs.size(); i++) {
    request.add_deviceids(deviceIDs[i]);
  }
  request.set_connectionmode(mode);

  SetConnectionModeMultiResponse response;
  ClientContext context;

  Status status = stub_->SetConnectionModeMulti(&context, request, &response);

  return status;
}
```

After setting the connection mode, you have to use different APIs accordingly. With __SERVER_TO_DEVICE__, you should use the [Synchronous APIs]({{'/api/connectMaster/' | relative_url }}#synchronous-connection) or the [Asynchronous APIs]({{'/api/connectMaster/' | relative_url }}#asynchronous-connection). to connect to the devices. With __DEVICE_TO_SERVER__, the [AcceptFilter]({{'/api/connect' | relative_url}}#AcceptFilter) should be configured correctly. 
{: .notice--warning}

## 7. SSL

TLS 1.2 can be used for more secure communication between the gateway and devices. Refer to [Secure Communication]({{'/api/connect/' | relative_url }}#secure-communication) for details. 

```cpp
Status ConnectMasterSvc::EnableSSL(std::vector<uint32_t>& deviceIDs) {
  EnableSSLMultiRequest request;
  for(int i = 0; i < deviceIDs.size(); i++) {
    request.add_deviceids(deviceIDs[i]);
  }

  EnableSSLMultiResponse response;
  ClientContext context;

  Status status = stub_->EnableSSLMulti(&context, request, &response);

  return status;
}

Status ConnectMasterSvc::DisableSSL(std::vector<uint32_t>& deviceIDs) {
  DisableSSLMultiRequest request;
  for(int i = 0; i < deviceIDs.size(); i++) {
    request.add_deviceids(deviceIDs[i]);
  }

  DisableSSLMultiResponse response;
  ClientContext context;

  Status status = stub_->DisableSSLMulti(&context, request, &response);

  return status;
}
```

