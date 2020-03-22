// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var server_pb = require('./server_pb.js');
var google_protobuf_timestamp_pb = require('google-protobuf/google/protobuf/timestamp_pb.js');

function serialize_server_GetListRequest(arg) {
  if (!(arg instanceof server_pb.GetListRequest)) {
    throw new Error('Expected argument of type server.GetListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_server_GetListRequest(buffer_arg) {
  return server_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_GetListResponse(arg) {
  if (!(arg instanceof server_pb.GetListResponse)) {
    throw new Error('Expected argument of type server.GetListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_server_GetListResponse(buffer_arg) {
  return server_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_StatusChange(arg) {
  if (!(arg instanceof server_pb.StatusChange)) {
    throw new Error('Expected argument of type server.StatusChange');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_server_StatusChange(buffer_arg) {
  return server_pb.StatusChange.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_server_SubscribeStatusRequest(arg) {
  if (!(arg instanceof server_pb.SubscribeStatusRequest)) {
    throw new Error('Expected argument of type server.SubscribeStatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_server_SubscribeStatusRequest(buffer_arg) {
  return server_pb.SubscribeStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ServerService = exports.ServerService = {
  getList: {
    path: '/server.Server/GetList',
    requestStream: false,
    responseStream: false,
    requestType: server_pb.GetListRequest,
    responseType: server_pb.GetListResponse,
    requestSerialize: serialize_server_GetListRequest,
    requestDeserialize: deserialize_server_GetListRequest,
    responseSerialize: serialize_server_GetListResponse,
    responseDeserialize: deserialize_server_GetListResponse,
  },
  subscribeStatus: {
    path: '/server.Server/SubscribeStatus',
    requestStream: false,
    responseStream: true,
    requestType: server_pb.SubscribeStatusRequest,
    responseType: server_pb.StatusChange,
    requestSerialize: serialize_server_SubscribeStatusRequest,
    requestDeserialize: deserialize_server_SubscribeStatusRequest,
    responseSerialize: serialize_server_StatusChange,
    responseDeserialize: deserialize_server_StatusChange,
  },
};

exports.ServerClient = grpc.makeGenericClientConstructor(ServerService);
