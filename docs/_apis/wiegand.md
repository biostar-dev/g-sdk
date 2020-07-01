---
title: "Wiegand API"
toc_label: "Wiegand"  
---

To interface with 3rd party readers or controllers, you have to configure the [WiegandConfig](#WiegandConfig) correctly. 

For the general questions about Wiegand configuration, refer to the [FAQ](https://support.supremainc.com/en/support/solutions/articles/24000027804--biostar-2-wiegand-configuration-faq). 
{: .notice--info}

## Wiegand Format

```protobuf
message WiegandFormat {
  uint32 formatID;
  uint32 length;
  repeated bytes IDFields;
  repeated ParityField parityFields;
}
```
{: #WiegandFormat}

formatID
: The index of the format, which can be used for managing multiple formats in your applications.

length
: The bit length of the format. The maximum is 256 bit.

IDFields
: Up to 4 ID fields can be configured. You have to define the bit mask for each ID field. 

parityFields
: Up to 4 parity fields can be configured.

```protobuf
message ParityField {
  uint32 parityPos;
  WiegandParity parityType;
  bytes data;
}
```
{: #ParityField}

parityPos
: The bit position of the parity.

[parityType](#WiegandParity)
: WIEGAND_PARITY_ODD or WIEGAND_PARITY_EVEN.

data
: The bit mask for calculating the parity.

```protobuf
enum WiegandParity {
  WIEGAND_PARITY_NONE = 0;
  WIEGAND_PARITY_ODD = 1;
  WIEGAND_PARITY_EVEN = 2;
}
```
{: #WiegandParity}

### Example: 26 bit standard

The example shows how to represent the 26 bit standard format in Go using [WiegandFormat](#WiegandFormat).

```go
const (
  WIEGAND_26BIT_LENGTH = 26
  WIEGAND_26BIT_NUM_OF_FIELD = 4
  WIEGAND_26BIT_EVEN_PARITY_POS = 0
  WIEGAND_26BIT_ODD_PARITY_POS = 25
)

// 26 bit standard
// FC: 01 1111 1110 0000 0000 0000 0000 : 0x01fe0000
// ID: 00 0000 0001 1111 1111 1111 1110 : 0x0001fffe
// EP: 01 1111 1111 1110 0000 0000 0000 : 0x01ffe000, Pos 0, Type: Even
// OP: 00 0000 0000 0001 1111 1111 1110 : 0x00001ffe, Pos 25, Type: Odd

var bitArray_26bit = [][]byte {
  {0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}, // Facility Code
  {0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}, // ID
  {0, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0}, // Even Parity
  {0, 0, /**/ 0, 0, 0, 0, 0, 0, 0, 0, /**/ 0, 0, 0, 1, 1, 1, 1, 1, /**/ 1, 1, 1, 1, 1, 1, 1, 0}, // Odd Parity
}

format := &wiegandSvc.WiegandFormat{
  Length: WIEGAND_26BIT_LENGTH,
  IDFields: [][]byte{
    bitArray_26bit[0],
    bitArray_26bit[1],
  },
  ParityFields: []*wiegandSvc.ParityField{
    &wiegandSvc.ParityField{
      ParityPos: WIEGAND_26BIT_EVEN_PARITY_POS,
      ParityType: wiegandSvc.WiegandParity_WIEGAND_PARITY_EVEN,
      Data: bitArray_26bit[2],
    },
    &wiegandSvc.ParityField{
      ParityPos: WIEGAND_26BIT_ODD_PARITY_POS,
      ParityType: wiegandSvc.WiegandParity_WIEGAND_PARITY_ODD,
      Data: bitArray_26bit[3],
    },
  },
}
```

## Config

Up to 16 Wiegand formats can be configured for a device. In other words, the total number of __formats__, __slaveFormats__, and __CSNFormat__ should not exceed 16. 

```protobuf
message WiegandConfig {
  WiegandMode mode;
  bool useWiegandBypass;
  bool useFailCode;
  uint32 failCode; 

  uint32 outPulseWidth;
  uint32 outPulseInterval;

  repeated WiegandFormat formats;
  repeated WiegandFormat slaveFormats;
  WiegandFormat CSNFormat;
}
```
{: #WiegandConfig}

[mode](#WiegandMode)
: 

useWiegandBypass
: If true, just bypass a card information without authenticating it. See [the article](https://support.supremainc.com/en/support/solutions/articles/24000022037--biostar-2-wiegand-bypass-slave-device-wiegand-) for more details. 

useFailCode/failCode
: If __useFailCode__ is true, send the __failCode__ when authentication fails. The __failCode__ should be one byte. 

outPulseWidth
: The width of a pulse in microseconds.

outPulseInterval
: The interval between two pulses in microseconds. 

formats
: The Wiegand formats to be applied to the device itself.

slaveFormats
: The Wiegand formats to be applied to its slave devices.

CSNFormat
: The Wiegand format to be applied with [CARD_TYPE_CSN]({{'/api/card/' | relative_url}}#Type).

```protobuf
enum WiegandMode {
  WIEGAND_IN_ONLY = 0;
  WIEGAND_OUT_ONLY = 1;
  WIEGAND_IN_OUT = 2;
}
```
{: #WiegandMode}

WIEGAND_IN_ONLY
: The port will be used for receiving Wiegand input. 

WIEGAND_OUT_ONLY
: The port will be used for sending Wiegand output.

WIEGAND_IN_OUT
: The port will be used both for receiving and sending Wiegand signals. 


### GetConfig

Get the Wiegand configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [WiegandConfig](#WiegandConfig) | The Wiegand configuration of the device |

### SetConfig

Change the Wiegand configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [WiegandConfig](#WiegandConfig) | The Wiegand configuration to be written to the device |

### SetConfigMulti

Change the Wiegand configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [WiegandConfig](#WiegandConfig) | The Wiegand configuration to be written to the devices |

## Slave devices

You can search, add, or delete slave devices on Wiegand input.

```protobuf
message WiegandTamperInput {
  uint32 deviceID;
  uint32 port;
  device.SwitchType switchType;
}

message WiegandOutput {
  uint32 deviceID;
  uint32 port;
}

message WiegandDeviceInfo {
  uint32 deviceID;
  WiegandTamperInput tamperInput;
  WiegandOutput redLEDOutput;
  WiegandOutput greenLEDOutput;
  WiegandOutput buzzerOutput;
}
```
{: #WiegandDeviceInfo }

### SearchDevice

Search slaves of a device. If the device has more than one Wiegand input, all the inputs will be probed at the same time. To access any of the devices found, you have to register them using [SetDevice](#setdevice).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device whose slave devices will be searched |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| slaveInfos |[WiegandDeviceInfo[]](#WiegandDeviceInfo) | The slave devices connect to the Wiegand inputs |

### GetDevice

Get the registered slave devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| slaveInfos |[WiegandDeviceInfo[]](#WiegandDeviceInfo) | The slave devices registered to the device |

### SetDevice

Register the slave devices. 

You only have to register slaves once. However, since this information is not stored in the device gateway, you have to use [Connect.SetSlaveDevice]({{'/api/connect/' | relative_url}}#setslavedevice) or [ConnectMaster.SetSlaveDevice]({{'/api/connectMaster/' | relative_url}}#setslavedevice) when the device gateway is reconnected.
{: .notice--warning}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| slaveInfos |[WiegandDeviceInfo[]](#WiegandDeviceInfo) | The slave devices to be registered to the device |

