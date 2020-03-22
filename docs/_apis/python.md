---
title: "Python API"
toc: false
---

## Dependencies

The Python SDK depends on the following library.

* [grpcio](https://pypi.org/project/grpcio/)

You can install it using __pip__ as in the [installation]({{'/python/install/' | relative_url}}).

## Generated Classes

There are two types of generated files. All the gRPC messages are converted into __XXX\_pb2.py__, while the functions of services are into __XXX\_pb2\_grpc.py__. These files will be in _biostar/service_. For their usage, refer to the [tutorials]({{'/python/' | relative_url}}#tutorials).

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://grpc.io/docs/reference/python/generated-code/)
* [gRPC Tutorial](https://grpc.io/docs/tutorials/basic/python/)
* [Protobuf Tutorial](https://developers.google.com/protocol-buffers/docs/pythontutorial)