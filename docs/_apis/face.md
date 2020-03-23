---
title: "Face API"
toc_label: "Face"  
---

## Scan

```protobuf
message FaceData {
  int32 index;
  uint32 flag;
  repeated bytes templates;

  bytes imageData;
}
```
{: #FaceData}

index/flag
: Can be used for managing face data in your applications. Not used by the device.

templates
: Maximum 30 face templates can be returned.

imageData
: A BMP image of the face will be returned.


```protobuf
enum FaceEnrollThreshold {
  BS2_FACE_ENROLL_THRESHOLD_0 = 0x00;
  BS2_FACE_ENROLL_THRESHOLD_1 = 0x01;
  BS2_FACE_ENROLL_THRESHOLD_2 = 0x02;
  BS2_FACE_ENROLL_THRESHOLD_3 = 0x03;
  BS2_FACE_ENROLL_THRESHOLD_4 = 0x04;
  BS2_FACE_ENROLL_THRESHOLD_5 = 0x05;
  BS2_FACE_ENROLL_THRESHOLD_6 = 0x06;
  BS2_FACE_ENROLL_THRESHOLD_7 = 0x07;
  BS2_FACE_ENROLL_THRESHOLD_8 = 0x08;
  BS2_FACE_ENROLL_THRESHOLD_9 = 0x09;
}
```
{: #FaceEnrollThreshold}

BS2_FACE_ENROLL_THRESHOLD_0
: The least strict threshold.

BS2_FACE_ENROLL_THRESHOLD_4
: The default.

BS2_FACE_ENROLL_THRESHOLD_9
: The most strict threshold.


### Scan

Scan a face and get its template data. With higher __enrollThreshold__, you can get face templates with better qualities. However, it will take more time to scan a face. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| enrollThreshold | [FaceEnrollThreshold](#FaceEnrollThreshold) | The strictness of face enrollment |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| faceData | [FaceData](#FaceData) | The scanned face templates |

## Config

The default values would be good for most cases. Since some of these parameters could have a bad effect on the authentication performance, read the descriptions carefully before changing them. 

```protobuf
message FaceConfig {
  FaceSecurityLevel securityLevel;
  FaceLightCondition lightCondition;
  FaceEnrollThreshold enrollThreshold;
  FaceDetectSensitivity detectSensitivity;
  uint32 enrollTimeout; 
}
```
{: #FaceConfig}

[securityLevel](#FaceSecurityLevel)
: With more secure levels, False Acceptance Ratio(FAR) would get lower. However, False Rejection Ratio(FRR) would become higher. The default is __BS2_FACE_SECURITY_NORMAL__.

[lightCondition](#FaceLightCondition)
: The lighting condition could have a big effect on the authentication performance. The default is __BS2_FACE_LIGHT_CONDITION_INDOOR__.

[enrollThreshold](#FaceEnrollThreshold)
: The strictness of face enrollment. The default is __BS2_FACE_ENROLL_THRESHOLD_4__.

[detectSensitivity](#FaceDetectSensitivity)
: Face authentication starts automatically after detecting a face. This parameter specifies the sensitivity of detecting faces. The default is __BS2_FACE_DETECT_SENSITIVITY_MIDDLE__.

enrollTimeout
: Timeout in seconds for enrolling a face. The default is 60 seconds.


```protobuf
enum FaceSecurityLevel {
  BS2_FACE_SECURITY_NORMAL = 0x00;
  BS2_FACE_SECURITY_SECURE = 0x01;
  BS2_FACE_SECURITY_MORE_SECURE = 0x02;
}
```
{: #FaceSecurityLevel}

```protobuf
enum FaceLightCondition {
  BS2_FACE_LIGHT_CONDITION_INDOOR = 0x00;
  BS2_FACE_LIGHT_CONDITION_OUTDOOR = 0x01;
  BS2_FACE_LIGHT_CONDITION_AUTO = 0x02;
  BS2_FACE_LIGHT_CONDITION_DARK = 0x03;
}
```
{: #FaceLightCondition}

```protobuf
enum FaceDetectSensitivity {
  BS2_FACE_DETECT_SENSITIVITY_OFF = 0x00;
  BS2_FACE_DETECT_SENSITIVITY_LOW = 0x01;
  BS2_FACE_DETECT_SENSITIVITY_MIDDLE = 0x02;
  BS2_FACE_DETECT_SENSITIVITY_HIGH = 0x03;
}
```
{: #FaceDetectSensitivity}


### GetConfig

Get the face configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [FaceConfig](#FaceConfig) | The face configuration of the device |

### SetConfig

Change the face configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [FaceConfig](#FaceConfig) | The face configuration to be written to the device |


### SetConfigMulti

Change the face configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [FaceConfig](#FaceConfig) | The face configuration to be written to the devices |


## Auth Group

The more the number of face templates, the higher the False Acceptance Ratio(FAR). To lower this error, you can divide users into several groups, and try face authentication in a specific group only. To use this feature, you have to do the followings.

* Enable [AuthConfig.useGroupMatching]({{'/api/auth/' | relative_url}}#AuthConfig).
* Create the authentication groups using [AddAuthGroup](#addauthgroup) or [AddAuthGroupMulti](#addauthgroupmulti).
* Set [UserHdr.authGroupID]({{'/api/user/' | relative_url}}#UserHdr).
* Enroll or update users using [Enroll]({{'/api/user/' | relative_url}}#enroll) or [EnrollMulti]({{'/api/user/' | relative_url}}#enrollmulti).

```protobuf
message AuthGroup {
  uint32 ID;
  string name; 
}
```
{: #AuthGroup}

### GetAuthGroup

Get the list of authentication groups stored in a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| authGroups | [AuthGroup[]](#AuthGroup) | The authentication groups stored in the device |

### AddAuthGroup

Add authentication groups to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| authGroups | [AuthGroup[]](#AuthGroup) | The authentication groups to be added to the device |

### AddAuthGroupMulti

Add authentication groups to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| authGroups | [AuthGroup[]](#AuthGroup) | The authentication groups to be added to the devices |

### DeleteAuthGroup

Delete authentication groups from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| groupIDs | uint32[] | The IDs of the groups to be deleted from the device |

### DeleteAuthGroupMulti

Delete authentication groups from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| groupIDs | uint32[] | The IDs of the groups to be deleted from the devices |

### DeleteAllAuthGroup

Delete all authentication groups from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

### DeleteAllAuthGroupMulti

Delete all authentication groups from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |