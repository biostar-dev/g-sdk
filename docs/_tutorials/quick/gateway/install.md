---
permalink: /gateway/install/
title: "Installation"
---

## Download

1. Download the latest version of the gateway from [github](https://github.com/biostar-dev/g-sdk/releases/tag/V0.9.5)
2. Unzip the archive file

## Create or import certificates

The device gateway uses TLS 1.2 for secure communication. When installing it for the first time, you have to create or import certificates for TLS. 

### Create new self-signed certificates

You can create self-signed certificates by running the gateway with __-c__ option as below.

```
device-gateway -c

(1) Create the Root CA
>>> Country Name (2 letter code) [US]: KR
>>> State or Province Name (full name) []: Gyeonggi
>>> Locality Name (eg, city) []: Seongnam
>>> Organization Name (eg, company) []: Suprema inc.
>>> Organizational Unit Name (eg, section) []:
>>> CA certificate will expire after n years [10]:
(2) Create the server certificate
>>> Do you want to use the same information as root CA? [Y/n]:
>>> Common Name (e.g. server FQDN or YOUR name) []: gateway.supremainc.com
>>> More DNS names? [y/N]:
>>> More IPv4 address? [y/N]:
>>> Server certificate will expire after n years [2]: 5
```

### Import certificates

You can use the certificates you already have for the gateway. You have to change the __'cert'__ section of [the configuration file]({{'/gateway/config/' | relative_url}}) accordingly. .

## Modify the configuration file as needed

You can specify several options using [the configuration file]({{'/gateway/config/' | relative_url}}).  

## Run

```
device-gateway
```