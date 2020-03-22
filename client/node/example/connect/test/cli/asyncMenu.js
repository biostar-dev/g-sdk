const menu = require('../../../cli/menu');
const connect = require('../../../connect');
const mainMenu = require('./mainMenu');
const readlineSync = require('readline-sync');

async function showAsyncConnection() {
  var connInfos = [];

  try {
    var devList = await connect.getDeviceList();

    for(let i = 0; i < devList.length; i++) {
      if(devList[i].autoreconnect) {
        connInfos.push(devList[i]);
      }
    }

    console.log(`\n***** Async connections: ${connInfos.length}`);
    console.log(connInfos);

    return connInfos;
  }  catch (err) {
    console.error('Cannot get the async connections: ', err);
    return null;
  }
}

function getAsyncConnectInfo() {
  var connInfos = [];

  var userInputs = [];

  userInputs.push(new menu.UserInput('Enter the IP address of the device', ''));
  userInputs.push(new menu.UserInput('Enter the port of the device (default: 51211)', '51211'));
  userInputs.push(new menu.UserInput('Use SSL y/n (default: n)', 'n'));

  while(true) {
    var devIDStr = readlineSync.question('>> Enter the device ID (Press just ENTER if no more device): ');

    if(devIDStr.trim() == '') {
      break
    }

    var devID = Number(devIDStr);

    if(isNaN(devID)) {
      console.error('Invalid device ID: ', devIDStr);
      break;
    }

    var inputs = menu.getUserInput(userInputs);

    var connInfo = new connect.connectMessage.AsyncConnectInfo();
    connInfo.setDeviceid(devID)
    connInfo.setIpaddr(inputs[0]);
    
    var port = Number(inputs[1]);
    if(isNaN(port)) {
      console.error('Invalid port number: ', inputs[1]);
      break;
    }

    connInfo.setPort(port);
    inputs[2].trim();

    if(inputs[2] == 'y' || inputs[2] == 'Y') {
      connInfo.setUsessl(true);
    } else {
      connInfo.setUsessl(false);
    }

    connInfos.push(connInfo);
  }

  return connInfos;
}

async function addAsyncConnection() {
  var connInfos = getAsyncConnectInfo();

  if(connInfos.length == 0) {
    console.error('No async connection to add');
    return;
  }

	console.log(`Adding asynchronous connections for ${connInfos.length} devices...`);

  try {
    await connect.addAsyncConnection(connInfos);
    await showAsyncConnection();
  } catch (err) {
    console.error('Cannot add the async connections: ', err);
  }
}


async function deleteAsyncConnection() {
  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No async connection to delete');
    return;
  }

	console.log(`Deleting asynchronous connections for ${deviceIDs.length} devices...`);

  try {
    await connect.deleteAsyncConnection(deviceIDs);
    await showAsyncConnection();
  } catch (err) {
    console.error('Cannot delete the async connections: ', err);
  }
}


async function showMenu() {
  await showAsyncConnection();

  var menuItems = [];
  
  menuItems.push(new menu.MenuItem('1', 'Add async connections', addAsyncConnection, false));
  menuItems.push(new menu.MenuItem('2', 'Delete async connections', deleteAsyncConnection, false));
  menuItems.push(new menu.MenuItem('3', 'Refresh the connection list', showAsyncConnection, false));
  menuItems.push(new menu.MenuItem('q', 'Return to Main Menu', mainMenu.showMenu, true));

  menu.showMenu('Async Menu', menuItems)  
}

module.exports.showMenu = showMenu;


