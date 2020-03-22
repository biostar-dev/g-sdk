const eventMessage = require('../../biostar/service/event_pb');
const eventService = require('../../biostar/service/event_grpc_pb');

var eventClient = null;

function initClient(addr, credential) {
  eventClient = new eventService.EventClient(addr, credential);

  return eventClient
}

function getClient() {
  return eventClient;
}


function getLog(devID, startEventID, maxNumOfLog) {
  var req = new eventMessage.GetLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    eventClient.getLog(req, (err, response) => {
      if(err) {
        console.error('Cannot get the log: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().eventsList);
    })
  })
}

function getImageLog(devID, startEventID, maxNumOfLog) {
  var req = new eventMessage.GetImageLogRequest();
  req.setDeviceid(devID);
  req.setStarteventid(startEventID);
  req.setMaxnumoflog(maxNumOfLog);

  return new Promise((resolve, reject) => {
    eventClient.getImageLog(req, (err, response) => {
      if(err) {
        console.error('Cannot get the image log: ', err)
        reject(err);
        return;
      }

      resolve(response.toObject().imageeventsList);
    })
  })
}

function enableMonitoring(devID) {
  var req = new eventMessage.EnableMonitoringRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    eventClient.enableMonitoring(req, (err, response) => {
      if(err) {
        console.error('Cannot enable monitoring: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })  
}

function subscribe(queueSize) {
  var req = new eventMessage.SubscribeRealtimeLogRequest();
  req.setQueuesize(queueSize);

  return eventClient.subscribeRealtimeLog(req);
}

function disableMonitoring(devID) {
  var req = new eventMessage.DisableMonitoringRequest();
  req.setDeviceid(devID);

  return new Promise((resolve, reject) => {
    eventClient.disableMonitoring(req, (err, response) => {
      if(err) {
        console.error('Cannot enable monitoring: ', err)
        reject(err);
        return;
      }

      resolve(response);
    })
  })  
}


module.exports.initClient = initClient;
module.exports.getLog = getLog;
module.exports.getImageLog = getImageLog;
module.exports.enableMonitoring = enableMonitoring;
module.exports.disableMonitoring = disableMonitoring;
module.exports.subscribe = subscribe;
module.exports.eventMessage = eventMessage;