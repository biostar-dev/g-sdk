---
title: "Anti Passback Zone API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the device gateway]({{'/gateway/install/' | relative_url}})
2. [Download the Java client library]({{'/java/install/' | relative_url}})
3. Copy the root certificate of the device gateway to your working directory. As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory. 
4. The example uses Gradle for its project. You can change the _build.gradle_ file as needed.
5. Change the gateway and the device information in _src/main/java/com/supremainc/sdk/example/apb/test/APBZoneTest.java_ as needed.
   
    ```java
    // the path of the root certificate
    private static final String GATEWAY_CA_FILE = "cert/gateway/ca.crt";

    // the address of the gateway
    private static final String GATEWAY_ADDR = "192.168.0.2";
    private static final int GATEWAY_PORT = 4000;

    // the ip address of the target device
    private static final String DEVICE_ADDR = "192.168.0.110"; 
    private static final int DEVICE_PORT = 51211;
    ```
6. Build.

    ```
    ./gradlew installDist
    ```
7. Run.
   
    ```
    ./build/install/java/bin/apbZoneTest
    ```

## 1. Configure devices

An anti passback zone consists of multiple devices connected by RS485. To run the example, you have to configure two devices as below.

1. Connect two devices by RS485.
2. Set one device as a master and the other as a slave. You can configure this setting using the device UI or BioStar 2. Or, you can use [RS485 API]({{'/api/rs485/' | relative_url}}).

## 2. Connect to the gateway and the device

The example assumes you use the device gateway. For the master gateway or other connection options, refer to the [Connect]({{'/go/connect' | relative_url}}) or [ConnectMaster]({{'/go/connectMaster' | relative_url}}) examples.

  ```java
  GatewayClient client = new GatewayClient();
  client.connect(CA_FILE, GATEWAY_ADDR, GATEWAY_PORT);

  ConnectInfo connInfo = ConnectInfo.newBuilder().setIPAddr(DEVICE_ADDR).setPort(DEVICE_PORT).setUseSSL(DEVICE_USE_SSL).build();
  int deviceID = userTest.connectSvc.connect(connInfo); 
  ```    

## 3. Search and register RS485 slaves

  ```java
  slaves = rs485Svc.searchSlave(deviceID);

  registeredSlaves = rs485Svc.getSlave(deviceID);

  if(registeredSlaves.size() == 0) {
    rs485Svc.setSlave(deviceID, slaves);
  } 
  ```

## 4. Make a zone using the master and the slave devices.

  ```java
  ArrayList<Member> members = new ArrayList<Member>();
  members.add(Member.newBuilder().setDeviceID(deviceID).setReaderType(ReaderType.ENTRY).build());
  members.add(Member.newBuilder().setDeviceID(slaves.get(0).getDeviceID()).setReaderType(ReaderType.EXIT).build());

  Signal relaySignal = Signal.newBuilder().setCount(3).setOnDuration(500).setOffDuration(500).build(); 
  Action action = Action.newBuilder() // Activate the 1st relay of the master device when an alarm is detected
                    .setDeviceID(deviceID)
                    .setType(ActionType.ACTION_RELAY)
                    .setRelay(RelayAction.newBuilder().setRelayIndex(0).setSignal(relaySignal).build())
                    .build();

  ArrayList<Action> actions = new ArrayList<Action>();
  actions.add(action);

  ZoneInfo zone = ZoneInfo.newBuilder()
                    .setZoneID(TEST_ZONE_ID)
                    .setName("Test APB Zone")
                    .setType(Type.HARD) // hard APB
                    .setResetDuration(0) // indefinite
                    .addAllMembers(members)
                    .addAllActions(actions)
                    .build();

  ArrayList<ZoneInfo> zones = new ArrayList<ZoneInfo>();
  zones.add(zone);

  zoneSvc.add(deviceID, zones);

  // Test if APB zone works correctly
  ```  
