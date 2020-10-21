---
permalink: /api/zone/apb
title: "Anti Passback Zone API"
toc_label: "Anti Passback Zone"  
---

Anti passback zone is used to prevent users from passing their credentials back to a second person to enter an area. An anti passback zone consists of multiple members, each of which is either of type __ENTRY__ or __EXIT__. If you enter the zone through an __ENTRY__ device, you have to exit it first through a __EXIT__ device before reentering. 

## Information

```protobuf
message ZoneInfo {
  uint32 zoneID;
  string name;

  Type type;
  bool disabled;
  bool alarmed;
  uint32 resetDuration;

  repeated Member members;
  repeated action.Action actions;
  repeated uint32 bypassGroupIDs;
}
```
{: #ZoneInfo }
zoneID
: The ID of the zone.

name
: Maximum 48 characters in UTF-8 encoding.

[type](#Type)
: If it is __HARD__ and the anti passback rule is violated, access will be denied with a violation log record. With __SOFT__, the device will write a violation log record, but allow access to the user. 

disabled
: If true, the anti passback rule will not be applied. 

alarmed
: Indicate whether any alarm is detected in the zone.

resetDuration
: The duration in seconds after which the anti passback status will be reset. For example, if it is set to 3600, a credential can be used again at the same device after one hour. If it is 0, it means that the anti passback status will not be cleared. 

You can still clear the anti passback status of users manually with [Clear](#clear) or [ClearAll](#clearall).
{: .notice--info}

[members](#Member)
: An anti passback zone should have at least two members of different [ReaderType](#ReaderType).

[actions]({{'/api/action/' | relative_url}}#Action)
: You can configure up to 5 actions to be triggered when a user violates the anti passback rule.

bypassGroupIDs
: The IDs of [access groups]({{'/api/access/' | relative_url}}#AccessGroup), users of which will not be affected by the anti passback rule. Maximum group is 16.

```protobuf
enum Type {
  HARD = 0x00;
  SOFT = 0x01;
}
```
{: #Type }
HARD
: When violated, access will be denied with a violation log record.

SOFT
: Even if violated, access will be allowed. However, a violation log record will be written.

```protobuf
message Member {
  uint32 deviceID;
  ReaderType readerType;
}
```
{: #Member }

deviceID
: The ID of the device.

[readerType](#ReaderType)
: The type of the device. 

```protobuf
enum ReaderType {
  ENTRY = 0x00;
  EXIT = 0x01;
}
```
{: #ReaderType }
ENTRY
: The device is used for entering the zone.

EXIT
: The device is used for exiting the zone. 

### Get

Get the anti passback zones configured on a device.

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

### Clear

You can reset the anti passback status of specified users to grant them access before [ZoneInfo.resetDuration](#ZoneInfo).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneID | uint32 | The ID of the zone |
| userIDs | string[] | The IDs of users whose status will be cleared |

### ClearAll

Reset the anti passback status of all users. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneID | uint32 | The ID of the zone |

## Alarm

### SetAlarm

You can set or release the alarm status of zones.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneIDs | uint32[] | The IDs of zones whose alarm status will be set |
| alarmed | bool | If true, set the alarm. If false, release the alarm |