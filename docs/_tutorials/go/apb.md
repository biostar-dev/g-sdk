---
title: "Anti Passback Zone API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Go client library]({{'/go/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the gateway and the device information in _src/example/apb/test/test.go_ as needed.
   
    ```go
    // the path of the root certificate
    GATEWAY_CA_FILE = "../../../../cert/gateway/ca.crt"

    // the address of the device gateway
    GATEWAY_IP = "192.168.0.2"
    GATEWAY_PORT = 4000

    // the ip address of the master device
    DEV_IP = "192.168.0.110"
    DEV_PORT = 51211
    USE_SSL = false
    ```
5. Build.

    ```
    cd src/example/apb/test
    go build .
    ```
6. Run.
   
    ```
    ./test
    ```

## 1. Configure devices

An anti passback zone consists of multiple devices connected by RS485. To run the example, you have to configure two devices as below.

1. Connect two devices by RS485.
2. Set one device as a master and the other as a slave. You can configure this setting using the device UI or BioStar 2. Or, you can use [RS485 API]({{'/api/rs485/' | relative_url}}).

## 2. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```go
  gatewayClient := &client.GatewayClient{}
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_IP, GATEWAY_PORT)

  connectSvc = connect.NewConnectSvc(gatewayClient.GetConn())
  deviceID, _ := connectSvc.Connect(DEV_IP, DEV_PORT, USE_SSL)
  ```   

## 3. Search and register RS485 slaves

  ```go
  slaves, _ := rs485Svc.SearchSlave(deviceID)  
  
  registeredSlaves, _ := rs485Svc.GetSlave(deviceID)

  if len(registeredSlaves) == 0 {
    rs485Svc.SetSlave(deviceID, slaves)
  }  
  ```

## 4. Make a zone using the master and the slave devices.

  ```go
  zoneInfo := &apbZone.ZoneInfo{
    ZoneID: TEST_ZONE_ID,
    Name: "Test APB Zone",
    Type: apbZone.Type_HARD,
    ResetDuration: 0, // indefinite
    Members: []*apbZone.Member{
      &apbZone.Member{
        DeviceID: deviceID,
        ReaderType: apbZone.ReaderType_ENTRY,
      },
      &apbZone.Member{
        DeviceID: slaves[0].DeviceID,
        ReaderType: apbZone.ReaderType_EXIT,
      },
    },
    Actions: []*action.Action{ // Activate the 1st relay of the master device when an alarm is detected
      &action.Action{
        DeviceID: deviceID,
        Type: action.ActionType_ACTION_RELAY,
        Relay: &action.RelayAction{
          RelayIndex: 0, // 1st relay of the master device
          Signal: &action.Signal{ 
            Count: 3,
            OnDuration: RELAY_ACTION_ON_MS,
            OffDuration: RELAY_ACTION_OFF_MS,
          },
        },
      },
    },
  }

  apbZoneSvc.Add(deviceID, []*apbZone.ZoneInfo{ zoneInfo })

  // Test if APB zone works correctly
  ```  
