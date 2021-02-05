---
title: "Status API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/status/test/test.go_ as needed.
   
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
    cd src/example/status/test
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

## 2. Check the type of the device

The status configuration is effective only for headless device such as BioEntry W2. 

  ```go  
  func isHeadless(devType devSvc.Type) bool {
    switch devType {
    case devSvc.Type_BIOENTRY_P2,
      devSvc.Type_BIOENTRY_R2,
      devSvc.Type_BIOENTRY_W2,
      devSvc.Type_XPASS2,
      devSvc.Type_XPASS2_KEYPAD,
      devSvc.Type_XPASS_D2,
      devSvc.Type_XPASS_D2_KEYPAD,
      devSvc.Type_XPASS_S2:
      return true
    default:
      return false
    }
  }

  deviceSvc = device.NewDeviceSvc(gatewayClient.GetConn())
  capInfo, _ := deviceSvc.GetCapabilityInfo(deviceID)

  if !isHeadless(capInfo.Type) {
    fmt.Printf("Status configuration is effective only for headless devices: %v\n", capInfo.Type)
    os.Exit(1)
  }
  ``` 

## 3. Change the LED signal

There are [15 pre-defined status]({{'/api/status' | relative_url}}#DeviceStatus) for which you can change the LED or buzzer signals. The example changes the LED signal for __DEVICE_STATUS_NORMAL__.

  ```go
  for _, ledStatus := range config.LEDState {
    if ledStatus.DeviceStatus == status.DeviceStatus_DEVICE_STATUS_NORMAL {
      ledStatus.Count = 0 
      ledStatus.Signals = []*action.LEDSignal{
        &action.LEDSignal{
          Color: device.LEDColor_LED_COLOR_YELLOW, 
          Duration: 2000,
          Delay: 0,
        },
      }

      break
    }
  }

  statusSvc.SetConfig(deviceID, config) 
  ```

## 4. Change the buzzer signal

The example changes the buzzer signal for __DEVICE_STATUS_FAIL__.

  ```go
  for _, buzzerStatus := range config.BuzzerState {
    if buzzerStatus.DeviceStatus == status.DeviceStatus_DEVICE_STATUS_FAIL {
      buzzerStatus.Count = 1 
      buzzerStatus.Signals = []*action.BuzzerSignal{}
      
      for i := 0; i < NUM_OF_FAIL_BUZZER; i++ { // 2 x 500ms beeps
        signal := &action.BuzzerSignal{
          Tone: device.BuzzerTone_BUZZER_TONE_HIGH,
          Duration: 500,
          Delay: 2,
        }
        buzzerStatus.Signals = append(buzzerStatus.Signals, signal)
      }

      break
    }
  }

  statusSvc.SetConfig(deviceID, config)
  ```