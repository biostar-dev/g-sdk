---
title: "System API"
toc_label: "System"  
---

You can configure some system-level options using __SystemConfig__.

## Config

```protobuf
message SystemConfig {
  int32 timeZone;
  bool syncTime;
  bool isLocked; 
  bool useInterphone;
  bool OSDPKeyEncrypted;
  bool useJobCode;
  bool useAlphanumericID;
  CameraFrequency cameraFrequency;
  bool useSecureTamper;
}
```
{: #SystemConfig}

timeZone/syncTime
: You can configure these options using [TimeConfig]({{'/api/time/' | relative_url}}#TimeConfig).

isLocked
: If true, it means that the device is locked and does not handle any user input. To unlock a locked device, use [Device.Unlock]({{'/api/device/' | relative_url}}#unlock).

useInterphone
: If the device has an interphone, you can enable/disable it with this flag. 

OSDPKeyEncrypted
: If true, use the secure OSDP key. 

useJobCode
: If true, ask users to enter a job code. See [JobCode]({{'/api/tna/' | relative_url}}#JobCode).

useAlphanumericID
: If true, allow alphanumeric IDs. The [CapabilityInfo.alphanumericIDSupported]({{'/api/device/' | relative_url}}#CapabilityInfo) should be true.

[cameraFrequency](#CameraFrequency)
: 

useSecureTamper
: If true, delete sensitive data such as users, logs, keys, and certificates from the device when its tamper switch is on.

```protobuf
enum CameraFrequency {
  FREQ_NONE = 0x00;
  FREQ_50HZ = 1;
  FREQ_60HZ = 2;
}
```
{: #CameraFrequency}


### GetConfig

Get the system configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [SystemConfig](#SystemConfig) | The system configuration of the device |

### SetConfig

Change the system configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [SystemConfig](#SystemConfig) | The system configuration to be written to the device |


### SetConfigMulti

Change the system configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [SystemConfig](#SystemConfig) | The system configuration to be written to the devices |
