---
title: "Quick Start Guide for Device Gateway"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Kotlin client library]({{'/kotlin/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The quick start example uses Gradle for its project. You can change the _build.gradle.kts_ file as needed.
5. Change the gateway and the device information in _client/src/main/kotlin/com/supremainc/sdk/example/quick/QuickStart.kt_ as needed.
   
    ```kotlin
    const val GATEWAY_CA_FILE = "cert/gateway/ca.crt"
    const val GATEWAY_ADDR = "192.168.0.2"
    const val GATEWAY_PORT = 4000

    const val DEVICE_ADDR = "192.168.0.110"
    const val DEVICE_PORT = 51211
    const val DEVICE_USE_SSL = false
    ```
6. Build.

    ```
    ./gradlew :client:installDist
    ```
7. Run.
   
    ```
    ./client/build/install/client/bin/quick-start
    ```


## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the gateway and get a ___ManagedChannel___.
   
    ```kotlin
    val channel = NettyChannelBuilder.forAddress(GATEWAY_ADDR, GATEWAY_PORT)
    .sslContext(GrpcSslContexts.forClient().trustManager(File(GATEWAY_CA_FILE)).build())
    .build()
    ```

2. Create a coroutine stub such as ___ConnectGrpckt.ConnectCoroutineStub___ using the channel. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```kotlin
    val stub: ConnectCoroutineStub = ConnectCoroutineStub(channel)
    ```

3. Call the functions of the service using the stub. 
   
    ```kotlin
    var connInfo = ConnectInfo.newBuilder().setIPAddr(deviceAddr).setPort(devicePort).setUseSSL(useSSL).build()
    var request = ConnectRequest.newBuilder().setConnectInfo(connInfo).build()
    var response = stub.connect(request)
    ```

## 2. Connect to the device gateway

The first thing to do is to connect to the device gateway and get a ___ManagedChannel___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the root certificate of the gateway for TLS/SSL communication. 

```kotlin
  val channel = NettyChannelBuilder.forAddress(GATEWAY_ADDR, GATEWAY_PORT)
  .sslContext(GrpcSslContexts.forClient().trustManager(File(GATEWAY_CA_FILE)).build())
  .build()
```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect API]({{'/api/connect/' | relative_url}}).

```kotlin
// An example class showing the usage of the Connect API
class ConnectSvc(private val channel: ManagedChannel) {
  private val stub: ConnectCoroutineStub = ConnectCoroutineStub(channel)

  suspend fun getDeviceList(): List<DeviceInfo> {
    var request = GetDeviceListRequest.newBuilder().build()
    var response = stub.getDeviceList(request)

    return response.getDeviceInfosList()
  }

  suspend fun connect(connInfo: ConnectInfo): Int {
    var request = ConnectRequest.newBuilder().setConnectInfo(connInfo).build()
    var response = stub.connect(request)

    return response.getDeviceID()
  }

  suspend fun disconnectAll() {
    var request = DisconnectAllRequest.newBuilder().build()
    stub.disconnectAll(request)
  }
}
```

1. Create the ___ConnectSvc___. It makes the ___ConnectGrpcKt.ConnectCoroutineStub___ internally.
   
    ```kotlin
    val connectSvc = ConnectSvc(channel)
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [Connect.EnableSSL]({{'/api/connect/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```kotlin
    var connInfo = ConnectInfo.newBuilder().setIPAddr(deviceAddr).setPort(devicePort).setUseSSL(useSSL).build()
    var deviceID = connectSvc.connect(connInfo)  
    ```

3. Get the devices, which are managed by the gateway.
   
    ```kotlin
    var devList = connectSvc.getDeviceList() 
    ```

4. Disconnect the device.
   
    ```kotlin  
    connectSvc.disconnectAll()
    ```

## 4. Device

Using [the Device API]({{'/api/device/' | relative_url}}), you can get the information of the specified device. 

```kotlin
// An example class showing the usage of the Device API
class DeviceSvc(private val channel: ManagedChannel) {
  private val stub: DeviceCoroutineStub = DeviceCoroutineStub(channel)

  suspend fun getInfo(deviceID: Int): FactoryInfo {
    var request = GetInfoRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.getInfo(request)

    return response.getInfo()
  }

  suspend fun getCapabilityInfo(deviceID: Int): CapabilityInfo {
    var request = GetCapabilityInfoRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.getCapabilityInfo(request)

    return response.getCapInfo()
  }
}
```

1. Create the ___DeviceSvc___. It makes the ___DeviceGrpcKt.DeviceCoroutineStub___ internally.

    ```kotlin
    var deviceSvc = DeviceSvc(channel)
    ```

2. Get the version information of the device.

    ```kotlin
    var factoryInfo = deviceSvc.getInfo(deviceID)
    ```

3. Get the capability information of the device. Each device type has its own capability. For example, [CapabilityInfo.faceSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) will be true only for FaceStation 2 and FaceLite.

    ```kotlin
    var capInfo = deviceSvc.getCapabilityInfo(deviceID)
    ```

## 5. Fingerprint

Using [the Finger API]({{'/api/finger/' | relative_url}}), you can scan a fingerprint, get the last-scanned image, and configure the fingerprint options.

```kotlin
// An example class showing the usage of the Finger API
class FingerSvc(private val channel: ManagedChannel) {
  private val stub: FingerCoroutineStub = FingerCoroutineStub(channel)

  suspend fun scan(deviceID: Int, templateFormat: TemplateFormat, qualityThreshold: Int): ByteString {
    var request = ScanRequest.newBuilder().setDeviceID(deviceID).setTemplateFormat(templateFormat).setQualityThreshold(qualityThreshold).build()
    var response = stub.scan(request)

    return response.getTemplateData()
  } 

  suspend fun getImage(deviceID: Int): ByteString {
    var request = GetImageRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.getImage(request)

    return response.getBMPImage()
  } 

  suspend fun getConfig(deviceID: Int): FingerConfig {
    var request = GetConfigRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.getConfig(request)

    return response.getConfig()
  }
}
```

1. Create the ___FingerSvc___. It makes the ___FingerGrpcKt.FingerCoroutineStub___ internally.
 
    ```kotlin
    var fingerSvc = FingerSvc(channel)
    ```

2. Scan a fingerprint on the device and get the template data. You can assign this template to a user using [User.SetFinger]({{'/api/user/' | relative_url }}#setfinger).
   
    ```kotlin
    var templateData = fingerSvc.scan(deviceID, fingerConfig.getTemplateFormat(), QUALITY_THRESHOLD);
    ```

3. Get the scanned fingerprint image and save it to a BMP file.

    ```kotlin
    var bmpImage = fingerSvc.getImage(deviceID).toByteArray()
    var bmpFile = FileOutputStream(FINGERPRINT_IMAGE_NAME)
    bmpFile.write(bmpImage)
    bmpFile.close()
    ```    

4. Get the fingerprint configuration. To change some of its options, call [Finger.SetConfig]({{'/api/finger/' | relative_url }}#setconfig).

    ```kotlin
    var fingerConfig = fingerSvc.getConfig(deviceID)
    ```

## 6. Card

Using [the Card API]({{'/api/card/' | relative_url}}), you can scan/write cards, manage the blacklist, and configure the card options.

```kotlin
// An example class showing the usage of the Card API
class CardSvc(private val channel: ManagedChannel) {
  private val stub: CardCoroutineStub = CardCoroutineStub(channel)

  suspend fun scan(deviceID: Int): CardData {
    var request = ScanRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.scan(request)

    return response.getCardData()
  } 

  suspend fun getBlacklist(deviceID: Int): List<BlacklistItem> {
    var request = GetBlacklistRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.getBlacklist(request)

    return response.getBlacklistList()
  } 

  suspend fun addBlacklist(deviceID: Int, cardInfos: List<BlacklistItem>) {
    var request = AddBlacklistRequest.newBuilder().setDeviceID(deviceID).addAllCardInfos(cardInfos).build()
    stub.addBlacklist(request)
  } 

  suspend fun deleteBlacklist(deviceID: Int, cardInfos: List<BlacklistItem>) {
    var request = DeleteBlacklistRequest.newBuilder().setDeviceID(deviceID).addAllCardInfos(cardInfos).build()
    stub.deleteBlacklist(request)
  } 
}
```

1. Create the ___CardSvc___. It makes the ___CardGrpcKt.CardCoroutineStub___ internally.

    ```kotlin
    var cardSvc = CardSvc(channel)
    ```

2. Scan a card.

    ```kotlin
    var cardData = cardSvc.scan(deviceID)
    ```

3. BioStar devices manage a blacklist to disable disqualified cards. You can get/add/delete blacklisted cards.

    ```kotlin
    // Get the current blacklist
    var blacklist = cardSvc.getBlacklist(deviceID)

    // Add new items into the blacklist
    var newBlacklist = ArrayList<BlacklistItem>()
    for(i in 0..NUM_OF_BLACKLIST_ITEM - 1) {
      var item = BlacklistItem.newBuilder().setCardID(ByteString.copyFromUtf8((FIRST_BLACKLISTED_CARD_ID + i).toString())).setIssueCount(ISSUE_COUNT).build()
      newBlacklist.add(item)
    }

    cardSvc.addBlacklist(deviceID, newBlacklist)    
    ```

## 7. User

Using [the User API]({{'/api/user/' | relative_url}}), you can get/enroll/delete users. You can also set fingerprints/cards/groups to users. 

```kotlin
// An example class showing the usage of the User API
class UserSvc(private val channel: ManagedChannel) {
  private val stub: UserCoroutineStub = UserCoroutineStub(channel)

  suspend fun getList(deviceID: Int): List<UserHdr> {
    var request = GetListRequest.newBuilder().setDeviceID(deviceID).build()
    var response = stub.getList(request)

    return response.getHdrsList()
  } 

  suspend fun getUser(deviceID: Int, userIDs: List<String>): List<UserInfo> {
    var request = GetRequest.newBuilder().setDeviceID(deviceID).addAllUserIDs(userIDs).build()
    var response = stub.get(request)

    return response.getUsersList()
  } 

  suspend fun enroll(deviceID: Int, users: List<UserInfo>) {
    var request = EnrollRequest.newBuilder().setDeviceID(deviceID).addAllUsers(users).build()
    stub.enroll(request)
  } 

  suspend fun delete(deviceID: Int, userIDs: List<String>) {
    var request = DeleteRequest.newBuilder().setDeviceID(deviceID).addAllUserIDs(userIDs).build()
    stub.delete(request)
  } 

  suspend fun setFinger(deviceID: Int, userFingers: List<UserFinger>) {
    var request = SetFingerRequest.newBuilder().setDeviceID(deviceID).addAllUserFingers(userFingers).build()
    stub.setFinger(request)
  } 
}
```

1. Create the ___UserSvc___. It makes the ___UserGrpcKt.UserCoroutineStub___ internally.

    ```kotlin
    var userSvc = UserSvc(channel) 
    ```

2. Get the user list and detailed information.

    ```kotlin
    // Get the user list
    var userHdrs = userSvc.getList(deviceID)

    // Extract user IDs from the list
    var userIDs = ArrayList<String>()
    var hdrIter = userHdrs.listIterator()
    while(hdrIter.hasNext()) {
      userIDs.add(hdrIter.next().getID())
    }

    // Get the user information with the user IDs
    var userInfos = userSvc.getUser(deviceID, userIDs)
    ```

3. Enroll new users.

    ```kotlin
    var newUsers = ArrayList<UserInfo>()
    var newUserIDs = ArrayList<String>()

    for(i in 0..NUM_OF_NEW_USER - 1) {
      var hdr = UserHdr.newBuilder().setID(String.format("%d", (Math.random() * Int.MAX_VALUE).toInt())).build()
      newUsers.add(UserInfo.newBuilder().setHdr(hdr).build())
      newUserIDs.add(hdr.getID())
    }

    userSvc.enroll(deviceID, newUsers)
    ```

4. Set fingerprints to users. You can also set cards, access groups, and job codes in similar fashion. 

    ```kotlin
    var userFingers = ArrayList<UserFinger>()
    var templateData = ArrayList<ByteString>()
    
    // Scan the first fingerprint
    templateData.add(fingerSvc.scan(deviceID, fingerConfig.getTemplateFormat(), QUALITY_THRESHOLD))

    // Scan the second fingerprint of the same finger
    templateData.add(fingerSvc.scan(deviceID, fingerConfig.getTemplateFormat(), QUALITY_THRESHOLD))

    var fingerData = FingerData.newBuilder().setIndex(0).setFlag(0).addAllTemplates(templateData).build()
    userFingers.add(UserFinger.newBuilder().setUserID(userID).addFingers(fingerData).build())

    userSvc.setFinger(deviceID, userFingers)
    ```

5. Delete new users.

    ```kotlin
    userSvc.delete(deviceID, newUserIDs)
    ```

## 8. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```kotlin
// An example class showing the usage of the Event API
class EventSvc(private val channel: ManagedChannel) {
  private val stub: EventCoroutineStub = EventCoroutineStub(channel)

  suspend fun getLog(deviceID: Int, startEventID: Int, maxNumOfLog: Int): List<EventLog> {
    var request = GetLogRequest.newBuilder().setDeviceID(deviceID).setStartEventID(startEventID).setMaxNumOfLog(maxNumOfLog).build()
    var response = stub.getLog(request)

    return response.getEventsList()
  }

  suspend fun getImageLog(deviceID: Int, startEventID: Int, maxNumOfLog: Int): List<ImageLog> {
    var request = GetImageLogRequest.newBuilder().setDeviceID(deviceID).setStartEventID(startEventID).setMaxNumOfLog(maxNumOfLog).build()
    var response = stub.getImageLog(request)

    return response.getImageEventsList()
  }

  suspend fun startMonitoring(deviceID: Int) {
    var request = EnableMonitoringRequest.newBuilder().setDeviceID(deviceID).build()
    stub.enableMonitoring(request)
  }

  suspend fun subscribeRealtimeLog(deviceID: Int, callback: (EventLog) -> Unit) {
    var numOfEvent = 0

    var subRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(QUEUE_SIZE).addDeviceIDs(deviceID).build()
    stub.subscribeRealtimeLog(subRequest).collect { eventLog ->
      callback(eventLog)
    }
  }

  suspend fun stopMonitoring(deviceID: Int) {
    var request = DisableMonitoringRequest.newBuilder().setDeviceID(deviceID).build()
    stub.disableMonitoring(request)
  }
}
```

1. Create the ___EventSvc___. It makes the ___EventGrpcKt.EventCoroutineStub___ internally.

    ```kotlin
    var eventSvc = EventSvc(channel)
    ```

2. Get event logs. You can specify the first ID and the maximum number of events to be returned. 

    ```kotlin
    var events = eventSvc.getLog(deviceID, 0, MAX_NUM_OF_LOG)
    ```

3. Get image logs in JPG format. Only the devices with the [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) can store image logs. You can also specify the event types to save image logs using [Event.SetImageFilter]({{'/api/event/' | relative_url }}#setimagefilter).

    ```kotlin
    if(imageLogSupported) {
      var imageEvents = eventSvc.getImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG)

      if(imageEvents.size > 0) {
        var jpgFile = FileOutputStream(LOG_IMAGE_FILE)
        jpgFile.write(imageEvents.get(0).getJPGImage().toByteArray())
        jpgFile.close()
      }
    }
    ```

4. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```kotlin
    // Enable monitoring of the device
    eventSvc.startMonitoring(deviceID)

    // Launch the monitoring job
    monitoringJob = launch {
      eventSvc.subscribeRealtimeLog(deviceID, ::eventCallback)
    }

    suspend fun subscribeRealtimeLog(deviceID: Int, callback: (EventLog) -> Unit) {
      var numOfEvent = 0

      var subRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(QUEUE_SIZE).addDeviceIDs(deviceID).build()
      stub.subscribeRealtimeLog(subRequest).collect { eventLog ->
        callback(eventLog)
      }
    }    
    ```




