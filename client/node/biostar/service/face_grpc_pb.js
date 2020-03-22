// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var face_pb = require('./face_pb.js');
var err_pb = require('./err_pb.js');

function serialize_face_AddAuthGroupMultiRequest(arg) {
  if (!(arg instanceof face_pb.AddAuthGroupMultiRequest)) {
    throw new Error('Expected argument of type face.AddAuthGroupMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_AddAuthGroupMultiRequest(buffer_arg) {
  return face_pb.AddAuthGroupMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_AddAuthGroupMultiResponse(arg) {
  if (!(arg instanceof face_pb.AddAuthGroupMultiResponse)) {
    throw new Error('Expected argument of type face.AddAuthGroupMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_AddAuthGroupMultiResponse(buffer_arg) {
  return face_pb.AddAuthGroupMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_AddAuthGroupRequest(arg) {
  if (!(arg instanceof face_pb.AddAuthGroupRequest)) {
    throw new Error('Expected argument of type face.AddAuthGroupRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_AddAuthGroupRequest(buffer_arg) {
  return face_pb.AddAuthGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_AddAuthGroupResponse(arg) {
  if (!(arg instanceof face_pb.AddAuthGroupResponse)) {
    throw new Error('Expected argument of type face.AddAuthGroupResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_AddAuthGroupResponse(buffer_arg) {
  return face_pb.AddAuthGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAllAuthGroupMultiRequest(arg) {
  if (!(arg instanceof face_pb.DeleteAllAuthGroupMultiRequest)) {
    throw new Error('Expected argument of type face.DeleteAllAuthGroupMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAllAuthGroupMultiRequest(buffer_arg) {
  return face_pb.DeleteAllAuthGroupMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAllAuthGroupMultiResponse(arg) {
  if (!(arg instanceof face_pb.DeleteAllAuthGroupMultiResponse)) {
    throw new Error('Expected argument of type face.DeleteAllAuthGroupMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAllAuthGroupMultiResponse(buffer_arg) {
  return face_pb.DeleteAllAuthGroupMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAllAuthGroupRequest(arg) {
  if (!(arg instanceof face_pb.DeleteAllAuthGroupRequest)) {
    throw new Error('Expected argument of type face.DeleteAllAuthGroupRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAllAuthGroupRequest(buffer_arg) {
  return face_pb.DeleteAllAuthGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAllAuthGroupResponse(arg) {
  if (!(arg instanceof face_pb.DeleteAllAuthGroupResponse)) {
    throw new Error('Expected argument of type face.DeleteAllAuthGroupResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAllAuthGroupResponse(buffer_arg) {
  return face_pb.DeleteAllAuthGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAuthGroupMultiRequest(arg) {
  if (!(arg instanceof face_pb.DeleteAuthGroupMultiRequest)) {
    throw new Error('Expected argument of type face.DeleteAuthGroupMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAuthGroupMultiRequest(buffer_arg) {
  return face_pb.DeleteAuthGroupMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAuthGroupMultiResponse(arg) {
  if (!(arg instanceof face_pb.DeleteAuthGroupMultiResponse)) {
    throw new Error('Expected argument of type face.DeleteAuthGroupMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAuthGroupMultiResponse(buffer_arg) {
  return face_pb.DeleteAuthGroupMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAuthGroupRequest(arg) {
  if (!(arg instanceof face_pb.DeleteAuthGroupRequest)) {
    throw new Error('Expected argument of type face.DeleteAuthGroupRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAuthGroupRequest(buffer_arg) {
  return face_pb.DeleteAuthGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_DeleteAuthGroupResponse(arg) {
  if (!(arg instanceof face_pb.DeleteAuthGroupResponse)) {
    throw new Error('Expected argument of type face.DeleteAuthGroupResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_DeleteAuthGroupResponse(buffer_arg) {
  return face_pb.DeleteAuthGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_GetAuthGroupRequest(arg) {
  if (!(arg instanceof face_pb.GetAuthGroupRequest)) {
    throw new Error('Expected argument of type face.GetAuthGroupRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_GetAuthGroupRequest(buffer_arg) {
  return face_pb.GetAuthGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_GetAuthGroupResponse(arg) {
  if (!(arg instanceof face_pb.GetAuthGroupResponse)) {
    throw new Error('Expected argument of type face.GetAuthGroupResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_GetAuthGroupResponse(buffer_arg) {
  return face_pb.GetAuthGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_GetConfigRequest(arg) {
  if (!(arg instanceof face_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type face.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_GetConfigRequest(buffer_arg) {
  return face_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_GetConfigResponse(arg) {
  if (!(arg instanceof face_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type face.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_GetConfigResponse(buffer_arg) {
  return face_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_ScanRequest(arg) {
  if (!(arg instanceof face_pb.ScanRequest)) {
    throw new Error('Expected argument of type face.ScanRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_ScanRequest(buffer_arg) {
  return face_pb.ScanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_ScanResponse(arg) {
  if (!(arg instanceof face_pb.ScanResponse)) {
    throw new Error('Expected argument of type face.ScanResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_ScanResponse(buffer_arg) {
  return face_pb.ScanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_SetConfigMultiRequest(arg) {
  if (!(arg instanceof face_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type face.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_SetConfigMultiRequest(buffer_arg) {
  return face_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_SetConfigMultiResponse(arg) {
  if (!(arg instanceof face_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type face.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_SetConfigMultiResponse(buffer_arg) {
  return face_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_SetConfigRequest(arg) {
  if (!(arg instanceof face_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type face.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_SetConfigRequest(buffer_arg) {
  return face_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_face_SetConfigResponse(arg) {
  if (!(arg instanceof face_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type face.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_face_SetConfigResponse(buffer_arg) {
  return face_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var FaceService = exports.FaceService = {
  scan: {
    path: '/face.Face/Scan',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.ScanRequest,
    responseType: face_pb.ScanResponse,
    requestSerialize: serialize_face_ScanRequest,
    requestDeserialize: deserialize_face_ScanRequest,
    responseSerialize: serialize_face_ScanResponse,
    responseDeserialize: deserialize_face_ScanResponse,
  },
  getConfig: {
    path: '/face.Face/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.GetConfigRequest,
    responseType: face_pb.GetConfigResponse,
    requestSerialize: serialize_face_GetConfigRequest,
    requestDeserialize: deserialize_face_GetConfigRequest,
    responseSerialize: serialize_face_GetConfigResponse,
    responseDeserialize: deserialize_face_GetConfigResponse,
  },
  setConfig: {
    path: '/face.Face/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.SetConfigRequest,
    responseType: face_pb.SetConfigResponse,
    requestSerialize: serialize_face_SetConfigRequest,
    requestDeserialize: deserialize_face_SetConfigRequest,
    responseSerialize: serialize_face_SetConfigResponse,
    responseDeserialize: deserialize_face_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/face.Face/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.SetConfigMultiRequest,
    responseType: face_pb.SetConfigMultiResponse,
    requestSerialize: serialize_face_SetConfigMultiRequest,
    requestDeserialize: deserialize_face_SetConfigMultiRequest,
    responseSerialize: serialize_face_SetConfigMultiResponse,
    responseDeserialize: deserialize_face_SetConfigMultiResponse,
  },
  getAuthGroup: {
    path: '/face.Face/GetAuthGroup',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.GetAuthGroupRequest,
    responseType: face_pb.GetAuthGroupResponse,
    requestSerialize: serialize_face_GetAuthGroupRequest,
    requestDeserialize: deserialize_face_GetAuthGroupRequest,
    responseSerialize: serialize_face_GetAuthGroupResponse,
    responseDeserialize: deserialize_face_GetAuthGroupResponse,
  },
  addAuthGroup: {
    path: '/face.Face/AddAuthGroup',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.AddAuthGroupRequest,
    responseType: face_pb.AddAuthGroupResponse,
    requestSerialize: serialize_face_AddAuthGroupRequest,
    requestDeserialize: deserialize_face_AddAuthGroupRequest,
    responseSerialize: serialize_face_AddAuthGroupResponse,
    responseDeserialize: deserialize_face_AddAuthGroupResponse,
  },
  addAuthGroupMulti: {
    path: '/face.Face/AddAuthGroupMulti',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.AddAuthGroupMultiRequest,
    responseType: face_pb.AddAuthGroupMultiResponse,
    requestSerialize: serialize_face_AddAuthGroupMultiRequest,
    requestDeserialize: deserialize_face_AddAuthGroupMultiRequest,
    responseSerialize: serialize_face_AddAuthGroupMultiResponse,
    responseDeserialize: deserialize_face_AddAuthGroupMultiResponse,
  },
  deleteAuthGroup: {
    path: '/face.Face/DeleteAuthGroup',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.DeleteAuthGroupRequest,
    responseType: face_pb.DeleteAuthGroupResponse,
    requestSerialize: serialize_face_DeleteAuthGroupRequest,
    requestDeserialize: deserialize_face_DeleteAuthGroupRequest,
    responseSerialize: serialize_face_DeleteAuthGroupResponse,
    responseDeserialize: deserialize_face_DeleteAuthGroupResponse,
  },
  deleteAuthGroupMulti: {
    path: '/face.Face/DeleteAuthGroupMulti',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.DeleteAuthGroupMultiRequest,
    responseType: face_pb.DeleteAuthGroupMultiResponse,
    requestSerialize: serialize_face_DeleteAuthGroupMultiRequest,
    requestDeserialize: deserialize_face_DeleteAuthGroupMultiRequest,
    responseSerialize: serialize_face_DeleteAuthGroupMultiResponse,
    responseDeserialize: deserialize_face_DeleteAuthGroupMultiResponse,
  },
  deleteAllAuthGroup: {
    path: '/face.Face/DeleteAllAuthGroup',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.DeleteAllAuthGroupRequest,
    responseType: face_pb.DeleteAllAuthGroupResponse,
    requestSerialize: serialize_face_DeleteAllAuthGroupRequest,
    requestDeserialize: deserialize_face_DeleteAllAuthGroupRequest,
    responseSerialize: serialize_face_DeleteAllAuthGroupResponse,
    responseDeserialize: deserialize_face_DeleteAllAuthGroupResponse,
  },
  deleteAllAuthGroupMulti: {
    path: '/face.Face/DeleteAllAuthGroupMulti',
    requestStream: false,
    responseStream: false,
    requestType: face_pb.DeleteAllAuthGroupMultiRequest,
    responseType: face_pb.DeleteAllAuthGroupMultiResponse,
    requestSerialize: serialize_face_DeleteAllAuthGroupMultiRequest,
    requestDeserialize: deserialize_face_DeleteAllAuthGroupMultiRequest,
    responseSerialize: serialize_face_DeleteAllAuthGroupMultiResponse,
    responseDeserialize: deserialize_face_DeleteAllAuthGroupMultiResponse,
  },
};

exports.FaceClient = grpc.makeGenericClientConstructor(FaceService);
