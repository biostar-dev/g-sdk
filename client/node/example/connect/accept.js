const connectMessage = require('../../biostar/service/connect_pb');
const connectService = require('../../biostar/service/connect_grpc_pb');
const connect = require('./connect');

function getPendingList() {
  var req = new connectMessage.GetPendingListRequest();

  return new Promise((resolve, reject) => {
    connect.getClient().getPendingList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the pending list: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().deviceinfosList);
    });
  });
}

function getAcceptFilter() {
  var req = new connectMessage.GetAcceptFilterRequest();

  return new Promise((resolve, reject) => {
    connect.getClient().getAcceptFilter(req, (err, response) => {
      if(err) {
        console.error('Cannot get the accept filter: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().filter);
    })
  })
}

function setAcceptFilter(filter) {
  var req = new connectMessage.SetAcceptFilterRequest();
  req.setFilter(filter);

  return new Promise((resolve, reject) => {
    connect.getClient().setAcceptFilter(req, (err, response) => {
      if(err) {
        console.error('Cannot set the accept filter: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}

module.exports.getPendingList = getPendingList;
module.exports.getAcceptFilter = getAcceptFilter;
module.exports.setAcceptFilter = setAcceptFilter;
