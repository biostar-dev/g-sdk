---
permalink: /master/config/
title: "Master Gateway: Configuration"
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
| server_cert | The server certificate in PEM format |
| server_key | The private key of the server certificate in PEM format |

### RPC Server

```json
{
  "rpc_server": {
    "ip": "localhost",
    "port": 4010,
    "max_recv_size": 75497472
  }
}
```

| Name | Description |
| -----| ----------- |
| ip  | The address of the gRPC server. If it is "", it means the same as INADDR_ANY |
| port | The port of the gRPC server. The default is 4010. Since all communication with gRPC clients use SSL, there is no separate SSL port |
| max_recv_size | The largest size of gRPC packet in bytes. If you are to use [the UpgradeFirmware API]({{'/api/device/' | relative_url}}#upgradefirmware), it should be larger than the size of the firmware file | 


### Database

The master gateway stores the tenant and gateway information on a database. 

```json
{
  "db": {
    "filename": "db/master.db",
  }
}
```

| Name | Description |
| -----| ----------- |
| filename | The name of the [Bolt](https://github.com/boltdb/bolt) database file. |


### Log

As default, the master gateway writes only warning and error messages. You can set the debugging level and configure the log files.

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


