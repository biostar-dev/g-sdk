---
permalink: /api/zone/lock
title: "Scheduled Lock Zone API"
toc_label: "Schedule Lock Zone"  
---

You can keep doors locked or unlocked according to the specified schedules. 

## Information

```protobuf
message ZoneInfo {
  uint32 zoneID;
  string name;

  uint32 lockScheduleID;
  uint32 unlockScheduleID;

  bool bidirectionalLock;

  bool disabled;
  bool alarmed;

  repeated uint32 doorIDs;
  repeated action.Action actions;
  repeated uint32 bypassGroupIDs;
  repeated uint32 unlockGroupIDs;
}
```
{: #ZoneInfo }
zoneID
: The ID of the zone.

name
: Maximum 48 characters in UTF-8 encoding.

lockScheduleID
: The ID of the [schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo) for which the doors are locked. If you want the doors unlocked, set to 0.

unlockScheduleID
: The ID of the [schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo) for which the doors are unlocked. If you want the doors locked, set to 0.

You have to set only one of __lockScheduleID__ and __unlockScheduleID__. 
{: .notice--warning}

bidirectionalLock
: If true and a door has both ENTRY and EXIT devices, lock both devices for the lock schedule. Otherwise, lock only the ENTRY device.

disabled
: Indicate whether the zone is disabled.

alarmed
: Indicate whether any alarm is detected in the zone.

doorIDs
: Maximum 32 doors can be assigned to a zone.

[actions]({{'/api/action/' | relative_url}}#Action)
: You can configure up to 5 actions to be triggered when an alarm is detected in the zone.

bypassGroupIDs
: The IDs of [access groups]({{'/api/access/' | relative_url}}#AccessGroup), users of which can enter the doors even when they are locked by the schedule. Maximum group is 16.

unlockGroupIDs
: The IDs of [access groups]({{'/api/access/' | relative_url}}#AccessGroup), users of which can start the unlock period of the doors. If it is not assigned, the doors will be unlocked according to the schedule. However, if it is assigned, a user of these groups should authenticate first for the doors to be unlocked according to the schedule.

### Get

Get the scheduled lock zones configured on a device.

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