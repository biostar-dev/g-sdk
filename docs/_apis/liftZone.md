---
permalink: /api/zone/lift
title: "Lift Zone API"
toc_label: "Lift Zone"  
---

You can keep floors of a lift activated or deactivated according to the specified schedules. 

## Information

```protobuf
message ZoneInfo {
  uint32 zoneID;
  string name;

  uint32 activateScheduleID;
  uint32 deactivateScheduleID;

  bool disabled;
  bool alarmed;

  repeated Lift lifts;

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

activateScheduleID
: The ID of the [schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo) for which the floors are activated. If you want the floors deactivated, set to 0.

deactivateScheduleID
: The ID of the [schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo) for which the floors are deactivated. If you want the floors activated, set to 0.

You have to set only one of __activateScheduleID__ and __deactivateScheduleID__. 
{: .notice--warning}

disabled
: Indicate whether the zone is disabled.

alarmed
: Indicate whether any alarm is detected in the zone.

[lifts](#Lift)
: Maximum 32 lifts can be assigned to a zone.

[actions]({{'/api/action/' | relative_url}}#Action)
: You can configure up to 5 actions to be triggered when an alarm is detected in the zone.

bypassGroupIDs
: The IDs of [access groups]({{'/api/access/' | relative_url}}#AccessGroup), users of which can use the lifts even when they are deactivated by the schedule. Maximum group is 16.

unlockGroupIDs
: The IDs of [access groups]({{'/api/access/' | relative_url}}#AccessGroup), users of which can start the activated period of the lifts. If it is not assigned, the lifts will be activated according to the schedule. However, if it is assigned, a user of these groups should authenticate first for the lifts to be activated according to the schedule.

```protobuf
message Lift {
  uint32 liftID;
  repeated uint32 floorIndexes;
}
```
{: #Lift }
liftID
: The ID of the lift.

floorIndexes
: Maximum 256 floors can be assigned.

### Get

Get the lift zones configured on a device.

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