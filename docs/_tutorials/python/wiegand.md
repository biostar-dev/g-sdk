---
title: "Wiegand API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/wiegand/test/test.py_ as needed.
   
    ```python
    # the path of the root certificate
    GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt'

    # the ip address of the gateway
    GATEWAY_IP = '192.168.0.2'
    GATEWAY_PORT = 4000

    # the ip address of the target device
    DEVICE_IP = '192.168.0.110'
    DEVICE_PORT = 51211
    USE_SSL = False
    ```
5. Run.
   
    ```
    cd example/wiegand/test
    python test.py
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```python
  client = GatewayClient(GATEWAY_IP, GATEWAY_PORT, GATEWAY_CA_FILE)
  channel = client.getChannel()
  
  connectSvc = ConnectSvc(channel)
  connInfo = connect_pb2.ConnectInfo(IPAddr=DEVICE_IP, port=DEVICE_PORT, useSSL=USE_SSL)

  devID = connectSvc.connect(connInfo)
  ```   

## 2. Make the standard 26 bit format

The 26 bit standard format consists of 8 bit facility code and 16 bit id. It is one of the most widely used formats in the industry. 

  ```python
  # 26 bit standard
  # FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
  # ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
  # EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
  # OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd 

  default26bit = wiegand_pb2.WiegandFormat(length=26)
  default26bit.IDFields.append(bytes([0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) # Facility Code
  default26bit.IDFields.append(bytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0])) # ID

  evenParity = wiegand_pb2.ParityField(parityPos=0, parityType=wiegand_pb2.WIEGAND_PARITY_EVEN)
  evenParity.data = bytes([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  oddParity = wiegand_pb2.ParityField(parityPos=25, parityType=wiegand_pb2.WIEGAND_PARITY_ODD)
  oddParity.data = bytes([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0])

  default26bit.parityFields.append(evenParity)
  default26bit.parityFields.append(oddParity)

  wiegandConfig = wiegand_pb2.WiegandConfig(mode=wiegand_pb2.WIEGAND_IN_ONLY, outPulseWidth=40, outPulseInterval=10000)
  wiegandConfig.formats.append(default26bit)

  self.wiegandSvc.setConfig(deviceID, wiegandConfig)
  ``` 

## 3. Make the HID 37 bit format

The HID 37 format consists of 16 bit facility code and 19 bit ID. 

  ```python
  # 37 bit HID
  # FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
  # ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
  # EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
  # OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd

  hid37bitFormat = wiegand_pb2.WiegandFormat(length=37)
  hid37bitFormat.IDFields.append(bytes([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])) # Facility Code
  hid37bitFormat.IDFields.append(bytes([0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0])) # ID

  evenParity = wiegand_pb2.ParityField(parityPos=0, parityType=wiegand_pb2.WIEGAND_PARITY_EVEN)
  evenParity.data = bytes([0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

  oddParity = wiegand_pb2.ParityField(parityPos=36, parityType=wiegand_pb2.WIEGAND_PARITY_ODD)
  oddParity.data = bytes([0, 0, 0, 0, 0, 0, 0 ,0 ,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0])

  hid37bitFormat.parityFields.append(evenParity)
  hid37bitFormat.parityFields.append(oddParity)

  wiegandConfig = wiegand_pb2.WiegandConfig(mode=wiegand_pb2.WIEGAND_IN_ONLY, outPulseWidth=40, outPulseInterval=10000)
  wiegandConfig.formats.append(hid37bitFormat)

  self.wiegandSvc.setConfig(deviceID, wiegandConfig)
  ```