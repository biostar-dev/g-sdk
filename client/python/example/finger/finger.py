import grpc

import finger_pb2_grpc
import finger_pb2


class FingerSvc:
  stub = None

  def __init__(self, channel): 
    try:
      self.stub = finger_pb2_grpc.FingerStub(channel)
    except grpc.RpcError as e:
      print(f'Cannot get the finger stub: {e}')
      raise

  def scan(self, deviceID, templateFormat, qualityThreshold):
    try:
      response = self.stub.Scan(finger_pb2.ScanRequest(deviceID=deviceID, templateFormat=templateFormat, qualityThreshold=qualityThreshold))
      return response.templateData
    except grpc.RpcError as e:
      print(f'Cannot scan a finger: {e}')
      raise

  def getImage(self, deviceID):
    try:
      response = self.stub.GetImage(finger_pb2.GetImageRequest(deviceID=deviceID))
      return response.BMPImage
    except grpc.RpcError as e:
      print(f'Cannot get the fingerprint image: {e}')
      raise

  def getConfig(self, deviceID):
    try:
      response = self.stub.GetConfig(finger_pb2.GetImageRequest(deviceID=deviceID))
      return response.config
    except grpc.RpcError as e:
      print(f'Cannot get the fingerprint config: {e}')
      raise
