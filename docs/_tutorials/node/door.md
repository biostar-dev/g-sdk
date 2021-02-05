---
title: "Door API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/door/test/test.js_ as needed.
   
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
    cd example/door/test
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

## 2. Make a door

The example shows how to configure a door consisting of single device. 

  ```javascript
  const relay = new door.doorMessage.Relay();
  relay.setDeviceid(devID);
  relay.setPort(0); // 1st relay

  const sensor = new door.doorMessage.Sensor();
  sensor.setDeviceid(devID);
  sensor.setPort(0); // 1st input port
  sensor.setType(device.deviceMessage.SwitchType.NORMALLY_OPEN);

  const button = new door.doorMessage.ExitButton();
  sensor.setDeviceid(devID);
  sensor.setPort(1); // 2nd input port
  sensor.setType(device.deviceMessage.SwitchType.NORMALLY_OPEN);

  const doorInfo = new door.doorMessage.DoorInfo();
  doorInfo.setDoorid(TEST_DOOR_ID);
  doorInfo.setName('Test Door');
  doorInfo.setEntrydeviceid(devID);
  doorInfo.setRelay(relay);
  doorInfo.setSensor(sensor);
  doorInfo.setButton(button);
  doorInfo.setAutolocktimeout(3); // locked after 3 seconds
  doorInfo.setHeldopentimeout(10); // held open alarm after 10 seconds

  await door.add(devID, [doorInfo]);
  ```

## 3. Make an access group

To allow a user to access a door, you have to assign an access group first. You have to use [Access API]({{'/api/access/' | relative_url}}) to create an access group.

  ```javascript
  const doorSchedule = new access.accessMessage.DoorSchedule(); // can access the test door all the time
  doorSchedule.setDoorid(TEST_DOOR_ID);
  doorSchedule.setScheduleid(ALWAYS_SCHEDULE_ID);

  const accessLevel = new access.accessMessage.AccessLevel();
  accessLevel.setId(TEST_ACCESS_LEVEL_ID);
  accessLevel.setName('Test Access Level');
  accessLevel.addDoorschedules(doorSchedule); 

  await access.addLevel(devID, [accessLevel]);

  const accessGroup = new access.accessMessage.AccessGroup();
  accessGroup.setId(TEST_ACCESS_GROUP_ID);
  accessLevel.setName('Test Access Group');
  accessGroup.addLevelids(TEST_ACCESS_LEVEL_ID);

  await access.add(devID, [accessGroup]);
  ```

Then, you have to assign this access group to a user using [User API]({{'/api/user/' | relative_url}})

  ```javascript
  const userAccessGroup = new user.userMessage.UserAccessGroup();
  userAccessGroup.setUserid(userID);
  userAccessGroup.addAccessgroupids(TEST_ACCESS_GROUP_ID);

  await user.setAccessGroup(devID, [userAccessGroup]);
  ```

## 4. Lock/unlock the door

You can lock or unlock a door manually using the corresponding APIs.

  ```javascript
  // unlock the door
  await door.unlock(devID, [TEST_DOOR_ID], door.doorMessage.DoorFlag.OPERATOR);

  // lock the door
  await door.lock(devID, [TEST_DOOR_ID], door.doorMessage.DoorFlag.OPERATOR);

  // release the door flag for normal operation
  await door.release(devID, [TEST_DOOR_ID], door.doorMessage.DoorFlag.OPERATOR);
  ```