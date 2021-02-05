---
title: "Status API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/status/test/StatusTest.java_ as needed.
   
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
    ./build/install/java/bin/statusTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Check the type of the device

The status configuration is effective only for headless device such as BioEntry W2. 

  ```java  
  public static boolean isHeadless(CapabilityInfo capInfo) {
    switch (capInfo.getType()) {
      case BIOENTRY_P2:
      case BIOENTRY_R2:
      case BIOENTRY_W2:
      case XPASS2:
      case XPASS2_KEYPAD:
      case XPASS_D2:
      case XPASS_D2_KEYPAD:
      case XPASS_S2:
        return true;
      
      default:
        return false;
    }
  }

  CapabilityInfo capInfo = statusTest.deviceSvc.getCapabilityInfo(deviceID);

  if(!isHeadless(capInfo)) {
    statusTest.connectSvc.disconnect(deviceID);
    System.exit(-1);  
  }
  ``` 

## 3. Change the LED signal

There are [15 pre-defined status]({{'/api/status' | relative_url}}#DeviceStatus) for which you can change the LED or buzzer signals. The example changes the LED signal for __DEVICE_STATUS_NORMAL__.

  ```java
  ArrayList<LEDStatus> ledStateList = new ArrayList<LEDStatus>(config.getLEDStateList());
  ListIterator<LEDStatus> iterator = ledStateList.listIterator();
  while(iterator.hasNext()) {
    LEDStatus status = iterator.next();

    if(status.getDeviceStatus() == DeviceStatus.DEVICE_STATUS_NORMAL) {
      ArrayList<LEDSignal> ledSignals = new ArrayList<LEDSignal>();
      ledSignals.add(LEDSignal.newBuilder().setColor(LEDColor.LED_COLOR_YELLOW).setDuration(2000).setDelay(0).build());

      LEDStatus newStatus = LEDStatus.newBuilder().setDeviceStatus(DeviceStatus.DEVICE_STATUS_NORMAL).setCount(0).addAllSignals(ledSignals).build();
      iterator.set(newStatus);

      config = config.toBuilder().addAllLEDState(ledStateList).build();
      break;
    }
  }

  statusSvc.setConfig(deviceID, config);
  ```

## 4. Change the buzzer signal

The example changes the buzzer signal for __DEVICE_STATUS_FAIL__.

  ```java
  ArrayList<BuzzerStatus> buzzerStateList = new ArrayList<BuzzerStatus>(config.getBuzzerStateList());
  ListIterator<BuzzerStatus> iterator = buzzerStateList.listIterator();
  while(iterator.hasNext()) {
    BuzzerStatus status = iterator.next();

    if(status.getDeviceStatus() == DeviceStatus.DEVICE_STATUS_FAIL) {
      ArrayList<BuzzerSignal> buzzerSignals = new ArrayList<BuzzerSignal>(); // 2 x 500ms beeps
      buzzerSignals.add(BuzzerSignal.newBuilder().setTone(BuzzerTone.BUZZER_TONE_HIGH).setDuration(500).setDelay(2).build());
      buzzerSignals.add(BuzzerSignal.newBuilder().setTone(BuzzerTone.BUZZER_TONE_HIGH).setDuration(500).setDelay(2).build());

      BuzzerStatus newStatus = BuzzerStatus.newBuilder().setDeviceStatus(DeviceStatus.DEVICE_STATUS_FAIL).setCount(1).addAllSignals(buzzerSignals).build();
      iterator.set(newStatus);

      config = config.toBuilder().addAllBuzzerState(buzzerStateList).build();
      break;
    }
  }

  statusSvc.setConfig(deviceID, config);
  ```