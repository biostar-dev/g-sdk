const connectMessage = require('../../biostar/service/connect_pb');
const connectService = require('../../biostar/service/connect_grpc_pb');

var connClient = null;

function initClient(addr, credential) {
  connClient = new connectService.ConnectClient(addr, credential);
}

function getClient() {
  return connClient;
}

function getDeviceList() {
  var req = new connectMessage.GetDeviceListRequest();

  return new Promise((resolve, reject) => {
    connClient.getDeviceList(req, (err, response) => {
      if(err) {
        console.error('Cannot get device list: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().deviceinfosList);
    });
  });
}


function searchDevice(timeout) {
  var req = new connectMessage.SearchDeviceRequest();
  req.setTimeout(timeout);

  return new Promise((resolve, reject) => {
    connClient.searchDevice(req, (err, response) => {
      if(err) {
        console.error('Cannot search device: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().deviceinfosList);
    });
  });
}

function subscribe(queueSize) {
  var req = new connectMessage.SubscribeStatusRequest();
  req.setQueuesize(queueSize);

  return connClient.subscribeStatus(req);
}

module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getDeviceList = getDeviceList;
module.exports.searchDevice = searchDevice;
module.exports.subscribe = subscribe;
module.exports.connectMessage = connectMessage;
