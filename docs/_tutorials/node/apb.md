---
title: "Anti Passback Zone API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/apb/test/test.js_ as needed.
   
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
    cd example/apb/test
    node test.js
    ```

## 1. Configure devices

An anti passback zone consists of multiple devices connected by RS485. To run the example, you have to configure two devices as below.

1. Connect two devices by RS485.
2. Set one device as a master and the other as a slave. You can configure this setting using the device UI or BioStar 2. Or, you can use [RS485 API]({{'/api/rs485/' | relative_url}}).

## 2. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```javascript
  var rootCa = fs.readFileSync(GATEWAY_CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);
  var addr = `${GATEWAY_IP}:${GATEWAY_PORT}`;

  connect.initClient(addr, sslCreds);

  var deviceID = await connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL);
  ```   

## 3. Search and register RS485 slaves

  ```javascript
  slaves = await rs485.searchSlave(devID);

  registeredSlaves = await rs485.getSlave(devID);

  if(registeredSlaves.length == 0) {
    await rs485.setSlave(devID, slaves);
  }
  ```

## 4. Make a zone using the master and the slave devices.

  ```javascript
  const entryDevice = new apb.apbZoneMessage.Member();
  entryDevice.setDeviceid(devID);
  entryDevice.setReadertype(apb.apbZoneMessage.ReaderType.ENTRY);

  const exitDevice = new apb.apbZoneMessage.Member();
  exitDevice.setDeviceid(slaves[0].getDeviceid());
  exitDevice.setReadertype(apb.apbZoneMessage.ReaderType.EXIT);

  const relaySignal = new action.actionMessage.Signal();
  relaySignal.setCount(3);
  relaySignal.setOnduration(500);
  relaySignal.setOffduration(500);

  const relayAction = new action.actionMessage.RelayAction();
  relayAction.setRelayindex(0);
  relayAction.setSignal(relaySignal);

  const zoneAction = new action.actionMessage.Action();
  zoneAction.setDeviceid(devID);
  zoneAction.setType(action.actionMessage.ActionType.ACTION_RELAY);
  zoneAction.setRelay(relayAction);
  
  const zone = new apb.apbZoneMessage.ZoneInfo();
  zone.setZoneid(TEST_ZONE_ID);
  zone.setName("Test APB Zone");
  zone.setType(apb.apbZoneMessage.Type.HARD);
  zone.setResetduration(0); // indefinite
  zone.addMembers(entryDevice);
  zone.addMembers(exitDevice);
  zone.addActions(zoneAction);

  apb.add(devID, [zone]);
  // Test if APB zone works correctly
  ```  
