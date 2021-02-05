---
title: "Go API"
toc: false
---

## Dependencies

The Go SDK depends on the following libraries.

* [gRPC](https://github.com/grpc/grpc-go)

You can install it as described in the [installation]({{'/go/install/' | relative_url}}).

## Language mapping

As for mapping messages into go structures, see the [reference](https://developers.google.com/protocol-buffers/docs/reference/go-generated#message).

The generated files, __XXX_pb.go__, will be in _src/biostar/service_. For their usage, refer to the [tutorials]({{'/go/' | relative_url}}#tutorials).

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://godoc.org/google.golang.org/grpc)
* [gRPC Tutorial](https://grpc.io/docs/tutorials/basic/go/)
* [Protobuf Tutorial](https://developers.google.com/protocol-buffers/docs/gotutorial)



