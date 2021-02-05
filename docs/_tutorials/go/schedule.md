---
title: "Schedule API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/schedule/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the target device
    DEV_IP = "192.168.0.110"
    DEV_PORT = 51211
    USE_SSL = false
    ```
5. Build.

    ```
    cd src/example/schedule/test
    go build .
    ```
6. Run.
   
    ```
    ./test
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```go
  gatewayClient := &client.GatewayClient{}
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_IP, GATEWAY_PORT)

  connectSvc = connect.NewConnectSvc(gatewayClient.GetConn())
  deviceID, _ := connectSvc.Connect(DEV_IP, DEV_PORT, USE_SSL)
  ```   

## 2. Make a weekly schedule

To make a weekly schedule, you have to configure 7 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```go
  weekdayPeriods := []*schedule.TimePeriod {
    &schedule.TimePeriod{
      StartTime: 540, // 9 * 60 min, 9 am
      EndTime: 720, // 12 * 60 min, 12 pm
    },
    &schedule.TimePeriod{
      StartTime: 780, // 13 * 60 min, 1 pm
      EndTime: 1080, // 18 * 60 min, 6 pm
    },
  }

  weekday := &schedule.DaySchedule{
    Periods: weekdayPeriods,
  }

  weekendPeriods := []*schedule.TimePeriod {
    &schedule.TimePeriod{
      StartTime: 570, // (9 * 60) + 30 min, 9:30 am
      EndTime: 750, // (12 * 60) + 30 min, 12:30 pm
    },
  }

  weekend := &schedule.DaySchedule{
    Periods: weekendPeriods,
  }

  weeklySchedule := &schedule.WeeklySchedule{
    DaySchedules: []*schedule.DaySchedule{
      weekend, // Sunday
      weekday, // Monday
      weekday, // Tuesday
      weekday, // Wednesday
      weekday, // Thursday
      weekday, // Friday
      weekend, // Saturday
    },
  }

  weeklyScheduleInfo := &schedule.ScheduleInfo{
    ID: WEEKLY_SCHEDULE_ID,
    Name: "Sample Weekly Schedule",
    Weekly: weeklySchedule,
    Holidays: []*schedule.HolidaySchedule{ holidaySchedule },
  }  

  scheduleSvc.Add(deviceID, []*schedule.ScheduleInfo{ weeklyScheduleInfo })
  ``` 

## 3. Make a daily schedule

You can also configure a daily schedule consisting of up to 90 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```go
  dailySchedule := &schedule.DailySchedule{
    StartDate: uint32(time.Now().YearDay() - 1), // 30 days from today
    DaySchedules: []*schedule.DaySchedule{},
  }

  dayPeriods := []*schedule.TimePeriod {
    &schedule.TimePeriod{
      StartTime: 540, // 9 * 60 min, 9 am
      EndTime: 720, // 12 * 60 min, 12 pm
    },
    &schedule.TimePeriod{
      StartTime: 780, // 13 * 60 min, 1 pm
      EndTime: 1080, // 18 * 60 min, 6 pm
    },
  }	

  for i := 0; i < NUM_OF_DAY; i++ {
    daySchedule := &schedule.DaySchedule{
      Periods: dayPeriods,
    }			

    dailySchedule.DaySchedules = append(dailySchedule.DaySchedules, daySchedule)
  }

  dailyScheduleInfo := &schedule.ScheduleInfo{
    ID: DAILY_SCHEDULE_ID,
    Name: "Sample Daily Schedule",
    Daily: dailySchedule,
  }

  scheduleSvc.Add(deviceID, []*schedule.ScheduleInfo{ dailyScheduleInfo })  
  ```