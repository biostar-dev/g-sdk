const menu = require('../../../cli/menu');
const connect = require('../../../connect');
const deviceMenu = require('./deviceMenu');
const asyncMenu = require('./asyncMenu');
const acceptMenu = require('./acceptMenu');

const SEARCH_TIMEOUT = 5000;

async function searchDevice() {
  console.log('Searching devices in the subnet...');

  try {
    var devList = await connect.searchDevice(SEARCH_TIMEOUT)

    console.log(`***** Found devices: ${devList.length}`);
    console.log(devList);
  } catch (err) {
    console.error('Cannot search devices: ', err);
  }
}


function getConnectInfo() {
  var userInputs = [];

  userInputs.push(new menu.UserInput('Enter the IP address of the device', ''));
  userInputs.push(new menu.UserInput('Enter the port of the device (default: 51211)', '51211'));
  userInputs.push(new menu.UserInput('Use SSL y/n (default: n)', 'n'));

  var inputs = menu.getUserInput(userInputs);

  var connInfo = new connect.connectMessage.ConnectInfo();
  connInfo.setIpaddr(inputs[0]);
  
  var port = Number(inputs[1]);
  if(isNaN(port)) {
    console.error('Invalid port number: ', inputs[1]);
    return null;
  }

  connInfo.setPort(port);
  inputs[2].trim();

  if(inputs[2] == 'y' || inputs[2] == 'Y') {
    connInfo.setUsessl(true);
  } else {
    connInfo.setUsessl(false);
  }

  return connInfo;
}


async function connectSync() {
  console.log('Connect to a device synchronously...');

  var connInfo = getConnectInfo();
  if(!connInfo) {
    return;
  }

  if(connInfo.getUsessl()) {
    console.log(`Trying to connect to ${connInfo.getIpaddr()}:${connInfo.getPort()} with SSL...`);
  } else {
    console.log(`Trying to connect to ${connInfo.getIpaddr()}:${connInfo.getPort()}...`);
  }
  
  try {
    var devID = await connect.connectToDevice(connInfo.getIpaddr(), connInfo.getPort(), connInfo.getUsessl());
    console.log(`Connected to ${devID}`);
  } catch (err) {
    console.error('Cannot connect to the device: ', err);
  }
}

var subChannel = null;

function setSubChannel(subCh) {
  subChannel = subCh;
}

function showMenu() {
  var menuItems = [];
  
  menuItems.push(new menu.MenuItem('1', 'Search devices', searchDevice, false));
  menuItems.push(new menu.MenuItem('2', 'Connect to a device synchronously', connectSync, false));
  menuItems.push(new menu.MenuItem('3', 'Manage asynchronous connections', asyncMenu.showMenu, true));
  menuItems.push(new menu.MenuItem('4', 'Accept devices', acceptMenu.showMenu, true));
  menuItems.push(new menu.MenuItem('5', 'Device menu', deviceMenu.showMenu, true));
  menuItems.push(new menu.MenuItem('q', 'Quit', () => { subChannel.cancel() }, true));

  menu.showMenu('Main Menu', menuItems)  
}

module.exports.showMenu = showMenu;
module.exports.setSubChannel = setSubChannel;
