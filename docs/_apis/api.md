---
permalink: /api/
title: "API Reference"
toc_label: "API" 
---

## Overview

### gRPC 

The APIs of G-SDK are defined using [gRPC](https://grpc.io/) to maximize its compatibility among programming languages. And, gRPC uses [protocol buffers](https://developers.google.com/protocol-buffers/docs/proto3) as the Interface Definition Language (IDL) for describing both the service interface and the structure of the payload messages. Since the naming convention and data types of each language are different, you have to consult the generated header files in addition to these definitions. 

* [Java]({{ 'api/java/' | relative_url }})
* [C#]({{ 'api/csharp/' | relative_url }})
* [Python]({{ 'api/python/' | relative_url }})
* [Node.js]({{ 'api/node/' | relative_url }})
* [Go]({{ 'api/go/' | relative_url }})
* [C++]({{ 'api/cpp/' | relative_url }})
* [Kotlin]({{ 'api/kotlin/' | relative_url }})
* [Swift]({{ 'api/swift/' | relative_url }})

### Device gateway vs. master gateway

A master gateway manages devices through one or more device gateways. Due to this difference, [the Connect Master API]({{'/api/connectMaster/' | relative_url}}) is different from [the Connect API]({{'/api/connect/' | relative_url}}). And, since the master gateway is designed for multi-tenant systems, you have to use [the Login API]({{'/api/login/' | relative_url}}) before using other APIs. [The Tenant API]({{'/api/tenant/' | relative_url}}) and [the Gateway API]({{'/api/gateway/' | relative_url}}) are also provided for the master gateway only. Apart from these differences, the other APIs are same both for the device gateway and the master gateway.

| API | Device Gateway | Master Gateway | Note |
| --------- | ---- | ----------- | --- |
| [Connect]({{'/api/connect/' | relative_url}}) | O | X | manage devices directly |
| [Connect Master]({{'/api/connectMaster/' | relative_url}}) | X | O | manage devices via device gateways |
| [Login]({{'/api/login/' | relative_url}}) | X | O | login as an administrator or a tenant |
| [Tenant]({{'/api/tenant/' | relative_url}}) | X | O | manage tenants |
| [Gateway]({{'/api/gateway/' | relative_url}}) | X | O | manage device gateways |
| [Server]({{'/api/server/' | relative_url}}) | O | X | implement server matching |


### API definition

Each API sends a single request to the gateway and gets a single response back. 

```protobuf
service Connect {
  rpc Connect(ConnectRequest) returns (ConnectResponse);
}

message ConnectRequest {
  ConnectInfo connectInfo;
}

message ConnectResponse {
  uint32 deviceID;
}
```

For brevity, when the response has no data, its definition is omitted in the reference manual.
{: .notice--warning}


### XXX_Multi command

One of the design goals of G-SDK is to manage hundreds of devices easily. The more devices, the more cumbersome for developers to do same operations repetitively on multiple devices. To alleviate this overload, G-SDK provides XXX_Multi commands. For example, with [User.EnrollMulti]({{ '/api/user/' | relative_url }}#enrollmulti), you can enroll users to multiple devices with only one function call. All these operations will be executed in parallel by the gateway.

For these commands, if the operation fails on any of the target devices, the following __deviceErrors__ will be returned. Getting these information will vary according to the client language. See the user synchronization example of the client SDK for details.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceErrors | [ErrorResponse[]]({{ 'api/err/' | relative_url }}#ErrorResponse) | The errors on some of the target devices |

Since the responses of all XXX_Multi commands have same definition, they are also omitted in the manual.
{: .notice--warning}

## Core APIs

### [Connect]({{ 'api/connect/' | relative_url }})
Manage connections between the device gateway and the devices.

### [ConnectMaster]({{ 'api/connectMaster/' | relative_url }})
Manage connections between the master gateway and the devices through device gateways. 

### [Device]({{ 'api/device/' | relative_url }}) 
Provide the firmware and capability information of a device. Lock, reset, or upgrade devices.

### [Event]({{ 'api/event/' | relative_url }})
Read event logs from a device. Enable monitoring and receive real-time events from devices.

### [Network]({{ 'api/network/' | relative_url }}) 
Configure the IP address of a device.

### [User]({{ 'api/user/' | relative_url }})
Enroll and manage users. Set fingerprints, cards, and access groups to users.

## Master gateway APIs

### [Gateway]({{ 'api/gateway/' | relative_url }})
Manage device gateways for the master gateway.

### [Login]({{ 'api/login/' | relative_url }})
Login to the master gateway as an administrator or a tenant.

### [Tenant]({{ 'api/tenant/' | relative_url }})
Manage tenants for the master gateway. Only an administrator can use these APIs.

## Authentication APIs

### [Auth]({{ 'api/auth/' | relative_url }})
Configure the options related to credentials such as cards and fingerprints.

### [Card]({{ 'api/card/' | relative_url }})
Read or write a card. You can also configure the options related to authenticating cards. 

### [Finger]({{ 'api/finger/' | relative_url }})
Scan a fingerprint. You can also configure the options related to authenticating fingerprints. 

### [Face]({{ 'api/face/' | relative_url }})
Scan face templates. You can also configure the options related to authenticating faces.

### [Server]({{ 'api/server/' | relative_url }})
Implement server matching.

## Access control APIs
You can specify which users can access which doors for specific schedules. 

### [Access]({{ 'api/access/' | relative_url }})
Configure access levels and access groups.

### [Door]({{ 'api/door/' | relative_url }})
Configure doors and manage them.

### [Lift]({{ 'api/lift/' | relative_url }})
Configure lifts and manage them.

### [Schedule]({{ 'api/schedule/' | relative_url }})
Make schedules, which will be used for access control and other configurations. 

## T&A APIs

### [T&A]({{ 'api/tna/' | relative_url }})
Configure the options related to time & attendance. You can also get event logs with time & attendance or job code information. 

## Configuration APIs

### [Action]({{ 'api/action/' | relative_url }})
Configure what actions should be taken when specific triggers are fired. 

### [Display]({{ 'api/display/' | relative_url }})
Configure the UI of devices. You can also upgrade the language pack.

### [RS485]({{ 'api/rs485/' | relative_url }})
Configure the RS485 communication parameters and manage the slave devices.

### [Status]({{ 'api/status/' | relative_url }})
Configure the LEDs and the buzzer for each status. 

### [System]({{ 'api/system/' | relative_url }})
Configure the miscellaneous options of a device. You can also check if the device is locked. 

### [Thermal]({{ 'api/thermal/' | relative_url }})
Configure the options related to thermal cameras.

### [Time]({{ 'api/time/' | relative_url }})
Configure the options such as Daylight Saving Time(DST) and time synchronization. You can also set the clock on the device. 

### [VoIP]({{ 'api/voip/' | relative_url }})
Configure the options related to VoIP(Voice over IP).

### [Wiegand]({{ 'api/wiegand/' | relative_url }})
Configure Wiegand formats which will be used for interpreting card data and interfacing with 3rd party readers/controllers. It also provides APIs for managing Wiegand slave devices.

## [Zone APIs]({{ 'api/zone/' | relative_url }})

You can configure several types of zones for high-level functions such as anti passback and intrusion alarm. G-SDK supports only local zones, where all devices should be within a RS485 network. 

### [Anti passback zone]({{ 'api/zone/apb/' | relative_url }})

### [Timed anti passback zone]({{ 'api/zone/timed' | relative_url }})

### [Intrusion alarm zone]({{ 'api/zone/intrusion' | relative_url }})

### [Fire alarm zone]({{ 'api/zone/fire' | relative_url }})

### [Scheduled lock zone]({{ 'api/zone/lock' | relative_url }})

### [Interlock zone]({{ 'api/zone/interlock' | relative_url }})

### [Lift zone]({{ 'api/zone/lift' | relative_url }})

## Misc. APIs

### [Admin]({{ 'api/admin/' | relative_url }})
Get the version of G-SDK.

### [Err]({{ 'api/err/' | relative_url }}) 
The error definition for [XXX_Multi commands](#xxx_multi-command). 


