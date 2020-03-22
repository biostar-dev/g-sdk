import grpc

import connect_pb2

from example.cli.menu import MenuItem, Menu
from example.cli.input import getUserInput, UserInput, getDeviceIDs

class AcceptMenu:
  menu = None
  connectSvc = None

  def __init__(self, connectSvc):
    self.connectSvc = connectSvc

    menuItems = [
      MenuItem('1', 'Add devices to the filter', self.addDevicesToFilter, False),
      MenuItem('2', 'Delete devices from the filter', self.deleteDevicesFromFilter, False),
      MenuItem('3', 'Allow all devices', self.allowAllDevices, False),
      MenuItem('4', 'Disallow all devices', self.disallowAllDevices, False),
      MenuItem('5', 'Refresh the pending device list', self.getPendingList, False),
      MenuItem('q', 'Return to Main Menu', None, True),
    ]

    self.menu = Menu('Accept Menu', menuItems)

  def getPendingList(self):
    try:
      devList = self.connectSvc.getPendingList()

      print(f'***** Pending devices: {len(devList)}', flush=True)
      print(devList, flush=True)

      return devList

    except grpc.RpcError as e:
      print(f'Cannot get the pending list: {e}')
      return []

  def showAcceptFilter(self):
    try:
      filter = self.connectSvc.getAcceptFilter()
      print('***** Accept filter: ', filter, flush=True)
    except grpc.RpcError as e:
      print(f'Cannot get the accept filter: {e}')

  def allowAllDevices(self):
    try:
      filter = connect_pb2.AcceptFilter(allowAll=True)
      self.connectSvc.setAcceptFilter(filter)
      self.showAcceptFilter()
    except grpc.RpcError as e:
      print(f'Cannot allow all devices: {e}')      

  def disallowAllDevices(self):
    try:
      filter = connect_pb2.AcceptFilter(allowAll=False)
      self.connectSvc.setAcceptFilter(filter)
      self.showAcceptFilter()
    except grpc.RpcError as e:
      print(f'Cannot disallow all devices: {e}')        

  def addDevicesToFilter(self):
    try:
      deviceIDs = getDeviceIDs()
      if len(deviceIDs) == 0:
        print('No device to add')
        return

      filter = self.connectSvc.getAcceptFilter()
      filter.allowAll = False

      for devID in deviceIDs:
        existing = False
        for existingDevID in filter.deviceIDs:
          if devID == existingDevID:
            existing = True
            break
      
        if not existing:
          filter.deviceIDs.append(devID)

      self.connectSvc.setAcceptFilter(filter)
      self.showAcceptFilter()
          
    except grpc.RpcError as e:
      print(f'Cannot add devices to the filter: {e}')      

  def deleteDevicesFromFilter(self):
    try:
      deviceIDs = getDeviceIDs()
      if len(deviceIDs) == 0:
        print('No device to delete')
        return

      filter = self.connectSvc.getAcceptFilter()
      filter.allowAll = False

      for devID in deviceIDs:
        try:
          filter.deviceIDs.remove(devID)
        except ValueError:
          pass

      self.connectSvc.setAcceptFilter(filter)
      self.showAcceptFilter()
          
    except grpc.RpcError as e:
      print(f'Cannot add devices to the filter: {e}')          

  def show(self):
    self.getPendingList()
    self.showAcceptFilter()
    self.menu.show()