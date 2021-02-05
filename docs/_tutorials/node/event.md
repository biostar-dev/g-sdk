---
title: "Event API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Node.js client library]({{'/node/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _example/event/test/test.js_ as needed.
   
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
    cd example/event/test
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

## 2. Initialize the event code map

Since V1.3, the event code map, __event_code.json__, is provided. You can use it in your application for looking up the short descriptions of event codes.

  ```javascript
  function initCodeMap(filename) {
    var jsonData = fs.readFileSync(filename);
    codeMap = JSON.parse(jsonData);
  }

  function getEventString(eventCode, subCode) {
    for(entry of codeMap.entries) {
      if(eventCode == entry.event_code && subCode == entry.sub_code) {
        return entry.desc;
      }
    }

    return util.format('Unknown event(0x%s)', (eventCode | subCode).toString(16));
  }

  event.initCodeMap(CODE_MAP_FILE);
  ```

## 3. Receive realtime events

To receive realtime events from the devices, you have to do the followings.

1. [Enable monitoring]({{'/api/event' | relative_url}}#enablemonitoring) on target devices.
2. [Subscribe]({{'/api/event' | relative_url}}#subscriberealtimelog) to the event channel.
3. Read the events from the channel.

  ```javascript
  await event.enableMonitoring(devID);
  
  sub = event.subscribe(EVENT_QUEUE_SIZE);

  sub.on('data', (event) => {
    // do something with the event
    console.log('Event: ', event.toObject());
  });
  ```

## 4. Read event logs

When reading event logs, you can specify the starting index and the maximum number of events.

  ```javascript
  const events = util.toObjectArray(await event.getLog(devID, firstEventID, MAX_NUM_EVENT));

  for(i = 0; i < events.length; i++) {
    printEvent(events[i]);
  }
  ```

You can also specify a filter to limit your search.

  ```javascript
  var eventFilter = new event.eventMessage.EventFilter();
  eventFilter.setEventcode(events[0].eventcode);

  const filteredEvents = util.toObjectArray(await event.getLogWithFilter(devID, firstEventID, MAX_NUM_EVENT, eventFilter));
  for(i = 0; i < filteredEvents.length; i++) {
    printEvent(filteredEvents[i]);
  }
  ```
