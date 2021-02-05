---
title: "Server API"
toc_label: "Server"  
---

You can implement server matching features with __Server API__. With server matching enabled, the device will defer the authentication process to the device gateway. Whenever a user places a card or fingerprint on the device, it will send a request to the gateway. Then, you have to handle these requests using one of the APIs.

To implement server matching, you have to do the following steps.

1. Enable the related options.
   
    | Function | Option | Handler |
    | -------- | ------ | ------- |
    | Verify | [AuthConfig.useServerMatching]({{'/api/auth/' | relative_url}}#AuthConfig) | [HandleVerify](#handleverify) |
    | Identify | [AuthConfig.useServerMatching]({{'/api/auth/' | relative_url}}#AuthConfig) | [HandleIdentify](#handleidentify) |
    | Global APB | [AuthConfig.useGlobalAPB]({{'/api/auth/' | relative_url}}#AuthConfig) | [HandleGlobalAPB](#handleglobalapb) |
    | User Phrase | [DisplayConfig.useUserPhrase/queryUserPhrase]({{'/api/display/' | relative_url}}#DisplayConfig) | [HandleUserPhrase](#handleuserphrase) |  
    {: #RelatedOptions }

2. Subscribe to the request channel using [Subscribe](#subscribe).
3. Implement your own logic using the corresponding handler.
4. Unsubscribe from the channel using [Unsubscribe](#unsubscribe)

Server API is not supported by the master gateway.
{: .notice--warning}

## Subscribe

If subscription is successful, devices will send the following requests to the device gateway. 

```protobuf
message ServerRequest {
  RequestType reqType;
  uint32 deviceID;
  uint32 seqNO;
  VerifyRequest verifyReq; 
  IdentifyRequest identifyReq;
  GlobalAPBRequest globalAPBReq;
  UserPhraseRequest userPhraseReq;
}
```
{: #ServerRequest }

[reqType](#RequestType)
: The type of the request. 

deviceID
: The ID of the device, which sent the request. 

seqNO
: The sequence number of the request. You have to use this number when returning a response to the device.

[verifyReq](#VerifyRequest)
: Valid only if the __reqType__ is VERIFY_REQUEST.

[identifyReq](#IdentifyRequest)
: Valid only if the __reqType__ is IDENTIFY_REQUEST.

[globalAPBReq](#GlobalAPBRequest)
: Valid only if the __reqType__ is GLOBAL_APB_REQUEST.

[userPhraseRequest](#UserPhraseRequest)
: Valid only if the __reqType__ is USER_PHRASE_REQUEST.

```protobuf
enum RequestType {
  NO_REQUEST = 0x00;
  VERIFY_REQUEST = 0x01;
  IDENTIFY_REQUEST = 0x02;
  GLOBAL_APB_REQUEST = 0x03;
  USER_PHRASE_REQUEST = 0x04;
}
```
{: #RequestType }

```protobuf
message VerifyRequest {
  bool isCard;
  card.Type cardType;
  bytes cardData;
  string userID;
}
```
{: #VerifyRequest }

isCard
: If true, you have to look up __cardType__ and __cardData__ for the verification. If false, you have to look up __userID__.

```protobuf
message IdentifyRequest {
  finger.TemplateFormat templateFormat;
  bytes templateData;
}
```
{: #IdentifyRequest }

```protobuf
message GlobalAPBRequest {
  repeated string userIDs;
}
```
{: #GlobalAPBRequest }

```protobuf
message UserPhraseRequest {
  string userID;
}
```
{: #UserPhraseRequest }


Handling of the requests varies according to the programming language. Refer to the server API example in your client SDK.
{: .notice--info}

### Subscribe

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| queueSize | int32 | If the queue is full, the gateway will discard the requests. It should be large enough for handling concurrent requests |

### Unsubscribe

There can be only one channel. So, if you want to reuse the channel, you have to unsubscribe from it first.

## Matching

### HandleVerify

With [AuthConfig.useServerMatching]({{'/api/auth/' | relative_url}}#AuthConfig) true, the device will send a [VerifyRequest](#VerifyRequest) to the gateway when it reads a card. You have to send a response to the device using this API.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device. It should be same as __deviceID__ in the request. |
| seqNO | uint32 | The sequence number of the response. It should be same as __seqNO__ in the corresponding request. |
| errCode | [ServerErrorCode](#ServerErrorCode) | The result of verification. If it is SUCCESS, you have to fill the verified user information in __user__ field. |
| user | [user.UserInfo]({{'/api/user/' | relative_url}}#UserInfo) | The information of the verified user. |

```protobuf
enum ServerErrorCode {
  SUCCESS = 0;

  VERIFY_FAIL = -301;
  IDENTIFY_FAIL = -302;

  HARD_APB_VIOLATION = -1202;
  SOFT_APB_VIOLATION = -1203;

  CANNOT_FIND_USER =  -714;
}
```
{: #ServerErrorCode }

### HandleIdentify

With [AuthConfig.useServerMatching]({{'/api/auth/' | relative_url}}#AuthConfig) true, the device will send an [IdentifyRequest](#IdentifyRequest) to the gateway when it reads a fingerprint. You have to send a response to the device using this API.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device. It should be same as __deviceID__ in the request. |
| seqNO | uint32 | The sequence number of the response. It should be same as __seqNO__ in the corresponding request.  |
| errCode | [ServerErrorCode](#ServerErrorCode) | The result of identification. If it is SUCCESS, you have to fill the identified user information in __user__ field. |
| user | [user.UserInfo]({{'/api/user/' | relative_url}}#UserInfo) | The information of the identified user. |

### HandleGlobalAPB

With [AuthConfig.useGlobalAPB]({{'/api/auth/' | relative_url}}#AuthConfig) true, the device will send a [GlobalAPBRequest](#GlobalAPBRequest) to the gateway after successful authentication. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device. It should be same as __deviceID__ in the request. |
| seqNO | uint32 | The sequence number of the response. It should be same as __seqNO__ in the corresponding request.  |
| errCode | [ServerErrorCode](#ServerErrorCode) | The result of anti passback violation. If violated, the result will be either HARD_APB_VIOLATION or SOFT_APB_VIOLATION based on the type of zone. |
| zoneID | uint32 | The ID of the anti passback zone. |

## User interface

Apart from server matching, you can also show a user-specific message after authentication. 

### HandleUserPhrase

With [DisplayConfig.useUserPhrase/queryUserPhrase]({{'/api/display/' | relative_url}}#DisplayConfig) true, the device will send a [UserPhraseRequest](#UserPhraseRequest) after successful authentication. You have to send a response to the device using this API.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device. It should be same as __deviceID__ in the request. |
| seqNO | uint32 | The sequence number of the response. It should be same as __seqNO__ in the corresponding request.  |
| errCode | [ServerErrorCode](#ServerErrorCode) | If it is SUCCESS, you have to send the user phrase in __userPhrase__ field. |
| userPhrase | string |  The message to be displayed in the UI of the device. |