const finger = require('./finger');

module.exports.initClient = finger.initClient;
module.exports.scan = finger.scan;
module.exports.getImage = finger.getImage;
module.exports.getConfig = finger.getConfig;
module.exports.fingerMessage = finger.fingerMessage;
module.exports.TemplateFormat = finger.TemplateFormat;