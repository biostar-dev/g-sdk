---
title: "Lift API"
toc_label: "Lift"  
---

[OM-120](https://www.supremainc.com/en/hardware/pd_om-120.asp) is an output extension module which controls up to 12 output relays. It can be used as an elevator controller. Maximum 31 units can be connected to a master device via RS485. Refer to [the article](http://kb.supremainc.com/knowledge/doku.php?id=en:tc_appnote_om120_elevator_configuration) for examples. 


## Information

```protobuf
message LiftInfo {
  uint32 liftID;
  string name;

  repeated uint32 deviceIDs;

  uint32 activateTimeout;
  uint32 dualAuthTimeout;

  DualAuthApprovalType dualAuthApproval;
  repeated uint32 dualAuthRequiredDeviceIDs;
  uint32 dualAuthScheduleID;

  repeated Floor floors;

  repeated uint32 dualAuthApprovalGroupIDs;

  repeated Alarm alarms;
  uint32 alarmFlags;

  Alarm tamper;
  bool tamperOn;
}
```
{: #LiftInfo }

liftID
: The ID of the lift. 

name
: Maximum 48 characters in UTF-8 encoding.

deviceIDs
: The ID of the devices connected to the lift. Maximum 4 devices can be connected to a lift.

[floors](#Floor)
: Maximum 192 floors can be configured in a lift. 

There must be one relay per each floor. So, you cannot set 0 to [Floor.deviceID](#Floor).
{: .notice--warning}

activateTimeout
: The lift door will be closed after __activateTimeout__ seconds.

dualAuthTimeout
: If __DualAuthApprovalType__ is LAST_ON_LIFT, the second user should authenticate within __dualAuthTimeout__ seconds after the first user. 

[dualAuthApproval](#DualAuthApprovalType)
: If it is __LAST_ON_LIFT__, the second user belonging to __dualAuthApprovalGroupIDs__ should authenticate after the first user within __dualAuthTimeout__. If it is __NONE_ON_LIFT__, dual authentication is not needed.
{: #DualAuth }

dualAuthRequiredDeviceIDs
: Specify the devices to which the dual authentication will be applied.

dualAuthScheduleID
: Specify the schedule during which the dual authentication is applied. 

dualAuthApprovalGroupIDs
: If __dualAuthApproval__ is __LAST_ON_LIFT__, a user belonging to these groups should authenticate after the first user.

[alarms](#Alarm)
: You can configure two lift sensors and the corresponding actions to them. 

[alarmFlags](#AlarmFlag)
: Indicate the alarm status of the lift. For example, if it is FIRST \| TAMPER, it means that the first sensor and the tamper switch are detected.

[tamper](#Alarm)
: You can configure the tamper switch and its corresponding action.

tamperOn
: Indicate whether the tamper switch is on.


```protobuf
enum DualAuthApprovalType {
  NONE_ON_LIFT = 0x00;
  LAST_ON_LIFT = 0x01;
};
```
{: #DualAuthApprovalType }


```protobuf
message Floor {
  uint32 deviceID;
  uint32 port;
  FloorStatus status;
}
```
{: #Floor }

deviceID
: The ID of the device which controls the floor.

port
: The index of the relay of the device.

[status](#FloorStatus)
: The current status of the floor.

```protobuf
message FloorStatus {
  bool activated;
  uint32 activateFlags;
  uint32 deactivateFlags;
}
```
{: #FloorStatus }

activated
: True if the floor is activated.

activateFlags
: Indicate how the floor is activated. See [FloorFlag](#FloorFlag) for available values.

deactivateFlags
: Indicate how the floor is deactivated. See [FloorFlag](#FloorFlag) for available values.

```protobuf
enum FloorFlag {
  NONE = 0x00; 
  SCHEDULED = 0x01;
  EMERGENCY = 0x02;
  OPERATOR = 0x04;
}
```
{: #FloorFlag }

Each flag has a different priority. The order of priorities are EMERGENCY > OPERATOR > SCHEDULED > NONE.

NONE
: The floor is activated/deactivated by normal operations. 

SCHEDULED
: The floor is activated/deactivated by Scheduled Lock/Unlock zones. 

EMERGENCY
: The floor is activated/deactivated by Fire Alarm Zone or Intrusion Alarm Zone. 

OPERATOR
: The floor is activated/deactivated by operators. 

```protobuf
message Alarm {
  Sensor sensor; 
  action.Action action;
}
```
{: #Alarm }

[sensor](#Sensor)
: The lift sensor to detect an alarm status.

[action]({{'/api/action/' | relative_url}}#action)
: The action te be triggered when the sensor detects an alarm

```protobuf
message Sensor {
  uint32 deviceID;
  uint32 port;
  device.SwitchType type;
  uint32 duration;
  uint32 scheduleID;
}
```
{: #Alarm }

deviceID
: The ID of the device

port
: The input index of the sensor.

[type]({{'/api/device/' | relative_url}}#SwitchType)
: The type of the sensor.

duration
: The minimum duration for which the signal should be detected in milliseconds.

scheduleID
: Specify the schedule during which the sensor is monitored. If it is 0, the port will be monitored all the time.

```protobuf
enum AlarmFlag {
  NO_ALARM = 0x00; 
  FIRST = 0x01;
  SECOND = 0x02;
  TAMPER = 0x04;
}
```
{: #AlarmFlag }

NO_ALARM
: No alarm is detected.

FIRST
: The first sensor detects an alarm status.

SECOND
: The second sensor detects an alarm status.

TAMPER
: The tamper switch is on.


### GetList

Get the lifts configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| lifts | [LiftInfo[]](#LiftInfo) | The lifts configured on the device |

### GetStatus

Get the status of lifts configured on a device.

```protobuf
message Status {
  uint32 liftID;
  uint32 alarmFlags;
  bool tamperOn;
  repeated FloorStatus floors;
}
```
{: #Status }

liftID
: The ID of the lift.

[alarmFlags](#AlarmFlag)
: Indicate the alarm status of the lift. For example, if it is FIRST \| TAMPER, it means that the first sensor and the tamper switch are detected.

tamperOn
: Indicate whether the tamper switch is on.

[floors](#FloorStatus)
: The current status of the floors.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| status | [Status[]](#Status) | The status of the lifts configured on the device |  

## Management

### Add

Add lifts to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| lifts | [LiftInfo[]](#LiftInfo) | The lifts to be configured on the device |

### Delete

Delete lifts from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| liftIDs | uint32[] | The IDs of lifts to be deleted from the device |


### DeleteAll

Delete all lifts configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

## Activate/Deactivate

You can manually activate, deactivate, or release the specified floors of a lift.

### Activate

Activate floors on a lift. If the __activateFlag__ has lower priority than [FloorStatus.deactivateFlags](#FloorStatus), the operation will fail.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| liftID | uint32 | The ID of the lift |
| floorIndexes | uint32[] | The indexes of floors to be activated |
| activateFlag | uint32 | One of [FloorFlag](#FloorFlag) |

### Deactivate

Deactivate floors on a lift. If the __deactivateFlag__ has lower priority than [FloorStatus.activateFlags](#FloorStatus), the operation will fail.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| liftID | uint32 | The ID of the lift |
| floorIndexes | uint32[] | The indexes of floors to be deactivated |
| deactivateFlag | uint32 | One of [FloorFlag](#FloorFlag) |

### Release

Reset the floor status. If the __floorFlag__ has lower priority than [FloorStatus.activateFlags/deactivateFlags](#FloorStatus), the operation will fail.

| Request |
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| liftID | uint32 | The ID of the lift |
| floorIndexes | uint32[] | The indexes of floors to be released |
| floorFlag | uint32 | One of [FloorFlag](#FloorFlag) |

### SetAlarm

Change the [Status.alarmFlags](#Status) of lifts.

| Request |
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| liftIDs | uint32[] | The IDs of the lifts whose __alarmFlags__ will be changed |
| alarmFlag | uint32 | A mask of [AlarmFlag](#AlarmFlag) |


