---
title: "C++ API"
toc: false
---

## Dependencies

The C++ SDK depends on the following libraries.

* [protobuf](https://github.com/protocolbuffers/protobuf)
* [gRPC](https://github.com/grpc/grpc/tree/master/src/cpp)

Since these libraries are handled by CMake, you don't have to install them manually. Refer to _CMakeLists.txt_ in the examples.

## Language mapping

As for mapping messages into C++ classes, see the [reference](https://developers.google.com/protocol-buffers/docs/reference/cpp-generated#message).

The generated source files of G-SDK will be in _biostar/service_. For the usage of these classes, refer to the [tutorials]({{'/cpp/' | relative_url}}#tutorials).

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://grpc.github.io/grpc/cpp/index.html)
* [gRPC Tutorial](https://grpc.io/docs/languages/cpp/basics/)
* [Protobuf Tutorial](https://developers.google.com/protocol-buffers/docs/cpptutorial)



