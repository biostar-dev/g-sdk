// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var action_pb = require('./action_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_action_GetConfigRequest(arg) {
  if (!(arg instanceof action_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type action.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_action_GetConfigRequest(buffer_arg) {
  return action_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_action_GetConfigResponse(arg) {
  if (!(arg instanceof action_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type action.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_action_GetConfigResponse(buffer_arg) {
  return action_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_action_SetConfigMultiRequest(arg) {
  if (!(arg instanceof action_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type action.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_action_SetConfigMultiRequest(buffer_arg) {
  return action_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_action_SetConfigMultiResponse(arg) {
  if (!(arg instanceof action_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type action.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_action_SetConfigMultiResponse(buffer_arg) {
  return action_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_action_SetConfigRequest(arg) {
  if (!(arg instanceof action_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type action.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_action_SetConfigRequest(buffer_arg) {
  return action_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_action_SetConfigResponse(arg) {
  if (!(arg instanceof action_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type action.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_action_SetConfigResponse(buffer_arg) {
  return action_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var TriggerActionService = exports.TriggerActionService = {
  getConfig: {
    path: '/action.TriggerAction/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.GetConfigRequest,
    responseType: action_pb.GetConfigResponse,
    requestSerialize: serialize_action_GetConfigRequest,
    requestDeserialize: deserialize_action_GetConfigRequest,
    responseSerialize: serialize_action_GetConfigResponse,
    responseDeserialize: deserialize_action_GetConfigResponse,
  },
  setConfig: {
    path: '/action.TriggerAction/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.SetConfigRequest,
    responseType: action_pb.SetConfigResponse,
    requestSerialize: serialize_action_SetConfigRequest,
    requestDeserialize: deserialize_action_SetConfigRequest,
    responseSerialize: serialize_action_SetConfigResponse,
    responseDeserialize: deserialize_action_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/action.TriggerAction/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: action_pb.SetConfigMultiRequest,
    responseType: action_pb.SetConfigMultiResponse,
    requestSerialize: serialize_action_SetConfigMultiRequest,
    requestDeserialize: deserialize_action_SetConfigMultiRequest,
    responseSerialize: serialize_action_SetConfigMultiResponse,
    responseDeserialize: deserialize_action_SetConfigMultiResponse,
  },
};

exports.TriggerActionClient = grpc.makeGenericClientConstructor(TriggerActionService);
