const connectMessage = require('../../biostar/service/connect_pb');
const connect = require('./connect');

function enableSSL(deviceIDs) {
  var req = new connectMessage.EnableSSLMultiRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connect.getClient().enableSSLMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot enable SSL: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function disableSSL(deviceIDs) {
  var req = new connectMessage.DisableSSLMultiRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connect.getClient().disableSSLMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot disable SSL: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


module.exports.enableSSL = enableSSL;
module.exports.disableSSL = disableSSL;
