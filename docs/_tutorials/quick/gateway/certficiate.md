---
permalink: /gateway/certificate/
title: "Device Gateway: Certificate Management"
---

G-SDK uses SSL/TLS X.509 certificates for secure communication. The certificates fulfill two functions. First, they can assist with authenticating and verifying the identity of a device gateway. Second, they enable the encryption of communication packets. Please note that the private keys should not be shared with anyone.

## Device gateway alone

When you use a device gateway alone, you need the following certificates.

ca_cert
: The root CA certificate in PEM format. You can create it using __-c__ command line option. Your applications also need this file to authenticate the device gateway.

ca_key
: The private key of the root CA in PEM format. It will be created with __ca_cert__. 

server_cert
: The server certificate of the device gateway in PEM format. You can create it using __-c__ or __-cs__ command line option. Your application will authenticate this certificate with the __ca_cert__.

server_key
: The private key of the server certificate in PEM format. It will be created with __server_cert__.

## With master gateway

The master gateway adopts mutual authentication for more secure communication. So, if you want the device gateway to connect to a master gateway, you need the following certificates, too.

master_ca_cert
: The root CA of the master gateway in PEM format. It will be used to authenticate the master gateway. See [server certificate]({{'/master/install/' | relative_url}}#server-certificate) for creating this certificate.

gateway_cert 
: The client certificate in PEM format to connect to the master gateway. See [gateway certificate]({{'/master/install/' | relative_url}}#gateway-certificate) for creating this certificate.

gateway_key 
: The private key of the client certificate in PEM format. It will be created with __gateway_cert__.
