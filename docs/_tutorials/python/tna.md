---
title: "T&A API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Python client library]({{'/python/install/' | relative_url}})
3. Copy the root certificate of the gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. Change the server and the device information in _example/tna/test/test.py_ as needed.
   
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
    cd example/tna/test
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

## 2. Test the T&A configuration

There are several options you can configure related to the T&A functions. The example shows how to configure some of these options and let you check the results.

  ```python
  # (1) BY_USER
  config = tna_pb2.TNAConfig()
  config.mode = tna_pb2.BY_USER
  config.labels[:] = ["In", "Out", "Scheduled In", "Fixed Out"]
  tnaSvc.setConfig(deviceID, config)

  print(f'(1) The T&A mode is set to BY_USER(optional). You can select a T&A key before authentication. Try to authenticate after selecting a T&A key.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')

  # (2) IsRequired
  config.isRequired = True
  tnaSvc.setConfig(deviceID, config)

  print(f'(2) The T&A mode is set to BY_USER(mandatory). Try to authenticate without selecting a T&A key.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')

  # (3) LAST_CHOICE
  config.mode = tna_pb2.LAST_CHOICE
  tnaSvc.setConfig(deviceID, config)

  print(f'(3) The T&A mode is set to LAST_CHOICE. The T&A key selected by the previous user will be used. Try to authenticate multiple users.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')      

  # (4) BY_SCHEDULE
  config.mode = tna_pb2.BY_SCHEDULE
  config.schedules[:] = [0, 0, 1] # Always for KEY_3 (Scheduled In)
  tnaSvc.setConfig(deviceID, config)

  print(f'(4) The T&A mode is set to BY_SCHEDULE. The T&A key will be determined automatically by schedule. Try to authenticate without selecting a T&A key.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')          

  # (5) FIXED 
  config.mode = tna_pb2.FIXED
  config.key = tna_pb2.KEY_4
  tnaSvc.setConfig(deviceID, config)

  print(f'(5) The T&A mode is set to FIXED(KEY_4). Try to authenticate without selecting a T&A key.\n')
  pressEnter('>> Press ENTER if you finish testing this mode.\n')   
  ```

## 3. Get the T&A logs

You can read the log records with T&A key information using [TNA.GetTNALog]({{'/api/tna' | relative_url}}#gettnalog). To get the label of the key, you have to look up the [TNAConfig.labels]({{'/api/tna' | relative_url}}#TNAConfig).

  ```python
  events = tnaSvc.getTNALog(deviceID, firstEventID, 0)

  # ...

  def getTNALabel(key, config):
    if len(config.labels) > key - 1:
      return "%s(Key_%d)" % (config.labels[key - 1], key)
    else:
      return "Key_%s" % key
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

