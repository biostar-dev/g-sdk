---
title: "Quick Start Guide for Master Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the Go client library]({{'/go/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. Change the gateway and the device information in _src/example/quick/quickStart.go_ as needed.
  
    ```go
    // the path of the root certificate
    MASTER_CA_FILE = "../../../../cert/master/ca.crt"

    // the address of the master gateway
    MASTER_IP = "192.168.0.2"
    MASTER_PORT = 4010

    // the paths of the administrator certificate and its key    
    ADMIN_CERT_FILE = "../../../../cert/master/admin.crt"
    ADMIN_KEY_FILE = "../../../../cert/master/admin_key.pem"

    // the paths of the tenant certificate and its key    
    TENANT_CERT_FILE = "../../../../cert/master/tenant1.crt"
    TENANT_KEY_FILE = "../../../../cert/master/tenant1_key.pem"    

    // the following values should be same as the IDs in the corresponding certificates
    TENANT_ID = "tenant1"
    GATEWAY_ID = "gateway1"    

    // the ip address of the target device
    A2_IP = "192.168.0.110"
    A2_PORT = 51211
    ```
6. Build.

    ```
    cd src/example/quick
    go build .
    ```
7. Run.
   
    ```
    ./quick -m
    ```

    To initialize the database, you have to run with __-mi__ option once. See _initMaster()_ for initializing the database.
    {: .notice--info}

## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the master gateway and get a ___grpc.ClientConn___.
   
    ```go
    clientCert, _ := tls.LoadX509KeyPair(tenantCertFile, tenantKeyFile)
    caCert, _ := ioutil.ReadFile(caCertFile)
    caCertPool := x509.NewCertPool()
    caCertPool.AppendCertsFromPEM(caCert)

    tlsConfig := &tls.Config {
      Certificates: []tls.Certificate{ clientCert },
      RootCAs: caCertPool,
    }

    var tokenCreds JWTCredential

    conn, _ = grpc.Dial(fmt.Sprintf("%v:%v", masterIP, masterPort), grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig)), grpc.WithPerRPCCredentials(&tokenCreds))
    ```

2. Login to the master gateway and get a JWT token for further communication.
    ```go
    tenantCertData, _ := ioutil.ReadFile(tenantCertFile)

    loginClient := login.NewLoginClient(c.conn)

    loginReq := &login.LoginRequest{
      TenantCert: string(tenantCertData),
    }

    loginResp, _ := loginClient.Login(context.Background(), loginReq)
    tokenCreds.Token = loginResp.JwtToken   
    ```

3. Create a service client such as ___connectMaster.ConnectMasterClient___ using the connection. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```go
    connectMaster.ConnectMasterClient client = connectMaster.NewConnectMasterClient(conn)
    ```

4. Call the functions of the service using the client. 
   
    ```go
    req := &connectMaster.ConnectRequest{
      GatewayID: gatewayID,
      ConnectInfo: &connect.ConnectInfo{
        IPAddr: deviceIP,
        Port: int32(devicePort),
        UseSSL: useSSL,
      },
    }

    resp, _ := client.Connect(context.Background(), req)
    ```

The structures in _example_ are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample structures.
{: .notice--warning}

## 2. Connect to the master gateway and login

The first thing to do is to connect to the master gateway and get a ___grpc.ClientConn___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the following certificates.

* The root CA certificate of the master gateway
* The client certificate of a tenant and its key file
* For administrative tasks such as creating tenants, the client certificate of an administrator and its key file

After connecting to the master gateway, you have to login with either a tenant certificate or an administrator certificate. When login succeeds, the master gateway will return a JWT token, which will be used as a call credential for further API calls.

```go
// An example structure encapsulating communication with the master gateway
type MasterClient struct {
  conn *grpc.ClientConn
}

func (c *MasterClient) GetConn() *grpc.ClientConn {
  return c.conn
}

// When you have to do administrative tasks such as managing tenants
func (c *MasterClient) ConnectAdmin(caCertFile, adminCertFile, adminKeyFile, masterIP string, masterPort int) error {
  clientCert, _err_ := tls.LoadX509KeyPair(adminCertFile, adminKeyFile)
  caCert, _ := ioutil.ReadFile(caCertFile)
  caCertPool := x509.NewCertPool()
  caCertPool.AppendCertsFromPEM(caCert)

  tlsConfig := &tls.Config {
    Certificates: []tls.Certificate{ clientCert },
    RootCAs: caCertPool,
  }

  var tokenCreds JWTCredential

  c.conn, _ = grpc.Dial(fmt.Sprintf("%v:%v", masterIP, masterPort), grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig)), grpc.WithPerRPCCredentials(&tokenCreds))

  adminCertData, _ := ioutil.ReadFile(adminCertFile)

  loginClient := login.NewLoginClient(c.conn)

  loginReq := &login.LoginAdminRequest{
    AdminTenantCert: string(adminCertData),
    TenantID: ADMIN_TENANT_ID,
  }

  loginResp, _ := loginClient.LoginAdmin(context.Background(), loginReq)

  tokenCreds.Token = loginResp.JwtToken	

  return nil
}

// When login as a normal tenant
func (c *MasterClient) ConnectTenant(caCertFile, tenantCertFile, tenantKeyFile, masterIP string, masterPort int) error {
  clientCert, _ := tls.LoadX509KeyPair(tenantCertFile, tenantKeyFile)
  caCert, _ := ioutil.ReadFile(caCertFile)
  caCertPool := x509.NewCertPool()
  caCertPool.AppendCertsFromPEM(caCert)

  tlsConfig := &tls.Config {
    Certificates: []tls.Certificate{ clientCert },
    RootCAs: caCertPool,
  }

  var tokenCreds JWTCredential

  c.conn, _ = grpc.Dial(fmt.Sprintf("%v:%v", masterIP, masterPort), grpc.WithTransportCredentials(credentials.NewTLS(tlsConfig)), grpc.WithPerRPCCredentials(&tokenCreds))

  tenantCertData, _ := ioutil.ReadFile(tenantCertFile)

  loginClient := login.NewLoginClient(c.conn)

  loginReq := &login.LoginRequest{
    TenantCert: string(tenantCertData),
  }

  loginResp, _ := loginClient.Login(context.Background(), loginReq)

  tokenCreds.Token = loginResp.JwtToken

  return nil
}

```

1. Create the ___MasterClient___.

    ```go
	  masterClient := &master.MasterClient{}
    ```

2. Connect to the master gateway.

    ```go
	  masterClient.ConnectTenant(MASTER_CA_FILE, TENANT_CERT_FILE, TENANT_KEY_FILE, MASTER_IP, MASTER_PORT)
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) and [the tutorial]({{'/go/connectMaster/' | relative_url}}).

```go
// An example structure showing the usage of the Connect Master API
type ConnectMasterSvc struct {
  client connectMaster.ConnectMasterClient
}

func NewConnectMasterSvc(conn *grpc.ClientConn) *ConnectMasterSvc {
  return &ConnectMasterSvc{
    client: connectMaster.NewConnectMasterClient(conn),
  }
}

func (s *ConnectMasterSvc) GetDeviceList(gatewayID string) ([]*connect.DeviceInfo, error) {
  req := &connectMaster.GetDeviceListRequest{
    GatewayID: gatewayID,
  }

  resp, _ := s.client.GetDeviceList(context.Background(), req)

  return resp.GetDeviceInfos(), nil
}


func (s *ConnectMasterSvc) SearchDevice(gatewayID string, timeout uint32) ([]*connect.SearchDeviceInfo, error) {
  req := &connectMaster.SearchDeviceRequest{
    GatewayID: gatewayID, 
    Timeout: timeout,
  }

  resp, _ := s.client.SearchDevice(context.Background(), req)

  return resp.GetDeviceInfos(), nil
}

func (s *ConnectMasterSvc) Connect(gatewayID string, deviceIP string, devicePort int, useSSL bool) (uint32, error) {
  req := &connectMaster.ConnectRequest{
    GatewayID: gatewayID,
    ConnectInfo: &connect.ConnectInfo{
      IPAddr: deviceIP,
      Port: int32(devicePort),
      UseSSL: useSSL,
    },
  }

  resp, _ := s.client.Connect(context.Background(), req)

  return resp.GetDeviceID(), nil
}


func (s *ConnectMasterSvc) Disconnect(deviceIDs []uint32) error {
  req := &connectMaster.DisconnectRequest{
    DeviceIDs: deviceIDs,
  }

  s.client.Disconnect(context.Background(), req)

  return nil
}
```

1. Create the ___ConnectMasterSvc___. It makes the ___connectMaster.ConnectMasterClient___ internally.
   
    ```go
    connectMasterSvc = connectMaster.NewConnectMasterSvc(grpcClient.GetConn()) 
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [ConnectMaster.EnableSSL]({{'/api/connectMaster/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```go
    deviceID, _ := connectMasterSvc.Connect(gatewayID, A2_IP, A2_PORT, USE_SSL)
    ```

3. Get the devices, which are managed by the gateway.
   
    ```go
    devList, _ = connectMasterSvc.GetDeviceList(gatewayID)
    ```

4. Disconnect the device.
   
    ```go  
    connectMasterSvc.Disconnect([]uint32{ deviceID })
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```go
// An example structure showing the usage of the Device API
type DeviceSvc struct {
  client device.DeviceClient
}

func NewDeviceSvc(conn *grpc.ClientConn) *DeviceSvc {
  return &DeviceSvc{
    client: device.NewDeviceClient(conn),
  }
}

func (s *DeviceSvc) GetInfo(deviceID uint32) (*device.FactoryInfo, error) {
  req := &device.GetInfoRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.GetInfo(context.Background(), req)

  return resp.GetInfo(), nil
}

func (s *DeviceSvc) GetCapabilityInfo(deviceID uint32) (*device.CapabilityInfo, error) {
  req := &device.GetCapabilityInfoRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.GetCapabilityInfo(context.Background(), req)

  return resp.GetCapInfo(), nil
}
```

1. Create the ___DeviceSvc___. It makes the ___device.DeviceClient___ internally.

    ```go
    deviceSvc = device.NewDeviceSvc(grpcClient.GetConn())
    ```
2. Get the version information of the device.

    ```go
    devInfo, _ := deviceSvc.GetInfo(deviceID)
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```go
	  capInfo, _ := deviceSvc.GetCapabilityInfo(deviceID)
    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```go
// An example structure showing the usage of the Finger API
type FingerSvc struct {
  client finger.FingerClient
}

func NewFingerSvc(conn *grpc.ClientConn) *FingerSvc {
  return &FingerSvc{
    client: finger.NewFingerClient(conn),
  }
}

func (s *FingerSvc) Scan(deviceID uint32, templateFormat finger.TemplateFormat, qualityThreshold uint32) ([]byte, uint32, error) {
  req := &finger.ScanRequest{
    DeviceID: deviceID,
    TemplateFormat: templateFormat,
    QualityThreshold: qualityThreshold,
  }

  resp, _ := s.client.Scan(context.Background(), req)

  return resp.GetTemplateData(), resp.GetQualityScore(), nil
}

func (s *FingerSvc) GetImage(deviceID uint32) ([]byte, error) {
  req := &finger.GetImageRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.GetImage(context.Background(), req)

  return resp.GetBMPImage(), nil
}

func (s *FingerSvc) GetConfig(deviceID uint32) (*finger.FingerConfig, error) {
  req := &finger.GetConfigRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.GetConfig(context.Background(), req)

  return resp.GetConfig(), nil
}
```

1. Create the ___FingerSvc___. It makes the ___finger.FingerClient___ internally.
 
    ```go
    fingerSvc = finger.NewFingerSvc(grpcClient.GetConn())
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```go
    templData, score, _ := fingerSvc.Scan(deviceID, finger.TemplateFormat_TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD)
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```go
    bmpImage, _ := fingerSvc.GetImage(deviceID)

    ioutil.WriteFile(FINGERPRINT_IMAGE_NAME, bmpImage, 0644)
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```go
	  fingerConfig, _ := fingerSvc.GetConfig(deviceID)
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```go
// An example structure showing the usage of the Card API
type CardSvc struct {
  client card.CardClient
}

func NewCardSvc(conn *grpc.ClientConn) *CardSvc {
  return &CardSvc{
    client: card.NewCardClient(conn),
  }
}

func (s *CardSvc) Scan(deviceID uint32) (*card.CardData, error) {
  req := &card.ScanRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.Scan(context.Background(), req)

  return resp.GetCardData(), nil
}

func (s *CardSvc) GetBlacklist(deviceID uint32) ([]*card.BlacklistItem, error) {
  req := &card.GetBlacklistRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.GetBlacklist(context.Background(), req)

  return resp.GetBlacklist(), nil
}

func (s *CardSvc) AddBlacklist(deviceID uint32, cardInfos []*card.BlacklistItem) error {
  req := &card.AddBlacklistRequest{
    DeviceID: deviceID,
    CardInfos: cardInfos,
  }

  s.client.AddBlacklist(context.Background(), req)

  return nil
}


func (s *CardSvc) DeleteBlacklist(deviceID uint32, cardInfos []*card.BlacklistItem) error {
  req := &card.DeleteBlacklistRequest{
    DeviceID: deviceID,
    CardInfos: cardInfos,
  }

  s.client.DeleteBlacklist(context.Background(), req)

  return nil
}
```

1. Create the ___CardSvc___. It makes the ___card.CardClient___ internally.

    ```go
    cardSvc = card.NewCardSvc(grpcClient.GetConn())
    ```

2. Scan a card.

    ```go
	  cardData, _ := cardSvc.Scan(deviceID)
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```go
    // Get the current blacklist
    blacklist, _ := cardSvc.GetBlacklist(deviceID)

    // Add new items into the blacklist
    cardInfos := []*card.BlacklistItem{}

    for i := 0; i < NUM_OF_NEW_BLACKLIST; i++ {
      cardInfo := &card.BlacklistItem{
        CardID: []byte(fmt.Sprintf("%v", FIRST_BLACKLISTED_CARD_ID + i)),
        IssueCount: ISSUE_COUNT,
      }

      cardInfos = append(cardInfos, cardInfo)
    }

    cardSvc.AddBlacklist(deviceID, cardInfos)
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```go
// An example structure showing the usage of the User API
type UserSvc struct {
  client user.UserClient
}

func NewUserSvc(conn *grpc.ClientConn) *UserSvc {
  return &UserSvc{
    client: user.NewUserClient(conn),
  }
}

func (s *UserSvc) GetList(deviceID uint32) ([]*user.UserHdr, error) {
  req := &user.GetListRequest{
    DeviceID: deviceID,
  }

  resp, _ := s.client.GetList(context.Background(), req)

  return resp.GetHdrs(), nil
}


func (s *UserSvc) GetUser(deviceID uint32, userIDs []string) ([]*user.UserInfo, error) {
  req := &user.GetRequest{
    DeviceID: deviceID,
    UserIDs: userIDs,
  }

  resp, _ := s.client.Get(context.Background(), req)

  return resp.GetUsers(), nil
}


func (s *UserSvc) Enroll(deviceID uint32, users []*user.UserInfo) error {
  req := &user.EnrollRequest{
    DeviceID: deviceID,
    Users: users,
  }

  s.client.Enroll(context.Background(), req)

  return nil
}


func (s *UserSvc) Delete(deviceID uint32, userIDs []string) error {
  req := &user.DeleteRequest{
    DeviceID: deviceID,
    UserIDs: userIDs,
  }

  s.client.Delete(context.Background(), req)

  return nil
}

func (s *UserSvc) SetFinger(deviceID uint32, userFingers []*user.UserFinger) error {
  req := &user.SetFingerRequest{
    DeviceID: deviceID,
    UserFingers: userFingers,
  }

  s.client.SetFinger(context.Background(), req)

  return nil
}
```

1. Create the ___UserSvc___. It makes the ___user.UserClient___ internally.

    ```go
    userSvc = user.NewUserSvc(grpcClient.GetConn()) 
    ```

2. Get the user list and detailed information.

    ```go
    // Get the user list
    userHdrs, _ := userSvc.GetList(deviceID)

    // Extract user IDs from the list
    userIDs := make([]string, len(userHdrs))
    for i := 0; i < len(userHdrs); i++ {
      userIDs[i] = userHdrs[i].ID
    }

    // Get the user information with the user IDs
    userInfos, _ := userSvc.GetUser(deviceID, userIDs)
    ```

3. Enroll new users.

    ```go
    newUsers := make([]*user.UserInfo, NUM_OF_NEW_USER)
    newUserIDs := make([]string, NUM_OF_NEW_USER)

    for i := 0; i < NUM_OF_NEW_USER; i++ {
      newUsers[i] = &user.UserInfo{
        Hdr: &user.UserHdr{
          ID: fmt.Sprintf("%v", rand.Int31()),
        },
      }

      newUserIDs[i] = newUsers[i].Hdr.ID
    }

    userSvc.Enroll(deviceID, newUsers)
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```go
    userFingerData := &user.UserFinger{
      UserID: userID,
      Fingers: []*finger.FingerData{},
    }

    fingerData := &finger.FingerData{
      Templates: make([][]byte, NUM_OF_TEMPLATE_PER_FINGER),
    }

    // Scan the first fingerprint
    fingerData.Templates[0], _, _ = fingerSvc.Scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD)

    // Scan the second fingerprint of the same finger
    fingerData.Templates[1], _, _ = fingerSvc.Scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD)

    userFingerData.Fingers = append(userFingerData.Fingers, fingerData)

    userSvc.SetFinger(deviceID, []*user.UserFinger{ userFingerData })
    ```

5. Delete new users.

    ```go
    userSvc.Delete(deviceID, newUserIDs)
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```go
// An example structure showing the usage of the Event API
type EventSvc struct {
  client event.EventClient
}

func NewEventSvc(conn *grpc.ClientConn) *EventSvc {
  return &EventSvc{
    client: event.NewEventClient(conn),
  }
}

func (s *EventSvc) GetLog(deviceID, startEventID, maxNumOfLog uint32) ([]*event.EventLog, error) {
  req := &event.GetLogRequest{
    DeviceID: deviceID,
    StartEventID: startEventID, 
    MaxNumOfLog: maxNumOfLog,
  }

  resp, _ := s.client.GetLog(context.Background(), req)

  return resp.GetEvents(), nil
}


func (s *EventSvc) GetImageLog(deviceID, startEventID, maxNumOfLog uint32) ([]*event.ImageLog, error) {
  req := &event.GetImageLogRequest{
    DeviceID: deviceID,
    StartEventID: startEventID, 
    MaxNumOfLog: maxNumOfLog,
  }

  resp, _ := s.client.GetImageLog(context.Background(), req)

  return resp.GetImageEvents(), nil
}


const (
  MONITORING_QUEUE_SIZE = 8
)

var (
  eventStream event.Event_SubscribeRealtimeLogClient
)

func (s *EventSvc) StartMonitoring(deviceID uint32) (context.CancelFunc, error) {
  // Enable monitoring of the device
  enableReq := &event.EnableMonitoringRequest{
    DeviceID: deviceID,
  }

  s.client.EnableMonitoring(context.Background(), enableReq)

  // Start monitoring thread for receiving events asynchronously
  subReq := &event.SubscribeRealtimeLogRequest{
    QueueSize: MONITORING_QUEUE_SIZE,
    DeviceIDs: []uint32 { deviceID },
  }

  ctx, cancelFunc := context.WithCancel(context.Background())
  eventStream, _ = s.client.SubscribeRealtimeLog(ctx, subReq)

  // receive real-time events asynchronously 
  go func() {
    fmt.Printf("Start receiving real-time events\n")

    for {
      eventLog, err := eventStream.Recv()

      if err != nil {
        fmt.Printf("Cannot receive real-time events: %v\n", err)
        return nil, err
      }

      fmt.Printf("Event: %v\n", eventLog)
    }
  } ()

  return cancelFunc, nil
}

func (s *EventSvc) StopMonitoring(deviceID uint32) error {
  disableReq := &event.DisableMonitoringRequest{
    DeviceID: deviceID,
  }

  s.client.DisableMonitoring(context.Background(), disableReq)

  return nil
}
```

1. Create the ___EventSvc___. It makes the ___event.EventClient___ internally.

    ```go
    eventSvc = event.NewEventSvc(grpcClient.GetConn())
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```go
	  events, _ := eventSvc.GetLog(deviceID, 0, MAX_NUM_OF_LOG)
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```go
    imageEvents, _ := eventSvc.GetImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG)

    if len(imageEvents) > 0 {
      ioutil.WriteFile(LOG_IMAGE_NAME, imageEvents[0].JPGImage, 0644)
    }    
    ```

4. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```go
	  cancelFunc, _ := eventSvc.StartMonitoring(deviceID)
    ```

5. Stop monitoring.

    ```go
	  eventSvc.StopMonitoring(deviceID)

	  cancelFunc()
    ```




