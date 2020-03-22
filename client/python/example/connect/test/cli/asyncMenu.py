import grpc

import connect_pb2

from example.cli.menu import MenuItem, Menu
from example.cli.input import getUserInput, UserInput, getDeviceIDs

class AsyncMenu:
  menu = None
  connectSvc = None

  def __init__(self, connectSvc):
    self.connectSvc = connectSvc

    menuItems = [
      MenuItem('1', 'Add async connections', self.addAsyncConnection, False),
      MenuItem('2', 'Delete async connections', self.deleteAsyncConnection, False),
      MenuItem('3', 'Refresh the connection list', self.showAsyncConnection, False),
      MenuItem('q', 'Return to Main Menu', None, True),
    ]

    self.menu = Menu('Async Menu', menuItems)

  def showAsyncConnection(self):
    connInfos = []

    try:
      devList = self.connectSvc.getDeviceList()

      for dev in devList:
        if dev.autoReconnect:
          connInfos.append(dev)

      print(f'\n***** Async connections: {len(connInfos)}', flush=True)
      print(connInfos, flush=True)

      return connInfos
    
    except grpc.RpcError as e:
      print(f'Cannot show the async connections: {e}')      
      return []

  def getAsyncConnectionInfo(self):
    connInfos = []

    userInputs = [
      UserInput('Enter the IP address of the device', ''),
      UserInput('Enter the port of the device (default: 51211)', '51211'),
      UserInput('Use SSL y/n (default: n)', 'n')
    ]

    while True:
      devIDStr = input('>> Enter the device ID (Press just ENTER if no more device): ')

      if devIDStr.strip() == '':
        break

      try:
        devID = int(devIDStr)
      except ValueError as verr:
        print(f'Invalid device ID {devIDStr}: {verr}')
        break

      inputs = getUserInput(userInputs)

      try:
        port = int(inputs[1])
      except ValueError as verr:
        print(f'Invalid port number {inputs[1]}: {verr}')      
        break

      useSSL = False
      if inputs[2].strip().lower() == 'y':
        useSSL = True

      connInfo = connect_pb2.AsyncConnectInfo(deviceID=devID, IPAddr=inputs[0], port=port, useSSL=useSSL)
      connInfos.append(connInfo)

    return connInfos

  def addAsyncConnection(self):
    connInfos = self.getAsyncConnectionInfo()

    if len(connInfos) == 0:
      print('No device to add', flush=True)
      return

    try:
      self.connectSvc.addAsyncConnection(connInfos)
      self.showAsyncConnection()

    except grpc.RpcError as e:
      print(f'Cannot add async connections: {e}')    

  def deleteAsyncConnection(self):
    deviceIDs = getDeviceIDs()

    if len(deviceIDs) == 0:
      print('No device to delete', flush=True)
      return

    try:
      self.connectSvc.deleteAsyncConnection(deviceIDs)
      self.showAsyncConnection()

    except grpc.RpcError as e:
      print(f'Cannot delete async connections: {e}')    
  
  def show(self):
    self.showAsyncConnection()
    self.menu.show()

