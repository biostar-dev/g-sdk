import grpc

import connect_pb2

from example.cli.menu import MenuItem, Menu
from example.cli.input import getUserInput, UserInput

from example.connect.test.cli.deviceMenu import DeviceMenu
from example.connect.test.cli.asyncMenu import AsyncMenu
from example.connect.test.cli.acceptMenu import AcceptMenu

SEARCH_TIMEOUT = 5000

class MainMenu:
  menu = None
  devMenu = None
  asyncMenu = None

  connectSvc = None

  def __init__(self, connectSvc):
    self.connectSvc = connectSvc
    self.devMenu = DeviceMenu(connectSvc)
    self.asyncMenu = AsyncMenu(connectSvc)
    self.acceptMenu = AcceptMenu(connectSvc)

    menuItems = [
      MenuItem('1', 'Search devices', self.searchDevice, False),
      MenuItem('2', 'Connect to a device synchronously', self.connect, False),
      MenuItem('3', 'Manage asynchronous connections', self.asyncMenu.show, False),
      MenuItem('4', 'Accept devices', self.acceptMenu.show, False),
      MenuItem('5', 'Device menu', self.devMenu.show, False),
      MenuItem('q', 'Quit', None, True),
    ]

    self.menu = Menu('Main Menu', menuItems)

  def searchDevice(self):
    print('Searching devices in the subnet...', flush=True)

    try:
      devList = self.connectSvc.searchDevice(SEARCH_TIMEOUT)
      print(f'***** Found devices: {len(devList)}', flush=True)
      print(devList)

    except grpc.RpcError as e:
      print(f'Cannot search device: {e}')


  def getConnectInfo(self):
    userInputs = [
      UserInput('Enter the IP address of the device', ''),
      UserInput('Enter the port of the device (default: 51211)', '51211'),
      UserInput('Use SSL y/n (default: n)', 'n')
    ]

    inputs = getUserInput(userInputs)
    
    try:
      port = int(inputs[1])
      useSSL = False
      if inputs[2].strip().lower() == 'y':
        useSSL = True

      return connect_pb2.ConnectInfo(IPAddr=inputs[0], port=port, useSSL=useSSL)
    except ValueError as verr:
      print(f'Invalid port number {inputs[1]}: {verr}')

  def connect(self):
    try:
      connInfo = self.getConnectInfo()

      if connInfo.useSSL:
        print(f'Connecting to {connInfo.IPAddr}:{connInfo.port} with SSL...', flush=True)
      else:
        print(f'Connecting to {connInfo.IPAddr}:{connInfo.port}...', flush=True)

      devID = self.connectSvc.connect(connInfo)
      print(f'Connected to {devID}', flush=True)
    
    except grpc.RpcError as e:
      print(f'Cannot connect to the device: {e}')

  def show(self):
    self.menu.show()

