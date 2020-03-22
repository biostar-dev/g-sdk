// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var user_pb = require('./user_pb.js');
var card_pb = require('./card_pb.js');
var finger_pb = require('./finger_pb.js');
var face_pb = require('./face_pb.js');
var tna_pb = require('./tna_pb.js');
var err_pb = require('./err_pb.js');

function serialize_user_DeleteAllMultiRequest(arg) {
  if (!(arg instanceof user_pb.DeleteAllMultiRequest)) {
    throw new Error('Expected argument of type user.DeleteAllMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteAllMultiRequest(buffer_arg) {
  return user_pb.DeleteAllMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteAllMultiResponse(arg) {
  if (!(arg instanceof user_pb.DeleteAllMultiResponse)) {
    throw new Error('Expected argument of type user.DeleteAllMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteAllMultiResponse(buffer_arg) {
  return user_pb.DeleteAllMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteAllRequest(arg) {
  if (!(arg instanceof user_pb.DeleteAllRequest)) {
    throw new Error('Expected argument of type user.DeleteAllRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteAllRequest(buffer_arg) {
  return user_pb.DeleteAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteAllResponse(arg) {
  if (!(arg instanceof user_pb.DeleteAllResponse)) {
    throw new Error('Expected argument of type user.DeleteAllResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteAllResponse(buffer_arg) {
  return user_pb.DeleteAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteMultiRequest(arg) {
  if (!(arg instanceof user_pb.DeleteMultiRequest)) {
    throw new Error('Expected argument of type user.DeleteMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteMultiRequest(buffer_arg) {
  return user_pb.DeleteMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteMultiResponse(arg) {
  if (!(arg instanceof user_pb.DeleteMultiResponse)) {
    throw new Error('Expected argument of type user.DeleteMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteMultiResponse(buffer_arg) {
  return user_pb.DeleteMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteRequest(arg) {
  if (!(arg instanceof user_pb.DeleteRequest)) {
    throw new Error('Expected argument of type user.DeleteRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteRequest(buffer_arg) {
  return user_pb.DeleteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_DeleteResponse(arg) {
  if (!(arg instanceof user_pb.DeleteResponse)) {
    throw new Error('Expected argument of type user.DeleteResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_DeleteResponse(buffer_arg) {
  return user_pb.DeleteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_EnrollMultiRequest(arg) {
  if (!(arg instanceof user_pb.EnrollMultiRequest)) {
    throw new Error('Expected argument of type user.EnrollMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_EnrollMultiRequest(buffer_arg) {
  return user_pb.EnrollMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_EnrollMultiResponse(arg) {
  if (!(arg instanceof user_pb.EnrollMultiResponse)) {
    throw new Error('Expected argument of type user.EnrollMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_EnrollMultiResponse(buffer_arg) {
  return user_pb.EnrollMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_EnrollRequest(arg) {
  if (!(arg instanceof user_pb.EnrollRequest)) {
    throw new Error('Expected argument of type user.EnrollRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_EnrollRequest(buffer_arg) {
  return user_pb.EnrollRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_EnrollResponse(arg) {
  if (!(arg instanceof user_pb.EnrollResponse)) {
    throw new Error('Expected argument of type user.EnrollResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_EnrollResponse(buffer_arg) {
  return user_pb.EnrollResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetAccessGroupRequest(arg) {
  if (!(arg instanceof user_pb.GetAccessGroupRequest)) {
    throw new Error('Expected argument of type user.GetAccessGroupRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetAccessGroupRequest(buffer_arg) {
  return user_pb.GetAccessGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetAccessGroupResponse(arg) {
  if (!(arg instanceof user_pb.GetAccessGroupResponse)) {
    throw new Error('Expected argument of type user.GetAccessGroupResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetAccessGroupResponse(buffer_arg) {
  return user_pb.GetAccessGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetCardRequest(arg) {
  if (!(arg instanceof user_pb.GetCardRequest)) {
    throw new Error('Expected argument of type user.GetCardRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetCardRequest(buffer_arg) {
  return user_pb.GetCardRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetCardResponse(arg) {
  if (!(arg instanceof user_pb.GetCardResponse)) {
    throw new Error('Expected argument of type user.GetCardResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetCardResponse(buffer_arg) {
  return user_pb.GetCardResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetFaceRequest(arg) {
  if (!(arg instanceof user_pb.GetFaceRequest)) {
    throw new Error('Expected argument of type user.GetFaceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetFaceRequest(buffer_arg) {
  return user_pb.GetFaceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetFaceResponse(arg) {
  if (!(arg instanceof user_pb.GetFaceResponse)) {
    throw new Error('Expected argument of type user.GetFaceResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetFaceResponse(buffer_arg) {
  return user_pb.GetFaceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetFingerRequest(arg) {
  if (!(arg instanceof user_pb.GetFingerRequest)) {
    throw new Error('Expected argument of type user.GetFingerRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetFingerRequest(buffer_arg) {
  return user_pb.GetFingerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetFingerResponse(arg) {
  if (!(arg instanceof user_pb.GetFingerResponse)) {
    throw new Error('Expected argument of type user.GetFingerResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetFingerResponse(buffer_arg) {
  return user_pb.GetFingerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetJobCodeRequest(arg) {
  if (!(arg instanceof user_pb.GetJobCodeRequest)) {
    throw new Error('Expected argument of type user.GetJobCodeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetJobCodeRequest(buffer_arg) {
  return user_pb.GetJobCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetJobCodeResponse(arg) {
  if (!(arg instanceof user_pb.GetJobCodeResponse)) {
    throw new Error('Expected argument of type user.GetJobCodeResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetJobCodeResponse(buffer_arg) {
  return user_pb.GetJobCodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetListRequest(arg) {
  if (!(arg instanceof user_pb.GetListRequest)) {
    throw new Error('Expected argument of type user.GetListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetListRequest(buffer_arg) {
  return user_pb.GetListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetListResponse(arg) {
  if (!(arg instanceof user_pb.GetListResponse)) {
    throw new Error('Expected argument of type user.GetListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetListResponse(buffer_arg) {
  return user_pb.GetListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetPINHashRequest(arg) {
  if (!(arg instanceof user_pb.GetPINHashRequest)) {
    throw new Error('Expected argument of type user.GetPINHashRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetPINHashRequest(buffer_arg) {
  return user_pb.GetPINHashRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetPINHashResponse(arg) {
  if (!(arg instanceof user_pb.GetPINHashResponse)) {
    throw new Error('Expected argument of type user.GetPINHashResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetPINHashResponse(buffer_arg) {
  return user_pb.GetPINHashResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetPartialRequest(arg) {
  if (!(arg instanceof user_pb.GetPartialRequest)) {
    throw new Error('Expected argument of type user.GetPartialRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetPartialRequest(buffer_arg) {
  return user_pb.GetPartialRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetPartialResponse(arg) {
  if (!(arg instanceof user_pb.GetPartialResponse)) {
    throw new Error('Expected argument of type user.GetPartialResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetPartialResponse(buffer_arg) {
  return user_pb.GetPartialResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetRequest(arg) {
  if (!(arg instanceof user_pb.GetRequest)) {
    throw new Error('Expected argument of type user.GetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetRequest(buffer_arg) {
  return user_pb.GetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_GetResponse(arg) {
  if (!(arg instanceof user_pb.GetResponse)) {
    throw new Error('Expected argument of type user.GetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_GetResponse(buffer_arg) {
  return user_pb.GetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetAccessGroupMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupMultiRequest)) {
    throw new Error('Expected argument of type user.SetAccessGroupMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetAccessGroupMultiRequest(buffer_arg) {
  return user_pb.SetAccessGroupMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetAccessGroupMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupMultiResponse)) {
    throw new Error('Expected argument of type user.SetAccessGroupMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetAccessGroupMultiResponse(buffer_arg) {
  return user_pb.SetAccessGroupMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetAccessGroupRequest(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupRequest)) {
    throw new Error('Expected argument of type user.SetAccessGroupRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetAccessGroupRequest(buffer_arg) {
  return user_pb.SetAccessGroupRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetAccessGroupResponse(arg) {
  if (!(arg instanceof user_pb.SetAccessGroupResponse)) {
    throw new Error('Expected argument of type user.SetAccessGroupResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetAccessGroupResponse(buffer_arg) {
  return user_pb.SetAccessGroupResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetCardMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetCardMultiRequest)) {
    throw new Error('Expected argument of type user.SetCardMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetCardMultiRequest(buffer_arg) {
  return user_pb.SetCardMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetCardMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetCardMultiResponse)) {
    throw new Error('Expected argument of type user.SetCardMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetCardMultiResponse(buffer_arg) {
  return user_pb.SetCardMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetCardRequest(arg) {
  if (!(arg instanceof user_pb.SetCardRequest)) {
    throw new Error('Expected argument of type user.SetCardRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetCardRequest(buffer_arg) {
  return user_pb.SetCardRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetCardResponse(arg) {
  if (!(arg instanceof user_pb.SetCardResponse)) {
    throw new Error('Expected argument of type user.SetCardResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetCardResponse(buffer_arg) {
  return user_pb.SetCardResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFaceMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetFaceMultiRequest)) {
    throw new Error('Expected argument of type user.SetFaceMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFaceMultiRequest(buffer_arg) {
  return user_pb.SetFaceMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFaceMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetFaceMultiResponse)) {
    throw new Error('Expected argument of type user.SetFaceMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFaceMultiResponse(buffer_arg) {
  return user_pb.SetFaceMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFaceRequest(arg) {
  if (!(arg instanceof user_pb.SetFaceRequest)) {
    throw new Error('Expected argument of type user.SetFaceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFaceRequest(buffer_arg) {
  return user_pb.SetFaceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFaceResponse(arg) {
  if (!(arg instanceof user_pb.SetFaceResponse)) {
    throw new Error('Expected argument of type user.SetFaceResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFaceResponse(buffer_arg) {
  return user_pb.SetFaceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFingerMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetFingerMultiRequest)) {
    throw new Error('Expected argument of type user.SetFingerMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFingerMultiRequest(buffer_arg) {
  return user_pb.SetFingerMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFingerMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetFingerMultiResponse)) {
    throw new Error('Expected argument of type user.SetFingerMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFingerMultiResponse(buffer_arg) {
  return user_pb.SetFingerMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFingerRequest(arg) {
  if (!(arg instanceof user_pb.SetFingerRequest)) {
    throw new Error('Expected argument of type user.SetFingerRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFingerRequest(buffer_arg) {
  return user_pb.SetFingerRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetFingerResponse(arg) {
  if (!(arg instanceof user_pb.SetFingerResponse)) {
    throw new Error('Expected argument of type user.SetFingerResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetFingerResponse(buffer_arg) {
  return user_pb.SetFingerResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetJobCodeMultiRequest(arg) {
  if (!(arg instanceof user_pb.SetJobCodeMultiRequest)) {
    throw new Error('Expected argument of type user.SetJobCodeMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetJobCodeMultiRequest(buffer_arg) {
  return user_pb.SetJobCodeMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetJobCodeMultiResponse(arg) {
  if (!(arg instanceof user_pb.SetJobCodeMultiResponse)) {
    throw new Error('Expected argument of type user.SetJobCodeMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetJobCodeMultiResponse(buffer_arg) {
  return user_pb.SetJobCodeMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetJobCodeRequest(arg) {
  if (!(arg instanceof user_pb.SetJobCodeRequest)) {
    throw new Error('Expected argument of type user.SetJobCodeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetJobCodeRequest(buffer_arg) {
  return user_pb.SetJobCodeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_user_SetJobCodeResponse(arg) {
  if (!(arg instanceof user_pb.SetJobCodeResponse)) {
    throw new Error('Expected argument of type user.SetJobCodeResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_user_SetJobCodeResponse(buffer_arg) {
  return user_pb.SetJobCodeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var UserService = exports.UserService = {
  getList: {
    path: '/user.User/GetList',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetListRequest,
    responseType: user_pb.GetListResponse,
    requestSerialize: serialize_user_GetListRequest,
    requestDeserialize: deserialize_user_GetListRequest,
    responseSerialize: serialize_user_GetListResponse,
    responseDeserialize: deserialize_user_GetListResponse,
  },
  get: {
    path: '/user.User/Get',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetRequest,
    responseType: user_pb.GetResponse,
    requestSerialize: serialize_user_GetRequest,
    requestDeserialize: deserialize_user_GetRequest,
    responseSerialize: serialize_user_GetResponse,
    responseDeserialize: deserialize_user_GetResponse,
  },
  getPartial: {
    path: '/user.User/GetPartial',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetPartialRequest,
    responseType: user_pb.GetPartialResponse,
    requestSerialize: serialize_user_GetPartialRequest,
    requestDeserialize: deserialize_user_GetPartialRequest,
    responseSerialize: serialize_user_GetPartialResponse,
    responseDeserialize: deserialize_user_GetPartialResponse,
  },
  enroll: {
    path: '/user.User/Enroll',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.EnrollRequest,
    responseType: user_pb.EnrollResponse,
    requestSerialize: serialize_user_EnrollRequest,
    requestDeserialize: deserialize_user_EnrollRequest,
    responseSerialize: serialize_user_EnrollResponse,
    responseDeserialize: deserialize_user_EnrollResponse,
  },
  enrollMulti: {
    path: '/user.User/EnrollMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.EnrollMultiRequest,
    responseType: user_pb.EnrollMultiResponse,
    requestSerialize: serialize_user_EnrollMultiRequest,
    requestDeserialize: deserialize_user_EnrollMultiRequest,
    responseSerialize: serialize_user_EnrollMultiResponse,
    responseDeserialize: deserialize_user_EnrollMultiResponse,
  },
  delete: {
    path: '/user.User/Delete',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteRequest,
    responseType: user_pb.DeleteResponse,
    requestSerialize: serialize_user_DeleteRequest,
    requestDeserialize: deserialize_user_DeleteRequest,
    responseSerialize: serialize_user_DeleteResponse,
    responseDeserialize: deserialize_user_DeleteResponse,
  },
  deleteMulti: {
    path: '/user.User/DeleteMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteMultiRequest,
    responseType: user_pb.DeleteMultiResponse,
    requestSerialize: serialize_user_DeleteMultiRequest,
    requestDeserialize: deserialize_user_DeleteMultiRequest,
    responseSerialize: serialize_user_DeleteMultiResponse,
    responseDeserialize: deserialize_user_DeleteMultiResponse,
  },
  deleteAll: {
    path: '/user.User/DeleteAll',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteAllRequest,
    responseType: user_pb.DeleteAllResponse,
    requestSerialize: serialize_user_DeleteAllRequest,
    requestDeserialize: deserialize_user_DeleteAllRequest,
    responseSerialize: serialize_user_DeleteAllResponse,
    responseDeserialize: deserialize_user_DeleteAllResponse,
  },
  deleteAllMulti: {
    path: '/user.User/DeleteAllMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.DeleteAllMultiRequest,
    responseType: user_pb.DeleteAllMultiResponse,
    requestSerialize: serialize_user_DeleteAllMultiRequest,
    requestDeserialize: deserialize_user_DeleteAllMultiRequest,
    responseSerialize: serialize_user_DeleteAllMultiResponse,
    responseDeserialize: deserialize_user_DeleteAllMultiResponse,
  },
  getCard: {
    path: '/user.User/GetCard',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetCardRequest,
    responseType: user_pb.GetCardResponse,
    requestSerialize: serialize_user_GetCardRequest,
    requestDeserialize: deserialize_user_GetCardRequest,
    responseSerialize: serialize_user_GetCardResponse,
    responseDeserialize: deserialize_user_GetCardResponse,
  },
  setCard: {
    path: '/user.User/SetCard',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetCardRequest,
    responseType: user_pb.SetCardResponse,
    requestSerialize: serialize_user_SetCardRequest,
    requestDeserialize: deserialize_user_SetCardRequest,
    responseSerialize: serialize_user_SetCardResponse,
    responseDeserialize: deserialize_user_SetCardResponse,
  },
  setCardMulti: {
    path: '/user.User/SetCardMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetCardMultiRequest,
    responseType: user_pb.SetCardMultiResponse,
    requestSerialize: serialize_user_SetCardMultiRequest,
    requestDeserialize: deserialize_user_SetCardMultiRequest,
    responseSerialize: serialize_user_SetCardMultiResponse,
    responseDeserialize: deserialize_user_SetCardMultiResponse,
  },
  getFinger: {
    path: '/user.User/GetFinger',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetFingerRequest,
    responseType: user_pb.GetFingerResponse,
    requestSerialize: serialize_user_GetFingerRequest,
    requestDeserialize: deserialize_user_GetFingerRequest,
    responseSerialize: serialize_user_GetFingerResponse,
    responseDeserialize: deserialize_user_GetFingerResponse,
  },
  setFinger: {
    path: '/user.User/SetFinger',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFingerRequest,
    responseType: user_pb.SetFingerResponse,
    requestSerialize: serialize_user_SetFingerRequest,
    requestDeserialize: deserialize_user_SetFingerRequest,
    responseSerialize: serialize_user_SetFingerResponse,
    responseDeserialize: deserialize_user_SetFingerResponse,
  },
  setFingerMulti: {
    path: '/user.User/SetFingerMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFingerMultiRequest,
    responseType: user_pb.SetFingerMultiResponse,
    requestSerialize: serialize_user_SetFingerMultiRequest,
    requestDeserialize: deserialize_user_SetFingerMultiRequest,
    responseSerialize: serialize_user_SetFingerMultiResponse,
    responseDeserialize: deserialize_user_SetFingerMultiResponse,
  },
  getFace: {
    path: '/user.User/GetFace',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetFaceRequest,
    responseType: user_pb.GetFaceResponse,
    requestSerialize: serialize_user_GetFaceRequest,
    requestDeserialize: deserialize_user_GetFaceRequest,
    responseSerialize: serialize_user_GetFaceResponse,
    responseDeserialize: deserialize_user_GetFaceResponse,
  },
  setFace: {
    path: '/user.User/SetFace',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFaceRequest,
    responseType: user_pb.SetFaceResponse,
    requestSerialize: serialize_user_SetFaceRequest,
    requestDeserialize: deserialize_user_SetFaceRequest,
    responseSerialize: serialize_user_SetFaceResponse,
    responseDeserialize: deserialize_user_SetFaceResponse,
  },
  setFaceMulti: {
    path: '/user.User/SetFaceMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetFaceMultiRequest,
    responseType: user_pb.SetFaceMultiResponse,
    requestSerialize: serialize_user_SetFaceMultiRequest,
    requestDeserialize: deserialize_user_SetFaceMultiRequest,
    responseSerialize: serialize_user_SetFaceMultiResponse,
    responseDeserialize: deserialize_user_SetFaceMultiResponse,
  },
  getAccessGroup: {
    path: '/user.User/GetAccessGroup',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetAccessGroupRequest,
    responseType: user_pb.GetAccessGroupResponse,
    requestSerialize: serialize_user_GetAccessGroupRequest,
    requestDeserialize: deserialize_user_GetAccessGroupRequest,
    responseSerialize: serialize_user_GetAccessGroupResponse,
    responseDeserialize: deserialize_user_GetAccessGroupResponse,
  },
  setAccessGroup: {
    path: '/user.User/SetAccessGroup',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetAccessGroupRequest,
    responseType: user_pb.SetAccessGroupResponse,
    requestSerialize: serialize_user_SetAccessGroupRequest,
    requestDeserialize: deserialize_user_SetAccessGroupRequest,
    responseSerialize: serialize_user_SetAccessGroupResponse,
    responseDeserialize: deserialize_user_SetAccessGroupResponse,
  },
  setAccessGroupMulti: {
    path: '/user.User/SetAccessGroupMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetAccessGroupMultiRequest,
    responseType: user_pb.SetAccessGroupMultiResponse,
    requestSerialize: serialize_user_SetAccessGroupMultiRequest,
    requestDeserialize: deserialize_user_SetAccessGroupMultiRequest,
    responseSerialize: serialize_user_SetAccessGroupMultiResponse,
    responseDeserialize: deserialize_user_SetAccessGroupMultiResponse,
  },
  getJobCode: {
    path: '/user.User/GetJobCode',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetJobCodeRequest,
    responseType: user_pb.GetJobCodeResponse,
    requestSerialize: serialize_user_GetJobCodeRequest,
    requestDeserialize: deserialize_user_GetJobCodeRequest,
    responseSerialize: serialize_user_GetJobCodeResponse,
    responseDeserialize: deserialize_user_GetJobCodeResponse,
  },
  setJobCode: {
    path: '/user.User/SetJobCode',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetJobCodeRequest,
    responseType: user_pb.SetJobCodeResponse,
    requestSerialize: serialize_user_SetJobCodeRequest,
    requestDeserialize: deserialize_user_SetJobCodeRequest,
    responseSerialize: serialize_user_SetJobCodeResponse,
    responseDeserialize: deserialize_user_SetJobCodeResponse,
  },
  setJobCodeMulti: {
    path: '/user.User/SetJobCodeMulti',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.SetJobCodeMultiRequest,
    responseType: user_pb.SetJobCodeMultiResponse,
    requestSerialize: serialize_user_SetJobCodeMultiRequest,
    requestDeserialize: deserialize_user_SetJobCodeMultiRequest,
    responseSerialize: serialize_user_SetJobCodeMultiResponse,
    responseDeserialize: deserialize_user_SetJobCodeMultiResponse,
  },
  getPINHash: {
    path: '/user.User/GetPINHash',
    requestStream: false,
    responseStream: false,
    requestType: user_pb.GetPINHashRequest,
    responseType: user_pb.GetPINHashResponse,
    requestSerialize: serialize_user_GetPINHashRequest,
    requestDeserialize: deserialize_user_GetPINHashRequest,
    responseSerialize: serialize_user_GetPINHashResponse,
    responseDeserialize: deserialize_user_GetPINHashResponse,
  },
};

exports.UserClient = grpc.makeGenericClientConstructor(UserService);
