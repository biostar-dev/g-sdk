---
title: "Door API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/door/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/door/test/Program.cs_ as needed.
   
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
    cd example/door/test
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

## 2. Make a door

The example shows how to configure a door consisting of single device. 

  ```csharp
  var door = new DoorInfo{ 
                  DoorID = TEST_DOOR_ID, 
                  Name = "Test Door", 
                  EntryDeviceID = deviceID, 
                  Relay = new Relay{ 
                                DeviceID = deviceID,
                                Port = 0 // 1st relay
                              },
                  Sensor = new Sensor {
                                DeviceID = deviceID,
                                Port = 0, // 1st input port
                                Type = SwitchType.NormallyOpen
                              },
                  Button = new ExitButton {
                                DeviceID = deviceID,
                                Port = 1, // 2nd input port
                                Type = SwitchType.NormallyOpen                                    
                              },
                  AutoLockTimeout = 3, // locked after 3 seconds
                  HeldOpenTimeout = 10 // held open alarm after 10 seconds
                };

  doorSvc.Add(deviceID, new DoorInfo[]{ door });
  ```

## 3. Make an access group

To allow a user to access a door, you have to assign an access group first. You have to use [Access API]({{'/api/access/' | relative_url}}) to create an access group.

  ```csharp
  var doorSchedule = new DoorSchedule{ DoorID = TEST_DOOR_ID, ScheduleID = ALWAYS_SCHEDULE_ID }; // can access the test door all the time
  var accessLevel = new AccessLevel{ ID = TEST_ACCESS_LEVEL_ID };
  accessLevel.DoorSchedules.Add(doorSchedule);

  accessSvc.AddLevel(deviceID, new AccessLevel[]{ accessLevel });

  var accessGroup = new AccessGroup{ ID = TEST_ACCESS_GROUP_ID };
  accessGroup.LevelIDs.Add(TEST_ACCESS_LEVEL_ID);

  accessSvc.Add(deviceID, new AccessGroup[]{ accessGroup });
  ```

Then, you have to assign this access group to a user using [User API]({{'/api/user/' | relative_url}})

  ```csharp
  var userAccessGroup = new UserAccessGroup{ UserID = userID };
  userAccessGroup.AccessGroupIDs.Add(TEST_ACCESS_GROUP_ID);

  userSvc.SetAccessGroup(deviceID, new UserAccessGroup[]{ userAccessGroup });
  ```

## 4. Lock/unlock the door

You can lock or unlock a door manually using the corresponding APIs.

  ```csharp
  // unlock the door
  var doorIDs = new uint[]{ TEST_DOOR_ID };
  doorSvc.Unlock(deviceID, doorIDs, DoorFlag.Operator);

  // lock the door
  doorSvc.Lock(deviceID, doorIDs, DoorFlag.Operator);  

  // release the door flag for normal operation
  doorSvc.Release(deviceID, doorIDs, DoorFlag.Operator);
  ```