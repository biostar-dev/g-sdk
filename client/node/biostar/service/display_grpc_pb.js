// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var display_pb = require('./display_pb.js');
var err_pb = require('./err_pb.js');

function serialize_display_GetConfigRequest(arg) {
  if (!(arg instanceof display_pb.GetConfigRequest)) {
    throw new Error('Expected argument of type display.GetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_GetConfigRequest(buffer_arg) {
  return display_pb.GetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_GetConfigResponse(arg) {
  if (!(arg instanceof display_pb.GetConfigResponse)) {
    throw new Error('Expected argument of type display.GetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_GetConfigResponse(buffer_arg) {
  return display_pb.GetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_SetConfigMultiRequest(arg) {
  if (!(arg instanceof display_pb.SetConfigMultiRequest)) {
    throw new Error('Expected argument of type display.SetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_SetConfigMultiRequest(buffer_arg) {
  return display_pb.SetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_SetConfigMultiResponse(arg) {
  if (!(arg instanceof display_pb.SetConfigMultiResponse)) {
    throw new Error('Expected argument of type display.SetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_SetConfigMultiResponse(buffer_arg) {
  return display_pb.SetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_SetConfigRequest(arg) {
  if (!(arg instanceof display_pb.SetConfigRequest)) {
    throw new Error('Expected argument of type display.SetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_SetConfigRequest(buffer_arg) {
  return display_pb.SetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_SetConfigResponse(arg) {
  if (!(arg instanceof display_pb.SetConfigResponse)) {
    throw new Error('Expected argument of type display.SetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_SetConfigResponse(buffer_arg) {
  return display_pb.SetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_UpdateLanguagePackMultiRequest(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackMultiRequest)) {
    throw new Error('Expected argument of type display.UpdateLanguagePackMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_UpdateLanguagePackMultiRequest(buffer_arg) {
  return display_pb.UpdateLanguagePackMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_UpdateLanguagePackMultiResponse(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackMultiResponse)) {
    throw new Error('Expected argument of type display.UpdateLanguagePackMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_UpdateLanguagePackMultiResponse(buffer_arg) {
  return display_pb.UpdateLanguagePackMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_UpdateLanguagePackRequest(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackRequest)) {
    throw new Error('Expected argument of type display.UpdateLanguagePackRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_UpdateLanguagePackRequest(buffer_arg) {
  return display_pb.UpdateLanguagePackRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_display_UpdateLanguagePackResponse(arg) {
  if (!(arg instanceof display_pb.UpdateLanguagePackResponse)) {
    throw new Error('Expected argument of type display.UpdateLanguagePackResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_display_UpdateLanguagePackResponse(buffer_arg) {
  return display_pb.UpdateLanguagePackResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DisplayService = exports.DisplayService = {
  updateLanguagePack: {
    path: '/display.Display/UpdateLanguagePack',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateLanguagePackRequest,
    responseType: display_pb.UpdateLanguagePackResponse,
    requestSerialize: serialize_display_UpdateLanguagePackRequest,
    requestDeserialize: deserialize_display_UpdateLanguagePackRequest,
    responseSerialize: serialize_display_UpdateLanguagePackResponse,
    responseDeserialize: deserialize_display_UpdateLanguagePackResponse,
  },
  updateLanguagePackMulti: {
    path: '/display.Display/UpdateLanguagePackMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.UpdateLanguagePackMultiRequest,
    responseType: display_pb.UpdateLanguagePackMultiResponse,
    requestSerialize: serialize_display_UpdateLanguagePackMultiRequest,
    requestDeserialize: deserialize_display_UpdateLanguagePackMultiRequest,
    responseSerialize: serialize_display_UpdateLanguagePackMultiResponse,
    responseDeserialize: deserialize_display_UpdateLanguagePackMultiResponse,
  },
  //  
  // rpc UpdateNotice(UpdateNoticeRequest) returns (UpdateNoticeResponse);
  // rpc UpdateNoticeMulti(UpdateNoticeMultiRequest) returns (UpdateNoticeMultiResponse);
  //
  // rpc UpdateBackgroundImage(UpdateBackgroundImageRequest) returns (UpdateBackgroundImageResponse);
  // rpc UpdateBackgroundImageMulti(UpdateBackgroundImageMultiRequest) returns (UpdateBackgroundImageMultiResponse);
  //
  // rpc UpdateSlideImages(UpdateSlideImagesRequest) returns (UpdateSlideImagesResponse);
  // rpc UpdateSlideImagesMulti(UpdateSlideImagesMultiRequest) returns (UpdateSlideImagesMultiResponse);
  //
  // rpc UpdateSound(UpdateSoundRequest) returns (UpdateSoundResponse);
  // rpc UpdateSoundMulti(UpdateSoundMultiRequest) returns (UpdateSoundMultiResponse); 
  //
  getConfig: {
    path: '/display.Display/GetConfig',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.GetConfigRequest,
    responseType: display_pb.GetConfigResponse,
    requestSerialize: serialize_display_GetConfigRequest,
    requestDeserialize: deserialize_display_GetConfigRequest,
    responseSerialize: serialize_display_GetConfigResponse,
    responseDeserialize: deserialize_display_GetConfigResponse,
  },
  setConfig: {
    path: '/display.Display/SetConfig',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.SetConfigRequest,
    responseType: display_pb.SetConfigResponse,
    requestSerialize: serialize_display_SetConfigRequest,
    requestDeserialize: deserialize_display_SetConfigRequest,
    responseSerialize: serialize_display_SetConfigResponse,
    responseDeserialize: deserialize_display_SetConfigResponse,
  },
  setConfigMulti: {
    path: '/display.Display/SetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: display_pb.SetConfigMultiRequest,
    responseType: display_pb.SetConfigMultiResponse,
    requestSerialize: serialize_display_SetConfigMultiRequest,
    requestDeserialize: deserialize_display_SetConfigMultiRequest,
    responseSerialize: serialize_display_SetConfigMultiResponse,
    responseDeserialize: deserialize_display_SetConfigMultiResponse,
  },
};

exports.DisplayClient = grpc.makeGenericClientConstructor(DisplayService);
