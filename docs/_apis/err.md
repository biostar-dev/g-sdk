---
title: "Error API"
toc_label: "Err"  
---

See [XXX_Multi commands]({{'/api/' | relative_url}}#xxx_multi-command).

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