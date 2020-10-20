---
title: "Access Group API"
toc_label: "Access Group"  
---

## Access group

An access group consists of access levels, which specify the accessible doors for specific schedules. Each user can belong to maximum 16 access groups. To assign access groups to users, you have to do the followings;

1. Make [schedules]({{'/api/schedule/' | relative_url}}#ScheduleInfo).
2. Make [doors]({{'/api/door/' | relative_url}}#DoorInfo).
3. Make [access levels](#access-level) using the schedules and doors.
4. Make [access groups](#access-group) using the access levels.
5. Assign access groups to users using [User.SetAccessGroup]({{'/api/user/' | relative_url}}#setaccessgroup) or [User.SetAccessGroupMulti]({{'/api/user/' | relative_url}}#setaccessgroupmulti).

In addition to doors, you can use access groups to limit access to specific floors in a lift. In this case, floor levels, which specify the accessible floors for specific schedules, should be defined.

```protobuf
message AccessGroup {
  uint32 ID;
  string name;
  repeated uint32 levelIDs;
}
```
{: #AccessGroup }
ID
: The ID of the access group.

You cannot assign 0 as an ID because it is reserved internally.
{: .notice--warning}

name
: Maximum 48 characters in UTF-8 encoding.

levelIDs
: The IDs of access levels or floor levels. The ID of an access level should be less than 32768, while it should be 32768 or more for a floor level. Each access group can have up to 128 levels.

### GetList
Get access groups stored on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| groups | [AccessGroup[]](#AccessGroup) | The access groups stored on the device |

### Add
Add access groups to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| groups | [AccessGroup[]](#AccessGroup) | The access groups to be added to the device |

### AddMulti
Add access groups to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| groups | [AccessGroup[]](#AccessGroup) | The access groups to be added to the devices |

### Delete
Delete access groups from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| groupIDs | uint32[] | The IDs of the groups to be deleted from the device |

### DeleteMulti

Delete access groups from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| groupIDs | uint32[] | The IDs of the groups to be deleted from the devices |

### DeleteAll

Delete all access groups from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DeleteAllMulti

Delete all access groups from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |

## Access level

An access level specifies which doors are accessible for specific schedules. 

```protobuf
message AccessLevel {
  uint32 ID;
  string name;
  repeated DoorSchedule doorSchedules;
}
```
{: #AccessLevel }

ID
: The ID of the access level. It should be less than 32768.

name
: Maximum 48 characters in UTF-8 encoding.

[doorSchedules](#DoorSchedule)
: A door schedule specifies when a door is accessible. An access level can have up to 128 door schedules.

```protobuf
message DoorSchedule {
  uint32 doorID;
  uint32 scheduleID;
}
```
{: #DoorSchedule }

doorID
: The ID of a [door]({{'/api/door/' | relative_url}}#DoorInfo).

scheduleID
: The ID of a [schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo).


### GetLevelList

Get access levels stored on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| levels | [AccessLevel[]](#AccessLevel) | The access levels stored on the device  |

### AddLevel

Add access levels to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| levels | [AccessLevel[]](#AccessLevel) | The access levels to be added to the device |

### AddLevelMulti

Add access levels to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| levels | [AccessLevel[]](#AccessLevel) | The access levels to be added to the devices |

### DeleteLevel

Delete access levels from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| levelIDs | uint32[] | The IDs of the levels to be deleted from the device |

### DeleteLevelMulti

Delete access levels from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| levelIDs | uint32[] | The IDs of the levels to be deleted from the devices |

### DeleteAllLevel

Delete all access levels from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DeleteAllLevelMulti

Delete all access levels from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |


## Floor level

A floor level specifies which floors are accessible for specific schedules. 

```protobuf
message FloorLevel {
  uint32 ID;
  string name;
  repeated FloorSchedule floorSchedules;
}
```
{: #FloorLevel }

ID
: The ID of the floor level. It should be equal to or greater than 32768.

name
: Maximum 48 characters in UTF-8 encoding.

[floorSchedules](#FloorSchedule)
: A floor schedule specifies when a floor of a lift is accessible. A floor level can have up to 128 floor schedules.

```protobuf
message FloorSchedule {
  uint32 liftID;
  uint32 floorIndex;
  uint32 scheduleID;
}
```
{: #FloorSchedule }

liftID
: The ID of a [lift]({{'/api/lift/' | relative_url}}#LiftInfo).

floorIndex
: The index of a floor in the lift.

scheduleID
: The ID of a [schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo).


### GetFloorLevelList

Get floor levels stored on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| levels | [FloorLevel[]](#FloorLevel) | The floor levels stored on the device  |

### AddFloorLevel

Add floor levels to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| levels | [FloorLevel[]](#FloorLevel) | The floor levels to be added to the device |

### AddFloorLevelMulti

Add floor levels to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| levels | [FloorLevel[]](#FloorLevel) | The floor levels to be added to the devices |

### DeleteFloorLevel

Delete floor levels from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| levelIDs | uint32[] | The IDs of the levels to be deleted from the device |

### DeleteFloorLevelMulti

Delete floor levels from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| levelIDs | uint32[] | The IDs of the levels to be deleted from the devices |

### DeleteAllFloorLevel

Delete all floor levels from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DeleteAllFloorLevelMulti

Delete all floor levels from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
