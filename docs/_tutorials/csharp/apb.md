---
title: "Anti Passback Zone API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the C# client library]({{'/csharp/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses [grpc-dotnet](https://grpc.io/docs/quickstart/csharp-dotnet/). You can change the _example/apb/test/test.csproj_ file as needed.
5. Change the gateway and the device information in _example/apb/test/Program.cs_ as needed.
   
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
    cd example/apb/test
    dotnet run
    ```

## 1. Configure devices

An anti passback zone consists of multiple devices connected by RS485. To run the example, you have to configure two devices as below.

1. Connect two devices by RS485.
2. Set one device as a master and the other as a slave. You can configure this setting using the device UI or BioStar 2. Or, you can use [RS485 API]({{'/api/rs485/' | relative_url}}).

## 2. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```csharp
  GatewayClient gatewayClient = new GatewayClient();
  gatewayClient.Connect(GATEWAY_CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  var connectInfo = new ConnectInfo{ IPAddr = DEVICE_ADDR, Port = DEVICE_PORT, UseSSL = USE_SSL };
  uint devID = userTest.connectSvc.Connect(connectInfo); 
  ```  


## 3. Search and register RS485 slaves

  ```csharp
  slaves = rs485Svc.SearchSlave(deviceID);

  registeredSlaves = rs485Svc.GetSlave(deviceID);

  if(registeredSlaves.Count == 0) {
    var slaveArray = new SlaveDeviceInfo[slaves.Count];
    slaves.CopyTo(slaveArray, 0);        
    rs485Svc.SetSlave(deviceID, slaveArray);
  }
  ```

## 4. Make a zone using the master and the slave devices.

  ```csharp
  var zone = new ZoneInfo{ 
                  ZoneID = TEST_ZONE_ID, 
                  Name = "Test APB Zone",
                  Type = ApbZone.Type.Hard,
                  ResetDuration = 0, // indefinite
                };

  zone.Members.Add(new Member{ DeviceID = deviceID, ReaderType = ReaderType.Entry });
  zone.Members.Add(new Member{ DeviceID = slaves[0].DeviceID, ReaderType = ReaderType.Exit });

  var relaySignal = new Signal{ Count = 3, OnDuration = 500, OffDuration = 500 }; 
  zone.Actions.Add(new Action.Action{ 
                        DeviceID = deviceID, 
                        Type = ActionType.ActionRelay, 
                        Relay = new RelayAction{ RelayIndex = 0, Signal = relaySignal }
                      });

  apbSvc.Add(deviceID, new ZoneInfo[]{ zone });

  // Test if APB zone works correctly
  ```  
