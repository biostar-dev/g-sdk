---
title: "Java API"
toc: false
---

## Dependencies

The Java SDK depends on the following libraries.

* [io.grpc](https://mvnrepository.com/artifact/io.grpc)
* [com.google.protobuf](https://mvnrepository.com/artifact/com.google.protobuf/protobuf-java)

Since these libraries are handled by Gradle, you don't have to install them manually. Refer to _build.gradle_ for details.

## Language mapping

As for mapping messages into Java classes, see the [reference](https://developers.google.com/protocol-buffers/docs/reference/java-generated#message).

The generated classes of G-SDK will be in _build/generated/source/proto/main/java/com/supremainc/sdk_ and _build/generated/source/proto/main/grpc/com/supremainc/sdk_. For the usage of these classes, refer to the [tutorials]({{'/java/' | relative_url}}#tutorials).

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://grpc.github.io/grpc-java/javadoc/index.html)
* [gRPC Tutorial](https://grpc.io/docs/tutorials/basic/java/)
* [Protobuf Tutorial](https://developers.google.com/protocol-buffers/docs/javatutorial)






