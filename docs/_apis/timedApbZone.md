---
permalink: /api/zone/timed
title: "Timed Anti Passback Zone API"
toc_label: "Timed Anti Passback Zone"  
---

In a timed anti passback zone, a credential can be used at the same device again only after a designated amount of time. 


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
: If it is __HARD__ and the timed anti passback rule is violated, access will be denied with a violation log record. With __SOFT__, the device will write a violation log record, but allow access to the user. 

disabled
: If true, the timed anti passback rule will not be applied. 

alarmed
: Indicate whether any alarm is detected in the zone.

resetDuration
: The duration in seconds after which a credential can be used again at the same device. 

[members](#Member)
: A timed anti passback zone consists of one or more devices. 

[actions]({{'/api/action/' | relative_url}}#Action)
: You can configure up to 5 actions to be triggered when a user violates the timed anti passback rule.

bypassGroupIDs
: The IDs of [access groups]({{'/api/access/' | relative_url}}#AccessGroup), users of which will not be affected by the timed anti passback rule. Maximum group is 16.

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
}
```
{: #Member }

deviceID
: The ID of the device.

### Get

Get the timed anti passback zones configured on a device.

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

You can reset the status of specified users to grant them access before [ZoneInfo.resetDuration](#ZoneInfo).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| zoneID | uint32 | The ID of the zone |
| userIDs | string[] | The IDs of users whose status will be cleared |

### ClearAll

Reset the status of all users. 

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