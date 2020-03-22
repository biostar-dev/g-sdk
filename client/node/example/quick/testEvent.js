const event = require('../event');
const fs = require('fs');

const MAX_NUM_OF_LOG = 16;
const MAX_NUM_OF_IMAGE_LOG = 2;
const LOG_IMAGE_NAME = "./image_log.jpg";
const EVENT_QUEUE_SIZE = 16;

function testRealtime(devID) {
  var sub;

  return event.enableMonitoring(devID)
  .then(() => {
    sub = event.subscribe(EVENT_QUEUE_SIZE);

    sub.on('data', (event) => {
      console.log('Event: ', event.toObject());
    });

    sub.on('end', () => {
      console.log('Subscription is finished');
    });

    sub.on('error', (err) => {
      console.log('Subscription error: ', err);
    })

    console.log('>>> Generate events for 10 seconds');

    return new Promise((resolve) => setTimeout(resolve, 10000));
  })
  .then(() => {
    sub.cancel();
    
    return event.disableMonitoring(devID);
  })
  .catch((err) => {
    console.error('Cannot finish the realtime event test: ', err);
    throw err;
  });
}

function test(devID) {
  return event.getLog(devID, 0, MAX_NUM_OF_LOG)
  .then((events) => {
    console.log('Events: ', events);

    return event.getImageLog(devID, 0, MAX_NUM_OF_IMAGE_LOG)
  })
  .then((imageEvents) => {
    console.log('Number of image events: ', imageEvents.length);

    if(imageEvents.length > 0) {
      let buf = new Buffer(imageEvents[0].jpgimage, 'base64');

      fs.writeFileSync(LOG_IMAGE_NAME, buf);
    } 

    return testRealtime(devID);
  })
  .catch((err) => {
    console.error('Cannot finish the event test: ', err);
    throw err;
  });
}

module.exports.test = test;