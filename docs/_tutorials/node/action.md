---
title: "Trigger & Action API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/action/test/test.js_ as needed.
   
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
    cd example/action/test
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

## 2. Make triggers

You can make [several types of triggers]({{'/api/action' | relative_url}}#TriggerType). The example shows how to make event triggers among these.

  ```javascript
  const cardFailEventTrigger = new action.actionMessage.EventTrigger();
  cardFailEventTrigger.setEventcode(BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD);

  const cardFailTrigger = new action.actionMessage.Trigger();
  cardFailTrigger.setDeviceid(devID);
  cardFailTrigger.setType(action.actionMessage.TriggerType.TRIGGER_EVENT);
  cardFailTrigger.setEvent(cardFailEventTrigger);

  const fingerFailEventTrigger = new action.actionMessage.EventTrigger();
  fingerFailEventTrigger.setEventcode(BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER);

  const fingerFailTrigger = new action.actionMessage.Trigger();
  fingerFailTrigger.setDeviceid(devID);
  fingerFailTrigger.setType(action.actionMessage.TriggerType.TRIGGER_EVENT);
  fingerFailTrigger.setEvent(fingerFailEventTrigger);  
  ```

## 3. Make actions

The example shows how to make a relay action. Refer to [ActionType]({{'/api/action' | relative_url}}#ActionType) for available types of actions.

  ```javascript
  const relaySignal = new action.actionMessage.Signal();
  relaySignal.setCount(3);
  relaySignal.setOnduration(500);
  relaySignal.setOffduration(500);

  const relayAction = new action.actionMessage.RelayAction();
  relayAction.setRelayindex(0); // 1st relay
  relayAction.setSignal(relaySignal);

  const failAction = new action.actionMessage.Action();
  failAction.setDeviceid(devID);
  failAction.setType(action.actionMessage.ActionType.ACTION_RELAY);
  failAction.setRelay(relayAction);  
  ```  

## 4. Make TriggerActionConfig

You can configure up to 128 pairs of trigger and action in [TriggerActionConfig]({{'/api/action' | relative_url}}#TriggerActionConfig).

  ```javascript
  const cardTriggerAction = new action.actionMessage.TriggerActionConfig.TriggerAction();
  cardTriggerAction.setTrigger(cardFailTrigger);
  cardTriggerAction.setAction(failAction);

  const fingerTriggerAction = new action.actionMessage.TriggerActionConfig.TriggerAction();
  fingerTriggerAction.setTrigger(fingerFailTrigger);
  fingerTriggerAction.setAction(failAction);

  const config = new action.actionMessage.TriggerActionConfig();
  config.addTriggeractions(cardTriggerAction);
  config.addTriggeractions(fingerTriggerAction);

  await action.setConfig(devID, config);
  ```  
