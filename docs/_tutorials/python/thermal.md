---
title: "Thermal API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/thermal/test/test.py_ as needed.
   
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
    cd example/thermal/test
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

## 2. Test the thermal configuration

There are several options you can configure related to the thermal camera. The example shows how to configure some of these options and let you check the results.

```python
  # Set options for the test
  config.auditTemperature = True # write temperature logs
  config.checkMode = thermal_pb2.HARD # disalllow access when temperature is too high

  # (1) Set check order to AFTER_AUTH
  config.checkOrder = thermal_pb2.AFTER_AUTH 
  self.thermalSvc.setConfig(deviceID, config)

  print(f'(1) The Check Order is set to AFTER_AUTH. The device will try to authenticate a user only when the user\'s temperature is within the threshold. Try to authenticate faces.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')

  # (2) Set check order to BEFORE_AUTH
  config.checkOrder = thermal_pb2.BEFORE_AUTH 
  self.thermalSvc.setConfig(deviceID, config)

  print(f'(2) The Check Order is set to BEFORE_AUTH. The device will measure the temperature only after successful authentication. Try to authenticate faces.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')      

  # (3) Set check order to WITHOUT_AUTH
  config.checkOrder = thermal_pb2.WITHOUT_AUTH 
  self.thermalSvc.setConfig(deviceID, config)

  print(f'(3) The Check Order is set to WITHOUT_AUTH. Any user whose temperature is within the threshold will be allowed to access. Try to authenticate faces.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')     

  # (4) Set check order to AFTER_AUTH with too low threshold
  config.checkOrder = thermal_pb2.AFTER_AUTH 
  config.temperatureThreshold = 3500 # Too low threshold. Most temperature check will fail
  self.thermalSvc.setConfig(deviceID, config)

  print(f'(4) To reproduce the case of high temperature, the Check Order is set to AFTER_AUTH with the threshold of 35 degree Celsius. Most temperature check will fail, now. Try to authenticate faces.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')    
```

## 3. Get the temperature logs

If you set the [ThermalConfig.AuditTemperature]({{'/api/thermal' | relative_url}}#ThermalConfig) to true, the device will record the temperature of users in addition to other information. You can read these logs using [Thermal.GetTempeartureLog]({{'/api/thermal' | relative_url}}#gettemperaturelog).

  ```python
  events = thermalSvc.getTemperatureLog(deviceID, self.firstEventID, 0)
  ```

You can also subscribe to an event stream for receiving realtime events.

  ```python
  eventSvc.enableMonitoring(deviceID)
  eventCh = eventSvc.subscribe(EVENT_QUEUE_SIZE)

  statusThread = threading.Thread(target=handleEvent)
  statusThread.start()  

  # ..

  def handleEvent():
    for event in eventCh:
      # do something with the event
  ```

