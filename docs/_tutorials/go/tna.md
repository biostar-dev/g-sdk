---
title: "T&A API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/tna/test/test.go_ as needed.
   
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
    cd src/example/tna/test
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

## 2. Test the T&A configuration

There are several options you can configure related to the T&A functions. The example shows how to configure some of these options and let you check the results.

  ```go
  // (1) BY_USER
  newConfig := &tna.TNAConfig{
    Mode: tna.Mode_BY_USER,
    Labels: []string{
      "In",
      "Out",
      "Scheduled In",
      "Fixed Out",
    },
  }

  tnaSvc.SetConfig(deviceID, newConfig)

  fmt.Printf("(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")

  // (2) IsRequired
  newConfig.IsRequired = true
  tnaSvc.SetConfig(deviceID, newConfig)

  fmt.Printf("(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")

  // (3) LAST_CHOICE
  newConfig.Mode = tna.Mode_LAST_CHOICE
  tnaSvc.SetConfig(deviceID, newConfig)

  fmt.Printf("(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")	

  // (4) BY_SCHEDULE
  newConfig.Mode = tna.Mode_BY_SCHEDULE
  newConfig.Schedules = []uint32{ 0, 0, 1 } // Always for KEY_3 (Scheduled In)
  tnaSvc.SetConfig(deviceID, newConfig)

  fmt.Printf("(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")

  // (5) FIXED
  newConfig.Mode = tna.Mode_FIXED
  newConfig.Key = tna.Key_KEY_4
  tnaSvc.SetConfig(deviceID, newConfig)

  fmt.Printf("(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key.\n\n")
  cli.PressEnter(">> Press ENTER if you finish testing this mode.\n")
  ```

## 3. Get the T&A logs

You can read the log records with T&A key information using [TNA.GetTNALog]({{'/api/tna' | relative_url}}#gettnalog). To get the label of the key, you have to look up the [TNAConfig.labels]({{'/api/tna' | relative_url}}#TNAConfig).

  ```go
  events, _ := tnaSvc.GetTNALog(deviceID, firstEventID, 0)

  // ...

  func getTNALabel(key tna.Key, config *tna.TNAConfig) string {
    if len(config.Labels) > int(key - 1) {
      return fmt.Sprintf("%v(%v)", config.Labels[key - 1], key)
    } else {
      return fmt.Sprintf("%v", key)
    }
  }
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

