---
title: "Thermal API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/thermal/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/thermal/test/Program.cs_ as needed.
   
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
    cd example/thermal/test
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

## 2. Test the thermal configuration

There are several options you can configure related to the thermal camera. The example shows how to configure some of these options and let you check the results.

  ```csharp
  ThermalConfig origConfig = config.Clone();

  // Set options for the test
  config.AuditTemperature = true;
  config.CheckMode = CheckMode.Hard;

  // (1) Set check order to AFTER_AUTH
  config.CheckOrder = CheckOrder.AfterAuth;
  thermalSvc.SetConfig(deviceID, config);

  Console.WriteLine("(1) The Check Order is set to AFTER_AUTH. The device will try to authenticate a user only when the user's temperature is within the threshold. Try to authenticate faces." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);

  // (2) Set check order to BEFORE_AUTH
  config.CheckOrder = CheckOrder.BeforeAuth;
  thermalSvc.SetConfig(deviceID, config);

  Console.WriteLine("(2) The Check Order is set to BEFORE_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);

  // (3) Set check order to WITHOUT_AUTH
  config.CheckOrder = CheckOrder.WithoutAuth;
  thermalSvc.SetConfig(deviceID, config);

  Console.WriteLine("(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);      

  // (4) Set check order to AFTER_AUTH with too low threshold
  config.CheckOrder = CheckOrder.AfterAuth;
  config.TemperatureThreshold = 3500;
  thermalSvc.SetConfig(deviceID, config);

  Console.WriteLine("(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces." + Environment.NewLine);
  KeyInput.PressEnter(">> Press ENTER if you finish testing this mode." + Environment.NewLine);  
  ```

## 3. Get the temperature logs

If you set the [ThermalConfig.AuditTemperature]({{'/api/thermal' | relative_url}}#ThermalConfig) to true, the device will record the temperature of users in addition to other information. You can read these logs using [Thermal.GetTempeartureLog]({{'/api/thermal' | relative_url}}#gettemperaturelog).

  ```csharp
  var events = thermalSvc.GetTemperatureLog(deviceID, firstEventID, 0);
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

