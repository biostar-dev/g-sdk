const menu = require('../../../cli/menu');
const connect = require('../../../connect');
const mainMenu = require('./mainMenu');
const readlineSync = require('readline-sync');

async function showDeviceList() {
  try {
    var devList = await connect.getDeviceList();

    if(devList.length == 0) {
      console.error('No connected device. Connect to some devices first.');
      return null;
    }

    console.log(`\n***** Managed devices: ${devList.length}`);
    console.log(devList);

    return devList;
  }  catch (err) {
    console.error('Cannot get the device list: ', err);
    return null;
  }
}

async function setConnectionMode() {
  console.log('\nEnter the device IDs to change the mode');
  
  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to change');
    return;
  }

  var modeStr = readlineSync.question('>> Select the connection mode (0: Gateway to Device(default), 1: Device to Gateway): ');
  var mode = Number(modeStr);

  if(isNaN(mode) || mode != 1) {
    mode = 0;
  } 

  console.log(`Changing the connection mode to ${mode} for ${deviceIDs.length} devices...`);

  try {
    await connect.setConnectionMode(deviceIDs, mode);
  } catch (err) {
    console.error('Cannot change the connection mode: ', err);
  }
}


async function enableSSL() {
	console.log('\nEnter the device IDs to enable SSL');

  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to enable');
    return;
  }

  console.log('Enabling SSL...');

  try {
    await connect.enableSSL(deviceIDs);
  } catch (err) {
    console.error('Cannot enable SSL: ', err);
  }
}


async function disableSSL() {
	console.log('\nEnter the device IDs to disable SSL');

  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to disable');
    return;
  }

  console.log('Disabling SSL...');

  try {
    await connect.disableSSL(deviceIDs);
  } catch (err) {
    console.error('Cannot disable SSL: ', err);
  }
}


async function disconnect() {
	console.log('\nEnter the device IDs to disconnect');

  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to disconnect');
    return;
  }

  console.log('Disconnecting devices...');

  try {
    await connect.disconnect(deviceIDs);
  } catch (err) {
    console.error('Cannot disconnect: ', err);
  }
}

async function disconnectAll() {
  console.log('Disconnecting all devices...');

  try {
    await connect.disconnectAll();
  } catch (err) {
    console.error('Cannot disconnect all: ', err);
  }
}

async function showMenu() {
  var devList = await showDeviceList();

  if(!devList) {
    mainMenu.showMenu();
    return;
  }

  var menuItems = [];
  
  menuItems.push(new menu.MenuItem('1', 'Set connection mode', setConnectionMode, false));
  menuItems.push(new menu.MenuItem('2', 'Enable SSL', enableSSL, false));
  menuItems.push(new menu.MenuItem('3', 'Disable SSL', disableSSL, false));
  menuItems.push(new menu.MenuItem('4', 'Disconnect', disconnect, false));
  menuItems.push(new menu.MenuItem('5', 'Disconnect All', disconnectAll, false));
  menuItems.push(new menu.MenuItem('6', 'Refresh the device list', showDeviceList, false));
  menuItems.push(new menu.MenuItem('q', 'Return to Main Menu', mainMenu.showMenu, true));

  menu.showMenu('Device Menu', menuItems)  
}

module.exports.showMenu = showMenu;
