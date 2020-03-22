const event = require('./event');

module.exports.initClient = event.initClient;
module.exports.getLog = event.getLog;
module.exports.getImageLog = event.getImageLog;
module.exports.enableMonitoring = event.enableMonitoring;
module.exports.disableMonitoring = event.disableMonitoring;
module.exports.subscribe = event.subscribe;
module.exports.eventMessage = event.eventMessage;
