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
}
```
{: #EventLog}

ID
: 4 byte identifier of the log record. Each device manages a monotonic increasing counter for this identifier. You can use this value to specify the starting position when reading logs from devices.

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

userID/entityID
: For user related events such as __EVENT_VERIFY_SUCCESS__ or __EVENT_USER_ENROLL_SUCCESS__, the __userID__ will be set. For other types of events, the __entity_ID__ could be a door ID or zone ID. 

eventCode
: Refer to [BS2Event.mainCode](http://kb.supremainc.com/bs2sdk/doku.php?id=en:log_management_api).

subCode
: Refer to [BS2Event.subCode](http://kb.supremainc.com/bs2sdk/doku.php?id=en:log_management_api).

TNAKey
: When a T&A key is selected for an authentication event, this field will be set to the key. Refer to [TNA.Key]({{'/api/tna/' | relative_url}}#Key).

hasImage
: True if the event has an image log related to it. You can read image logs using [GetImageLog](#getimagelog).


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


## Image Log

Some devices can record an image in addition to an event log. Please check if the device supports [CapabilityInfo.imageLogSupported]({{'/api/device/' | relative_url}}#CapabilityInfo). You have to specify the event types for which an image is recorded using [SetImageFilter](#setimagefilter).

```protobuf
message ImageLog {
  uint32 ID;
  uint32 timestamp;
  uint32 deviceID;
  string userID;
  uint32 eventCode;
  bytes JPGImage;
}
```
{: #ImageLog}


ID
: 4 byte identifier of the log record. 

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

eventCode
: Refer to [BS2Event.code](http://kb.supremainc.com/bs2sdk/doku.php?id=en:log_management_api).

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
  uint32 mainEventCode; 
  uint32 scheduleID;
}
```
{: #ImageFilter}

mainEventCode
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

The way of receiving real-time events will vary according to your selected language. Please refer to the quick start guide for details. 