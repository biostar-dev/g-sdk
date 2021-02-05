---
title: "Door API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C++ client library]({{'/cpp/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses CMake. You can change the _CMakeLists.txt_ file as needed.
5. Change the gateway and the device information in _example/door/test/main.cpp_ as needed.
   
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

      Open _testDoor.vcxproj_ in Visual Studio and build it.

      ```
      ./Debug/testDoor
      ```

    * Linux

      ```
      cmake .
      make testDoor
      ./testDoor
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

## 2. Make a door

The example shows how to configure a door consisting of single device. 

  ```cpp
  Relay relay;
  relay.set_deviceid(deviceID);
  relay.set_port(RELAY_PORT);

  Sensor sensor;
  sensor.set_deviceid(deviceID);
  sensor.set_port(SENSOR_PORT);
  sensor.set_type(SwitchType::NORMALLY_OPEN);

  ExitButton button;
  button.set_deviceid(deviceID);
  button.set_port(EXIT_BUTTON_PORT);
  button.set_type(SwitchType::NORMALLY_OPEN);

  DoorInfo doorInfo;
  doorInfo.set_doorid(TEST_DOOR_ID);
  doorInfo.set_name("Test Door");
  doorInfo.set_entrydeviceid(deviceID);
  *doorInfo.mutable_relay() = relay;
  *doorInfo.mutable_sensor() = sensor;
  *doorInfo.mutable_button() = button;
  doorInfo.set_autolocktimeout(AUTO_LOCK_TIMEOUT);
  doorInfo.set_heldopentimeout(HELD_OPEN_TIMEOUT);

  RepeatedPtrField<DoorInfo> doorInfos;
  doorInfos.Add(std::forward<DoorInfo>(doorInfo));

  doorSvc.Add(deviceID, doorInfos);
  ```

## 3. Make an access group

To allow a user to access a door, you have to assign an access group first. You have to use [Access API]({{'/api/access/' | relative_url}}) to create an access group.

  ```cpp
  DoorSchedule doorSchedule; // can access the test door all the time
  doorSchedule.set_doorid(TEST_DOOR_ID);
  doorSchedule.set_scheduleid(ALWAYS_SCHEDULE_ID);

  AccessLevel accessLevel;
  accessLevel.set_id(TEST_ACCESS_LEVEL_ID);
  *accessLevel.add_doorschedules() = doorSchedule;

  RepeatedPtrField<AccessLevel> accessLevels;
  accessLevels.Add(std::forward<AccessLevel>(accessLevel));

  accessSvc.AddLevel(deviceID, accessLevels);

  AccessGroup accessGroup;
  accessGroup.set_id(TEST_ACCESS_GROUP_ID);
  accessGroup.add_levelids(TEST_ACCESS_LEVEL_ID);

  RepeatedPtrField<AccessGroup> accessGroups;
  accessGroups.Add(std::forward<AccessGroup>(accessGroup));

  accessSvc.Add(deviceID, accessGroups);
  ```

Then, you have to assign this access group to a user using [User API]({{'/api/user/' | relative_url}})

  ```cpp
  UserAccessGroup userAccessGroup;
  userAccessGroup.set_userid(userID);
  userAccessGroup.add_accessgroupids(TEST_ACCESS_GROUP_ID);

  RepeatedPtrField<UserAccessGroup> userAccessGroups;
  userAccessGroups.Add(std::forward<UserAccessGroup>(userAccessGroup));

  userSvc.SetAccessGroup(deviceID, userAccessGroups);
  ```

## 4. Lock/unlock the door

You can lock or unlock a door manually using the corresponding APIs.

  ```cpp
  // unlock the door
  std::vector<uint32_t> doorIDs;
  doorIDs.push_back(TEST_DOOR_ID);

  doorSvc.Unlock(deviceID, doorIDs, DoorFlag::OPERATOR);

  // lock the door
  doorSvc.Lock(deviceID, doorIDs, DoorFlag::OPERATOR);

  // release the door flag for normal operation
  doorSvc.Release(deviceID, doorIDs, DoorFlag::OPERATOR);
  ```