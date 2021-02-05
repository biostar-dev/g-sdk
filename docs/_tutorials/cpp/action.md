---
title: "Trigger & Action API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/action/test/main.cpp_ as needed.
   
    ```cpp
    // the path of the root certificate
    const std::string GATEWAY_CA_FILE = "../cert/gateway/ca.crt";

    // the address of the gateway
    const std::string GATEWAY_ADDR = "192.168.0.2";
    const int GATEWAY_PORT = 4000;
    
    // the ip address of the target device
    const std::string DEVICE_IP = "192.168.0.110";
    const int DEVICE_PORT = 51211;
    const bool USE_SSL = false;
    ```
6. Build and run.
 
    * Windows
    
      ```
      cmake .
      ```

      Open _testAction.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testAction
      ```

    * Linux

      ```
      cmake .
      make testAction
      ./testAction
      ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```cpp
  auto gatewayClient = std::make_shared<GatewayClient>();
  gatewayClient->Connect(GATEWAY_ADDR, GATEWAY_PORT, GATEWAY_CA_FILE);

  ConnectSvc connectSvc(gatewayClient->GetChannel());

  ConnectInfo connInfo;
  connInfo.set_ipaddr(DEVICE_IP);
  connInfo.set_port(DEVICE_PORT);
  connInfo.set_usessl(USE_SSL);

  uint32_t deviceID = 0;
  connectSvc.Connect(connInfo, &deviceID);
  ```  

## 2. Make triggers

You can make [several types of triggers]({{'/api/action' | relative_url}}#TriggerType). The example shows how to make event triggers among these.

  ```cpp
  EventTrigger cardFailEventTrigger;
  cardFailEventTrigger.set_eventcode(BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD);

  Trigger cardFailTrigger;
  cardFailTrigger.set_deviceid(deviceID);
  cardFailTrigger.set_type(TriggerType::TRIGGER_EVENT);
  *cardFailTrigger.mutable_event() = cardFailEventTrigger;

  EventTrigger fingerFailEventTrigger;
  fingerFailEventTrigger.set_eventcode(BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER);

  Trigger fingerFailTrigger;
  fingerFailTrigger.set_deviceid(deviceID);
  fingerFailTrigger.set_type(TriggerType::TRIGGER_EVENT);
  *fingerFailTrigger.mutable_event() = fingerFailEventTrigger;
  ```

## 3. Make actions

The example shows how to make a relay action. Refer to [ActionType]({{'/api/action' | relative_url}}#ActionType) for available types of actions.

  ```cpp
  Signal failSignal;
  failSignal.set_count(3);
  failSignal.set_onduration(500);
  failSignal.set_offduration(500);

  RelayAction failRelayAction;
  failRelayAction.set_relayindex(0);
  *failRelayAction.mutable_signal() = failSignal;

  Action failAction;
  failAction.set_deviceid(deviceID);
  failAction.set_type(ActionType::ACTION_RELAY);
  *failAction.mutable_relay() = failRelayAction;
  ```  

## 4. Make TriggerActionConfig

You can configure up to 128 pairs of trigger and action in [TriggerActionConfig]({{'/api/action' | relative_url}}#TriggerActionConfig).

  ```cpp
  TriggerActionConfig_TriggerAction cardTriggerAction;
  *cardTriggerAction.mutable_trigger() = cardFailTrigger;
  *cardTriggerAction.mutable_action() = failAction;

  TriggerActionConfig_TriggerAction fingerTriggerAction;
  *fingerTriggerAction.mutable_trigger() = fingerFailTrigger;
  *fingerTriggerAction.mutable_action() = failAction;

  TriggerActionConfig config;
  *config.add_triggeractions() = cardTriggerAction;
  *config.add_triggeractions() = fingerTriggerAction;

  svc.SetConfig(deviceID, config);
  ```  
