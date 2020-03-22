// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var time_pb = require('./time_pb.js');
var err_pb = require('./err_pb.js');

function serialize_time_GetConfigRequest(arg) {
  if (!(arg instanceof time_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type time.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_GetConfigRequest(buffer_arg) {
  return time_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_GetConfigResponse(arg) {
  if (!(arg instanceof time_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type time.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_GetConfigResponse(buffer_arg) {
  return time_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_GetDSTConfigRequest(arg) {
  if (!(arg instanceof time_pb.GetDSTConfigRequest)) {
    throw new Error('Expected argument of type time.GetDSTConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_GetDSTConfigRequest(buffer_arg) {
  return time_pb.GetDSTConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_GetDSTConfigResponse(arg) {
  if (!(arg instanceof time_pb.GetDSTConfigResponse)) {
    throw new Error('Expected argument of type time.GetDSTConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_GetDSTConfigResponse(buffer_arg) {
  return time_pb.GetDSTConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_GetRequest(arg) {
  if (!(arg instanceof time_pb.GetRequest)) {
    throw new Error('Expected argument of type time.GetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_GetRequest(buffer_arg) {
  return time_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_GetResponse(arg) {
  if (!(arg instanceof time_pb.GetResponse)) {
    throw new Error('Expected argument of type time.GetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_GetResponse(buffer_arg) {
  return time_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetConfigMultiRequest(arg) {
  if (!(arg instanceof time_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type time.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetConfigMultiRequest(buffer_arg) {
  return time_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetConfigMultiResponse(arg) {
  if (!(arg instanceof time_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type time.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetConfigMultiResponse(buffer_arg) {
  return time_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetConfigRequest(arg) {
  if (!(arg instanceof time_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type time.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetConfigRequest(buffer_arg) {
  return time_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetConfigResponse(arg) {
  if (!(arg instanceof time_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type time.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetConfigResponse(buffer_arg) {
  return time_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetDSTConfigMultiRequest(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigMultiRequest)) {
    throw new Error('Expected argument of type time.SetDSTConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetDSTConfigMultiRequest(buffer_arg) {
  return time_pb.SetDSTConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetDSTConfigMultiResponse(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigMultiResponse)) {
    throw new Error('Expected argument of type time.SetDSTConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetDSTConfigMultiResponse(buffer_arg) {
  return time_pb.SetDSTConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetDSTConfigRequest(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigRequest)) {
    throw new Error('Expected argument of type time.SetDSTConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetDSTConfigRequest(buffer_arg) {
  return time_pb.SetDSTConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetDSTConfigResponse(arg) {
  if (!(arg instanceof time_pb.SetDSTConfigResponse)) {
    throw new Error('Expected argument of type time.SetDSTConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetDSTConfigResponse(buffer_arg) {
  return time_pb.SetDSTConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetMultiRequest(arg) {
  if (!(arg instanceof time_pb.SetMultiRequest)) {
    throw new Error('Expected argument of type time.SetMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetMultiRequest(buffer_arg) {
  return time_pb.SetMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetMultiResponse(arg) {
  if (!(arg instanceof time_pb.SetMultiResponse)) {
    throw new Error('Expected argument of type time.SetMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetMultiResponse(buffer_arg) {
  return time_pb.SetMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetRequest(arg) {
  if (!(arg instanceof time_pb.SetRequest)) {
    throw new Error('Expected argument of type time.SetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetRequest(buffer_arg) {
  return time_pb.SetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_time_SetResponse(arg) {
  if (!(arg instanceof time_pb.SetResponse)) {
    throw new Error('Expected argument of type time.SetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_time_SetResponse(buffer_arg) {
  return time_pb.SetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TimeService = exports.TimeService = {
  get: {
    path: '/time.Time/Get',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.GetRequest,
    responseType: time_pb.GetResponse,
    requestSerialize: serialize_time_GetRequest,
    requestDeserialize: deserialize_time_GetRequest,
    responseSerialize: serialize_time_GetResponse,
    responseDeserialize: deserialize_time_GetResponse,
  },
  set: {
    path: '/time.Time/Set',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetRequest,
    responseType: time_pb.SetResponse,
    requestSerialize: serialize_time_SetRequest,
    requestDeserialize: deserialize_time_SetRequest,
    responseSerialize: serialize_time_SetResponse,
    responseDeserialize: deserialize_time_SetResponse,
  },
  setMulti: {
    path: '/time.Time/SetMulti',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetMultiRequest,
    responseType: time_pb.SetMultiResponse,
    requestSerialize: serialize_time_SetMultiRequest,
    requestDeserialize: deserialize_time_SetMultiRequest,
    responseSerialize: serialize_time_SetMultiResponse,
    responseDeserialize: deserialize_time_SetMultiResponse,
  },
  getConfig: {
    path: '/time.Time/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.GetConfigRequest,
    responseType: time_pb.GetConfigResponse,
    requestSerialize: serialize_time_GetConfigRequest,
    requestDeserialize: deserialize_time_GetConfigRequest,
    responseSerialize: serialize_time_GetConfigResponse,
    responseDeserialize: deserialize_time_GetConfigResponse,
  },
  setConfig: {
    path: '/time.Time/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetConfigRequest,
    responseType: time_pb.SetConfigResponse,
    requestSerialize: serialize_time_SetConfigRequest,
    requestDeserialize: deserialize_time_SetConfigRequest,
    responseSerialize: serialize_time_SetConfigResponse,
    responseDeserialize: deserialize_time_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/time.Time/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetConfigMultiRequest,
    responseType: time_pb.SetConfigMultiResponse,
    requestSerialize: serialize_time_SetConfigMultiRequest,
    requestDeserialize: deserialize_time_SetConfigMultiRequest,
    responseSerialize: serialize_time_SetConfigMultiResponse,
    responseDeserialize: deserialize_time_SetConfigMultiResponse,
  },
  getDSTConfig: {
    path: '/time.Time/GetDSTConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.GetDSTConfigRequest,
    responseType: time_pb.GetDSTConfigResponse,
    requestSerialize: serialize_time_GetDSTConfigRequest,
    requestDeserialize: deserialize_time_GetDSTConfigRequest,
    responseSerialize: serialize_time_GetDSTConfigResponse,
    responseDeserialize: deserialize_time_GetDSTConfigResponse,
  },
  setDSTConfig: {
    path: '/time.Time/SetDSTConfig',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetDSTConfigRequest,
    responseType: time_pb.SetDSTConfigResponse,
    requestSerialize: serialize_time_SetDSTConfigRequest,
    requestDeserialize: deserialize_time_SetDSTConfigRequest,
    responseSerialize: serialize_time_SetDSTConfigResponse,
    responseDeserialize: deserialize_time_SetDSTConfigResponse,
  },
  setDSTConfigMulti: {
    path: '/time.Time/SetDSTConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: time_pb.SetDSTConfigMultiRequest,
    responseType: time_pb.SetDSTConfigMultiResponse,
    requestSerialize: serialize_time_SetDSTConfigMultiRequest,
    requestDeserialize: deserialize_time_SetDSTConfigMultiRequest,
    responseSerialize: serialize_time_SetDSTConfigMultiResponse,
    responseDeserialize: deserialize_time_SetDSTConfigMultiResponse,
  },
};

exports.TimeClient = grpc.makeGenericClientConstructor(TimeService);
