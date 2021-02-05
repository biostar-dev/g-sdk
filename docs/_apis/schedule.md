---
title: "Schedule API"
toc_label: "Schedule"  
---

## Schedule

A schedule is used for access control and other configurations such as authentication mode. You can configure a [DailySchedule](#DailySchedule) or a [WeeklySchedule](#WeeklySchedule). 

```protobuf
message ScheduleInfo {
  uint32 ID;
  string name;
  DailySchedule daily;
  WeeklySchedule weekly;
  repeated HolidaySchedule holidays;
}
```
{: #ScheduleInfo}

A schedule is either __DailySchedule__ or __WeeklySchedule__. So, you should not configure both of them in a schedule.
{: .notice--warning}

ID
: The ID of the schedule.

0 is not a valid ID. And, 1 is reserved for the predefined schedule of 'Always'. For example, if you set the [DoorSchedule.scheduleID]({{'/api/access/' | relative_url}}#DoorSchedule) to 1, it means that you can access the door all the time. 
{: .notice--warning}

name
: Maximum 48 characters in UTF-8 encoding.

[daily](#DailySchedule)
: 

[weekly](#WeeklySchedule)
: 

[holidays](#HolidaySchedule)
: Maximum 4 [HolidaySchedule](#HolidaySchedule) can be assigned to a schedule.

```protobuf
message DailySchedule {
  uint32 startDate; 
  repeated DaySchedule daySchedules;
}
```
{: #DailySchedule}

startDate
: The start date of the schedule in the range of 0 to 365. January 1st is 0.

daySchedules
: Up to 90 [DaySchedule](#DaySchedule)s can be assigned to a __DailySchedule__.

```protobuf
message WeeklySchedule {
  repeated DaySchedule daySchedules;
}
```
{: #WeeklySchedule}

daySchedules
: You have to configure 7 [DaySchedule](#DaySchedule)s for a __WeeklySchedule__. The orders are Sunday, Monday, ..., and Saturday.

```protobuf
message HolidaySchedule {
  uint32 groupID;
  DaySchedule daySchedule;
}
```
{: #HolidaySchedule}

groupID
: The ID of a [HolidayGroup](#HolidayGroup).

daySchedule
: The [DaySchedule](#DaySchedule), which will be applied for the holidays in the holiday group.

```protobuf
message DaySchedule {
  repeated TimePeriod periods;
}
```
{: #DaySchedule}

periods
: Maximum 5 [TimePeriod](#TimePeriod)s can be set per __DaySchedule__. These periods should not overlap.

```protobuf
message TimePeriod {
  int32 startTime;
  int32 endTime;
}
```
{: #TimePeriod}

startTime/endTime
: Indicate the time in a day in minutes. For example, 90 means 1:30 AM, and 750 means 12:30 PM.


### GetList

Get the schedules stored on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| schedules | [ScheduleInfo[]](#ScheduleInfo) | The schedules stored on the device |

### Add

Add schedules to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| schedules | [ScheduleInfo[]](#ScheduleInfo) | The schedules to be added to the device |

### AddMulti

Add schedules to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| schedules | [ScheduleInfo[]](#ScheduleInfo) | The schedules to be added to the devices |

### Delete

Delete schedules from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| scheduleIDs | uint32[] | The IDs of the schedules to be deleted from the device |

### DeleteMulti

Delete schedules from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| scheduleIDs | uint32[] | The IDs of the schedules to be deleted from the devices |

### DeleteAll

Delete all schedules from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DeleteAllMulti

Delete all schedules from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |

## Holiday 

You can configure [HolidayGroup](#HolidayGroup), which will be used to identify holidays in a schedule.

```protobuf
message HolidayGroup {
  uint32 ID;
  string name;
  repeated Holiday holidays;
}
```
{: #HolidayGroup}

ID
: The ID of the holiday group.

name
: Maximum 48 characters in UTF-8 encoding.

[holidays](#Holiday)
: Maximum 128 [Holiday](#Holiday)s can be assigned to a holiday group.

```protobuf
message Holiday {
  uint32 date;
  HolidayRecurrence recurrence;
}
```
{: #Holiday}

date
: The date in the year, in the range 0 to 365. January 1st is 0.

[recurrence](#HolidayRecurrence)
: Indicate whether this holiday is recurrent one.

```protobuf
enum HolidayRecurrence {
  DO_NOT_RECUR = 0;
  RECUR_YEARLY = 1;
  RECUR_MONTHLY = 2;
  RECUR_WEEKLY = 3;
}
```
{: #HolidayRecurrence}

### GetHolidayList

Get the holiday groups stored on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| groups | [HolidayGroup[]](#HolidayGroup) | The holiday groups stored on the device |

### AddHoliday

Add holiday groups to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| groups | [HolidayGroup[]](#HolidayGroup) | The holiday groups to be added to the device  |

### AddHolidayMulti

Add holiday groups to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| groups | [HolidayGroup[]](#HolidayGroup) | The holiday groups to be added to the devices |


### DeleteHoliday

Delete holiday groups from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| groupIDs | uint32[] | The IDs of the holiday groups to be deleted from the device |

### DeleteHolidayMulti

Delete holiday groups from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| groupIDs | uint32[] | The IDs of the holiday groups to be deleted from the devices |

### DeleteAllHoliday

Delete all holiday groups from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DeleteAllHolidayMulti

Delete all holiday groups from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
