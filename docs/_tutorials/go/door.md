---
title: "Door API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/door/test/test.go_ as needed.
   
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
    cd src/example/door/test
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

## 2. Make a door

The example shows how to configure a door consisting of single device. 

```go
  singleDoor := &door.DoorInfo{
    DoorID: doorID,
    Name: fmt.Sprintf("Test Door %v", doorID),
    EntryDeviceID: deviceID,
    Relay: &door.Relay{
      DeviceID: deviceID,
      Port: RELAY_PORT,
    },
    Sensor: &door.Sensor{
      DeviceID: deviceID,
      Port: SENSOR_PORT,
      Type: device.SwitchType_NORMALLY_OPEN,
    },
    Button: &door.ExitButton{
      DeviceID: deviceID,
      Port: EXIT_BUTTON_PORT,
      Type: device.SwitchType_NORMALLY_OPEN,
    },
    AutoLockTimeout: AUTO_LOCK_TIMEOUT,
    HeldOpenTimeout: HELD_OPEN_TIMEOUT,
  }
```

## 3. Make an access group

To allow a user to access a door, you have to assign an access group first. You have to use [Access API]({{'/api/access/' | relative_url}}) to create an access group.

  ```go
  accessLevel := &access.AccessLevel{
    ID: TEST_ACCESS_LEVEL_ID,
    DoorSchedules: []*access.DoorSchedule{
      &access.DoorSchedule{
        DoorID: TEST_DOOR_ID,
        ScheduleID: ALWAYS_SCHEDULE_ID, // always
      },
    },
  }

  accessSvc.AddLevel(deviceID, []*access.AccessLevel{ accessLevel })

  accessGroup := &access.AccessGroup{
    ID: TEST_ACCESS_GROUP_ID,
    LevelIDs: []uint32{
      TEST_ACCESS_LEVEL_ID,
    },
  }

  accessSvc.Add(deviceID, []*access.AccessGroup{ accessGroup })
  ```

Then, you have to assign this access group to a user using [User API]({{'/api/user/' | relative_url}})

  ```go
  userAccessGroups := []*user.UserAccessGroup{
    &user.UserAccessGroup{
      UserID: userID,
      AccessGroupIDs: []uint32{ TEST_ACCESS_GROUP_ID },
    },
  }

  userSvc.SetAccessGroup(deviceID, userAccessGroups)
  ```

## 4. Lock/unlock the door

You can lock or unlock a door manually using the corresponding APIs.

  ```go
  // unlock the door
  doorSvc.Unlock(deviceID, []uint32{ TEST_DOOR_ID }, door.DoorFlag_OPERATOR)

  // lock the door
  doorSvc.Lock(deviceID, []uint32{ TEST_DOOR_ID }, door.DoorFlag_OPERATOR)  

  // release the door flag for normal operation
  doorSvc.Release(deviceID, []uint32{ TEST_DOOR_ID }, door.DoorFlag_OPERATOR)
  ```