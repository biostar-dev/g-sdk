---
title: "Wiegand API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/wiegand/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/wiegand/test/Program.cs_ as needed.
   
    ```csharp
    // the path of the root certificate
    private const string GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt";

    // the address of the gateway
    private const string GATEWAY_ADDR = "192.168.0.2";
    private const int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private const string DEVICE_ADDR = "192.168.0.110";
    private const int DEVICE_PORT = 51211;
    ```
6. Build and run.

    ```
    cd example/wiegand/test
    dotnet run
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```csharp
  GatewayClient gatewayClient = new GatewayClient();
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  var connectInfo = new ConnectInfo{ IPAddr = DEVICE_ADDR, Port = DEVICE_PORT, UseSSL = USE_SSL };
  uint devID = userTest.connectSvc.Connect(connectInfo); 
  ```  

## 2. Make the standard 26 bit format

The 26 bit standard format consists of 8 bit facility code and 16 bit id. It is one of the most widely used formats in the industry. 

  ```csharp
  // 26 bit standard
  // FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
  // ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
  // EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
  // OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd 

  WiegandFormat default26bit = new WiegandFormat{
    Length = 26,
    IDFields = {
      ByteString.CopyFrom(new byte[]{0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}), // Facility Code
      ByteString.CopyFrom(new byte[]{0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}) // ID
    },
    ParityFields = {
      new ParityField{ ParityPos = 0, ParityType = WiegandParity.Even, Data = ByteString.CopyFrom(new byte[]{0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}) },
      new ParityField{ ParityPos = 25, ParityType = WiegandParity.Odd, Data = ByteString.CopyFrom(new byte[]{0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}) }
    }
  };

  WiegandConfig defaultConfig = new WiegandConfig{
    Mode = WiegandMode.WiegandInOnly,
    UseWiegandBypass = false,
    UseFailCode = false,

    OutPulseWidth = 40,
    OutPulseInterval = 10000,
    Formats = { default26bit }
  };

  wiegandSvc.SetConfig(deviceID, defaultConfig); 
  ``` 

## 3. Make the HID 37 bit format

The HID 37 format consists of 16 bit facility code and 19 bit ID. 

  ```csharp
  // 37 bit HID
  // FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
  // ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
  // EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
  // OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd

  WiegandFormat hid37bitFormat = new WiegandFormat{
    Length = 37,
    IDFields = {
      ByteString.CopyFrom(new byte[]{0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}), // Facility Code
      ByteString.CopyFrom(new byte[]{0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}) // ID
    },
    ParityFields = {
      new ParityField{ ParityPos = 0, ParityType = WiegandParity.Even, Data = ByteString.CopyFrom(new byte[]{0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}) },
      new ParityField{ ParityPos = 36, ParityType = WiegandParity.Odd, Data = ByteString.CopyFrom(new byte[]{0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}) }
    }
  };

  WiegandConfig hid37bitConfig = new WiegandConfig{
    Mode = WiegandMode.WiegandInOnly,
    UseWiegandBypass = false,
    UseFailCode = false,

    OutPulseWidth = 40,
    OutPulseInterval = 10000,
    Formats = { hid37bitFormat }
  };

  wiegandSvc.SetConfig(deviceID, hid37bitConfig); 
  ```