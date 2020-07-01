---
permalink: /overview/
title: "G-SDK"
---

  G-SDK is a new way of communicating with BioStar devices. It is a lightweight, scalable, and cross-platform solution which will expedite your development. 
  Based on [gRPC](https://grpc.io/), it supports many programming languages such as Java, C#, Python, Node.js, Go, and C++.

## Why G-SDK?

G-SDK was developed with the following design goals.

* Scalable and extensible
  * Handle thousands of devices
  * Easy to maintain and customize

* Multi-language support
  * Language-neutral IDL
  * Native client libraries

* Well-defined API
  * Easy to understand and use
  
* Mobile/cloud ready
  * Easily deployable on Cloud
  * Accessible from mobile devices directly 

## Architecture

G-SDK consists of the device gateway and the client libraries. The device gateway handles the communication with the devices and you can connect to it using one of the client libraries. 

  ![Architecture]({{'/assets/images/architecture.png' | relative_url}})


## Device SDK vs. G-SDK
  ![Specification]({{'/assets/images/spec.PNG' | relative_url}})

## Master gateway

  ![Master Gateway Deployment]({{'/assets/images/master_deploy.png' | relative_url}})

The master gateway makes it easier to handle thousands of devices across multiple sites. It is supported in V1.1 or later.

  ![Master Gateway]({{'/assets/images/master.PNG' | relative_url}})  