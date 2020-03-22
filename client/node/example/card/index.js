const card = require('./card');

module.exports.initClient = card.initClient;
module.exports.scan = card.scan;
module.exports.getConfig = card.getConfig;
module.exports.getBlacklist = card.getBlacklist;
module.exports.addBlacklist = card.addBlacklist;
module.exports.deleteBlacklist = card.deleteBlacklist;
module.exports.cardMessage = card.cardMessage;
