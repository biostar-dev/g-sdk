const connectMessage = require('../../biostar/service/connect_pb');
const connect = require('./connect');

function connectToDevice(addr, port, useSSL) {
  var connInfo = new connectMessage.ConnectInfo();
  connInfo.setIpaddr(addr);
  connInfo.setPort(port);
  connInfo.setUsessl(useSSL);

  var req = new connectMessage.ConnectRequest();
  req.setConnectinfo(connInfo);

  return new Promise((resolve, reject) => {
    connect.getClient().connect(req, (err, response) => {
      if(err) {
        console.error('Cannot connect to the device: ', err)
        reject(err);
        return;
      }

      resolve(response.getDeviceid());
    });
  });
}

function disconnect(deviceIDs) {
  var req = new connectMessage.DisconnectRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connect.getClient().disconnect(req, (err, response) => {
      if(err) {
        console.error('Cannot disconnect: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function disconnectAll() {
  var req = new connectMessage.DisconnectAllRequest();

  return new Promise((resolve, reject) => {
    connect.getClient().disconnectAll(req, (err, response) => {
      if(err) {
        console.error('Cannot disconnect all: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


module.exports.connectToDevice = connectToDevice;
module.exports.disconnect = disconnect;
module.exports.disconnectAll = disconnectAll;