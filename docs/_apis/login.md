---
title: "Login API"
toc_label: "Login"  
---

For the master gateway only.
{: .notice--info}

For more secure communication, the master gateway adopts mutual authentication. In other words, to connect to the master gateway, the client should provide its certificate. There are two types of client certificates.

Administrator certificate
: At default, one tenant, 'administrator', is created automatically for the master gateway. The certificates with the tenant ID of 'administrator' can access all the gateways and devices of a master gateway. To use [LoginAdmin](#LoginAdmin), you need an administrator certificate.

Tenant certificate
: The certificates of the other tenants will give access to the device gateways of the corresponding tenant only. 

Please refer to [Certificate Management]({{'/master/certificate/' | relative_url}}) for creating these certificates. 

## Login 

You have to login to the master gateway before using any other APIs. With an administrator certificate, you can use [LoginAdmin](#LoginAdmin) and connect to any device gateway or device. With a tenant certificate, you should use [Login](#Login-1) instead. 
If login succeeds, the master gateway will return a JWT token, which should be used as [a GRPC call credential](https://grpc.io/docs/guides/auth/). Refer to the quick start guide of your selected language for details. 

### Login

Login to the master gateway as a normal tenant.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| tenantCert | string | the tenant certificate in PEM format |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| jwtToken | string | the JWT token which should be used as a call credential |

### LoginAdmin

Login to the master gateway as an administrator. The certificate should be issued with the tenant ID of 'administrator'. 

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| adminTenantCert | string | the administrator certificate in PEM format |
| tenantID | string | the ID of a tenant. To use [the Tenant API]({{'/master/tenant/' | relative_url}}) it should be 'administrator'. To access any other tenants, use the ID of the tenant |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| jwtToken | string | the JWT token which should be used as a call credential |