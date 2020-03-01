---
title: "Certificate API"
toc_label: "Certificate"  
---

Create the root CA and the server certificate for secure communication. You can also create the self-signed certificates using the gateway as [described]({{'/gateway/install/' | relative_url}}). 

## Root CA

```protobuf
message PKIName {
  string country;
  string province;
  string city;
  string organization;
  string organizationUnit;
  string commonName6;
}
```
{: #PKIName}

### CreateCA

Create the root CA certificate, which will be used for issuing the server certificate. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| subject | [PKIName](#PKIName) | The subject information of the CA |
| expireAfterYears | int32 | The certificate will expire after this period |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| CACert | string | The CA certificate in PEM format |
| CAKey | string | The private key in PEM format |

### SetCA

Set the root CA certificate for the gateway. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| CACert | string | The CA certificate in PEM format |
| CAKey | string | The private key in PEM format |

### GetCA

Get the root CA certificate of the gateway.

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| CACert | string | The CA certificate in PEM format |
| CAKey | string | The private key in PEM format |

## Server Certificate

### CreateServerCertificate

Create the server certificate for the gateway. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| subject | [PKIName](#PKIName) | The subject information of the gateway |
| domainNames | string[] | The DNS names of the gateway |
| IPAddrs | string[] | The IP addresses of the gateway |
| expireAfterYears | int32 | The certificate will expire after this period |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| serverCert | string | The server certificate in PEM format  |
| serverKey | string | The private key in PEM format |

### SetServerCertificate

Set the server certificate for the gateway. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| serverCert | string | The server certificate in PEM format  |
| serverKey | string | The private key in PEM format |

### GetServerCertificate

Get the server certificate of the gateway. 

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| serverCert | string | The server certificate in PEM format |
| serverKey | string | The private key in PEM format |

