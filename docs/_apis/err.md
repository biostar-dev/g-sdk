---
title: "Error API"
---

See [XXX_Multi commands]({{'/api/' | relative_url}}#xxx_multi-command).

```protobuf
message MultiErrorResponse {
  repeated ErrorResponse deviceErrors;
}
```
{: #MultiErrorResponse}

[deviceErrors](#ErrorResponse) 
: The errors on some of the target devices.

```protobuf
message ErrorResponse {
  uint32 deviceID;
  int32 code;
  string msg;
}
```
{: #ErrorResponse }

deviceID
: The ID of the device where an error occurs.

code
: A gRPC error code as [defined](https://github.com/grpc/grpc/blob/master/doc/statuscodes.md).

msg
: More detailed description of the error. 

