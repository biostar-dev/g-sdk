---
title: "Authentication API"
toc_label: "Authentication"  
---

With [AuthConfig](#AuthConfig), you can specify the options related to authenticating credentials. The most important option is __authSchedules__, which sets the authentication modes available to a device. 

## Config

```protobuf
message AuthConfig {
  repeated AuthSchedule authSchedules;
  bool useGlobalAPB;
  GlobalAPBFailActionType globalAPBFailAction;
  bool useGroupMatching;
  bool usePrivateAuth;
  FaceDetectionLevel faceDetectionLevel;
  bool useServerMatching;
  bool useFullAccess;
  uint32 matchTimeout;
  uint32 authTimeout;
  repeated Operator operators;
}
```
{: #AuthConfig}

[authSchedules](#AuthSchedule)
: Authentication modes available for the device. 

useGlobalAPB
: If true, ask the BioStar server whether to allow access to a user after successful authentication.

You need BioStar V2.x for global APB.
{: .notice--warning}

[globalAPBFailAction](#GlobalAPBFailActionType)
: Specify what to do when the BioStar server is unreachable when __useGlobalAPB__ is true.

useGroupMatching
: If true, use group matching for face authentication. Valid only for FaceStation 2 and FaceLite. See [AuthGroup]({{'/api/face/' | relative_url }}#auth-group)

usePrivateAuth
: If true, allow different authentication modes per each user. You can set the private authentication modes in [User.UserSetting]({{'/api/user/' | relative_url}}#UserSetting).

[faceDetectionLevel](#FaceDetectionLevel)
: If it is not FACE_DETECTION_NONE, the device will try to detect a face after a user authenticates successfully. Valid only for BioStation A2.

useServerMatching
: If true, defer the authentication to the BioStar server. When a user scans a fingerprint or a card, the device will send the information to the BioStar server and wait for the authentication result.

You need BioStar V2.x for server matching.
{: .notice--warning}


useFullAccess
: If true, allow access to all registered users regardless of their access groups.

matchTimeout
: Timeout in seconds for fingerprint or face matching.

authTimeout
: Timeout in seconds for the whole authentication process.

[operators](#Operator)
: Up to 10 administrators can be assigned to a device. 


```protobuf
message AuthSchedule {
  AuthMode mode;
  uint32 scheduleID;
}
```
{: #AuthSchedule}

You can set different authentication modes per different schedule. For example, you can allow AUTH_MODE_CARD_ONLY in working time, and set more secure AUTH_MODE_CARD_BIOMETRIC at night.

mode
: [Authentication mode](#AuthMode)

scheduleID
: The ID of the schedule during which the mode is applied. Refer to [Schedule]({{'/api/schedule/' | relative_url}}#Schedule).
 
```protobuf
enum AuthMode {
  AUTH_MODE_BIOMETRIC_ONLY = 0;
  AUTH_MODE_BIOMETRIC_PIN = 1;

  AUTH_MODE_CARD_ONLY = 2;
  AUTH_MODE_CARD_BIOMETRIC = 3;
  AUTH_MODE_CARD_PIN = 4;
  AUTH_MODE_CARD_BIOMETRIC_OR_PIN = 5;
  AUTH_MODE_CARD_BIOMETRIC_PIN = 6;

  AUTH_MODE_ID_BIOMETRIC = 7;
  AUTH_MODE_ID_PIN = 8;
  AUTH_MODE_ID_BIOMETRIC_OR_PIN = 9;
  AUTH_MODE_ID_BIOMETRIC_PIN = 10;
}
```
{: #AuthMode}

AUTH_MODE_BIOMETRIC_ONLY
: Fingerprint or Face

AUTH_MODE_BIOMETRIC_PIN
: (Fingerprint or Face) + PIN

AUTH_MODE_CARD_ONLY
: Card

AUTH_MODE_CARD_BIOMETRIC
: Card + (Fingerprint or Face)

AUTH_MODE_CARD_PIN
: Card + PIN

AUTH_MODE_CARD_BIOMETRIC_OR_PIN
: Card + (Fingerprint or Face or PIN)

AUTH_MODE_CARD_BIOMETRIC_PIN
: Card + (Fingerprint or Face) + PIN

AUTH_MODE_ID_BIOMETRIC
: ID + (Fingerprint or Face)

AUTH_MODE_ID_PIN
: ID + PIN

AUTH_MODE_ID_BIOMETRIC_OR_PIN
: ID + (Fingerprint or Face or PIN)

AUTH_MODE_ID_BIOMETRIC_PIN
: ID + (Fingerprint or Face) + PIN

Some authentication modes are available only for specific devices. For example, __AUTH_MODE_ID_XXX__ modes are available only for the devices with key pads such as BioStation N2 and BioStation 2. 
{: .notice--warning}


```protobuf
enum FaceDetectionLevel {
  FACE_DETECTION_NONE = 0;
  FACE_DETECTION_NORMAL = 1;
  FACE_DETECTION_STRICT = 2;
}
```
{: #FaceDetectionLevel}

FACE_DETECTION_NONE
: Face detection is not used.

FACE_DETECTION_NORMAL
: Normal detection level is used.

FACE_DETECTION_STRICT 
: Strict detection level is used.

Note that face detection is not face authentication. This option applies only to BioStation A2. Neither FaceStation 2 nor FaceLite uses this option. 
{: .notice--warning}


```protobuf
enum GlobalAPBFailActionType {
  GLOBAL_APB_FAIL_ACTION_NONE = 0;
  GLOBAL_APB_FAIL_ACTION_SOFT = 1;
  GLOBAL_APB_FAIL_ACTION_HARD = 2;
}
```
{: #GlobalAPBFailActionType}

Global APB needs a BioStar server to determine whether the user is allowed to enter the door. If the device cannot connect to the server, it will decide by itself according to this parameter.

GLOBAL_APB_FAIL_ACTION_NONE
: Allow access.

GLOBAL_APB_FAIL_ACTION_SOFT
: Allow access, but write a log record denoting the APB violation.

GLOBAL_APB_FAIL_ACTION_HARD
: Disallow access and write a log record denoting the APB violation.


```protobuf
enum OperatorLevel {
  OPERATOR_LEVEL_NONE = 0;
  OPERATOR_LEVEL_ADMIN = 1;
  OPERATOR_LEVEL_CONFIG = 2;
  OPERATOR_LEVEL_USER = 3;
}
```
{: #OperatorLevel}

You can assign administrators for managing devices. Each administrator has one of three operator levels, which has different privileges. 

OPERATOR_LEVEL_ADMIN
: Can do all administrative tasks on a device.

OPERATOR_LEVEL_CONFIG
: Can change the configurations of a device.

OPERATOR_LEVEL_USER
: Can enroll/delete users on a device.


```protobuf
message Operator {
  string userID;
  OperatorLevel level;
}
```
{: #Operator}


### GetConfig

Get the configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [AuthConfig](#AuthConfig) | The authentication configuration of the device  |

### SetConfig

Set the configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [AuthConfig](#AuthConfig) | The authentication configuration to be set to the device |

### SetConfigMulti

Set the configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [AuthConfig](#AuthConfig) | The authentication configuration to be set to the devices |

