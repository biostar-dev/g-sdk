---
title: "T&A API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/tna/test/TNATest.java_ as needed.
   
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
    ./build/install/java/bin/tnaTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Test the T&A configuration

There are several options you can configure related to the T&A functions. The example shows how to configure some of these options and let you check the results.

  ```java
  // (1) BY_USER
  String[] labels = {"In", "Out", "Scheduled In", "Fixed Out"};
  TNAConfig newConfig = TNAConfig.newBuilder().setMode(Mode.BY_USER).addAllLabels(Arrays.asList(labels)).build();
  tnaSvc.setConfig(deviceID, newConfig);

  System.out.printf("(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (2) IsRequired
  tnaSvc.setConfig(deviceID, newConfig.toBuilder().setIsRequired(true).build());

  System.out.printf("(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (3) LAST_CHOICE
  tnaSvc.setConfig(deviceID, newConfig.toBuilder().setMode(Mode.LAST_CHOICE).build());

  System.out.printf("(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (4) BY_SCHEDULE
  Integer[] scheduleIDs = { 0, 0, 1 }; // Always for KEY_3(Scheduled_In)
  tnaSvc.setConfig(deviceID, newConfig.toBuilder().setMode(Mode.BY_SCHEDULE).addAllSchedules(Arrays.asList(scheduleIDs)).build());

  System.out.printf("(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (5) FIXED
  tnaSvc.setConfig(deviceID, newConfig.toBuilder().setMode(Mode.FIXED).setKey(Key.KEY_4).build());

  System.out.printf("(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key.\n\n");
  KeyInput.pressEnter(">> Press ENTER if you finish testing this mode.\n");    
  ```

## 3. Get the T&A logs

You can read the log records with T&A key information using [TNA.GetTNALog]({{'/api/tna' | relative_url}}#gettnalog). To get the label of the key, you have to look up the [TNAConfig.labels]({{'/api/tna' | relative_url}}#TNAConfig).

  ```java
  List<TNALog> events = tnaSvc.getTNALog(deviceID, firstEventID, 0);

  // ...

  public String getTNALabel(Key key, TNAConfig config) {
    if(config.getLabelsCount() > key.getNumber() - 1) {
      return String.format("%s(%s)", config.getLabels(key.getNumber() - 1), key);
    } else {
      return String.format("%s", key);
    }
  }
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

