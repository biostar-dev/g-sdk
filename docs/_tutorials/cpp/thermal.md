---
title: "Thermal API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/thermal/test/main.cpp_ as needed.
   
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

      Open _testThermal.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testThermal
      ```

    * Linux

      ```
      cmake .
      make testThermal
      ./testThermal
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

## 2. Test the thermal configuration

There are several options you can configure related to the thermal camera. The example shows how to configure some of these options and let you check the results.

  ```cpp
  // Set options for the test
  config.set_audittemperature(true);
  config.set_checkmode(thermal::HARD);

  // (1) Set check order to AFTER_AUTH
  config.set_checkorder(thermal::AFTER_AUTH);
  svc.SetConfig(deviceID, config);

  std::cout << "(1) The Check Order is set to AFTER_AUTH. The device will try to authenticate a user only when the user's temperature is within the threshold. Try to authenticate faces." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");

  // (2) Set check order to BEFORE_AUTH
  config.set_checkorder(thermal::BEFORE_AUTH);
  svc.SetConfig(deviceID, config);

  std::cout << "(2) The Check Order is set to BEFORE_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");  

  // (3) Set check order to WITHOUT_AUTH
  config.set_checkorder(thermal::WITHOUT_AUTH);
  svc.SetConfig(deviceID, config);

  std::cout << "(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");    

  // (4) Set check order to AFTER_AUTH with too low threshold
  config.set_checkorder(thermal::AFTER_AUTH);
  config.set_temperaturethreshold(3500);
  svc.SetConfig(deviceID, config);

  std::cout << "(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces." << std::endl << std::endl;
  Menu::PressEnter(">> Press ENTER if you finish testing this mode.\n");    
  ```

## 3. Get the temperature logs

If you set the [ThermalConfig.AuditTemperature]({{'/api/thermal' | relative_url}}#ThermalConfig) to true, the device will record the temperature of users in addition to other information. You can read these logs using [Thermal.GetTempeartureLog]({{'/api/thermal' | relative_url}}#gettemperaturelog).

  ```cpp
  RepeatedPtrField<TemperatureLog> events;
  svc.GetTemperatureLog(deviceID, s_FirstEventID, 0, &events);
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

