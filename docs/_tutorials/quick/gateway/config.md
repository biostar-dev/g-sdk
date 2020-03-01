---
permalink: /gateway/config/
title: "Configuration"
---

## Configuration file

As default, the configuration file resides in the same folder as the executable. You can specify another configuration file with the [-f](#command-line-options) option. 

### Certificates

```json
{
  "cert": {
    "dir": "cert",
    "ca_cert": "ca.crt",
    "ca_key": "ca_key.pem",
    "server_cert": "server.crt",
    "server_key": "server_key.pem",
    "self_signed": true
  }
}
```

| Name | Description |
| -----| ----------- |
| dir  | The folder in which the certificates reside. It can be either an absolute or a relative path |
| ca_cert | The root CA certificate in PEM format |
| ca_key | The private key of the root CA in PEM format | 
| server_cert | The servier certificate in PEM format |
| server_key | The private key of the server certificate in PEM format |

### Device Server

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
| ip  | The IP address of the device server. If it is "", it means the same as INADDR_ANY |
| port | The port of the device server. The default is 51212 |
| ssl_port | The SSL port of the device server. The default is 51213 |
| reconnect_interval | If you use [the asynchronous API]({{'/api/connect/' | relative_url}}#asynchronous-connection), the gateway will try to reconnect to a disconnected device after this interval in milliseconds. |


### RPC Server

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
| ip  | The IP address of the gRPC. If it is "", it means the same as INADDR_ANY |
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


### Master Gateway

The master gateway will be supported in V1.1 or later.

```json
{
  "master_gateway": {
    "use": false,
    "ip": "",
    "port": 4001
  }
}
```

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
| max_size_MB | The maximum size of a log file in MB. If the size of the log file exceeds this limit, a new file is created |
| max_days | The maximum number of days to retain old log files based on the timestamp encoded in their filename. If it is 0, retain all the log files |
| max_backups | The maximum number of old log files to retain. If it is 0, retain all the log files |


## Command line options

| Option | Description |
| ------ | ----------- |
| -f     | specify the configuration file (default: ./config.json) |
| -l     | specify the log level (1: error only, 5: most verbose, 3: default ) |
| -c     | create the self-signed certificates for SSL communication | 
| -v     | show the version of the gateway |
| -h     | show the command line options | 
