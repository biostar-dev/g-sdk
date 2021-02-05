---
title: "Event API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/event/test/test.go_ as needed.
   
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
    cd src/example/event/test
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

## 2. Initialize the event code map

Since V1.3, the event code map, __event_code.json__, is provided. You can use it in your application for looking up the short descriptions of event codes.

  ```go
  type EventCodeEntry struct {
    EventCode int `json:"event_code"`
    EventCodeStr string `json:"event_code_str`
    SubCode int `json:"sub_code"`
    SubCodeStr string `json:"sub_code_str`
    Desc string `json:"desc"`
  }

  type EventCodeMap struct {
    Title string `json:"title"`
    Version string `json:"version"`
    Date string `json:"date"`
    Entries []EventCodeEntry `json:"entries"`
  }

  func (s *EventSvc) InitCodeMap(filename string) error {
    buf, _ := ioutil.ReadFile(filename)

    codeMap = &EventCodeMap{}
    json.Unmarshal(buf, codeMap)

    return nil
  }
  
  func (s *EventSvc) GetEventString(eventCode, subCode uint32) string {
    for _, entry := range codeMap.Entries {
      if eventCode == uint32(entry.EventCode) && subCode == uint32(entry.SubCode) {
        return entry.Desc
      }
    }

    return fmt.Sprintf("Unknown event(%#X)", eventCode | subCode)
  }  
  ```

## 3. Receive realtime events

To receive realtime events from the devices, you have to do the followings.

1. [Enable monitoring]({{'/api/event' | relative_url}}#enablemonitoring) on target devices.
2. [Subscribe]({{'/api/event' | relative_url}}#subscriberealtimelog) to the event channel.
3. Read the events from the channel.

  ```go
  enableReq := &event.EnableMonitoringRequest{
    DeviceID: deviceID,
  }

  s.client.EnableMonitoring(context.Background(), enableReq)

  subReq := &event.SubscribeRealtimeLogRequest{
    QueueSize: MONITORING_QUEUE_SIZE,
    DeviceIDs: []uint32 { deviceID },
  }

  ctx, cancelFunc := context.WithCancel(context.Background())
  eventStream, err = s.client.SubscribeRealtimeLog(ctx, subReq)

  eventLog, _ := eventStream.Recv()

  // do something with the event
  ```

## 4. Read event logs

When reading event logs, you can specify the starting index and the maximum number of events.

  ```go
  eventSvc.GetLog(deviceID, firstEventID, MAX_NUM_OF_EVENT)
  ```

You can also specify a filter to limit your search.

  ```go
  eventFilter := &event.EventFilter{
    EventCode: events[0].EventCode,
  }

  filteredEvents, _ := eventSvc.GetLogWithFilter(deviceID, firstEventID, MAX_NUM_OF_EVENT, eventFilter)  
  ```
