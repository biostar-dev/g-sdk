---
title: "Schedule API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/schedule/test/test.js_ as needed.
   
    ```javascript
    // the path of the root certificate
    const GATEWAY_CA_FILE = '../../../../cert/gateway/ca.crt';

    // the address of the gateway
    const GATEWAY_IP = '192.168.0.2';
    const GATEWAY_PORT = 4000;

    // the ip address of the target device
    const DEVICE_IP = '192.168.0.110';
    const DEVICE_PORT = 51211;
    const USE_SSL = false;
    ```
5. Install packages.

    ```
    npm install
    ```
6. Run.
   
    ```
    cd example/schedule/test
    node test.js
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```javascript
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);

  var deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);
  ```   

## 2. Make a weekly schedule

To make a weekly schedule, you have to configure 7 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```javascript
  const morningPeriod = new schedule.scheduleMessage.TimePeriod(); // 9 am ~ 12 pm
  morningPeriod.setStarttime(540);
  morningPeriod.setEndtime(720);

  const afternoonPeriod = new schedule.scheduleMessage.TimePeriod(); // 1 pm ~ 6 pm
  afternoonPeriod.setStarttime(780);
  afternoonPeriod.setEndtime(1080);

  const weekdaySchedule = new schedule.scheduleMessage.DaySchedule();
  weekdaySchedule.addPeriods(morningPeriod);
  weekdaySchedule.addPeriods(afternoonPeriod);

  const weekendPeriod = new schedule.scheduleMessage.TimePeriod(); // 9:30 am ~ 12:30 pm
  weekendPeriod.setStarttime(570);
  weekendPeriod.setEndtime(770);

  const weekendSchedule = new schedule.scheduleMessage.DaySchedule();
  weekendSchedule.addPeriods(weekendPeriod);

  const weeklySchedule = new schedule.scheduleMessage.WeeklySchedule();
  weeklySchedule.addDayschedules(weekendSchedule); // Sunday
  weeklySchedule.addDayschedules(weekdaySchedule); // Monday
  weeklySchedule.addDayschedules(weekdaySchedule); // Tuesday
  weeklySchedule.addDayschedules(weekdaySchedule); // Wednesday
  weeklySchedule.addDayschedules(weekdaySchedule); // Thursday
  weeklySchedule.addDayschedules(weekdaySchedule); // Friday
  weeklySchedule.addDayschedules(weekendSchedule); // Saturday

  const scheduleInfo = new schedule.scheduleMessage.ScheduleInfo();
  scheduleInfo.setId(WEEKLY_SCHEDULE_ID);
  scheduleInfo.setName('Sample Weekly Schedule');
  scheduleInfo.setWeekly(weeklySchedule);
  scheduleInfo.addHolidays(holidaySchedule);

  await schedule.add(devID, [scheduleInfo]);
  ``` 

## 3. Make a daily schedule

You can also configure a daily schedule consisting of up to 90 [DaySchedules]({{'/api/schedule' | relative_url}}#DaySchedule).

  ```javascript
  const morningPeriod = new schedule.scheduleMessage.TimePeriod(); // 9 am ~ 12 pm
  morningPeriod.setStarttime(540);
  morningPeriod.setEndtime(720);

  const afternoonPeriod = new schedule.scheduleMessage.TimePeriod(); // 1 pm ~ 6 pm
  afternoonPeriod.setStarttime(780);
  afternoonPeriod.setEndtime(1080);

  const daySchedule = new schedule.scheduleMessage.DaySchedule();
  daySchedule.addPeriods(morningPeriod);
  daySchedule.addPeriods(afternoonPeriod);

  const dailySchedule = new schedule.scheduleMessage.DailySchedule(); // 30 days starting from today
  dailySchedule.setStartdate(moment().dayOfYear() - 1);
  for(let i = 0; i < NUM_OF_DAY; i++){
    dailySchedule.addDayschedules(daySchedule);
  }

  const scheduleInfo = new schedule.scheduleMessage.ScheduleInfo();
  scheduleInfo.setId(DAILY_SCHEDULE_ID);
  scheduleInfo.setName('Sample Daily Schedule');
  scheduleInfo.setDaily(dailySchedule);

  await schedule.add(devID, [scheduleInfo]);
  ```