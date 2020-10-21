---
title: "T&A API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/tna/test/main.cpp_ as needed.
   
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

      Open _testTNA.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testTNA
      ```

    * Linux

      ```
      cmake .
      make testTNA
      ./testTNA
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

## 2. Test the T&A configuration

There are several options you can configure related to the T&A functions. The example shows how to configure some of these options and let you check the results.

  ```cpp
  // (1) BY_USER
  TNAConfig config;
  config.set_mode(tna::BY_USER);
  config.add_labels("In");
  config.add_labels("Out"); 
  config.add_labels("Scheduled In"); 
  config.add_labels("Fixed Out");
  svc.SetConfig(deviceID, config);

  std::cout << "(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (2) IsRequired
  config.set_isrequired(true);
  SetConfig(deviceID, config);

  std::cout << "(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");  

  // (3) LAST_CHOICE
  config.set_mode(tna::LAST_CHOICE);
  svc.SetConfig(deviceID, config);

  std::cout << "(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");  

  // (4) BY_SCHEDULE
  config.set_mode(tna::BY_SCHEDULE);
  config.add_schedules(0);
  config.add_schedules(0);
  config.add_schedules(1); // Always for KEY_3(Scheduled_In)
  svc.SetConfig(deviceID, config);

  std::cout << "(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");   

  // (5) FIXED
  config.set_mode(tna::FIXED);
  config.set_key(tna::KEY_4); 
  svc.SetConfig(deviceID, config);

  std::cout << "(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");     
  ```

## 3. Get the T&A logs

You can read the log records with T&A key information using [TNA.GetTNALog]({{'/api/tna' | relative_url}}#gettnalog). To get the label of the key, you have to look up the [TNAConfig.labels]({{'/api/tna' | relative_url}}#TNAConfig).

  ```cpp
  RepeatedPtrField<TNALog> events;
  svc.GetTNALog(deviceID, s_FirstEventID, 0, &events);

  // ...

  std::string getTNALabel(tna::Key key, TNAConfig& config) {
    char buf[64];

    if(config.labels_size() > (int)key - 1) {
      sprintf(buf, "%s(Key_%d)", config.labels((int)key - 1).c_str(), key);
    } else {
      sprintf(buf, "Key_%s", key);
    } 

    return buf;
  }
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```cpp
  svc.EnableMonitoring(deviceID);

  s_Context = std::make_shared<ClientContext>();
  auto eventReader(svc.Subscribe(s_Context.get(), EVENT_QUEUE_SIZE));

  s_MonitoringThread = std::thread(handleEvent, std::move(eventReader));

  // ...

  void handleEvent(std::unique_ptr<ClientReader<EventLog>> eventReader) {
    EventLog realtimeEvent;

    while (eventReader->Read(&realtimeEvent)) {
      std::cout << "[EVENT] " << realtimeEvent.ShortDebugString() << std::endl;
    }

    std::cout << "Monitoring thread is stopped" << std::endl;

    eventReader->Finish();
  }  
  ```

