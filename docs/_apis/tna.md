---
title: "Time & Attendance API"
toc_label: "Time & Attendance"  
---

## Config

The [CapabilityInfo.TNASupported]({{'/api/device/' | relative_url}}#CapabilityInfo) should be true if a device supports [TNAConfig](#TNAConfig).

```protobuf
message TNAConfig {
  Mode mode;
  Key key;
  bool isRequired;
  repeated uint32 schedules;
  repeated string labels;
}
```
{: #TNAConfig}
You can specify maximum 16 T&A keys between __KEY_1__ and __KEY_16__. You can also assign a label or a schedule per each T&A key. 


[mode](#Mode)
: Specify how to assign a T&A key to an authentication event.

[key](#Key)
: The fixed T&A key for all the authentication events. Valid only if the __mode__ is __FIXED__.

isRequired
: If true, users have to select a T&A key after authenticating themselves. If false, users can authenticate themselves without selecting a T&A key.

schedules
: The ID of the [Schedule]({{'/api/schedule/' | relative_url}}#ScheduleInfo) to be applied to each T&A key when the __mode__ is __BY_SCHEDULE__. __schedules[0]__ for __KEY_1__, __schedules[1]__ for __KEY_2__, etc. If 0, it means that schedule is not applied to the T&A Key. 

labels
: The label of each T&A key. The labels[0]__ for __KEY_1__, labels[1]__ for __KEY_2__, etc.


```protobuf
enum Mode {
  UNUSED = 0;
  BY_USER = 1;
  BY_SCHEDULE = 2;
  LAST_CHOICE = 3;
  FIXED = 4;
}
```
{: #Mode}

UNUSED
: T&A is not used.

BY_USER
: The T&A key will be selected by user.

BY_SCHEDULE
: The T&A key will be automatically selected by [TNAConfig.schedules](#TNAConfig).

LAST_CHOICE
: The T&A key selected by the previous user will be used.

FIXED
: The T&A key, defined by [TNAConfig.key](#TNAConfig), will be used for all authentication events. 


```protobuf
enum Key {
  UNSPECIFIED = 0;

  KEY_1 = 1;
  KEY_2 = 2;
  KEY_3 = 3;
  KEY_4 = 4;
  KEY_5 = 5;
  KEY_6 = 6;
  KEY_7 = 7;
  KEY_8 = 8;
  KEY_9 = 9;
  KEY_10 = 10;
  KEY_11 = 11;
  KEY_12 = 12;
  KEY_13 = 13;
  KEY_14 = 14;
  KEY_15 = 15;
  KEY_16 = 16;
}
```
{: #Key}


### GetConfig

Get the T&A configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [TNAConfig](#TNAConfig) | The T&A configuration of the device |

### SetConfig

Change the T&A configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [TNAConfig](#TNAConfig) | The T&A configuration to be written to the device |


### SetConfigMulti

Change the T&A configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [TNAConfig](#TNAConfig) | The T&A configuration to be written to the devices |

## Event

With most T&A applications, you must be interested in the events with a T&A key or a job code. [GetTNALog](#gettnalog) and [GetJobCodeLog](#getjobcodelog) will return the event logs with T&A keys and job codes respectively. 

### GetTNALog

Get the event logs with T&A keys from a device.

```protobuf
message TNALog {
  uint32 ID;
  uint32 timestamp;
  uint32 deviceID;
  string userID;
  uint32 eventCode;
  uint32 subCode;
  Key TNAKey;
}
```
{: #TNALog}

ID
: 4 byte identifier of the log record. Each device manages a monotonic increasing counter for this identifier. You can use this value to specify the starting position when reading logs from devices.

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

[eventCode]({{'/api/event/' | relative_url}}#EventCode)
: 16 bit code identifying the event type.

[subCode]({{'/api/event/' | relative_url}}#SubCode)
: Some event types have an additional 8 bit code providing auxiliary information.

[TNAKey](#Key)
: The selected T&A key for the authentication event. 


| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| startEventID | uint32 | The ID of the first event log to be read. If it is 0, read logs from the start |
| maxNumOfLog | uint32 | The maximum number of logs to be read. If it is 0, try to read all the event logs |
| TNAEventFilter | uint32 | Not yet supported |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| TNAEvents | [TNALog[]](#TNALog) | The T&A event logs read from the device |

### GetJobCodeLog

Get the event logs with job codes from a device. You have to configure user job codes using [User.SetJobCode]({{'/api/user/' | relative_url}}#setjobcode) or [User.SetJobCodeMulti]({{'/api/user/' | relative_url}}#setjobcodemulti). And, [SystemConfig.useJobCode]({{'/api/system/' | relative_url}}#SystemConfig) should be true. 

```protobuf
message JobCodeLog {
  uint32 ID;
  uint32 timestamp;
  uint32 deviceID;
  string userID;
  uint32 eventCode;
  uint32 subCode;
  uint32 jobCode;
}
```
{: #JobCodeLog}

ID
: 4 byte identifier of the log record. Each device manages a monotonic increasing counter for this identifier. You can use this value to specify the starting position when reading logs from devices.

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

[eventCode]({{'/api/event/' | relative_url}}#EventCode)
: 16 bit code identifying the event type.

[subCode]({{'/api/event/' | relative_url}}#SubCode)
: Some event types have an additional 8 bit code providing auxiliary information.

[jobCode](#JobCode)
: The job code selected for the authentication event by the user. 

```protobuf
message JobCode {
  uint32 code = 1;
  string label = 2;
}
```
{: #JobCode}

code
: 4 byte unsigned code. 

label
: Maximum 16 characters in UTF-8 encoding.



| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| startEventID | uint32 | The ID of the first event log to be read. If it is 0, read logs from the start  |
| maxNumOfLog | uint32 | The maximum number of logs to be read. If it is 0, try to read all the event logs |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| jobCodeEvents | [JobCodeLog[]](#JobCodeLog) | The job code event logs read from the device  |