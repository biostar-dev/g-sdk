// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var tna_pb = require('./tna_pb.js');
var err_pb = require('./err_pb.js');

function serialize_tna_GetConfigRequest(arg) {
  if (!(arg instanceof tna_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type tna.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_GetConfigRequest(buffer_arg) {
  return tna_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_GetConfigResponse(arg) {
  if (!(arg instanceof tna_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type tna.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_GetConfigResponse(buffer_arg) {
  return tna_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_GetJobCodeLogRequest(arg) {
  if (!(arg instanceof tna_pb.GetJobCodeLogRequest)) {
    throw new Error('Expected argument of type tna.GetJobCodeLogRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_GetJobCodeLogRequest(buffer_arg) {
  return tna_pb.GetJobCodeLogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_GetJobCodeLogResponse(arg) {
  if (!(arg instanceof tna_pb.GetJobCodeLogResponse)) {
    throw new Error('Expected argument of type tna.GetJobCodeLogResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_GetJobCodeLogResponse(buffer_arg) {
  return tna_pb.GetJobCodeLogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_GetTNALogRequest(arg) {
  if (!(arg instanceof tna_pb.GetTNALogRequest)) {
    throw new Error('Expected argument of type tna.GetTNALogRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_GetTNALogRequest(buffer_arg) {
  return tna_pb.GetTNALogRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_GetTNALogResponse(arg) {
  if (!(arg instanceof tna_pb.GetTNALogResponse)) {
    throw new Error('Expected argument of type tna.GetTNALogResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_GetTNALogResponse(buffer_arg) {
  return tna_pb.GetTNALogResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_SetConfigMultiRequest(arg) {
  if (!(arg instanceof tna_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type tna.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_SetConfigMultiRequest(buffer_arg) {
  return tna_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_SetConfigMultiResponse(arg) {
  if (!(arg instanceof tna_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type tna.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_SetConfigMultiResponse(buffer_arg) {
  return tna_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_SetConfigRequest(arg) {
  if (!(arg instanceof tna_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type tna.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_SetConfigRequest(buffer_arg) {
  return tna_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_tna_SetConfigResponse(arg) {
  if (!(arg instanceof tna_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type tna.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_tna_SetConfigResponse(buffer_arg) {
  return tna_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TNAService = exports.TNAService = {
  getConfig: {
    path: '/tna.TNA/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.GetConfigRequest,
    responseType: tna_pb.GetConfigResponse,
    requestSerialize: serialize_tna_GetConfigRequest,
    requestDeserialize: deserialize_tna_GetConfigRequest,
    responseSerialize: serialize_tna_GetConfigResponse,
    responseDeserialize: deserialize_tna_GetConfigResponse,
  },
  setConfig: {
    path: '/tna.TNA/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.SetConfigRequest,
    responseType: tna_pb.SetConfigResponse,
    requestSerialize: serialize_tna_SetConfigRequest,
    requestDeserialize: deserialize_tna_SetConfigRequest,
    responseSerialize: serialize_tna_SetConfigResponse,
    responseDeserialize: deserialize_tna_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/tna.TNA/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.SetConfigMultiRequest,
    responseType: tna_pb.SetConfigMultiResponse,
    requestSerialize: serialize_tna_SetConfigMultiRequest,
    requestDeserialize: deserialize_tna_SetConfigMultiRequest,
    responseSerialize: serialize_tna_SetConfigMultiResponse,
    responseDeserialize: deserialize_tna_SetConfigMultiResponse,
  },
  getTNALog: {
    path: '/tna.TNA/GetTNALog',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.GetTNALogRequest,
    responseType: tna_pb.GetTNALogResponse,
    requestSerialize: serialize_tna_GetTNALogRequest,
    requestDeserialize: deserialize_tna_GetTNALogRequest,
    responseSerialize: serialize_tna_GetTNALogResponse,
    responseDeserialize: deserialize_tna_GetTNALogResponse,
  },
  getJobCodeLog: {
    path: '/tna.TNA/GetJobCodeLog',
    requestStream: false,
    responseStream: false,
    requestType: tna_pb.GetJobCodeLogRequest,
    responseType: tna_pb.GetJobCodeLogResponse,
    requestSerialize: serialize_tna_GetJobCodeLogRequest,
    requestDeserialize: deserialize_tna_GetJobCodeLogRequest,
    responseSerialize: serialize_tna_GetJobCodeLogResponse,
    responseDeserialize: deserialize_tna_GetJobCodeLogResponse,
  },
};

exports.TNAClient = grpc.makeGenericClientConstructor(TNAService);
