---
title: "Door API"
toc_label: "Door"  
---

A door is the basic unit for access control. It consists of a relay and other optional components such as door sensor and exit button. A door can be configured on one or more devices  connected by RS485. 

## Information

```protobuf
message DoorInfo {
  uint32 doorID;
  string name;

  uint32 entryDeviceID;
  uint32 exitDeviceID;

  Relay relay;
  Sensor sensor;
  ExitButton button;

  uint32 autoLockTimeout;
  uint32 heldOpenTimeout;

  bool instantLock;
  uint32 unlockFlags;
  uint32 lockFlags;
  bool unconditionalLock;

  repeated action.Action forcedOpenActions;
  repeated action.Action heldOpenActions;

  uint32 dualAuthScheduleID;
  DualAuthDevice dualAuthDevice;
  DualAuthType dualAuthType;
  uint32 dualAuthTimeout;
  repeated uint32 dualAuthGroupIDs;
}
```
{: #DoorInfo }

doorID
: The ID of the door. 

name
: Maximum 48 characters in UTF-8 encoding.

entryDeviceID
: The ID of the entry device. If the door has only one device, you should set it as the entry device.

exitDeviceID
: The ID of the exit device. You have to set it only if the door consists of two devices connected by RS485. 

[relay](#Relay)
: The port information of the relay.

There must be one relay per each door. So, you cannot set 0 to [Relay.deviceID](#Relay).
{: .notice--warning}

[sensor](#Sensor)
: The port information of the door sensor. To use door alarms such as __FORCED_OPEN__ or __HELD_OPEN__, you have to configure the door sensor. If there needs to be no door sensor, just set 0 to [Sensor.deviceID](#Sensor).

[button](#ExitButton)
: The port information of the exit button. If there needs to be no exit button, just set 0 to [ExitButton.deviceID](#ExitButton).

autoLockTimeout 
: If it is not 0, the door will be locked automatically after being open for __autoLockTimeout__ seconds. See also [unconditionalLock](#UnconditionalLock).
{: #AutoLockTimeout }

heldOpenTimeout
: If it is not 0, the door will generate the __HELD_OPEN__ alarm after being open for __heldOpenTimeout__ seconds.
{: #HeldOpenTimeout }

instantLock
: If true, the door will be locked immediately when the sensor detects it is closed.

unlockFlags/lockFlags
: A mask of [DoorFlag](#DoorFlag). Just set __NONE__ for V1.0. The other options will be available in the future versions of G-SDK.

unconditionalLock 
: This flag determines how to act after the [autoLockTimeout](#AutoLockTimeout). If it is true, the door will be locked even if the door sensor detects it is open. If it is false, the door will be locked only when the door sensor detects it is closed.
{: #UnconditionalLock }

forcedOpenActions
: When the sensor detects the door is open by force, i.e., not by normal operations, the __FORCED_OPEN__ alarm will be generated. You can configure which actions should be triggered by this alarm. See [Action]({{'/api/action/' | relative_url}}#action) for the available actions.

heldOpenActions
: When the sensor detects that the door is open longer than the [heldOpenTimeout](#HeldOpenTimeout), the __HELD_OPEN__ alarm will be generated. You can configure which actions should be triggered by this alarm. See [Action]({{'/api/action/' | relative_url}}#action) for the available actions.

dualAuthScheduleID
: If it is not 0, the dual authentication will be enabled for the specified schedule. For the dual authentication, two users should authenticate themselves to access the door. 

[dualAuthDevice](#DualAuthDevice)
: Specify the devices to which the dual authentication will be applied. For example, if it is __DUAL_AUTH_ENTRY_DEVICE_ONLY__, it is applied to the entry device only.

[dualAuthType](#DualAuthType)
: If it is __DUAL_AUTH_LAST__, the second user belonging to [dualAuthGroupIDs](#DualAuthGroupIDs) should authenticate after the first user within __dualAuthTimeout__. If it is __DUAL_AUTH_NONE__, dual authentication is not needed.
{: #DualAuth }

dualAuthTimeout
: The maximum interval in seconds between the two authentications. That is, the second user should authenticate within this timeout after the first user's authentication.

dualAuthGroupIDs
: See [dualAuthType](#DualAuth). Maximum 16 access groups can be set as dual authentication groups.


```protobuf
message Relay {
  uint32 deviceID;
  uint32 port;
}
```
{: #Relay }

```protobuf
message Sensor {
  uint32 deviceID;
  uint32 port;
  device.SwitchType type;
}
```
{: #Sensor }

[type]({{'/api/device/' | relative_url}}#SwitchType)
: The type of the sensor.


```protobuf
message ExitButton {
  uint32 deviceID;
  uint32 port;
  device.SwitchType type;
}
```
{: #ExitButton }

[type]({{'/api/device/' | relative_url}}#SwitchType)
: The type of the button.

```protobuf
enum DualAuthDevice {
  DUAL_AUTH_NO_DEVICE	= 0x00;
  DUAL_AUTH_ENTRY_DEVICE_ONLY	= 0x01;
  DUAL_AUTH_EXIT_DEVICE_ONLY = 0x02;
  DUAL_AUTH_BOTH_DEVICE	= 0x03;
};
```
{: #DualAuthDevice }

```protobuf
enum DualAuthType {
  DUAL_AUTH_NONE = 0x00;
  DUAL_AUTH_LAST = 0x01;
};
```
{: #DualAuthType }

DUAL_AUTH_NONE
: Do not check the access groups of the two users.

DUAL_AUTH_LAST
: The second user should belong to the dual authentication groups.

### GetList

Get the doors configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| doors | [DoorInfo[]](#DoorInfo) | The doors configured on the device |

### GetStatus

Get the status of doors configured on a device.

```protobuf
message Status {
  uint32 doorID;
  bool isOpen;
  bool isUnlocked;
  bool heldOpen;
  uint32 unlockFlags;
  uint32 lockFlags;
  uint32 alarmFlags;
  uint32 lastOpenTime;
}
```
{: #Status }

doorID
: The ID of the door.

isOpen
: True if the door sensor detects it is open.

isUnlocked
: True if the door is unlocked.

heldOpen
: True if the door sensor detects it is open longer than the [heldOpenTimeout](#HeldOpenTimeout). 

unlockFlags
: Indicate how the door is unlocked. See [DoorFlag](#DoorFlag) for available values.

lockFlags
: Indicate how the door is locked. See [DoorFlag](#DoorFlag) for available values.

alarmFlags
: Indicate the alarm status of the door. See [AlarmFlag](#AlarmFlag) for available values.

lastOpenTime
: The last time when the door was open. In Unix time format.

```protobuf
enum DoorFlag {
  NONE = 0x00; 
  SCHEDULED = 0x01;
  EMERGENCY = 0x02;
  OPERATOR = 0x04;
}
```
{: #DoorFlag }

Each door flag has a different priority. The order of priorities are EMERGENCY > OPERATOR > SCHEDULED > NONE.

NONE
: The door is locked/unlocked by normal operations. 

SCHEDULED
: The door is locked/unlocked by Scheduled Lock/Unlock zones. Zones will be supported in the future versions of G-SDK.

EMERGENCY
: The door is locked/unlocked by Fire Alarm Zone or Intrusion Alarm Zone. Zones will be supported in the future versions of G-SDK.

OPERATOR
: The door is locked/unlocked by operators. 

```protobuf
enum AlarmFlag {
  NO_ALARM = 0x00;
  FORCED_OPEN = 0x01;
  HELD_OPEN = 0x02;
  APB_VIOLATION = 0x04;
}
```
{: #AlarmFlag }

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| status | [Status[]](#Status) | The status of the doors configured on the device |  

## Management

### Add

Add doors to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| doors | [DoorInfo[]](#DoorInfo) | The doors to be configured on the device |

### Delete

Delete doors from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| doorIDs | uint32[] | The IDs of doors to be deleted from the device |


### DeleteAll

Delete all doors configured on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

## Lock/Unlock

You can manually lock, unlock, or release doors.

### Lock

Lock doors. If the __doorFlag__ has lower priority than [DoorStatus.unlockFlags](#Status), the operation will fail.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| doorIDs | uint32[] | The IDs of the doors to be locked |
| doorFlag | uint32 | One of [DoorFlag](#DoorFlag) |

### Unlock

Unlock doors. If the __doorFlag__ has lower priority than [DoorStatus.lockFlags](#Status), the operation will fail.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| doorIDs | uint32[] | The IDs of the doors to be unlocked |
| doorFlag | uint32 | One of [DoorFlag](#DoorFlag) |

### Release

Reset the door status. If the __doorFlag__ has lower priority than [DoorStatus.lockFlags/unlockFlags](#Status), the operation will fail.

| Request |
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| doorIDss | uint32[] | The IDs of the doors to be reset |
| doorFlag | uint32 | One of [DoorFlag](#DoorFlag) |

### SetAlarm

Change the [Status.alarmFlags](#Status) of doors.

| Request |
| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| doorIDss | uint32[] | The IDs of the doors whose __alarmFlags__ will be changed |
| alarmFlag | uint32 | A mask of [AlarmFlag](#AlarmFlag) |


