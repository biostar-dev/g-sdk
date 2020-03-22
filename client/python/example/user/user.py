import grpc

import user_pb2_grpc
import user_pb2


class UserSvc:
  stub = None

  def __init__(self, channel): 
    try:
      self.stub = user_pb2_grpc.UserStub(channel)
    except grpc.RpcError as e:
      print(f'Cannot get the user stub: {e}')
      raise

  def getList(self, deviceID):
    try:
      response = self.stub.GetList(user_pb2.GetListRequest(deviceID=deviceID))
      return response.hdrs
    except grpc.RpcError as e:
      print(f'Cannot get the user list: {e}')
      raise

  def getUser(self, deviceID, userIDs):
    try:
      response = self.stub.Get(user_pb2.GetRequest(deviceID=deviceID, userIDs=userIDs))
      return response.users    
    except grpc.RpcError as e:
      print(f'Cannot get the users: {e}')
      raise

  def enroll(self, deviceID, users, overwrite):
    try:
      self.stub.Enroll(user_pb2.EnrollRequest(deviceID=deviceID, users=users, overwrite=overwrite))
    except grpc.RpcError as e:
      print(f'Cannot enroll users: {e}')
      raise

  def delete(self, deviceID, userIDs):
    try:
      self.stub.Delete(user_pb2.DeleteRequest(deviceID=deviceID, userIDs=userIDs))
    except grpc.RpcError as e:
      print(f'Cannot delete users: {e}')
      raise

  def setFinger(self, deviceID, userFingers):
    try:
      self.stub.SetFinger(user_pb2.SetFingerRequest(deviceID=deviceID, userFingers=userFingers))
    except grpc.RpcError as e:
      print(f'Cannot set user fingers: {e}')
      raise
