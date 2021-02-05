---
title: "Status API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/status/test/test.py_ as needed.
   
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
    cd example/status/test
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

## 2. Check the type of the device

The status configuration is effective only for headless device such as BioEntry W2. 

  ```python  
  def isHeadless(devType):
    headlessTypes = [
      device_pb2.BIOENTRY_P2, 
      device_pb2.BIOENTRY_R2, 
      device_pb2.BIOENTRY_W2, 
      device_pb2.XPASS2, 
      device_pb2.XPASS2_KEYPAD, 
      device_pb2.XPASS_D2, 
      device_pb2.XPASS_D2_KEYPAD, 
      device_pb2.XPASS_S2
    ]

    for headlessType in headlessTypes:
      if devType == headlessType:
        return True

    return False

  deviceSvc = DeviceSvc(channel)
  capInfo = deviceSvc.getCapInfo(devID)

  if not isHeadless(capInfo.type):
    connectSvc.disconnect([devID])
    return
  ``` 

## 3. Change the LED signal

There are [15 pre-defined status]({{'/api/status' | relative_url}}#DeviceStatus) for which you can change the LED or buzzer signals. The example changes the LED signal for __DEVICE_STATUS_NORMAL__.

  ```python
  for i in range(len(config.LEDState)):
    if config.LEDState[i].deviceStatus == status_pb2.DEVICE_STATUS_NORMAL: # Change the LED color of the normal status to yellow
      config.LEDState[i].count = 0 # indefinite

      del config.LEDState[i].signals[:]
      ledSignal = action_pb2.LEDSignal(color=device_pb2.LED_COLOR_YELLOW, duration=2000, delay=0)
      config.LEDState[i].signals.append(ledSignal)
      break

  self.statusSvc.setConfig(deviceID, config)
  ```

## 4. Change the buzzer signal

The example changes the buzzer signal for __DEVICE_STATUS_FAIL__.

  ```python
  for i in range(len(config.BuzzerState)):
    if config.BuzzerState[i].deviceStatus == status_pb2.DEVICE_STATUS_FAIL: # Change the buzzer signal for FAIL
      config.BuzzerState[i].count = 1 # indefinite

      del config.BuzzerState[i].signals[:]
      buzzerSignal = action_pb2.BuzzerSignal(tone=device_pb2.BUZZER_TONE_HIGH, duration=500, delay=2) # 2 x 500ms beeps
      config.BuzzerState[i].signals.append(buzzerSignal)
      config.BuzzerState[i].signals.append(buzzerSignal)
      break

  self.statusSvc.setConfig(deviceID, config)
  ```