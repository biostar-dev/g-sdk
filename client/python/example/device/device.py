import grpc

import device_pb2_grpc
import device_pb2


class DeviceSvc:
  stub = None

  def __init__(self, channel): 
    try:
      self.stub = device_pb2_grpc.DeviceStub(channel)
    except grpc.RpcError as e:
      print(f'Cannot get the device stub: {e}')
      raise

  def getInfo(self, deviceID):
    try:
      response = self.stub.GetInfo(device_pb2.GetInfoRequest(deviceID=deviceID))
      return response.info
    except grpc.RpcError as e:
      print(f'Cannot get the device info: {e}')
      raise

  def getCapInfo(self, deviceID):
    try:
      response = self.stub.GetCapabilityInfo(device_pb2.GetCapabilityInfoRequest(deviceID=deviceID))
      return response.capInfo
    except grpc.RpcError as e:
      print(f'Cannot get the capability info: {e}')
      raise

