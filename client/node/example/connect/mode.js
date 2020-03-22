const connectMessage = require('../../biostar/service/connect_pb');
const connect = require('./connect');

function setConnectionMode(deviceIDs, mode) {
  var req = new connectMessage.SetConnectionModeMultiRequest();
  req.setDeviceidsList(deviceIDs);
  req.setConnectionmode(mode);

  return new Promise((resolve, reject) => {
    connect.getClient().setConnectionModeMulti(req, (err, response) => {
      if(err) {
        console.error('Cannot set the connection mode: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}

module.exports.setConnectionMode = setConnectionMode;
