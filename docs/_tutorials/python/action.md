---
title: "Trigger & Action API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/action/test/test.py_ as needed.
   
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
    cd example/action/test
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

## 2. Make triggers

You can make [several types of triggers]({{'/api/action' | relative_url}}#TriggerType). The example shows how to make event triggers among these.

  ```python
  cardFailEventTrigger = action_pb2.EventTrigger(eventCode=BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD)
  cardFailTrigger = action_pb2.Trigger(deviceID=deviceID, type=action_pb2.TRIGGER_EVENT, event=cardFailEventTrigger)

  fingerFailEventTrigger = action_pb2.EventTrigger(eventCode=BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER)
  fingerFailTrigger = action_pb2.Trigger(deviceID=deviceID, type=action_pb2.TRIGGER_EVENT, event=fingerFailEventTrigger)
  ```

## 3. Make actions

The example shows how to make a relay action. Refer to [ActionType]({{'/api/action' | relative_url}}#ActionType) for available types of actions.

  ```python
  relaySignal = action_pb2.Signal(count=3, onDuration=500, offDuration=500)
  relayAction = action_pb2.RelayAction(relayIndex=0, signal=relaySignal)
  failAction = action_pb2.Action(deviceID=deviceID, type=action_pb2.ACTION_RELAY, relay=relayAction)
  ```  

## 4. Make TriggerActionConfig

You can configure up to 128 pairs of trigger and action in [TriggerActionConfig]({{'/api/action' | relative_url}}#TriggerActionConfig).

  ```python
  cardTriggerAction = action_pb2.TriggerActionConfig.TriggerAction(trigger=cardFailTrigger, action=failAction)
  fingerTriggerAction = action_pb2.TriggerActionConfig.TriggerAction(trigger=fingerFailTrigger, action=failAction)

  config = action_pb2.TriggerActionConfig(triggerActions=[cardTriggerAction, fingerTriggerAction])
  self.actionSvc.setConfig(deviceID, config)
  ```  
