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

### API Definition

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


### XXX_Multi Command

One of the design goals of G-SDK is to manage hundreds of devices easily. The more devices, the more cumbersome for developers to do same operations repetitively on multiple devices. To alleviate this overload, G-SDK provides XXX_Multi commands. For example, with [User.EnrollMulti]({{ '/api/user/' | relative_url }}#enrollmulti), you can enroll users to multiple devices with only one function call. All these operations will be executed in parallel by the gateway.

For these commands, if the operation fails on any of the target devices, the following __deviceErrors__ will be returned. 

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceErrors | [ErrorResponse[]]({{ 'api/err/' | relative_url }}#ErrorResponse) | The errors on some of the target devices |

Since the responses of all XXX_Multi commands have same definition, they are also omitted in the manual.
{: .notice--warning}

## Core APIs

### [Connect]({{ 'api/connect/' | relative_url }})
Manage connections between the gateway and devices.

### [Device]({{ 'api/device/' | relative_url }}) 
Provide the firmware and capability information of a device. Lock, reset, or upgrade devices.

### [Network]({{ 'api/network/' | relative_url }}) 
Configure the IP address of a device.

### [User]({{ 'api/user/' | relative_url }})
Enroll and manage users. Set fingerprints, cards, and access groups to users.

### [Event]({{ 'api/event/' | relative_url }})
Read event logs from a device. Enable monitoring and receive real-time events from devices.

## Authentication APIs

### [Auth]({{ 'api/auth/' | relative_url }})
Configure the options related to credentials such as cards and fingerprints.

### [Card]({{ 'api/card/' | relative_url }})
Read or write a card. You can also configure the options related to authenticating cards. 

### [Finger]({{ 'api/finger/' | relative_url }})
Scan a fingerprint. You can also configure the options related to authenticating fingerprints. 

### [Face]({{ 'api/face/' | relative_url }})
Scan face templates. You can also configure the options related to authenticating faces.

## Access Control APIs
You can specify which users can access which doors for specific schedules. 

### [Access]({{ 'api/access/' | relative_url }})
Configure access levels and access groups.

### [Door]({{ 'api/door/' | relative_url }})
Configure doors and manage them.

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

### [Status]({{ 'api/status/' | relative_url }})
Configure the LEDs and the buzzer for each status. 

### [System]({{ 'api/system/' | relative_url }})
Configure the miscellaneous options of a device. You can also check if the device is locked. 

### [Time]({{ 'api/time/' | relative_url }})
Configure the options such as Daylight Saving Time(DST) and time synchronization. You can also set the clock on the device. 

### [Wiegand]({{ 'api/wiegand/' | relative_url }})
Configure Wiegand formats which will be used for interpreting card data and interfacing with 3rd party readers/controllers. 

## Misc. APIs

### [Admin]({{ 'api/admin/' | relative_url }})
Get the version of G-SDK.

### [Cert]({{ 'api/cert/' | relative_url }})
Create the root CA and the server certificate for SSL/TLS communication. 

### [Err]({{ 'api/err/' | relative_url }}) 
The error definition for [XXX_Multi commands](#xxx_multi-command). 