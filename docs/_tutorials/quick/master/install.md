---
permalink: /master/install/
title: "Master Gateway: Installation"
---

## Download

1. Download the latest version of the master gateway from [github]({{ site.last_ver }})
2. Unzip the archive file

## Get a license

Unlike the device gateway, you need a valid license to run the master gateway.

### Trial

You can get a trial license using __-lat__ command line option. The trial version provides the full functionality, but will expire after one month.

### Full license

To get a full license, please contact us at sales_sys@supremainc.com. After receiving a license key, you can activate it using __-la__ option.

```
master_gateway -la FF79C9-D1BDD4-4555B9-BF55F3-xxxxxx-xxxxxx
```

## Create certificates

The master gateway uses TLS1.2 for secure communication. You need the following certificates to run the master gateway. 

### Server certificate

You can create self-signed certificates by running the master gateway with __-c__ option as below. It will create the root CA certificate, the server certificate, and the administrator certificate. 

```
master_gateway -c
(1) Create the Root CA
>>> Country Name (2 letter code) [US]: KR
>>> State or Province Name (full name) []: Gyeonggi
>>> Locality Name (eg, city) []: Seongnam
>>> Organization Name (eg, company) []: Suprema Inc.
>>> Organizational Unit Name (eg, section) []:
>>> CA certificate will expire after n years [10]:
(2) Create the server certificate
>>> Do you want to use the same information as root CA? [Y/n]:
>>> Common Name (e.g. server FQDN or YOUR name) []: master.supremainc.com
>>> More DNS names? [y/N]:
>>> More IPv4 address? [y/N]:
>>> Certificate will expire after n years [5]:
```

If you want to connect to the gateway at the same machine with __localhost__, you have to add __localhost__ to the DNS names.
{: .notice--warning}


### Tenant certificate

The master gateway is designed to support multi-tenant systems. Each tenant should have its own certificate to connect to the master gateway. You can create a tenant certificate using __-ct__ option as follows. For the usage of the tenant certificate, refer to the quick start guide of your language. 

```
master_gateway -ct
Create a tenant certificate
>>> Tenant ID (eg, sample_tenant) []: tenant1
>>> Country Name (2 letter code) [US]: US
>>> State or Province Name (full name) []: California
>>> Locality Name (eg, city) []: LA
>>> Organization Name (eg, company) []:
>>> Organizational Unit Name (eg, section) []:
>>> Common Name (e.g. server FQDN or YOUR name) []: sample tenant
>>> Certificate will expire after n years [5]:
```

### Gateway certificate

The master gateway can manage up to 100 device gateways. The device gateway should have a certificate to connect to the master gateway. You can create one using __-cg__ option. You have to copy the certificate to the device gateway and configure [the configuration file]({{'/gateway/config/' | relative_url}}#certificates).

```
master_gateway -cg
Create a gateway certificate
>>> Tenant ID (eg, sample_tenant) []: tenant1
>>> Gateway ID (eg, sample_gateway) []: gateway1
>>> Country Name (2 letter code) [US]: US
>>> State or Province Name (full name) []: California
>>> Locality Name (eg, city) []: LA
>>> Organization Name (eg, company) []:
>>> Organizational Unit Name (eg, section) []:
>>> Common Name (e.g. server FQDN or YOUR name) []: sample gateway for tenant1
>>> Certificate will expire after n years [5]:
```

## Modify the configuration file as needed

You can specify several options using [the configuration file]({{'/master/config/' | relative_url}}).  

## Run

```
master-gateway
```

### Command line options

| Option | Description |
| ------ | ----------- |
| -f     | specify the configuration file (default: ./config.json) |
| -l     | specify the log level (1: error only, 5: most verbose, 3: default ) |
| -c     | create the self-signed certificates for SSL communication. It will create the root CA certificate, the server certificate, and the administrator certificate | 
| -cs    | create the server and administrator certificates using the existing root CA | 
| -ct    | create a tenant certificate | 
| -cg    | create a device gateway certificate | 
| -li    | show the license information | 
| -la    | activate the license using a license key | 
| -ld    | deactivate the license. After deactivation, you can use the license key on another computer |
| -lco   | create an offline activation request using a license key. As for offline activation, contact us at sales_sys@supremainc.com |
| -lao   | activate the license using an offline activation response file |
| -lat   | activate a trial license | 
| -v     | show the version of the gateway |
| -h     | show the command line options | 