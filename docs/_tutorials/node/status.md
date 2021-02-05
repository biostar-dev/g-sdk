---
title: "Status API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/status/test/test.js_ as needed.
   
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
    cd example/status/test
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

## 2. Check the type of the device

The status configuration is effective only for headless device such as BioEntry W2. 

  ```javascript  
  function isHeadless(devType) {
    switch(devType) {
      case device.deviceMessage.Type.BIOENTRY_P2:
      case device.deviceMessage.Type.BIOENTRY_R2:
      case device.deviceMessage.Type.BIOENTRY_W2:
      case device.deviceMessage.Type.XPASS2:
      case device.deviceMessage.Type.XPASS2_KEYPAD:
      case device.deviceMessage.Type.XPASS_D2:
      case device.deviceMessage.Type.XPASS_D2_KEYPAD:
      case device.deviceMessage.Type.XPASS_S2:
        return true;

      default:
        return false;
    }
  }

  const capInfo = await device.getCapabilityInfo(deviceID);

  if(!isHeadless(capInfo.getType())) {
    connect.disconnect([deviceID]);
    return;
  }  
  ``` 

## 3. Change the LED signal

There are [15 pre-defined status]({{'/api/status' | relative_url}}#DeviceStatus) for which you can change the LED or buzzer signals. The example changes the LED signal for __DEVICE_STATUS_NORMAL__.

  ```javascript
  const ledStateList = config.getLedstateList();

  for(let i = 0; i < ledStateList.length; i++) {
    if(ledStateList[i].getDevicestatus() == status.statusMessage.DeviceStatus.DEVICE_STATUS_NORMAL) {
      ledStateList[i].clearSignalsList();
      ledStateList[i].setCount(0);

      const ledSignal = new action.actionMessage.LEDSignal();
      ledSignal.setColor(device.deviceMessage.LEDColor.LED_COLOR_YELLOW);
      ledSignal.setDuration(2000);
      ledSignal.setDelay(0);

      ledStateList[i].addSignals(ledSignal);

      break;
    }
  }

  config.setLedstateList(ledStateList);

  await status.setConfig(devID, config);
  ```

## 4. Change the buzzer signal

The example changes the buzzer signal for __DEVICE_STATUS_FAIL__.

  ```javascript
  const buzzerStateList = config.getBuzzerstateList();

  for(let i = 0; i < buzzerStateList.length; i++) {
    if(buzzerStateList[i].getDevicestatus() == status.statusMessage.DeviceStatus.DEVICE_STATUS_FAIL) {
      buzzerStateList[i].clearSignalsList();
      buzzerStateList[i].setCount(1);

      const buzzerSignal = new action.actionMessage.BuzzerSignal(); // 2 x 500ms beeps
      buzzerSignal.setTone(device.deviceMessage.BuzzerTone.BUZZER_TONE_HIGH);
      buzzerSignal.setDuration(500);
      buzzerSignal.setDelay(2);

      buzzerStateList[i].addSignals(buzzerSignal);
      buzzerStateList[i].addSignals(buzzerSignal);

      break;
    }
  }

  config.setBuzzerstateList(buzzerStateList);

  await status.setConfig(devID, config);
  ```