const readlineSync = require('readline-sync');
const readline = require('readline');

class MenuItem {
  constructor(key, text, callback, exitMenu) {
    this.key = key;
    this.text = text;
    this.callback = callback;
    this.exitMenu = exitMenu;
  }
}

async function showMenu(title, menuItems) {
  var exitMenu = false;

  console.log(`\n===== ${title} =====\n`);

  for(let i = 0; i < menuItems.length; i++) {
    console.log(`(${menuItems[i].key}) ${menuItems[i].text}`);
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.question('\n>>>>> Select a menu: ', async (input) => {
    rl.close();

    var validMenu = false;
    var exitMenu = false;

    for(let i = 0; i < menuItems.length; i++) {
      if(input == menuItems[i].key) {
        validMenu = true;
        if(menuItems[i].callback != null) {
          if(menuItems[i].exitMenu) {
            menuItems[i].callback();
          } else {
            try {
              await menuItems[i].callback();
            } catch (err) {
              console.error(err);
            }
          } 
        }

        if(menuItems[i].exitMenu) {
          exitMenu = true;
        }

        break;
      }
    }

    if(!validMenu) {
      console.error(`Invalid menu: ${input}`);
    }

    if(!exitMenu) {
      showMenu(title, menuItems);
    }
  });
}

class UserInput {
  constructor(text, defaultVal) {
    this.text = text;
    this.defaultVal = defaultVal;
  }
}

function getUserInput(userInputs) {
  var inputVals = []

  for(let i = 0; i < userInputs.length; i++) {
    var input = readlineSync.question(`>> ${userInputs[i].text}: `);
    if(input == '' && userInputs[i].defaultVal != '') {
      inputVals.push(userInputs[i].defaultVal);
    } else {
      inputVals.push(input);
    }
  }

  return inputVals;
}


function getDeviceIDs() {
  var deviceIDs = [];

  while(true) {
    var input = readlineSync.question("Enter the device ID (Press just ENTER if no more device): ");

    if(input == '') {
      break;
    }

    var devID = Number(input);

    if(isNaN(devID)) {
      console.error(`Invalid device ID: ${input}`);
      break;
    }

    deviceIDs.push(devID);
  }

  return deviceIDs;
}

module.exports.MenuItem = MenuItem;
module.exports.showMenu = showMenu;
module.exports.UserInput = UserInput;
module.exports.getUserInput = getUserInput;
module.exports.getDeviceIDs = getDeviceIDs;