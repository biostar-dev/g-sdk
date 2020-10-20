---
title: "Thermal API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/thermal/test/test.go_ as needed.
   
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
    cd src/example/thermal/test
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

## 2. Test the thermal configuration

There are several options you can configure related to the thermal camera. The example shows how to configure some of these options and let you check the results.

```go
  // Set options for the test
  config.AuditTemperature = true // write temperature logs
  config.CheckMode = thermal.CheckMode_HARD // disalllow access when temperature is too high

  // (1) Set check order to AFTER_AUTH
  config.CheckOrder = thermal.CheckOrder_AFTER_AUTH
  thermalSvc.SetConfig(deviceID, config)

  fmt.Printf("(1) The Check Order is set to AFTER_AUTH. The device will try to authenticate a user only when the user's temperature is within the threshold. Try to authenticate faces.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")

  // (2) Set check order to BEFORE_AUTH
  config.CheckOrder = thermal.CheckOrder_BEFORE_AUTH
  thermalSvc.SetConfig(deviceID, config)

  fmt.Printf("(2) The Check Order is set to BEFORE_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")

  // (3) Set check order to WITHOUT_AUTH
  config.CheckOrder = thermal.CheckOrder_WITHOUT_AUTH
  thermalSvc.SetConfig(deviceID, config)

  fmt.Printf("(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")

  // (4) Set check order to AFTER_AUTH with too low threshold
  config.CheckOrder = thermal.CheckOrder_AFTER_AUTH
  config.TemperatureThreshold = 3500 // Too low threshold. Most temperature check will fail
  thermalSvc.SetConfig(deviceID, config)

  fmt.Printf("(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")	
```

## 3. Get the temperature logs

If you set the [ThermalConfig.AuditTemperature]({{'/api/thermal' | relative_url}}#ThermalConfig) to true, the device will record the temperature of users in addition to other information. You can read these logs using [Thermal.GetTempeartureLog]({{'/api/thermal' | relative_url}}#gettemperaturelog).

  ```go
  events, _ := thermalSvc.GetTemperatureLog(deviceID, firstEventID, 0)
  ```

You can also subscribe to an event stream for receiving realtime events.

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
  eventStream, _ = s.client.SubscribeRealtimeLog(ctx, subReq)

  go func() {
    for {
      eventLog, _ := eventStream.Recv()
      eventCallback(eventLog)
    }
  } ()
  ```

