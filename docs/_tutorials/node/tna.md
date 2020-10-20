---
title: "T&A API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/tna/test/test.js_ as needed.
   
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
    cd example/tna/test
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

## 2. Test the T&A configuration

There are several options you can configure related to the T&A functions. The example shows how to configure some of these options and let you check the results.

  ```javascript
  // (1) BY_USER
  var config = new tna.tnaMessage.TNAConfig();
  config.setMode(tna.tnaMessage.Mode.BY_USER);
  config.setLabelsList(['In', 'Out', 'Scheduled In', 'Fixed Out']);
  await tna.setConfig(devID, config);

  console.log('(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');
  
  // (2) IsRequired
  config.setIsrequired(true);
  await tna.setConfig(devID, config);

  console.log('(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');

  // (3) LAST_CHOICE
  config.setMode(tna.tnaMessage.Mode.LAST_CHOICE);
  await tna.setConfig(devID, config);

  console.log('(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');    

  // (4) BY_SCHEDULE
  config.setMode(tna.tnaMessage.Mode.BY_SCHEDULE);
  config.setSchedulesList([0, 0, 1]); // Always for KEY_3 (Scheduled In)
  await tna.setConfig(devID, config);

  console.log('(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');    
  
  // (5) FIXED    
  config.setMode(tna.tnaMessage.Mode.FIXED);
  config.setKey(tna.tnaMessage.Key.KEY_4);
  await tna.setConfig(devID, config);

  console.log('(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key.', '\n');
  await menu.pressEnter('>> Press ENTER if you finish testing this mode.\n');
  ```

## 3. Get the T&A logs

You can read the log records with T&A key information using [TNA.GetTNALog]({{'/api/tna' | relative_url}}#gettnalog). To get the label of the key, you have to look up the [TNAConfig.labels]({{'/api/tna' | relative_url}}#TNAConfig).

  ```javascript
  const events = await tna.getTNALog(devID, firstEventID, 0);

  // ...

  function getTNALabel(key, config) {
    if(config.getLabelsList().length > key - 1) {
      return util.format('%s(%d)', config.getLabelsList()[key - 1], key);
    } else {
      return util.format('%d', key);
    }
  }
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

