const mainMenu = require('./mainMenu');
const deviceMenu = require('./deviceMenu');
const asyncMenu = require('./asyncMenu');
const acceptMenu = require('./acceptMenu');

module.exports.showMainMenu = mainMenu.showMenu;
module.exports.setSubChannel = mainMenu.setSubChannel;
module.exports.showDeviceMenu = deviceMenu.showMenu;
module.exports.showAsyncMenu = asyncMenu.showMenu;
module.exports.showAcceptMenu = acceptMenu.showMenu;