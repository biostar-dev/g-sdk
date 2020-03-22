const connect = require('./connect');
const sync = require('./sync');
const async = require('./async');
const accept = require('./accept');
const mode = require('./mode');
const ssl = require('./ssl');

module.exports.initClient = connect.initClient;
module.exports.getDeviceList = connect.getDeviceList;
module.exports.searchDevice = connect.searchDevice;
module.exports.subscribe = connect.subscribe;
module.exports.connectMessage = connect.connectMessage;

module.exports.connectToDevice = sync.connectToDevice;
module.exports.disconnect = sync.disconnect;
module.exports.disconnectAll = sync.disconnectAll;

module.exports.addAsyncConnection = async.addAsyncConnection;
module.exports.deleteAsyncConnection = async.deleteAsyncConnection;

module.exports.getPendingList = accept.getPendingList;
module.exports.getAcceptFilter = accept.getAcceptFilter;
module.exports.setAcceptFilter = accept.setAcceptFilter;

module.exports.setConnectionMode = mode.setConnectionMode;

module.exports.enableSSL = ssl.enableSSL;
module.exports.disableSSL = ssl.disableSSL;

