---
permalink: /csharp/
title: "C# Client"
---

## [Installation]({{'/csharp/install/' | relative_url}})

To write your applications in C#, you have to install the client library first. 

## API reference

### [G-SDK API]({{'/api/' | relative_url}})

The common APIs defined using gRPC.

### [C# API]({{'/api/csharp/' | relative_url}})

The language specific APIs to use the gRPC APIs.

## Tutorials

In addition to the API reference, you can also refer to the following tutorials.

In some environments, you might fail to connect to the gateway while running the examples. To narrow down the connection issues, enable the gRPC debugging as below.
{: .notice--info}
  ```csharp
  Environment.SetEnvironmentVariable("GRPC_TRACE", "api");
  Environment.SetEnvironmentVariable("GRPC_VERBOSITY", "debug");
  Grpc.Core.GrpcEnvironment.SetLogger(new Grpc.Core.Logging.ConsoleLogger());
  ```

### [Quick Start Guide for Device Gateway]({{'/csharp/quick/' | relative_url}})

The guide will show you how to use the basic APIs for the device gateway in C#.

### [Connect API]({{'/csharp/connect/' | relative_url}})

To manage BioStar devices, you have to connect them to the gateway first. The tutorial will show you how to connect to the devices and configure the related options. 

### [Quick Start Guide for Master Gateway]({{'/csharp/quickMaster/' | relative_url}})

The guide will show you how to use the basic APIs for the master gateway in C#. 

### [Connect Master API]({{'/csharp/connectMaster/' | relative_url}})

With the master gateway, you have to connect to devices via device gateways. The tutorial will show you how to connect to the devices and configure the related options. 

### [User API]({{'/csharp/user/' | relative_url}})

The tutorial shows how to enroll users and add credentials to them. It also illustrates how to get the event logs with filters. 

### [Event API]({{'/csharp/event/' | relative_url}})

The tutorial shows how to get event logs from the devices. 

### [T&A API]({{'/csharp/tna/' | relative_url}})

The tutorial shows how to configure and get the T&A events. 

### [Door API]({{'/csharp/door/' | relative_url}})

Door is the basic unit of access control. The tutorial shows how to configure doors and access groups.

### [Schedule API]({{'/csharp/schedule/' | relative_url}})

Schedule is used for configuring access groups, actions, zones, etc. The tutorial shows how to configure weekly and daily schedules.

### [Trigger & Action API]({{'/csharp/action/' | relative_url}})

The tutorial shows how to configure triggers and actions.

### [Thermal API]({{'/csharp/thermal/' | relative_url}})

The tutorial shows how to configure the options related to the thermal camera.

### [Wiegand API]({{'/csharp/wiegand/' | relative_url}})

You have to configure Wiegand formats to interface with 3rd party readers or controllers. The tutorial shows how to configure two widely used formats.

### [Anti Passback API]({{'/csharp/apb/' | relative_url}})

The tutorial shows how to configure an anti passback zone consisting of devices connected by RS485.

### [Server API]({{'/csharp/server/' | relative_url}})

The tutorial shows how to implement server matching.

### [Status API]({{'/csharp/status/' | relative_url}})

With headless devices such as BioEntry W2, you can configure the LED and buzzer signals for specified status.

### [User Synchronization]({{'csharp/sync/' | relative_url}})
This example shows how to synchronize user information between devices. You can also learn how to use realtime monitoring and [XXX_Multi commands]({{'api/' | relative_url}}#xxx_multi-command).