---
permalink: /gateway/install/
title: "Device Gateway: Installation"
---

## Download

1. Download the latest version of the device gateway from [github]({{ site.last_ver }})
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
>>> Organization Name (eg, company) []: Suprema Inc.
>>> Organizational Unit Name (eg, section) []:
>>> CA certificate will expire after n years [10]:
(2) Create the server certificate
>>> Do you want to use the same information as root CA? [Y/n]:
>>> Common Name (e.g. server FQDN or YOUR name) []: gateway.supremainc.com
>>> More DNS names? [y/N]:
>>> More IPv4 address? [y/N]: y
>>> IPv4 Address (eg, 8.8.8.8) []: 192.168.0.2
>>> IPv4 Address (eg, 8.8.8.8) []:
>>> Server certificate will expire after n years [2]: 5
```

When you already created or imported the root CA certificate, you can create only the server certificate with __-cs__ option. 

```
device_gateway -cs

Create the server certificate
>>> Country Name (2 letter code) [US]: KR
>>> State or Province Name (full name) []: Gyeonggi
>>> Locality Name (eg, city) []: Seongnam
>>> Organization Name (eg, company) []: Suprema Inc.
>>> Organizational Unit Name (eg, section) []:
>>> Common Name (e.g. server FQDN or YOUR name) []: gateway.supremainc.com
>>> More DNS names? [y/N]:
>>> More IPv4 address? [y/N]: y
>>> IPv4 Address (eg, 8.8.8.8) []: 192.168.0.2
>>> IPv4 Address (eg, 8.8.8.8) []:
>>> Certificate will expire after n years [5]:
```

If you want to connect to the gateway at the same machine with __localhost__, you have to add __localhost__ to the DNS names.
{: .notice--warning}

### Import certificates

You can use the certificates you already have for the device gateway. You have to change the __cert__ section of [the configuration file]({{'/gateway/config/' | relative_url}}) accordingly.

## Modify the configuration file as needed

You can specify several options using [the configuration file]({{'/gateway/config/' | relative_url}}).  

## Run

```
device-gateway
```


### Command line options

| Option | Description |
| ------ | ----------- |
| -f     | specify the configuration file (default: ./config.json) |
| -l     | specify the log level (1: error only, 5: most verbose, 3: default ) |
| -c     | create the self-signed certificates for SSL communication | 
| -cs    | create the server certificate using the existing root CA | 
| -v     | show the version of the gateway |
| -h     | show the command line options | 