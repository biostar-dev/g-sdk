---
title: "Thermal API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/thermal/test/test.js_ as needed.
   
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
    cd example/thermal/test
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

## 2. Test the thermal configuration

There are several options you can configure related to the thermal camera. The example shows how to configure some of these options and let you check the results.

```javascript
  // Set options for the test
  config.setAudittemperature(true); // write temperature logs
  config.setCheckmode(thermal.thermalMessage.CheckMode.HARD); // disalllow access when temperature is too high

  // (1) Set check order to AFTER_AUTH
  config.setCheckorder(thermal.thermalMessage.CheckOrder.AFTER_AUTH);
  await thermal.setConfig(devID, config);

  console.log('(1) The Check Order is set to AFTER_AUTH. The device will try to authenticate a user only when the user\'s temperature is within the threshold. Try to authenticate faces.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

  // (2) Set check order to BEFORE_AUTH
  config.setCheckorder(thermal.thermalMessage.CheckOrder.BEFORE_AUTH);
  await thermal.setConfig(devID, config);

  console.log('(2) The Check Order is set to BEFORE_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

  // (3) Set check order to WITHOUT_AUTH
  config.setCheckorder(thermal.thermalMessage.CheckOrder.WITHOUT_AUTH);
  await thermal.setConfig(devID, config);

  console.log('(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

  // (4) Set check order to AFTER_AUTH with too low threshold
  config.setCheckorder(thermal.thermalMessage.CheckOrder.AFTER_AUTH);
  config.setTemperaturethreshold(3500); // Too low threshold. Most temperature check will fail
  await thermal.setConfig(devID, config);

  console.log('(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');    
```

## 3. Get the temperature logs

If you set the [ThermalConfig.AuditTemperature]({{'/api/thermal' | relative_url}}#ThermalConfig) to true, the device will record the temperature of users in addition to other information. You can read these logs using [Thermal.GetTempeartureLog]({{'/api/thermal' | relative_url}}#gettemperaturelog).

  ```javascript
  const events = await thermal.getTemperatureLog(devID, firstEventID, 0);
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```javascript
  await event.enableMonitoring(devID);

  sub = event.subscribe(EVENT_QUEUE_SIZE);

  sub.on('data', (event) => {
    console.log('Event: ', event.toObject());
  });

  sub.on('end', () => {
    console.log('Subscription is finished');
  });

  sub.on('error', (err) => {
    if(err.details === 'Cancelled') {
      console.log("Subscription is cancelled");
    } else {
      console.log('Subscription error: ', err);
    }
  })
  ```

