// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var card_pb = require('./card_pb.js');
var err_pb = require('./err_pb.js');

function serialize_card_AddBlacklistMultiRequest(arg) {
  if (!(arg instanceof card_pb.AddBlacklistMultiRequest)) {
    throw new Error('Expected argument of type card.AddBlacklistMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_AddBlacklistMultiRequest(buffer_arg) {
  return card_pb.AddBlacklistMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_AddBlacklistMultiResponse(arg) {
  if (!(arg instanceof card_pb.AddBlacklistMultiResponse)) {
    throw new Error('Expected argument of type card.AddBlacklistMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_AddBlacklistMultiResponse(buffer_arg) {
  return card_pb.AddBlacklistMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_AddBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.AddBlacklistRequest)) {
    throw new Error('Expected argument of type card.AddBlacklistRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_AddBlacklistRequest(buffer_arg) {
  return card_pb.AddBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_AddBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.AddBlacklistResponse)) {
    throw new Error('Expected argument of type card.AddBlacklistResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_AddBlacklistResponse(buffer_arg) {
  return card_pb.AddBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteAllBlacklistMultiRequest(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistMultiRequest)) {
    throw new Error('Expected argument of type card.DeleteAllBlacklistMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteAllBlacklistMultiRequest(buffer_arg) {
  return card_pb.DeleteAllBlacklistMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteAllBlacklistMultiResponse(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistMultiResponse)) {
    throw new Error('Expected argument of type card.DeleteAllBlacklistMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteAllBlacklistMultiResponse(buffer_arg) {
  return card_pb.DeleteAllBlacklistMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteAllBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistRequest)) {
    throw new Error('Expected argument of type card.DeleteAllBlacklistRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteAllBlacklistRequest(buffer_arg) {
  return card_pb.DeleteAllBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteAllBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.DeleteAllBlacklistResponse)) {
    throw new Error('Expected argument of type card.DeleteAllBlacklistResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteAllBlacklistResponse(buffer_arg) {
  return card_pb.DeleteAllBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteBlacklistMultiRequest(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistMultiRequest)) {
    throw new Error('Expected argument of type card.DeleteBlacklistMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteBlacklistMultiRequest(buffer_arg) {
  return card_pb.DeleteBlacklistMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteBlacklistMultiResponse(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistMultiResponse)) {
    throw new Error('Expected argument of type card.DeleteBlacklistMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteBlacklistMultiResponse(buffer_arg) {
  return card_pb.DeleteBlacklistMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistRequest)) {
    throw new Error('Expected argument of type card.DeleteBlacklistRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteBlacklistRequest(buffer_arg) {
  return card_pb.DeleteBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_DeleteBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.DeleteBlacklistResponse)) {
    throw new Error('Expected argument of type card.DeleteBlacklistResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_DeleteBlacklistResponse(buffer_arg) {
  return card_pb.DeleteBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_EraseRequest(arg) {
  if (!(arg instanceof card_pb.EraseRequest)) {
    throw new Error('Expected argument of type card.EraseRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_EraseRequest(buffer_arg) {
  return card_pb.EraseRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_EraseResponse(arg) {
  if (!(arg instanceof card_pb.EraseResponse)) {
    throw new Error('Expected argument of type card.EraseResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_EraseResponse(buffer_arg) {
  return card_pb.EraseResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_Get1XConfigRequest(arg) {
  if (!(arg instanceof card_pb.Get1XConfigRequest)) {
    throw new Error('Expected argument of type card.Get1XConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_Get1XConfigRequest(buffer_arg) {
  return card_pb.Get1XConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_Get1XConfigResponse(arg) {
  if (!(arg instanceof card_pb.Get1XConfigResponse)) {
    throw new Error('Expected argument of type card.Get1XConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_Get1XConfigResponse(buffer_arg) {
  return card_pb.Get1XConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_GetBlacklistRequest(arg) {
  if (!(arg instanceof card_pb.GetBlacklistRequest)) {
    throw new Error('Expected argument of type card.GetBlacklistRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_GetBlacklistRequest(buffer_arg) {
  return card_pb.GetBlacklistRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_GetBlacklistResponse(arg) {
  if (!(arg instanceof card_pb.GetBlacklistResponse)) {
    throw new Error('Expected argument of type card.GetBlacklistResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_GetBlacklistResponse(buffer_arg) {
  return card_pb.GetBlacklistResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_GetConfigRequest(arg) {
  if (!(arg instanceof card_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type card.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_GetConfigRequest(buffer_arg) {
  return card_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_GetConfigResponse(arg) {
  if (!(arg instanceof card_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type card.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_GetConfigResponse(buffer_arg) {
  return card_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_ScanRequest(arg) {
  if (!(arg instanceof card_pb.ScanRequest)) {
    throw new Error('Expected argument of type card.ScanRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_ScanRequest(buffer_arg) {
  return card_pb.ScanRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_ScanResponse(arg) {
  if (!(arg instanceof card_pb.ScanResponse)) {
    throw new Error('Expected argument of type card.ScanResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_ScanResponse(buffer_arg) {
  return card_pb.ScanResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_Set1XConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.Set1XConfigMultiRequest)) {
    throw new Error('Expected argument of type card.Set1XConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_Set1XConfigMultiRequest(buffer_arg) {
  return card_pb.Set1XConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_Set1XConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.Set1XConfigMultiResponse)) {
    throw new Error('Expected argument of type card.Set1XConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_Set1XConfigMultiResponse(buffer_arg) {
  return card_pb.Set1XConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_Set1XConfigRequest(arg) {
  if (!(arg instanceof card_pb.Set1XConfigRequest)) {
    throw new Error('Expected argument of type card.Set1XConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_Set1XConfigRequest(buffer_arg) {
  return card_pb.Set1XConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_Set1XConfigResponse(arg) {
  if (!(arg instanceof card_pb.Set1XConfigResponse)) {
    throw new Error('Expected argument of type card.Set1XConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_Set1XConfigResponse(buffer_arg) {
  return card_pb.Set1XConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_SetConfigMultiRequest(arg) {
  if (!(arg instanceof card_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type card.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_SetConfigMultiRequest(buffer_arg) {
  return card_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_SetConfigMultiResponse(arg) {
  if (!(arg instanceof card_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type card.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_SetConfigMultiResponse(buffer_arg) {
  return card_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_SetConfigRequest(arg) {
  if (!(arg instanceof card_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type card.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_SetConfigRequest(buffer_arg) {
  return card_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_SetConfigResponse(arg) {
  if (!(arg instanceof card_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type card.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_SetConfigResponse(buffer_arg) {
  return card_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_WriteRequest(arg) {
  if (!(arg instanceof card_pb.WriteRequest)) {
    throw new Error('Expected argument of type card.WriteRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_WriteRequest(buffer_arg) {
  return card_pb.WriteRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_card_WriteResponse(arg) {
  if (!(arg instanceof card_pb.WriteResponse)) {
    throw new Error('Expected argument of type card.WriteResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_card_WriteResponse(buffer_arg) {
  return card_pb.WriteResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var CardService = exports.CardService = {
  scan: {
    path: '/card.Card/Scan',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.ScanRequest,
    responseType: card_pb.ScanResponse,
    requestSerialize: serialize_card_ScanRequest,
    requestDeserialize: deserialize_card_ScanRequest,
    responseSerialize: serialize_card_ScanResponse,
    responseDeserialize: deserialize_card_ScanResponse,
  },
  erase: {
    path: '/card.Card/Erase',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.EraseRequest,
    responseType: card_pb.EraseResponse,
    requestSerialize: serialize_card_EraseRequest,
    requestDeserialize: deserialize_card_EraseRequest,
    responseSerialize: serialize_card_EraseResponse,
    responseDeserialize: deserialize_card_EraseResponse,
  },
  write: {
    path: '/card.Card/Write',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.WriteRequest,
    responseType: card_pb.WriteResponse,
    requestSerialize: serialize_card_WriteRequest,
    requestDeserialize: deserialize_card_WriteRequest,
    responseSerialize: serialize_card_WriteResponse,
    responseDeserialize: deserialize_card_WriteResponse,
  },
  getConfig: {
    path: '/card.Card/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetConfigRequest,
    responseType: card_pb.GetConfigResponse,
    requestSerialize: serialize_card_GetConfigRequest,
    requestDeserialize: deserialize_card_GetConfigRequest,
    responseSerialize: serialize_card_GetConfigResponse,
    responseDeserialize: deserialize_card_GetConfigResponse,
  },
  setConfig: {
    path: '/card.Card/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetConfigRequest,
    responseType: card_pb.SetConfigResponse,
    requestSerialize: serialize_card_SetConfigRequest,
    requestDeserialize: deserialize_card_SetConfigRequest,
    responseSerialize: serialize_card_SetConfigResponse,
    responseDeserialize: deserialize_card_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/card.Card/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.SetConfigMultiRequest,
    responseType: card_pb.SetConfigMultiResponse,
    requestSerialize: serialize_card_SetConfigMultiRequest,
    requestDeserialize: deserialize_card_SetConfigMultiRequest,
    responseSerialize: serialize_card_SetConfigMultiResponse,
    responseDeserialize: deserialize_card_SetConfigMultiResponse,
  },
  getBlacklist: {
    path: '/card.Card/GetBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.GetBlacklistRequest,
    responseType: card_pb.GetBlacklistResponse,
    requestSerialize: serialize_card_GetBlacklistRequest,
    requestDeserialize: deserialize_card_GetBlacklistRequest,
    responseSerialize: serialize_card_GetBlacklistResponse,
    responseDeserialize: deserialize_card_GetBlacklistResponse,
  },
  addBlacklist: {
    path: '/card.Card/AddBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.AddBlacklistRequest,
    responseType: card_pb.AddBlacklistResponse,
    requestSerialize: serialize_card_AddBlacklistRequest,
    requestDeserialize: deserialize_card_AddBlacklistRequest,
    responseSerialize: serialize_card_AddBlacklistResponse,
    responseDeserialize: deserialize_card_AddBlacklistResponse,
  },
  addBlacklistMulti: {
    path: '/card.Card/AddBlacklistMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.AddBlacklistMultiRequest,
    responseType: card_pb.AddBlacklistMultiResponse,
    requestSerialize: serialize_card_AddBlacklistMultiRequest,
    requestDeserialize: deserialize_card_AddBlacklistMultiRequest,
    responseSerialize: serialize_card_AddBlacklistMultiResponse,
    responseDeserialize: deserialize_card_AddBlacklistMultiResponse,
  },
  deleteBlacklist: {
    path: '/card.Card/DeleteBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteBlacklistRequest,
    responseType: card_pb.DeleteBlacklistResponse,
    requestSerialize: serialize_card_DeleteBlacklistRequest,
    requestDeserialize: deserialize_card_DeleteBlacklistRequest,
    responseSerialize: serialize_card_DeleteBlacklistResponse,
    responseDeserialize: deserialize_card_DeleteBlacklistResponse,
  },
  deleteBlacklistMulti: {
    path: '/card.Card/DeleteBlacklistMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteBlacklistMultiRequest,
    responseType: card_pb.DeleteBlacklistMultiResponse,
    requestSerialize: serialize_card_DeleteBlacklistMultiRequest,
    requestDeserialize: deserialize_card_DeleteBlacklistMultiRequest,
    responseSerialize: serialize_card_DeleteBlacklistMultiResponse,
    responseDeserialize: deserialize_card_DeleteBlacklistMultiResponse,
  },
  deleteAllBlacklist: {
    path: '/card.Card/DeleteAllBlacklist',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteAllBlacklistRequest,
    responseType: card_pb.DeleteAllBlacklistResponse,
    requestSerialize: serialize_card_DeleteAllBlacklistRequest,
    requestDeserialize: deserialize_card_DeleteAllBlacklistRequest,
    responseSerialize: serialize_card_DeleteAllBlacklistResponse,
    responseDeserialize: deserialize_card_DeleteAllBlacklistResponse,
  },
  deleteAllBlacklistMulti: {
    path: '/card.Card/DeleteAllBlacklistMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.DeleteAllBlacklistMultiRequest,
    responseType: card_pb.DeleteAllBlacklistMultiResponse,
    requestSerialize: serialize_card_DeleteAllBlacklistMultiRequest,
    requestDeserialize: deserialize_card_DeleteAllBlacklistMultiRequest,
    responseSerialize: serialize_card_DeleteAllBlacklistMultiResponse,
    responseDeserialize: deserialize_card_DeleteAllBlacklistMultiResponse,
  },
  get1XConfig: {
    path: '/card.Card/Get1XConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.Get1XConfigRequest,
    responseType: card_pb.Get1XConfigResponse,
    requestSerialize: serialize_card_Get1XConfigRequest,
    requestDeserialize: deserialize_card_Get1XConfigRequest,
    responseSerialize: serialize_card_Get1XConfigResponse,
    responseDeserialize: deserialize_card_Get1XConfigResponse,
  },
  set1XConfig: {
    path: '/card.Card/Set1XConfig',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.Set1XConfigRequest,
    responseType: card_pb.Set1XConfigResponse,
    requestSerialize: serialize_card_Set1XConfigRequest,
    requestDeserialize: deserialize_card_Set1XConfigRequest,
    responseSerialize: serialize_card_Set1XConfigResponse,
    responseDeserialize: deserialize_card_Set1XConfigResponse,
  },
  set1XConfigMulti: {
    path: '/card.Card/Set1XConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: card_pb.Set1XConfigMultiRequest,
    responseType: card_pb.Set1XConfigMultiResponse,
    requestSerialize: serialize_card_Set1XConfigMultiRequest,
    requestDeserialize: deserialize_card_Set1XConfigMultiRequest,
    responseSerialize: serialize_card_Set1XConfigMultiResponse,
    responseDeserialize: deserialize_card_Set1XConfigMultiResponse,
  },
};

exports.CardClient = grpc.makeGenericClientConstructor(CardService);
