const userMessage = require('../../biostar/service/user_pb');
const userService = require('../../biostar/service/user_grpc_pb');

var userClient = null;

function initClient(addr, credential) {
  userClient = new userService.UserClient(addr, credential);

  return userClient
}

function getClient() {
  return userClient;
}

function getList(devID) {
  var req = new userMessage.GetListRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    userClient.getList(req, (err, response) => {
      if(err) {
        console.error('Cannot get the user list: ', err);
        reject(err);
        return;
      }

      resolve(response.toObject().hdrsList);
    })
  })
}

function getUser(devID, userIDs) {
  var req = new userMessage.GetRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.get(req, (err, response) => {
      if(err) {
        console.error('Cannot get the user info: ', err);
        reject(err);
        return;
      }

      resolve(response.toObject().usersList);
    })
  })
}


function enroll(devID, userInfos) {
  var req = new userMessage.EnrollRequest();
  req.setDeviceid(devID);
  req.setUsersList(userInfos);

  return new Promise((resolve, reject) => {
    userClient.enroll(req, (err, response) => {
      if(err) {
        console.error('Cannot enroll the users: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function deleteUser(devID, userIDs) {
  var req = new userMessage.DeleteRequest();
  req.setDeviceid(devID);
  req.setUseridsList(userIDs);

  return new Promise((resolve, reject) => {
    userClient.delete(req, (err, response) => {
      if(err) {
        console.error('Cannot delete the users: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


function setFinger(devID, userFingerInfos) {
  var req = new userMessage.SetFingerRequest();
  req.setDeviceid(devID);
  req.setUserfingersList(userFingerInfos);

  return new Promise((resolve, reject) => {
    userClient.setFinger(req, (err, response) => {
      if(err) {
        console.error('Cannot set user fingers: ', err);
        reject(err);
        return;
      }

      resolve(response);
    })
  })
}


module.exports.initClient = initClient;
module.exports.getClient = getClient;
module.exports.getList = getList;
module.exports.getUser = getUser;
module.exports.enroll = enroll;
module.exports.deleteUser = deleteUser;
module.exports.setFinger = setFinger;
module.exports.userMessage = userMessage;
