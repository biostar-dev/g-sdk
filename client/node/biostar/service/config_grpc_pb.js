// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var config_pb = require('./config_pb.js');
var err_pb = require('./err_pb.js');
var system_pb = require('./system_pb.js');

function serialize_config_GetSystemRequest(arg) {
  if (!(arg instanceof config_pb.GetSystemRequest)) {
    throw new Error('Expected argument of type config.GetSystemRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_config_GetSystemRequest(buffer_arg) {
  return config_pb.GetSystemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_GetSystemResponse(arg) {
  if (!(arg instanceof config_pb.GetSystemResponse)) {
    throw new Error('Expected argument of type config.GetSystemResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_config_GetSystemResponse(buffer_arg) {
  return config_pb.GetSystemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_SetSystemMultiRequest(arg) {
  if (!(arg instanceof config_pb.SetSystemMultiRequest)) {
    throw new Error('Expected argument of type config.SetSystemMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_config_SetSystemMultiRequest(buffer_arg) {
  return config_pb.SetSystemMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_SetSystemMultiResponse(arg) {
  if (!(arg instanceof config_pb.SetSystemMultiResponse)) {
    throw new Error('Expected argument of type config.SetSystemMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_config_SetSystemMultiResponse(buffer_arg) {
  return config_pb.SetSystemMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_SetSystemRequest(arg) {
  if (!(arg instanceof config_pb.SetSystemRequest)) {
    throw new Error('Expected argument of type config.SetSystemRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_config_SetSystemRequest(buffer_arg) {
  return config_pb.SetSystemRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_config_SetSystemResponse(arg) {
  if (!(arg instanceof config_pb.SetSystemResponse)) {
    throw new Error('Expected argument of type config.SetSystemResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_config_SetSystemResponse(buffer_arg) {
  return config_pb.SetSystemResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConfigService = exports.ConfigService = {
  getSystem: {
    path: '/config.Config/GetSystem',
    requestStream: false,
    responseStream: false,
    requestType: config_pb.GetSystemRequest,
    responseType: config_pb.GetSystemResponse,
    requestSerialize: serialize_config_GetSystemRequest,
    requestDeserialize: deserialize_config_GetSystemRequest,
    responseSerialize: serialize_config_GetSystemResponse,
    responseDeserialize: deserialize_config_GetSystemResponse,
  },
  setSystem: {
    path: '/config.Config/SetSystem',
    requestStream: false,
    responseStream: false,
    requestType: config_pb.SetSystemRequest,
    responseType: config_pb.SetSystemResponse,
    requestSerialize: serialize_config_SetSystemRequest,
    requestDeserialize: deserialize_config_SetSystemRequest,
    responseSerialize: serialize_config_SetSystemResponse,
    responseDeserialize: deserialize_config_SetSystemResponse,
  },
  setSystemMulti: {
    path: '/config.Config/SetSystemMulti',
    requestStream: false,
    responseStream: false,
    requestType: config_pb.SetSystemMultiRequest,
    responseType: config_pb.SetSystemMultiResponse,
    requestSerialize: serialize_config_SetSystemMultiRequest,
    requestDeserialize: deserialize_config_SetSystemMultiRequest,
    responseSerialize: serialize_config_SetSystemMultiResponse,
    responseDeserialize: deserialize_config_SetSystemMultiResponse,
  },
};

exports.ConfigClient = grpc.makeGenericClientConstructor(ConfigService);
