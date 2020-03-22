import grpc

import connect_pb2

from example.cli.menu import MenuItem, Menu
from example.cli.input import getUserInput, UserInput, getDeviceIDs

class DeviceMenu:
  menu = None
  connectSvc = None

  def __init__(self, connectSvc):
    self.connectSvc = connectSvc

    menuItems = [
      MenuItem('1', 'Set connection mode', self.setConnectionMode, False),
      MenuItem('2', 'Enable SSL', self.enableSSL, False),
      MenuItem('3', 'Disable SSL', self.disableSSL, False),
      MenuItem('4', 'Disconnect', self.disconnect, False),
      MenuItem('5', 'Disconnect All', self.connectSvc.disconnectAll, False),
      MenuItem('6', 'Refresh the device list', self.getDeviceList, False),
      MenuItem('q', 'Return to Main Menu', None, True),
    ]

    self.menu = Menu('Device Menu', menuItems)

  def getDeviceList(self):
    try:
      devList = self.connectSvc.getDeviceList()

      print(f'***** Managed devices: {len(devList)}')
      
      if len(devList) > 0:
        print(devList)

      return devList

    except grpc.RpcError as e:
      print(f'Cannot get the device list: {e}')
      return []

  def disconnect(self):
    deviceIDs = getDeviceIDs()

    if len(deviceIDs) == 0:
      print('No device to disconnect', flush=True)
      return

    try:
      self.connectSvc.disconnect(deviceIDs)
    except grpc.RpcError:
      pass

  def setConnectionMode(self):
    deviceIDs = getDeviceIDs()

    if len(deviceIDs) == 0:
      print('No device to set', flush=True)
      return

    modeStr = input('>> Select the connection mode (0: Gateway to Device(default), 1: Device to Gateway): ')
    mode = connect_pb2.SERVER_TO_DEVICE
    if modeStr.strip() == '1':
      mode = connect_pb2.DEVICE_TO_SERVER

    try:
      self.connectSvc.setConnectionMode(deviceIDs, mode)
    except grpc.RpcError:
      pass

  def enableSSL(self):
    deviceIDs = getDeviceIDs()

    if len(deviceIDs) == 0:
      print('No device to enable', flush=True)
      return

    try:
      self.connectSvc.enableSSL(deviceIDs)
    except grpc.RpcError:
      pass

  def disableSSL(self):
    deviceIDs = getDeviceIDs()

    if len(deviceIDs) == 0:
      print('No device to disable', flush=True)
      return

    try:
      self.connectSvc.disableSSL(deviceIDs)
    except grpc.RpcError:
      pass

  def show(self):
    devList = self.getDeviceList()
    
    if len(devList) > 0:
      self.menu.show()
    else:
      print('No connected device. Connect to some devices first.', flush=True)
