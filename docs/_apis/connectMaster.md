---
title: "Connect Master API"
toc_label: "Connect Master"  
---

For the master gateway only. Refer to [the Connect API]({{'/api/connect/' | relative_url}}) for the device gateway.
{: .notice--info}

## Overview

A master gateway manages devices through one or more device gateways. So, you have to specify a gateway ID when calling some of the APIs. Apart from this difference, the Connect Master API shares most of the data structures with [the Connect API]({{'/api/connect/' | relative_url}}).

## Status

With [the asynchronous APIs](#asynchronous-connection) and [the device-to-server connection](#device-to-server-connection), the connections are managed by device gateways in the background. To get the current status of connections, you can use [GetDeviceList](#getdevicelist) or [SubscribeStatus](#subscribestatus).

### GetDeviceList

Get the information of the managed devices of a device gateway.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the device gateway |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceInfos | [DeviceInfo[]]({{'/api/connect/' | relative_url}}#DeviceInfo) | The information of the managed devices |

### SubscribeStatus

If you subscribe to the status channel, the master gateway will notify you whenever the status of a device changes.

```protobuf
message StatusChange {
  uint32 deviceID;
  Status status;
  uint32 timestamp; 
}
```
status
: [The new status of the device]({{'/api/connect/' | relative_url}}#Status).

timestamp
: The time when the change is occurred in Unix time format.


## Synchronous Connection

### Connect

Connect synchronously to a device. If successful, the device ID will be returned.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway through which to connect to the device |
| connectInfo | [ConnectInfo]({{'/api/connect/' | relative_url}}#ConnectInfo) | The connection information of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the connected device |

## Asynchronous Connection

Synchronous connection is the easier and simpler way to connect to a device. However, if you have tens of or hundreds of devices, managing synchronous connections could become a chore. To alleviate this overload, asynchronous APIs are provided. You only have to register devices to connect. Then, the device gateways will handle all the tasks in the background. When a managed device is disconnected, the device gateway will try to reconnect automatically, too. 

To get the current status of the managed devices, you should use [GetDeviceList](#getdevicelist) or [SubscribeStatus](#subscribestatus).

The asynchronous connection information is not stored in the database. So, you have to reassign them when a device gateway is reconnected to the master gateway. 
{: .notice--warning}

### AddAsyncConnection

Add the target devices to a device gateway. The device gateway will manage the connections to the devices in the background. To get the list of managed devices, call [GetDeviceList](#getdevicelist). 

You can use [SearchDevice](#searchdevice) to find out devices in a subnet. 
{: .notice--info}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway to which the devices are added |
| connectInfos | [AsyncConnectInfo[]]({{'/api/connect/' | relative_url}}#AsyncConnectInfo) | The connection information of the devices |

### DeleteAsyncConnection

Delete the specified devices from a device gateway. If these device are connected, they will be disconnected first. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway from which the devices are deleted |
| deviceIDs | uint32[] | The IDs of the devices to be deleted |

## Device-to-server connection

To make a device connect to a device gateway, you have to do the followings;

1. Set [IPConfig.connectionMode]({{'/api/network/' | relative_url}}#IPConfig) to __DEVICE_TO_SERVER__.
2. Modify the [AcceptFilter]({{'/api/connect/' | relative_url}}#AcceptFilter) to include the device ID.

The filter is not stored in the database. So, you have to reconfigure it when a device gateway is reconnected to the master gateway. 
{: .notice--warning}

### SetAcceptFilter

You can select the devices to be accepted using the [AcceptFilter]({{'/api/connect/' | relative_url}}#AcceptFilter).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway to which the filter is assigned |
| filter | [AcceptFilter]({{'/api/connect/' | relative_url}}#AcceptFilter) | The filter specifying the accept list |

### GetAcceptFilter

Get the accept filter of a device gateway.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway |
| filter | [AcceptFilter]({{'/api/connect/' | relative_url}}#AcceptFilter) | The filter set by [SetAcceptFilter](#SetAcceptFilter) |

### GetPendingList

If a device is trying to connect to a device gateway but is not included in the accept filter, it is registered to the pending list. By reviewing the pending list, you can choose the new devices to be accepted.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway |
| deviceInfos | [PendingDeviceInfo[]]({{'/api/connect/' | relative_url}}#PendingDeviceInfo) | The devices filtered by the accept filter |

## Disconnection

You can close the connections between device gateways and devices. The behavior after disconnection will differ according to how the connection was established. 

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

You don't have to specify a gateway ID when calling an API with connected device IDs. The master gateway will find the corresponding gateways automatically. 
{: .notice--info}

### DisconnectAll

Disconnect all the connected devices of a device gateway.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway from which the devices will be disconnected |

## Search

You can search devices within a subnet using [SearchDevice](#searchdevice). 

### SearchDevice


| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway with which to search the devices |
| timeout | uint32 | Search timeout in milliseconds |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceInfos | [SearchDeviceInfo[]]({{'/api/connect/' | relative_url}}#SearchDeviceInfo) | The information of the devices found in the subnet |

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
| connectionMode | [ConnectionMode]({{'/api/connect/' | relative_url}}#ConnectionMode) | The connection mode to be set |

### SetConnectionModeMulti

Change the connection modes of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| connectionMode | [ConnectionMode]({{'/api/connect/' | relative_url}}#ConnectionMode) | The connection mode to be set |

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

You can add slave devices on a RS485 channel or Wiegand input of a device. For searching and registering slave devices, refer to the corresponding sections in [RS485]({{'/api/rs485/' | relative_url}}#slave-devices) and [Wiegand]({{'/api/wiegand/' | relative_url}}#slave-devices).

The slave information is not stored in the database. So, to access the slave devices, you have to use [SetSlaveDevice](#setslavedevice) after the device gateway is reconnected.

### GetSlaveDevice

Get the slave device information of a device gateway.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the device gateway |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| slaveDeviceInfos | [SlaveDeviceInfo[]]({{'/api/connect/' | relative_url}}#SlaveDeviceInfo) | The slave device information of the gateway |

### SetSlaveDevice

Set the slave device information of a device gateway. The slave devices should be registered first using [RS485.SetDevice]({{'/api/rs485/' | relative_url}}#setdevice) or [Wiegand.SetDevice]({{'/api/wiegand/' | relative_url}}#setdevice).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the device gateway |
| slaveDeviceInfos | [SlaveDeviceInfo[]](#SlaveDeviceInfo) | The slave device information |
