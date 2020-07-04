---
title: "Quick Start Guide for Master Gateway"
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
5. The quick start example uses CMake. You can change the _CMakeLists.txt_ file as needed.
6. Change the master gateway and the device information in _example/quick/main.cpp_ as needed.
   
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

    // the ip address of the target device
    const std::string DEVICE_IP = "192.168.0.110";
    const int DEVICE_PORT = 51211;
    const bool USE_SSL = false;
    ```

7. Build and run.
 
    * Windows
    
      ```
      cmake .
      ```

      Open _quick.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/quick -m
      ```

    * Linux

      ```
      cmake .
      make quick
      ./quick -m
      ```

    To initialize the database, you have to run with __-mi__ option once. 
    {: .notice--info}

## 1. Overview

You can use the services in the following steps.

1. Create a ___grpc::Channel___ and connect to the gateway.
   
    ```cpp
    std::ifstream caCertFile(caFile), tenantCertFile(certFile), tenantKeyFile(keyFile);
    std::stringstream caCertBuf, tenantCertBuf, tenantKeyBuf;
    caCertBuf << caCertFile.rdbuf();
    tenantCertBuf << tenantCertFile.rdbuf();
    tenantKeyBuf << tenantKeyFile.rdbuf();
    
    grpc::SslCredentialsOptions sslOpts;
    sslOpts.pem_root_certs = caCertBuf.str();
    sslOpts.pem_cert_chain = tenantCertBuf.str();
    sslOpts.pem_private_key = tenantKeyBuf.str();

    auto channelCreds = grpc::SslCredentials(sslOpts);
    auto callCreds = grpc::MetadataCredentialsFromPlugin(std::unique_ptr<grpc::MetadataCredentialsPlugin>(new JwtCredential(this)));
    auto composedCreds = grpc::CompositeChannelCredentials(channelCreds, callCreds);

    std::stringstream masterAddr;
    masterAddr << ipAddr << ":" << port;

    std::shared_ptr<Channel> channel = grpc::CreateChannel(masterAddr.str(),  composedCreds);
    ```

2. Login to the master gateway and get a JWT token for further communication.
    ```cpp
    auto loginStub = Login::NewStub(channel);

    LoginRequest request;
    request.set_tenantcert(tenantCertBuf.str());
    LoginResponse response;
    ClientContext context;

    Status status = loginStub->Login(&context, request, &response);

    token = response.jwttoken();
    ```

3. Create a service stub such as ___ConnectMaster::Stub___ using the channel. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```cpp
    std::unique_ptr<ConnectMaster::Stub> stub = ConnectMaster::NewStub(channel)
    ```

4. Call the functions of the service using the client. 
   
    ```cpp 
    ConnectRequest request;
    request.set_gatewayid(gatewayID);
    *request.mutable_connectinfo() = connInfo;

    ConnectResponse response;
    ClientContext context;

    Status status = stub->Connect(&context, request, &response);
    ```

The classes in the __example__ namespace are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample classes.
{: .notice--warning}


## 2. Connect to the master gateway

The first thing to do is to connect to the master gateway and get a ___grpc::Channel___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the following certificates.

* The root CA certificate of the master gateway
* The client certificate of a tenant and its key file
* For administrative tasks such as creating tenants, the client certificate of an administrator and its key file

After connecting to the master gateway, you have to login with either a tenant certificate or an administrator certificate. When login succeeds, the master gateway will return a JWT token, which will be used as a call credential for further API calls.

```cpp
// An example class encapsulating communication with the master gateway
class MasterClient : public GrpcClient {
public:
  std::string GetToken() {
    return token_;
  }

private:
  std::string token_;
};

bool MasterClient::ConnectTenant(std::string ipAddr, int port, std::string caFile, std::string certFile, std::string keyFile) {
  std::ifstream caCertFile(caFile), tenantCertFile(certFile), tenantKeyFile(keyFile);
  std::stringstream caCertBuf, tenantCertBuf, tenantKeyBuf;
  caCertBuf << caCertFile.rdbuf();
  tenantCertBuf << tenantCertFile.rdbuf();
  tenantKeyBuf << tenantKeyFile.rdbuf();
  
  grpc::SslCredentialsOptions sslOpts;
  sslOpts.pem_root_certs = caCertBuf.str();
  sslOpts.pem_cert_chain = tenantCertBuf.str();
  sslOpts.pem_private_key = tenantKeyBuf.str();

  auto channelCreds = grpc::SslCredentials(sslOpts);
  auto callCreds = grpc::MetadataCredentialsFromPlugin(std::unique_ptr<grpc::MetadataCredentialsPlugin>(new JwtCredential(this)));
  auto composedCreds = grpc::CompositeChannelCredentials(channelCreds, callCreds);

  std::stringstream masterAddr;
  masterAddr << ipAddr << ":" << port;

  channel_ = grpc::CreateChannel(masterAddr.str(),  composedCreds);

  auto loginStub = Login::NewStub(channel_);

  LoginRequest request;
  request.set_tenantcert(tenantCertBuf.str());
  LoginResponse response;
  ClientContext context;

  Status status = loginStub->Login(&context, request, &response);

  token_ = response.jwttoken();

  return true;
}

bool MasterClient::ConnectAdmin(std::string ipAddr, int port, std::string caFile, std::string certFile, std::string keyFile) {
  std::ifstream caCertFile(caFile), adminCertFile(certFile), adminKeyFile(keyFile);
  std::stringstream caCertBuf, adminCertBuf, adminKeyBuf;
  caCertBuf << caCertFile.rdbuf();
  adminCertBuf << adminCertFile.rdbuf();
  adminKeyBuf << adminKeyFile.rdbuf();
  
  grpc::SslCredentialsOptions sslOpts;
  sslOpts.pem_root_certs = caCertBuf.str();
  sslOpts.pem_cert_chain = adminCertBuf.str();
  sslOpts.pem_private_key = adminKeyBuf.str();

  auto channelCreds = grpc::SslCredentials(sslOpts);
  auto callCreds = grpc::MetadataCredentialsFromPlugin(std::unique_ptr<grpc::MetadataCredentialsPlugin>(new JwtCredential(this)));
  auto composedCreds = grpc::CompositeChannelCredentials(channelCreds, callCreds);

  std::stringstream masterAddr;
  masterAddr << ipAddr << ":" << port;

  channel_ = grpc::CreateChannel(masterAddr.str(),  composedCreds);

  auto loginStub = Login::NewStub(channel_);

  LoginAdminRequest request;
  request.set_admintenantcert(adminCertBuf.str());
  request.set_tenantid(ADMIN_TENANT_ID);
  LoginAdminResponse response;
  ClientContext context;

  Status status = loginStub->LoginAdmin(&context, request, &response);

  token_ = response.jwttoken();

  return true;
}  
```

1. Create the ___MasterClient___.

    ```cpp
    auto masterClient = std::make_shared<MasterClient>();
    ```

2. Connect to the master gateway as a tenant.

    ```cpp
    masterClient->ConnectTenant(MASTER_ADDR, MASTER_PORT, MASTER_CA_FILE, TENANT_CERT_FILE, TENANT_KEY_FILE); 
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) and [the tutorial]({{'/cpp/connectMaster/' | relative_url}}).

```cpp
// An example class showing the usage of the Connect Master API
class ConnectMasterSvc {
public:
  ConnectMasterSvc(std::shared_ptr<Channel> channel)
      : stub_(ConnectMaster::NewStub(channel)) {}

  std::unique_ptr<ClientReader<StatusChange>> Subscribe(ClientContext* context, int queueSize);
private:
  std::unique_ptr<ConnectMaster::Stub> stub_;
};

Status ConnectMasterSvc::GetDeviceList(std::string gatewayID, RepeatedPtrField<DeviceInfo>* deviceInfos) {
  GetDeviceListRequest request;
  request.set_gatewayid(gatewayID);

  GetDeviceListResponse response;
  ClientContext context;

  Status status = stub_->GetDeviceList(&context, request, &response);

  *deviceInfos = response.deviceinfos();

  return status;
}

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

1. Create the ___ConnectMasterSvc___. It makes the ___ConnectMaster::Stub___ internally.
   
    ```cpp
    std::shared_ptr<ConnectMasterSvc> connectMasterSvc = std::make_shared<ConnectMasterSvc>(masterClient->GetChannel());
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using  [ConnectMaster.EnableSSL]({{'/api/connectMaster/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```cpp
    ConnectInfo connInfo;
    connInfo.set_ipaddr(ipAddr);
    connInfo.set_port(port);
    connInfo.set_usessl(useSSL);

    uint32_t deviceID = 0;
    Status status = connectMasterSvc->Connect(gatewayID, connInfo, &deviceID);
    ```

3. Get the devices, which are managed by the gateway.
   
    ```cpp
    RepeatedPtrField<DeviceInfo> deviceInfos;
    Status status = connectMasterSvc->GetDeviceList(gatewayID, &deviceInfos);
    ```

4. Disconnect the device.
   
    ```cpp  
    connectMasterSvc->Disconnect(deviceIDs);
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```cpp
// An example class showing the usage of the Device API
class DeviceSvc {
public:
  DeviceSvc(std::shared_ptr<Channel> channel)
    : stub_(Device::NewStub(channel)) {}

private:
  std::unique_ptr<Device::Stub> stub_;
};

Status DeviceSvc::GetInfo(uint32_t deviceID, FactoryInfo* info) {
  GetInfoRequest request;
  request.set_deviceid(deviceID);

  GetInfoResponse response;
  ClientContext context;

  Status status = stub_->GetInfo(&context, request, &response);

  *info = response.info();

  return status;
}

Status DeviceSvc::GetCapabilityInfo(uint32_t deviceID, CapabilityInfo* info) {
  GetCapabilityInfoRequest request;
  request.set_deviceid(deviceID);

  GetCapabilityInfoResponse response;
  ClientContext context;

  Status status = stub_->GetCapabilityInfo(&context, request, &response);

  *info = response.capinfo();

  return status;
}
```

1. Create the ___DeviceSvc___. It makes the ___Device::Stub___ internally.

    ```cpp
    DeviceSvc deviceSvc(client->GetChannel());
    ```
2. Get the version information of the device.

    ```cpp
    FactoryInfo devInfo;
    Status status = deviceSvc.GetInfo(deviceID, &devInfo);
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```cpp
    CapabilityInfo capInfo;
    Status status = deviceSvc.GetCapabilityInfo(deviceID, &capInfo);
    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```cpp
// An example class showing the usage of the Finger API
class FingerSvc {
public:
  FingerSvc(std::shared_ptr<Channel> channel)
    : stub_(Finger::NewStub(channel)) {}

private:
  std::unique_ptr<Finger::Stub> stub_;
};

Status FingerSvc::Scan(uint32_t deviceID, TemplateFormat templateFormat, uint32_t threshold, std::string& templateData) {
  ScanRequest request;
  request.set_deviceid(deviceID);
  request.set_templateformat(templateFormat);
  request.set_qualitythreshold(threshold);

  ScanResponse response;
  ClientContext context;

  Status status = stub_->Scan(&context, request, &response);

  templateData = response.templatedata();

  return status;
}

Status FingerSvc::GetImage(uint32_t deviceID, std::string& bmpImage) {
  GetImageRequest request;
  request.set_deviceid(deviceID);

  GetImageResponse response;
  ClientContext context;

  Status status = stub_->GetImage(&context, request, &response);

  bmpImage = response.bmpimage(); 

  return status;
}

Status FingerSvc::GetConfig(uint32_t deviceID, FingerConfig* config) {
  GetConfigRequest request;
  request.set_deviceid(deviceID);

  GetConfigResponse response;
  ClientContext context;

  Status status = stub_->GetConfig(&context, request, &response);

  *config = response.config(); 

  return status;
}	

```

1. Create the ___FingerSvc___. It makes the ___Finger::Stub___ internally.
 
    ```cpp
    FingerSvc fingerSvc(client->GetChannel());
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```cpp
    std::string templateData;
    Status status = fingerSvc.Scan(deviceID, finger::TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD, templateData);
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```cpp
    std::string bmpImage;
    status = fingerSvc.GetImage(deviceID, bmpImage);

    std::ofstream bmpFile(FINGERPRINT_IMAGE_NAME, std::ios::binary);
    bmpFile.write(bmpImage.data(), bmpImage.size());
    bmpFile.close();    
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```cpp
    FingerConfig config;
    status = fingerSvc.GetConfig(deviceID, &config);
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```cpp
// An example class showing the usage of the Card API
class CardSvc {
public:
  CardSvc(std::shared_ptr<Channel> channel)
    : stub_(Card::NewStub(channel)) {}

private:
  std::unique_ptr<Card::Stub> stub_;
};

Status CardSvc::Scan(uint32_t deviceID, CardData* cardData) {
  ScanRequest request;
  request.set_deviceid(deviceID);

  ScanResponse response;
  ClientContext context;

  Status status = stub_->Scan(&context, request, &response);

  *cardData = response.carddata();

  return status;
}

Status CardSvc::GetBlacklist(uint32_t deviceID, RepeatedPtrField<BlacklistItem>* blacklist) {
  GetBlacklistRequest request;
  request.set_deviceid(deviceID);

  GetBlacklistResponse response;
  ClientContext context;

  Status status = stub_->GetBlacklist(&context, request, &response);

  *blacklist = response.blacklist();

  return status;    
}

Status CardSvc::AddBlacklist(uint32_t deviceID, RepeatedPtrField<BlacklistItem>* cardInfos) {
  AddBlacklistRequest request;
  request.set_deviceid(deviceID);
  *request.mutable_cardinfos() = *cardInfos;

  AddBlacklistResponse response;
  ClientContext context;

  Status status = stub_->AddBlacklist(&context, request, &response);

  return status;    
}  

Status CardSvc::DeleteBlacklist(uint32_t deviceID, RepeatedPtrField<BlacklistItem>* cardInfos) {
  DeleteBlacklistRequest request;
  request.set_deviceid(deviceID);
  *request.mutable_cardinfos() = *cardInfos;

  DeleteBlacklistResponse response;
  ClientContext context;

  Status status = stub_->DeleteBlacklist(&context, request, &response);

  return status;    
}  
```

1. Create the ___CardSvc___. It makes the ___Card::Stub___ internally.

    ```cpp
    CardSvc cardSvc(client->GetChannel());
    ```

2. Scan a card.

    ```cpp
    CardData cardData;
    Status status = cardSvc.Scan(deviceID, &cardData);
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```cpp
    // Get the current blacklist
    RepeatedPtrField<BlacklistItem> blacklist;
    status = cardSvc.GetBlacklist(deviceID, &blacklist);

    // Add new items into the blacklist
    RepeatedPtrField<BlacklistItem> cardInfos;
    for(int i = 0; i < NUM_OF_BLACKLIST_ITEM; i++) {
      BlacklistItem cardInfo;
      *cardInfo.mutable_cardid() = std::to_string(FIRST_BLACKLISTED_CARD_ID + i);
      cardInfo.set_issuecount(ISSUE_COUNT);

      cardInfos.Add(std::forward<BlacklistItem>(cardInfo));
    }

    status = cardSvc.AddBlacklist(deviceID, &cardInfos);
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```cpp
// An example class showing the usage of the User API
class UserSvc {
public:
  UserSvc(std::shared_ptr<Channel> channel)
      : stub_(User::NewStub(channel)) {}

private:
  std::unique_ptr<User::Stub> stub_;
};

Status UserSvc::GetList(uint32_t deviceID, RepeatedPtrField<UserHdr>* userList) {
  GetListRequest request;
  request.set_deviceid(deviceID);

  GetListResponse response;
  ClientContext context;

  Status status = stub_->GetList(&context, request, &response);

  *userList = response.hdrs();

  return status;
}

Status UserSvc::GetUser(uint32_t deviceID, RepeatedPtrField<std::string>* userIDs, RepeatedPtrField<UserInfo>* userInfos) {
  GetRequest request;
  request.set_deviceid(deviceID);
  *request.mutable_userids() = *userIDs;

  GetResponse response;
  ClientContext context;

  Status status = stub_->Get(&context, request, &response);

  *userInfos = response.users();

  return status;
}

Status UserSvc::Enroll(uint32_t deviceID, RepeatedPtrField<UserInfo>& userInfos) {
  EnrollRequest request;
  request.set_deviceid(deviceID);
  *request.mutable_users() = userInfos;

  EnrollResponse response;
  ClientContext context;

  Status status = stub_->Enroll(&context, request, &response);

  return status;
}

Status UserSvc::SetFinger(uint32_t deviceID, RepeatedPtrField<UserFinger>& userFingers) {
  SetFingerRequest request;
  request.set_deviceid(deviceID);
  *request.mutable_userfingers() = userFingers;

  SetFingerResponse response;
  ClientContext context;

  Status status = stub_->SetFinger(&context, request, &response);

  return status;
}

Status UserSvc::Delete(uint32_t deviceID, std::vector<std::string> &userIDs) {
  DeleteRequest request;
  request.set_deviceid(deviceID);
  for(int i = 0; i < userIDs.size(); i++) {
    request.add_userids(userIDs[i]);
  }    
  
  DeleteResponse response;
  ClientContext context;

  Status status = stub_->Delete(&context, request, &response);

  return status;    
}
```

1. Create the ___UserSvc___. It makes the ___User::Stub___ internally.

    ```cpp
    UserSvc userSvc(client->GetChannel());
    ```

2. Get the user list and detailed information.

    ```cpp
    // Get the user list
    RepeatedPtrField<UserHdr> userList;
    Status status = userSvc.GetList(deviceID, &userList);

    // Extract user IDs from the list
    RepeatedPtrField<std::string> userIDs;

    for(int i = 0; i < userList.size(); i++) {
      std::cout << userList[i].ShortDebugString() << std::endl;

      userIDs.Add((std::string)(userList[i].id())); 
    }

    // Get the user information with the user IDs
    RepeatedPtrField<UserInfo> userInfos;
    status = userSvc.GetUser(deviceID, &userIDs, &userInfos)
    ```

3. Enroll new users.

    ```cpp
    RepeatedPtrField<UserInfo> newUserInfos;
    std::vector<std::string> newUserIDs;

    srand(time(NULL));

    for(int i = 0; i < NUM_OF_NEW_USER; i++) {
      UserInfo userInfo;

      std::string userID = std::to_string(rand());
      *userInfo.mutable_hdr()->mutable_id() = userID;
      
      newUserInfos.Add(std::forward<UserInfo>(userInfo));
      newUserIDs.push_back(userID);
    }

    status = userSvc.Enroll(deviceID, newUserInfos);
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```cpp
    FingerData fingerData;

    std::cout << ">>> Scan a finger for " << userID << std::endl;
    std::string templateData;

    status = fingerSvc.Scan(deviceID, finger::TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD, templateData);

    fingerData.add_templates(templateData);

    std::cout << ">>> Scan the same finger for " << userID << std::endl;

    status = fingerSvc.Scan(deviceID, finger::TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD, templateData);

    fingerData.add_templates(templateData);  

    RepeatedPtrField<UserFinger> userFingers;
    
    UserFinger userFinger;
    userFinger.set_userid(userID);
    userFinger.mutable_fingers()->Add(std::forward<FingerData>(fingerData));

    userFingers.Add(std::forward<UserFinger>(userFinger));

    status = userSvc.SetFinger(deviceID, userFingers);
    ```

5. Delete new users.

    ```cpp
    status = userSvc.Delete(deviceID, newUserIDs);
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```cpp
// An example class showing the usage of the Event API
class EventSvc {
public:
  EventSvc(std::shared_ptr<Channel> channel)
      : stub_(Event::NewStub(channel)) {}

  std::unique_ptr<ClientReader<EventLog>> Subscribe(ClientContext* context, int queueSize);

private:
  std::unique_ptr<Event::Stub> stub_;
};

Status EventSvc::GetLog(uint32_t deviceID, int startEventID, int maxNumOfLog, RepeatedPtrField<EventLog>* events) {
  GetLogRequest request;
  request.set_deviceid(deviceID);
  request.set_starteventid(startEventID);
  request.set_maxnumoflog(maxNumOfLog);

  GetLogResponse response;
  ClientContext context;

  Status status = stub_->GetLog(&context, request, &response);

  *events = response.events();

  return status;
}

Status EventSvc::GetImageLog(uint32_t deviceID, int startEventID, int maxNumOfLog, RepeatedPtrField<ImageLog>* events) {
  GetImageLogRequest request;
  request.set_deviceid(deviceID);
  request.set_starteventid(startEventID);
  request.set_maxnumoflog(maxNumOfLog);

  GetImageLogResponse response;
  ClientContext context;

  Status status = stub_->GetImageLog(&context, request, &response);

  *events = response.imageevents();

  return status;
}

Status EventSvc::EnableMonitoring(uint32_t deviceID) {
  EnableMonitoringRequest request;
  request.set_deviceid(deviceID);

  EnableMonitoringResponse response;
  ClientContext context;

  Status status = stub_->EnableMonitoring(&context, request, &response);

  return status;
}

Status EventSvc::DisableMonitoring(uint32_t deviceID) {
  DisableMonitoringRequest request;
  request.set_deviceid(deviceID);

  DisableMonitoringResponse response;
  ClientContext context;

  Status status = stub_->DisableMonitoring(&context, request, &response);

  return status;
}

std::unique_ptr<ClientReader<EventLog>> EventSvc::Subscribe(ClientContext* context, int queueSize) {
  SubscribeRealtimeLogRequest request;
  request.set_queuesize(queueSize);

  return stub_->SubscribeRealtimeLog(context, request);
}
```

1. Create the ___EventSvc___. It makes the ___Event::Stub___ internally.

    ```cpp
    EventSvc eventSvc(client->GetChannel());
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```cpp
    RepeatedPtrField<EventLog> events;
    Status status = eventSvc.GetLog(deviceID, START_EVENT_ID, MAX_NUM_OF_LOG, &events);
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```cpp
    RepeatedPtrField<ImageLog> imageEvents;
    status = eventSvc.GetImageLog(deviceID, START_EVENT_ID, MAX_NUM_OF_IMAGE_LOG, &imageEvents);

    if(imageEvents.size() > 0) {
      std::ofstream jpgFile(IMAGE_LOG_FILE, std::ios::binary);
      jpgFile.write(imageEvents[0].jpgimage().data(), imageEvents[0].jpgimage().size());
      jpgFile.close();
    }    
    ```

4. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```cpp
    // Enable monitoring of the device
    status = eventSvc.EnableMonitoring(deviceID);

    ClientContext context;
    std::unique_ptr<ClientReader<EventLog>> eventReader(eventSvc.Subscribe(&context, EVENT_QUEUE_SIZE));

    int numOfRealtimeEvents = 0;

    std::cout << std::endl << ">>> Generate " << NUM_OF_REALTIME_LOG << " realtime events..." << std::endl;

    EventLog realtimeEvent;

    while(numOfRealtimeEvents < NUM_OF_REALTIME_LOG) {
      if(!eventReader->Read(&realtimeEvent)) {
        std::cerr << "Cannot receive realtime events!" << std::endl;
        break;
      }

      std::cout << realtimeEvent.ShortDebugString() << std::endl;

      numOfRealtimeEvents++;
    }

    context.TryCancel();
    eventReader->Finish();
    eventSvc.DisableMonitoring(deviceID); 
    ```




