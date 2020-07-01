---
permalink: /gateway/config/
title: "Device Gateway: Configuration"
---

## Configuration file

As default, the configuration file resides in the same folder as the executable. You can specify another configuration file with the [-f](#command-line-options) option. 

### Certificates

See [Certificate Management]({{'/gateway/certificate/' | relative_url}}) for managing these certificates. The __master_ca_cert__, __gateway_cert__, and __gateway_key__ are needed only when [master_gateway.use](#master_gateway) is true. 

```json
{
  "cert": {
    "dir": "cert",
    "ca_cert": "ca.crt",
    "ca_key": "ca_key.pem",
    "server_cert": "server.crt",
    "server_key": "server_key.pem",
    "master_ca_cert": "master_ca.crt",
    "gateway_cert": "gateway1.crt",
    "gateway_key": "gateway1_key.pem",
    "self_signed": true
  }
}
```
{: #cert}

| Name | Description |
| -----| ----------- |
| dir  | The folder in which the certificates reside. It can be either an absolute or a relative path |
| ca_cert | The root CA certificate in PEM format |
| ca_key | The private key of the root CA in PEM format | 
| server_cert | The server certificate in PEM format |
| server_key | The private key of the server certificate in PEM format |
| master_ca_cert | The root CA of the master gateway in PEM format |
| gateway_cert | The client certificate in PEM format to connect to the master gateway  |
| gateway_key | The private key of the client certificate in PEM format |

### Device server

The gateway consists of two servers, the device server and the gRPC server. The device server handles the connections with BioStar devices, while the gRPC server manages the RPC connections with client applications. 

```json
{
  "device_server": {
    "ip": "",
    "port": 51212,
    "ssl_port": 51213,
    "reconnect_interval": 30000
  }
}
```

| Name | Description |
| -----| ----------- |
| ip  | The address of the device server. If it is "", it means the same as INADDR_ANY |
| port | The port of the device server. The default is 51212 |
| ssl_port | The SSL port of the device server. The default is 51213 |
| reconnect_interval | If you use [the asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection), the gateway will try to reconnect to a disconnected device after this interval in milliseconds. |


### RPC server

```json
{
  "rpc_server": {
    "ip": "localhost",
    "port": 4000,
    "max_recv_size": 75497472
  }
}
```

| Name | Description |
| -----| ----------- |
| ip  | The address of the gRPC server. If it is "", it means the same as INADDR_ANY |
| port | The port of the gRPC server. The default is 4000. Since all communication with gRPC clients use SSL, there is no separate SSL port |
| max_recv_size | The largest size of gRPC packet in bytes. If you are to use [the UpgradeFirmware API]({{'/api/device/' | relative_url}}#upgradefirmware), it should be larger than the size of the firmware file | 


### Timeout

```json
{
  "timeout": {
    "cmd": 5000,
    "long_cmd": 10000,
    "upgrade_cmd": 30000,
    "input_cmd": 10000,
    "face_input_cmd": 60000,
    "keep_alive": 32000
  }
}
```

These timeout values are for the commands between the gateway and devices. All values are in milliseconds. 

| Name | Description |
| -----| ----------- |
| cmd | The timeout for generic commands |
| long_cmd | The timeout for getting large data such as user information and event logs |
| upgrade_cmd | The timeout for upgrading firmware |
| input_cmd | The timeout for the commands waiting for user inputs |
| face_input_cmd | The timeout for enrolling a face |
| keep_alive | The heartbeat timeout for device connections. The gateway will send keep alive packets with this interval. To prevent unnecessary packets, set this value larger than 30000ms - the heartbeat timeout from the devices |


### Master gateway

If you want the device gateway to connect to a master gateway, you have to configure the below options accordingly. You also have to specify the related certificates in the [cert](#certificates) section. 

```json
{
  "master_gateway": {
    "use": false,
    "ip": "192.168.11.1",
    "port": 4010
  }
}
```
{: #master_gateway}

| Name | Description |
| -----| ----------- |
| use | True if the device gateway should connect to a master gateway |
| ip | The address of the master gateway |
| port | The port of the master gateway |

### Log

As default, the gateway writes only warning and error messages. You can set the debugging level and configure the log files.

```json
{
  "log": {
    "level": 3,
    "use_file": false,
    "filename": "logs/gateway.log",
    "max_size_MB": 100,
    "max_days": 30,
    "max_backups": 100
  }
}
```  

| Name | Description |
| -----| ----------- |
| level | The logging level between 0 and 5. 5 is the most verbose level and 0 means no logging at all. The default level is 3 |
| use_file | If true, write the logging messages into the specified log files |
| filename | If __use_file__ is true, write the logging messages into the files starting with this filename |
| max_size_MB | The maximum size of a log file in MB. If the size of the log file exceeds this limit, a new file will be created |
| max_days | The maximum number of days to retain old log files based on the timestamp encoded in their filename. If it is 0, retain all the log files |
| max_backups | The maximum number of old log files to retain. If it is 0, retain all the log files |


