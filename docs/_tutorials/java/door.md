---
title: "Door API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/door/test/DoorTest.java_ as needed.
   
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
    ./build/install/java/bin/doorTest
    ```

## 1. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 2. Make a door

The example shows how to configure a door consisting of single device. 

```java
  Relay relay = Relay.newBuilder().setDeviceID(deviceID).setPort(RELAY_PORT).build();
  Sensor sensor = Sensor.newBuilder().setDeviceID(deviceID).setPort(SENSOR_PORT).setType(SwitchType.NORMALLY_OPEN).build();
  ExitButton button = ExitButton.newBuilder().setDeviceID(deviceID).setPort(EXIT_BUTTON_PORT).setType(SwitchType.NORMALLY_OPEN).build();

  DoorInfo door = DoorInfo.newBuilder()
                  .setDoorID(TEST_DOOR_ID)
                  .setName("Test Door")
                  .setEntryDeviceID(deviceID)
                  .setRelay(relay)
                  .setSensor(sensor)
                  .setButton(button)
                  .setAutoLockTimeout(AUTO_LOCK_TIMEOUT)
                  .setHeldOpenTimeout(HELD_OPEN_TIMEOUT)
                  .build();

  ArrayList<DoorInfo> doors = new ArrayList<DoorInfo>();
  doors.add(door);

  doorSvc.add(deviceID, doors);
```

## 3. Make an access group

To allow a user to access a door, you have to assign an access group first. You have to use [Access API]({{'/api/access/' | relative_url}}) to create an access group.

  ```java
  ArrayList<DoorSchedule> doorSchedules = new ArrayList<DoorSchedule>();
  doorSchedules.add(DoorSchedule.newBuilder().setDoorID(TEST_DOOR_ID).setScheduleID(ALWAYS_SCHEDULE_ID).build()); // can access the test door all the time

  ArrayList<AccessLevel> accessLevels = new ArrayList<AccessLevel>();
  accessLevels.add(AccessLevel.newBuilder().setID(TEST_ACCESS_LEVEL_ID).addAllDoorSchedules(doorSchedules).build());

  accessSvc.addLevel(deviceID, accessLevels);

  ArrayList<AccessGroup> accessGroups = new ArrayList<AccessGroup>();
  accessGroups.add(AccessGroup.newBuilder().setID(TEST_ACCESS_GROUP_ID).addLevelIDs(TEST_ACCESS_LEVEL_ID).build());

  accessSvc.add(deviceID, accessGroups);
  ```

Then, you have to assign this access group to a user using [User API]({{'/api/user/' | relative_url}})

  ```java
  List<UserAccessGroup> userAccessGroups = new ArrayList<UserAccessGroup>();
  userAccessGroups.add(UserAccessGroup.newBuilder().setUserID(userID).addAccessGroupIDs(TEST_ACCESS_GROUP_ID).build());

  userSvc.setAccessGroup(deviceID, userAccessGroups);
  ```

## 4. Lock/unlock the door

You can lock or unlock a door manually using the corresponding APIs.

  ```java
  ArrayList<Integer> doorIDs = new ArrayList<Integer>();
  doorIDs.add(TEST_DOOR_ID);

  // unlock the door
  doorSvc.unlock(deviceID, doorIDs, DoorFlag.OPERATOR);

  // lock the door
  doorSvc.lock(deviceID, doorIDs, DoorFlag.OPERATOR);

  // release the door flag
  doorSvc.release(deviceID, doorIDs, DoorFlag.OPERATOR);
  ```