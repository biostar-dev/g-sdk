---
title: "Wiegand API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/wiegand/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the target device
    DEV_IP = "192.168.0.110"
    DEV_PORT = 51211
    USE_SSL = false
    ```
5. Build.

    ```
    cd src/example/wiegand/test
    go build .
    ```
6. Run.
   
    ```
    ./test
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```go
  gatewayClient := &client.GatewayClient{}
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_IP, GATEWAY_PORT)

  connectSvc = connect.NewConnectSvc(gatewayClient.GetConn())
  deviceID, _ := connectSvc.Connect(DEV_IP, DEV_PORT, USE_SSL)
  ```   

## 2. Make the standard 26 bit format

The 26 bit standard format consists of 8 bit facility code and 16 bit id. It is one of the most widely used formats in the industry. 

  ```go
  // 26 bit standard
  // FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
  // ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
  // EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
  // OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd
  var bitArray_26bit = [][]byte {
    {0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}, // Facility Code
    {0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}, // ID
    {0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}, // Even Parity
    {0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}, // Odd Parity
  }

  std26bitFormat := &wiegand.WiegandFormat{
    Length: WIEGAND_26BIT_LENGTH,
    IDFields: [][]byte{
      bitArray_26bit[0],
      bitArray_26bit[1],
    },
    ParityFields: []*wiegand.ParityField{
      &wiegand.ParityField{
        ParityPos: WIEGAND_26BIT_EVEN_PARITY_POS,
        ParityType: wiegand.WiegandParity_WIEGAND_PARITY_EVEN,
        Data: bitArray_26bit[2],
      },
      &wiegand.ParityField{
        ParityPos: WIEGAND_26BIT_ODD_PARITY_POS,
        ParityType: wiegand.WiegandParity_WIEGAND_PARITY_ODD,
        Data: bitArray_26bit[3],
      },
    },
  }

  std26bitConfig := &wiegand.WiegandConfig{
    Mode: WIEGAND_MODE,
    OutPulseWidth: OUT_PULSE_WIDTH,
    OutPulseInterval: OUT_PULSE_INTERVAL,
    Formats: []*wiegand.WiegandFormat{
      std26bitFormat,
    },
  }

  wiegandSvc.SetConfig(deviceID, std26bitConfig)
  ``` 

## 3. Make the HID 37 bit format

The HID 37 format consists of 16 bit facility code and 19 bit ID. 

  ```go
  // 37 bit HID
  // FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
  // ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
  // EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
  // OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd
  var bitArray_37bit = [][]byte {
    {0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}, // Facility Code
    {0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}, // ID
    {0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}, // Even Parity
    {0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}, // Odd Parity
  }

  hid37bitFormat := &wiegand.WiegandFormat{
    Length: WIEGAND_37BIT_LENGTH,
    IDFields: [][]byte{
      bitArray_37bit[0],
      bitArray_37bit[1],
    },
    ParityFields: []*wiegand.ParityField{
      &wiegand.ParityField{
        ParityPos: WIEGAND_37BIT_EVEN_PARITY_POS,
        ParityType: wiegand.WiegandParity_WIEGAND_PARITY_EVEN,
        Data: bitArray_37bit[2],
      },
      &wiegand.ParityField{
        ParityPos: WIEGAND_37BIT_ODD_PARITY_POS,
        ParityType: wiegand.WiegandParity_WIEGAND_PARITY_ODD,
        Data: bitArray_37bit[3],
      },
    },
  }	

  hid37bitConfig := &wiegand.WiegandConfig{
    Mode: WIEGAND_MODE,
    OutPulseWidth: OUT_PULSE_WIDTH,
    OutPulseInterval: OUT_PULSE_INTERVAL,
    Formats: []*wiegand.WiegandFormat{
      hid37bitFormat,
    },
  }

  wiegandSvc.SetConfig(deviceID, hid37bitConfig)
  ```