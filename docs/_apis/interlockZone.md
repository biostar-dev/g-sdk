---
permalink: /api/zone/interlock
title: "Interlock Zone API"
toc_label: "Interlock Zone"  
---

Interlock zone monitors the status of two or more doors to control that one door cannot be opened or closed if other doors are open or unlocked. You can also disable access if a user stays within the zone.

There are several constraints on the configuration of interlock zone.

- An interlock zone can be configured with up to 4 doors.

- Each door should have a door sensor.

- An interlock zone can only set the doors with the devices connected to the CoreStation.

- A door set as an interlock zone cannot be set to another zone other than the fire alarm zone.


## Information

```protobuf
message ZoneInfo {
  uint32 zoneID;
  string name;

  bool disabled;

  repeated uint32 doorIDs;

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

doorIDs
: Maximum 4 doors can be assigned to a zone. Each door should have a door sensor for the CoreStation to check its status. 

[inputs](#Input)
: You can configure up to 4 inputs to detect whether there is a user inside the zone. If a signal is detected on any of these inputs, access will be denied.

[outputs](#Output)
: You can configure up to 8 actions, which will be triggered when the specified events occur. 

```protobuf
message Input {
  uint32 deviceID;
  uint32 port;
  device.SwitchType switchType;
  uint32 duration;
  uint32 operation; // not used
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

```protobuf
message Output {
  uint32 event;
  action.Action;
}
```
{: #Output }

[event]({{'/api/event/' | relative_url}}#EventCode)
: The event type which will trigger the action. For example, if you want to excute an action when an alarm is detected, you can set it to BS2_EVENT_ZONE_INTERLOCK_ALARM(0xA100).

[action]({{'/api/action/' | relative_url}}#Action)
: The action will be executed when the above event occurs.


### Get

Get the interlock zones configured on a CoreStation.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the CoreStation |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| zones | [ZoneInfo[]](#ZoneInfo) | The zones configured on the CoreStation |

### GetStatus

Get the status of zones configured on a CoreStation.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the CoreStation |
| zoneIDs | uint32[] | The IDs of the zones |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| status | [ZoneStatus[]]({{'/api/zone/' | relative_url}}#ZoneStatus) | The status of the zones configured on the CoreStation |  

## Management

### Add

Add zones to a CoreStation.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the CoreStation |
| zones | [ZoneInfo[]](#ZoneInfo) | The zones to be configured on the CoreStation |

### Delete

Delete zones from a CoreStation.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the CoreStation |
| zoneIDs | uint32[] | The IDs of zones to be deleted from the CoreStation |


### DeleteAll

Delete all zones configured on a CoreStation.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the CoreStation |

## Alarm

### SetAlarm

You can set or release the alarm status of zones.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the CoreStation |
| zoneIDs | uint32[] | The IDs of zones whose alarm status will be set |
| alarmed | bool | If true, set the alarm. If false, release the alarm |