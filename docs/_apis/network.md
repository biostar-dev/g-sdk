---
title: "Network API"
toc_label: "Network"  
---

Network is the most basic configuration for the gateway to communicate with a device. 

As of the gateway V1.1, only the IPv4 configuration is supported. IPv6 will be supported in the future versions.
{: .notice--info}

## IP

```protobuf
message IPConfig {
  bool useDHCP; 
  string IPAddr;
  string gateway;
  string subnetMask;
  int32 port; 

  connect.ConnectionMode connectionMode;

  string serverAddr; 
  int32 serverPort;
  int32 SSLServerPort;

  bool useDNS;
  string DNSServer;
  string serverURL;

  int32 MTUSize;
  EthernetBaseband baseband;
}
```
{: #IPConfig }

useDHCP
: If true, try to acquire an IP address from DHCP servers. If it is true, __IPAddr__, __gateway__, and __subnetMask__ parameters will be automatically set by DHCP.

port
: Used only when __connectionMode__ is __SERVER_TO_DEVICE__. The default is 51211.

connectionMode
: __SERVER_TO_DEVICE__(default) or __DEVICE_TO_SERVER__. The __serverAddr__, __serverPort__, __SSLServerPort__, __useDNS__, __DNSServer__, and __serverURL__ are used only if the __connectionMode__ is __DEVICE_TO_SERVER__.

serverAddr
: The IP address of the device gateway. Please refer to [the gateway configuration]({{'/gateway/config/' | relative_url}}#device-server).

serverPort
: The port of the device gateway. The default is 51212.

SSLServerPort
: The SSL port of the device gateway. The default is 51213.

useDNS
: If it is true, the device will try to acquire the IP address of the gateway from the DNS server. Check if the device supports DNS with [CapabilityInfo.DNSSupported]({{'/api/device/' | relative_url}}#CapabilityInfo).

DNSServer
: The IP address of a DNS server.

serverURL
: The URL of the device gateway.

```protobuf
enum EthernetBaseband {
  BASEBAND_10BASE_T = 0;
  BASEBAND_100BASE_T = 1;
}
```


### GetIPConfig

Get the IP configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [IPConfig](#IPConfig) | The IP configuration read from the device |


### SetIPConfig

Set the IP configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [IPConfig](#IPConfig) | The IP configuration to be written to the device |

### SetIPConfigMulti

Set the IP configurations of multiple devices. 

This function should be used only if __IPConfig.useDHCP__ is true for all the devices. Otherwise, you have to use [SetIPConfig](#setipconfig) per device.
{: .notice--warning}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The ID of the devices |
| config | [IPConfig](#IPConfig) | The IP configuration to be written to the devices |

## WLAN

Check __Capability.WLANSupported__ before using these APIs.

```protobuf
message WLANConfig {
  bool enabled;
  WLANOperationMode opMode;
  WLANAuthType authType;
  WLANEncryptionType encType;

  string ESSID;
  string authKey;
}
```
{: #WLANConfig }

```protobuf
enum WLANOperationMode {
  WLAN_OPMODE_MANAGED = 0;
  WLAN_OPMODE_ADHOC = 1;
}

enum WLANAuthType {
  WLAN_AUTH_OPEN = 0;
  WLAN_AUTH_SHARED = 1;
  WLAN_AUTH_WPA_PSK = 2;
  WLAN_AUTH_WPA2_PSK = 3;
}

enum WLANEncryptionType {
  WLAN_ENC_NONE = 0;
  BS2_WLAN_ENC_WEP = 1;
  BS2_WLAN_ENC_TKIP_AES = 2;
  BS2_WLAN_ENC_AES = 3;
  BS2_WLAN_ENC_TKIP = 4;
}
```

### GetWLANConfig

Get the WLAN configuration of a device.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |

| Response |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| config | [WLANConfig](#WLANConfig) | The WLAN configuration read from the device |

### SetWLANConfig

Set the WLAN configuration of a device.

Due to a FW issue, only __WLANConfig.enabled__ will be written. To change the other parameters, you have to use the device UI directly.
{: .notice--danger}

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceID | uint32 | The ID of the device |
| config | [WLANConfig](#WLANConfig) | The WLAN configuration to be written to the device |


### SetWLANConfigMulti

Set the WLAN configurations of multiple devices.

| Request |

| Parameter | Type | Description |
| --------- | ---- | ----------- |
| deviceIDs | uint32[] | The IDs of the devices |
| config | [WLANConfig](#WLANConfig) | The WLAN configuration to be written to the devices |
