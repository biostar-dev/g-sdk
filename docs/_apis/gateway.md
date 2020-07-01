---
title: "Gateway API"
toc_label: "Gateway"  
---

For the master gateway only.
{: .notice--info}

A tenant may have multiple device gateways. You have to do the followings for the device gateways to connect to the master gateway. 

1. Issue client certificates for the device gateways and configure them accordingly. Refer to [Certificate Management]({{'/master/certificate/' | relative_url}}) for details.
2. Add the device gateways to the master gateway using [Add](#add).

## Information

```protobuf
message GatewayInfo {
  string gatewayID;
  repeated uint32 deviceIDs;
  bool isConnected;
}
```
{: #GatewayInfo }

gatewayID
: The ID of the device gateway.

deviceIDs
: The IDs of the devices managed by the device gateway.

isConnected
: True if the device gateway is connected to the master gateway. 

### GetList

Get the device gateway list registered to the tenant.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayIDs | string[] | The IDs of the device gateways registered to the tenant |

### Get

Get the information of the specified device gateways.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayIDs | string[] | The IDs of the gateways |


| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayInfos | [GatewayInfo[]](#GatewayInfo) | The information of the specified gateways |

### SubscribeStatus

If you subscribe to the status channel, you will be notified whenever a device gateway is connected or disconnected.

```protobuf
enum Status {
  DISCONNECTED = 0x00;
  CONNECTED = 0x01;
}

message StatusChange {
  string gatewayID;
  Status status;
  uint32 timestamp; 
}
```
gatewayID
: The ID of the device gateway whose status changes.

status
: The new status of the gateway.

timestamp
: The time when the change is occurred in Unix time format.

## Management

### Add

Add device gateways to the tenant. Since these information is stored in the database, you only have to do it once. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayIDs | string[] | The IDs of the gateways to be added |


### Delete

Delete device gateways from the tenant.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayIDs | string[] | The IDs of the gateways to be deleted |


## Certificate

You can create gateway certificates using the command line options of the master gateway as described in [Create certificates]({{'/master/install/' | relative_url}}#create-certificates). You can also create and manage them using the following APIs. 

In some cases, you have to disable issued certificates. The device gateway with a blacklisted certificate will not be able to connect to the master gateway. 

```protobuf
message PKIName {
  string country;
  string province;
  string city;
  string organization;
  string organizationUnit;
  string commonName;
}
```
{: #PKIName }

country
: 2 byte country code as defined in [ISO 3166](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2)

### CreateCertificate

Create a device gateway certificate. After creating the certificate, you have to change [the configuration file]({{'/gateway/config/' | relative_url}}#configuration-file) of the device gateway accordingly. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the device gateway |
| subject | [PKIName](#PKIName) | The subject of the certificate |
| expireAfterYears | int32 | The certificate will expire after the specified years |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayCert | string | The gateway certificate in PEM format |
| gatewayKey | string | The private key of the certificate in PEM format |

### GetIssuanceHistory

```protobuf
message CertificateInfo {
  string gatewayID;
  cert.PKIName subject; 
  int64 serialNO;
  int64 issueDate;
  int64 expiryDate;
  bool blacklisted;
}
```
{: #CertificateInfo }

gatewayID
: The ID of the gateway.

subject
: The subject of the certificate.

serialNO
: The unique 64 bit identifier for the certificate.

issueDate
: The issue date in Unix time format.

expiryDate
: The expiry date in Unix time format.

blacklisted
: True if the certificate is blacklisted.

Get the issuing history of certificates for the specified gateways.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayIDs | string[] | The IDs of the gateway whose histories will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| certInfos | [CertificateInfo[]](#CertificateInfo) | The certificates issued for the gateways |


### GetCertificateBlacklist

Get the blacklisted certificates for the specified gateways.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayIDs | string[] | The IDs of the gateways whose blacklists will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| certInfos | [CertificateInfo[]](#CertificateInfo) | The blacklisted certificates for the specified gateways |

### AddCertificateBlacklistRequest

Add the certificates to the blacklist.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway |
| serialNOs | int64[] | The serial numbers of the certificates to be blacklisted |

### DeleteCertificateBlacklistRequest

Delete the certificates from the blacklist.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| gatewayID | string | The ID of the gateway |
| serialNOs | int64[] | The serial numbers of the certificates to be deleted from the blacklist |