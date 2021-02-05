---
title: "Event API"
toc_label: "Event"  
---

## Log

```protobuf
message EventLog {
  uint32 ID;
  uint32 timestamp;
  uint32 deviceID;
  string userID;
  uint32 entityID;
  uint32 eventCode;
  uint32 subCode;
  tna.Key TNAKey;
  bool hasImage;
  bool changedOnDevice;
  uint32 temperature;
  bytes cardData;
  DetectInputInfo inputInfo;
  AlarmZoneInfo alarmZoneInfo;
  InterlockZoneInfo interlockZoneInfo;
}
```
{: #EventLog}

ID
: 4 byte identifier of the log record. Each device manages a monotonic increasing counter for this identifier. You can use this value to specify the starting position when reading logs from devices.

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

userID/entityID
: For user related events such as __EVENT_VERIFY_SUCCESS__ or __EVENT_USER_ENROLL_SUCCESS__, the __userID__ will be set. For other types of events, the __entity_ID__ could be either a door ID or zone ID. 

eventCode
: 16 bit code identifying the event type.

  | Category | Code | Value | Description |
  | -------- | ---- | ------| ----------- |
  | Auth | BS2_EVENT_VERIFY_SUCCESS | 0x1000 | 1:1 authentication success | 
  || BS2_EVENT_VERIFY_FAIL | 0x1100 | 1:1 authentication failure | 
  || BS2_EVENT_VERIFY_DURESS | 0x1200 | 1:1 authentication success under duress |
  || BS2_EVENT_IDENTIFY_SUCCESS | 0x1300 | 1:N authentication success |
  || BS2_EVENT_IDENTIFY_FAIL | 0x1400 | 1:N authentication failure |
  || BS2_EVENT_IDENTIFY_DURESS | 0x1500 | 1:N authentication success under duress |
  || BS2_EVENT_DUAL_AUTH_SUCCESS | 0x1600 | dual authentication success |
  || BS2_EVENT_DUAL_AUTH_FAIL | 0x1700 | dual authentication failure |
  || BS2_EVENT_AUTH_FAILED | 0x1800 | unregistered credential |
  || BS2_EVENT_ACCESS_DENIED | 0x1900 | user without access privileges or violation of zone rules |
  || BS2_EVENT_FAKE_FINGER_DETECTED | 0x1A00 | fake finger detected |
  | User | BS2_EVENT_USER_ENROLL_SUCCESS | 0x2000 | user enrollment success |
  || BS2_EVENT_USER_ENROLL_FAIL | 0x2100 | user enrollment failure |
  || BS2_EVENT_USER_UPDATE_SUCCESS | 0x2200 | user update success |
  || BS2_EVENT_USER_UPDATE_FAIL | 0x2300 | user update failure |
  || BS2_EVENT_USER_DELETE_SUCCESS | 0x2400 | user delete success |
  || BS2_EVENT_USER_DELETE_FAIL | 0x2500 | user delete failure |
  || BS2_EVENT_USER_DELETE_ALL_SUCCESS | 0x2600 | delete all user success |
  || BS2_EVENT_USER_ISSUE_AOC_SUCCESS | 0x2700 | issuance of an AOC card success | 
  || BS2_EVENT_USER_DUPLICATE_CREDENTIAL | 0x2800 | duplicate credential |
  | Device | BS2_EVENT_DEVICE_SYSTEM_RESET | 0x3000 | system reset |
  || BS2_EVENT_DEVICE_SYSTEM_STARTED | 0x3100 | system started |
  || BS2_EVENT_DEVICE_TIME_SET | 0x3200 | system time set |
  || BS2_EVENT_DEVICE_TIMEZONE_SET | 0x3201 | timezone changed |
  || BS2_EVENT_DEVICE_DST_SET | 0x3202 | DST changed |
  || BS2_EVENT_DEVICE_LINK_CONNECTED | 0x3300 | LAN cable connected |
  || BS2_EVENT_DEVICE_LINK_DISCONNECTED | 0x3400 | LAN cable disconnected |
  || BS2_EVENT_DEVICE_DHCP_SUCCESS | 0x3500 | IP address acquired by DHCP |
  || BS2_EVENT_DEVICE_ADMIN_MENU | 0x3600 | enter administrator menu |
  || BS2_EVENT_DEVICE_UI_LOCKED | 0x3700 | device locked |
  || BS2_EVENT_DEVICE_UI_UNLOCKED | 0x3800 | device unlocked |
  || BS2_EVENT_DEVICE_TCP_CONNECTED | 0x3B00 | TCP connected |
  || BS2_EVENT_DEVICE_TCP_DISCONNECTED | 0x3C00 | TCP disconnected |
  || BS2_EVENT_DEVICE_RS485_CONNECTED | 0x3D00 | RS485 connected |
  || BS2_EVENT_DEVICE_RS485_DISCONNECTED | 0x3E00 | RS485 disconnected |
  || BS2_EVENT_DEVICE_INPUT_DETECTED | 0x3F00 | input signal detected |
  || BS2_EVENT_DEVICE_TAMPER_ON | 0x4000 | tamper SW is on |
  || BS2_EVENT_DEVICE_TAMPER_OFF | 0x4100 | tamper SW is off |
    || BS2_EVENT_DEVICE_EVENT_LOG_CLEARED | 0x4200 | log records cleared |
  || BS2_EVENT_DEVICE_FIRMWARE_UPGRADED | 0x4300 | firmware upgraded |
  || BS2_EVENT_DEVICE_RESOURCE_UPGRADED | 0x4400 | resource upgraded |
  || BS2_EVENT_DEVICE_CONFIG_RESET | 0x4500 | system configurations initialized (including network) |
  || BS2_EVENT_DEVICE_DATABASE_RESET | 0x4501 | database initialized |
  || BS2_EVENT_DEVICE_FACTORY_RESET | 0x4502 | factory reset |
  || BS2_EVENT_DEVICE_CONFIG_RESET_EX | 0x4503 | system configurations initialized (excluding network) |
  || BS2_EVENT_SUPERVISED_INPUT_SHORT | 0x4600 | short circuit of a supervised input detected |
  || BS2_EVENT_SUPERVISED_INPUT_OPEN | 0x4700 | disconnection of a supervised input detected |
  | Door | BS2_EVENT_DOOR_UNLOCKED | 0x5000 | door unlocked |
  || BS2_EVENT_DOOR_LOCKED | 0x5100 | door locked |
  || BS2_EVENT_DOOR_OPENED | 0x5200 | door open detected by sensor |
  || BS2_EVENT_DOOR_CLOSED | 0x5300 | door closed detected by sensor |
  || BS2_EVENT_DOOR_FORCED_OPEN | 0x5400 | door forced open |
  || BS2_EVENT_DOOR_HELD_OPEN | 0x5500 | door held open too long |
  || BS2_EVENT_DOOR_FORCED_OPEN_ALARM | 0x5600 | forced open alarm |
  || BS2_EVENT_DOOR_FORCED_OPEN_ALARM_CLEAR | 0x5700 | forced open alarm cleared |
  || BS2_EVENT_DOOR_HELD_OPEN_ALARM | 0x5800 | held open alarm | 
  || BS2_EVENT_DOOR_HELD_OPEN_ALARM_CLEAR | 0x5900 | held open alarm cleared | 
  || BS2_EVENT_DOOR_APB_ALARM | 0x5A00 | anti-passback alarm on a door |
  || BS2_EVENT_DOOR_APB_ALARM_CLEAR | 0x5B00 | anti-passback alarm on a door cleared |
  || BS2_EVENT_DOOR_RELEASE | 0x5C00 | door status reset |
  || BS2_EVENT_DOOR_LOCK | 0x5D00 | lock door |
  || BS2_EVENT_DOOR_UNLOCK | 0x5E00 | unlock door |
  | Zone | BS2_EVENT_ZONE_APB_VIOLATION | 0x6000 | APB zone violated |
  || BS2_EVENT_ZONE_APB_ALARM | 0x6100 | APB zone alarm |
  || BS2_EVENT_ZONE_APB_ALARM_CLEAR | 0x6200 | APB zone alarm cleared |
  || BS2_EVENT_ZONE_TIMED_APB_VIOLATION | 0x6300 | timed APB zone violated |
  || BS2_EVENT_ZONE_TIMED_APB_ALARM | 0x6400 | timed APB zone alarm |
  || BS2_EVENT_ZONE_TIMED_APB_ALARM_CLEAR | 0x6500 | timed APB zone alarm cleared |
  || BS2_EVENT_ZONE_FIRE_ALARM_INPUT | 0x6600 | fire alarm input detected |
  || BS2_EVENT_ZONE_FIRE_ALARM | 0x6700 | fire alarm |
  || BS2_EVENT_ZONE_FIRE_ALARM_CLEAR | 0x6800 | fire alarm cleared |
  || BS2_EVENT_ZONE_SCHEDULED_LOCK_VIOLATION | 0x6900 | scheduled lock zone violated |
  || BS2_EVENT_ZONE_SCHEDULED_LOCK_START | 0x6A00 | start of lock schedule |
  || BS2_EVENT_ZONE_SCHEDULED_LOCK_END | 0x6B00 | end of lock schedule |
  || BS2_EVENT_ZONE_SCHEDULED_UNLOCK_START | 0x6C00 | start of unlock schedule |
  || BS2_EVENT_ZONE_SCHEDULED_UNLOCK_END | 0x6D00 | end of unlock schedule |
  || BS2_EVENT_ZONE_SCHEDULED_LOCK_ALARM | 0x6E00 | scheduled lock zone alarm |
  || BS2_EVENT_ZONE_SCHEDULED_LOCK_ALARM_CLEAR | 0x6F00 | scheduled lock zone alarm cleared |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_VIOLATION | 0x9000 | intrusion zone violated |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_ARM_GRANTED | 0x9100 | arming intrusion zone |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_ARM_SUCCESS | 0x9200 | intrusion zone armed |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_ARM_FAIL | 0x9300 | arming intrusion zone failure |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_DISARM_GRANTED | 0x9400 | disarming intrusion zone |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_DISARM_SUCCESS | 0x9500 | intrusion zone disarmed |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_DISARM_FAIL | 0x9600 | disarming intrusion zone failure |
  || BS2_EVENT_ZONE_INTRUSION_ALARM | 0x9800 | intrusion alarm |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_CLEAR | 0x9900 | intrusion alarm  cleared |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_ARM_DENIED | 0x9A00 | arming intrusion zone denied |
  || BS2_EVENT_ZONE_INTRUSION_ALARM_DISARM_DENIED | 0x9B00 | disarming intrusion zone denied |
  | Lift | BS2_EVENT_FLOOR_ACTIVATED | 0x7000 | floor activated |
  || BS2_EVENT_FLOOR_DEACTIVATED | 0x7100 | floor deactivated |
  || BS2_EVENT_FLOOR_RELEASE | 0x7200 | floor status reset |
  || BS2_EVENT_FLOOR_ACTIVATE | 0x7300 | activate floor |
  || BS2_EVENT_FLOOR_DEACTIVATE | 0x7400 | deactivate floor |
  || BS2_EVENT_LIFT_ALARM_INPUT | 0x7500 | lift alarm input detected |
  || BS2_EVENT_LIFT_ALARM | 0x7600 | lift alarm |
  || BS2_EVENT_LIFT_ALARM_CLEAR | 0x7700 | lift alarm cleared |
  || BS2_EVENT_ALL_FLOOR_ACTIVATED | 0x7800 | all floor activated |
  || BS2_EVENT_ALL_FLOOR_DEACTIVATED | 0x7900 | all floor deactivated |
  {: #EventCode}

subCode
: Some event types have an additional 8 bit code providing auxiliary information. For example, __BS2_EVENT_VERIFY_XXXX__ events have a sub code denoting the authentication mode. If the __eventCode__ is BS2_EVENT_VERIFY_SUCCESS and the __subCode__ is BS2_SUB_EVENT_VERIFY_CARD_FINGER, it means that the user authenticated Card + Fingerprint successfully.

  | Category | Code | Value | Description |
  | -------- | ---- | ------| ----------- |
  | Verify | BS2_SUB_EVENT_VERIFY_ID_PIN | 0x01 | ID + PIN |
  || BS2_SUB_EVENT_VERIFY_ID_FINGER | 0x02 | ID + fingerprint |
  || BS2_SUB_EVENT_VERIFY_ID_FINGER_PIN | 0x03 | ID + fingerprint + PIN |
  || BS2_SUB_EVENT_VERIFY_ID_FACE | 0x04 | ID + face |
  || BS2_SUB_EVENT_VERIFY_ID_FACE_PIN | 0x05 | ID + face + PIN |
  || BS2_SUB_EVENT_VERIFY_CARD | 0x06 | card only |
  || BS2_SUB_EVENT_VERIFY_CARD_PIN | 0x07 | card + PIN |
  || BS2_SUB_EVENT_VERIFY_CARD_FINGER | 0x08 | card + fingerprint |
  || BS2_SUB_EVENT_VERIFY_CARD_FINGER_PIN | 0x09 | card + fingerprint + PIN |
  || BS2_SUB_EVENT_VERIFY_CARD_FACE | 0x0A | card + face |
  || BS2_SUB_EVENT_VERIFY_CARD_FACE_PIN | 0x0B | card + face + PIN |
  || BS2_SUB_EVENT_VERIFY_AOC | 0x0C | AOC card |
  || BS2_SUB_EVENT_VERIFY_AOC_PIN | 0x0D | AOC card + PIN |
  || BS2_SUB_EVENT_VERIFY_AOC_FINGER | 0x0E | AOC card + fingerprint |
  || BS2_SUB_EVENT_VERIFY_AOC_FINGER_PIN | 0x0F | AOC card + fingerprint + PIN |
  || BS2_SUB_EVENT_VERIFY_CARD_FACE_FINGER | 0x10 | card + face + fingerprint |
  || BS2_SUB_EVENT_VERIFY_CARD_FINGER_FACE | 0x11 | card + fingerprint + face |
  || BS2_SUB_EVENT_VERIFY_ID_FACE_FINGER | 0x12 | ID + face + fingerprint |
  || BS2_SUB_EVENT_VERIFY_ID_FINGER_FACE | 0x13 | ID + fingerprint + face |
  | Identify | BS2_SUB_EVENT_IDENTIFY_FINGER | 0x01 | fingerprint only |
  || BS2_SUB_EVENT_IDENTIFY_FINGER_PIN | 0x02 | fingerprint + PIN |
  || BS2_SUB_EVENT_IDENTIFY_FACE | 0x03 | face only |
  || BS2_SUB_EVENT_IDENTIFY_FACE_PIN | 0x04 | face + PIN |
  || BS2_SUB_EVENT_IDENTIFY_FACE_FINGER | 0x05 | face + fingerprint |
  || BS2_SUB_EVENT_IDENTIFY_FACE_FINGER_PIN | 0x06 | face + fingerprint + PIN |
  || BS2_SUB_EVENT_IDENTIFY_FINGER_FACE | 0x07 | fingerprint + face |
  || BS2_SUB_EVENT_IDENTIFY_FINGER_FACE_PIN | 0x08 | fingerprint + face + PIN |
  | Dual Auth | BS2_SUB_EVENT_DUAL_AUTH_FAIL_TIMEOUT | 0x01 | timeout for dual authentication |
  || BS2_SUB_EVENT_DUAL_AUTH_FAIL_ACCESS_GROUP | 0x02 | invalid access group for dual authentication |
  | Invalid Credential | BS2_SUB_EVENT_CREDENTIAL_ID | 0x01 | invalid user ID |
  || BS2_SUB_EVENT_CREDENTIAL_CARD | 0x02 | invalid card |
  || BS2_SUB_EVENT_CREDENTIAL_PIN | 0x03 | invalid PIN |
  || BS2_SUB_EVENT_CREDENTIAL_FINGER | 0x04 | invalid fingerprint |
  || BS2_SUB_EVENT_CREDENTIAL_FACE | 0x05 | invalid face |
  || BS2_SUB_EVENT_CREDENTIAL_AOC_PIN | 0x06 | invalid AOC PIN |
  || BS2_SUB_EVENT_CREDENTIAL_AOC_FINGER | 0x07 | invalid AOC fingerprint |
  | Auth Fail | BS2_SUB_EVENT_AUTH_FAIL_INVALID_AUTH_MODE | 0x01 | invalid authentication mode |
  || BS2_SUB_EVENT_AUTH_FAIL_INVALID_CREDENTIAL | 0x02 | invalid credential |
  || BS2_SUB_EVENT_AUTH_FAIL_TIMEOUT | 0x03 | authentication timeout |
  | Access Denied | BS2_SUB_EVENT_ACCESS_DENIED_ACCESS_GROUP | 0x01 | invalid access group |
  || BS2_SUB_EVENT_ACCESS_DENIED_DISABLED | 0x02 | disabled user |
  || BS2_SUB_EVENT_ACCESS_DENIED_EXPIRED | 0x03 | expired user |
  || BS2_SUB_EVENT_ACCESS_DENIED_ON_BLACKLIST | 0x04 | blacklisted user |
  || BS2_SUB_EVENT_ACCESS_DENIED_APB | 0x05 | denied by APB rule |
  || BS2_SUB_EVENT_ACCESS_DENIED_TIMED_APB | 0x06 | denied by timed APB rule |
  || BS2_SUB_EVENT_ACCESS_DENIED_SCHEDULED_LOCK | 0x07 | denied by scheduled lock zone |
  || BS2_SUB_EVENT_ACCESS_DENIED_FACE_DETECTION | 0x0A | face not detected |
  || BS2_SUB_EVENT_ACCESS_DENIED_FAKE_FINGER | 0x0C | fake finger detected |
  || BS2_SUB_EVENT_ACCESS_DENIED_INTRUSION_ALARM | 0x0E | denied by intrusion alarm zone |
  || BS2_SUB_EVENT_ACCESS_DENIED_INTRUSION_ALARM | 0x0E | denied by intrusion alarm zone |
  || BS2_SUB_EVENT_ACCESS_DENIED_INTERLOCK | 0x0F | denied by interlock zone |
  || BS2_SUB_EVENT_ACCESS_DENIED_HIGH_TEMPERATURE | 0x13 | too high temperature |
  || BS2_SUB_EVENT_ACCESS_DENIED_UNMASKED_FACE | 0x15 | no mask |
   {: #SubCode}

TNAKey
: When a T&A key is selected for an authentication event, this field will be set to the key. Refer to [TNA.Key]({{'/api/tna/' | relative_url}}#Key).

hasImage
: True if the event has an image log related to it. You can read image logs using [GetImageLog](#getimagelog).

changedOnDevice
: True if the user is enrolled, changed, or deleted at the device. 

temperature
: Temperature of the user. Refer to [Thermal API]({{'/api/thermal/' | relative_url}}) for the related options.

cardData
: If [eventCode](#EventCode) is BS2_EVENT_VERIFY_FAIL and [subCode](#SubCode) is BS2_SUB_EVENT_CREDENTIAL_CARD, this field will have the failed card data.

[inputInfo](#DetectInputInfo)
: If [eventCode](#EventCode) is BS2_EVENT_DEVICE_INPUT_DETECTED, BS2_EVENT_SUPERVISED_INPUT_SHORT, or BS2_EVENT_SUPERVISED_INPUT_OPEN, it will have additional information about the input port.

[alarmZoneInfo](#AlarmZoneInfo)
: If [eventCode](#EventCode) is BS2_EVENT_ZONE_INTRUSION_ALARM_ARM_FAIL or BS2_EVENT_ZONE_INTRUSION_ALARM, it will have additional information about the alarm zone.

[interlockZoneInfo](#InterlockZoneInfo)
: If [eventCode](#EventCode) is BS2_EVENT_ZONE_INTERLOCK_VIOLATION, it will have additional information about the interlock zone.

```protobuf
message DetectInputInfo {
  uint32 ioDeviceID;
  uint32 port;
  PortValue value;
}
```
{: #DetectInputInfo}

ioDeviceID
: The device ID of the input port.

port
: The index of the port

[value](#PortValue)
: The detected value of the port.

```protobuf
enum PortValue {
  OPEN = 0;
  CLOSED = 1;
  SUPERVISED_SHORT = 2;
  SUPERVISED_OPEN = 3;
};
```
{: #PortValue}

OPEN
: The port is open.

CLOSED
: The port is closed.

SUPERVISED_SHORT
: The supervised port is short-circuited. 

SUPERVISED_OPEN
: The supervised port is open.

```protobuf
message AlarmZoneInfo {
  uint32 zoneID;
  uint32 doorID;
  uint32 ioDeviceID;
  uint32 port;
}
```
{: #AlarmZoneInfo}

```protobuf
message InterlockZoneInfo {
  uint32 zoneID;
  repeated uint32 doorIDs; 
}
```
{: #InterlockZoneInfo}


### GetLog

Read event logs from a device. You can limit the search range using __startEventID__ and __maxNumOfLog__. For T&A specific APIs, refer to the [T&A API]({{'/api/tna' | relative_url}}#event).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| startEventID | uint32 | The ID of the first event log to be read. If it is 0, read logs from the start |
| maxNumOfLog | uint32 | The maximum number of logs to be read. If it is 0, try to read all the event logs |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| events | [EventLog[]](#EventLog) | The event logs read from the device |

### GetLogWithFilter

You can filter the event logs to be read by setting [EventFilter](#EventFilter). For example, to read events of a specific user, you can set __EventFilter.userID__.

```protobuf
message EventFilter {
  string userID;
  uint32 startTime;
  uint32 endTime;
  uint32 eventCode;
  tna.Key TNAKey;
}
```
{: #EventFilter}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device  |
| startEventID | uint32 | The ID of the first event log to be read. If it is 0, read logs from the start |
| maxNumOfLog | uint32 | The maximum number of logs to be read. If it is 0, try to read all the event logs |
| filters | [EventFilter[]](#EventFilter) | The filters to be applied to the event logs |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| events | [EventLog[]](#EventLog) | The filtered event logs read from the device |

### ClearLog

Delete all event logs stored on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### ClearLogMulti

Delete all event logs stored on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |


## Image log

Some devices can record an image in addition to an event log. Please check if the device supports [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url}}#CapabilityInfo). You have to specify the event types for which an image is recorded using [SetImageFilter](#setimagefilter).

```protobuf
message ImageLog {
  uint32 ID;
  uint32 timestamp;
  uint32 deviceID;
  string userID;
  uint32 eventCode;
  uint32 subCode;
  bytes JPGImage;
}
```
{: #ImageLog}


ID
: 4 byte identifier of the log record. 

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

[eventCode](#EventCode)
: 16 bit code identifying the event type.

[subCode](#SubCode)
: Some event types have an additional 8 bit code providing auxiliary information.

JPGImage
: The image recorded in JPG file format.


### GetImageLog

Read image logs from a device. You can limit the search range using __startEventID__ and __maxNumOfLog__. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| startEventID | uint32 | The ID of the first image log to be read. If it is 0, read logs from the start  |
| maxNumOfLog | uint32 | The maximum number of logs to be read. If it is 0, try to read all the image logs. Since image logs are quite larger than textual event logs, you had better set this parameter to a non-zero value |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| imageEvents | [ImageLog[]](#ImageLog) | The image logs read from the device |

### GetImageFilter

Get the current image filters which specify event types for recording images.

```protobuf
message ImageFilter {
  uint32 eventCode; 
  uint32 scheduleID;
}
```
{: #ImageFilter}

[eventCode](#EventCode)
: Event type for which an image will be recorded

scheduleID
: You can limit the recording further by specifying a schedule. Refer to [Schedule]({{'/api/schedule/' | relative_url}}#Schedule).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filters | [ImageFilter[]](#ImageFilter) | The filters set to the device |

### SetImageFilter

Set image filters which specify event types for recording images. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| filters | [ImageFilter[]](#ImageFilter) | The filters to be set to the device |

### SetImageFilterMulti 

Set image filters to multiple devices. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| filters | [ImageFilter[]](#ImageFilter) | The filters to be set to the devices |

## Monitoring

To receive real-time events, you have to do the following steps.

1. Enable monitoring on some devices using [EnableMonitoring](#enablemonitoring) or [EnableMonitoringMulti](#enablemonitoringmulti).
2. Subscribe to an event channel using [SubscribeRealtimeLog](#subscriberealtimelog).

### EnableMonitoring

Enable monitoring on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### EnableMonitoringMulti

Enable monitoring on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |

### DisableMonitoring

Disable monitoring on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |


### DisableMonitoringMulti

Disable monitoring on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |

### SubscribeRealtimeLog

```protobuf
message SubscribeRealtimeLogRequest {
  int32 queueSize;
  repeated uint32 deviceIDs;
  repeated int32 eventCodes;
}
```
{: #SubscribeRealtimeLogRequest}

queueSize
: If the queue is full, the gateway will discard the real-time events. So, it should be large enough for receiving concurrent events.

deviceIDs
: If it is not empty, receive events from the specified devices only.

[eventCodes](#EventCode)
: If it is not empty, receive the specified events only.

The way of receiving real-time events will vary according to your selected language. Please refer to the quick start guide for details. 
