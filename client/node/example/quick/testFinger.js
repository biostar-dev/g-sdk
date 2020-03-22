const finger = require('../finger');
const fs = require('fs');

const TEMPLATE_FORMAT = finger.TEMPLATE_FORMAT_SUPREMA;
const IMAGE_FILENAME = './finger.bmp';

function test(devID) {
	console.log('>>> Scan a finger...');

  return finger.scan(devID, TEMPLATE_FORMAT, 50)
  .then((templateData) => {
    console.log('Template: %d bytes', templateData.length);
    return finger.getImage(devID);
  })
  .then((bmpImage) => {
    fs.writeFileSync(IMAGE_FILENAME, bmpImage);
    return finger.getConfig(devID);
  })
  .then((config) => {
    console.log('Finger config: ', config);
  })
  .catch((err) => {
    console.error('Cannot finish the finger test: ', err);
    throw err;
  });
}

module.exports.test = test;