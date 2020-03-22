const menu = require('../../../cli/menu');
const connect = require('../../../connect');
const mainMenu = require('./mainMenu');

async function showPendingList() {
  try {
    var devList = await connect.getPendingList();

    console.log(`\n***** Pending devices: ${devList.length}`);
    console.log(devList);
  }  catch (err) {
    console.error('Cannot get the pending list: ', err);
  }
}

async function showAcceptFilter() {
  try {
    var filter = await connect.getAcceptFilter();

    console.log('\n***** Accept filter: ', filter);
  }  catch (err) {
    console.error('Cannot get the accept filter: ', err);
  }
}

async function addDevicesToFilter() {
  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to add');
    return;
  }

  try {
    var oldFilter = await connect.getAcceptFilter();

    var newFilter = new connect.connectMessage.AcceptFilter();
    newFilter.setAllowall(false);
    
    var newDeviceIDs = oldFilter.deviceidsList;

    for(let i = 0; i < deviceIDs.length; i++) {
      let exist = false;

      for(let j = 0; j < newDeviceIDs.length; j++) {
        if(deviceIDs[i] == newDeviceIDs[j]) {
          exist = true;
          break;
        }
      }

      if(!exist) {
        newDeviceIDs.push(deviceIDs[i]);
      }
    }
    
    newFilter.setDeviceidsList(newDeviceIDs);

    await connect.setAcceptFilter(newFilter);
    await showAcceptFilter();
  } catch (err) {
    console.error('Cannot add devices to the filter: ', err);
  }
}


async function deleteDevicesFromFilter() {
  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to delete');
    return;
  }

  try {
    var oldFilter = await connect.getAcceptFilter();

    var newFilter = new connect.connectMessage.AcceptFilter();
    newFilter.setAllowall(false);
    
    var newDeviceIDs = oldFilter.deviceidsList;

    for(let i = 0; i < deviceIDs.length; i++) {
      for(let j = 0; j < newDeviceIDs.length; j++) {
        if(deviceIDs[i] == newDeviceIDs[j]) {
          newDeviceIDs.splice(j, 1);
          break;
        }
      }
    }
    
    newFilter.setDeviceidsList(newDeviceIDs);

    await connect.setAcceptFilter(newFilter);
    await showAcceptFilter();
  } catch (err) {
    console.error('Cannot delete devices from the filter: ', err);
  }
}


async function allowAll() {
  try {
    var filter = new connect.connectMessage.AcceptFilter();
    filter.setAllowall(true);
    filter.setDeviceidsList([]);

    await connect.setAcceptFilter(filter);
    await showAcceptFilter();
  } catch (err) {
    console.error('Cannot allow all devices: ', err);
  }
}


async function disallowAll() {
  try {
    var filter = new connect.connectMessage.AcceptFilter();
    filter.setAllowall(false);
    filter.setDeviceidsList([]);

    await connect.setAcceptFilter(filter);
    await showAcceptFilter();
  } catch (err) {
    console.error('Cannot disallow all devices: ', err);
  }
}



async function showMenu() {
  await showPendingList();
  await showAcceptFilter();

  var menuItems = [];
  
  menuItems.push(new menu.MenuItem('1', 'Add devices to the filter', addDevicesToFilter, false));
  menuItems.push(new menu.MenuItem('2', 'Delete devices from the filter', deleteDevicesFromFilter, false));
  menuItems.push(new menu.MenuItem('3', 'Allow all devices', allowAll, false));
  menuItems.push(new menu.MenuItem('4', 'Disallow all devices', disallowAll, false));
  menuItems.push(new menu.MenuItem('5', 'Refresh the pending device list', showPendingList, false));
  menuItems.push(new menu.MenuItem('q', 'Return to Main Menu', mainMenu.showMenu, true));

  menu.showMenu('Accept Menu', menuItems)  
}

module.exports.showMenu = showMenu;
