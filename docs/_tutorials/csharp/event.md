---
title: "Event API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/event/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/event/test/Program.cs_ as needed.
   
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
    cd example/event/test
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

## 2. Initialize the event code map

Since V1.3, the event code map, __event_code.json__, is provided. You can use it in your application for looking up the short descriptions of event codes.

  ```csharp
  public void InitCodeMap(string filename) {
    var jsonData = File.ReadAllText(filename);
    codeMap = JsonSerializer.Deserialize<EventCodeMap>(jsonData);
  }

  public string GetEventString(uint eventCode, uint subCode) {
    for(int i = 0; i < codeMap.entries.Count; i++) {
      if(eventCode == codeMap.entries[i].event_code && subCode == codeMap.entries[i].sub_code) {
        return codeMap.entries[i].desc;
      }
    }

    return string.Format("Unknown event(0x{0:X})", eventCode | subCode);
  }

  eventSvc.InitCodeMap(CODE_MAP_FILE);
  ```

## 3. Receive realtime events

To receive realtime events from the devices, you have to do the followings.

1. [Enable monitoring]({{'/api/event' | relative_url}}#enablemonitoring) on target devices.
2. [Subscribe]({{'/api/event' | relative_url}}#subscriberealtimelog) to the event channel.
3. Read the events from the channel.

  ```csharp
  static async void ReceiveEvents(EventSvc svc, IAsyncStreamReader<EventLog> stream, CancellationToken token) {
    try {
      while(await stream.MoveNext(token)) {
        var eventLog = stream.Current;

        // do something with the event
      }
    }
  }   

  var enableRequest = new EnableMonitoringRequest{ DeviceID = deviceID };
  eventClient.EnableMonitoring(enableRequest);

  var subscribeRequest = new SubscribeRealtimeLogRequest{ DeviceIDs = {deviceID}, QueueSize = MONITORING_QUEUE_SIZE };
  var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

  cancellationTokenSource = new CancellationTokenSource();

  ReceiveEvents(this, call.ResponseStream, cancellationTokenSource.Token);
  ```

## 4. Read event logs

When reading event logs, you can specify the starting index and the maximum number of events.

  ```csharp
  var events = eventSvc.GetLog(deviceID, firstEventID, MAX_NUM_EVENT);

  for(int i = 0; i < events.Count; i++) {
    PrintEvent(events[i]);
  }
  ```

You can also specify a filter to limit your search.

  ```csharp
  var filter = new EventFilter{ EventCode = events[0].EventCode }; 

  events = eventSvc.GetLogWithFilter(deviceID, firstEventID, MAX_NUM_EVENT, filter);
  for(int i = 0; i < events.Count; i++) {
    PrintEvent(events[i]);
  }
  ```
