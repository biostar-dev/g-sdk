---
title: "Quick Start Guide for Master Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the Java client library]({{'/java/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. The quick start example uses Gradle for its project. You can change the _build.gradle_ file as needed.
6. Change the server and the device information in _src/main/java/com/supremainc/sdk/example/quick/QuickStart.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String MASTER_CA_FILE = "cert/master/ca.crt";    

    // the address of the master gateway
    private static final String MASTER_ADDR = "192.168.0.2";
    private static final int MASTER_PORT = 4010;    

    // the paths of the administrator certificate and its key 
    private static final String ADMIN_CERT_FILE = "cert/master/admin.crt";
    private static final String ADMIN_KEY_FILE = "cert/master/admin_key.pem";    

    // the paths of the tenant certificate and its key    
    private static final String TENANT_CERT_FILE = "cert/master/tenant1.crt";
    private static final String TENANT_KEY_FILE = "cert/master/tenant1_key.pem";       

    // the following values should be same as the IDs in the corresponding certificates
    private static final String TENANT_ID = "tenant1";
    private static final String GATEWAY_ID = "gateway1";     

    // the ip address of the target device
    private static final String DEVICE_ADDR = "192.168.0.110"; 
    private static final int DEVICE_PORT = 51211;
    ```
7. Build.

    ```
    ./gradlew installDist
    ```
8. Run.
   
    ```
    ./build/install/java/bin/quickStart -m
    ```

    To initialize the database, you have to run with __-mi__ option once. 
    {: .notice--info}

## 1. Overview

You can use the G-SDK services in the following steps.


1. Connect to the gateway and get a ___ManagedChannel___.
   
    ```java
    ManagedChannel channel = NettyChannelBuilder.forAddress(masterAddr, masterPort)
    .sslContext(GrpcSslContexts.forClient().keyManager(new File(tenantCertFile), new File(tenantKeyFile), null).trustManager(new File(caCertFile)).build())
    .build();
    ```
2. Login to the master gateway and get a JWT token for further communication.
    ```java
    LoginGrpc.LoginBlockingStub loginStub = LoginGrpc.newBlockingStub(channel);

    LoginRequest request = LoginRequest.newBuilder().setTenantCert(new String(Files.readAllBytes(Paths.get(tenantCertFile)))).build();
    LoginResponse response;

    response = loginStub.login(request);
    credentials = new JwtCredential(response.getJwtToken());    
    ```
3. Create a service stub such as ___ConnectMasterGrpc.ConnectMasterBlockingStub___ using the channel. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```java
    ConnectMasterGrpc.ConnectMasterBlockingStub connectMasterStub = ConnectMasterGrpc.newBlockingStub(channel);
    ```

4. Call the functions of the service using the stub. 
   
    ```java
    ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(deviceIP).setPort(devicePort).setUseSSL(useSSL).build();
    ConnectRequest request = ConnectRequest.newBuilder().setConnectInfo(connInfo).build();
    ConnectResponse response = connectMasterStub.connect(request);
    ```

The classes of _com.supremainc.sdk.example.*_ are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample classes.
{: .notice--warning}

## 2. Connect to the master gateway

The first thing to do is to connect to the master gateway and get a ___ManagedChannel___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the following certificates.

* The root CA certificate of the master gateway
* The client certificate of a tenant and its key file
* For administrative tasks such as creating tenants, the client certificate of an administrator and its key file

After connecting to the master gateway, you have to login with either a tenant certificate or an administrator certificate. When login succeeds, the master gateway will return a JWT token, which will be used as a call credential for further API calls.

```java
// An example class encapsulating communication with the master gateway
public class MasterClient extends GrpcClient {
  private static final String ADMIN_TENANT_ID = "administrator";
  private CallCredentials credentials;

  public CallCredentials getCredentials() {
    return credentials;
  }

  // When you have to do administrative tasks such as managing tenants
  public void connectAdmin(String caCertFile, String adminCertFile, String adminKeyFile, String masterAddr, int masterPort) throws Exception {
    channel = NettyChannelBuilder.forAddress(masterAddr, masterPort)
    .sslContext(GrpcSslContexts.forClient().keyManager(new File(adminCertFile), new File(adminKeyFile), null).trustManager(new File(caCertFile)).build())
    .build();

    LoginGrpc.LoginBlockingStub loginStub = LoginGrpc.newBlockingStub(channel);

    LoginAdminRequest request = LoginAdminRequest.newBuilder().setAdminTenantCert(new String(Files.readAllBytes(Paths.get(adminCertFile)))).setTenantID(ADMIN_TENANT_ID).build();
    LoginAdminResponse response;

    response = loginStub.loginAdmin(request);
    credentials = new JwtCredential(response.getJwtToken());
  }

  // When login as a normal tenant
  public void connectTenant(String caCertFile, String tenantCertFile, String tenantKeyFile, String masterAddr, int masterPort) throws Exception {
    channel = NettyChannelBuilder.forAddress(masterAddr, masterPort)
    .sslContext(GrpcSslContexts.forClient().keyManager(new File(tenantCertFile), new File(tenantKeyFile), null).trustManager(new File(caCertFile)).build())
    .build();

    LoginGrpc.LoginBlockingStub loginStub = LoginGrpc.newBlockingStub(channel);

    LoginRequest request = LoginRequest.newBuilder().setTenantCert(new String(Files.readAllBytes(Paths.get(tenantCertFile)))).build();
    LoginResponse response;

    response = loginStub.login(request);
    credentials = new JwtCredential(response.getJwtToken());
  }  
}
```

1. Create the ___MasterClient___.

    ```java
    MasterClient client = new MasterClient();
    ```

2. Connect to the master gateway.

    ```java
    try {
      client.connectTenant(MASTER_CA_FILE, TENANT_CERT_FILE, TENANT_KEY_FILE, MASTER_ADDR, MASTER_PORT);
    } catch (Exception e) {
      System.out.printf("Cannot connect to the server: %s", e); 
      System.exit(-1);
    }
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) and [the tutorial]({{'/java/connectMaster/' | relative_url}}).

```java
// An example class showing the usage of the Connect API
public class ConnectMasterSvc {
  private final ConnectMasterGrpc.ConnectMasterBlockingStub connectMasterStub;
  private final int SEARCH_TIMEOUT_MS = 5000;

  private final int MONITORING_QUEUE_SIZE = 16;

  public ConnectMasterSvc(ConnectMasterGrpc.ConnectMasterBlockingStub stub) {
    connectMasterStub = stub;
  }

  public List<DeviceInfo> getDeviceList(String gatewayID) throws Exception {
    GetDeviceListRequest request = GetDeviceListRequest.newBuilder().setGatewayID(gatewayID).build();
    GetDeviceListResponse response;
    
    response = connectMasterStub.getDeviceList(request);
    return response.getDeviceInfosList();
  } 

  public List<SearchDeviceInfo> searchDevice(String gatewayID) throws Exception {
    SearchDeviceRequest request = SearchDeviceRequest.newBuilder().setGatewayID(gatewayID).setTimeout(SEARCH_TIMEOUT_MS).build();
    SearchDeviceResponse response;
    
    response = connectMasterStub.searchDevice(request);
    return response.getDeviceInfosList();
  }   

  public int connect(String gatewayID, ConnectInfo connInfo) throws Exception {
    ConnectRequest request = ConnectRequest.newBuilder().setGatewayID(gatewayID).setConnectInfo(connInfo).build();

    ConnectResponse response = connectMasterStub.connect(request);

    return response.getDeviceID();
  }

  public void disconnect(int deviceID) throws Exception {
    DisconnectRequest request = DisconnectRequest.newBuilder().addDeviceIDs(deviceID).build();
    connectMasterStub.disconnect(request);
  }
}
```

1. Create the ___ConnectMasterSvc___. It makes the ___ConnectMasterGrpc.ConnectMasterBlockingStub___ internally.
   
    ```java
    ConnectMasterSvc connectMasterSvc = new ConnectMasterSvc(ConnectMasterGrpc.newBlockingStub(client.getChannel())); 
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [ConnectMaster.EnableSSL]({{'/api/connectMaster/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```java
    ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(deviceAddr).setPort(devicePort).setUseSSL(useSSL).build();

    int deviceID = connectMasterSvc.connect(gatewayID, connInfo);
    ```

3. Get the devices, which are managed by the gateway.
   
    ```java
    List<DeviceInfo> devInfo = connectMasterSvc.getDeviceList(gatewayID); 
    ```

4. Disconnect the device.
   
    ```java  
    connectSvc.disconnect(deviceID);
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```java
// An example class showing the usage of the Device API
public class DeviceSvc {
  private final DeviceGrpc.DeviceBlockingStub deviceStub;

  public DeviceSvc(DeviceGrpc.DeviceBlockingStub stub) {
    deviceStub = stub;
  }

  public FactoryInfo getInfo(int deviceID) throws Exception {
    GetInfoRequest request = GetInfoRequest.newBuilder().setDeviceID(deviceID).build();
    GetInfoResponse response;

    response = deviceStub.getInfo(request);
    return response.getInfo();
  } 

  public CapabilityInfo getCapabilityInfo(int deviceID) throws Exception {
    GetCapabilityInfoRequest request = GetCapabilityInfoRequest.newBuilder().setDeviceID(deviceID).build();
    GetCapabilityInfoResponse response;

    response = deviceStub.getCapabilityInfo(request);
    return response.getCapInfo();
  } 
}
```

1. Create the ___DeviceSvc___. It makes the ___DeviceGrpc.DeviceBlockingStub___ internally.

    ```java
    DeviceSvc deviceSvc = new DeviceSvc(DeviceGrpc.newBlockingStub(client.getChannel())); 
    ```
2. Get the version information of the device.

    ```java
    FactoryInfo versionInfo = deviceSvc.getInfo(deviceID);
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```java
    CapabilityInfo capInfo = deviceSvc.getCapabilityInfo(deviceID);

    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```java
// An example class showing the usage of the Finger API
public class FingerSvc {
  private final FingerGrpc.FingerBlockingStub fingerStub;

  public FingerSvc(FingerGrpc.FingerBlockingStub stub) {
    fingerStub = stub;
  }

  public byte[] scan(int deviceID, TemplateFormat templateFormat, int qualityThreshold) throws Exception {
    ScanRequest request = ScanRequest.newBuilder().setDeviceID(deviceID).setTemplateFormat(templateFormat).setQualityThreshold(qualityThreshold).build();
    ScanResponse response = fingerStub.scan(request);

    return response.getTemplateData().toByteArray();
  } 

  public byte[] getImage(int deviceID) throws Exception {
    GetImageRequest request = GetImageRequest.newBuilder().setDeviceID(deviceID).build();
    GetImageResponse response = fingerStub.getImage(request);

    return response.getBMPImage().toByteArray();
  } 

  public FingerConfig getConfig(int deviceID) throws Exception {
    GetConfigRequest request = GetConfigRequest.newBuilder().setDeviceID(deviceID).build();
    GetConfigResponse response = fingerStub.getConfig(request);

    return response.getConfig();
  }
}
```

1. Create the ___FingerSvc___. It makes the ___FingerGrpc.FingerBlockingStub___ internally.
 
    ```java
    FingerSvc fingerSvc = new FingerSvc(FingerGrpc.newBlockingStub(client.getChannel())); 
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```java
    byte[] templateData = ingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD);
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```java
    byte[] bmpImage = fingerSvc.getImage(deviceID);
    FileOutputStream bmpFile = new FileOutputStream(FINGERPRINT_IMAGE_FILE);
    bmpFile.write(bmpImage);
    bmpFile.close();
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```java
    FingerConfig fingerConfig = fingerSvc.getConfig(deviceID);
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```java
// An example class showing the usage of the Card API
public class CardSvc {
  private final CardGrpc.CardBlockingStub cardStub;

  public CardSvc(CardGrpc.CardBlockingStub stub) {
    cardStub = stub;
  }

  public CardData scan(int deviceID) throws Exception {
    ScanRequest request = ScanRequest.newBuilder().setDeviceID(deviceID).build();
    ScanResponse response = cardStub.scan(request);

    return response.getCardData();
  } 

  public List<BlacklistItem> getBlacklist(int deviceID) throws Exception {
    GetBlacklistRequest request = GetBlacklistRequest.newBuilder().setDeviceID(deviceID).build();
    GetBlacklistResponse response = cardStub.getBlacklist(request);

    return response.getBlacklistList();
  }

  public void addBlacklist(int deviceID, List<BlacklistItem> cardInfos) throws Exception {
    AddBlacklistRequest request = AddBlacklistRequest.newBuilder().setDeviceID(deviceID).addAllCardInfos(cardInfos).build();
    cardStub.addBlacklist(request);
  }

  public void deleteBlacklist(int deviceID, List<BlacklistItem> cardInfos) throws Exception {
    DeleteBlacklistRequest request = DeleteBlacklistRequest.newBuilder().setDeviceID(deviceID).addAllCardInfos(cardInfos).build();
    cardStub.deleteBlacklist(request);
  }
}
```

1. Create the ___CardSvc___. It makes the ___CardGrpc.CardBlockingStub___ internally.

    ```java
    CardSvc cardSvc = new CardSvc(CardGrpc.newBlockingStub(client.getChannel())); 
    ```

2. Scan a card.

    ```java
    CardData cardData = cardSvc.scan(deviceID);
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```java
    // Get the current blacklist
    List<BlacklistItem> blacklist = cardSvc.getBlacklist(deviceID);

    // Add new items into the blacklist
    List<BlacklistItem> newBlacklist = new ArrayList<BlacklistItem>();

    for(int i = 0; i < NUM_OF_BLACKLIST_ITEM; i++) {
      BlacklistItem item = BlacklistItem.newBuilder().setCardID(ByteString.copyFromUtf8(Integer.toString(FIRST_BLACKLISTED_CARD_ID + i))).setIssueCount(ISSUE_COUNT).build();
      newBlacklist.add(item);
    }

    cardSvc.addBlacklist(deviceID, newBlacklist);
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```java
// An example class showing the usage of the User API
public class UserSvc {
  private final UserGrpc.UserBlockingStub userStub;

  public UserSvc(UserGrpc.UserBlockingStub stub) {
    userStub = stub;
  }

  public List<UserHdr> getList(int deviceID) throws Exception {
    GetListRequest request = GetListRequest.newBuilder().setDeviceID(deviceID).build();
    GetListResponse response = userStub.getList(request);

    return response.getHdrsList();
  } 

  public List<UserInfo> getUser(int deviceID, List<String> userIDs) throws Exception {
    GetRequest request = GetRequest.newBuilder().setDeviceID(deviceID).addAllUserIDs(userIDs).build();
    GetResponse response = userStub.get(request);

    return response.getUsersList();
  }

  public void enroll(int deviceID, List<UserInfo> users) throws Exception {
    EnrollRequest request = EnrollRequest.newBuilder().setDeviceID(deviceID).addAllUsers(users).build();
    EnrollResponse response = userStub.enroll(request);
  }

  public void delete(int deviceID, List<String> userIDs) throws Exception {
    DeleteRequest request = DeleteRequest.newBuilder().setDeviceID(deviceID).addAllUserIDs(userIDs).build();
    DeleteResponse response = userStub.delete(request);
  }

  public void setFinger(int deviceID, List<UserFinger> userFingers) throws Exception {
    SetFingerRequest request = SetFingerRequest.newBuilder().setDeviceID(deviceID).addAllUserFingers(userFingers).build();
    SetFingerResponse response = userStub.setFinger(request);
  }
}
```

1. Create the ___UserSvc___. It makes the ___UserGrpc.UserBlockingStub___ internally.

    ```java
    UserSvc userSvc = new UserSvc(UserGrpc.newBlockingStub(client.getChannel())); 
    ```

2. Get the user list and detailed information.

    ```java
    // Get the user list
    List<UserHdr> userHdrs = userSvc.getList(deviceID);

    // Extract user IDs from the list
    List<String> userIDs = new ArrayList<String>();
    ListIterator<UserHdr> hdrIter = userHdrs.listIterator();

    while(hdrIter.hasNext()) {
      userIDs.add(hdrIter.next().getID());
    }

    // Get the user information with the user IDs
    List<UserInfo> userInfos = userSvc.getUser(deviceID, userIDs);
    ```

3. Enroll new users.

    ```java
    List<UserInfo> newUsers = new ArrayList<UserInfo>();
    List<String> newUserIDs = new ArrayList<String>();

    for(int i = 0; i < NUM_OF_NEW_USER; i++) {
      UserHdr hdr = UserHdr.newBuilder().setID(String.format("%d", (int)(Math.random() * Integer.MAX_VALUE))).build();
      newUsers.add(UserInfo.newBuilder().setHdr(hdr).build());
      newUserIDs.add(hdr.getID());
    }

    userSvc.enroll(deviceID, newUsers);
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```java
    List<UserFinger> userFingers = new ArrayList<UserFinger>();
    
    // Scan the first fingerprint
    byte[] firstTemplate = fingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD);

    // Scan the second fingerprint of the same finger
    byte[] secondTemplate = fingerSvc.scan(deviceID, TemplateFormat.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD);

    FingerData fingerData = FingerData.newBuilder().setIndex(0).setFlag(0).addTemplates(ByteString.copyFrom(firstTemplate)).addTemplates(ByteString.copyFrom(secondTemplate)).build();
    userFingers.add(UserFinger.newBuilder().setUserID(userID).addFingers(fingerData).build());

    userSvc.setFinger(deviceID, userFingers);
    ```

5. Delete new users.

    ```java
    userSvc.delete(deviceID, newUserIDs);
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```java
// An example class showing the usage of the Event API
public class EventSvc {
  private final EventGrpc.EventBlockingStub eventStub;
  private CancellableContext monitoringCtx;

  public EventSvc(EventGrpc.EventBlockingStub stub) {
    eventStub = stub;
    monitoringCtx = null;
  }

  public void setCancellableContext(CancellableContext ctx) {
    monitoringCtx = ctx;
  }

  public EventGrpc.EventBlockingStub getStub() {
    return eventStub;
  }

  public List<EventLog> getLog(int deviceID, int startEventID, int maxNumOfLog) throws Exception {
    GetLogRequest request = GetLogRequest.newBuilder().setDeviceID(deviceID).setStartEventID(startEventID).setMaxNumOfLog(maxNumOfLog).build();
    GetLogResponse response;

    response = eventStub.getLog(request);
    return response.getEventsList();
  } 

  public List<ImageLog> getImageLog(int deviceID, int startEventID, int maxNumOfLog) throws Exception {
    GetImageLogRequest request = GetImageLogRequest.newBuilder().setDeviceID(deviceID).setStartEventID(startEventID).setMaxNumOfLog(maxNumOfLog).build();
    GetImageLogResponse response;

    response = eventStub.getImageLog(request);
    return response.getImageEventsList();
  } 

  public void startMonitoring(int deviceID) throws Exception {
    EnableMonitoringRequest enableRequest = EnableMonitoringRequest.newBuilder().setDeviceID(deviceID).build();
    eventStub.enableMonitoring(enableRequest);

    new Thread(new EventMonitoring(this, deviceID)).start();
  }

  public void stopMonitoring(int deviceID) throws Exception {
    DisableMonitoringRequest disableRequest = DisableMonitoringRequest.newBuilder().setDeviceID(deviceID).build();
    eventStub.disableMonitoring(disableRequest);

    if(monitoringCtx != null) {
      monitoringCtx.cancel(null);
    }
  }
}
```

1. Create the ___EventSvc___. It makes the ___EventGrpc.EventBlockingStub___ internally.

    ```java
    EventSvc eventSvc = new EventSvc(EventGrpc.newBlockingStub(client.getChannel()));
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```java
    List<EventLog> events = eventSvc.getLog(deviceID, 0, MAX_NUM_OF_LOG);
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```java
    List<ImageLog> imageEvents = eventSvc.getImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG);

    if(imageEvents.size() > 0) {
      FileOutputStream jpgFile = new FileOutputStream(LOG_IMAGE_FILE);
      jpgFile.write(imageEvents.get(0).getJPGImage().toByteArray());
      jpgFile.close();      
    }
    ```

4. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```java
    // Enable monitoring of the device
    EnableMonitoringRequest enableRequest = EnableMonitoringRequest.newBuilder().setDeviceID(deviceID).build();
    eventStub.enableMonitoring(enableRequest);

    // Start monitoring thread for receiving events asynchronously
    eventSvc.startMonitoring(deviceID);
    ```

    ```java
    // A utility class for showing how to receive real-time events
    class EventMonitoring implements Runnable {
      private static final int MONITORING_QUEUE_SIZE = 8;

      private final EventSvc eventSvc;
      private final int deviceID;

      public EventMonitoring(EventSvc svc, int devID) {
        eventSvc = svc;
        deviceID = devID;
      }

      public void run() {
        CancellableContext monitoringCtx = Context.current().withCancellation();
        Context prevCtx = monitoringCtx.attach();

        eventSvc.setCancellableContext(monitoringCtx);

        try {
          SubscribeRealtimeLogRequest subscribeRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).addDeviceIDs(deviceID).build();
          Iterator<EventLog> eventStream = eventSvc.getStub().subscribeRealtimeLog(subscribeRequest);

          System.out.println("Start receiving real-time events");

          while(eventStream.hasNext()) {
            EventLog eventLog = eventStream.next();
            System.out.printf("Event: %s\n", eventLog);
          }
        } catch(Exception e) {
          System.out.printf("Monitoring error: %s\n", e);
        } finally {
          monitoringCtx.detach(prevCtx);
        }
      }
    }
    ```




