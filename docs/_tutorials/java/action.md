---
title: "Trigger & Action API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/action/test/ActionTest.java_ as needed.
   
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
    ./build/install/java/bin/actionTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Make triggers

You can make [several types of triggers]({{'/api/action' | relative_url}}#TriggerType). The example shows how to make event triggers among these.

  ```java
  EventTrigger cardFailEventTrigger = EventTrigger.newBuilder().setEventCode(BS2_EVENT_VERIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_CARD).build();
  Trigger cardFailTrigger = Trigger.newBuilder().setDeviceID(deviceID).setType(TriggerType.TRIGGER_EVENT).setEvent(cardFailEventTrigger).build();

  EventTrigger fingerFailEventTrigger = EventTrigger.newBuilder().setEventCode(BS2_EVENT_IDENTIFY_FAIL | BS2_SUB_EVENT_CREDENTIAL_FINGER).build();
  Trigger fingerFailTrigger = Trigger.newBuilder().setDeviceID(deviceID).setType(TriggerType.TRIGGER_EVENT).setEvent(fingerFailEventTrigger).build();
  ```

## 3. Make actions

The example shows how to make a relay action. Refer to [ActionType]({{'/api/action' | relative_url}}#ActionType) for available types of actions.

  ```java
  Signal failSignal = Signal.newBuilder().setCount(FAIL_SIGNAL_COUNT).setOnDuration(ON_DURATION_MS).setOffDuration(OFF_DURATION_MS).build();
  RelayAction failRelayAction = RelayAction.newBuilder().setRelayIndex(RELAY_INDEX).setSignal(failSignal).build();
  Action failAction = Action.newBuilder().setDeviceID(deviceID).setType(ActionType.ACTION_RELAY).setRelay(failRelayAction).build();
  ```  

## 4. Make TriggerActionConfig

You can configure up to 128 pairs of trigger and action in [TriggerActionConfig]({{'/api/action' | relative_url}}#TriggerActionConfig).

  ```java
  ArrayList<TriggerAction> triggerActions = new ArrayList<TriggerAction>();
  triggerActions.add(TriggerAction.newBuilder().setTrigger(cardFailTrigger).setAction(failAction).build());
  triggerActions.add(TriggerAction.newBuilder().setTrigger(fingerFailTrigger).setAction(failAction).build());

  TriggerActionConfig config = TriggerActionConfig.newBuilder().addAllTriggerActions(triggerActions).build();
  actionSvc.setConfig(deviceID, config);
  ```  

