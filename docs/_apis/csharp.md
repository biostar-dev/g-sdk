---
title: "C# API"
toc: false
---

## Dependencies

The C# SDK depends on the following packages.

* [Google.Protobuf](https://www.nuget.org/packages/Google.Protobuf)
* [Grpc](https://www.nuget.org/packages/Grpc)

Since these packages are handled by NuGet, you don't have to install them manually. Refer to XXX.csproj in the examples.

## Language mapping

As for mapping messages into C# classes, see the [reference](https://developers.google.com/protocol-buffers/docs/reference/csharp-generated#message).

The generated classes of G-SDK will be in _obj/Debug/netcoreapp2.2_ for each project. For the usage of these classes, refer to the [tutorials]({{'/csharp/' | relative_url}}#tutorials).

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://grpc.github.io/grpc/csharp-dotnet/api/Grpc.Core.html)
* [gRPC Tutorial](https://grpc.io/docs/tutorials/basic/csharp/)
* [Protobuf Tutorial](https://developers.google.com/protocol-buffers/docs/csharptutorial)



