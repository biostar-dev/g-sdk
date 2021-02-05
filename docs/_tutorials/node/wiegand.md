---
title: "Wiegand API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/wiegand/test/test.js_ as needed.
   
    ```javascript
    // the path of the root certificate
    const GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt';

    // the address of the gateway
    const GATEWAY_IP = '192.168.0.2';
    const GATEWAY_PORT = 4000;

    // the ip address of the target device
    const DEVICE_IP = '192.168.0.110';
    const DEVICE_PORT = 51211;
    const USE_SSL = false;
    ```
5. Install packages.

    ```
    npm install
    ```
6. Run.
   
    ```
    cd example/wiegand/test
    node test.js
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```javascript
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);

  var deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);
  ```   

## 2. Make the standard 26 bit format

The 26 bit standard format consists of 8 bit facility code and 16 bit id. It is one of the most widely used formats in the industry. 

  ```javascript
  // 26 bit standard
  // FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
  // ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
  // EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
  // OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd 

  var default26bit = new wiegand.wiegandMessage.WiegandFormat();
  default26bit.setLength(26);
  default26bit.addIdfields(Buffer.from([0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); // Facility Code
  default26bit.addIdfields(Buffer.from([0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); // ID

  var evenParity = new wiegand.wiegandMessage.ParityField();
  evenParity.setParitypos(0);
  evenParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_EVEN);
  evenParity.setData(Buffer.from([0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); 

  var oddParity = new wiegand.wiegandMessage.ParityField();
  oddParity.setParitypos(25);
  oddParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_ODD);
  oddParity.setData(Buffer.from([0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); 

  default26bit.addParityfields(evenParity);
  default26bit.addParityfields(oddParity);

  var wiegandConfig = new wiegand.wiegandMessage.WiegandConfig();
  wiegandConfig.setMode(wiegand.wiegandMessage.WiegandMode.WIEGAND_IN_ONLY);
  wiegandConfig.setOutpulsewidth(40);
  wiegandConfig.setOutpulseinterval(10000);
  wiegandConfig.addFormats(default26bit);

  await wiegand.setConfig(devID, wiegandConfig);
  ``` 

## 3. Make the HID 37 bit format

The HID 37 format consists of 16 bit facility code and 19 bit ID. 

  ```javascript
  // 37 bit HID
  // FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
  // ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
  // EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
  // OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd

  var hid37bitFormat = new wiegand.wiegandMessage.WiegandFormat();
  hid37bitFormat.setLength(37);
  hid37bitFormat.addIdfields(Buffer.from([0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); // Facility Code
  hid37bitFormat.addIdfields(Buffer.from([0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); // ID

  var evenParity = new wiegand.wiegandMessage.ParityField();
  evenParity.setParitypos(0);
  evenParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_EVEN);
  evenParity.setData(Buffer.from([0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0])); 

  var oddParity = new wiegand.wiegandMessage.ParityField();
  oddParity.setParitypos(36);
  oddParity.setParitytype(wiegand.wiegandMessage.WiegandParity.WIEGAND_PARITY_ODD);
  oddParity.setData(Buffer.from([0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0])); 

  hid37bitFormat.addParityfields(evenParity);
  hid37bitFormat.addParityfields(oddParity);

  var wiegandConfig = new wiegand.wiegandMessage.WiegandConfig();
  wiegandConfig.setMode(wiegand.wiegandMessage.WiegandMode.WIEGAND_IN_ONLY);
  wiegandConfig.setOutpulsewidth(40);
  wiegandConfig.setOutpulseinterval(10000);
  wiegandConfig.addFormats(hid37bitFormat);

  await wiegand.setConfig(devID, wiegandConfig);
  ```