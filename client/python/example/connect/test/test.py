import grpc
import threading

import connect_pb2

from example.client.client import GrpcClient
from example.connect.connect import ConnectSvc
from example.connect.test.cli.mainMenu import MainMenu

from example.cli.input import getUserInput, UserInput


CA_FILE = '../../../../cert/ca.crt'
SERVER_IP = '192.168.0.2'
SERVER_PORT = 4000

QUEUE_SIZE = 16

def getDeviceStatus(statusCh):
  try:
    for status in statusCh:
      if status.status == connect_pb2.DISCONNECTED:
        print(f'[DISCONNECTED] Device {status.deviceID}', flush=True)
      elif status.status == connect_pb2.TLS_CONNECTED:
        print(f'[TLS_CONNECTED] Device {status.deviceID}', flush=True)
      elif status.status == connect_pb2.TCP_CONNECTED:
        print(f'[TCP_CONNECTED] Device {status.deviceID}', flush=True)
  
  except grpc.RpcError as e:
    if e.code() == grpc.StatusCode.CANCELLED:
      print('Subscription is cancelled', flush=True)    
    else:
      print(f'Cannot get the device status: {e}')   

def testConnect():
  client = GrpcClient(SERVER_IP, SERVER_PORT, CA_FILE)
  channel = client.getChannel()
  
  connectSvc = ConnectSvc(channel)

  statusCh = connectSvc.subscribe(QUEUE_SIZE)
  statusThread = threading.Thread(target=getDeviceStatus, args=(statusCh,))
  statusThread.start()

  mainMenu = MainMenu(connectSvc)
  mainMenu.show()

  statusCh.cancel()
  statusThread.join()

if __name__ == '__main__':
    testConnect()