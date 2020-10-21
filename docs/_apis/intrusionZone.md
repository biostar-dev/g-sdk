---
permalink: /api/zone/intrusion
title: "Intrusion Alarm Zone API"
toc_label: "Intrusion Alarm Zone"  
---

Intrusion alarm zone is used to detect trespassing of unauthorized users to an armed area without permission. It consists of multiple doors, devices for arming/disarming the zone, and input points to detect any trespassing. 

## Information

```protobuf
message ZoneInfo {
  uint32 zoneID;
  string name;

  bool disabled;
  uint32 armDelay;
  uint32 alarmDelay;

  repeated uint32 doorIDs;
  repeated uint32 groupIDs;

  repeated card.CSNCardData cards;
  repeated Member members;
  repeated Input inputs;
  repeated Output outputs;
}
```
{: #ZoneInfo }
zoneID
: The ID of the zone.

name
: Maximum 48 characters in UTF-8 encoding.

disabled
: Indicate whether the zone is disabled.

armDelay
: The delay in seconds before arming a zone for the last user to exit it. 

alarmDelay
: The delay in seconds before setting an alarm when detecting trespassing. 

doorIDs
: The IDs of doors which are the main components of an intrusion alarm zone. 

groupIDs
: The IDs of access groups. Only the members of these groups can arm or disarm the zone.

cards
: You can enroll up to 128 cards, which can be used for arming or disarming the zone.

[members](#Member)
: You can assign up to 128 devices, which can be used for arming or disarming the zone. For example, if __Member.input__ is INPUT_CARD and __Member.operation__ is OPERATION_ARM, you can arm the zone by placing a card in __ZoneInfo.cards__ on the device.

[inputs](#Input)
: You can assign up to 128 input ports, which can be used for arming or disarming the zone. For example, if __Input.operation__ is OPERATION_DISARM, the zone will be disarmed when a signal is detected on the port. You can also use input ports to detect or clear alarms. For example, if __Input.operation__ is OPERATION_ALARM, an alarm will be generated when a signal is detected on the port.

[outputs](#Output)
: You can configure up to 128 actions, which will be triggered when the specified events occur. 

```protobuf
message Member {
  uint32 deviceID;
  uint32 input;
  uint32 operation;
}
```
{: #Member }

deviceID
: The ID of the device.

[input](#InputType)
: The input type of the device.

[operation](#OperationType)
: The operation type of the device. 

```protobuf
enum InputType {
  INPUT_NONE = 0x00;
  INPUT_CARD = 0x01;
  INPUT_KEY = 0x02;
  INPUT_ALL = 0xFF;	  
}
```
{: #InputType}
INPUT_CARD
: To arm or disarm a zone, you have to use one of the cards enrolled in __ZoneInfo.cards__.

INPUT_KEY
: To arm or disarm a zone, you have to press a designated key of the device. It is only supported by the devices with a keypad.

INPUT_ALL
: Both cards and keys are allowed.

```protobuf
enum OperationType {
  OPERATION_NONE = 0x00;
  OPERATION_ARM = 0x01;
  OPERATION_DISARM = 0x02;
  OPERATION_TOGGLE = 0x03;
  OPERATION_ALARM = 0x04;
  OPERATION_CLEAR_ALARM = 0x08;  
}
```
{: #OperationType}
OPERATION_ARM
: The device or the input port is used for arming the zone.

OPERATION_DISARM
: The device or the input port is used for disarming the zone.

OPERATION_TOGGLE
: The device or the input port is used for arming/disarming the zone. The operation will toggle each time.

OPERATION_ALARM
: The input port is used for detecting trespassing.

OPERATION_CLEAR_ALARM
: The input port is used for clearing alarms.

```protobuf
message Input {
  uint32 deviceID;
  uint32 port;
  device.SwitchType switchType;
  uint32 duration;
  uint32 operation;
}
```
{: #Input }

deviceID
: The ID of the device.

port
: The index of the input port.

[switchType]({{'/api/device/' | relative_url}}#SwitchType)
: The type of the input port.

duration
: The minimum duration for which the signal should be detected in milliseconds. 

[operation](#OperationType)
: The operation type of the input port.

```protobuf
message Output {
  uint32 event;
  action.Action;
}
```
{: #Output }

[event]({{'/api/event/' | relative_url}}#EventCode)
: The event type which will trigger the action. For example, if you want to execute an action when an alarm is detected, you can set it to BS2_EVENT_ZONE_INTRUSION_ALARM_VIOLATION(0x9000).

[action]({{'/api/action/' | relative_url}}#Action)
: The action will be executed when the above event occurs.


### Get

Get the intrusion alarm zones configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| zones | [ZoneInfo[]](#ZoneInfo) | The zones configured on the device |


### GetStatus

Get the status of zones configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneIDs | uint32[] | The IDs of the zones |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| status | [ZoneStatus[]]({{'/api/zone/' | relative_url}}#ZoneStatus) | The status of the zones configured on the device |  

## Management

### Add

Add zones to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zones | [ZoneInfo[]](#ZoneInfo) | The zones to be configured on the device |

### Delete

Delete zones from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneIDs | uint32[] | The IDs of zones to be deleted from the device |


### DeleteAll

Delete all zones configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

## Alarm

### SetArm

You can manually arm or disarm a zone.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneIDs | uint32[] | The IDs of zones |
| armed | bool | If true, arm the zones. If false, disarm the zones |

### SetAlarm

You can set or release the alarm status of zones.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneIDs | uint32[] | The IDs of zones whose alarm status will be set |
| alarmed | bool | If true, set the alarm. If false, release the alarm |