import grpc
import logging

import connect_pb2

from testFinger import testFinger
from testCard import testCard
from testUser import testUser
from testEvent import testEvent

from example.client.client import GrpcClient
from example.connect.connect import ConnectSvc
from example.device.device import DeviceSvc
from example.finger.finger import FingerSvc
from example.card.card import CardSvc
from example.user.user import UserSvc
from example.event.event import EventSvc

CA_FILE = '../../../cert/ca.crt'
SERVER_IP = '192.168.0.2'
SERVER_PORT = 4000

DEVICE_IP = '192.168.0.110'
DEVICE_PORT = 51211
USE_SSL = False


def testConnect(connectSvc):
  try:
    connInfo = connect_pb2.ConnectInfo(IPAddr=DEVICE_IP, port=DEVICE_PORT, useSSL=USE_SSL)

    devID = connectSvc.connect(connInfo)

    devList = connectSvc.getDeviceList()
    print(f'Device list: {devList}', flush=True)

    return devID

  except grpc.RpcError as e:
    print(f'Cannot complete the connect test: {e}')


def testDevice(deviceSvc, deviceID):
  try:
    info = deviceSvc.getInfo(deviceID)

    print(f'Device info: \n{info}', flush=True)

    capInfo = deviceSvc.getCapInfo(deviceID)

    print(f'Capability info: \n{capInfo}', flush=True)

  except grpc.RpcError as e:
    print(f'Cannot complete the device test: {e}')


def quickStart():
  try:
    client = GrpcClient(SERVER_IP, SERVER_PORT, CA_FILE)
    channel = client.getChannel()
    
    connectSvc = ConnectSvc(channel)
    deviceSvc = DeviceSvc(channel)
    fingerSvc = FingerSvc(channel)
    cardSvc = CardSvc(channel)
    userSvc = UserSvc(channel)
    eventSvc = EventSvc(channel)
    
    devID = testConnect(connectSvc)
    testDevice(deviceSvc, devID)
    testFinger(fingerSvc, devID)
    testCard(cardSvc, devID)
    testUser(userSvc, fingerSvc, devID)
    testEvent(eventSvc, devID)

    deviceIDs = [devID]
    connectSvc.disconnect(deviceIDs)

    devList = connectSvc.getDeviceList()
    print(f'\nDevice list: {devList}')

  except grpc.RpcError as e:
    print(f'Cannot run the quick start example: {e}')

if __name__ == '__main__':
    logging.basicConfig()
    quickStart()
