import grpc

import connect_pb2_grpc
import connect_pb2


class ConnectSvc:
  stub = None

  def __init__(self, channel): 
    try:
      self.stub = connect_pb2_grpc.ConnectStub(channel)
    except grpc.RpcError as e:
      print(f'Cannot get the connect stub: {e}', flush=True)
      raise

  def searchDevice(self, timeout):
    try:
      response = self.stub.SearchDevice(connect_pb2.SearchDeviceRequest(timeout=timeout))
      return response.deviceInfos
    except grpc.RpcError as e:
      print(f'Cannot get search device: {e}', flush=True)
      raise

  def getDeviceList(self):
    try:
      response = self.stub.GetDeviceList(connect_pb2.GetDeviceListRequest())
      return response.deviceInfos
    except grpc.RpcError as e:
      print(f'Cannot get the device list: {e}', flush=True)
      raise

  def connect(self, connInfo):
    try:
      response = self.stub.Connect(connect_pb2.ConnectRequest(connectInfo=connInfo))
      return response.deviceID
    except grpc.RpcError as e:
      print(f'Cannot connect to the device: {e}', flush=True)
      raise

  def disconnect(self, deviceIDs):
    try:
      self.stub.Disconnect(connect_pb2.DisconnectRequest(deviceIDs=deviceIDs))
    except grpc.RpcError as e:
      print(f'Cannot disconnect devices: {e}', flush=True)
      raise

  def disconnectAll(self):
    try:
      self.stub.DisconnectAll(connect_pb2.DisconnectAllRequest())
    except grpc.RpcError as e:
      print(f'Cannot disconnect all devices: {e}', flush=True)
      raise

  def addAsyncConnection(self, connInfos):
    try:
      self.stub.AddAsyncConnection(connect_pb2.AddAsyncConnectionRequest(connectInfos=connInfos))
    except grpc.RpcError as e:
      print(f'Cannot add async connections: {e}', flush=True)
      raise

  def deleteAsyncConnection(self, deviceIDs):
    try:
      self.stub.DeleteAsyncConnection(connect_pb2.DeleteAsyncConnectionRequest(deviceIDs=deviceIDs))
    except grpc.RpcError as e:
      print(f'Cannot delete async connections: {e}', flush=True)
      raise    

  def getPendingList(self):
    try:
      response = self.stub.GetPendingList(connect_pb2.GetPendingListRequest())
      return response.deviceInfos
    except grpc.RpcError as e:
      print(f'Cannot get the pending list: {e}', flush=True)
      raise    

  def getAcceptFilter(self):
    try:
      response = self.stub.GetAcceptFilter(connect_pb2.GetAcceptFilterRequest())
      return response.filter
    except grpc.RpcError as e:
      print(f'Cannot get the accept filter: {e}', flush=True)
      raise      

  def setAcceptFilter(self, filter):
    try:
      self.stub.SetAcceptFilter(connect_pb2.SetAcceptFilterRequest(filter=filter))      
    except grpc.RpcError as e:
      print(f'Cannot set the accept filter: {e}', flush=True)
      raise 

  def setConnectionMode(self, deviceIDs, mode):
    try:
      self.stub.SetConnectionModeMulti(connect_pb2.SetConnectionModeMultiRequest(deviceIDs=deviceIDs, connectionMode=mode))
    except grpc.RpcError as e:
      print(f'Cannot set the connection mode: {e}', flush=True)
      raise 

  def enableSSL(self, deviceIDs):
    try:
      self.stub.EnableSSLMulti(connect_pb2.EnableSSLMultiRequest(deviceIDs=deviceIDs))
    except grpc.RpcError as e:
      print(f'Cannot enable SSL: {e}', flush=True)
      raise 

  def disableSSL(self, deviceIDs):
    try:
      self.stub.DisableSSLMulti(connect_pb2.DisableSSLMultiRequest(deviceIDs=deviceIDs))
    except grpc.RpcError as e:
      print(f'Cannot disable SSL: {e}', flush=True)
      raise 

  def subscribe(self, queueSize):
    try:
      return self.stub.SubscribeStatus(connect_pb2.SubscribeStatusRequest(queueSize=queueSize))
    except grpc.RpcError as e:
      print(f'Cannot subscribe: {e}', flush=True)
      raise
