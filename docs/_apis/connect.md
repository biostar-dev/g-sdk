---
title: "Connect API"
toc_label: "Connect"  
---

For the device gateway only. Refer to [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) for the master gateway.
{: .notice--info}

## Overview

The Connect API is for managing the connections between the device gateway and BioStar devices. There are two modes according to the direction of the connection. 

### Connection mode

```protobuf
enum ConnectionMode {
  SERVER_TO_DEVICE = 0;	
  DEVICE_TO_SERVER = 1;	
}
```
  SERVER_TO_DEVICE
  : The gateway connects to the device.

  DEVICE_TO_SERVER
  : The device connects to the gateway.

With the default of __SERVER_TO_DEVICE__, the gateway will connect to the device. To change the mode, you have to call [SetConnectionMode](#setconnectionmode). 

### Synchronous vs. asynchronous

When the mode is __SERVER_TO_DEVICE__, there are two ways for the gateway to connect to the devices. With [Synchronous APIs](#synchronous-connection), you can directly connect to a device. Though it is the simpler way, you have to manage the connection manually. When you have to manage many devices, [Asynchronous APIs](#asynchronous-connection) would be preferrable since most connection tasks are managed by the gateway automatically. 

### Secure communication 

All the packets between the gateway and the devices are encrypted for secure communication. You can choose one of the two options for packet encryption.

Default
: Use AES256 for encrypting the packets.

SSL
: Use TLS1.2 for communication. Though it is more secure, you have to manage the certificates. Refer to [SSL APIs](#ssl) for the details.

Though SSL and TLS are not same exactly, both terms are used interchangeably in this manual. Without further description, SSL means TLS v1.2 protocol.
{: .notice--info}

## Status

With [the asynchronous APIs](#asynchronous-connection) and [the device-to-server connection](#device-to-server-connection), the connections are managed by the gateway in the background. To get the current status of connections, you can use [GetDeviceList](#getdevicelist) or [SubscribeStatus](#subscribestatus).

```protobuf
message DeviceInfo {
  uint32 deviceID;
  ConnectionMode connectionMode;
  string IPAddr;
  int32 port;
  Status status; 
  bool autoReconnect; 
  bool useSSL;
}
```
{: #DeviceInfo }

status
: [The current status of the device](#Status).

autoReconnect
: True only if the device is connected by [AddAsyncConnection](#addasyncconnection).


```protobuf
enum Status {
  // Normal Status
  DISCONNECTED = 0x00;
  TCP_CONNECTED	= 0x01;
  TLS_CONNECTED = 0x02;
  
  // TCP Connection Error Status
  TCP_CANNOT_CONNECT = 0x100;
  TCP_NOT_ALLOWED = 0x101;

  // TLS Connection Error Status
  TLS_CANNOT_CONNECT = 0x200;
  TLS_NOT_ALLOWED = 0x201;
}
```
{: #Status}

### GetDeviceList

Get the information of the managed devices. 

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceInfos | [DeviceInfo[]](#DeviceInfo) | The information of the managed devices |

### SubscribeStatus

If you subscribe to the status channel, the gateway will notify you whenever the status of a device changes.

```protobuf
message StatusChange {
  uint32 deviceID;
  Status status;
  uint32 timestamp; 
}
```
status
: [The new status of the device](#Status).

timestamp
: The time when the change is occurred in Unix time format.

## Synchronous connection

### Connect

Connect synchronously to a device. If successful, the device ID will be returned.

```protobuf
message ConnectInfo {
  string IPAddr; 
  int32 port;
  bool useSSL;
}
```
{: #ConnectInfo }

IPAddr
: IPv4 address such as 192.168.0.2.

Port
: The port number of the device. Only used when the connection mode is __SERVER_TO_DEVICE__. The default is 51211.

useSSL
: Specify whether SSL is used for communication. 

To set __ConnectInfo.useSSL__ to true, you have to call [EnableSSL](#enablessl) on the device first. 
{: .notice--warning}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| connectInfo | [ConnectInfo](#ConnectInfo) | The connection information of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the connected device |

## Asynchronous connection

Synchronous connection is the easier and simpler way to connect to a device. However, if you have tens of or hundreds of devices, managing synchronous connections could become a chore. To alleviate this overload, asynchronous APIs are provided. You only have to register devices to connect. Then, the gateway will handle all the tasks in the background. When a managed device is disconnected, the gateway will try to reconnect automatically, too. 

To get the current status of the managed devices, you should use [GetDeviceList](#getdevicelist) or [SubscribeStatus](#subscribestatus).

### AddAsyncConnection

Add the target devices to connect. The gateway will manage the connections to the devices in the background. To get the list of managed devices, call [GetDeviceList](#getdevicelist). 

You can use [SearchDevice](#searchdevice) to find out devices in a subnet. 
{: .notice--info}

```protobuf
message AsyncConnectInfo {
  uint32 deviceID; 
  string IPAddr; 
  int32 port; 
  bool useSSL; 
}
```
{: #AsyncConnectInfo }

deviceID
: It is same with the S/N on the sticker at the back of a device.

IPAddr
: IPv4 address such as 192.168.0.2.

Port
: The port number of the device. Only used when the connection mode is __SERVER_TO_DEVICE__. The default is 51211.

useSSL
: Specify whether SSL is used for communication. 

To set __AsyncConnectInfo.useSSL__ to true, you have to call [EnableSSL](#enablessl) on the device first. 
{: .notice--warning}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| connectInfos | [AsyncConnectInfo[]](#AsyncConnectInfo) | The connection information of the devices |

### DeleteAsyncConnection

Delete the specified devices from the managed list. If these device are connected, they will be disconnected first. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices to be deleted |

## Device-to-server connection

To make a device connect to the gateway, you have to do the followings;

1. Set __IPConfig.connectionMode__ to __DEVICE_TO_SERVER__.
2. Modify the [AcceptFilter](#AcceptFilter) to include the device ID.


### SetAcceptFilter

You can select the devices to be accepted using the [AcceptFilter](#AcceptFilter).

```protobuf
message AcceptFilter {
  bool allowAll;  
  repeated uint32 deviceIDs; 
  repeated string IPAddrs; // not yet supported
  repeated string subnetMasks; // not yet supported
}
```
{: #AcceptFilter }

allowAll
: Allow all incoming connections. If it is true, ignore the other parameters. 

deviceIDs
: Allow the connections from the specified IDs

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | [AcceptFilter](#AcceptFilter) | The filter specifying the accept list |

### GetAcceptFilter

Get the accept filter set by [SetAcceptFilter](#SetAcceptFilter).

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| filter | [AcceptFilter](#AcceptFilter) | The filter set by [SetAcceptFilter](#SetAcceptFilter) |

### GetPendingList

If a device is trying to connect to the gateway but is not included in the accept filter, it is registered to the pending list. By reviewing the pending list, you can choose the new devices to be accepted.

```protobuf
message PendingDeviceInfo {
  uint32 deviceID;
  string IPAddr;
  uint32 lastTry; 
}
```
{: #PendingDeviceInfo }

lastTry
: The last time the device tried to connect. It is in Unix time format.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceInfos | [PendingDeviceInfo[]](#PendingDeviceInfo) | The devices filtered by the accept filter |

## Disconnection

You can close the connections between the gateway and devices. The behavior after disconnection will differ according to how the connection was established. 

[Connect](#connect)
: The device will be removed from the managed list. The gateway will not try to reconnect to the device.

[AddAsyncConnection](#addasyncconnection)
: After some delay, the gateway will try to reconnect to the device. If you do not want this, remove the device from the managed list using [DeleteAsyncConnection](#deleteasyncconnection).

Device-to-server
: After some delay, the device will try to reconnect to the gateway. If you do not want this, remove the device from the accept filter using [SetAcceptFilter](#setacceptfilter).

### Disconnect

Disconnect the specified devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices to be disconnected |

### DisconnectAll

Disconnect all the connected devices.

## Search

You can search devices within a subnet using [SearchDevice](#searchdevice). 

### SearchDevice

```protobuf
message SearchDeviceInfo  {
  uint32 deviceID;
  device.Type type;
  bool useDHCP;
  ConnectionMode connectionMode; 
  string IPAddr;
  int32 port;
}
```
{: #SearchDeviceInfo }

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| timeout | uint32 | Search timeout in milliseconds |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceInfos | [SearchDeviceInfo[]](#SearchDeviceInfo) | The information of the devices found in the subnet |

## Connection mode

You can change the connection mode of a device. The default is __SERVER_TO_DEVICE__. After changing the mode, you have to do the followings to reconnect to the device.

_After setting to __DEVICE_TO_SERVER___

1. If the device was connected asynchronously, remove the device from the managed list using [DeleteAsyncConnection](#deleteasyncconnection).
  
2. Add the device ID to the accept filter using [SetAcceptFilter](#setacceptfilter).

_After setting to __SERVER_TO_DEVICE___

1. Remove the device from the accept filter using [SetAcceptFilter](#setacceptfilter).

2. Connect to the device using [Connect](#connect) or [AddAsyncConnection](#addasyncconnection).

### SetConnectionMode

Change the connection mode of a device. The gateway will internally call [Network.SetIPConfig]({{'/api/network/' | relative_url}}#setipconfig) and change the related parameters accordingly. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| connectionMode | [ConnectionMode](#ConnectionMode) | The connection mode to be set |

### SetConnectionModeMulti

Change the connection modes of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| connectionMode | [ConnectionMode](#ConnectionMode) | The connection mode to be set |

## SSL

For more secure communication, you can enable SSL on devices. If enabled, all communication will conform to TLS 1.2 specification. 

For SSL/TLS, you have to manage the certificates properly. The device will use the root certificate to validate the certificate of the gateway. So, if you have more than one device gateways, they should share the root certificate to connect to a SSL-enabled device. 
{: .notice--warning}

### EnableSSL

Enable SSL on a device. After this, you have to set the __useSSL__ to true when using [Connect](#connect) or [AddAsyncConnection](#addasyncconnection).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### EnableSSLMulti

Enable SSL on multiple devices

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |


### DisableSSL

Disable SSL on a device. After this, you have to set the __useSSL__ to false when using [Connect](#connect) or [AddAsyncConnection](#addasyncconnection).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DisableSSLMulti

Disable SSL on multiple devices

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |


## Slave

```protobuf
message SlaveDeviceInfo {
  uint32 deviceID;
  repeated uint32 rs485SlaveDeviceIDs;
  repeated uint32 wiegandSlaveDeviceIDs;
}
```
{: #SlaveDeviceInfo }

deviceID
: The ID of the parent device to which the slaves are registered.

rs485SlaveDeviceIDs
: The IDs of the slave devices registered on RS485 channels.

wiegandSlaveDeviceIDs
: The IDs of the slave devices registered on Wiegand input.

You can add slave devices on a RS485 channel or Wiegand input of a device. For searching and registering slave devices, refer to the corresponding sections in [RS485]({{'/api/rs485/' | relative_url}}#slave-devices) and [Wiegand]({{'/api/wiegand/' | relative_url}}#slave-devices).

The slave information is not stored in the database. So, to access the slave devices, you have to call [SetSlaveDevice](#setslavedevice) after the device gateway is reconnected.

### GetSlaveDevice

Get the slave device information. 

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| slaveDeviceInfos | [SlaveDeviceInfo[]](#SlaveDeviceInfo) | The slave device information |

### SetSlaveDevice

Set the slave device information. The slave devices should be registered first using [RS485.SetDevice]({{'/api/rs485/' | relative_url}}#setdevice) or [Wiegand.SetDevice]({{'/api/wiegand/' | relative_url}}#setdevice).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| slaveDeviceInfos | [SlaveDeviceInfo[]](#SlaveDeviceInfo) | The slave device information |
