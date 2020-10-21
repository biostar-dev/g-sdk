---
title: "Thermal API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/thermal/test/ThermalTest.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String GATEWAY_CA_FILE = "cert/gateway/ca.crt";

    // the address of the gateway
    private static final String GATEWAY_ADDR = "192.168.0.2";
    private static final int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private static final String DEVICE_ADDR = "192.168.0.110"; 
    private static final int DEVICE_PORT = 51211;
    ```
6. Build.

    ```
    ./gradlew installDist
    ```
7. Run.
   
    ```
    ./build/install/java/bin/thermalTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```  

## 2. Test the thermal configuration

There are several options you can configure related to the thermal camera. The example shows how to configure some of these options and let you check the results.

  ```java
  // Set options for the test
  ThermalConfig newConfig = config.toBuilder().setAuditTemperature(true).setCheckMode(CheckMode.HARD).build();

  // (1) Set check order to AFTER_AUTH
  thermalSvc.setConfig(deviceID, newConfig.toBuilder().setCheckOrder(CheckOrder.AFTER_AUTH).build());

  System.out.printf("(1) The Check Order is set to AFTER_AUTH. The device will try to authenticate a user only when the user's temperature is within the threshold. Try to authenticate faces.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (2) Set check order to BEFORE_AUTH
  thermalSvc.setConfig(deviceID, newConfig.toBuilder().setCheckOrder(CheckOrder.BEFORE_AUTH).build());

  System.out.printf("(2) The Check Order is set to BEFORE_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");    

  // (3) Set check order to WITHOUT_AUTH
  thermalSvc.setConfig(deviceID, newConfig.toBuilder().setCheckOrder(CheckOrder.WITHOUT_AUTH).build());

  System.out.printf("(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");    

  // (4) Set check order to AFTER_AUTH with too low threshold
  thermalSvc.setConfig(deviceID, newConfig.toBuilder().setCheckOrder(CheckOrder.AFTER_AUTH).setTemperatureThreshold(3500).build());

  System.out.printf("(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");   
  ```

## 3. Get the temperature logs

If you set the [ThermalConfig.AuditTemperature]({{'/api/thermal' | relative_url}}#ThermalConfig) to true, the device will record the temperature of users in addition to other information. You can read these logs using [Thermal.GetTempeartureLog]({{'/api/thermal' | relative_url}}#gettemperaturelog).

  ```java
  List<TemperatureLog> events = thermalSvc.getTemperatureLog(deviceID, firstEventID, 0);
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```java
  CancellableContext monitoringCtx = Context.current().withCancellation();
  Context prevCtx = monitoringCtx.attach();

  eventSvc.setCancellableContext(monitoringCtx);

  SubscribeRealtimeLogRequest subscribeRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).addDeviceIDs(deviceID).build();
  Iterator<EventLog> eventStream = eventSvc.getStub().subscribeRealtimeLog(subscribeRequest);

  while(eventStream.hasNext()) {
    EventLog eventLog = eventStream.next();
    eventSvc.getEventCallback().handle(eventLog);
  }
  ```

