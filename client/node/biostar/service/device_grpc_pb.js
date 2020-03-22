// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var device_pb = require('./device_pb.js');
var err_pb = require('./err_pb.js');

function serialize_device_ClearDBMultiRequest(arg) {
  if (!(arg instanceof device_pb.ClearDBMultiRequest)) {
    throw new Error('Expected argument of type device.ClearDBMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ClearDBMultiRequest(buffer_arg) {
  return device_pb.ClearDBMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ClearDBMultiResponse(arg) {
  if (!(arg instanceof device_pb.ClearDBMultiResponse)) {
    throw new Error('Expected argument of type device.ClearDBMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ClearDBMultiResponse(buffer_arg) {
  return device_pb.ClearDBMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ClearDBRequest(arg) {
  if (!(arg instanceof device_pb.ClearDBRequest)) {
    throw new Error('Expected argument of type device.ClearDBRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ClearDBRequest(buffer_arg) {
  return device_pb.ClearDBRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ClearDBResponse(arg) {
  if (!(arg instanceof device_pb.ClearDBResponse)) {
    throw new Error('Expected argument of type device.ClearDBResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ClearDBResponse(buffer_arg) {
  return device_pb.ClearDBResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_DeleteRootCARequest(arg) {
  if (!(arg instanceof device_pb.DeleteRootCARequest)) {
    throw new Error('Expected argument of type device.DeleteRootCARequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_DeleteRootCARequest(buffer_arg) {
  return device_pb.DeleteRootCARequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_DeleteRootCAResponse(arg) {
  if (!(arg instanceof device_pb.DeleteRootCAResponse)) {
    throw new Error('Expected argument of type device.DeleteRootCAResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_DeleteRootCAResponse(buffer_arg) {
  return device_pb.DeleteRootCAResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_FactoryResetMultiRequest(arg) {
  if (!(arg instanceof device_pb.FactoryResetMultiRequest)) {
    throw new Error('Expected argument of type device.FactoryResetMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_FactoryResetMultiRequest(buffer_arg) {
  return device_pb.FactoryResetMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_FactoryResetMultiResponse(arg) {
  if (!(arg instanceof device_pb.FactoryResetMultiResponse)) {
    throw new Error('Expected argument of type device.FactoryResetMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_FactoryResetMultiResponse(buffer_arg) {
  return device_pb.FactoryResetMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_FactoryResetRequest(arg) {
  if (!(arg instanceof device_pb.FactoryResetRequest)) {
    throw new Error('Expected argument of type device.FactoryResetRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_FactoryResetRequest(buffer_arg) {
  return device_pb.FactoryResetRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_FactoryResetResponse(arg) {
  if (!(arg instanceof device_pb.FactoryResetResponse)) {
    throw new Error('Expected argument of type device.FactoryResetResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_FactoryResetResponse(buffer_arg) {
  return device_pb.FactoryResetResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_GetCapabilityInfoRequest(arg) {
  if (!(arg instanceof device_pb.GetCapabilityInfoRequest)) {
    throw new Error('Expected argument of type device.GetCapabilityInfoRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_GetCapabilityInfoRequest(buffer_arg) {
  return device_pb.GetCapabilityInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_GetCapabilityInfoResponse(arg) {
  if (!(arg instanceof device_pb.GetCapabilityInfoResponse)) {
    throw new Error('Expected argument of type device.GetCapabilityInfoResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_GetCapabilityInfoResponse(buffer_arg) {
  return device_pb.GetCapabilityInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_GetInfoRequest(arg) {
  if (!(arg instanceof device_pb.GetInfoRequest)) {
    throw new Error('Expected argument of type device.GetInfoRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_GetInfoRequest(buffer_arg) {
  return device_pb.GetInfoRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_GetInfoResponse(arg) {
  if (!(arg instanceof device_pb.GetInfoResponse)) {
    throw new Error('Expected argument of type device.GetInfoResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_GetInfoResponse(buffer_arg) {
  return device_pb.GetInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_LockMultiRequest(arg) {
  if (!(arg instanceof device_pb.LockMultiRequest)) {
    throw new Error('Expected argument of type device.LockMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_LockMultiRequest(buffer_arg) {
  return device_pb.LockMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_LockMultiResponse(arg) {
  if (!(arg instanceof device_pb.LockMultiResponse)) {
    throw new Error('Expected argument of type device.LockMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_LockMultiResponse(buffer_arg) {
  return device_pb.LockMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_LockRequest(arg) {
  if (!(arg instanceof device_pb.LockRequest)) {
    throw new Error('Expected argument of type device.LockRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_LockRequest(buffer_arg) {
  return device_pb.LockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_LockResponse(arg) {
  if (!(arg instanceof device_pb.LockResponse)) {
    throw new Error('Expected argument of type device.LockResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_LockResponse(buffer_arg) {
  return device_pb.LockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_RebootMultiRequest(arg) {
  if (!(arg instanceof device_pb.RebootMultiRequest)) {
    throw new Error('Expected argument of type device.RebootMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_RebootMultiRequest(buffer_arg) {
  return device_pb.RebootMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_RebootMultiResponse(arg) {
  if (!(arg instanceof device_pb.RebootMultiResponse)) {
    throw new Error('Expected argument of type device.RebootMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_RebootMultiResponse(buffer_arg) {
  return device_pb.RebootMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_RebootRequest(arg) {
  if (!(arg instanceof device_pb.RebootRequest)) {
    throw new Error('Expected argument of type device.RebootRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_RebootRequest(buffer_arg) {
  return device_pb.RebootRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_RebootResponse(arg) {
  if (!(arg instanceof device_pb.RebootResponse)) {
    throw new Error('Expected argument of type device.RebootResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_RebootResponse(buffer_arg) {
  return device_pb.RebootResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ResetConfigMultiRequest(arg) {
  if (!(arg instanceof device_pb.ResetConfigMultiRequest)) {
    throw new Error('Expected argument of type device.ResetConfigMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ResetConfigMultiRequest(buffer_arg) {
  return device_pb.ResetConfigMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ResetConfigMultiResponse(arg) {
  if (!(arg instanceof device_pb.ResetConfigMultiResponse)) {
    throw new Error('Expected argument of type device.ResetConfigMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ResetConfigMultiResponse(buffer_arg) {
  return device_pb.ResetConfigMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ResetConfigRequest(arg) {
  if (!(arg instanceof device_pb.ResetConfigRequest)) {
    throw new Error('Expected argument of type device.ResetConfigRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ResetConfigRequest(buffer_arg) {
  return device_pb.ResetConfigRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_ResetConfigResponse(arg) {
  if (!(arg instanceof device_pb.ResetConfigResponse)) {
    throw new Error('Expected argument of type device.ResetConfigResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_ResetConfigResponse(buffer_arg) {
  return device_pb.ResetConfigResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UnlockMultiRequest(arg) {
  if (!(arg instanceof device_pb.UnlockMultiRequest)) {
    throw new Error('Expected argument of type device.UnlockMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UnlockMultiRequest(buffer_arg) {
  return device_pb.UnlockMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UnlockMultiResponse(arg) {
  if (!(arg instanceof device_pb.UnlockMultiResponse)) {
    throw new Error('Expected argument of type device.UnlockMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UnlockMultiResponse(buffer_arg) {
  return device_pb.UnlockMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UnlockRequest(arg) {
  if (!(arg instanceof device_pb.UnlockRequest)) {
    throw new Error('Expected argument of type device.UnlockRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UnlockRequest(buffer_arg) {
  return device_pb.UnlockRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UnlockResponse(arg) {
  if (!(arg instanceof device_pb.UnlockResponse)) {
    throw new Error('Expected argument of type device.UnlockResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UnlockResponse(buffer_arg) {
  return device_pb.UnlockResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UpgradeFirmwareMultiRequest(arg) {
  if (!(arg instanceof device_pb.UpgradeFirmwareMultiRequest)) {
    throw new Error('Expected argument of type device.UpgradeFirmwareMultiRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UpgradeFirmwareMultiRequest(buffer_arg) {
  return device_pb.UpgradeFirmwareMultiRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UpgradeFirmwareMultiResponse(arg) {
  if (!(arg instanceof device_pb.UpgradeFirmwareMultiResponse)) {
    throw new Error('Expected argument of type device.UpgradeFirmwareMultiResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UpgradeFirmwareMultiResponse(buffer_arg) {
  return device_pb.UpgradeFirmwareMultiResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UpgradeFirmwareRequest(arg) {
  if (!(arg instanceof device_pb.UpgradeFirmwareRequest)) {
    throw new Error('Expected argument of type device.UpgradeFirmwareRequest');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UpgradeFirmwareRequest(buffer_arg) {
  return device_pb.UpgradeFirmwareRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_device_UpgradeFirmwareResponse(arg) {
  if (!(arg instanceof device_pb.UpgradeFirmwareResponse)) {
    throw new Error('Expected argument of type device.UpgradeFirmwareResponse');
  }
  return new Buffer(arg.serializeBinary());
}

function deserialize_device_UpgradeFirmwareResponse(buffer_arg) {
  return device_pb.UpgradeFirmwareResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var DeviceService = exports.DeviceService = {
  getInfo: {
    path: '/device.Device/GetInfo',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.GetInfoRequest,
    responseType: device_pb.GetInfoResponse,
    requestSerialize: serialize_device_GetInfoRequest,
    requestDeserialize: deserialize_device_GetInfoRequest,
    responseSerialize: serialize_device_GetInfoResponse,
    responseDeserialize: deserialize_device_GetInfoResponse,
  },
  getCapabilityInfo: {
    path: '/device.Device/GetCapabilityInfo',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.GetCapabilityInfoRequest,
    responseType: device_pb.GetCapabilityInfoResponse,
    requestSerialize: serialize_device_GetCapabilityInfoRequest,
    requestDeserialize: deserialize_device_GetCapabilityInfoRequest,
    responseSerialize: serialize_device_GetCapabilityInfoResponse,
    responseDeserialize: deserialize_device_GetCapabilityInfoResponse,
  },
  deleteRootCA: {
    path: '/device.Device/DeleteRootCA',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.DeleteRootCARequest,
    responseType: device_pb.DeleteRootCAResponse,
    requestSerialize: serialize_device_DeleteRootCARequest,
    requestDeserialize: deserialize_device_DeleteRootCARequest,
    responseSerialize: serialize_device_DeleteRootCAResponse,
    responseDeserialize: deserialize_device_DeleteRootCAResponse,
  },
  lock: {
    path: '/device.Device/Lock',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.LockRequest,
    responseType: device_pb.LockResponse,
    requestSerialize: serialize_device_LockRequest,
    requestDeserialize: deserialize_device_LockRequest,
    responseSerialize: serialize_device_LockResponse,
    responseDeserialize: deserialize_device_LockResponse,
  },
  lockMulti: {
    path: '/device.Device/LockMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.LockMultiRequest,
    responseType: device_pb.LockMultiResponse,
    requestSerialize: serialize_device_LockMultiRequest,
    requestDeserialize: deserialize_device_LockMultiRequest,
    responseSerialize: serialize_device_LockMultiResponse,
    responseDeserialize: deserialize_device_LockMultiResponse,
  },
  unlock: {
    path: '/device.Device/Unlock',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.UnlockRequest,
    responseType: device_pb.UnlockResponse,
    requestSerialize: serialize_device_UnlockRequest,
    requestDeserialize: deserialize_device_UnlockRequest,
    responseSerialize: serialize_device_UnlockResponse,
    responseDeserialize: deserialize_device_UnlockResponse,
  },
  unlockMulti: {
    path: '/device.Device/UnlockMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.UnlockMultiRequest,
    responseType: device_pb.UnlockMultiResponse,
    requestSerialize: serialize_device_UnlockMultiRequest,
    requestDeserialize: deserialize_device_UnlockMultiRequest,
    responseSerialize: serialize_device_UnlockMultiResponse,
    responseDeserialize: deserialize_device_UnlockMultiResponse,
  },
  reboot: {
    path: '/device.Device/Reboot',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.RebootRequest,
    responseType: device_pb.RebootResponse,
    requestSerialize: serialize_device_RebootRequest,
    requestDeserialize: deserialize_device_RebootRequest,
    responseSerialize: serialize_device_RebootResponse,
    responseDeserialize: deserialize_device_RebootResponse,
  },
  rebootMulti: {
    path: '/device.Device/RebootMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.RebootMultiRequest,
    responseType: device_pb.RebootMultiResponse,
    requestSerialize: serialize_device_RebootMultiRequest,
    requestDeserialize: deserialize_device_RebootMultiRequest,
    responseSerialize: serialize_device_RebootMultiResponse,
    responseDeserialize: deserialize_device_RebootMultiResponse,
  },
  factoryReset: {
    path: '/device.Device/FactoryReset',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.FactoryResetRequest,
    responseType: device_pb.FactoryResetResponse,
    requestSerialize: serialize_device_FactoryResetRequest,
    requestDeserialize: deserialize_device_FactoryResetRequest,
    responseSerialize: serialize_device_FactoryResetResponse,
    responseDeserialize: deserialize_device_FactoryResetResponse,
  },
  factoryResetMulti: {
    path: '/device.Device/FactoryResetMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.FactoryResetMultiRequest,
    responseType: device_pb.FactoryResetMultiResponse,
    requestSerialize: serialize_device_FactoryResetMultiRequest,
    requestDeserialize: deserialize_device_FactoryResetMultiRequest,
    responseSerialize: serialize_device_FactoryResetMultiResponse,
    responseDeserialize: deserialize_device_FactoryResetMultiResponse,
  },
  clearDB: {
    path: '/device.Device/ClearDB',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.ClearDBRequest,
    responseType: device_pb.ClearDBResponse,
    requestSerialize: serialize_device_ClearDBRequest,
    requestDeserialize: deserialize_device_ClearDBRequest,
    responseSerialize: serialize_device_ClearDBResponse,
    responseDeserialize: deserialize_device_ClearDBResponse,
  },
  clearDBMulti: {
    path: '/device.Device/ClearDBMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.ClearDBMultiRequest,
    responseType: device_pb.ClearDBMultiResponse,
    requestSerialize: serialize_device_ClearDBMultiRequest,
    requestDeserialize: deserialize_device_ClearDBMultiRequest,
    responseSerialize: serialize_device_ClearDBMultiResponse,
    responseDeserialize: deserialize_device_ClearDBMultiResponse,
  },
  resetConfig: {
    path: '/device.Device/ResetConfig',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.ResetConfigRequest,
    responseType: device_pb.ResetConfigResponse,
    requestSerialize: serialize_device_ResetConfigRequest,
    requestDeserialize: deserialize_device_ResetConfigRequest,
    responseSerialize: serialize_device_ResetConfigResponse,
    responseDeserialize: deserialize_device_ResetConfigResponse,
  },
  resetConfigMulti: {
    path: '/device.Device/ResetConfigMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.ResetConfigMultiRequest,
    responseType: device_pb.ResetConfigMultiResponse,
    requestSerialize: serialize_device_ResetConfigMultiRequest,
    requestDeserialize: deserialize_device_ResetConfigMultiRequest,
    responseSerialize: serialize_device_ResetConfigMultiResponse,
    responseDeserialize: deserialize_device_ResetConfigMultiResponse,
  },
  upgradeFirmware: {
    path: '/device.Device/UpgradeFirmware',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.UpgradeFirmwareRequest,
    responseType: device_pb.UpgradeFirmwareResponse,
    requestSerialize: serialize_device_UpgradeFirmwareRequest,
    requestDeserialize: deserialize_device_UpgradeFirmwareRequest,
    responseSerialize: serialize_device_UpgradeFirmwareResponse,
    responseDeserialize: deserialize_device_UpgradeFirmwareResponse,
  },
  upgradeFirmwareMulti: {
    path: '/device.Device/UpgradeFirmwareMulti',
    requestStream: false,
    responseStream: false,
    requestType: device_pb.UpgradeFirmwareMultiRequest,
    responseType: device_pb.UpgradeFirmwareMultiResponse,
    requestSerialize: serialize_device_UpgradeFirmwareMultiRequest,
    requestDeserialize: deserialize_device_UpgradeFirmwareMultiRequest,
    responseSerialize: serialize_device_UpgradeFirmwareMultiResponse,
    responseDeserialize: deserialize_device_UpgradeFirmwareMultiResponse,
  },
};

exports.DeviceClient = grpc.makeGenericClientConstructor(DeviceService);
