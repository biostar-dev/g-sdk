---
title: "Schedule API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/schedule/test/test.py_ as needed.
   
    ```python
    # the path of the root certificate
    GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt'

    # the ip address of the gateway
    GATEWAY_IP = '192.168.0.2'
    GATEWAY_PORT = 4000

    # the ip address of the target device
    DEVICE_IP = '192.168.0.110'
    DEVICE_PORT = 51211
    USE_SSL = False
    ```
5. Run.
   
    ```
    cd example/schedule/test
    python test.py
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```python
  client = GatewayClient(GATEWAY_IP, GATEWAY_PORT, GATEWAY_CA_FILE)
  channel = client.getChannel()
  
  connectSvc = ConnectSvc(channel)
  connInfo = connect_pb2.ConnectInfo(IPAddr=DEVICE_IP, port=DEVICE_PORT, useSSL=USE_SSL)

  devID = connectSvc.connect(connInfo)
  ```   

## 2. Make a weekly schedule

To make a weekly schedule, you have to configure 7 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```python
  weekdaySchedule = schedule_pb2.DaySchedule()
  weekdaySchedule.periods.append(schedule_pb2.TimePeriod(startTime=540, endTime=720)) # 9 am ~ 12 pm
  weekdaySchedule.periods.append(schedule_pb2.TimePeriod(startTime=780, endTime=1080)) # 1 pm ~ 6 pm

  weekendSchedule = schedule_pb2.DaySchedule()
  weekendSchedule.periods.append(schedule_pb2.TimePeriod(startTime=570, endTime=770)) # 9:30 am ~ 12:30 pm

  weeklySchedule = schedule_pb2.WeeklySchedule()
  weeklySchedule.daySchedules.append(weekendSchedule) # Sunday
  weeklySchedule.daySchedules.append(weekdaySchedule) # Monday
  weeklySchedule.daySchedules.append(weekdaySchedule) # Tuessay
  weeklySchedule.daySchedules.append(weekdaySchedule) # Wednesday
  weeklySchedule.daySchedules.append(weekdaySchedule) # Thursday
  weeklySchedule.daySchedules.append(weekdaySchedule) # Friday
  weeklySchedule.daySchedules.append(weekendSchedule) # Saturday

  scheduleInfo = schedule_pb2.ScheduleInfo(ID=WEEKLY_SCHEDULE_ID, name='Sample Weekly Schedule', weekly=weeklySchedule, holidays=[holidaySchedule])

  self.scheduleSvc.add(deviceID, [scheduleInfo])
  ``` 

## 3. Make a daily schedule

You can also configure a daily schedule consisting of up to 90 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```python
  daySchedule = schedule_pb2.DaySchedule()
  daySchedule.periods.append(schedule_pb2.TimePeriod(startTime=540, endTime=720)) # 9 am ~ 12 pm
  daySchedule.periods.append(schedule_pb2.TimePeriod(startTime=780, endTime=1080)) # 1 pm ~ 6 pm

  dailySchedule = schedule_pb2.DailySchedule(startDate=int(datetime.now().strftime('%j')) - 1) # 30 days starting from today
  for i in range(NUM_OF_DAY):
    dailySchedule.daySchedules.append(daySchedule)

  scheduleInfo = schedule_pb2.ScheduleInfo(ID=DAILY_SCHEDULE_ID, name='Sample Daily Schedule', daily=dailySchedule)

  self.scheduleSvc.add(deviceID, [scheduleInfo])
  ```