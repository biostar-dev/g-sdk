---
title: "Status API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/status/test/main.cpp_ as needed.
   
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

      Open _testStatus.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testStatus
      ```

    * Linux

      ```
      cmake .
      make testStatus
      ./testStatus
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

## 2. Check the type of the device

The status configuration is effective only for headless device such as BioEntry W2. 

  ```cpp  
  bool isHeadless(device::Type devType) {
    switch (devType) {
    case device::Type::BIOENTRY_P2:
    case device::Type::BIOENTRY_R2:
    case device::Type::BIOENTRY_W2:
    case device::Type::XPASS2:
    case device::Type::XPASS2_KEYPAD:
    case device::Type::XPASS_D2:
    case device::Type::XPASS_D2_KEYPAD:
    case device::Type::XPASS_S2:
      return true;
    
    default:
      return false;
    }
  }

  DeviceSvc deviceSvc(gatewayClient->GetChannel());
  CapabilityInfo capInfo;
  deviceSvc.GetCapabilityInfo(deviceID, &capInfo);

  if(!isHeadless(capInfo.type())) {
    connectSvc.Disconnect(deviceIDs);
    exit(1);
  }
  ``` 

## 3. Change the LED signal

There are [15 pre-defined status]({{'/api/status' | relative_url}}#DeviceStatus) for which you can change the LED or buzzer signals. The example changes the LED signal for __DEVICE_STATUS_NORMAL__.

  ```cpp
  for(int i = 0; i < config.ledstate().size(); i++) {
    if(config.ledstate()[i].devicestatus() == DeviceStatus::DEVICE_STATUS_NORMAL) {
      LEDSignal signal;
      signal.set_color(LEDColor::LED_COLOR_YELLOW);
      signal.set_duration(2000);
      signal.set_delay(0);

      auto ledStatus = config.mutable_ledstate(i);
      ledStatus->set_count(0);
      ledStatus->clear_signals();
      *ledStatus->add_signals() = signal;

      break;
    }
  }

  svc.SetConfig(deviceID, config);
  ```

## 4. Change the buzzer signal

The example changes the buzzer signal for __DEVICE_STATUS_FAIL__.

  ```cpp
  for(int i = 0; i < config.buzzerstate().size(); i++) {
    if(config.buzzerstate()[i].devicestatus() == DeviceStatus::DEVICE_STATUS_FAIL) {
      BuzzerSignal highBeep;
      highBeep.set_tone(BuzzerTone::BUZZER_TONE_HIGH);
      highBeep.set_duration(500);
      highBeep.set_delay(2);

      auto buzzerStatus = config.mutable_buzzerstate(i); // 2 x 500ms beeps
      buzzerStatus->set_count(1);
      buzzerStatus->clear_signals();
      *buzzerStatus->add_signals() = highBeep;
      *buzzerStatus->add_signals() = highBeep;

      break;
    }
  }

  svc.SetConfig(deviceID, config);
  ```