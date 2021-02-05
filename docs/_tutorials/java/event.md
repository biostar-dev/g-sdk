---
title: "Event API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/event/test/EventTest.java_ as needed.
   
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
    ./build/install/java/bin/eventTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Initialize the event code map

Since V1.3, the event code map, __event_code.json__, is provided. You can use it in your application for looking up the short descriptions of event codes.

  ```java
  public void initCodeMap(String filename) throws Exception {
    String jsonData = new String(Files.readAllBytes(Paths.get(filename)));

    Gson gson = new Gson();
    codeMap = gson.fromJson(jsonData, EventCodeMap.class);
  }

  public String getEventString(int eventCode, int subCode) {
    for(int i = 0; i < codeMap.getEntryLength(); i++) {
      if(eventCode == codeMap.getEntry(i).getEventCode() && subCode == codeMap.getEntry(i).getSubCode()) {
        return codeMap.getEntry(i).getDesc();
      }
    }

    return String.format("Unknown code(%#x)", eventCode | subCode);
  }

  eventSvc.initCodeMap(CODE_MAP_FILE);  
  ```

## 3. Receive realtime events

To receive realtime events from the devices, you have to do the followings.

1. [Enable monitoring]({{'/api/event' | relative_url}}#enablemonitoring) on target devices.
2. [Subscribe]({{'/api/event' | relative_url}}#subscriberealtimelog) to the event channel.
3. Read the events from the channel.

  ```java
  class EventMonitoring implements Runnable {
    public void run() {
      CancellableContext monitoringCtx = Context.current().withCancellation();
      Context prevCtx = monitoringCtx.attach();

      eventSvc.setCancellableContext(monitoringCtx);

      SubscribeRealtimeLogRequest subscribeRequest = SubscribeRealtimeLogRequest.newBuilder().setQueueSize(MONITORING_QUEUE_SIZE).addDeviceIDs(deviceID).build();
      Iterator<EventLog> eventStream = eventSvc.getStub().subscribeRealtimeLog(subscribeRequest);

      while(eventStream.hasNext()) {
        EventLog eventLog = eventStream.next();

        // do something with the event
      }
    }
  }

  EnableMonitoringRequest enableRequest = EnableMonitoringRequest.newBuilder().setDeviceID(deviceID).build();
  eventStub.enableMonitoring(enableRequest);

  new Thread(new EventMonitoring(this, deviceID)).start();  
  ```

## 4. Read event logs

When reading event logs, you can specify the starting index and the maximum number of events.

  ```java
  List<EventLog> events = eventSvc.getLog(deviceID, firstEventID, MAX_NUM_OF_EVENT);
  ListIterator<EventLog> eventIter = events.listIterator();

  while(eventIter.hasNext()) {
    EventLog event = eventIter.next();
    printEvent(event);
  }
  ```

You can also specify a filter to limit your search.

  ```java
  EventFilter filter = EventFilter.newBuilder().setEventCode(events.get(0).getEventCode()).build();

  events = eventSvc.getLogWithFilter(deviceID, firstEventID, MAX_NUM_OF_EVENT, filter);
  eventIter = events.listIterator();

  while(eventIter.hasNext()) {
    EventLog event = eventIter.next();
    printEvent(event);
  } 
  ```

