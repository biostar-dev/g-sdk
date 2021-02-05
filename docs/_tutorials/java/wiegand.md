---
title: "Wiegand API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/wiegand/test/WiegandTest.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String GATEWAY_CA_FILE = "cert/gateway/ca.crt";

    // the address of the gateway
    private static final String GATEWAY_ADDR = "192.168.0.2";
    private static final int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private static final String DEVICE_ADDR = "192.168.0.110"; 
    private static final int DEVICE_PORT = 51211;
    ```
6. Build.

    ```
    ./gradlew installDist
    ```
7. Run.
   
    ```
    ./build/install/java/bin/wiegandTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Make the standard 26 bit format

The 26 bit standard format consists of 8 bit facility code and 16 bit id. It is one of the most widely used formats in the industry. 

  ```java
  // 26 bit standard
  // FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
  // ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
  // EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
  // OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd  

  ArrayList<ByteString> idFields = new ArrayList<ByteString>();

  idFields.add(ByteString.copyFrom(new byte[]{0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0})); // Facility Code
  idFields.add(ByteString.copyFrom(new byte[]{0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0})); // ID

  ArrayList<ParityField> parityFields = new ArrayList<ParityField>();

  ParityField evenParity = ParityField.newBuilder()
    .setParityPos(WIEGAND_26BIT_EVEN_PARITY_POS)
    .setParityType(WiegandParity.WIEGAND_PARITY_EVEN)
    .setData(ByteString.copyFrom(new byte[]{0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}))
    .build();

  ParityField oddParity = ParityField.newBuilder()
    .setParityPos(WIEGAND_26BIT_ODD_PARITY_POS)
    .setParityType(WiegandParity.WIEGAND_PARITY_ODD)
    .setData(ByteString.copyFrom(new byte[]{0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}))
    .build();

  parityFields.add(evenParity);
  parityFields.add(oddParity);

  WiegandFormat std26bitFormat = WiegandFormat.newBuilder()
                    .setLength(WIEGAND_26BIT_LENGTH)
                    .addAllIDFields(idFields)
                    .addAllParityFields(parityFields)
                    .build();
                    
  WiegandConfig std26bitConfig = WiegandConfig.newBuilder()
                      .setMode(WiegandMode.WIEGAND_OUT_ONLY)
                      .setOutPulseWidth(OUT_PULSE_WIDTH)
                      .setOutPulseInterval(OUT_PULSE_INTERVAL)
                      .addFormats(std26bitFormat)
                      .build();

  wiegandSvc.setConfig(deviceID, std26bitConfig);
  ``` 

## 3. Make the HID 37 bit format

The HID 37 format consists of 16 bit facility code and 19 bit ID. 

  ```java
  // 37 bit HID
  // FC: 0 1111 1111 1111 1111 0000 0000 0000 0000 0000 : 0x0ffff00000
  // ID: 0 0000 0000 0000 0000 1111 1111 1111 1111 1110 : 0x00000ffffe
  // EP: 0 1111 1111 1111 1111 1100 0000 0000 0000 0000 : 0x0ffffc0000, Pos 0, Type: Even
  // OP: 0 0000 0000 0000 0000 0111 1111 1111 1111 1110 : 0x000007fffe, Pos 36, Type: Odd

  ArrayList<ByteString> idFields = new ArrayList<ByteString>();

  idFields.add(ByteString.copyFrom(new byte[]{0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0})); // Facility Code
  idFields.add(ByteString.copyFrom(new byte[]{0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0})); // ID

  ArrayList<ParityField> parityFields = new ArrayList<ParityField>();

  ParityField evenParity = ParityField.newBuilder()
    .setParityPos(WIEGAND_37BIT_EVEN_PARITY_POS)
    .setParityType(WiegandParity.WIEGAND_PARITY_EVEN)
    .setData(ByteString.copyFrom(new byte[]{0, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}))
    .build();

  ParityField oddParity = ParityField.newBuilder()
    .setParityPos(WIEGAND_37BIT_ODD_PARITY_POS)
    .setParityType(WiegandParity.WIEGAND_PARITY_ODD)
    .setData(ByteString.copyFrom(new byte[]{0, 0, 0, 0, 0, /**/ 0, 0 ,0 ,0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}))
    .build();
  
  parityFields.add(evenParity);
  parityFields.add(oddParity);

  WiegandFormat hid37bitFormat = WiegandFormat.newBuilder()
                    .setLength(WIEGAND_37BIT_LENGTH)
                    .addAllIDFields(idFields)
                    .addAllParityFields(parityFields)
                    .build();
                    
  WiegandConfig hid37bitConfig = WiegandConfig.newBuilder()
                      .setMode(WiegandMode.WIEGAND_OUT_ONLY)
                      .setOutPulseWidth(OUT_PULSE_WIDTH)
                      .setOutPulseInterval(OUT_PULSE_INTERVAL)
                      .addFormats(hid37bitFormat)
                      .build();

  wiegandSvc.setConfig(deviceID, hid37bitConfig);
  ```