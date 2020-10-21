---
title: "Thermal Camera API"
toc_label: "Thermal"  
---

[Suprema Thermal Camera](https://www.supremainc.com/en/hardware/suprema-thermal-camera.asp) can be used in combination with face recognition terminals to detect users with elevated skin temperature. With [ThermalConfig](#ThermalConfig), you can specify the options related to the camera. You can also read log records with temperature information. 

## Config

```protobuf
message ThermalConfig {
  CheckMode checkMode;
  CheckOrder checkOrder;
  TemperatureFormat temperatureFormat;
  uint32 temperatureThreshold;

  bool auditTemperature;
  bool useRejectSound;
  bool useOverlapThermal;

  ThermalCamera camera;

  // Only for FaceStation F2
  CheckMode maskCheckMode;
  MaskDetectionLevel maskDetectionLevel;
}
```
{: #ThermalConfig}

[checkMode](#CheckMode)
: If it is __HARD__ and the temperature of a user exceeds __temperatureThreshold__, access will be denied with a violation log record. With __SOFT__, the device will write a violation log record with temperature information, but allow access to the user. 

[checkOrder](#CheckOrder)
: Specify when to check the temperature.

[temperatureFormat](#TemperatureFormat)
: Specify the unit of temperature.

temperatureThreshold
: Set the threshold temperature in 0.01 Celsius. For instance, if the threshold is 37.5&deg;C, it should be 3750.

auditTemperature
: If true, the measured temperature will be written to log records. You can read these logs using [GetTemperatureLog](#gettemperaturelog).

useRejectSound
: If true, a recorded error message will be played when user's access is denied. 

useOverlapThermal
: Display an overlay of thermal image on the LCD screen. 

[camera](#ThermalCamera)
: Specify the options related to the camera itself. 

The default values would be good for most cases. Since some of these parameters could have a bad effect on the camera performance, read the descriptions carefully before changing them. 
{: .notice--warning}

[maskCheckMode](#CheckMode)
: If it is __HARD__ and the user is not wearing a mask, access will be denied with a violation log record. With __SOFT__, the device will write a violation log record, but allow access to the user. 

Please note that there is no separate __maskCheckOrder__. The above __checkOrder__ parameter is applied for checking the mask, too. For example, if it is __BEFORE_AUTH__, authenticate only when the user is wearing a mask.
{: .notice--warning}

[maskDetectionLevel](#MaskDetectionLevel)
: The sensitivity of mask detection. If it is __NOT_USE__, mask detection is not used.

```protobuf
enum CheckMode {
  OFF = 0x00;
  HARD = 0x01;
  SOFT = 0x02;
}
```
{: #CheckMode}

OFF
: Do not check the temperature of a user. Or, with __maskCheckMode__, do not check whether the user is wearing a mask. 

HARD
: If the temperature of a user exceeds __temperatureThreshold__, access will be denied with a violation log record. With __maskCheckMode__, check if the user is wearing a mask.

SOFT
: Even if the temperature of a user exceeds __temperatureThreshold__, access will be allowed. However, a violation log record will be written with temperature information. With __maskCheckMode__, check if the user is wearing a mask. 

```protobuf
enum CheckOrder {
  AFTER_AUTH = 0x00;
  BEFORE_AUTH = 0x01;
  WITHOUT_AUTH = 0x02;
}
```
{: #CheckOrder}

AFTER_AUTH
: Measure the temperature after successful authentication. 

BEFORE_AUTH
: Authenticate only when the user's temperature is within the threshold. With this mode, the device does not attempt to authenticate users if their temperature exceed the threshold. 

WITHOUT_AUTH
: Detect temperature without authentication. This mode allows users with normal temperature to access without checking their identities or access rights. 

```protobuf
enum TemperatureFormat {
  FAHRENHEIT = 0x00;
  CELSIUS = 0x01;
}
```
{: #CheckMode}

```protobuf
message ThermalCamera {
  uint32 distance;
  uint32 emissionRate;
  ThermalCameraROI ROI;

  bool useBodyCompensation;
  int32 compensationTemperature;
}
```
{: #ThermalCamera}

distance
: Specify the distance between the user and the device in centimeters. The default is 100.

emissionRate
: The emissivity of the subject reflecting heat. As for human subject, the default is 98.

[ROI](#ThermalCameraROI)
: Region of interset. These four parameters limit the area for temperature measurement. The default values in percent for the coordinates(x, y) and ranges(width, height) are (47, 45) and (15, 10) respectively.

useBodyCompensation
: If true, apply __CompensationTemperature__ to the measured value. 

compensationTemperature
: The compensation value in 0.1 Celsius. For instance, if the compensation is -0.1&deg;C, it should be 1.

```protobuf
message ThermalCameraROI {
  uint32 x;
  uint32 y;
  uint32 width;
  uint32 height;
}
```
{: #ThermalCameraROI}

```protobuf
enum MaskDetectionLevel {
  NOT_USE = 0;
  NORMAL = 1;
  HIGH = 2;
  VERY_HIGH = 3;
}
```
{: #MaskDetectionLevel}

NOT_USE
: Mask detection is not used.

NORMAL/HIGH/VERY_HIGH
: The sensitivity of mask detection. 

### GetConfig

Get the thermal configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [ThermalConfig](#ThermalConfig) | The thermal configuration of the device |

### SetConfig

Change the thermal configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [ThermalConfig](#ThermalConfig) | The thermal configuration to be written to the device |


### SetConfigMulti

Change the thermal configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [ThermalConfig](#ThermalConfig) | The thermal configuration to be written to the devices |

## Event

To get the event logs with temperature information, __ThermalConfig.auditTemperature__ should be true.
{: .notice--warning}


### GetTemperatureLog

Get the event logs with temperature information. 

```protobuf
message TemperatureLog {
  uint32 ID;
  uint32 timestamp;
  uint32 deviceID;
  string userID;
  uint32 eventCode;
  uint32 subCode;
  uint32 temperature;
}
```
{: #TemperatureLog}

ID
: 4 byte identifier of the log record. Each device manages a monotonic increasing counter for this identifier. You can use this value to specify the starting position when reading logs from devices.

timestamp
: In Unix time format. The number of seconds elapsed since January 1, 1970.

[eventCode]({{'/api/event/' | relative_url}}#EventCode)
: 16 bit code identifying the event type.

[subCode]({{'/api/event/' | relative_url}}#SubCode)
: Some event types have an additional 8 bit code providing auxiliary information.

temperature
: The temperature of the user in 0.01 degree. For example, if the temperature of a user is 36.3&deg;C, it will be 3630.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| startEventID | uint32 | The ID of the first event log to be read. If it is 0, read logs from the start |
| maxNumOfLog | uint32 | The maximum number of logs to be read. If it is 0, try to read all the event logs |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| temperatureEvents | [TemperatureLog[]](#TemperatureLog) | The temperature event logs read from the device |

