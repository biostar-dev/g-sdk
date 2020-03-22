const deviceMessage = require('../../biostar/service/device_pb');
const deviceService = require('../../biostar/service/device_grpc_pb');

var deviceClient = null;

function initClient(addr, credential) {
  deviceClient = new deviceService.DeviceClient(addr, credential);

  return deviceClient
}

function getClient() {
  return deviceClient;
}

function getInfo(devID) {
  var req = new deviceMessage.GetInfoRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    deviceClient.getInfo(req, (err, response) => {
      if(err) {
        console.error('Cannot get the device info: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().info);
    });
  });
}


function getCapabilityInfo(devID) {
  var req = new deviceMessage.GetCapabilityInfoRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    deviceClient.getCapabilityInfo(req, (err, response) => {
      if(err) {
        console.error('Cannot get the capability info: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().capinfo);
    });
  });
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getInfo = getInfo;
module.exports.getCapabilityInfo = getCapabilityInfo;
