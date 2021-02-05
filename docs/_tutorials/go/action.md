---
title: "Trigger & Action API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/action/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the master device
    DEV_IP = "192.168.0.110"
    DEV_PORT = 51211
    USE_SSL = false
    ```
5. Build.

    ```
    cd src/example/action/test
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

## 2. Make triggers

You can make [several types of triggers]({{'/api/action' | relative_url}}#TriggerType). The example shows how to make event triggers among these.

  ```go
  func makeEventTrigger(deviceID uint32, eventCode uint32) *action.Trigger {
    return &action.Trigger{
      DeviceID: deviceID,
      Type: action.TriggerType_TRIGGER_EVENT,
      Event: &action.EventTrigger{
        EventCode: eventCode,
      },
    }
  }

  cardFailTrigger := makeEventTrigger(deviceID, BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD)
  fingerFailTrigger := makeEventTrigger(deviceID, BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER)
  ```

## 3. Make actions

The example shows how to make a relay action. Refer to [ActionType]({{'/api/action' | relative_url}}#ActionType) for available types of actions.

  ```go
  func makeRelayAction(deviceID uint32, relayIndex uint32, signal *action.Signal) *action.Action{
    return &action.Action{
      DeviceID: deviceID,
      Type: action.ActionType_ACTION_RELAY,
      Relay: &action.RelayAction{
        RelayIndex: relayIndex,
        Signal: signal,
      },
    }
  }

  failSignal := &action.Signal{
    Count: FAIL_SIGNAL_COUNT,
    OnDuration: ON_DURATION_MS,
    OffDuration: OFF_DURATION_MS,
  }

  failRelayAction := makeRelayAction(deviceID, RELAY_INDEX, failSignal)
  ```  

## 4. Make TriggerActionConfig

You can configure up to 128 pairs of trigger and action in [TriggerActionConfig]({{'/api/action' | relative_url}}#TriggerActionConfig).

  ```go
  testConfig := &action.TriggerActionConfig{
    TriggerActions: []*action.TriggerActionConfig_TriggerAction{
      &action.TriggerActionConfig_TriggerAction{
        Trigger: cardFailTrigger, Action: failRelayAction,
      },
      &action.TriggerActionConfig_TriggerAction{
        Trigger: fingerFailTrigger, Action: failRelayAction,
      },
    },
  }

  actionSvc.SetConfig(deviceID, testConfig)
  ```  
