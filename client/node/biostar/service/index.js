var deviceMessage = require('./device/device_pb');
var deviceService = require('./device/device_grpc_pb');

var userMessage = require('./user/user_pb');
var userService = require('./user/user_grpc_pb');

function getDeviceClient(addr, credential) {
  return new deviceService.DeviceClient(addr, credential);
}

function getUserClient(addr, credential) {
  return new userService.UserClient(addr, credential);
}

exports.getDeviceClient = getDeviceClient;
exports.deviceMessage = deviceMessage;

exports.getUserClient = getUserClient;
exports.userMessage = userMessage;

