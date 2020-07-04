---
title: "Quick Start Guide for Master Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the C# client library]({{'/csharp/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. The quick start example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/quick/quick.csproj_ file as needed.
6. Change the server and the device information in _example/quick/Program.cs_ as needed.
   
    ```csharp
    // the path of the root certificate
    private const string MASTER_CA_FILE = "../../../cert/master/ca.crt";  

    // the address of the master gateway
    private const string MASTER_ADDR = "192.168.0.2";
    private const int MASTER_PORT = 4010; 

    // the paths of the administrator certificate and its key 
    private const string ADMIN_CERT_FILE = "../../../cert/master/admin.crt";
    private const string ADMIN_KEY_FILE = "../../../cert/master/admin_key.pem";   

    // the paths of the tenant certificate and its key    
    private const string TENANT_CERT_FILE = "../../../cert/master/tenant1.crt";
    private const string TENANT_KEY_FILE = "../../../cert/master/tenant1_key.pem";      

    // the following values should be same as the IDs in the corresponding certificates
    private const string TENANT_ID = "tenant1";
    private const string GATEWAY_ID = "gateway1";      

    // the ip address of the target device
    private const string DEVICE_ADDR = "192.168.0.110";
    private const int DEVICE_PORT = 51211;
    ```
7. Build and run.

    ```
    cd example/quick
    dotnet run -m
    ```

    To initialize the database, you have to run with __-mi__ option once. 
    {: .notice--info}

## 1. Overview

You can use the services in the following steps.

1. Create a ___Channel___ and connect to the gateway.
   
    ```csharp
    var channelCredentials = new SslCredentials(File.ReadAllText(caFile), new KeyCertificatePair(File.ReadAllText(tenantCertFile), File.ReadAllText(tenantKeyFile)));
    var callCredentials = CallCredentials.FromInterceptor(JwtCredential.JwtAuthInterceptor);

    Channel channel = new Channel(masterAddr, masterPort, ChannelCredentials.Create(channelCredentials, callCredentials)); 
    ```

2. Login to the master gateway and get a JWT token for further communication.
    ```csharp
    var loginClient = new Login.Login.LoginClient(channel);

    var request = new LoginRequest{ TenantCert = File.ReadAllText(tenantCertFile) };
    var response = loginClient.Login(request);

    JwtCredential.SetToken(response.JwtToken); 
    ```
   
3. Create a service client such as ___ConnectMaster.ConnectMaster.ConnectMasterClient___ using the channel. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```csharp
    ConnectMaster.ConnectMaster.ConnectMasterClient connectMasterClient = new ConnectMaster.ConnectMaster.ConnectMasterClient(channel);
    ```

4. Call the functions of the service using the client. 
   
    ```csharp 
    var connectInfo = new ConnectInfo{ IPAddr = deviceAddr, Port = devicePort, UseSSL = true };
    var request = new ConnectRequest{ GatewayID = gatewayID, ConnectInfo = connectInfo };
    var response = connectMasterClient.Connect(request);    
    ```

The classes in the __example__ namespace are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample classes.
{: .notice--warning}


## 2. Connect to the master gateway

The first thing to do is to connect to the master gateway and get a ___Channel___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the following certificates.

* The root CA certificate of the master gateway
* The client certificate of a tenant and its key file
* For administrative tasks such as creating tenants, the client certificate of an administrator and its key file

After connecting to the master gateway, you have to login with either a tenant certificate or an administrator certificate. When login succeeds, the master gateway will return a JWT token, which will be used as a call credential for further API calls.

```csharp
// An example class encapsulating communication with the master gateway
class MasterClient : GrpcClient {
  private const string ADMIN_TENANT_ID = "administrator";

  public void ConnectAdmin(string caFile, string adminCertFile, string adminKeyFile, string masterAddr, int masterPort) {
    var channelCredentials = new SslCredentials(File.ReadAllText(caFile), new KeyCertificatePair(File.ReadAllText(adminCertFile), File.ReadAllText(adminKeyFile)));
    var callCredentials = CallCredentials.FromInterceptor(JwtCredential.JwtAuthInterceptor);

    channel = new Channel(masterAddr, masterPort, ChannelCredentials.Create(channelCredentials, callCredentials)); 

    var loginClient = new Login.Login.LoginClient(channel);

    var request = new LoginAdminRequest{ AdminTenantCert = File.ReadAllText(adminCertFile), TenantID = ADMIN_TENANT_ID };
    var response = loginClient.LoginAdmin(request);

    JwtCredential.SetToken(response.JwtToken); 
  } 

  public void ConnectTenant(string caFile, string tenantCertFile, string tenantKeyFile, string masterAddr, int masterPort) {
    var channelCredentials = new SslCredentials(File.ReadAllText(caFile), new KeyCertificatePair(File.ReadAllText(tenantCertFile), File.ReadAllText(tenantKeyFile)));
    var callCredentials = CallCredentials.FromInterceptor(JwtCredential.JwtAuthInterceptor);

    channel = new Channel(masterAddr, masterPort, ChannelCredentials.Create(channelCredentials, callCredentials)); 

    var loginClient = new Login.Login.LoginClient(channel);

    var request = new LoginRequest{ TenantCert = File.ReadAllText(tenantCertFile) };
    var response = loginClient.Login(request);

    JwtCredential.SetToken(response.JwtToken); 
  } 
}
```

1. Create the ___MasterClient___.

    ```csharp
    var masterClient = new MasterClient();
    ```

2. Connect to the master gateway.

    ```csharp
    masterClient.ConnectTenant(MASTER_CA_FILE, TENANT_CERT_FILE, TENANT_KEY_FILE, MASTER_ADDR, MASTER_PORT);
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) and [the tutorial]({{'/csharp/connectMaster/' | relative_url}}).

```csharp
// An example class showing the usage of the Connect Master API
class ConnectMasterSvc
{
  private const int SEARCH_TIMEOUT_MS = 5000;

  private ConnectMaster.ConnectMaster.ConnectMasterClient connectMasterClient;

  public ConnectMasterSvc(Channel channel) {
    connectMasterClient = new ConnectMaster.ConnectMaster.ConnectMasterClient(channel);
  }

  public RepeatedField<Connect.DeviceInfo> GetDeviceList(string gatewayID) {
    var request = new GetDeviceListRequest{ GatewayID = gatewayID };
    var response = connectMasterClient.GetDeviceList(request);

    return response.DeviceInfos;
  }
  
  public RepeatedField<Connect.SearchDeviceInfo> SearchDevice(string gatewayID) {
    var request = new SearchDeviceRequest{ GatewayID = gatewayID, Timeout = SEARCH_TIMEOUT_MS };
    var response = connectMasterClient.SearchDevice(request);

    return response.DeviceInfos;
  }

  public uint Connect(string gatewayID, Connect.ConnectInfo connectInfo) {
    var request = new ConnectRequest{ GatewayID = gatewayID, ConnectInfo = connectInfo };
    var response = connectMasterClient.Connect(request);

    return response.DeviceID;
  } 

  public void Disconnect(uint[] deviceIDs) {
    var request = new DisconnectRequest{};
    request.DeviceIDs.AddRange(deviceIDs);

    connectMasterClient.Disconnect(request);
  }     
}
```

1. Create the ___ConnectMasterSvc___. It makes the ___ConnectMaster.ConnectMaster.ConnectMasterClient___ internally.
   
    ```csharp
    ConnectMasterSvc connectMasterSvc = new ConnectMasterSvc(masterClient.GetChannel()); 
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using  [ConnectMaster.EnableSSL]({{'/api/connectMaster/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```csharp
    var connectInfo = new ConnectInfo{ IPAddr = deviceAddr, Port = port, UseSSL = useSSL };
    var devID = connectMasterSvc.Connect(gatewayID, connectInfo);
    ```

3. Get the devices, which are managed by the gateway.
   
    ```csharp
    var devList = connectMasterSvc.GetDeviceList(gatewayID);
    ```

4. Disconnect the device.
   
    ```csharp  
    connectMasterSvc.Disconnect(devID);
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```csharp
// An example class showing the usage of the Device API
class DeviceSvc
{
  private Device.Device.DeviceClient deviceClient;

  public DeviceSvc(Channel channel) {
    deviceClient = new Device.Device.DeviceClient(channel);
  }

  public FactoryInfo GetInfo(uint deviceID) {
    var request = new GetInfoRequest{ DeviceID = deviceID };
    var response = deviceClient.GetInfo(request);

    return response.Info;
  }

  public CapabilityInfo GetCapabilityInfo(uint deviceID) {
    var request = new GetCapabilityInfoRequest{ DeviceID = deviceID };
    var response = deviceClient.GetCapabilityInfo(request);

    return response.CapInfo;
  }
}
```

1. Create the ___DeviceSvc___. It makes the ___Device.Device.DeviceClient___ internally.

    ```csharp
    DeviceSvc deviceSvc = new DeviceSvc(grpcClient.GetChannel()); 
    ```
2. Get the version information of the device.

    ```csharp
    var info = deviceSvc.GetInfo(deviceID);
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```csharp
    var capInfo = deviceSvc.GetCapabilityInfo(deviceID);
    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```csharp
// An example class showing the usage of the Finger API
class FingerSvc
{
  private Finger.Finger.FingerClient fingerClient;

  public FingerSvc(Channel channel) {
    fingerClient = new Finger.Finger.FingerClient(channel);
  }

  public ByteString Scan(uint deviceID, Finger.TemplateFormat templateFormat, uint qualityThreshold) {
    var request = new ScanRequest{ DeviceID = deviceID, TemplateFormat = templateFormat, QualityThreshold = qualityThreshold };
    var response = fingerClient.Scan(request);

    Console.WriteLine("Template Score: {0}", response.QualityScore);

    return response.TemplateData;
  }

  public ByteString GetImage(uint deviceID) {
    var request = new GetImageRequest{ DeviceID = deviceID };
    var response = fingerClient.GetImage(request);

    return response.BMPImage;
  }

  public FingerConfig GetConfig(uint deviceID) {
    var request = new Finger.GetConfigRequest{ DeviceID = deviceID };
    var response = fingerClient.GetConfig(request);

    return response.Config;
  }
}
```

1. Create the ___FingerSvc___. It makes the ___Finger.Finger.FingerClient___ internally.
 
    ```csharp

    FingerSvc fingerSvc = new FingerSvc(grpcClient.GetChannel()); 
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```csharp
    var templateData = fingerSvc.Scan(deviceID, Finger.TemplateFormat.Suprema, QUALITY_THRESHOLD);
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```csharp
    var bmpImage = fingerSvc.GetImage(deviceID);
    File.WriteAllBytes(FINGERPRINT_IMAGE_FILE, bmpImage.ToByteArray());
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```csharp
    var fingerConfig = fingerSvc.GetConfig(deviceID);
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```csharp
// An example class showing the usage of the Card API
class CardSvc
{
  private Card.Card.CardClient cardClient;

  public CardSvc(Channel channel) {
    cardClient = new Card.Card.CardClient(channel);
  }

  public CardData Scan(uint deviceID) {
    var request = new ScanRequest{ DeviceID = deviceID };
    var response = cardClient.Scan(request);

    return response.CardData;
  }

  public RepeatedField<Card.BlacklistItem> GetBlacklist(uint deviceID) {
    var request = new GetBlacklistRequest{ DeviceID = deviceID };
    var response = cardClient.GetBlacklist(request);

    return response.Blacklist;
  }

  public void AddBlacklist(uint deviceID, Card.BlacklistItem[] cardInfos) {
    var request = new AddBlacklistRequest{ DeviceID = deviceID };
    request.CardInfos.AddRange(cardInfos);

    cardClient.AddBlacklist(request);
  }

  public void DeleteBlacklist(uint deviceID, Card.BlacklistItem[] cardInfos) {
    var request = new DeleteBlacklistRequest{ DeviceID = deviceID };
    request.CardInfos.AddRange(cardInfos);

    cardClient.DeleteBlacklist(request);
  }
}
```

1. Create the ___CardSvc___. It makes the ___Card.Card.CardClient___ internally.

    ```csharp
    CardSvc cardSvc = new CardSvc(grpcClient.GetChannel()); 
    ```

2. Scan a card.

    ```csharp
    var cardData = cardSvc.Scan(deviceID);
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```csharp
    // Get the current blacklist
    var blacklist = cardSvc.GetBlacklist(deviceID);

    // Add new items into the blacklist
    var newCardInfos = new Card.BlacklistItem[NUM_OF_BLACKLIST_ITEM];

    for(int i = 0; i < NUM_OF_BLACKLIST_ITEM; i++) {
      newCardInfos[i] = new Card.BlacklistItem{ CardID = ByteString.CopyFromUtf8(String.Format("{0}", FIRST_BLACKLISTED_CARD_ID + i)), IssueCount = ISSUE_COUNT };
    }

    cardSvc.AddBlacklist(deviceID, newCardInfos);
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```csharp
// An example class showing the usage of the User API
class UserSvc
{
  private User.User.UserClient userClient;

  public UserSvc(Channel channel) {
    userClient = new User.User.UserClient(channel);
  }

  public RepeatedField<User.UserHdr> GetList(uint deviceID) {
    var request = new GetListRequest{ DeviceID = deviceID };
    var response = userClient.GetList(request);

    return response.Hdrs;
  }

  public RepeatedField<User.UserInfo> GetUser(uint deviceID, string[] userIDs) {
    var request = new GetRequest{ DeviceID = deviceID };
    request.UserIDs.AddRange(userIDs);

    var response = userClient.Get(request);

    return response.Users;
  } 

  public void Enroll(uint deviceID, User.UserInfo[] users) {
    var request = new EnrollRequest{ DeviceID = deviceID };
    request.Users.AddRange(users);

    var response = userClient.Enroll(request);
  }

  public void Delete(uint deviceID, string[] userIDs) {
    var request = new DeleteRequest{ DeviceID = deviceID };
    request.UserIDs.AddRange(userIDs);

    var response = userClient.Delete(request);
  }

  public void SetFinger(uint deviceID, User.UserFinger[] userFingers) {
    var request = new SetFingerRequest{ DeviceID = deviceID };
    request.UserFingers.AddRange(userFingers);

    var response = userClient.SetFinger(request);
  }   
}
```

1. Create the ___UserSvc___. It makes the ___User.User.UserClient___ internally.

    ```csharp
    UserSvc userSvc = new UserSvc(grpcClient.GetChannel()); 
    ```

2. Get the user list and detailed information.

    ```csharp
    // Get the user list
    var userList = userSvc.GetList(deviceID);

    // Extract user IDs from the list
    string[] userIDs = new string[userList.Count];

    for(int i = 0; i < userList.Count; i++) {
      userIDs[i] = userList[i].ID;
    }

    // Get the user information with the user IDs
    var users = userSvc.GetUser(deviceID, userIDs);
    ```

3. Enroll new users.

    ```csharp
    var newUsers = new User.UserInfo[NUM_OF_NEW_USER];
    var newUserIDs = new String[NUM_OF_NEW_USER];
    var rnd = new Random();

    for(int i = 0; i < NUM_OF_NEW_USER; i++) {
      var hdr = new User.UserHdr{ ID = String.Format("{0}", rnd.Next()) };
      newUsers[i] = new User.UserInfo{ Hdr = hdr };
      newUserIDs[i] = hdr.ID;
    }

    userSvc.Enroll(deviceID, newUsers);
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```csharp
    var userFingers = new User.UserFinger[1];
    userFingers[0] = new User.UserFinger{ UserID = userID };
    
    // Scan the first fingerprint
    var firstTemplate = fingerSvc.Scan(deviceID, Finger.TemplateFormat.Suprema, QUALITY_THRESHOLD);

    // Scan the second fingerprint of the same finger
    var secondTemplate = fingerSvc.Scan(deviceID, Finger.TemplateFormat.Suprema, QUALITY_THRESHOLD);

    var fingerData = new Finger.FingerData{ Index = 0, Flag = 0 };
    fingerData.Templates.Add(firstTemplate);
    fingerData.Templates.Add(secondTemplate);

    userFingers[0].Fingers.Add(fingerData);

    userSvc.SetFinger(deviceID, userFingers);
    ```

5. Delete new users.

    ```csharp
    userSvc.Delete(deviceID, newUserIDs);
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```csharp
// An example class showing the usage of the Event API
class EventSvc
{
  private const int MONITORING_QUEUE_SIZE = 8;

  private Event.Event.EventClient eventClient;
  private CancellationTokenSource cancellationTokenSource;

  public EventSvc(Channel channel) {
    eventClient = new Event.Event.EventClient(channel);
  }

  public RepeatedField<Event.EventLog> GetLog(uint deviceID, uint startEventID, uint maxNumOfLog) {
    var request = new GetLogRequest{ DeviceID = deviceID, StartEventID = startEventID, MaxNumOfLog = maxNumOfLog };
    var response = eventClient.GetLog(request);

    return response.Events;
  }

  public RepeatedField<Event.ImageLog> GetImageLog(uint deviceID, uint startEventID, uint maxNumOfLog) {
    var request = new GetImageLogRequest{ DeviceID = deviceID, StartEventID = startEventID, MaxNumOfLog = maxNumOfLog };
    var response = eventClient.GetImageLog(request);

    return response.ImageEvents;
  }    

  public void StartMonitoring(uint deviceID) {
    var enableRequest = new EnableMonitoringRequest{ DeviceID = deviceID };
    eventClient.EnableMonitoring(enableRequest);

    var subscribeRequest = new SubscribeRealtimeLogRequest{ DeviceIDs = {deviceID}, QueueSize = MONITORING_QUEUE_SIZE };
    var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

    cancellationTokenSource = new CancellationTokenSource();

    ReceiveEvents(call.ResponseStream, cancellationTokenSource.Token);
  }

  public void StopMonitoring(uint deviceID) {
    var disableRequest = new DisableMonitoringRequest{ DeviceID = deviceID };
    eventClient.DisableMonitoring(disableRequest);

    if(cancellationTokenSource != null) {
      cancellationTokenSource.Cancel();
    }
  }    
}
```

1. Create the ___EventSvc___. It makes the ___Event.Event.EventClient___ internally.

    ```csharp
    EventSvc eventSvc = new EventSvc(grpcClient.GetChannel());
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```csharp
    var events = eventSvc.GetLog(deviceID, 0, MAX_NUM_OF_LOG);
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```csharp
    var imageEvents = eventSvc.GetImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG);

    if(imageEvents.Count > 0) {
      File.WriteAllBytes(LOG_IMAGE_FILE, imageEvents[0].JPGImage.ToByteArray());
    }
    ```

4. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```csharp
    // Enable monitoring of the device
    var enableRequest = new EnableMonitoringRequest{ DeviceID = deviceID };
    eventClient.EnableMonitoring(enableRequest);

    // Start monitoring thread for receiving events asynchronously
    var subscribeRequest = new SubscribeRealtimeLogRequest{ DeviceIDs = {deviceID}, QueueSize = MONITORING_QUEUE_SIZE };
    var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

    cancellationTokenSource = new CancellationTokenSource();

    ReceiveEvents(call.ResponseStream, cancellationTokenSource.Token);
    ```

    ```csharp
    // An async function showing how to receive real-time events
    static async void ReceiveEvents(IAsyncStreamReader<EventLog> stream, CancellationToken token) {
      Console.WriteLine("Start receiving real-time events");

      try {
        while(await stream.MoveNext(token)) {
          var eventLog = stream.Current;
          Console.WriteLine("Event: {0}", eventLog);        
        }
      } catch (Exception e) {
        Console.WriteLine("Monitoring error: {0}", e);
      } finally {
        Console.WriteLine("Stop receiving real-time events");
      }
    }    
    ```




