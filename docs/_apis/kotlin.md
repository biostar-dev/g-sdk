---
title: "Kotlin API"
toc: false
---

## Dependencies

The Kotlin SDK depends on the following libraries.

* [io.grpc](https://mvnrepository.com/artifact/io.grpc)
* [grpc-kotlin](https://github.com/grpc/grpc-kotlin)
* [com.google.protobuf](https://mvnrepository.com/artifact/com.google.protobuf/protobuf-java)

Since these libraries are handled by Gradle, you don't have to install them manually. Refer to _build.gradle.kts_ in each project for details.

## Language mapping

As for mapping messages into Kotlin classes, see the [reference](https://developers.google.com/protocol-buffers/docs/reference/kotlin-generated#message).

The generated classes of G-SDK will be in the following directories.

### Desktop

* _stub/build/generated/source/proto/main/grpckt/com/supremainc/sdk_
* _stub/build/generated/source/proto/main/java/com/supremainc/sdk_

### Android

* _stub-android/build/generated/source/proto/debug/grpckt/com/supremainc/sdk_
* _stub-android/build/generated/source/proto/debug/java/com/supremainc/sdk_

## Resources

In addition to the G-SDK API and tutorials, you can also refer to the following documentation. 

* [gRPC Documentation](https://javadocs.dev/io.grpc/grpc-kotlin-stub/1.1.0/index.html)
* [gRPC Tutorial](https://grpc.io/docs/languages/kotlin/)
* [gRPC Android Tutorial](https://grpc.io/docs/platforms/android/kotlin/)
* [Protobuf Tutorial](https://developers.google.com/protocol-buffers/docs/kotlintutorial)



