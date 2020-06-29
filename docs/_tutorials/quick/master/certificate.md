---
permalink: /master/certificate/
title: "Certificate Management"
---

G-SDK uses SSL/TLS X.509 certificates for secure communication. The certificates fulfill two functions. First, they can assist with authenticating and verifying the identify of a host or site. Second, they enable the encryption of communication packets.

## Server certificate

The following certificates are necessary for running a master gateway. 

ca_cert
: The root CA certificate in PEM format. You can create it using __-c__ command line option. Your application also need this file to authenticate the master gateway.

ca_key
: The private key of the root CA in PEM format. Is will be created with __ca_cert__.

server_cert
: The server certificate of the master gateway in PEM format. You can create it using __-c__ or __-cs__ command line option. Your application will authenticate this certificate with the __ca_cert__.

server_key
: The private key of the server certificate in PEM format. It will be created with __server_cert__.

admin_cert
: The default client certificate with the tenant ID of 'administrator'. You can create it using __-c__ or __-cs__ command line option. Your application will need the certificate and the below key to login to the master gateway as an administrator.

admin_key
: The private key of the administrator certificate in PEM format. It will be created with __admin_cert__.

## Tenant certificate

tenant_id_cert
: The client certificate with the specific tenant ID. You can create it using __-ct__ command line option. Your application will need the certificate and the below key to login to the master gateway as a tenant.

tenant_id_key
: The private key of the tenant certificate in PEM format. It will be created with __tenant_id_cert__.

## Gateway certificate

gateway_id_cert
: The client certificate with the specific gateway ID. You can create it using __-cg__ command line option. The device gateway will need the certificate and the below key to connect to the master gateway.

gateway_id_key
: The private key of the gateway certificate in PEM format. It will be created with __gateway_id_cert__.