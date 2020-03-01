---
title: "Device Status API"
toc_label: "Device Status"  
---

You can configure what signals should be emitted on the LEDs and the buzzer for the predefined [device status](#DeviceStatus).

## Config

There are 15 predefined status. You can configure [LEDStatus](#LEDStatus) and [BuzzerStatus](#BuzzerStatus) per each status. 

```protobuf
message StatusConfig {
  repeated LEDStatus LEDState;
  repeated BuzzerStatus BuzzerState;
}
```
{: #StatusConfig}
[LEDState](#LEDStatus)
: The LED signals for a status.

[BuzzerState](#BuzzerStatus)
: The buzzer signals for a status.

```protobuf
message LEDStatus {
  DeviceStatus deviceStatus;
  uint32 count;
  repeated action.LEDSignal signals;
}
```
{: #LEDStatus}

[deviceStatus](#DeviceStatus)
: The status for which the LED signals will be displayed.

count
: The repeat count of the signals. If 0, repeat the signals indefinitely.

[signals]({{'/api/action/' | relative_url}}#LEDSignal)
: Up to 3 LED signals can be defined.

```protobuf
message BuzzerStatus {
  DeviceStatus deviceStatus;
  uint32 count;
  repeated action.BuzzerSignal signals;
}
```
{: #BuzzerStatus}

[deviceStatus](#DeviceStatus)
: The status for which the buzzer signals will be emitted.

count
: The repeat count of the signals. If 0, repeat the signals indefinitely.

[signals]({{'/api/action/' | relative_url}}#BuzzerSignal)
: Up to 3 buzzer patterns can be defined.

```protobuf
enum DeviceStatus {
  DEVICE_STATUS_NORMAL = 0;
  DEVICE_STATUS_LOCKED = 1;
  DEVICE_STATUS_RTC_ERROR = 2;
  DEVICE_STATUS_WAITING_INPUT = 3;
  DEVICE_STATUS_WAITING_DHCP = 4;
  DEVICE_STATUS_SCAN_FINGER = 5;
  DEVICE_STATUS_SCAN_CARD = 6;
  DEVICE_STATUS_SUCCESS = 7;
  DEVICE_STATUS_FAIL = 8;
  DEVICE_STATUS_DURESS = 9;
  DEVICE_STATUS_PROCESS_CONFIG_CARD = 10;
  DEVICE_STATUS_SUCCESS_CONFIG_CARD = 11;
  DEVICE_STATUS_RESERVED2 = 12;
  DEVICE_STATUS_RESERVED3 = 13;
  DEVICE_STATUS_RESERVED4 = 14;
}
```
{: #DeviceStatus}

### GetConfig

Get the status configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [StatusConfig](#StatusConfig) | The status configuration of the device |

### SetConfig

Change the status configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [StatusConfig](#StatusConfig) | The status configuration to be written to the device |


### SetConfigMulti

Change the status configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [StatusConfig](#StatusConfig) | The status configuration to be written to the devices |
