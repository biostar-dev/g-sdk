---
title: "Status API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/status/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/status/test/Program.cs_ as needed.
   
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
    cd example/status/test
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

## 2. Check the type of the device

The status configuration is effective only for headless device such as BioEntry W2. 

  ```csharp  
  static bool IsHeadless(CapabilityInfo capInfo) {
    switch(capInfo.Type) {
      case Device.Type.BioentryP2:
      case Device.Type.BioentryR2:
      case Device.Type.BioentryW2:
      case Device.Type.Xpass2:
      case Device.Type.Xpass2Keypad:
      case Device.Type.XpassD2:
      case Device.Type.XpassD2Keypad:
      case Device.Type.XpassS2:
        return true;
      
      default:
        return false;        
    }
  }

  CapabilityInfo capInfo = statusTest.deviceSvc.GetCapabilityInfo(devID);

  if(!IsHeadless(capInfo)) {
    statusTest.connectSvc.Disconnect(devIDs);
    Environment.Exit(1);          
  }
  ``` 

## 3. Change the LED signal

There are [15 pre-defined status]({{'/api/status' | relative_url}}#DeviceStatus) for which you can change the LED or buzzer signals. The example changes the LED signal for __DEVICE_STATUS_NORMAL__.

  ```csharp
  foreach(LEDStatus ledStatus in config.LEDState) {
    if(ledStatus.DeviceStatus == DeviceStatus.Normal) {
      ledStatus.Count = 0;
      ledStatus.Signals.Clear();
      ledStatus.Signals.Add(new LEDSignal{ Color = Device.LEDColor.Yellow, Duration = 2000, Delay = 0});
      break;
    }
  }

  statusSvc.SetConfig(deviceID, config);
  ```

## 4. Change the buzzer signal

The example changes the buzzer signal for __DEVICE_STATUS_FAIL__.

  ```csharp
  foreach(BuzzerStatus buzzerStatus in config.BuzzerState) {
    if(buzzerStatus.DeviceStatus == DeviceStatus.Fail) { // 2 x 500ms beeps
      buzzerStatus.Count = 1;
      buzzerStatus.Signals.Clear();
      buzzerStatus.Signals.Add(new BuzzerSignal{ Tone = Device.BuzzerTone.High, Duration = 500, Delay = 2});
      buzzerStatus.Signals.Add(new BuzzerSignal{ Tone = Device.BuzzerTone.High, Duration = 500, Delay = 2});
      break;
    }
  }

  statusSvc.SetConfig(deviceID, config);
  ```