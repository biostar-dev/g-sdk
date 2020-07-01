---
title: "Tenant API"
toc_label: "Tenant"  
---

For the master gateway only.
{: .notice--info}

The master gateway is designed to support multi-tenant systems. Each tenant owns its own device gateways and cannot connect to the gateways of other tenants. Only administrators can add or delete tenants. In other words, you have to login to the master gateway using [LoginAdmin]({{'/api/login/' | relative_url}}#loginadmin) to use the following APIs.

At default, one tenant, 'administrator', is created automatically for the master gateway. You cannot delete this default tenant. If your system is multi-tenant, you have to create other tenants using the Tenant API.
{: .notice--info}

## Information

```protobuf
message TenantInfo {
  string tenantID;
  repeated string gatewayIDs;
}
```
{: #TenantInfo }

tenantID
: The ID of the tenant.

gatewayIDs
: The IDs of the gateways owned by the tenant.

### GetList

Get the tenant list registered to the master gateway.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantIDs | string[] | The IDs of the tenants registered to the master gateway |


### Get

Get the information of the specified tenants.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantIDs | string[] | The IDs of the tenants |


| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantInfos | [TenantInfo[]](#TenantInfo) | The information of the specified tenants |

## Management

### Add

Add tenants. Since these information is stored in the database, you only have to do it once. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantInfos | [TenantInfo[]](#TenantInfo) | The information of the tenants to be added |

### Delete

Delete tenants.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantIDs | string[] | The IDs of the tenants to be deleted |

### AddGateway

Add device gateways to a tenant. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantID | string | The ID of the tenant to which the gateways to be added |
| gatewayIDs | string[] | The IDs of the gateways to be added |

### DeleteGateway

Delete device gateways from a tenant.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantID | string | The ID of the tenant from which the gateways to be deleted |
| gatewayIDs | string[] | The IDs of the gateways to be deleted |


## Certificate

You can create tenant certificates using the command line options of the master gateway as described in [Create certificates]({{'/master/install/' | relative_url}}#create-certificates). 
You can also create and manage them using the following APIs. 

In some cases, you have to disable issued certificates. The tenant with a blacklisted certificate will not be able to connect to the master gateway. 

### CreateCertificate

Create a tenant certificate. The client application should use the tenant certificate to [login]({{'/api/login/' | relative_url}}#login) to the master gateway. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantID | string | The ID of the tenant |
| subject | [PKIName]({{'/api/gateway/' | relative_url}}#PKIName) | The subject of the certificate |
| expireAfterYears | int32 | The certificate will expire after the specified years |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantCert | string | The tenant certificate in PEM format |
| tenantKey | string | The private key in PEM format |

### GetIssuanceHistory

```protobuf
message CertificateInfo {
  string tenantID;
  cert.PKIName subject; 
  int64 serialNO;
  int64 issueDate;
  int64 expiryDate;
  bool blacklisted;
}
```
{: #CertificateInfo }

tenantID
: The ID of the tenant.

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

Get the history of certificates issued by the master gateway.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantIDs | string[] | The IDs of the tenants whose histories will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| certInfos | [CertificateInfo[]](#CertificateInfo) | The certificates issued for the tenants |


### GetCertificateBlacklist

Get the blacklisted certificates for the specified tenants.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantIDs | string[] | The IDs of the tenants whose blacklists will be returned |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| certInfos | [CertificateInfo[]](#CertificateInfo) | The blacklisted certificates for the specified tenants |

### AddCertificateBlacklistRequest

Add the certificates to the tenant's blacklist.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantID | string | The ID of the tenant |
| serialNOs | int64[] | The serial numbers of the certificates to be blacklisted |

### DeleteCertificateBlacklistRequest

Delete the certificates from the tenant's blacklist.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantID | string | The ID of the tenant |
| serialNOs | int64[] | The serial numbers of the certificates to be deleted from the blacklist |