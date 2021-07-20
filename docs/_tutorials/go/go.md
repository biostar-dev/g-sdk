---
permalink: /go/
title: "Go Client"
---

## [Installation]({{'/go/install/' | relative_url}})

To write your applications in Go, you have to install the client library first. 

## API reference

### [G-SDK API]({{'/api/' | relative_url}})

The common APIs defined using gRPC.

### [Go API]({{'/api/go/' | relative_url}})

The language specific APIs to use the gRPC APIs.

## Tutorials

In addition to the API reference, you can also refer to the following tutorials.

In some environments, you might fail to connect to the gateway while running the examples. To narrow down the connection issues, enable the gRPC debugging as below.
{: .notice--info}
  ```
  $ export GRPC_GO_LOG_VERBOSITY_LEVEL=99 && GRPC_GO_LOG_SEVERITY_LEVEL=info ./quick
  ```

### [Quick Start Guide for Device Gateway]({{'/go/quick/' | relative_url}})

The guide will show you how to use the basic APIs for the device gateway in Go. 

### [Connect API]({{'go/connect/' | relative_url}})

To manage BioStar devices, you have to connect them to the device gateway first. The tutorial shows how to connect to the devices and configure the related options. 

### [Quick Start Guide for Master Gateway]({{'/go/quickMaster/' | relative_url}})

The guide will show you how to use the basic APIs for the master gateway in Go. 

### [Connect Master API]({{'go/connectMaster/' | relative_url}})

With the master gateway, you have to connect to devices via device gateways. The tutorial shows how to connect to the devices and configure the related options. 

### [User API]({{'go/user/' | relative_url}})

The tutorial shows how to enroll users and add credentials to them. It also illustrates how to get the event logs with filters. 

### [Event API]({{'go/event/' | relative_url}})

The tutorial shows how to get event logs from the devices. 

### [T&A API]({{'go/tna/' | relative_url}})

The tutorial shows how to configure and get the T&A events. 

### [Door API]({{'go/door/' | relative_url}})

Door is the basic unit of access control. The tutorial shows how to configure doors and access groups.

### [Schedule API]({{'go/schedule/' | relative_url}})

Schedule is used for configuring access groups, actions, zones, etc. The tutorial shows how to configure weekly and daily schedules.

### [Trigger & Action API]({{'go/action/' | relative_url}})

The tutorial shows how to configure triggers and actions.

### [Thermal API]({{'go/thermal/' | relative_url}})

The tutorial shows how to configure the options related to the thermal camera.

### [Wiegand API]({{'go/wiegand/' | relative_url}})

You have to configure Wiegand formats to interface with 3rd party readers or controllers. The tutorial shows how to configure two widely used formats.

### [Anti Passback API]({{'go/apb/' | relative_url}})

The tutorial shows how to configure an anti passback zone consisting of devices connected by RS485.

### [Server API]({{'go/server/' | relative_url}})

The tutorial shows how to implement server matching.

### [Status API]({{'go/status/' | relative_url}})

With headless devices such as BioEntry W2, you can configure the LED and buzzer signals for specified status.

### [User Synchronization]({{'go/sync/' | relative_url}})
This example shows how to synchronize user information between devices. You can also learn how to use realtime monitoring and [XXX_Multi commands]({{'api/' | relative_url}}#xxx_multi-command).