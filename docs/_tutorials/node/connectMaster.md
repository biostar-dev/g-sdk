---
title: "Connect Master API Tutorial"
toc: true
toc_label: "Table of Contents"
---

## Run the example

1. [Install and run the master gateway]({{'/master/install/' | relative_url}}). Create the needed certificates as described in [the Certificate Management]({{'/master/certificate/' | relative_url}}).
2. [Install and run the device gateway]({{'/gateway/install/' | relative_url}}). Configure the device gateway to connect to the master gateway as described in [the Configuration]({{'/gateway/config/' | relative_url}}#master-gateway).
3. [Download the Node.js client library]({{'/node/install/' | relative_url}})
4. Copy the certificates. 
   * Copy the root certificate of the master gateway to your working directory.  As default, the certificate(_ca.crt_) resides in _cert_ of the installation directory of the master gateway.
   * Copy the administrator certificate and its private key to your working directory.    
   * Copy the tenant certificate and its private key to your working directory.
5. Change the server information in _example/connectMaster/test/test.js_ as needed.
   
    ```javascript
    // the path of the root certificate
    const MASTER_CA_FILE = '../../../../cert/master/ca.crt'; 

    // the address of the master gateway
    const MASTER_IP = '192.168.0.2';
    const MASTER_PORT = 4010;

    // the paths of the administrator certificate and its key 
    const ADMIN_CERT_FILE = '../../../../cert/master/admin.crt';
    const ADMIN_KEY_FILE = '../../../../cert/master/admin_key.pem';

    // the paths of the tenant certificate and its key    
    const TENANT_CERT_FILE = '../../../../cert/master/tenant1.crt';
    const TENANT_KEY_FILE = '../../../../cert/master/tenant1_key.pem';    

    // the following values should be same as the IDs in the corresponding certificates
    const TENANT_ID = "tenant1";
    const GATEWAY_ID = "gateway1";   
    ```

6. Install packages.

    ```
    npm install
    ```
7. Run.
   
    ```
    cd example/connectMaster/test
    node test.js
    ```

    To initialize the database, you have to run with __-i__ option once. 
    {: .notice--info}

## 1. CLI 

With the Command-Line Interface(CLI), you can test 5 functions related to connection management. 

```
$ node test.js

===== Main Menu =====

(1) Search devices
(2) Connect to a device synchronously
(3) Manage asynchronous connections
(4) Accept devices
(5) Device menu
(q) Quit

>>>>> Select a menu:
```

### (1) Search devices

To connect devices, you have to know their addresses and related options such as connection mode. By using [ConnectMaster.SearchDevice]({{'/api/connectMaster/' | relative_url }}#searchdevice), you can get these information in a subnet. 


```
>>>>> Select a menu: 1
Searching devices in the subnet...
***** Found devices: 9
[ { deviceid: 540092578,
    type: 12,
    usedhcp: true,
    connectionmode: 0,
    ipaddr: '192.168.0.120',
    port: 51211,
    usessl: true },
  { deviceid: 544114231,
    type: 13,
    usedhcp: true,
    connectionmode: 0,
    ipaddr: '192.168.0.104',
    port: 51211,
    usessl: false },
  { deviceid: 846,
    type: 18,
    usedhcp: true,
    connectionmode: 0,
    ipaddr: '192.168.0.117',
    port: 51211,
    usessl: false },
```

### (2) Connect to a device synchronously

The simplest way of connecting to a device is to use [ConnectMaster.Connect]({{'/api/connectMaster/' | relative_url }}#connect). 

```
>>>>> Select a menu: 2
Connect to a device synchronously...
>> Enter the IP address of the device: 192.168.0.104
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
Trying to connect to 192.168.0.104:51211...
Connected to 544114231

[TCP Connected]:  { deviceid: 544114231, status: 1, timestamp: 1584826654 }
```

### (3) Manage asynchronous connections 

When you have to manage permanent connections to multiple devices, [asynchronous APIs]({{'/api/connectMaster/' | relative_url }}#asynchronous-connection) would be a better choice. With these APIs, the gateway will handle connections to devices in the background. For example, if some devices are disconnected, the gateway will try to reconnect them automatically. 

```
>>>>> Select a menu: 3

***** Async connections: 0
[]

===== Async Menu =====

(1) Add async connections
(2) Delete async connections
(3) Refresh the connection list
(q) Return to Main Menu

>>>>> Select a menu: 1
>> Enter the device ID (Press just ENTER if no more device): 540092578
>> Enter the IP address of the device: 192.168.0.120
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n): y
>> Enter the device ID (Press just ENTER if no more device): 939504224
>> Enter the IP address of the device: 192.168.0.110
>> Enter the port of the device (default: 51211):
>> Use SSL y/n (default: n):
>> Enter the device ID (Press just ENTER if no more device):
Adding asynchronous connections for 2 devices...

***** Async connections: 2
[ { deviceid: 540092578,
    connectionmode: 0,
    ipaddr: '192.168.0.120',
    port: 51211,
    status: 0,
    autoreconnect: true,
    usessl: true },
  { deviceid: 939504224,
    connectionmode: 0,
    ipaddr: '192.168.0.110',
    port: 51211,
    status: 0,
    autoreconnect: true,
    usessl: false } ]

[TCP Connected]:  { deviceid: 939504224, status: 1, timestamp: 1584826789 }

[TLS Connected]:  { deviceid: 540092578, status: 2, timestamp: 1584826791 }
```

### (4) Accept devices

In some environments, the devices should connect to the gateway, not vice versa. For devices to connect to the gateway, you have to do the followings;

1. Change the connection mode to __DEVICE_TO_SERVER__ using [ConnectMaster.SetConnectionMode]({{'/api/connectMaster/' | relative_url }}#setconnectionmode).
2. By default, the gateway will not accept any incoming connections. You have to add the devices to the accept filter using [ConnectMaster.SetAcceptFilter]({{'/api/connectMaster' | relative_url}}#setacceptfilter). 

```
>>>>> Select a menu: 4

***** Pending devices: 1
[ { deviceid: 939342898,
    ipaddr: '192.168.0.121',
    lasttry: 1584826860 } ]

***** Accept filter:  { allowall: false,
  deviceidsList: [],
  ipaddrsList: [],
  subnetmasksList: [] }

===== Accept Menu =====

(1) Add devices to the filter
(2) Delete devices from the filter
(3) Allow all devices
(4) Disallow all devices
(5) Refresh the pending device list
(q) Return to Main Menu

>>>>> Select a menu: 3

***** Accept filter:  { allowall: true,
  deviceidsList: [],
  ipaddrsList: [],
  subnetmasksList: [] }

[TLS Connected]:  { deviceid: 939342898, status: 2, timestamp: 1584826884 }
```

### (5) Configure connection-related options

Apart from the IP address, there are two important options for device connections. You can change the connection mode using [ConnectMaster.SetConnectionMode]({{'/api/connectMaster/' | relative_url }}#setconnectionmode) and enable/disable SSL using the [SSL APIs]({{'/api/connectMaster' | relative_url}}#ssl).

```
>>>>> Select a menu: 5

***** Managed devices: 4
[ { deviceid: 939504224,
    connectionmode: 0,
    ipaddr: '192.168.0.110',
    port: 51211,
    status: 1,
    autoreconnect: true,
    usessl: false },
  { deviceid: 939342898,
    connectionmode: 1,
    ipaddr: '192.168.0.121',
    port: 0,
    status: 2,
    autoreconnect: false,
    usessl: true },
  { deviceid: 544114231,
    connectionmode: 0,
    ipaddr: '192.168.0.104',
    port: 51211,
    status: 1,
    autoreconnect: false,
    usessl: false },
  { deviceid: 540092578,
    connectionmode: 0,
    ipaddr: '192.168.0.120',
    port: 51211,
    status: 2,
    autoreconnect: true,
    usessl: true } ]

===== Device Menu =====

(1) Set connection mode
(2) Enable SSL
(3) Disable SSL
(4) Disconnect
(5) Disconnect All
(6) Refresh the device list
(q) Return to Main Menu

>>>>> Select a menu: 2

Enter the device IDs to enable SSL
Enter the device ID (Press just ENTER if no more device): 544142231
Enter the device ID (Press just ENTER if no more device):
```

To change these options, you have to connect to the devices first using menu (2) ~ (4). 
{: .notice--warning}

## 2. Synchronous connections

You can use the [Synchronous APIs]({{'/api/connectMaster/' | relative_url }}#synchronous-connection) to manage the connections by yourself. 

```javascript
function connectToDevice(gatewayID, addr, port, useSSL) {
  var connInfo = new connectMessage.ConnectInfo();
  connInfo.setIpaddr(addr);
  connInfo.setPort(port);
  connInfo.setUsessl(useSSL);

  var req = new connectMasterMessage.ConnectRequest();
  req.setGatewayid(gatewayID);
  req.setConnectinfo(connInfo);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().connect(req, (err, response) => {
      resolve(response.getDeviceid());
    });
  });
}

function disconnect(deviceIDs) {
  var req = new connectMasterMessage.DisconnectRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().disconnect(req, (err, response) => {
      resolve(response);
    });
  });
}
```

```javascript
var devID = await connectMaster.connectToDevice(gatewayID, connInfo.getIpaddr(), connInfo.getPort(), connInfo.getUsessl());

// do something with the devID

await connectMaster.disconnect(deviceIDs);
```

## 3. Asynchronous connections

With the [Asynchronous APIs]({{'/api/connectMaster/' | relative_url }}#asynchronous-connection), you only have to register or deregister devices. The gateway will handle all the connection related tasks in the background. 

```javascript
function addAsyncConnection(gatewayID, connInfos) {
  var req = new connectMasterMessage.AddAsyncConnectionRequest();
  req.setGatewayid(gatewayID);
  req.setConnectinfosList(connInfos);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().addAsyncConnection(req, (err, response) => {
      resolve(response);
    });
  });
}

function deleteAsyncConnection(gatewayID, deviceIDs) {
  var req = new connectMasterMessage.DeleteAsyncConnectionRequest();
  req.setGatewayid(gatewayID);
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().deleteAsyncConnection(req, (err, response) => {
      resolve(response);
    });
  });
}
```

You have to use [ConnectMaster.GetDeviceList]({{'/api/connectMaster/' | relative_url }}#getdevicelist) to get the status of the registered devices. 

```javascript
async function showAsyncConnection() {
  var connInfos = [];

  try {
    var devList = await connectMaster.getDeviceList(mainMenu.getGatewayID());

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
```

## 4. Accept devices

```javascript
function getAcceptFilter(gatewayID) {
  var req = new connectMasterMessage.GetAcceptFilterRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().getAcceptFilter(req, (err, response) => {
      resolve(response.toObject().filter);
    })
  })
}

function setAcceptFilter(gatewayID, filter) {
  var req = new connectMasterMessage.SetAcceptFilterRequest();
  req.setGatewayid(gatewayID);
  req.setFilter(filter);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().setAcceptFilter(req, (err, response) => {
      resolve(response);
    })
  })
}
```

By default, the gateway will not accept any incoming connections. [ConnectMaster.GetPendingList]({{'/api/connectMaster/' | relative_url }}#getpendinglist) can be used to get the devices, which are trying to connect to the gateway but not in the accept filter. 

```javascript
function getPendingList(gatewayID) {
  var req = new connectMasterMessage.GetPendingListRequest();
  req.setGatewayid(gatewayID);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().getPendingList(req, (err, response) => {
      resolve(response.toObject().deviceinfosList);
    });
  });
}
```

You can allow all the incoming connections by setting [AcceptFilter.allowAll]({{'/api/connect/' | relative_url }}#AcceptFilter) to true. Or, you can specify the devices to be allowed in [AcceptFilter.deviceIDs]({{'/api/connect/' | relative_url }}#AcceptFilter).

```javascript
async function allowAll() {
  try {
    var filter = new connect.connectMessage.AcceptFilter();
    filter.setAllowall(true);
    filter.setDeviceidsList([]);

    await connectMaster.setAcceptFilter(mainMenu.getGatewayID(), filter);
    await showAcceptFilter();
  } catch (err) {
    console.error('Cannot allow all devices: ', err);
  }
}

async function addDevicesToFilter() {
  var deviceIDs = menu.getDeviceIDs();

  if(deviceIDs.length == 0) {
    console.error('No device to add');
    return;
  }

  try {
    var oldFilter = await connectMaster.getAcceptFilter(mainMenu.getGatewayID());

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

    await connectMaster.setAcceptFilter(mainMenu.getGatewayID(), newFilter);
    await showAcceptFilter();
  } catch (err) {
    console.error('Cannot add devices to the filter: ', err);
  }
}

```

## 5. Connection status

Apart from [ConnectMaster.GetDeviceList]({{'/api/connectMaster/' | relative_url }}#getdevicelist), you can also get the realtime update using [ConnectMaster.SubscribeStatus]({{'/api/connectMaster/' | relative_url }}#subscribestatus).

```javascript
function subscribe(queueSize) {
  var req = new connectMasterMessage.SubscribeStatusRequest();
  req.setQueuesize(queueSize);

  return connMasterClient.subscribeStatus(req);
}
```

```javascript
var sub = connectMaster.subscribe(QUEUE_SIZE);
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
  if(err.details === 'Cancelled') {
    console.log("Subscription is cancelled");
  } else {
    console.log('Subscription error: ', err);
  }
})
```


## 6. Connection mode

```javascript
function setConnectionMode(deviceIDs, mode) {
  var req = new connectMasterMessage.SetConnectionModeMultiRequest();
  req.setDeviceidsList(deviceIDs);
  req.setConnectionmode(mode);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().setConnectionModeMulti(req, (err, response) => {
      resolve(response);
    });
  });
}
```

After setting the connection mode, you have to use different APIs accordingly. With __SERVER_TO_DEVICE__, you should use the [Synchronous APIs]({{'/api/connectMaster/' | relative_url }}#synchronous-connection) or the [Asynchronous APIs]({{'/api/connectMaster/' | relative_url }}#asynchronous-connection). to connect to the devices. With __DEVICE_TO_SERVER__, the [AcceptFilter]({{'/api/connect' | relative_url}}#AcceptFilter) should be configured correctly. 
{: .notice--warning}

## 7. SSL

TLS 1.2 can be used for more secure communication between the gateway and devices. Refer to [Secure Communication]({{'/api/connect/' | relative_url }}#secure-communication) for details. 

```javascript
function enableSSL(deviceIDs) {
  var req = new connectMasterMessage.EnableSSLMultiRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().enableSSLMulti(req, (err, response) => {
      resolve(response);
    });
  });
}


function disableSSL(deviceIDs) {
  var req = new connectMasterMessage.DisableSSLMultiRequest();
  req.setDeviceidsList(deviceIDs);

  return new Promise((resolve, reject) => {
    connectMaster.getClient().disableSSLMulti(req, (err, response) => {
      resolve(response);
    });
  });
}
```

