const grpc = require('grpc');
const fs = require('fs');
const connect = require('../connect');
const device = require('../device');
const finger = require('../finger');
const testFinger = require('./testFinger');
const card = require('../card');
const testCard = require('./testCard');
const user = require('../user');
const testUser = require('./testUser');
const event = require('../event');
const testEvent = require('./testEvent');

const CA_FILE = '../../../cert/ca.crt';
const SERVER_IP = '192.168.0.2';
const SERVER_PORT = 4000;

const DEVICE_IP = '192.168.0.110';
const DEVICE_PORT = 51211;
const USE_SSL = false;


function testConnect() {
  var deviceID = 0;

  return connect.connectToDevice(DEVICE_IP, DEVICE_PORT, USE_SSL)
  .then((devID) => {
    deviceID = devID;
    return connect.getDeviceList();
  })
  .then((devList) => {
    console.log('Device list: ', devList);

    return deviceID;
  })
  .catch((err) => {
    console.error('Cannot finish the connect test: ', err);
    throw err;
  });
}



function testDevice(devID) {
  return device.getInfo(devID)
  .then((info) => {
    console.log('Device: ', info);

    return device.getCapabilityInfo(devID)
  })
  .then((capInfo) => {
    console.log('Capability: ', capInfo);
  })
  .catch((err) => {
    console.error('Cannot finish the device test: ', err);
    throw err;
  });
}


function main() {
  var rootCa = fs.readFileSync(CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);

  connect.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);
  device.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);
  finger.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);
  card.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);
  user.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);
  event.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);

  var deviceID = 0;

  testConnect()
  .then((devID) => {
    deviceID = devID;

    return testDevice(deviceID);
  })
  .then(() => {
    return testFinger.test(deviceID);
  }) 
  .then(() => {
    return testCard.test(deviceID);
  }) 
  .then(() => {
    return testUser.test(deviceID);
  }) 
  .then(() => {
    return testEvent.test(deviceID);
  })
  .then(() => {
    var deviceIDs = [];
    deviceIDs.push(deviceID);

    return connect.disconnect(deviceIDs);
  })
  .then(() => {
    return connect.getDeviceList();
  })
  .then((devList) => {
    console.log('Device list: ', devList);
  })
  .catch((err) => {
    console.error(err);

    if(deviceID != 0) {
      var deviceIDs = [];
      deviceIDs.push(deviceID);
  
      connect.disconnect(deviceIDs);      
    }
  })
}

main();