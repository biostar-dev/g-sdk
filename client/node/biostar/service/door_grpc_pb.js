// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var door_pb = require('./door_pb.js');
var device_pb = require('./device_pb.js');
var action_pb = require('./action_pb.js');

function serialize_door_AddRequest(arg) {
  if (!(arg instanceof door_pb.AddRequest)) {
    throw new Error('Expected argument of type door.AddRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_AddRequest(buffer_arg) {
  return door_pb.AddRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_AddResponse(arg) {
  if (!(arg instanceof door_pb.AddResponse)) {
    throw new Error('Expected argument of type door.AddResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_AddResponse(buffer_arg) {
  return door_pb.AddResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_DeleteAllRequest(arg) {
  if (!(arg instanceof door_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type door.DeleteAllRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_DeleteAllRequest(buffer_arg) {
  return door_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_DeleteAllResponse(arg) {
  if (!(arg instanceof door_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type door.DeleteAllResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_DeleteAllResponse(buffer_arg) {
  return door_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_DeleteRequest(arg) {
  if (!(arg instanceof door_pb.DeleteRequest)) {
    throw new Error('Expected argument of type door.DeleteRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_DeleteRequest(buffer_arg) {
  return door_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_DeleteResponse(arg) {
  if (!(arg instanceof door_pb.DeleteResponse)) {
    throw new Error('Expected argument of type door.DeleteResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_DeleteResponse(buffer_arg) {
  return door_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_GetListRequest(arg) {
  if (!(arg instanceof door_pb.GetListRequest)) {
    throw new Error('Expected argument of type door.GetListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_GetListRequest(buffer_arg) {
  return door_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_GetListResponse(arg) {
  if (!(arg instanceof door_pb.GetListResponse)) {
    throw new Error('Expected argument of type door.GetListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_GetListResponse(buffer_arg) {
  return door_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_GetStatusRequest(arg) {
  if (!(arg instanceof door_pb.GetStatusRequest)) {
    throw new Error('Expected argument of type door.GetStatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_GetStatusRequest(buffer_arg) {
  return door_pb.GetStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_GetStatusResponse(arg) {
  if (!(arg instanceof door_pb.GetStatusResponse)) {
    throw new Error('Expected argument of type door.GetStatusResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_GetStatusResponse(buffer_arg) {
  return door_pb.GetStatusResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_LockRequest(arg) {
  if (!(arg instanceof door_pb.LockRequest)) {
    throw new Error('Expected argument of type door.LockRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_LockRequest(buffer_arg) {
  return door_pb.LockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_LockResponse(arg) {
  if (!(arg instanceof door_pb.LockResponse)) {
    throw new Error('Expected argument of type door.LockResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_LockResponse(buffer_arg) {
  return door_pb.LockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_ReleaseRequest(arg) {
  if (!(arg instanceof door_pb.ReleaseRequest)) {
    throw new Error('Expected argument of type door.ReleaseRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_ReleaseRequest(buffer_arg) {
  return door_pb.ReleaseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_ReleaseResponse(arg) {
  if (!(arg instanceof door_pb.ReleaseResponse)) {
    throw new Error('Expected argument of type door.ReleaseResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_ReleaseResponse(buffer_arg) {
  return door_pb.ReleaseResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_SetAlarmRequest(arg) {
  if (!(arg instanceof door_pb.SetAlarmRequest)) {
    throw new Error('Expected argument of type door.SetAlarmRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_SetAlarmRequest(buffer_arg) {
  return door_pb.SetAlarmRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_SetAlarmResponse(arg) {
  if (!(arg instanceof door_pb.SetAlarmResponse)) {
    throw new Error('Expected argument of type door.SetAlarmResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_SetAlarmResponse(buffer_arg) {
  return door_pb.SetAlarmResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_UnlockRequest(arg) {
  if (!(arg instanceof door_pb.UnlockRequest)) {
    throw new Error('Expected argument of type door.UnlockRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_UnlockRequest(buffer_arg) {
  return door_pb.UnlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_door_UnlockResponse(arg) {
  if (!(arg instanceof door_pb.UnlockResponse)) {
    throw new Error('Expected argument of type door.UnlockResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_door_UnlockResponse(buffer_arg) {
  return door_pb.UnlockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DoorService = exports.DoorService = {
  getList: {
    path: '/door.Door/GetList',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.GetListRequest,
    responseType: door_pb.GetListResponse,
    requestSerialize: serialize_door_GetListRequest,
    requestDeserialize: deserialize_door_GetListRequest,
    responseSerialize: serialize_door_GetListResponse,
    responseDeserialize: deserialize_door_GetListResponse,
  },
  getStatus: {
    path: '/door.Door/GetStatus',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.GetStatusRequest,
    responseType: door_pb.GetStatusResponse,
    requestSerialize: serialize_door_GetStatusRequest,
    requestDeserialize: deserialize_door_GetStatusRequest,
    responseSerialize: serialize_door_GetStatusResponse,
    responseDeserialize: deserialize_door_GetStatusResponse,
  },
  add: {
    path: '/door.Door/Add',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.AddRequest,
    responseType: door_pb.AddResponse,
    requestSerialize: serialize_door_AddRequest,
    requestDeserialize: deserialize_door_AddRequest,
    responseSerialize: serialize_door_AddResponse,
    responseDeserialize: deserialize_door_AddResponse,
  },
  delete: {
    path: '/door.Door/Delete',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.DeleteRequest,
    responseType: door_pb.DeleteResponse,
    requestSerialize: serialize_door_DeleteRequest,
    requestDeserialize: deserialize_door_DeleteRequest,
    responseSerialize: serialize_door_DeleteResponse,
    responseDeserialize: deserialize_door_DeleteResponse,
  },
  deleteAll: {
    path: '/door.Door/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.DeleteAllRequest,
    responseType: door_pb.DeleteAllResponse,
    requestSerialize: serialize_door_DeleteAllRequest,
    requestDeserialize: deserialize_door_DeleteAllRequest,
    responseSerialize: serialize_door_DeleteAllResponse,
    responseDeserialize: deserialize_door_DeleteAllResponse,
  },
  lock: {
    path: '/door.Door/Lock',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.LockRequest,
    responseType: door_pb.LockResponse,
    requestSerialize: serialize_door_LockRequest,
    requestDeserialize: deserialize_door_LockRequest,
    responseSerialize: serialize_door_LockResponse,
    responseDeserialize: deserialize_door_LockResponse,
  },
  unlock: {
    path: '/door.Door/Unlock',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.UnlockRequest,
    responseType: door_pb.UnlockResponse,
    requestSerialize: serialize_door_UnlockRequest,
    requestDeserialize: deserialize_door_UnlockRequest,
    responseSerialize: serialize_door_UnlockResponse,
    responseDeserialize: deserialize_door_UnlockResponse,
  },
  release: {
    path: '/door.Door/Release',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.ReleaseRequest,
    responseType: door_pb.ReleaseResponse,
    requestSerialize: serialize_door_ReleaseRequest,
    requestDeserialize: deserialize_door_ReleaseRequest,
    responseSerialize: serialize_door_ReleaseResponse,
    responseDeserialize: deserialize_door_ReleaseResponse,
  },
  setAlarm: {
    path: '/door.Door/SetAlarm',
    requestStream: false,
    responseStream: false,
    requestType: door_pb.SetAlarmRequest,
    responseType: door_pb.SetAlarmResponse,
    requestSerialize: serialize_door_SetAlarmRequest,
    requestDeserialize: deserialize_door_SetAlarmRequest,
    responseSerialize: serialize_door_SetAlarmResponse,
    responseDeserialize: deserialize_door_SetAlarmResponse,
  },
};

exports.DoorClient = grpc.makeGenericClientConstructor(DoorService);
