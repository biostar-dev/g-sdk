---
title: "Schedule API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/schedule/test/ScheduleTest.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String GATEWAY_CA_FILE = "cert/gateway/ca.crt";

    // the address of the gateway
    private static final String GATEWAY_ADDR = "192.168.0.2";
    private static final int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private static final String DEVICE_ADDR = "192.168.0.110"; 
    private static final int DEVICE_PORT = 51211;
    ```
6. Build.

    ```
    ./gradlew installDist
    ```
7. Run.
   
    ```
    ./build/install/java/bin/scheduleTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Make a weekly schedule

To make a weekly schedule, you have to configure 7 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```java
  ArrayList<TimePeriod> weekdayPeriods = new ArrayList<TimePeriod>();
  weekdayPeriods.add(TimePeriod.newBuilder().setStartTime(540).setEndTime(720).build()); // 9 am ~ 12 pm
  weekdayPeriods.add(TimePeriod.newBuilder().setStartTime(780).setEndTime(1080).build()); // 1 pm ~ 6 pm
  DaySchedule weekdaySchedule = DaySchedule.newBuilder().addAllPeriods(weekdayPeriods).build();

  ArrayList<TimePeriod> weekendPeriods = new ArrayList<TimePeriod>();
  weekendPeriods.add(TimePeriod.newBuilder().setStartTime(570).setEndTime(770).build()); // 9:30 am ~ 12:30 pm
  DaySchedule weekendSchedule = DaySchedule.newBuilder().addAllPeriods(weekendPeriods).build();

  ArrayList<DaySchedule> daySchedules = new ArrayList<DaySchedule>();
  daySchedules.add(0, weekendSchedule); // Sunday
  daySchedules.add(1, weekdaySchedule); // Monday
  daySchedules.add(2, weekdaySchedule); // Tuesday
  daySchedules.add(3, weekdaySchedule); // Wednesday
  daySchedules.add(4, weekdaySchedule); // Thursday
  daySchedules.add(5, weekdaySchedule); // Friday
  daySchedules.add(6, weekendSchedule); // Saturday

  WeeklySchedule weeklySchedule = WeeklySchedule.newBuilder().addAllDaySchedules(daySchedules).build();

  ScheduleInfo scheduleInfo = ScheduleInfo.newBuilder().setID(WEEKLY_SCHEDULE_ID).setName("Sample Weekly Schedule").setWeekly(weeklySchedule).addHolidays(holidaySchedule).build();

  ArrayList<ScheduleInfo> scheduleInfos = new ArrayList<ScheduleInfo>();
  scheduleInfos.add(scheduleInfo);

  scheduleSvc.add(deviceID, scheduleInfos);
  ``` 

## 3. Make a daily schedule

You can also configure a daily schedule consisting of up to 90 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```java
  ArrayList<TimePeriod> dayPeriods = new ArrayList<TimePeriod>();
  dayPeriods.add(TimePeriod.newBuilder().setStartTime(540).setEndTime(720).build()); // 9 am ~ 12 pm
  dayPeriods.add(TimePeriod.newBuilder().setStartTime(780).setEndTime(1080).build()); // 1 pm ~ 6 pm

  ArrayList<DaySchedule> daySchedules = new ArrayList<DaySchedule>();
  for(int i = 0; i < NUM_OF_DAY; i++) {
    daySchedules.add(DaySchedule.newBuilder().addAllPeriods(dayPeriods).build());
  }

  DailySchedule dailySchedule = DailySchedule.newBuilder().setStartDate(Calendar.getInstance().get(Calendar.DAY_OF_YEAR) - 1).addAllDaySchedules(daySchedules).build(); // 30 days starting from today

  ScheduleInfo scheduleInfo = ScheduleInfo.newBuilder().setID(DAILY_SCHEDULE_ID).setName("Sample Daily Schedule").setDaily(dailySchedule).build();

  ArrayList<ScheduleInfo> scheduleInfos = new ArrayList<ScheduleInfo>();
  scheduleInfos.add(scheduleInfo);

  scheduleSvc.add(deviceID, scheduleInfos);
  ```