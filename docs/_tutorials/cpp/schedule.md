---
title: "Schedule API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/schedule/test/main.cpp_ as needed.
   
    ```cpp
    // the path of the root certificate
    const std::string GATEWAY_CA_FILE = "../cert/gateway/ca.crt";

    // the address of the gateway
    const std::string GATEWAY_ADDR = "192.168.0.2";
    const int GATEWAY_PORT = 4000;
    
    // the ip address of the target device
    const std::string DEVICE_IP = "192.168.0.110";
    const int DEVICE_PORT = 51211;
    const bool USE_SSL = false;
    ```
6. Build and run.
 
    * Windows
    
      ```
      cmake .
      ```

      Open _testSchedule.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testSchedule
      ```

    * Linux

      ```
      cmake .
      make testSchedule
      ./testSchedule
      ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```cpp
  auto gatewayClient = std::make_shared<GatewayClient>();
  gatewayClient->Connect(GATEWAY_ADDR, GATEWAY_PORT, GATEWAY_CA_FILE);

  ConnectSvc connectSvc(gatewayClient->GetChannel());

  ConnectInfo connInfo;
  connInfo.set_ipaddr(DEVICE_IP);
  connInfo.set_port(DEVICE_PORT);
  connInfo.set_usessl(USE_SSL);

  uint32_t deviceID = 0;
  connectSvc.Connect(connInfo, &deviceID);
  ```  

## 2. Make a weekly schedule

To make a weekly schedule, you have to configure 7 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```cpp
  TimePeriod weekday1stPeriod; // 9 am ~ 12 pm
  weekday1stPeriod.set_starttime(540);
  weekday1stPeriod.set_endtime(720);

  TimePeriod weekday2ndPeriod; // 1 pm ~ 6 pm
  weekday2ndPeriod.set_starttime(780);
  weekday2ndPeriod.set_endtime(1080);

  DaySchedule weekdaySchedule;
  *weekdaySchedule.add_periods() = weekday1stPeriod;
  *weekdaySchedule.add_periods() = weekday2ndPeriod;

  TimePeriod weekendPeriod; // 9:30 am ~ 12:30 pm
  weekendPeriod.set_starttime(570);
  weekendPeriod.set_endtime(770); 

  DaySchedule weekendSchedule;
  *weekendSchedule.add_periods() = weekendPeriod;

  WeeklySchedule weeklySchedule;
  *weeklySchedule.add_dayschedules() = weekendSchedule; // Sunday
  *weeklySchedule.add_dayschedules() = weekdaySchedule; // Monday
  *weeklySchedule.add_dayschedules() = weekdaySchedule; // Tuesday
  *weeklySchedule.add_dayschedules() = weekdaySchedule; // Wednesday
  *weeklySchedule.add_dayschedules() = weekdaySchedule; // Thursday
  *weeklySchedule.add_dayschedules() = weekdaySchedule; // Friday
  *weeklySchedule.add_dayschedules() = weekendSchedule; // Saturday

  TimePeriod holidayPeriod; // 10 am ~ 12 pm
  holidayPeriod.set_starttime(600);
  holidayPeriod.set_endtime(720); 

  DaySchedule holidayDaySchedule;
  *holidayDaySchedule.add_periods() = holidayPeriod;

  HolidaySchedule holidaySchedule;
  holidaySchedule.set_groupid(SAMPLE_HOLIDAY_GROUP_ID);
  *holidaySchedule.mutable_dayschedule() = holidayDaySchedule;

  ScheduleInfo schedule;
  schedule.set_id(WEEKLY_SCHEDULE_ID);
  schedule.set_name("Sample Weekly Schedule");
  *schedule.mutable_weekly() = weeklySchedule;
  *schedule.add_holidays() = holidaySchedule;

  RepeatedPtrField<ScheduleInfo> schedules;
  schedules.Add(std::forward<ScheduleInfo>(schedule));

  svc.Add(deviceID, schedules);    
  ``` 

## 3. Make a daily schedule

You can also configure a daily schedule consisting of up to 90 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```cpp
  TimePeriod firstPeriod; // 9 am ~ 12 pm
  firstPeriod.set_starttime(540);
  firstPeriod.set_endtime(720);

  TimePeriod secondPeriod; // 1 pm ~ 6 pm
  secondPeriod.set_starttime(780);
  secondPeriod.set_endtime(1080);

  DaySchedule daySchedule;
  *daySchedule.add_periods() = firstPeriod;
  *daySchedule.add_periods() = secondPeriod;

  time_t curTime = time(NULL);
  DailySchedule dailySchedule;
  dailySchedule.set_startdate(localtime(&curTime)->tm_yday); // 30 days starting from today
  for(int i = 0; i < NUM_OF_DAY; i++) {
    *dailySchedule.add_dayschedules() = daySchedule;
  }

  ScheduleInfo schedule;
  schedule.set_id(DAILY_SCHEDULE_ID);
  schedule.set_name("Sample Daily Schedule");
  *schedule.mutable_daily() = dailySchedule;

  RepeatedPtrField<ScheduleInfo> schedules;
  schedules.Add(std::forward<ScheduleInfo>(schedule));

  svc.Add(deviceID, schedules); 
  ```