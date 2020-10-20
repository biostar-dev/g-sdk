---
title: "T&A API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/tna/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/tna/test/Program.cs_ as needed.
   
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
    cd example/tna/test
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

## 2. Test the T&A configuration

There are several options you can configure related to the T&A functions. The example shows how to configure some of these options and let you check the results.

  ```csharp
  // (1) BY_USER
  var newConfig = new TNAConfig{ Mode = Mode.ByUser, Labels = {"In", "Out", "Scheduled In", "Fixed Out"} };
  tnaSvc.SetConfig(deviceID, newConfig);

  Console.WriteLine("(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);

  // (2) IsRequired
  newConfig.IsRequired = true;
  tnaSvc.SetConfig(deviceID, newConfig);

  Console.WriteLine("(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);

  // (3) LAST_CHOICE
  newConfig.Mode = Mode.LastChoice;
  tnaSvc.SetConfig(deviceID, newConfig);

  Console.WriteLine("(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);

  // (4) BY_SCHEDULE
  newConfig.Mode = Mode.BySchedule;
  newConfig.Schedules.AddRange(new uint[]{ 0, 0, 1 }); // Always for KEY_3(Scheduled_In)
  tnaSvc.SetConfig(deviceID, newConfig);

  Console.WriteLine("(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);      

  // (5) FIXED
  newConfig.Mode = Mode.Fixed;
  newConfig.Key = Key._4;
  tnaSvc.SetConfig(deviceID, newConfig);

  Console.WriteLine("(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);     
  ```

## 3. Get the T&A logs

You can read the log records with T&A key information using [TNA.GetTNALog]({{'/api/tna' | relative_url}}#gettnalog). To get the label of the key, you have to look up the [TNAConfig.labels]({{'/api/tna' | relative_url}}#TNAConfig).

  ```csharp
  var events = tnaSvc.GetTNALog(deviceID, firstEventID, 0);

  // ...

  private string GetTNALabel(Key key, TNAConfig config) {
    if(config.Labels.Count > (int)key - 1) {
      return string.Format("{0}(KEY{1})", config.Labels[(int)key - 1], key);
    } else {
      return string.Format("KEY{0}", key);
    }      
  }
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```csharp
  var enableRequest = new EnableMonitoringRequest{ DeviceID = deviceID };
  eventClient.EnableMonitoring(enableRequest);

  var subscribeRequest = new SubscribeRealtimeLogRequest{ DeviceIDs = {deviceID}, QueueSize = MONITORING_QUEUE_SIZE };
  var call = eventClient.SubscribeRealtimeLog(subscribeRequest);

  cancellationTokenSource = new CancellationTokenSource();

  ReceiveEvents(this, call.ResponseStream, cancellationTokenSource.Token);

  static async void ReceiveEvents(EventSvc svc, IAsyncStreamReader<EventLog> stream, CancellationToken token) {
    while(await stream.MoveNext(token)) {
      var eventLog = stream.Current;

      if(svc.callback != null) {
        svc.callback(eventLog);
      } 
    }
  } 
  ```

