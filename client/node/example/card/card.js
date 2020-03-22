const cardMessage = require('../../biostar/service/card_pb');
const cardService = require('../../biostar/service/card_grpc_pb');

var cardClient = null;

function initClient(addr, credential) {
  cardClient = new cardService.CardClient(addr, credential);

  return cardClient
}

function getClient() {
  return cardClient;
}

function scan(devID, format, threshold) {
  var req = new cardMessage.ScanRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    cardClient.scan(req, (err, response) => {
      if(err) {
        console.error('Cannot scan a card: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().carddata);
    });
  });
}

function getBlacklist(devID) {
  var req = new cardMessage.GetBlacklistRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reflect) => {
    cardClient.getBlacklist(req, (err, response) => {
      if(err) {
        console.error('Cannot get the blacklist: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().blacklistList);
    });
  });
}

function addBlacklist(devID, cardInfos) {
  var req = new cardMessage.AddBlacklistRequest();
  req.setDeviceid(devID);
  req.setCardinfosList(cardInfos);

  return new Promise((resolve, reflect) => {
    cardClient.addBlacklist(req, (err, response) => {
      if(err) {
        console.error('Cannot add to the blacklist: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function deleteBlacklist(devID, cardInfos) {
  var req = new cardMessage.DeleteBlacklistRequest();
  req.setDeviceid(devID);
  req.setCardinfosList(cardInfos);

  return new Promise((resolve, reflect) => {
    cardClient.deleteBlacklist(req, (err, response) => {
      if(err) {
        console.error('Cannot delete from the blacklist: ', err)
        reject(err);
        return;
      }

      resolve(response);
    });
  });
}


function getConfig(devID) {
  var req = new cardMessage.GetConfigRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    cardClient.getConfig(req, (err, response) => {
      if(err) {
        console.error('Cannot get the card config: ', err)
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
module.exports.getBlacklist = getBlacklist;
module.exports.addBlacklist = addBlacklist;
module.exports.deleteBlacklist = deleteBlacklist;
module.exports.getConfig = getConfig;
module.exports.cardMessage = cardMessage;