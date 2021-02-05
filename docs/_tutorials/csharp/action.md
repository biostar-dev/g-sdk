---
title: "Trigger & Action API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/action/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/action/test/Program.cs_ as needed.
   
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
    cd example/action/test
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

## 2. Make triggers

You can make [several types of triggers]({{'/api/action' | relative_url}}#TriggerType). The example shows how to make event triggers among these.

  ```csharp
  var cardFailTrigger = new Trigger{ DeviceID = deviceID, Type = TriggerType.TriggerEvent, Event = new EventTrigger{ EventCode = BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD }};
  var fingerFailTrigger = new Trigger{ DeviceID = deviceID, Type = TriggerType.TriggerEvent, Event = new EventTrigger{ EventCode = BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER }};
  ```

## 3. Make actions

The example shows how to make a relay action. Refer to [ActionType]({{'/api/action' | relative_url}}#ActionType) for available types of actions.

  ```csharp
  var failAction = new Action.Action{ DeviceID = deviceID, Type = ActionType.ActionRelay, Relay = new RelayAction{ RelayIndex = 0, Signal = new Signal{ Count = 3, OnDuration = 500, OffDuration = 500}}};
  ```  

## 4. Make TriggerActionConfig

You can configure up to 128 pairs of trigger and action in [TriggerActionConfig]({{'/api/action' | relative_url}}#TriggerActionConfig).

  ```csharp
  var config = new TriggerActionConfig();
  config.TriggerActions.Add( new TriggerActionConfig.Types.TriggerAction{ Trigger = cardFailTrigger, Action = failAction });
  config.TriggerActions.Add( new TriggerActionConfig.Types.TriggerAction{ Trigger = fingerFailTrigger, Action = failAction });

  actionSvc.SetConfig(deviceID, config);
  ```  
