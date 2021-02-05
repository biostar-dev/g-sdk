---
title: "Event API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/event/test/main.cpp_ as needed.
   
    ```cpp
    // the path of the root certificate
    const std::string GATEWAY_CA_FILE = "../cert/gateway/ca.crt";

    // the address of the gateway
    const std::string GATEWAY_ADDR = "192.168.0.2";
    const int GATEWAY_PORT = 4000;
    
    // the ip address of the target device
    const std::string DEVICE_IP = "192.168.0.110";
    const int DEVICE_PORT = 51211;
    const bool USE_SSL = false;
    ```
6. Build and run.
 
    * Windows
    
      ```
      cmake .
      ```

      Open _testEvent.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testEvent
      ```

    * Linux

      ```
      cmake .
      make testEvent
      ./testEvent
      ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```cpp
  auto gatewayClient = std::make_shared<GatewayClient>();
  gatewayClient->Connect(GATEWAY_ADDR, GATEWAY_PORT, GATEWAY_CA_FILE);

  ConnectSvc connectSvc(gatewayClient->GetChannel());

  ConnectInfo connInfo;
  connInfo.set_ipaddr(DEVICE_IP);
  connInfo.set_port(DEVICE_PORT);
  connInfo.set_usessl(USE_SSL);

  uint32_t deviceID = 0;
  connectSvc.Connect(connInfo, &deviceID);
  ```  

## 2. Initialize the event code map

Since V1.3, the event code map, __event_code.json__, is provided. You can use it in your application for looking up the short descriptions of event codes.

  ```cpp
  #include <nlohmann/json.hpp>

  json codeMap_;

  void EventSvc::InitCodeMap(std::string filename) {
    std::ifstream mapFile(filename);
    mapFile >> codeMap_;
  }

  std::string EventSvc::GetEventString(uint32_t eventCode, uint32_t subCode) {
    char buf[256];

    for(int i = 0; i < codeMap_["entries"].size(); i++) {
      if(eventCode == codeMap_["entries"].at(i)["event_code"] && subCode == codeMap_["entries"].at(i)["sub_code"]) {
        return codeMap_["entries"].at(i)["desc"];
      }
    }

    sprintf(buf, "Unknown code(%#x)", eventCode | subCode);
    return buf;
  }

  eventSvc.InitCodeMap(CODE_MAP_FILE);
  ```

## 3. Receive realtime events

To receive realtime events from the devices, you have to do the followings.

1. [Enable monitoring]({{'/api/event' | relative_url}}#enablemonitoring) on target devices.
2. [Subscribe]({{'/api/event' | relative_url}}#subscriberealtimelog) to the event channel.
3. Read the events from the channel.

  ```cpp
  void handleEvent(std::unique_ptr<ClientReader<EventLog>> eventReader) {
    EventLog realtimeEvent;

    while (eventReader->Read(&realtimeEvent)) {
      std::cout << "[EVENT] " << realtimeEvent.ShortDebugString() << std::endl;
    }
  }

  svc.EnableMonitoring(deviceID);

  s_Context = std::make_shared<ClientContext>();
  auto eventReader(svc.Subscribe(s_Context.get(), EVENT_QUEUE_SIZE));

  s_MonitoringThread = std::thread(handleEvent, std::move(eventReader));
  ```

## 4. Read event logs

When reading event logs, you can specify the starting index and the maximum number of events.

  ```cpp
  RepeatedPtrField<EventLog> events;
  svc.GetLog(deviceID, s_FirstEventID, MAX_NUM_EVENT, &events);

  for(int i = 0; i < events.size(); i++) {
    printEvent(svc, events[i]);
  }
  ```

You can also specify a filter to limit your search.

  ```cpp
  EventFilter filter;
  filter.set_eventcode(events[0].eventcode());

  svc.GetLogWithFilter(deviceID, s_FirstEventID, MAX_NUM_EVENT, filter, &events);

  for(int i = 0; i < events.size(); i++) {
    printEvent(svc, events[i]);
  }
  ```
