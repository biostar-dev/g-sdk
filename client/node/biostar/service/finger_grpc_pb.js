// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var finger_pb = require('./finger_pb.js');
var err_pb = require('./err_pb.js');

function serialize_finger_GetConfigRequest(arg) {
  if (!(arg instanceof finger_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type finger.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_GetConfigRequest(buffer_arg) {
  return finger_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_GetConfigResponse(arg) {
  if (!(arg instanceof finger_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type finger.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_GetConfigResponse(buffer_arg) {
  return finger_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_GetImageRequest(arg) {
  if (!(arg instanceof finger_pb.GetImageRequest)) {
    throw new Error('Expected argument of type finger.GetImageRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_GetImageRequest(buffer_arg) {
  return finger_pb.GetImageRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_GetImageResponse(arg) {
  if (!(arg instanceof finger_pb.GetImageResponse)) {
    throw new Error('Expected argument of type finger.GetImageResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_GetImageResponse(buffer_arg) {
  return finger_pb.GetImageResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_ScanRequest(arg) {
  if (!(arg instanceof finger_pb.ScanRequest)) {
    throw new Error('Expected argument of type finger.ScanRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_ScanRequest(buffer_arg) {
  return finger_pb.ScanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_ScanResponse(arg) {
  if (!(arg instanceof finger_pb.ScanResponse)) {
    throw new Error('Expected argument of type finger.ScanResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_ScanResponse(buffer_arg) {
  return finger_pb.ScanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_SetConfigMultiRequest(arg) {
  if (!(arg instanceof finger_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type finger.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_SetConfigMultiRequest(buffer_arg) {
  return finger_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_SetConfigMultiResponse(arg) {
  if (!(arg instanceof finger_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type finger.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_SetConfigMultiResponse(buffer_arg) {
  return finger_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_SetConfigRequest(arg) {
  if (!(arg instanceof finger_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type finger.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_SetConfigRequest(buffer_arg) {
  return finger_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_SetConfigResponse(arg) {
  if (!(arg instanceof finger_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type finger.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_SetConfigResponse(buffer_arg) {
  return finger_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_VerifyRequest(arg) {
  if (!(arg instanceof finger_pb.VerifyRequest)) {
    throw new Error('Expected argument of type finger.VerifyRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_VerifyRequest(buffer_arg) {
  return finger_pb.VerifyRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_finger_VerifyResponse(arg) {
  if (!(arg instanceof finger_pb.VerifyResponse)) {
    throw new Error('Expected argument of type finger.VerifyResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_finger_VerifyResponse(buffer_arg) {
  return finger_pb.VerifyResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FingerService = exports.FingerService = {
  scan: {
    path: '/finger.Finger/Scan',
    requestStream: false,
    responseStream: false,
    requestType: finger_pb.ScanRequest,
    responseType: finger_pb.ScanResponse,
    requestSerialize: serialize_finger_ScanRequest,
    requestDeserialize: deserialize_finger_ScanRequest,
    responseSerialize: serialize_finger_ScanResponse,
    responseDeserialize: deserialize_finger_ScanResponse,
  },
  getImage: {
    path: '/finger.Finger/GetImage',
    requestStream: false,
    responseStream: false,
    requestType: finger_pb.GetImageRequest,
    responseType: finger_pb.GetImageResponse,
    requestSerialize: serialize_finger_GetImageRequest,
    requestDeserialize: deserialize_finger_GetImageRequest,
    responseSerialize: serialize_finger_GetImageResponse,
    responseDeserialize: deserialize_finger_GetImageResponse,
  },
  verify: {
    path: '/finger.Finger/Verify',
    requestStream: false,
    responseStream: false,
    requestType: finger_pb.VerifyRequest,
    responseType: finger_pb.VerifyResponse,
    requestSerialize: serialize_finger_VerifyRequest,
    requestDeserialize: deserialize_finger_VerifyRequest,
    responseSerialize: serialize_finger_VerifyResponse,
    responseDeserialize: deserialize_finger_VerifyResponse,
  },
  getConfig: {
    path: '/finger.Finger/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: finger_pb.GetConfigRequest,
    responseType: finger_pb.GetConfigResponse,
    requestSerialize: serialize_finger_GetConfigRequest,
    requestDeserialize: deserialize_finger_GetConfigRequest,
    responseSerialize: serialize_finger_GetConfigResponse,
    responseDeserialize: deserialize_finger_GetConfigResponse,
  },
  setConfig: {
    path: '/finger.Finger/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: finger_pb.SetConfigRequest,
    responseType: finger_pb.SetConfigResponse,
    requestSerialize: serialize_finger_SetConfigRequest,
    requestDeserialize: deserialize_finger_SetConfigRequest,
    responseSerialize: serialize_finger_SetConfigResponse,
    responseDeserialize: deserialize_finger_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/finger.Finger/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: finger_pb.SetConfigMultiRequest,
    responseType: finger_pb.SetConfigMultiResponse,
    requestSerialize: serialize_finger_SetConfigMultiRequest,
    requestDeserialize: deserialize_finger_SetConfigMultiRequest,
    responseSerialize: serialize_finger_SetConfigMultiResponse,
    responseDeserialize: deserialize_finger_SetConfigMultiResponse,
  },
};

exports.FingerClient = grpc.makeGenericClientConstructor(FingerService);
