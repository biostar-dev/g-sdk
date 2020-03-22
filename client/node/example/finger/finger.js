const fingerMessage = require('../../biostar/service/finger_pb');
const fingerService = require('../../biostar/service/finger_grpc_pb');

var fingerClient = null;

function initClient(addr, credential) {
  fingerClient = new fingerService.FingerClient(addr, credential);

  return fingerClient
}

function getClient() {
  return fingerClient;
}

function scan(devID, format, threshold) {
  var req = new fingerMessage.ScanRequest();
  req.setDeviceid(devID);
  req.setTemplateformat(format);
  req.setQualitythreshold(threshold);

  return new Promise((resolve, reject) => {
    fingerClient.scan(req, (err, response) => {
      if(err) {
        console.error('Cannot scan a fingerprint: ', err)
        reject(err);
        return;
      }

      resolve(response.getTemplatedata());
    });
  });
}

function getImage(devID) {
  var req = new fingerMessage.GetImageRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    fingerClient.getImage(req, (err, response) => {
      if(err) {
        console.error('Cannot get the fingerprint image: ', err)
        reject(err);
        return;
      }

      resolve(response.getBmpimage());
    });
  });
}

function getConfig(devID) {
  var req = new fingerMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    fingerClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the fingerprint config: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().config);
    });
  });
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.scan = scan;
module.exports.getImage = getImage;
module.exports.getConfig = getConfig;
module.exports.fingerMessage = fingerMessage;
module.exports.TemplateFormat = fingerMessage.TemplateFormat;
