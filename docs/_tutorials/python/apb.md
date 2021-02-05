---
title: "Anti Passback Zone API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/apb/test/test.py_ as needed.
   
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
    cd example/apb/test
    python test.py
    ```

## 1. Configure devices

An anti passback zone consists of multiple devices connected by RS485. To run the example, you have to configure two devices as below.

1. Connect two devices by RS485.
2. Set one device as a master and the other as a slave. You can configure this setting using the device UI or BioStar 2. Or, you can use [RS485 API]({{'/api/rs485/' | relative_url}}).

## 2. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```python
  client = GatewayClient(GATEWAY_IP, GATEWAY_PORT, GATEWAY_CA_FILE)
  channel = client.getChannel()
  
  connectSvc = ConnectSvc(channel)
  connInfo = connect_pb2.ConnectInfo(IPAddr=DEVICE_IP, port=DEVICE_PORT, useSSL=USE_SSL)

  devID = connectSvc.connect(connInfo)
  ```   

## 3. Search and register RS485 slaves

  ```python
  self.slaves = self.rs485Svc.searchSlave(deviceID)  

  self.registeredSlaves = self.rs485Svc.getSlave(deviceID)

  if len(self.registeredSlaves) == 0:
    self.rs485Svc.setSlave(deviceID, self.slaves)
  ```

## 4. Make a zone using the master and the slave devices.

  ```python
  entryDevice = apb_zone_pb2.Member(deviceID=deviceID, readerType=apb_zone_pb2.ENTRY)
  exitDevice = apb_zone_pb2.Member(deviceID=slaves[0].deviceID, readerType=apb_zone_pb2.EXIT)

  relaySignal = action_pb2.Signal(count=3, onDuration=500, offDuration=500)
  relayAction = action_pb2.RelayAction(relayIndex=0, signal=relaySignal)
  zoneAction = action_pb2.Action(deviceID=deviceID, type=action_pb2.ACTION_RELAY, relay=relayAction)

  zone = apb_zone_pb2.ZoneInfo(zoneID=TEST_ZONE_ID, name='Test APB Zone', resetDuration=0, members=[entryDevice, exitDevice], actions=[zoneAction])

  self.apbSvc.add(deviceID, [zone])
  
  # Test if APB zone works correctly
  ```  
