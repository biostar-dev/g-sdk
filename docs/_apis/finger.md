---
title: "Fingerprint API"
toc_label: "Fingerprint"  
---

## Scan/Verify

You can get a fingerprint template by scanning a finger on the device. You can also verify if two fingerprint templates match each other.

### Scan

Scan a fingerprint on a device. The quality of a fingerprint template is represented by a number between 0(worst) and 100(best). With __qualityThreshold__, you can specify the minimum quality score. If the quality score is lower than this threshold and [FingerConfig.advancedEnrollment](#FingerConfig) is true, an error will be returned. 

```protobuf
enum TemplateFormat {
  TEMPLATE_FORMAT_SUPREMA = 0x00;
  TEMPLATE_FORMAT_ISO = 0x01;
  TEMPLATE_FORMAT_ANSI = 0x02;	
}
```
{: #TemplateFormat}

TEMPLATE_FORMAT_SUPREMA
: The default format. Unless you need compatibility with the templates acquired by other vendor's devices, you should not change it.


{: #TemplateFormat}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| templateFormat | [TemplateFormat](#TemplateFormat) | The format of the fingerprint template to be acquired |
| qualityThreshold | uint32 | The minimum quality score the template should meet |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| templateData | byte[] | The scanned template data. The size is 384 bytes |
| qualityScore | uint32 | The quality score of the template |

### GetImage

Get the image of the fingerprint, which was captured by the last [Scan](#scan).

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| BMPImage | byte[] | The fingerprint image in BMP file format |

### Verify

[FingerData](#FingerData) consists of two templates of a finger. You can verify if the two templates match each other using [Verify](#verify).

```protobuf
message FingerData {
  int32 index;
  uint32 flag;
  repeated bytes templates;
}
```
index/flag
: Can be used for managing the fingerprint data in your application. Ignored by the device.

templates
: Two fingerprint templates of a same finger. The size of the fingerprint template should not be larger than 384 byte.

{: #FingerData }

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| fingerData | [FingerData](#FingerData) | The fingerprint data to be verified |

## Config

The default values would be good for most cases. Since some of these parameters could have a bad effect on the authentication performance, read the descriptions carefully before changing them. 

```protobuf
message FingerConfig {
  SecurityLevel securityLevel;
  FastMode fastMode;
  Sensitivity sensitivity;
  SensorMode sensorMode;
  TemplateFormat templateFormat;
  int32 scanTimeout;
  bool advancedEnrollment;
  bool showImage;
  LFDLevel LFDLevel;
}
```
{: #FingerConfig }

[securityLevel](#SecurityLevel)
: With more secure levels, False Acceptance Ratio(FAR) would get lower. However, False Rejection Ratio(FRR) would become higher. To understand what this level means, refer to [the article](https://support.supremainc.com/en/support/solutions/articles/24000005895--general-about-far-and-frr-rates).

[fastMode](#FastMode)
: With faster modes, the matching speed would get faster with slight degradation of the authentication performance. For most cases, the __AUTOMATIC__ would be the best compromise between speed and accuracy.

[sensitivity](#Sensitivity)
: You can tune the sensitivity of the fingerprint sensor. The default is __HIGHEST_SENSITIVE__.

[sensorMode](#SensorMode)
: With __ACTIVATED_BY_PROXIMITY__, turn on the sensor only after the proximity sensor detects a finer. 

[templateFormat](#TemplateFormat)
: You cannot mix template formats in a device. So, if you are to change the format, you have to delete all the enrolled templates first. 

scanTimeout
: Timeout in seconds for capturing a fingerprint. The default is 10 seconds.

advancedEnrollment
: If true, return an error if the quality of the scanned template is lower than the [qualityThreshold](#scan).

showImage
: If true, show the fingerprint image on the device screen after scanning it. 

[LFDLevel](#LFDLevel)
: Specify the level of Live Finger Detection(LFD). The default is __NOT_USED__.

```protobuf
enum SecurityLevel {
  SECURE = 0x00;
  MORE_SECURE = 0x01;
  MOST_SECURE = 0x02;
}
```
{: #SecurityLevel}

```protobuf
enum FastMode {
  AUTOMATIC = 0x00;
  FAST = 0x01;
  FASTER = 0x02;
  FASTEST = 0x03;
}
```
{: #FastMode}

```protobuf
enum Sensitivity {
  LOWEST_SENSITIVE = 0x00;
  LEVEL0_SENSITIVE = 0x00;
  LEVEL1_SENSITIVE = 0x01;
  LEVEL2_SENSITIVE = 0x02;
  LEVEL3_SENSITIVE = 0x03;
  LEVEL4_SENSITIVE = 0x04;
  LEVEL5_SENSITIVE = 0x05;
  LEVEL6_SENSITIVE = 0x06;
  LEVEL7_SENSITIVE = 0x07;
  HIGHEST_SENSITIVE = 0x07;
}
```
{: #Sensitivity}

```protobuf
enum SensorMode {
  ALWAYS_ON = 0;
  ACTIVATED_BY_PROXIMITY = 1;
}
```
{: #SensorMode}


```protobuf
enum LFDLevel {
  NOT_USED = 0x00;
  STRICT = 0x01;
  MORE_STRICT = 0x02;
  MOST_STRICT = 0x03;
}
```
{: #LFDLevel}

### GetConfig

Get the fingerprint configuration of a device. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [FingerConfig](#FingerConfig) | The fingerprint configuration of the device |

### SetConfig

Change the fingerprint configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [FingerConfig](#FingerConfig) | The fingerprint configuration to be written to the device |

### SetConfigMulti

Change the fingerprint configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [FingerConfig](#FingerConfig) | The fingerprint configuration to be written to the devices |
