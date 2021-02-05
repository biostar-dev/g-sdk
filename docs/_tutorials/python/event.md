---
title: "Event API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/event/test/test.py_ as needed.
   
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
    cd example/event/test
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

## 2. Initialize the event code map

Since V1.3, the event code map, __event_code.json__, is provided. You can use it in your application for looking up the short descriptions of event codes.

  ```python
  class EventSvc:
    def initCodeMap(self, filename):
      try:
        with open(filename) as f:
          self.codeMap = json.load(f)

    def getEventString(self, eventCode, subCode):
      for entry in self.codeMap['entries']:
        if eventCode == entry['event_code'] and subCode == entry['sub_code']:
          return entry['desc']

      return "Unknown code(%#X)" % (eventCode | subCode)

  eventSvc.initCodeMap(CODE_MAP_FILE)
  ```

## 3. Receive realtime events

To receive realtime events from the devices, you have to do the followings.

1. [Enable monitoring]({{'/api/event' | relative_url}}#enablemonitoring) on target devices.
2. [Subscribe]({{'/api/event' | relative_url}}#subscriberealtimelog) to the event channel.
3. Read the events from the channel.

  ```python
  def handleEvent(self):
    for event in self.eventCh:
      # do something with the event
    
  self.eventSvc.enableMonitoring(deviceID)
  self.eventCh = self.eventSvc.subscribe(EVENT_QUEUE_SIZE)

  statusThread = threading.Thread(target=self.handleEvent)
  statusThread.start()
  ```

## 4. Read event logs

When reading event logs, you can specify the starting index and the maximum number of events.

  ```python
  events = self.eventSvc.getLog(deviceID, self.firstEventID, MAX_NUM_EVENT)
  for event in events:
    self.printEvent(event)
  ```

You can also specify a filter to limit your search.

  ```python
  filter = event_pb2.EventFilter(eventCode=events[0].eventCode)
  events = self.eventSvc.getLogWithFilter(deviceID, self.firstEventID, MAX_NUM_EVENT, filter)
  for event in events:
    self.printEvent(event)
  ```
