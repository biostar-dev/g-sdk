// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var network_pb = require('./network_pb.js');
var err_pb = require('./err_pb.js');
var connect_pb = require('./connect_pb.js');

function serialize_network_GetIPConfigRequest(arg) {
  if (!(arg instanceof network_pb.GetIPConfigRequest)) {
    throw new Error('Expected argument of type network.GetIPConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_GetIPConfigRequest(buffer_arg) {
  return network_pb.GetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_GetIPConfigResponse(arg) {
  if (!(arg instanceof network_pb.GetIPConfigResponse)) {
    throw new Error('Expected argument of type network.GetIPConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_GetIPConfigResponse(buffer_arg) {
  return network_pb.GetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_GetWLANConfigRequest(arg) {
  if (!(arg instanceof network_pb.GetWLANConfigRequest)) {
    throw new Error('Expected argument of type network.GetWLANConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_GetWLANConfigRequest(buffer_arg) {
  return network_pb.GetWLANConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_GetWLANConfigResponse(arg) {
  if (!(arg instanceof network_pb.GetWLANConfigResponse)) {
    throw new Error('Expected argument of type network.GetWLANConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_GetWLANConfigResponse(buffer_arg) {
  return network_pb.GetWLANConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetIPConfigMultiRequest(arg) {
  if (!(arg instanceof network_pb.SetIPConfigMultiRequest)) {
    throw new Error('Expected argument of type network.SetIPConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetIPConfigMultiRequest(buffer_arg) {
  return network_pb.SetIPConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetIPConfigMultiResponse(arg) {
  if (!(arg instanceof network_pb.SetIPConfigMultiResponse)) {
    throw new Error('Expected argument of type network.SetIPConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetIPConfigMultiResponse(buffer_arg) {
  return network_pb.SetIPConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetIPConfigRequest(arg) {
  if (!(arg instanceof network_pb.SetIPConfigRequest)) {
    throw new Error('Expected argument of type network.SetIPConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetIPConfigRequest(buffer_arg) {
  return network_pb.SetIPConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetIPConfigResponse(arg) {
  if (!(arg instanceof network_pb.SetIPConfigResponse)) {
    throw new Error('Expected argument of type network.SetIPConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetIPConfigResponse(buffer_arg) {
  return network_pb.SetIPConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetWLANConfigMultiRequest(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigMultiRequest)) {
    throw new Error('Expected argument of type network.SetWLANConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetWLANConfigMultiRequest(buffer_arg) {
  return network_pb.SetWLANConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetWLANConfigMultiResponse(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigMultiResponse)) {
    throw new Error('Expected argument of type network.SetWLANConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetWLANConfigMultiResponse(buffer_arg) {
  return network_pb.SetWLANConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetWLANConfigRequest(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigRequest)) {
    throw new Error('Expected argument of type network.SetWLANConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetWLANConfigRequest(buffer_arg) {
  return network_pb.SetWLANConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_network_SetWLANConfigResponse(arg) {
  if (!(arg instanceof network_pb.SetWLANConfigResponse)) {
    throw new Error('Expected argument of type network.SetWLANConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_network_SetWLANConfigResponse(buffer_arg) {
  return network_pb.SetWLANConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var NetworkService = exports.NetworkService = {
  getIPConfig: {
    path: '/network.Network/GetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.GetIPConfigRequest,
    responseType: network_pb.GetIPConfigResponse,
    requestSerialize: serialize_network_GetIPConfigRequest,
    requestDeserialize: deserialize_network_GetIPConfigRequest,
    responseSerialize: serialize_network_GetIPConfigResponse,
    responseDeserialize: deserialize_network_GetIPConfigResponse,
  },
  setIPConfig: {
    path: '/network.Network/SetIPConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetIPConfigRequest,
    responseType: network_pb.SetIPConfigResponse,
    requestSerialize: serialize_network_SetIPConfigRequest,
    requestDeserialize: deserialize_network_SetIPConfigRequest,
    responseSerialize: serialize_network_SetIPConfigResponse,
    responseDeserialize: deserialize_network_SetIPConfigResponse,
  },
  setIPConfigMulti: {
    path: '/network.Network/SetIPConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetIPConfigMultiRequest,
    responseType: network_pb.SetIPConfigMultiResponse,
    requestSerialize: serialize_network_SetIPConfigMultiRequest,
    requestDeserialize: deserialize_network_SetIPConfigMultiRequest,
    responseSerialize: serialize_network_SetIPConfigMultiResponse,
    responseDeserialize: deserialize_network_SetIPConfigMultiResponse,
  },
  getWLANConfig: {
    path: '/network.Network/GetWLANConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.GetWLANConfigRequest,
    responseType: network_pb.GetWLANConfigResponse,
    requestSerialize: serialize_network_GetWLANConfigRequest,
    requestDeserialize: deserialize_network_GetWLANConfigRequest,
    responseSerialize: serialize_network_GetWLANConfigResponse,
    responseDeserialize: deserialize_network_GetWLANConfigResponse,
  },
  setWLANConfig: {
    path: '/network.Network/SetWLANConfig',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetWLANConfigRequest,
    responseType: network_pb.SetWLANConfigResponse,
    requestSerialize: serialize_network_SetWLANConfigRequest,
    requestDeserialize: deserialize_network_SetWLANConfigRequest,
    responseSerialize: serialize_network_SetWLANConfigResponse,
    responseDeserialize: deserialize_network_SetWLANConfigResponse,
  },
  setWLANConfigMulti: {
    path: '/network.Network/SetWLANConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: network_pb.SetWLANConfigMultiRequest,
    responseType: network_pb.SetWLANConfigMultiResponse,
    requestSerialize: serialize_network_SetWLANConfigMultiRequest,
    requestDeserialize: deserialize_network_SetWLANConfigMultiRequest,
    responseSerialize: serialize_network_SetWLANConfigMultiResponse,
    responseDeserialize: deserialize_network_SetWLANConfigMultiResponse,
  },
};

exports.NetworkClient = grpc.makeGenericClientConstructor(NetworkService);
