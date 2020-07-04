---
title: "Quick Start Guide for Device Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory.    
4. Change the gateway and the device information in _src/example/quick/quickStart.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the target device
    A2_IP = "192.168.0.110"
    A2_PORT = 51211
    ```
5. Build.

    ```
    cd src/example/quick
    go build .
    ```
6. Run.
   
    ```
    ./quick
    ```

## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the device gateway and get a ___grpc.ClientConn___.
   
    ```go
    creds, _ := credentials.NewClientTLSFromFile(certFile, "")
    conn, _ := grpc.Dial(fmt.Sprintf("%v:%v", serverIP, serverPort), grpc.WithTransportCredentials(creds), grpc.WithBlock(), grpc.WithTimeout(CONN_TIMEOUT))
    ```

2. Create a service client such as ___connect.ConnectClient___ using the connection. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```go
    connect.ConnectClient client = connect.NewConnectClient(conn)
    ```

3. Call the functions of the service using the client. 
   
    ```go
    req := &connect.ConnectRequest{
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


## 2. Connect to the device gateway

The first thing to do is to connect to the device gateway and get a ___grpc.ClientConn___, which will be used for further communication. You have to know the IP address and port number of the gateway. And, you should also have the root certificate of the gateway for TLS/SSL communication. 

```go
// An example structure encapsulating communication with the gateway
type GatewayClient struct {
  conn *grpc.ClientConn
}

func (c *GatewayClient) GetConn() *grpc.ClientConn {
  return c.conn
}

func (c *GatewayClient) Connect(certFile string, serverIP string, serverPort int) error {
  creds, _ := credentials.NewClientTLSFromFile(certFile, "")

  conn, _ := grpc.Dial(fmt.Sprintf("%v:%v", serverIP, serverPort), grpc.WithTransportCredentials(creds), grpc.WithBlock(), grpc.WithTimeout(CONN_TIMEOUT))

  c.conn = conn

  return nil
}
```

1. Create the ___GatewayClient___.

    ```go
	  gatewayClient := &client.GatewayClient{}
    ```

2. Connect to the gateway.

    ```go
	  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_IP, GATEWAY_PORT)
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect API]({{'/api/connect/' | relative_url}}) and [the tutorial]({{'/go/connect/' | relative_url}}).

```go
// An example structure showing the usage of the Connect API
type ConnectSvc struct {
  client connect.ConnectClient
}

func NewConnectSvc(conn *grpc.ClientConn) *ConnectSvc {
  return &ConnectSvc{
    client: connect.NewConnectClient(conn),
  }
}

func (s *ConnectSvc) GetDeviceList() ([]*connect.DeviceInfo, error) {
  req := &connect.GetDeviceListRequest{
  }

  resp, _ := s.client.GetDeviceList(context.Background(), req)

  return resp.GetDeviceInfos(), nil
}


func (s *ConnectSvc) SearchDevice(timeout uint32) ([]*connect.SearchDeviceInfo, error) {
  req := &connect.SearchDeviceRequest{
    Timeout: timeout,
  }

  resp, _ := s.client.SearchDevice(context.Background(), req)

  return resp.GetDeviceInfos(), nil
}

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

1. Create the ___ConnectSvc___. It makes the ___connect.ConnectClient___ internally.
   
    ```go
    connectSvc = connect.NewConnectSvc(grpcClient.GetConn()) 
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [Connect.EnableSSL]({{'/api/connect/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```go
    deviceID, _ := connectSvc.Connect(A2_IP, A2_PORT, true)
    ```

3. Get the devices, which are managed by the gateway.
   
    ```go
    devList, _ = connectSvc.GetDeviceList()
    ```

4. Disconnect the device.
   
    ```go  
    connectSvc.Disconnect([]uint32{ deviceID })
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




