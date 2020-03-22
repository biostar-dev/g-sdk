const connectMessage = require('../../biostar/service/connect_pb');
const connect = require('./connect');

function addAsyncConnection(connInfos) {
  var req = new connectMessage.AddAsyncConnectionRequest();
  req.setConnectinfosList(connInfos);

  return new Promise((resolve, reject) => {
    connect.getClient().addAsyncConnection(req, (err, response) => {
      if(err) {
        console.error('Cannot add async connection: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

function deleteAsyncConnection(deviceIDs) {
  var req = new connectMessage.DeleteAsyncConnectionRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connect.getClient().deleteAsyncConnection(req, (err, response) => {
      if(err) {
        console.error('Cannot delete async connection: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

module.exports.addAsyncConnection = addAsyncConnection;
module.exports.deleteAsyncConnection = deleteAsyncConnection;
