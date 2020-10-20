---
permalink: /api/zone/fire
title: "Fire Alarm Zone API"
toc_label: "Fire Alarm Zone"  
---

A fire alarm zone consists of multiple doors and sensors to detect emergencies. When a fire is detected, all the doors will be unlocked automatically. 

## Information

```protobuf
message ZoneInfo {
  uint32 zoneID;
  string name;

  bool disabled;
  bool alarmed;

  repeated uint32 doorIDs;
  repeated FireSensor sensors;
  repeated action.Action actions;
}
```
{: #ZoneInfo }
zoneID
: The ID of the zone.

name
: Maximum 48 characters in UTF-8 encoding.

disabled
: Indicate whether the zone is disabled.

alarmed
: Indicate whether any alarm is detected in the zone.

doorIDs
: The IDs of doors which will be unlocked when a fire is detected. 

[sensors](#FireSensor)
: You can configure up to 8 sensors to detect a fire. 

[actions]({{'/api/action/' | relative_url}}#Action)
: You can configure up to 5 actions to be triggered when a fire is detected.


```protobuf
message FireSensor {
  uint32 deviceID;
  uint32 port;
  device.SwitchType type;
  uint32 duration;
}
```
{: #FireSensor }

deviceID
: The ID of the device.

port
: The index of the input port.

[switchType]({{'/api/device/' | relative_url}}#SwitchType)
: The type of the sensor.

duration
: The minimum duration for which the signal should be detected in milliseconds. 

### Get

Get the fire alarm zones configured on a device.

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

### SetAlarm

You can set or release the alarm status of zones.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneIDs | uint32[] | The IDs of zones whose alarm status will be set |
| alarmed | bool | If true, set the alarm. If false, release the alarm |