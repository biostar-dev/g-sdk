---
title: "Node.js API"
toc: false
---

## Dependencies

The Node.js SDK depends on the following library.

* [grpc](https://www.npmjs.com/package/grpc)

You can install it using __npm__ as in the [installation]({{'/node/install/' | relative_url}}).

## Generated Classes

There are two types of generated files. All the gRPC messages are converted into __XXX\_pb.js__, while the functions of services are into __XX\_grpc\_pb.js__. There files will be in _biostar/service_. For their usage, refer to the [tutorials]({{'/node/' | relative_url}}#tutorials).

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://grpc.github.io/grpc/node/)
* [gRPC Tutorial](https://grpc.io/docs/tutorials/basic/node/)