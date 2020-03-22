// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var system_pb = require('./system_pb.js');
var err_pb = require('./err_pb.js');

function serialize_system_GetConfigRequest(arg) {
  if (!(arg instanceof system_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type system.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_system_GetConfigRequest(buffer_arg) {
  return system_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_system_GetConfigResponse(arg) {
  if (!(arg instanceof system_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type system.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_system_GetConfigResponse(buffer_arg) {
  return system_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_system_SetConfigMultiRequest(arg) {
  if (!(arg instanceof system_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type system.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_system_SetConfigMultiRequest(buffer_arg) {
  return system_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_system_SetConfigMultiResponse(arg) {
  if (!(arg instanceof system_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type system.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_system_SetConfigMultiResponse(buffer_arg) {
  return system_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_system_SetConfigRequest(arg) {
  if (!(arg instanceof system_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type system.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_system_SetConfigRequest(buffer_arg) {
  return system_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_system_SetConfigResponse(arg) {
  if (!(arg instanceof system_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type system.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_system_SetConfigResponse(buffer_arg) {
  return system_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var SystemService = exports.SystemService = {
  getConfig: {
    path: '/system.System/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: system_pb.GetConfigRequest,
    responseType: system_pb.GetConfigResponse,
    requestSerialize: serialize_system_GetConfigRequest,
    requestDeserialize: deserialize_system_GetConfigRequest,
    responseSerialize: serialize_system_GetConfigResponse,
    responseDeserialize: deserialize_system_GetConfigResponse,
  },
  setConfig: {
    path: '/system.System/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: system_pb.SetConfigRequest,
    responseType: system_pb.SetConfigResponse,
    requestSerialize: serialize_system_SetConfigRequest,
    requestDeserialize: deserialize_system_SetConfigRequest,
    responseSerialize: serialize_system_SetConfigResponse,
    responseDeserialize: deserialize_system_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/system.System/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: system_pb.SetConfigMultiRequest,
    responseType: system_pb.SetConfigMultiResponse,
    requestSerialize: serialize_system_SetConfigMultiRequest,
    requestDeserialize: deserialize_system_SetConfigMultiRequest,
    responseSerialize: serialize_system_SetConfigMultiResponse,
    responseDeserialize: deserialize_system_SetConfigMultiResponse,
  },
};

exports.SystemClient = grpc.makeGenericClientConstructor(SystemService);
