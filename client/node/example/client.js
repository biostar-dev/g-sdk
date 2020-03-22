var grpc = require('grpc');
var service = require('../biostar/service');
var fs = require('fs');

const MAX_NUM_USER = 10;


function main() {
  var rootCa = fs.readFileSync("../../cert/ca.crt");
  var sslCreds = grpc.credentials.createSsl(rootCa);

  var deviceClient = new service.getDeviceClient('localhost:4000', sslCreds);
  var deviceReq = new service.deviceMessage.GetDeviceListRequest();

  deviceClient.getDeviceList(deviceReq, function(err, response) {
    if(err) {
      console.log("Cannot get device List");
      console.error(err);
      return;
    }

    console.log('Device List:', response.getDeviceidList());

    var userClient = new service.getUserClient('localhost:4000', sslCreds);
    var userListReq = new service.userMessage.GetUserListRequest();

    var deviceID = response.getDeviceidList()[0];
    userListReq.setDeviceid(deviceID);

    userClient.getUserList(userListReq, function(err, response) {
      if(err) {
        console.log("Cannot get user List");
        console.error(err);
        return;
      }

      hdrs = response.toObject().hdrList;

      var numOfUser = hdrs.length;

      console.log('Num of user: ', numOfUser);

      var userReq = new service.userMessage.GetUserRequest();
      userReq.setDeviceid(deviceID);

      var userIdList = []

      if(numOfUser > MAX_NUM_USER) {
        numOfUser = MAX_NUM_USER;
      }
  
      for(var i = 0; i < numOfUser; i++) {
        console.log('User Hdrs:', hdrs[i]);
        userIdList.push(hdrs[i].id);
      }

      userReq.setUseridList(userIdList);

      userClient.getUser(userReq, function(err, response) {
        users = response.toObject().userList;

        console.log(users);

        var scanFingerReq = new service.userMessage.ScanFingerRequest()
        scanFingerReq.setDeviceid(deviceID);

        userClient.scanFinger(scanFingerReq, function(err, response) {
          templateData = response.toObject().templatedata;

          console.log("Template: " + templateData);

          var scanCardReq = new service.userMessage.ScanCardRequest()
          scanCardReq.setDeviceid(deviceID);
  
          userClient.scanCard(scanCardReq, function(err, response) {
            cardData = response.toObject().carddata;
  
            console.log("Card: " + cardData);
          });
         });
      });
    });
  });
}

main();