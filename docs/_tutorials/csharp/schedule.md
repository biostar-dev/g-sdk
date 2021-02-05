---
title: "Schedule API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/schedule/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/schedule/test/Program.cs_ as needed.
   
    ```csharp
    // the path of the root certificate
    private const string GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt";

    // the address of the gateway
    private const string GATEWAY_ADDR = "192.168.0.2";
    private const int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private const string DEVICE_ADDR = "192.168.0.110";
    private const int DEVICE_PORT = 51211;
    ```
6. Build and run.

    ```
    cd example/schedule/test
    dotnet run
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```csharp
  GatewayClient gatewayClient = new GatewayClient();
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  var connectInfo = new ConnectInfo{ IPAddr = DEVICE_ADDR, Port = DEVICE_PORT, UseSSL = USE_SSL };
  uint devID = userTest.connectSvc.Connect(connectInfo); 
  ```  

## 2. Make a weekly schedule

To make a weekly schedule, you have to configure 7 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```csharp
  var weekdaySchedule = new DaySchedule();
  weekdaySchedule.Periods.Add(new TimePeriod{ StartTime = 540, EndTime = 720 }); // 9 am ~ 12 pm
  weekdaySchedule.Periods.Add(new TimePeriod{ StartTime = 780, EndTime = 1080 }); // 1 pm ~ 6 pm

  var weekendSchedule = new DaySchedule();
  weekendSchedule.Periods.Add(new TimePeriod{ StartTime = 570, EndTime = 770 }); // 9:30 am ~ 12:30 pm

  var weeklySchedule = new WeeklySchedule();
  weeklySchedule.DaySchedules.Insert(0, weekendSchedule); // Sunday
  weeklySchedule.DaySchedules.Insert(1, weekdaySchedule); // Monday
  weeklySchedule.DaySchedules.Insert(2, weekdaySchedule); // Tuesday
  weeklySchedule.DaySchedules.Insert(3, weekdaySchedule); // Wednesday
  weeklySchedule.DaySchedules.Insert(4, weekdaySchedule); // Thursday
  weeklySchedule.DaySchedules.Insert(5, weekdaySchedule); // Friday
  weeklySchedule.DaySchedules.Insert(6, weekendSchedule); // Saturday

  var scheduleInfo = new ScheduleInfo{ ID = WEEKLY_SCHEDULE_ID, Name = "Sample Weekly Schedule", Weekly = weeklySchedule };
  scheduleInfo.Holidays.Add(holidaySchedule);

  scheduleSvc.Add(deviceID, new ScheduleInfo[]{ scheduleInfo });
  ``` 

## 3. Make a daily schedule

You can also configure a daily schedule consisting of up to 90 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```csharp
  var daySchedule = new DaySchedule();
  daySchedule.Periods.Add(new TimePeriod{ StartTime = 540, EndTime = 720 }); // 9 am ~ 12 pm
  daySchedule.Periods.Add(new TimePeriod{ StartTime = 780, EndTime = 1080 }); // 1 pm ~ 6 pm

  var dailySchedule = new DailySchedule{ StartDate = (uint)(DateTime.Now.DayOfYear - 1) }; // 30 days starting from today
  for(int i = 0; i < NUM_OF_DAY; i++) {
    dailySchedule.DaySchedules.Insert(i, daySchedule);
  }

  var scheduleInfo = new ScheduleInfo{ ID = DAILY_SCHEDULE_ID, Name = "Sample Daily Schedule", Daily = dailySchedule };

  scheduleSvc.Add(deviceID, new ScheduleInfo[]{ scheduleInfo });
  ```