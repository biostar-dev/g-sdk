// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var connect_pb = require('./connect_pb.js');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_connect_AddAsyncConnectionRequest(arg) {
  if (!(arg instanceof connect_pb.AddAsyncConnectionRequest)) {
    throw new Error('Expected argument of type connect.AddAsyncConnectionRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_AddAsyncConnectionRequest(buffer_arg) {
  return connect_pb.AddAsyncConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_AddAsyncConnectionResponse(arg) {
  if (!(arg instanceof connect_pb.AddAsyncConnectionResponse)) {
    throw new Error('Expected argument of type connect.AddAsyncConnectionResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_AddAsyncConnectionResponse(buffer_arg) {
  return connect_pb.AddAsyncConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_ConnectRequest(arg) {
  if (!(arg instanceof connect_pb.ConnectRequest)) {
    throw new Error('Expected argument of type connect.ConnectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_ConnectRequest(buffer_arg) {
  return connect_pb.ConnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_ConnectResponse(arg) {
  if (!(arg instanceof connect_pb.ConnectResponse)) {
    throw new Error('Expected argument of type connect.ConnectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_ConnectResponse(buffer_arg) {
  return connect_pb.ConnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DeleteAsyncConnectionRequest(arg) {
  if (!(arg instanceof connect_pb.DeleteAsyncConnectionRequest)) {
    throw new Error('Expected argument of type connect.DeleteAsyncConnectionRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DeleteAsyncConnectionRequest(buffer_arg) {
  return connect_pb.DeleteAsyncConnectionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DeleteAsyncConnectionResponse(arg) {
  if (!(arg instanceof connect_pb.DeleteAsyncConnectionResponse)) {
    throw new Error('Expected argument of type connect.DeleteAsyncConnectionResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DeleteAsyncConnectionResponse(buffer_arg) {
  return connect_pb.DeleteAsyncConnectionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisableSSLMultiRequest(arg) {
  if (!(arg instanceof connect_pb.DisableSSLMultiRequest)) {
    throw new Error('Expected argument of type connect.DisableSSLMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisableSSLMultiRequest(buffer_arg) {
  return connect_pb.DisableSSLMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisableSSLMultiResponse(arg) {
  if (!(arg instanceof connect_pb.DisableSSLMultiResponse)) {
    throw new Error('Expected argument of type connect.DisableSSLMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisableSSLMultiResponse(buffer_arg) {
  return connect_pb.DisableSSLMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisableSSLRequest(arg) {
  if (!(arg instanceof connect_pb.DisableSSLRequest)) {
    throw new Error('Expected argument of type connect.DisableSSLRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisableSSLRequest(buffer_arg) {
  return connect_pb.DisableSSLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisableSSLResponse(arg) {
  if (!(arg instanceof connect_pb.DisableSSLResponse)) {
    throw new Error('Expected argument of type connect.DisableSSLResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisableSSLResponse(buffer_arg) {
  return connect_pb.DisableSSLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisconnectAllRequest(arg) {
  if (!(arg instanceof connect_pb.DisconnectAllRequest)) {
    throw new Error('Expected argument of type connect.DisconnectAllRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisconnectAllRequest(buffer_arg) {
  return connect_pb.DisconnectAllRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisconnectAllResponse(arg) {
  if (!(arg instanceof connect_pb.DisconnectAllResponse)) {
    throw new Error('Expected argument of type connect.DisconnectAllResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisconnectAllResponse(buffer_arg) {
  return connect_pb.DisconnectAllResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisconnectRequest(arg) {
  if (!(arg instanceof connect_pb.DisconnectRequest)) {
    throw new Error('Expected argument of type connect.DisconnectRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisconnectRequest(buffer_arg) {
  return connect_pb.DisconnectRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_DisconnectResponse(arg) {
  if (!(arg instanceof connect_pb.DisconnectResponse)) {
    throw new Error('Expected argument of type connect.DisconnectResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_DisconnectResponse(buffer_arg) {
  return connect_pb.DisconnectResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_EnableSSLMultiRequest(arg) {
  if (!(arg instanceof connect_pb.EnableSSLMultiRequest)) {
    throw new Error('Expected argument of type connect.EnableSSLMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_EnableSSLMultiRequest(buffer_arg) {
  return connect_pb.EnableSSLMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_EnableSSLMultiResponse(arg) {
  if (!(arg instanceof connect_pb.EnableSSLMultiResponse)) {
    throw new Error('Expected argument of type connect.EnableSSLMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_EnableSSLMultiResponse(buffer_arg) {
  return connect_pb.EnableSSLMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_EnableSSLRequest(arg) {
  if (!(arg instanceof connect_pb.EnableSSLRequest)) {
    throw new Error('Expected argument of type connect.EnableSSLRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_EnableSSLRequest(buffer_arg) {
  return connect_pb.EnableSSLRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_EnableSSLResponse(arg) {
  if (!(arg instanceof connect_pb.EnableSSLResponse)) {
    throw new Error('Expected argument of type connect.EnableSSLResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_EnableSSLResponse(buffer_arg) {
  return connect_pb.EnableSSLResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_GetAcceptFilterRequest(arg) {
  if (!(arg instanceof connect_pb.GetAcceptFilterRequest)) {
    throw new Error('Expected argument of type connect.GetAcceptFilterRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_GetAcceptFilterRequest(buffer_arg) {
  return connect_pb.GetAcceptFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_GetAcceptFilterResponse(arg) {
  if (!(arg instanceof connect_pb.GetAcceptFilterResponse)) {
    throw new Error('Expected argument of type connect.GetAcceptFilterResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_GetAcceptFilterResponse(buffer_arg) {
  return connect_pb.GetAcceptFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_GetDeviceListRequest(arg) {
  if (!(arg instanceof connect_pb.GetDeviceListRequest)) {
    throw new Error('Expected argument of type connect.GetDeviceListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_GetDeviceListRequest(buffer_arg) {
  return connect_pb.GetDeviceListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_GetDeviceListResponse(arg) {
  if (!(arg instanceof connect_pb.GetDeviceListResponse)) {
    throw new Error('Expected argument of type connect.GetDeviceListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_GetDeviceListResponse(buffer_arg) {
  return connect_pb.GetDeviceListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_GetPendingListRequest(arg) {
  if (!(arg instanceof connect_pb.GetPendingListRequest)) {
    throw new Error('Expected argument of type connect.GetPendingListRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_GetPendingListRequest(buffer_arg) {
  return connect_pb.GetPendingListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_GetPendingListResponse(arg) {
  if (!(arg instanceof connect_pb.GetPendingListResponse)) {
    throw new Error('Expected argument of type connect.GetPendingListResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_GetPendingListResponse(buffer_arg) {
  return connect_pb.GetPendingListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SearchDeviceRequest(arg) {
  if (!(arg instanceof connect_pb.SearchDeviceRequest)) {
    throw new Error('Expected argument of type connect.SearchDeviceRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SearchDeviceRequest(buffer_arg) {
  return connect_pb.SearchDeviceRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SearchDeviceResponse(arg) {
  if (!(arg instanceof connect_pb.SearchDeviceResponse)) {
    throw new Error('Expected argument of type connect.SearchDeviceResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SearchDeviceResponse(buffer_arg) {
  return connect_pb.SearchDeviceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SetAcceptFilterRequest(arg) {
  if (!(arg instanceof connect_pb.SetAcceptFilterRequest)) {
    throw new Error('Expected argument of type connect.SetAcceptFilterRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SetAcceptFilterRequest(buffer_arg) {
  return connect_pb.SetAcceptFilterRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SetAcceptFilterResponse(arg) {
  if (!(arg instanceof connect_pb.SetAcceptFilterResponse)) {
    throw new Error('Expected argument of type connect.SetAcceptFilterResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SetAcceptFilterResponse(buffer_arg) {
  return connect_pb.SetAcceptFilterResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SetConnectionModeMultiRequest(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeMultiRequest)) {
    throw new Error('Expected argument of type connect.SetConnectionModeMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SetConnectionModeMultiRequest(buffer_arg) {
  return connect_pb.SetConnectionModeMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SetConnectionModeMultiResponse(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeMultiResponse)) {
    throw new Error('Expected argument of type connect.SetConnectionModeMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SetConnectionModeMultiResponse(buffer_arg) {
  return connect_pb.SetConnectionModeMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SetConnectionModeRequest(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeRequest)) {
    throw new Error('Expected argument of type connect.SetConnectionModeRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SetConnectionModeRequest(buffer_arg) {
  return connect_pb.SetConnectionModeRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SetConnectionModeResponse(arg) {
  if (!(arg instanceof connect_pb.SetConnectionModeResponse)) {
    throw new Error('Expected argument of type connect.SetConnectionModeResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SetConnectionModeResponse(buffer_arg) {
  return connect_pb.SetConnectionModeResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_StatusChange(arg) {
  if (!(arg instanceof connect_pb.StatusChange)) {
    throw new Error('Expected argument of type connect.StatusChange');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_StatusChange(buffer_arg) {
  return connect_pb.StatusChange.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_connect_SubscribeStatusRequest(arg) {
  if (!(arg instanceof connect_pb.SubscribeStatusRequest)) {
    throw new Error('Expected argument of type connect.SubscribeStatusRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_connect_SubscribeStatusRequest(buffer_arg) {
  return connect_pb.SubscribeStatusRequest.deserializeBinary(new Uint8Array(buffer_arg));
}


var ConnectService = exports.ConnectService = {
  connect: {
    path: '/connect.Connect/Connect',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.ConnectRequest,
    responseType: connect_pb.ConnectResponse,
    requestSerialize: serialize_connect_ConnectRequest,
    requestDeserialize: deserialize_connect_ConnectRequest,
    responseSerialize: serialize_connect_ConnectResponse,
    responseDeserialize: deserialize_connect_ConnectResponse,
  },
  addAsyncConnection: {
    path: '/connect.Connect/AddAsyncConnection',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.AddAsyncConnectionRequest,
    responseType: connect_pb.AddAsyncConnectionResponse,
    requestSerialize: serialize_connect_AddAsyncConnectionRequest,
    requestDeserialize: deserialize_connect_AddAsyncConnectionRequest,
    responseSerialize: serialize_connect_AddAsyncConnectionResponse,
    responseDeserialize: deserialize_connect_AddAsyncConnectionResponse,
  },
  deleteAsyncConnection: {
    path: '/connect.Connect/DeleteAsyncConnection',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DeleteAsyncConnectionRequest,
    responseType: connect_pb.DeleteAsyncConnectionResponse,
    requestSerialize: serialize_connect_DeleteAsyncConnectionRequest,
    requestDeserialize: deserialize_connect_DeleteAsyncConnectionRequest,
    responseSerialize: serialize_connect_DeleteAsyncConnectionResponse,
    responseDeserialize: deserialize_connect_DeleteAsyncConnectionResponse,
  },
  setAcceptFilter: {
    path: '/connect.Connect/SetAcceptFilter',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetAcceptFilterRequest,
    responseType: connect_pb.SetAcceptFilterResponse,
    requestSerialize: serialize_connect_SetAcceptFilterRequest,
    requestDeserialize: deserialize_connect_SetAcceptFilterRequest,
    responseSerialize: serialize_connect_SetAcceptFilterResponse,
    responseDeserialize: deserialize_connect_SetAcceptFilterResponse,
  },
  getAcceptFilter: {
    path: '/connect.Connect/GetAcceptFilter',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetAcceptFilterRequest,
    responseType: connect_pb.GetAcceptFilterResponse,
    requestSerialize: serialize_connect_GetAcceptFilterRequest,
    requestDeserialize: deserialize_connect_GetAcceptFilterRequest,
    responseSerialize: serialize_connect_GetAcceptFilterResponse,
    responseDeserialize: deserialize_connect_GetAcceptFilterResponse,
  },
  getPendingList: {
    path: '/connect.Connect/GetPendingList',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetPendingListRequest,
    responseType: connect_pb.GetPendingListResponse,
    requestSerialize: serialize_connect_GetPendingListRequest,
    requestDeserialize: deserialize_connect_GetPendingListRequest,
    responseSerialize: serialize_connect_GetPendingListResponse,
    responseDeserialize: deserialize_connect_GetPendingListResponse,
  },
  getDeviceList: {
    path: '/connect.Connect/GetDeviceList',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.GetDeviceListRequest,
    responseType: connect_pb.GetDeviceListResponse,
    requestSerialize: serialize_connect_GetDeviceListRequest,
    requestDeserialize: deserialize_connect_GetDeviceListRequest,
    responseSerialize: serialize_connect_GetDeviceListResponse,
    responseDeserialize: deserialize_connect_GetDeviceListResponse,
  },
  disconnect: {
    path: '/connect.Connect/Disconnect',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisconnectRequest,
    responseType: connect_pb.DisconnectResponse,
    requestSerialize: serialize_connect_DisconnectRequest,
    requestDeserialize: deserialize_connect_DisconnectRequest,
    responseSerialize: serialize_connect_DisconnectResponse,
    responseDeserialize: deserialize_connect_DisconnectResponse,
  },
  disconnectAll: {
    path: '/connect.Connect/DisconnectAll',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisconnectAllRequest,
    responseType: connect_pb.DisconnectAllResponse,
    requestSerialize: serialize_connect_DisconnectAllRequest,
    requestDeserialize: deserialize_connect_DisconnectAllRequest,
    responseSerialize: serialize_connect_DisconnectAllResponse,
    responseDeserialize: deserialize_connect_DisconnectAllResponse,
  },
  searchDevice: {
    path: '/connect.Connect/SearchDevice',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SearchDeviceRequest,
    responseType: connect_pb.SearchDeviceResponse,
    requestSerialize: serialize_connect_SearchDeviceRequest,
    requestDeserialize: deserialize_connect_SearchDeviceRequest,
    responseSerialize: serialize_connect_SearchDeviceResponse,
    responseDeserialize: deserialize_connect_SearchDeviceResponse,
  },
  setConnectionMode: {
    path: '/connect.Connect/SetConnectionMode',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetConnectionModeRequest,
    responseType: connect_pb.SetConnectionModeResponse,
    requestSerialize: serialize_connect_SetConnectionModeRequest,
    requestDeserialize: deserialize_connect_SetConnectionModeRequest,
    responseSerialize: serialize_connect_SetConnectionModeResponse,
    responseDeserialize: deserialize_connect_SetConnectionModeResponse,
  },
  setConnectionModeMulti: {
    path: '/connect.Connect/SetConnectionModeMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.SetConnectionModeMultiRequest,
    responseType: connect_pb.SetConnectionModeMultiResponse,
    requestSerialize: serialize_connect_SetConnectionModeMultiRequest,
    requestDeserialize: deserialize_connect_SetConnectionModeMultiRequest,
    responseSerialize: serialize_connect_SetConnectionModeMultiResponse,
    responseDeserialize: deserialize_connect_SetConnectionModeMultiResponse,
  },
  enableSSL: {
    path: '/connect.Connect/EnableSSL',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.EnableSSLRequest,
    responseType: connect_pb.EnableSSLResponse,
    requestSerialize: serialize_connect_EnableSSLRequest,
    requestDeserialize: deserialize_connect_EnableSSLRequest,
    responseSerialize: serialize_connect_EnableSSLResponse,
    responseDeserialize: deserialize_connect_EnableSSLResponse,
  },
  enableSSLMulti: {
    path: '/connect.Connect/EnableSSLMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.EnableSSLMultiRequest,
    responseType: connect_pb.EnableSSLMultiResponse,
    requestSerialize: serialize_connect_EnableSSLMultiRequest,
    requestDeserialize: deserialize_connect_EnableSSLMultiRequest,
    responseSerialize: serialize_connect_EnableSSLMultiResponse,
    responseDeserialize: deserialize_connect_EnableSSLMultiResponse,
  },
  disableSSL: {
    path: '/connect.Connect/DisableSSL',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisableSSLRequest,
    responseType: connect_pb.DisableSSLResponse,
    requestSerialize: serialize_connect_DisableSSLRequest,
    requestDeserialize: deserialize_connect_DisableSSLRequest,
    responseSerialize: serialize_connect_DisableSSLResponse,
    responseDeserialize: deserialize_connect_DisableSSLResponse,
  },
  disableSSLMulti: {
    path: '/connect.Connect/DisableSSLMulti',
    requestStream: false,
    responseStream: false,
    requestType: connect_pb.DisableSSLMultiRequest,
    responseType: connect_pb.DisableSSLMultiResponse,
    requestSerialize: serialize_connect_DisableSSLMultiRequest,
    requestDeserialize: deserialize_connect_DisableSSLMultiRequest,
    responseSerialize: serialize_connect_DisableSSLMultiResponse,
    responseDeserialize: deserialize_connect_DisableSSLMultiResponse,
  },
  subscribeStatus: {
    path: '/connect.Connect/SubscribeStatus',
    requestStream: false,
    responseStream: true,
    requestType: connect_pb.SubscribeStatusRequest,
    responseType: connect_pb.StatusChange,
    requestSerialize: serialize_connect_SubscribeStatusRequest,
    requestDeserialize: deserialize_connect_SubscribeStatusRequest,
    responseSerialize: serialize_connect_StatusChange,
    responseDeserialize: deserialize_connect_StatusChange,
  },
};

exports.ConnectClient = grpc.makeGenericClientConstructor(ConnectService);
