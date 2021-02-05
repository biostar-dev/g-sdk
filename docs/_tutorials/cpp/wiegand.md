---
title: "Wiegand API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/wiegand/test/main.cpp_ as needed.
   
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

      Open _testWiegand.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testWiegand
      ```

    * Linux

      ```
      cmake .
      make testWiegand
      ./testWiegand
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

## 2. Make the standard 26 bit format

The 26 bit standard format consists of 8 bit facility code and 16 bit id. It is one of the most widely used formats in the industry. 

  ```cpp
  // 26 bit standard
  // FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
  // ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
  // EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
  // OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd 

  WiegandFormat default26bit;
  default26bit.set_length(26);
  *default26bit.add_idfields() = {0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}; // Facility Code
  *default26bit.add_idfields() = {0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}; // ID

  ParityField evenParity;
  evenParity.set_paritypos(0);
  evenParity.set_paritytype(WiegandParity::WIEGAND_PARITY_EVEN);
  evenParity.set_data({0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0});

  ParityField oddParity;
  oddParity.set_paritypos(25);
  oddParity.set_paritytype(WiegandParity::WIEGAND_PARITY_ODD);
  oddParity.set_data({0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0});

  *default26bit.add_parityfields() = evenParity;
  *default26bit.add_parityfields() = oddParity;

  WiegandConfig config;
  config.set_mode(WiegandMode::WIEGAND_IN_ONLY);
  config.set_outpulsewidth(40);
  config.set_outpulseinterval(10000);
  *config.add_formats() = default26bit;

  svc.SetConfig(deviceID, config);
  ``` 

## 3. Make the HID 37 bit format

The HID 37 format consists of 16 bit facility code and 19 bit ID. 

  ```cpp
  // 37 bit HID
  // FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
  // ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
  // EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
  // OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd

  WiegandFormat hid37bitFormat;
  hid37bitFormat.set_length(37);
  *hid37bitFormat.add_idfields() = {0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}; // Facility Code
  *hid37bitFormat.add_idfields() = {0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}; // ID

  ParityField evenParity;
  evenParity.set_paritypos(0);
  evenParity.set_paritytype(WiegandParity::WIEGAND_PARITY_EVEN);
  evenParity.set_data({0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0});

  ParityField oddParity;
  oddParity.set_paritypos(36);
  oddParity.set_paritytype(WiegandParity::WIEGAND_PARITY_ODD);
  oddParity.set_data({0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0});

  *hid37bitFormat.add_parityfields() = evenParity;
  *hid37bitFormat.add_parityfields() = oddParity;

  WiegandConfig config;
  config.set_mode(WiegandMode::WIEGAND_IN_ONLY);
  config.set_outpulsewidth(40);
  config.set_outpulseinterval(10000);
  *config.add_formats() = hid37bitFormat;

  svc.SetConfig(deviceID, config);
  ```