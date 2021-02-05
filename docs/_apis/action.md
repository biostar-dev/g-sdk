---
title: "Trigger & Action API"
toc_label: "Trigger & Action"  
---

You can configure what actions should be taken when specific conditions are met. 

## Trigger

A trigger is fired when its specific condition is met. You can configure three types of triggers, ie., __TRIGGER_EVENT__, __TRIGGER_INPUT__, and __TRIGGER_SCHEDULE__.

```protobuf
message Trigger {
  uint32 deviceID; 
  TriggerType type;
  EventTrigger event;
  InputTrigger input;
  ScheduleTrigger schedule;
}
```
{: #Trigger }

deviceID
: The ID of the device. If it is set to 0, it means that the trigger is from the same device where the configuration is written. 

[type](#TriggerType)
: 

[event](#EventTrigger)
: Valid only if the __type__ is __TRIGGER_EVENT__.

[input](#InputTrigger)
: Valid only if the __type__ is __TRIGGER_INPUT__.

[schedule](#ScheduleTrigger)
: Valid only if the __type__ is __TRIGGER_SCHEDULE__.

```protobuf
enum TriggerType {
  TRIGGER_NONE = 0x00;
  TRIGGER_EVENT = 0x01;
  TRIGGER_INPUT = 0x02;
  TRIGGER_SCHEDULE = 0x03;
}
```
{: #TriggerType }

TRIGGER_EVENT
: The trigger is fired when the specified event occurs.

TRIGGER_INPUT
: The trigger is fired when the specified input signal is detected.

TRIGGER_SCHEDULE
: The trigger is fired on the specified schedule.


```protobuf
message EventTrigger {
  uint32 eventCode;
}
```
{: #EventTrigger }

[eventCode]({{'/api/event/' | relative_url}}#EventCode)
: The event type which will trigger the action. 

```protobuf
message InputTrigger {
  uint32 port;
  device.SwitchType switchType;
  uint32 duration;
  uint32 scheduleID;
}
```
{: #InputTrigger }

port
: The index of the port.

[switchType]({{'/api/device/' | relative_url}}#SwitchType)
: The type of the input port.

duration
: The minimum duration for which the signal should be detected in milliseconds. 

scheduleID
: Specify the schedule during which the input port is monitored. If it is 0, the port will be monitored all the time.

```protobuf
message ScheduleTrigger {
  ScheduleTriggerType type;
  uint32 scheduleID;
}
```
{: #ScheduleTrigger }

[type](#ScheduleTriggerType)
: 

scheduleID
: The ID of the schedule which will fire the trigger. 

```protobuf
enum ScheduleTriggerType {
  SCHEDULE_TRIGGER_ON_START = 0x00;
  SCHEDULE_TRIGGER_ON_END = 0x01;
}
```
{: #ScheduleTriggerType }

SCHEDULE_TRIGGER_ON_START
: The trigger is fired on the start time of the schedule.

SCHEDULE_TRIGGER_ON_END
: The trigger is fired on the end time of the schedule.

## Action

You can configure several [types of actions](#ActionType) which will be executed when the specified trigger is fired. 

```protobuf
message Action {
  uint32 deviceID;
  ActionType type;
  StopFlag stopFlag;
  uint32 delay;

  RelayAction relay;
  OutputPortAction outputPort;
  DisplayAction display;
  SoundAction sound;
  LEDAction LED;
  BuzzerAction buzzer;
  LiftAction lift;
}
```
{: #Action }

deviceID
: The ID of the device. If it is set to 0, it means that the action is on the same device where the configuration is written. 

[type](#ActionType)
: 

[stopFlag](#StopFlag)
: Specify when the action is stopped on a door.

delay
: The action will be taken after this delay in milliseconds. 

[relay](#RelayAction)
: Valid only if the __type__ is __ACTION_RELAY__.

[outputPort](#OutputPortAction)
: Valid only if the __type__ is __ACTION_TTL__. Not yet supported.

[display](#DisplayAction)
: Valid only if the __type__ is __ACTION_DISPLAY__. Not yet supported. 

[sound](#SoundAction)
: Valid only if the __type__ is __ACTION_SOUND__.

[LED](#LEDAction)
: Valid only if the __type__ is __ACTION_LED__.

[buzzer](#BuzzerAction)
: Valid only if the __type__ is __ACTION_BUZZER__.

[lift](#LiftAction)
: Valid only if the __type__ is __ACTION_LIFT__.

```protobuf
enum ActionType {
  ACTION_NONE = 0x00;

  ACTION_LOCK_DEVICE = 0x01;
  ACTION_UNLOCK_DEVICE = 0x02;
  ACTION_REBOOT_DEVICE = 0x03;
  ACTION_RELEASE_ALARM = 0x04;
  ACTION_GENERAL_INPUT = 0x05;

  ACTION_RELAY = 0x06;
  ACTION_TTL = 0x07;
  ACTION_SOUND = 0x08;
  ACTION_DISPLAY = 0x09;
  ACTION_BUZZER = 0x0A;
  ACTION_LED = 0x0B;

  ACTION_FIRE_ALARM_INPUT = 0x0C;

  ACTION_AUTH_SUCCESS = 0x0D;
  ACTION_AUTH_FAIL = 0x0E;

  ACTION_LIFT = 0x0F;
}
```
{: #ActionType }

ACTION_LOCK_DEVICE
: Lock the device.

ACTION_UNLOCK_DEVICE
: Unlock the device.

ACTION_REBOOT_DEVICE
: Reboot the device.

ACTION_RELEASE_ALARM
: Release all the alarms on the device.

ACTION_GENERAL_INPUT
: Not yet supported.

ACTION_RELAY
: Activate a relay with the specified pattern. 

ACTION_TTL
: Not yet supported.

ACTION_SOUND
: Play the specified sound.

ACTION_DISPLAY
: Not yet supported.

ACTION_BUZZER
: Play the buzzer with the specified pattern. 

ACTION_LED
: Enable the LEDs with the specified pattern. 

ACTION_FIRE_ALARM_INPUT
: Not yet supported.

ACTION_AUTH_SUCCESS
: Play the same action as authentication succeeds. 

ACTION_AUTH_FAIL
: Play the same action as authentication fails.

ACTION_LIFT
: Activate or deactivate the lift.

```protobuf
enum StopFlag {
  STOP_NONE = 0x00;
  STOP_ON_DOOR_CLOSED = 0x01;	
  STOP_BY_CMD_RUN_ACTION = 0x02;
}
```
{: #StopFlag }

STOP_ON_DOOR_CLOSED
: The action will be stopped when the door is closed. 

STOP_BY_CMD_RUN_ACTION
: If __Action.stopFlag__ is __STOP_BY_CMD_RUN_ACTION__, it will stop the specified action.

```protobuf
message RelayAction {
  uint32 relayIndex;
  Signal signal;
}
```
{: #RelayAction }

relayIndex
: The index of the relay to be activated.

[signal](#Signal)
: The signal to be emitted on the relay. 

```protobuf
message Signal {
  uint32 signalID;
  uint32 count;
  uint32 onDuration;
  uint32 offDuration;
  uint32 delay;
}
```
{: #Signal }

signalID
: The index of the signal. It can be used for managing signals in your application.

count
: The number of pulses.

onDuration
: The duration of activation in a pulse. In milliseconds.

offDuration
: The duration of deactivation in a pulse. In milliseconds.

delay
: The starting delay of the signal in milliseconds. 

```protobuf
message SoundAction {
  uint32 count;
  uint32 soundIndex;
  uint32 delay;
}
```
{: #SoundAction }

count
: The number of repeats. 

[soundIndex]({{'/api/display/' | relative_url}}#SoundIndex)
: The index of the sound to be played. 

delay
: The starting delay of the sound in milliseconds. 

```protobuf
message LEDAction {
  repeated LEDSignal signals;
}
```
{: #LEDAction }

[signals](#LEDSignal)
: The signals to be emitted on the LEDs.

```protobuf
message LEDSignal {
  device.LEDColor color;
  uint32 duration;
  uint32 delay;
}
```
{: #LEDSignal }

[color]({{'/api/device/' | relative_url}}#LEDColor)
: The color of the LED signal.

duration
: The duration in milliseconds.

delay
: The starting delay in milliseconds. 

```protobuf
message BuzzerAction {
  repeated BuzzerSignal signals;
}
```
{: #BuzzerAction }

[signals](#BuzzerSignal)
: The signals to be played on the buzzer.

```protobuf
message BuzzerSignal {
  device.BuzzerTone tone;
  bool fadeout;
  uint32 duration;
  uint32 delay;
}
```
{: #BuzzerSignal }

[tone]({{'/api/device/' | relative_url}}#BuzzerTone)
: The tone index of the buzzer signal.

fadeout
: If true, the buzzer sound will fade out.

duration
: The duration of buzzer in milliseconds.

delay
: The starting delay in milliseconds. 

```protobuf
message LiftAction {
  uint32 liftID;
  LiftActionType type;
}
```
{: #LiftAction }

liftID
: The ID of the lift.

[type](#LiftActionType)
: The action to be executed on the lift.

```protobuf
enum LiftActionType {
  LIFT_ACTION_ACTIVATE_FLOORS;
  LIFT_ACTION_DEACTIVATE_FLOORS;
  LIFT_ACTION_RELEASE_FLOORS;
}
```
{: #LiftActionType }

LIFT_ACTION_ACTIVATE_FLOORS
: Activate the floors of the lift.

LIFT_ACTION_DEACTIVATE_FLOORS
: Deactivate the floors of the lift.

LIFT_ACTION_RELEASE_FLOORS
: Reset the flags of the lift.


## Config

```protobuf
message TriggerActionConfig {
  repeated TriggerAction triggerActions;
}
```
{: #TriggerActionConfig }

[triggerActions](#TriggerAction)
: Up to 128 trigger and action pairs can be stored on a device.

```protobuf
message TriggerAction {
  Trigger trigger;
  Action action;
}
```
{: #TriggerAction }

[trigger](#Trigger)
: 

[action](#Action)
: 


### GetConfig

Get the trigger & action configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [TriggerActionConfig](#TriggerActionConfig) | The trigger & action configuration of the device |

### SetConfig

Change the trigger & action configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [TriggerActionConfig](#TriggerActionConfig) | The trigger & action configuration to be written to the device |

### SetConfigMulti

Change the trigger & action configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [TriggerActionConfig](#TriggerActionConfig) | The trigger & action configuration to be written to the devices |

