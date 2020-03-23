---
title: "Time API"
toc_label: "Time"  
---

## Time

### Get

Get the time of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| GMTTime | uint64 | The GMT time in Unix format |

### Set

Set the time of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| GMTTime | uint64 | The GMT time to be set in Unix format |


### SetMulti

Set the time of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| GMTTime | uint64 | The GMT time to be set in Unix format |

## Config

```protobuf
message TimeConfig {
  int32 timeZone;
  bool syncWithServer;
}
```
{: #TimeConfig}

timeZone
: Timezone in seconds. For example, if the timezone is GMT-5, it should be -18,000. 

syncWithServer
: If true, try to synchronize the time of the device with the BioStar server or the device gateway. 

### GetConfig

Get the time configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [TimeConfig](#TimeConfig) | The time configuration of the device |


### SetConfig

Change the time configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [TimeConfig](#TimeConfig) | The time configuration to be written to the device |


### SetConfigMulti

Change the time configurations of the devices. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [TimeConfig](#TimeConfig) | The time configuration to be written to the devices |

## Daylight Saving Time

Check CapabilityInfo.DSTSupported first.
{: .notice--warning}

```protobuf
message DSTConfig {
  repeated DSTSchedule schedules;
}
```
{: #DSTConfig}

[schedules](#DSTSchedule)
: Due to a FW issue, only one schedule can be defined. 

```protobuf
message DSTSchedule {
  WeekTime startTime;
  WeekTime endTime;
  int32 timeOffset;
}
```
{: #DSTSchedule}

[startTime](#WeekTime)
: The time when DST starts.

[endTime](#WeekTime)
: The time when DST ends.

timeOffset
: DST time in seconds. For example, if it is 1 hour, it should be 3,600.

```protobuf
message WeekTime {
  uint32 year = 1;
  Month month = 2;
  Ordinal ordinal = 3;
  Weekday weekday = 4;
  uint32 hour = 5;
  uint32 minute = 6;
  uint32 second = 7;
}
```
{: #WeekTime}

year
: If it is set to 0, the [DSTConfig](#DSTConfig) will be applied yearly.

[month](#Month)
: 

[ordinal](#Ordinal)
: The ordinality of the day. For example, (MONTH_MARCH, ORDINAL_SECOND, WEEKDAY_MONDAY) means the second Monday of March. 

```protobuf
enum Month {
  MONTH_JANUARY = 0;
  MONTH_FEBRUARY = 1;
  MONTH_MARCH = 2;
  MONTH_APRIL = 3;
  MONTH_MAY = 4;
  MONTH_JUNE = 5;
  MONTH_JULY = 6;
  MONTH_AUGUST = 7;
  MONTH_SEPTEMBER = 8;
  MONTH_OCTOBER = 9;
  MONTH_NOVEMBER = 10;
  MONTH_DECEMBER = 11;
}
```
{: #Month}

```protobuf
enum Ordinal {
  ORDINAL_FIRST = 0;
  ORDINAL_SECOND = 1;
  ORDINAL_THIRD = 2;
  ORDINAL_FOURTH = 3;
  ORDINAL_FIFTH = 4;
  ORDINAL_SIXTH = 5;
  ORDINAL_SEVENTH = 6;
  ORDINAL_EIGHTH = 7;
  ORDINAL_NINTH = 8;
  ORDINAL_TENTH = 9;

  ORDINAL_LAST = -1;
}
```
{: #Ordinal}

```protobuf
enum Weekday {
  WEEKDAY_SUNDAY = 0;
  WEEKDAY_MONDAY = 1;
  WEEKDAY_TUESDAY = 2;
  WEEKDAY_WEDNESDAY = 3;
  WEEKDAY_THURSDAY = 4;
  WEEKDAY_FRIDAY = 5;
  WEEKDAY_SATURDAY = 6;
}
```
{: #Weekday}

### GetDSTConfig

Get the DST configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [DSTConfig](#DSTConfig) | The DST configuration of the device |

### SetDSTConfig

Change the DST configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [DSTConfig](#DSTConfig) | The DST configuration to be written to the device |


### SetDSTConfigMulti

Change the DST configurations of multiple devices. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [DSTConfig](#DSTConfig) | The DST configuration to be written to the devices |
