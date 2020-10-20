---
title: "Quick Start Guide for Master Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the Python client library]({{'/python/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. Change the server and the device information in _example/quick/quick.py_ as needed.
   
    ```python
    # the path of the root certificate
    MASTER_CA_FILE = "../../../cert/master/ca.crt"

    # the address of the master gateway
    MASTER_IP = "192.168.0.2"
    MASTER_PORT = 4010

    # the paths of the administrator certificate and its key    
    ADMIN_CERT_FILE = "../../../cert/master/admin.crt"
    ADMIN_KEY_FILE = "../../../cert/master/admin_key.pem"

    # the paths of the tenant certificate and its key    
    TENANT_CERT_FILE = "../../../cert/master/tenant1.crt"
    TENANT_KEY_FILE = "../../../cert/master/tenant1_key.pem"  

    # the following values should be same as the IDs in the corresponding certificates
    TENANT_ID = "tenant1"
    GATEWAY_ID = "gateway1"    

    # the ip address of the target device
    DEVICE_IP = '192.168.0.110'
    DEVICE_PORT = 51211
    USE_SSL = False
    ```
6. Run.
   
    ```
    cd example/quick
    python quick.py -m
    ```

    To initialize the database, you have to run with __-mi__ option once. See _initMasterGateway()_ for initializing the database.
    {: .notice--info}    

## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the gateway and get a ___grpc.secure_channel___.
   
    ```python
    jwtCreds = JwtCredential()

    sslCreds = grpc.ssl_channel_credentials(ca.read(), key.read(), cert.read())
    callCreds = grpc.metadata_call_credentials(jwtCreds)
    channel = grpc.secure_channel("{}:{}".format(ipAddr, port), grpc.composite_channel_credentials(sslCreds, callCreds))
    ```

2. Login to the master gateway and get a JWT token for further communication.
    ```python
    stub = login_pb2_grpc.LoginStub(channel)

    cert = open(tenantCertFile, 'rb')
    response = stub.Login(login_pb2.LoginRequest(tenantCert=cert.read()))
    jwtCreds.setToken(response.jwtToken)
    ```

3. Create a service stub such as ___connect_master_pb2_grpc.ConnectMasterStub___ using the channel. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```python
    stub = connect_master_pb2_grpc.ConnectMasterStub(channel)
    ```

4. Call the functions of the service using the stub. 
   
    ```python
    response = stub.Connect(connect_master_pb2.ConnectRequest(gatewayID=gatewayID, connectInfo=connInfo))    
    ```

The classes in _example_ are written for showing the usage of the corresponding APIs. In your applications, you don't have to use these sample classes.
{: .notice--warning}


## 2. Connect to the master gateway

The first thing to do is to connect to the master gateway and get a ___grpc.secure_channel___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the following certificates.

* The root CA certificate of the master gateway
* The client certificate of a tenant and its key file
* For administrative tasks such as creating tenants, the client certificate of an administrator and its key file

```python
# An example class encapsulating communication with the master gateway
JWT_TOKEN_KEY = 'token'

class JwtCredential(grpc.AuthMetadataPlugin):
  token = None

  def setToken(self, jwtToken):
    self.token = jwtToken

  def __call__(self, context, callback):
      callback(((JWT_TOKEN_KEY, self.token),), None)

class MasterClient:
  channel = None
  jwtCreds = None

  def __init__(self, ipAddr, port, caFile, certFile, keyFile):
    with open(caFile, 'rb') as ca, open(certFile, 'rb') as cert, open(keyFile, 'rb') as key:
      self.jwtCreds = JwtCredential()

      sslCreds = grpc.ssl_channel_credentials(ca.read(), key.read(), cert.read())
      callCreds = grpc.metadata_call_credentials(self.jwtCreds)
      self.channel = grpc.secure_channel("{}:{}".format(ipAddr, port), grpc.composite_channel_credentials(sslCreds, callCreds))

  def getChannel(self):
    return self.channel

  def setToken(self, jwtToken):
    self.jwtCreds.setToken(jwtToken)

ADMIN_TENANT_ID = "administrator"

class LoginSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = login_pb2_grpc.LoginStub(channel)

  def login(self, tenantCertFile):
    with open(tenantCertFile, 'rb') as cert:
      response = self.stub.Login(login_pb2.LoginRequest(tenantCert=cert.read()))
      return response.jwtToken

  def loginAdmin(self, adminCertFile):
    with open(adminCertFile, 'rb') as cert:
      response = self.stub.LoginAdmin(login_pb2.LoginAdminRequest(adminTenantCert=cert.read(), tenantID=ADMIN_TENANT_ID))
      return response.jwtToken
```

1. Create the ___MasterClient___ and connect to the gateway.

    ```python
    client = MasterClient(MASTER_IP, MASTER_PORT, MASTER_CA_FILE, TENANT_CERT_FILE, TENANT_KEY_FILE)
    channel = client.getChannel()
    ```

2. Login to the master gateway.

    ```python
    loginSvc = LoginSvc(channel)
    jwtToken = loginSvc.login(TENANT_CERT_FILE)

    client.setToken(jwtToken)    
    ```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) and [the tutorial]({{'/python/connectMaster/' | relative_url}}).

```python
# An example class showing the usage of the Connect Master API
class ConnectMasterSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = connect_master_pb2_grpc.ConnectMasterStub(channel)

  def getDeviceList(self, gatewayID):
    response = self.stub.GetDeviceList(connect_master_pb2.GetDeviceListRequest(gatewayID=gatewayID))
    return response.deviceInfos

  def connect(self, gatewayID, connInfo):
    response = self.stub.Connect(connect_master_pb2.ConnectRequest(gatewayID=gatewayID, connectInfo=connInfo))
    return response.deviceID

  def disconnect(self, deviceIDs):
    self.stub.Disconnect(connect_master_pb2.DisconnectRequest(deviceIDs=deviceIDs))
```

1. Create the ___ConnectMasterSvc___. It makes the ___connect_master_pb2_grpc.ConnectMasterStub___ internally.
   
    ```python
    connectMasterSvc = ConnectMasterSvc(channel)
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [ConnectMaster.EnableSSL]({{'/api/connectMaster/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```python
    devID = connectMasterSvc.connect(gatewayID, connInfo)
    ```

3. Get the devices, which are managed by the gateway.
   
    ```python
    devList = connectMasterSvc.getDeviceList(gatewayID) 
    ```

4. Disconnect the device.
   
    ```python  
    deviceIDs = [devID]
    connectMasterSvc.disconnect(deviceIDs)
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```python
# An example class showing the usage of the Device API
class DeviceSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = device_pb2_grpc.DeviceStub(channel)

  def getInfo(self, deviceID):
    response = self.stub.GetInfo(device_pb2.GetInfoRequest(deviceID=deviceID))
    return response.info

  def getCapInfo(self, deviceID):
    response = self.stub.GetCapabilityInfo(device_pb2.GetCapabilityInfoRequest(deviceID=deviceID))
    return response.capInfo
```

1. Create the ___DeviceSvc___. It makes the ___device_pb2_grpc.DeviceStub___ internally.

    ```python
    deviceSvc = DeviceSvc(channel)
    ```
2. Get the version information of the device.

    ```python
    info = deviceSvc.getInfo(deviceID)
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```python
    capInfo = deviceSvc.getCapInfo(deviceID)

    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```python
# An example class showing the usage of the Finger API

class FingerSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = finger_pb2_grpc.FingerStub(channel)

  def scan(self, deviceID, templateFormat, qualityThreshold):
    response = self.stub.Scan(finger_pb2.ScanRequest(deviceID=deviceID, templateFormat=templateFormat, qualityThreshold=qualityThreshold))
    return response.templateData

  def getImage(self, deviceID):
    response = self.stub.GetImage(finger_pb2.GetImageRequest(deviceID=deviceID))
    return response.BMPImage

  def getConfig(self, deviceID):
    response = self.stub.GetConfig(finger_pb2.GetImageRequest(deviceID=deviceID))
    return response.config
```

1. Create the ___FingerSvc___. It makes the ___finger_pb2_grpc.FingerStub___ internally.
 
    ```python
    fingerSvc = FingerSvc(channel) 
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```python
    templateData = fingerSvc.scan(deviceID, finger_pb2.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD)
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```python
    fingerImage = fingerSvc.getImage(deviceID)
    f = open(IMAGE_FILENAME, 'wb')
    f.write(fingerImage)
    f.close()
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```python
    fingerConfig = fingerSvc.getConfig(deviceID)
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```python
# An example class showing the usage of the Card API
class CardSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = card_pb2_grpc.CardStub(channel)

  def scan(self, deviceID):
    response = self.stub.Scan(card_pb2.ScanRequest(deviceID=deviceID))
    return response.cardData

  def getBlacklist(self, deviceID):
    response = self.stub.GetBlacklist(card_pb2.GetBlacklistRequest(deviceID=deviceID))
    return response.blacklist

  def addBlacklist(self, deviceID, cardInfos):
    self.stub.AddBlacklist(card_pb2.AddBlacklistRequest(deviceID=deviceID, cardInfos=cardInfos))

  def deleteBlacklist(self, deviceID, cardInfos):
    self.stub.DeleteBlacklist(card_pb2.DeleteBlacklistRequest(deviceID=deviceID, cardInfos=cardInfos))
}
```

1. Create the ___CardSvc___. It makes the ___card_pb2_grpc.CardStub___ internally.

    ```python
    cardSvc = CardSvc(channel)
    ```

2. Scan a card.

    ```python
    cardData = cardSvc.scan(deviceID)
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```python
    # Get the current blacklist
    blacklist = cardSvc.getBlacklist(deviceID)

    # Add new items into the blacklist
    cardInfos = []

    for i in range(0, NUM_OF_NEW_BLACKLIST):
      buf = str(FIRST_BLACKLISTED_CARD_ID + i).encode()
      cardInfo = card_pb2.BlacklistItem(cardID=buf, issueCount=ISSUE_COUNT)
      cardInfos.append(cardInfo)

    cardSvc.addBlacklist(deviceID, cardInfos)
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```python
# An example class showing the usage of the User API
class UserSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = user_pb2_grpc.UserStub(channel)

  def getList(self, deviceID):
    response = self.stub.GetList(user_pb2.GetListRequest(deviceID=deviceID))
    return response.hdrs

  def getUser(self, deviceID, userIDs):
    response = self.stub.Get(user_pb2.GetRequest(deviceID=deviceID, userIDs=userIDs))
    return response.users    

  def enroll(self, deviceID, users, overwrite):
    self.stub.Enroll(user_pb2.EnrollRequest(deviceID=deviceID, users=users, overwrite=overwrite))

  def delete(self, deviceID, userIDs):
    self.stub.Delete(user_pb2.DeleteRequest(deviceID=deviceID, userIDs=userIDs))

  def setFinger(self, deviceID, userFingers):
    self.stub.SetFinger(user_pb2.SetFingerRequest(deviceID=deviceID, userFingers=userFingers))
```

1. Create the ___UserSvc___. It makes the ___user_pb2_grpc.UserStub___ internally.

    ```python
    userSvc = UserSvc(channel) 
    ```

2. Get the user list and detailed information.

    ```python
    # Get the user list
    userList = userSvc.getList(deviceID)

    # Extract user IDs from the list
    userIDs = []
    for user in userList:
      userIDs.append(user.ID)

    # Get the user information with the user IDs
    userInfos = userSvc.getUser(deviceID, userIDs)
    ```

3. Enroll new users.

    ```python
    userInfos = []

    for i in range(0, NUM_OF_NEW_USER):
      userHdr = user_pb2.UserHdr(ID=str(START_USER_ID + i))
      userInfo = user_pb2.UserInfo(hdr=userHdr)

      userInfos.append(userInfo)

    userSvc.enroll(deviceID, userInfos, True)
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```python
    # Scan the first fingerprint
    templateData1 = fingerSvc.scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD)

    # Scan the second fingerprint of the same finger
    templateData2 = fingerSvc.scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD)

    fingerData = finger_pb2.FingerData(templates=[templateData1, templateData2])
    userFingers = [user_pb2.UserFinger(userID=userID, fingers=[fingerData])]

    userSvc.setFinger(deviceID, userFingers)
    ```

5. Delete new users.

    ```python
    userSvc.delete(deviceID, newUserIDs)
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```python
# An example class showing the usage of the Event API
class EventSvc:
  stub = None

  def __init__(self, channel): 
    self.stub = event_pb2_grpc.EventStub(channel)

  def getLog(self, deviceID, startEventID, maxNumOfLog):
    response = self.stub.GetLog(event_pb2.GetLogRequest(deviceID=deviceID, startEventID=startEventID, maxNumOfLog=maxNumOfLog))
    return response.events

  def getImageLog(self, deviceID, startEventID, maxNumOfLog):
    response = self.stub.GetImageLog(event_pb2.GetImageLogRequest(deviceID=deviceID, startEventID=startEventID, maxNumOfLog=maxNumOfLog))
    return response.imageEvents

  def enableMonitoring(self, deviceID):
    self.stub.EnableMonitoring(event_pb2.EnableMonitoringRequest(deviceID=deviceID))

  def disableMonitoring(self, deviceID):
    self.stub.DisableMonitoring(event_pb2.DisableMonitoringRequest(deviceID=deviceID))

  def subscribe(self, queueSize): 
    return self.stub.SubscribeRealtimeLog(event_pb2.SubscribeRealtimeLogRequest(queueSize=queueSize))
```

1. Create the ___EventSvc___. It makes the ___event_pb2_grpc.EventStub___ internally.

    ```python
    eventSvc = EventSvc(channel)
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```python
    events = eventSvc.getLog(deviceID, 0, MAX_NUM_OF_LOG)
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```python
    imageEvents = eventSvc.getImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG)

    if len(imageEvents) > 0:
      f = open(LOG_IMAGE_NAME, 'wb')
      f.write(imageEvents[0].JPGImage)
      f.close()
    ```

4. Enable event monitoring of the device and receive real-time events. 

    ```python
    # Enable monitoring of the device
    eventSvc.enableMonitoring(deviceID)

    # Start receiving events from the subscription channel
    eventCh = eventSvc.subscribe(QUEUE_SIZE)

    for event in eventCh:
      print(f'Event: {event}', flush=True)    
    ```

5. Stop monitoring.

    ```python
    eventCh.cancel()
    eventSvc.disableMonitoring(deviceID)
    ```


