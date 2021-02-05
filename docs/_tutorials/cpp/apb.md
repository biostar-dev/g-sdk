---
title: "Anti Passback Zone API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/apb/test/main.cpp_ as needed.
   
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

      Open _testAPBZone.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testAPBZone
      ```

    * Linux

      ```
      cmake .
      make testAPBZone
      ./testAPBZone
      ```

## 1. Configure devices

An anti passback zone consists of multiple devices connected by RS485. To run the example, you have to configure two devices as below.

1. Connect two devices by RS485.
2. Set one device as a master and the other as a slave. You can configure this setting using the device UI or BioStar 2. Or, you can use [RS485 API]({{'/api/rs485/' | relative_url}}).

## 2. Connect to the gateway and the device

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

## 3. Search and register RS485 slaves

  ```cpp
  rs485Svc.SearchSlave(deviceID, &s_Slaves);

  rs485Svc.GetSlave(deviceID, &s_RegisteredSlaves);

  if(s_RegisteredSlaves.size() == 0) {
    rs485Svc.SetSlave(deviceID, s_Slaves);
  }
  ```

## 4. Make a zone using the master and the slave devices.

  ```cpp
  Member entryReader;
  entryReader.set_deviceid(deviceID);
  entryReader.set_readertype(ReaderType::ENTRY);

  Member exitReader;
  exitReader.set_deviceid(slaves[0].deviceid());
  exitReader.set_readertype(ReaderType::EXIT);

  Signal relaySignal;
  relaySignal.set_count(3);
  relaySignal.set_onduration(500);
  relaySignal.set_offduration(500);

  RelayAction relayAction;
  relayAction.set_relayindex(0);
  *relayAction.mutable_signal() = relaySignal;

  Action zoneAction;
  zoneAction.set_deviceid(deviceID);
  zoneAction.set_type(ActionType::ACTION_RELAY);
  *zoneAction.mutable_relay() = relayAction;

  ZoneInfo zone;
  zone.set_zoneid(TEST_ZONE_ID);
  zone.set_name("Test APB Zone");
  zone.set_type(Type::HARD); // hard APB
  zone.set_resetduration(0); // indefinite
  *zone.add_members() = entryReader;
  *zone.add_members() = exitReader;
  *zone.add_actions() = zoneAction;

  RepeatedPtrField<ZoneInfo> zones;
  zones.Add(std::forward<ZoneInfo>(zone));

  zoneSvc.Add(deviceID, zones);

  // Test if APB zone works correctly
  ```  
