// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var access_pb = require('./access_pb.js');
var err_pb = require('./err_pb.js');

function serialize_access_AddLevelMultiRequest(arg) {
  if (!(arg instanceof access_pb.AddLevelMultiRequest)) {
    throw new Error('Expected argument of type access.AddLevelMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddLevelMultiRequest(buffer_arg) {
  return access_pb.AddLevelMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddLevelMultiResponse(arg) {
  if (!(arg instanceof access_pb.AddLevelMultiResponse)) {
    throw new Error('Expected argument of type access.AddLevelMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddLevelMultiResponse(buffer_arg) {
  return access_pb.AddLevelMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddLevelRequest(arg) {
  if (!(arg instanceof access_pb.AddLevelRequest)) {
    throw new Error('Expected argument of type access.AddLevelRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddLevelRequest(buffer_arg) {
  return access_pb.AddLevelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddLevelResponse(arg) {
  if (!(arg instanceof access_pb.AddLevelResponse)) {
    throw new Error('Expected argument of type access.AddLevelResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddLevelResponse(buffer_arg) {
  return access_pb.AddLevelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddMultiRequest(arg) {
  if (!(arg instanceof access_pb.AddMultiRequest)) {
    throw new Error('Expected argument of type access.AddMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddMultiRequest(buffer_arg) {
  return access_pb.AddMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddMultiResponse(arg) {
  if (!(arg instanceof access_pb.AddMultiResponse)) {
    throw new Error('Expected argument of type access.AddMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddMultiResponse(buffer_arg) {
  return access_pb.AddMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddRequest(arg) {
  if (!(arg instanceof access_pb.AddRequest)) {
    throw new Error('Expected argument of type access.AddRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddRequest(buffer_arg) {
  return access_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_AddResponse(arg) {
  if (!(arg instanceof access_pb.AddResponse)) {
    throw new Error('Expected argument of type access.AddResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_AddResponse(buffer_arg) {
  return access_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllLevelMultiRequest(arg) {
  if (!(arg instanceof access_pb.DeleteAllLevelMultiRequest)) {
    throw new Error('Expected argument of type access.DeleteAllLevelMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllLevelMultiRequest(buffer_arg) {
  return access_pb.DeleteAllLevelMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllLevelMultiResponse(arg) {
  if (!(arg instanceof access_pb.DeleteAllLevelMultiResponse)) {
    throw new Error('Expected argument of type access.DeleteAllLevelMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllLevelMultiResponse(buffer_arg) {
  return access_pb.DeleteAllLevelMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllLevelRequest(arg) {
  if (!(arg instanceof access_pb.DeleteAllLevelRequest)) {
    throw new Error('Expected argument of type access.DeleteAllLevelRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllLevelRequest(buffer_arg) {
  return access_pb.DeleteAllLevelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllLevelResponse(arg) {
  if (!(arg instanceof access_pb.DeleteAllLevelResponse)) {
    throw new Error('Expected argument of type access.DeleteAllLevelResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllLevelResponse(buffer_arg) {
  return access_pb.DeleteAllLevelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllMultiRequest(arg) {
  if (!(arg instanceof access_pb.DeleteAllMultiRequest)) {
    throw new Error('Expected argument of type access.DeleteAllMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllMultiRequest(buffer_arg) {
  return access_pb.DeleteAllMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllMultiResponse(arg) {
  if (!(arg instanceof access_pb.DeleteAllMultiResponse)) {
    throw new Error('Expected argument of type access.DeleteAllMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllMultiResponse(buffer_arg) {
  return access_pb.DeleteAllMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllRequest(arg) {
  if (!(arg instanceof access_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type access.DeleteAllRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllRequest(buffer_arg) {
  return access_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteAllResponse(arg) {
  if (!(arg instanceof access_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type access.DeleteAllResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteAllResponse(buffer_arg) {
  return access_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteLevelMultiRequest(arg) {
  if (!(arg instanceof access_pb.DeleteLevelMultiRequest)) {
    throw new Error('Expected argument of type access.DeleteLevelMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteLevelMultiRequest(buffer_arg) {
  return access_pb.DeleteLevelMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteLevelMultiResponse(arg) {
  if (!(arg instanceof access_pb.DeleteLevelMultiResponse)) {
    throw new Error('Expected argument of type access.DeleteLevelMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteLevelMultiResponse(buffer_arg) {
  return access_pb.DeleteLevelMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteLevelRequest(arg) {
  if (!(arg instanceof access_pb.DeleteLevelRequest)) {
    throw new Error('Expected argument of type access.DeleteLevelRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteLevelRequest(buffer_arg) {
  return access_pb.DeleteLevelRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteLevelResponse(arg) {
  if (!(arg instanceof access_pb.DeleteLevelResponse)) {
    throw new Error('Expected argument of type access.DeleteLevelResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteLevelResponse(buffer_arg) {
  return access_pb.DeleteLevelResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteMultiRequest(arg) {
  if (!(arg instanceof access_pb.DeleteMultiRequest)) {
    throw new Error('Expected argument of type access.DeleteMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteMultiRequest(buffer_arg) {
  return access_pb.DeleteMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteMultiResponse(arg) {
  if (!(arg instanceof access_pb.DeleteMultiResponse)) {
    throw new Error('Expected argument of type access.DeleteMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteMultiResponse(buffer_arg) {
  return access_pb.DeleteMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteRequest(arg) {
  if (!(arg instanceof access_pb.DeleteRequest)) {
    throw new Error('Expected argument of type access.DeleteRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteRequest(buffer_arg) {
  return access_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_DeleteResponse(arg) {
  if (!(arg instanceof access_pb.DeleteResponse)) {
    throw new Error('Expected argument of type access.DeleteResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_DeleteResponse(buffer_arg) {
  return access_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_GetLevelListRequest(arg) {
  if (!(arg instanceof access_pb.GetLevelListRequest)) {
    throw new Error('Expected argument of type access.GetLevelListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_GetLevelListRequest(buffer_arg) {
  return access_pb.GetLevelListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_GetLevelListResponse(arg) {
  if (!(arg instanceof access_pb.GetLevelListResponse)) {
    throw new Error('Expected argument of type access.GetLevelListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_GetLevelListResponse(buffer_arg) {
  return access_pb.GetLevelListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_GetListRequest(arg) {
  if (!(arg instanceof access_pb.GetListRequest)) {
    throw new Error('Expected argument of type access.GetListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_GetListRequest(buffer_arg) {
  return access_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_access_GetListResponse(arg) {
  if (!(arg instanceof access_pb.GetListResponse)) {
    throw new Error('Expected argument of type access.GetListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_access_GetListResponse(buffer_arg) {
  return access_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AccessService = exports.AccessService = {
  getList: {
    path: '/access.Access/GetList',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.GetListRequest,
    responseType: access_pb.GetListResponse,
    requestSerialize: serialize_access_GetListRequest,
    requestDeserialize: deserialize_access_GetListRequest,
    responseSerialize: serialize_access_GetListResponse,
    responseDeserialize: deserialize_access_GetListResponse,
  },
  add: {
    path: '/access.Access/Add',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.AddRequest,
    responseType: access_pb.AddResponse,
    requestSerialize: serialize_access_AddRequest,
    requestDeserialize: deserialize_access_AddRequest,
    responseSerialize: serialize_access_AddResponse,
    responseDeserialize: deserialize_access_AddResponse,
  },
  addMulti: {
    path: '/access.Access/AddMulti',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.AddMultiRequest,
    responseType: access_pb.AddMultiResponse,
    requestSerialize: serialize_access_AddMultiRequest,
    requestDeserialize: deserialize_access_AddMultiRequest,
    responseSerialize: serialize_access_AddMultiResponse,
    responseDeserialize: deserialize_access_AddMultiResponse,
  },
  delete: {
    path: '/access.Access/Delete',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteRequest,
    responseType: access_pb.DeleteResponse,
    requestSerialize: serialize_access_DeleteRequest,
    requestDeserialize: deserialize_access_DeleteRequest,
    responseSerialize: serialize_access_DeleteResponse,
    responseDeserialize: deserialize_access_DeleteResponse,
  },
  deleteMulti: {
    path: '/access.Access/DeleteMulti',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteMultiRequest,
    responseType: access_pb.DeleteMultiResponse,
    requestSerialize: serialize_access_DeleteMultiRequest,
    requestDeserialize: deserialize_access_DeleteMultiRequest,
    responseSerialize: serialize_access_DeleteMultiResponse,
    responseDeserialize: deserialize_access_DeleteMultiResponse,
  },
  deleteAll: {
    path: '/access.Access/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteAllRequest,
    responseType: access_pb.DeleteAllResponse,
    requestSerialize: serialize_access_DeleteAllRequest,
    requestDeserialize: deserialize_access_DeleteAllRequest,
    responseSerialize: serialize_access_DeleteAllResponse,
    responseDeserialize: deserialize_access_DeleteAllResponse,
  },
  deleteAllMulti: {
    path: '/access.Access/DeleteAllMulti',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteAllMultiRequest,
    responseType: access_pb.DeleteAllMultiResponse,
    requestSerialize: serialize_access_DeleteAllMultiRequest,
    requestDeserialize: deserialize_access_DeleteAllMultiRequest,
    responseSerialize: serialize_access_DeleteAllMultiResponse,
    responseDeserialize: deserialize_access_DeleteAllMultiResponse,
  },
  getLevelList: {
    path: '/access.Access/GetLevelList',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.GetLevelListRequest,
    responseType: access_pb.GetLevelListResponse,
    requestSerialize: serialize_access_GetLevelListRequest,
    requestDeserialize: deserialize_access_GetLevelListRequest,
    responseSerialize: serialize_access_GetLevelListResponse,
    responseDeserialize: deserialize_access_GetLevelListResponse,
  },
  addLevel: {
    path: '/access.Access/AddLevel',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.AddLevelRequest,
    responseType: access_pb.AddLevelResponse,
    requestSerialize: serialize_access_AddLevelRequest,
    requestDeserialize: deserialize_access_AddLevelRequest,
    responseSerialize: serialize_access_AddLevelResponse,
    responseDeserialize: deserialize_access_AddLevelResponse,
  },
  addLevelMulti: {
    path: '/access.Access/AddLevelMulti',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.AddLevelMultiRequest,
    responseType: access_pb.AddLevelMultiResponse,
    requestSerialize: serialize_access_AddLevelMultiRequest,
    requestDeserialize: deserialize_access_AddLevelMultiRequest,
    responseSerialize: serialize_access_AddLevelMultiResponse,
    responseDeserialize: deserialize_access_AddLevelMultiResponse,
  },
  deleteLevel: {
    path: '/access.Access/DeleteLevel',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteLevelRequest,
    responseType: access_pb.DeleteLevelResponse,
    requestSerialize: serialize_access_DeleteLevelRequest,
    requestDeserialize: deserialize_access_DeleteLevelRequest,
    responseSerialize: serialize_access_DeleteLevelResponse,
    responseDeserialize: deserialize_access_DeleteLevelResponse,
  },
  deleteLevelMulti: {
    path: '/access.Access/DeleteLevelMulti',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteLevelMultiRequest,
    responseType: access_pb.DeleteLevelMultiResponse,
    requestSerialize: serialize_access_DeleteLevelMultiRequest,
    requestDeserialize: deserialize_access_DeleteLevelMultiRequest,
    responseSerialize: serialize_access_DeleteLevelMultiResponse,
    responseDeserialize: deserialize_access_DeleteLevelMultiResponse,
  },
  deleteAllLevel: {
    path: '/access.Access/DeleteAllLevel',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteAllLevelRequest,
    responseType: access_pb.DeleteAllLevelResponse,
    requestSerialize: serialize_access_DeleteAllLevelRequest,
    requestDeserialize: deserialize_access_DeleteAllLevelRequest,
    responseSerialize: serialize_access_DeleteAllLevelResponse,
    responseDeserialize: deserialize_access_DeleteAllLevelResponse,
  },
  deleteAllLevelMulti: {
    path: '/access.Access/DeleteAllLevelMulti',
    requestStream: false,
    responseStream: false,
    requestType: access_pb.DeleteAllLevelMultiRequest,
    responseType: access_pb.DeleteAllLevelMultiResponse,
    requestSerialize: serialize_access_DeleteAllLevelMultiRequest,
    requestDeserialize: deserialize_access_DeleteAllLevelMultiRequest,
    responseSerialize: serialize_access_DeleteAllLevelMultiResponse,
    responseDeserialize: deserialize_access_DeleteAllLevelMultiResponse,
  },
};

exports.AccessClient = grpc.makeGenericClientConstructor(AccessService);
