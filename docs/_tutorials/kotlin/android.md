---
title: "Android App"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Kotlin client library]({{'/kotlin/install/' | relative_url}})
3. Copy the root certificate of the device gateway to _android/src/main/res/raw/ca_cert_.
4. The Android example uses Gradle for its project. You can change the _build.gradle.kts_ file as needed.
5. Change the gateway and the device information in _android/src/main/kotlin/com/supremainc/sdk/example/android/MainActivity.kt_ as needed.
   
    ```kotlin
    const val GATEWAY_ADDR = "10.0.0.201" 
    const val GATEWAY_PORT = 4002

    const val DEVICE_ADDR = "192.168.0.110"
    const val DEVICE_PORT = 51211
    const val DEVICE_USE_SSL = false
    ```
6. Set up an Android device for USB debugging.
7. Build the app and install it on the device.
    ```
    ./gradlew :android:installDebug
    ```
8. Run the app from your device.
   * Launch the G-SDK Kotlin Android app.
   * Press Connect to start the test.   

## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the gateway and get a ___ManagedChannel___.
   
    ```kotlin
    val channel = OkHttpChannelBuilder.forAddress(GATEWAY_ADDR, GATEWAY_PORT)
            .sslSocketFactory(getSslSocketFactory(getResources().openRawResource(R.raw.ca_cert)))
            .executor(Dispatchers.Default.asExecutor()).build()
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
private var channel: ManagedChannel? = null

channel = OkHttpChannelBuilder.forAddress(GATEWAY_ADDR, GATEWAY_PORT)
        .sslSocketFactory(getSslSocketFactory(getResources().openRawResource(R.raw.ca_cert)))
        .executor(Dispatchers.Default.asExecutor()).build()

private fun getSslSocketFactory(rootCa: InputStream?): SSLSocketFactory {
  if (rootCa == null) {
    return SSLSocketFactory.getDefault() as SSLSocketFactory
  }

  val context = SSLContext.getInstance("TLS")
  context.init(null, getTrustManagers(rootCa), null)
  return context.getSocketFactory()
}

private fun getTrustManagers(rootCa: InputStream): Array<TrustManager> {
  val ks = KeyStore.getInstance(KeyStore.getDefaultType())
  ks.load(null)
  val cf = CertificateFactory.getInstance("X.509")
  val cert = cf.generateCertificate(rootCa) as X509Certificate
  val principal = cert.getSubjectX500Principal()
  ks.setCertificateEntry(principal.getName("RFC2253"), cert)
  // Set up trust manager factory to use our key store.
  val trustManagerFactory = TrustManagerFactory.getInstance(TrustManagerFactory.getDefaultAlgorithm())
  trustManagerFactory.init(ks)
  return trustManagerFactory.getTrustManagers()
}          
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
    private var connectSvc: ConnectSvc? = null

    connectSvc = ConnectSvc(channel!!)
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [Connect.EnableSSL]({{'/api/connect/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```kotlin
    var connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build()
    var deviceID = connectSvc?.connect(connInfo)
    ```

3. Get the devices, which are managed by the gateway.
   
    ```kotlin
    var devList = connectSvc?.getDeviceList()
    ```

4. Disconnect the device.
   
    ```kotlin  
    connectSvc?.disconnectAll()
    ```


## 4. Event

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
    private var eventSvc: EventSvc? = null

    eventSvc = EventSvc(channel!!)
    ```

2. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```kotlin
    // Enable monitoring of the device
    eventSvc?.startMonitoring(deviceID)

    // Launch the monitoring job
    monitoringJob = launch{
        eventSvc?.subscribeRealtimeLog(deviceID, ::eventCallback)
    }

    suspend fun subscribeRealtimeLog(deviceID: Int, callback: (EventLog) -> Unit) {
      var numOfEvent = 0

      var subRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(QUEUE_SIZE).addDeviceIDs(deviceID).build()
      stub.subscribeRealtimeLog(subRequest).collect { eventLog ->
        callback(eventLog)
      }
    }    
    ```




