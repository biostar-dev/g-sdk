---
title: "User API"
toc_label: "User"  
---

## Overview

BioStar devices manage user information in several parts such as header, authentication settings, and credentials.  

### User Header

Specify the most basic information of a user.

```protobuf
message UserHdr {
  string ID;
  int32 numOfCard;
  int32 numOfFinger;
  int32 numOfFace;
  uint32 authGroupID; 
}
```
{: #UserHdr}

ID
: Maximum 32 bytes. 0 is not allowed as an ID. For alphanumeric ID, check if it is supported by the device using [CapabilityInfo.alphanumericIDSupported]({{'/api/device/' | relative_url}}#CapabilityInfo), and configure it using [SystemConfig.useAlphanumericID]({{'/api/system/' | relative_url}}#SystemConfig).

numOfCard
: Maximum 8 cards can be assigned to a user. 

numOfFinger
: Maximum 10 fingerprints can be registered to a user.

numOfFace
: Maximum 5 faces can be registered to a user.

authGroupID
: Used only for group matching of face. Refer to [Face.AuthGroup]({{'/api/face/' | relative_url}}#auth-group).

### User Setting

You can specify the effective and expiry time of a user using __startTime__ and __endTime__. You can also specify the private authentication modes of the user using __fingerAuthMode__, __cardAuthMode__, and __IDAuthMode__. For the available modes, refer to [authentication modes]({{'/api/auth/' | relative_url}}#AuthMode). Since FaceStation F2 provides [different authentication modes]({{'/api/auth/' | relative_url}}#authentication-mode-for-facestation-f2), you have to use __faceAuthExtMode__, __fingerAuthExtMode__, __cardAuthExtMode__, and __IDAuthExtMode__ for it.

The private authentication modes will be applied only when [AuthConfig.usePrivateAuth]({{'/api/auth/' | relative_url }}#AuthConfig) is true.
{: .notice--warning}


```protobuf
message UserSetting {
  uint32 startTime;
  uint32 endTime;

  uint32 biometricAuthMode;
  uint32 cardAuthMode;
  uint32 IDAuthMode;
  uint32 securityLevel;

  // Only for FaceStation F2
  uint32 faceAuthExtMode;
  uint32 fingerAuthExtMode;
  uint32 cardAuthExtMode;
  uint32 IDAuthExtMode;  
}
```
{: #UserSetting}

startTime
: The user will be valid only after this time. If 0, no restriction. In Unix format.

endTime
: The user will be valid only until this time. If 0, no restriction. In Unix format.

biometricAuthMode
: 
  | AUTH_MODE_BIOMETRIC_ONLY | Fingerprint or Face |  
  | AUTH_MODE_BIOMETRIC_PIN | (Fingerprint or Face) + PIN | 
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) | 

cardAuthMode
: 
  | AUTH_MODE_CARD_ONLY | Card |  
  | AUTH_MODE_CARD_BIOMETRIC | Card + (Fingerprint or Face) | 
  | AUTH_MODE_CARD_PIN | Card + PIN |
  | AUTH_MODE_CARD_BIOMETRIC_OR_PIN | Card + (Fingerprint or Face or PIN) | 
  | AUTH_MODE_CARD_BIOMETRIC_PIN | Card + (Fingerprint or Face) + PIN |
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) | 

idAuthMode
: 
  | AUTH_MODE_ID_BIOMETRIC | ID + (Fingerprint or Face) |  
  | AUTH_MODE_ID_PIN | ID + PIN | 
  | AUTH_MODE_ID_BIOMETRIC_OR_PIN | ID + (Fingerprint or Face or PIN) | 
  | AUTH_MODE_ID_BIOMETRIC_PIN | ID + (Fingerprint or Face) + PIN |
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) | 

securityLevel
: Specify the security level for fingerprint and face verification.

  | 0 | Undefined. Use the settings of [FingerConfig]({{'/api/finger/' | relative_url }}#FingerConfig) and [FaceConfig]({{'/api/face/' | relative_url }}#FaceConfig) |
  | 1 | Least secure | 
  | 2 | Less secure | 
  | 3 | Normal |
  | 4 | More secure |
  | 5 | Most secure | 

faceAuthExtMode
: FaceStation F2 only

  | AUTH_EXT_MODE_FACE_ONLY | Face |  
  | AUTH_EXT_MODE_FACE_FINGERPRINT | Face + Fingerprint | 
  | AUTH_EXT_MODE_FACE_PIN | Face + PIN  | 
  | AUTH_EXT_MODE_FACE_FINGERPRINT_OR_PIN | Face + (Fingerprint or PIN) | 
  | AUTH_EXT_MODE_FACE_FINGERPRINT_PIN | Face + Fingerprint + PIN | 
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) | 

fingerAuthExtMode
: FaceStation F2 only

  | AUTH_EXT_MODE_FINGERPRINT_ONLY | Fingerprint |  
  | AUTH_EXT_MODE_FINGERPRINT_FACE | Fingerprint + Face | 
  | AUTH_EXT_MODE_FINGERPRINT_PIN | Fingerprint + PIN  | 
  | AUTH_EXT_MODE_FINGERPRINT_FACE_OR_PIN | Fingerprint + (Face or PIN) | 
  | AUTH_EXT_MODE_FINGERPRINT_FACE_PIN | Fingerprint + Face + PIN | 
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) | 

cardAuthExtMode
: FaceStation F2 only

  | AUTH_EXT_MODE_CARD_ONLY | Card |  
  | AUTH_EXT_MODE_CARD_FACE | Card + Face | 
  | AUTH_EXT_MODE_CARD_FINGERPRINT | Card + Fingerprint  | 
  | AUTH_EXT_MODE_CARD_PIN | Card + PIN | 
  | AUTH_EXT_MODE_CARD_FACE_OR_FINGERPRINT | Card + (Face or Fingerprint) | 
  | AUTH_EXT_MODE_CARD_FACE_OR_PIN | Card + (Face or PIN)e |  
  | AUTH_EXT_MODE_CARD_FINGERPRINT_OR_PIN | Card + (Fingerprint or PIN) | 
  | AUTH_EXT_MODE_CARD_FACE_OR_FINGERPRINT_OR_PIN | Card + (Face or Fingerprint or PIN)  | 
  | AUTH_EXT_MODE_CARD_FACE_FINGERPRINT | Card + Face + Fingerprint | 
  | AUTH_EXT_MODE_CARD_FACE_PIN | Card + Face + PIN | 
  | AUTH_EXT_MODE_CARD_FINGERPRINT_FACE | Card + Fingerprint + Face |  
  | AUTH_EXT_MODE_CARD_FINGERPRINT_PIN | Card + Fingerprint + PIN | 
  | AUTH_EXT_MODE_CARD_FACE_OR_FINGERPRINT_PIN | Card + (Face or Fingerprint) + PIN  | 
  | AUTH_EXT_MODE_CARD_FACE_FINGERPRINT_OR_PIN | Card + Face + (Fingerprint or PIN) | 
  | AUTH_EXT_MODE_CARD_FINGERPRINT_FACE_OR_PIN | Card + Fingerprint + (Face or PIN) | 
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) | 

IDAuthExtMode
: FaceStation F2 only

  | AUTH_EXT_MODE_ID_FACE | ID + Face | 
  | AUTH_EXT_MODE_ID_FINGERPRINT | ID + Fingerprint  | 
  | AUTH_EXT_MODE_ID_PIN | ID + PIN | 
  | AUTH_EXT_MODE_ID_FACE_OR_FINGERPRINT | ID + (Face or Fingerprint) | 
  | AUTH_EXT_MODE_ID_FACE_OR_PIN | ID + (Face or PIN)e |  
  | AUTH_EXT_MODE_ID_FINGERPRINT_OR_PIN | ID + (Fingerprint or PIN) | 
  | AUTH_EXT_MODE_ID_FACE_OR_FINGERPRINT_OR_PIN | ID + (Face or Fingerprint or PIN)  | 
  | AUTH_EXT_MODE_ID_FACE_FINGERPRINT | ID + Face + Fingerprint | 
  | AUTH_EXT_MODE_ID_FACE_PIN | ID + Face + PIN | 
  | AUTH_EXT_MODE_ID_FINGERPRINT_FACE | ID + Fingerprint + Face |  
  | AUTH_EXT_MODE_ID_FINGERPRINT_PIN | ID + Fingerprint + PIN | 
  | AUTH_EXT_MODE_ID_FACE_OR_FINGERPRINT_PIN | ID + (Face or Fingerprint) + PIN  | 
  | AUTH_EXT_MODE_ID_FACE_FINGERPRINT_OR_PIN | ID + Face + (Fingerprint or PIN) | 
  | AUTH_EXT_MODE_ID_FINGERPRINT_FACE_OR_PIN | ID + Fingerprint + (Face or PIN) | 
  | 0xFE | Not permitted |
  | 0xFF | Undefined. Use the settings of [AuthConfig]({{'/api/auth/' | relative_url }}#AuthConfig) |   

### User Information

```protobuf
message UserInfo {
  UserHdr hdr;
  UserSetting setting;
  string name;
  repeated card.CSNCardData cards;
  repeated finger.FingerData fingers;
  repeated face.FaceData faces;
  repeated uint32 accessGroupIDs;
  repeated tna.JobCode jobCodes;
  bytes PIN;
  bytes photo;
}
```
{: #UserInfo}

hdr
: [UserHdr](#UserHdr).

setting
: [UserSetting](#UserSetting).

name
: Maximum 48 characters in UTF-8 encoding.

cards
: Cards assigned to the user. Refer to [CSNCardData]({{'/api/card/' | relative_url }}#CSNCardData). You can assign cards using [SetCard](#setcard) or [SetCardMulti](#setcardmulti).

fingers:
: Fingers registered to the user. Refer to [FingerData]({{'/api/finger/' | relative_url }}#FingerData). You can register fingerprints using [SetFinger](#setfinger) or [SetFingerMulti](#setfingermulti).

faces
: Faces registered to the user. Refer to [FaceData]({{'/api/face/' | relative_url }}#FaceData). You can register faces using [SetFace](#setface) or [SetFaceMulti](#setfacemulti).

accessGroupIDs
: Access group IDs to which the user belongs. Refer to [AccessGroup]({{'/api/access/' | relative_url }}#AccessGroup). A user can belong to maximum 16 access groups. You can assign access groups using [SetAccessGroup](#setaccessgroup) or [SetAccessGroupMulti](#setaccessgroupmulti).

jobCodes
: Job codes assigned to the user. Refer to [JobCode]({{'/api/tna/' | relative_url }}#JobCode). You can assign job codes using [SetJobCode](#setjobcode) or [SetJobCodeMulti](#setjobcodemulti). 

PIN
: PIN is maximum 16 bytes. For security, PIN is stored as a hash value. Refer to [GetPINHash](#getpinhash).

photo
: A profile image can be stored per user. The maximum size is 16KB.

## Information

### GetList

Get the list of users registered to a device. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| hdrs | [UserHdr[]](#UserHdr) | The header information of users registered to the device |

### Get

Get the user information with specific user IDs.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| users | [UserInfo[]](#UserInfo) | The user information of the specified user IDs |

### GetPartial

Get the partial user information with specific user IDs. For example, if you need only the card and fingerprint information, you can specify the __infoMask__ as __USER_MASK_CARD__ \| __USER_MASK_FINGER__. If the __infoMask__ is __USER_MASK_ALL__, it is same with [Get](#get).

```protobuf
enum InfoMask {
  USER_MASK_ID_ONLY = 0x0000;
  USER_MASK_HDR	= 0x0001;
  USER_MASK_SETTING = 0x0002;
  USER_MASK_NAME = 0x0004;
  USER_MASK_PHOTO	= 0x0008;
  USER_MASK_PIN = 0x0010;
  USER_MASK_CARD = 0x0020;
  USER_MASK_FINGER = 0x0040;
  USER_MASK_FACE = 0x0080;
  USER_MASK_ACCESS_GROUP = 0x0100;
  USER_MASK_JOB = 0x0200;
  USER_MASK_ALL	= 0xFFFF;
}
```

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | Array of user IDs |
| infoMask | uint32 | Mask for the required information |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| users | [UserInfo[]](#UserInfo) | The user information of the specified user IDs with the mask |

## Enroll

### Enroll

Enroll users to a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| users | [UserInfo[]](#UserInfo) | The information of the users to be enrolled |
| overwrite | bool | If true, overwrite the existing users with the same IDs. If false, return an error |

### EnrollMulti

Enroll users to multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| users | [UserInfo[]](#UserInfo) | The information of the users to be enrolled  |
| overwrite | bool | If true, overwrite the existing users with the same IDs. If false, return an error |

## Delete

### Delete

Delete users from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users to be deleted |

### DeleteMulti

Delete users from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| userIDs | string[] | The IDs of the users to be deleted |

### DeleteAll

Delete all users from a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |


### DeleteAllMulti

Delete all users from multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |

## Card

```protobuf
message UserCard {
  string userID;
  repeated card.CSNCardData cards;
}
```
{: #UserCard }

cards
: You can read a card using [Card.Scan]({{'/api/card/' | relative_url }}#scan).

### GetCard

Get the card information of the specified users.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users whose card information will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userCards | [UserCard[]](#UserCard) | The card information of the specified users |

### SetCard

Assign cards to users on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userCards | [UserCard[]](#UserCard) | The card information to be stored in the device |

### SetCardMulti

Assign cards to users on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| userCards | [UserCard[]](#UserCard) | The card information to be stored in the devices |

## Finger

```protobuf
message UserFinger {
  string userID;
  repeated finger.FingerData fingers;
}
```
{: #UserFinger }

fingers
: You can acquire fingerprint templates using [Finger.Scan]({{'/api/finger/' | relative_url }}#scan).

### GetFinger

Get the fingerprint information of the specified users.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users whose fingerprint information will be returned  |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userFingers | [UserFinger[]](#UserFinger) | The fingerprint information of the specified users |

### SetFinger

Register fingerprints to users on a device.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userFingers | [UserFinger[]](#UserFinger) | The fingerprint information to be stored in the device |

### SetFingerMulti

Register fingerprints to users on multiple devices.

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| userFingers | [UserFinger[]](#UserFinger) | The fingerprint information to be stored in the devices |

## Face

```protobuf
message UserFace {
  string userID;
  repeated face.FaceData faces;
}
```
{: #UserFace }

faces
: You can get the face templates using [Face.Scan]({{'/api/face/' | relative_url }}#scan).

### GetFace

Get the face information of the specified users.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users whose face information will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userFaces | [UserFace[]](#UserFace) | The face information of the specified users |


### SetFace

Register face templates to users on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userFaces | [UserFace[]](#UserFace) | The face information to be stored in the device |

### SetFaceMulti

Register face templates to users on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| userFaces | [UserFace[]](#UserFace) | The face information to be stored in the devices |

## Access group

You can specify which doors are accessible to specific users by [AccessGroup]({{'/api/access/' | relative_url }}#AccessGroup).

```protobuf
message UserAccessGroup {
  string userID;
  repeated uint32 accessGroupIDs;
}
```
{: #UserAccessGroup }

accessGroupIDs
: IDs of the access groups the user belongs to. Refer to [AccessGroup]({{'/api/access/' | relative_url }}#AccessGroup).

### GetAccessGroup

Get the access group IDs of the specified users.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users whose access group IDs will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userAccessGroups | [UserAccessGroup[]](#UserAccessGroup) | The access group IDs of the specified users |


### SetAccessGroup

Assign access groups to users on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userAccessGroups | [UserAccessGroup[]](#UserAccessGroup) | The access group information to be stored in the device |

### SetAccessGroupMulti

Assign access groups to users on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| userAccessGroups | [UserAccessGroup[]](#UserAccessGroup) | The access group information to be stored in the devices |

## Job code

Check [CapabilityInfo.jobCodeSupported]({{'/api/device/' | relative_url }}#CapabilityInfo) of the device first. You have to set the [SystemConfig.useJobCode]({{'/api/system/' | relative_url }}#SystemConfig) to true for recording job codes. 
{: .notice--warning}

```protobuf
message UserJobCode {
  string userID;
  repeated tna.JobCode jobCodes;
}
```
{: #UserJobCode }

jobCodes
: Refer to [TNA.JobCode]({{'/api/tna/' | relative_url }}#JobCode).

### GetJobCode

Get the job codes of the specified users.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userIDs | string[] | The IDs of the users whose job codes will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| userJobCodes | [UserJobCode[]](#UserJobCode) | The job code information of the specified users |


### SetJobCode

Assign job codes to users on a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| userJobCodes | [UserJobCode[]](#UserJobCode) | The job code information to be stored in the device |

### SetJobCodeMulti

Assign job codes to users on multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| userJobCodes | [UserJobCode[]](#UserJobCode) | The job code information to be stored in the devices |


## Utility

### GetPINHash

For security, PIN is stored as a hash value. __GetPINHash__ converts a pin to 32 byte hash value.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| PIN | string | Maximum 16 bytes PIN |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| hashVal | byte[] | 32 bytes hash value of the PIN |