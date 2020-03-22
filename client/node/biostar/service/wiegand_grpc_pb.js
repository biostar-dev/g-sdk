// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var wiegand_pb = require('./wiegand_pb.js');
var err_pb = require('./err_pb.js');

function serialize_wiegand_GetConfigRequest(arg) {
  if (!(arg instanceof wiegand_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type wiegand.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_wiegand_GetConfigRequest(buffer_arg) {
  return wiegand_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wiegand_GetConfigResponse(arg) {
  if (!(arg instanceof wiegand_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type wiegand.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_wiegand_GetConfigResponse(buffer_arg) {
  return wiegand_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wiegand_SetConfigMultiRequest(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type wiegand.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_wiegand_SetConfigMultiRequest(buffer_arg) {
  return wiegand_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wiegand_SetConfigMultiResponse(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type wiegand.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_wiegand_SetConfigMultiResponse(buffer_arg) {
  return wiegand_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wiegand_SetConfigRequest(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type wiegand.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_wiegand_SetConfigRequest(buffer_arg) {
  return wiegand_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_wiegand_SetConfigResponse(arg) {
  if (!(arg instanceof wiegand_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type wiegand.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_wiegand_SetConfigResponse(buffer_arg) {
  return wiegand_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var WiegandService = exports.WiegandService = {
  getConfig: {
    path: '/wiegand.Wiegand/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.GetConfigRequest,
    responseType: wiegand_pb.GetConfigResponse,
    requestSerialize: serialize_wiegand_GetConfigRequest,
    requestDeserialize: deserialize_wiegand_GetConfigRequest,
    responseSerialize: serialize_wiegand_GetConfigResponse,
    responseDeserialize: deserialize_wiegand_GetConfigResponse,
  },
  setConfig: {
    path: '/wiegand.Wiegand/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.SetConfigRequest,
    responseType: wiegand_pb.SetConfigResponse,
    requestSerialize: serialize_wiegand_SetConfigRequest,
    requestDeserialize: deserialize_wiegand_SetConfigRequest,
    responseSerialize: serialize_wiegand_SetConfigResponse,
    responseDeserialize: deserialize_wiegand_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/wiegand.Wiegand/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: wiegand_pb.SetConfigMultiRequest,
    responseType: wiegand_pb.SetConfigMultiResponse,
    requestSerialize: serialize_wiegand_SetConfigMultiRequest,
    requestDeserialize: deserialize_wiegand_SetConfigMultiRequest,
    responseSerialize: serialize_wiegand_SetConfigMultiResponse,
    responseDeserialize: deserialize_wiegand_SetConfigMultiResponse,
  },
};

exports.WiegandClient = grpc.makeGenericClientConstructor(WiegandService);
