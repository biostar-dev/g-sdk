const grpc = require('grpc');
const fs = require('fs');
const cli = require('./cli');
const connect = require('../connect');

const CA_FILE = '../../../../cert/ca.crt';
const SERVER_IP = '192.168.0.2';
const SERVER_PORT = 4000;

const QUEUE_SIZE = 16;

function main() {
  var rootCa = fs.readFileSync(CA_FILE);
  var sslCreds = grpc.credentials.createSsl(rootCa);

  connect.initClient(`${SERVER_IP}:${SERVER_PORT}`, sslCreds);

  cli.showMainMenu();

  var sub = connect.subscribe(QUEUE_SIZE);
  cli.setSubChannel(sub);

  sub.on('data', (status) => {
    var devStatus = status.getStatus();

    switch(devStatus) {
      case connect.connectMessage.Status.DISCONNECTED:
        console.log('\n[Disconnected]: ', status.toObject());
        break;

      case connect.connectMessage.Status.TCP_CONNECTED:
        console.log('\n[TCP Connected]: ', status.toObject());
        break;

      case connect.connectMessage.Status.TLS_CONNECTED:
        console.log('\n[TLS Connected]: ', status.toObject());
        break;
    }
  });

  sub.on('end', () => {
    console.log('Subscription is finished');
  });

  sub.on('error', (err) => {
    console.log('Subscription error: ', err);
  })
}

main();