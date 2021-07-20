---
title: "iOS App"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Swift client library]({{'/swift/install/' | relative_url}})
3. Copy the root certificate of the device gateway to _gsdk-example/gsdk-example/ca.crt_.
4. Open _gsdk-example/gsdk-example.xcodeproj_ in Xcode.
5. Change the gateway and the device information in _gsdk-example/gsdk-example/ContentView.swift_ as needed.
   
    ```swift
    let gatewayAddr: String = "10.0.0.201"
    let gatewayPort: Int = 4002

    let deviceAddr: String = "192.168.0.110"
    let devicePort: Int32 = 51211
    let useSSL: Bool = false
    ```
  
6. Build and run the app in Xcode.

## 1. Overview

You can use the G-SDK services in the following steps.

1. Connect to the gateway and get a ___ClientConnection___.
   
    ```swift
    let builder: ClientConnection.Builder
    builder = ClientConnection.secure(group: group).withTLS(trustRoots: configuration.trustRoots!)

    let connection = builder.connect(host: gatewayAddr, port: gatewayPort)
    ```

2. Create a client such as ___Connect_ConnectClient___ using the connection. For the available services and functions, please refer to [the API reference]({{'/api/' | relative_url}}).
   
    ```swift
    var client: Connect_ConnectClient
    
    init(conn: ClientConnection) {
      self.client = Connect_ConnectClient(channel: conn)
    }
    ```

3. Call the functions of the service using the client. 
   
    ```swift
    let request = Connect_GetDeviceListRequest()
    let response = try client.getDeviceList(request).response.wait()
    ```

## 2. Connect to the device gateway

The first thing to do is to connect to the device gateway and get a ___ClientConnection___, which will be used for further communication. You have to know the address and port number of the gateway. And, you should also have the root certificate of the gateway for TLS/SSL communication. 

```swift
func setupTLS() -> ClientConnection? {
  do {
    //Step i: get certificate path from Bundle
    let certificatePath = Bundle.main.path(forResource: "ca", ofType: "crt")
    //Step ii: create TLS configuration
    var configuration = TLSConfiguration.forClient(applicationProtocols: ["h2"])
    configuration.trustRoots = .file(certificatePath!) //anchors the ca certificate to trust roots for TLS configuration. Not required incase of insecure communication with host
    //Step iii: generate SSL context
    let sslContext = try NIOSSLContext(configuration: configuration)
    let handler = try NIOSSLClientHandler(context: sslContext, serverHostname: gatewayAddr + "\(gatewayPort)")
    //Step iv: Create an event loop group
    let group = MultiThreadedEventLoopGroup(numberOfThreads: 1)
    //Step v: Create client connection builder
    let builder: ClientConnection.Builder
    builder = ClientConnection.secure(group: group).withTLS(trustRoots: configuration.trustRoots!)
    //Step vi: Start the connection and create the client
    let connection = builder.connect(host: gatewayAddr, port: gatewayPort)
    
    return connection
  }
}        
```

## 3. Connect to BioStar devices

There are three ways to manage the connections with BioStar devices. This example shows only the synchronous API. For the other APIs, refer to [the Connect API]({{'/api/connect/' | relative_url}}).

```swift
// An example class showing the usage of the Connect API
class ConnectSvc {
  var client: Connect_ConnectClient

  init(conn: ClientConnection) {
    self.client = Connect_ConnectClient(channel: conn)
  }

  func getDeviceList() -> [Connect_DeviceInfo]? {
    do {
      let request = Connect_GetDeviceListRequest()
      let response = try client.getDeviceList(request).response.wait()
      
      return response.deviceInfos
    }
  }

  func connect(connInfo: Connect_ConnectInfo) -> UInt32 {
    do {
      let request = Connect_ConnectRequest.with {
        $0.connectInfo = connInfo
      }
      let response = try client.connect(request).response.wait()
      
      return response.deviceID
    }
  }

  func disconnectAll() {
    do {
      let request = Connect_DisconnectAllRequest()
      try client.disconnectAll(request).response.wait()
    }
  }
}
```

1. Create the ___ConnectSvc___. It makes the ___Connect_ConnectClient___ internally.
   
    ```swift
    let connectSvc = ConnectSvc(conn: conn)
    ```

2. Connect to the specified device. As default, the device is not set to use SSL. To use SSL, you have to enable it first using [Connect.EnableSSL]({{'/api/connect/' | relative_url}}#enablessl). The returned device ID will be used for other APIs.
  
    ```swift
    var connInfo = Connect_ConnectInfo.with{
      $0.ipaddr = deviceAddr
      $0.port = devicePort
      $0.useSsl = useSSL
    }
    
    let deviceID = connectSvc.connect(connInfo: connInfo)
    ```

3. Get the devices, which are managed by the gateway.
   
    ```swift
    let devList = connectSvc.getDeviceList()
    ```

4. Disconnect the device.
   
    ```swift  
    connectSvc.disconnectAll()
    ```


## 4. Event

Using [the Event API]({{'/api/event/' | relative_url}}), you can read event logs stored in devices. You can also receive real-time events after enabling monitoring. 

```swift
// An example class showing the usage of the Event API
class EventSvc {
  var client: Event_EventClient
  
  init(conn: ClientConnection) {
    self.client = Event_EventClient(channel: conn)
  }
  
  func startMonitoring(deviceID: UInt32) {
    do {
      let request = Event_EnableMonitoringRequest.with{
        $0.deviceID = deviceID
      }
      try client.enableMonitoring(request).response.wait()
    }
  }

  func stopMonitoring(deviceID: UInt32) {
    do {
      let request = Event_DisableMonitoringRequest.with{
        $0.deviceID = deviceID
      }
      try client.disableMonitoring(request).response.wait()
    }
  }
  
  func subscribeRealtimeLog(deviceID: UInt32, callback: @escaping ((Event_EventLog) -> Bool)) {
    do {
      let request = Event_SubscribeRealtimeLogRequest.with{
        $0.queueSize = queueSize
        $0.deviceIds = [deviceID]
      }
      
      var call: ServerStreamingCall<Event_SubscribeRealtimeLogRequest, Event_EventLog>?
      call = client.subscribeRealtimeLog(request) { eventLog in
        let stop = callback(eventLog)
        if(stop) {
          call?.cancel(promise: nil)
        }
      }
      try call?.status.wait()
    }
  }
}
```

1. Create the ___EventSvc___. It makes the ___Event_EventClient___ internally.

    ```swift
    let eventSvc = EventSvc(conn: conn)
    ```

2. Enable event monitoring of the device and receive real-time events asynchronously. 

    ```swift
    eventSvc.startMonitoring(deviceID: deviceID)
    eventSvc.subscribeRealtimeLog(deviceID: deviceID, callback: view.eventCallback)
    eventSvc.stopMonitoring(deviceID: deviceID) 
    ```




