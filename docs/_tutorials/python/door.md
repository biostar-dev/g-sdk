---
title: "Door API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/door/test/test.py_ as needed.
   
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
    cd example/door/test
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

## 2. Make a door

The example shows how to configure a door consisting of single device. 

  ```python
  relay = door_pb2.Relay(deviceID=deviceID, port=0) # 1st relay
  sensor = door_pb2.Sensor(deviceID=deviceID, port=0, type=device_pb2.NORMALLY_OPEN) # 1st input port
  button = door_pb2.ExitButton(deviceID=deviceID, port=1, type=device_pb2.NORMALLY_OPEN) # 2nd input port

  doorInfo = door_pb2.DoorInfo(doorID=TEST_DOOR_ID, name='Test Door', entryDeviceID=deviceID, relay=relay, sensor=sensor, button=button, autoLockTimeout=3, heldOpenTimeout=10)

  self.doorSvc.add(deviceID, [doorInfo])
  ```

## 3. Make an access group

To allow a user to access a door, you have to assign an access group first. You have to use [Access API]({{'/api/access/' | relative_url}}) to create an access group.

  ```python
  doorSchedule = access_pb2.DoorSchedule(doorID=TEST_DOOR_ID, scheduleID=ALWAYS_SCHEDULE_ID) # can access the test door all the time
  accessLevel = access_pb2.AccessLevel(ID=TEST_ACCESS_LEVEL_ID, name='Test Access Level', doorSchedules=[doorSchedule])
  self.accessSvc.addLevel(deviceID, [accessLevel])

  accessGroup = access_pb2.AccessGroup(ID=TEST_ACCESS_GROUP_ID, name='Test Access Group', levelIDs=[TEST_ACCESS_LEVEL_ID])
  self.accessSvc.add(deviceID, [accessGroup])
  ```

Then, you have to assign this access group to a user using [User API]({{'/api/user/' | relative_url}})

  ```python
  userAccessGroup = user_pb2.UserAccessGroup(userID=userID, accessGroupIDs=[TEST_ACCESS_GROUP_ID])
  self.userSvc.setAccessGroup(deviceID, [userAccessGroup])
  ```

## 4. Lock/unlock the door

You can lock or unlock a door manually using the corresponding APIs.

  ```python
  # unlock the door
  self.doorSvc.unlock(deviceID, [TEST_DOOR_ID], door_pb2.OPERATOR)

  # lock the door
  self.doorSvc.lock(deviceID, [TEST_DOOR_ID], door_pb2.OPERATOR)

  # release the door flag for normal operation
  self.doorSvc.release(deviceID, [TEST_DOOR_ID], door_pb2.OPERATOR)
  ```