import grpc

import card_pb2_grpc
import card_pb2


class CardSvc:
  stub = None

  def __init__(self, channel): 
    try:
      self.stub = card_pb2_grpc.CardStub(channel)
    except grpc.RpcError as e:
      print(f'Cannot get the card stub: {e}')
      raise

  def scan(self, deviceID):
    try:
      response = self.stub.Scan(card_pb2.ScanRequest(deviceID=deviceID))
      return response.cardData
    except grpc.RpcError as e:
      print(f'Cannot scan a card: {e}')
      raise

  def getBlacklist(self, deviceID):
    try:
      response = self.stub.GetBlacklist(card_pb2.GetBlacklistRequest(deviceID=deviceID))
      return response.blacklist
    except grpc.RpcError as e:
      print(f'Cannot get the blacklist: {e}')
      raise

  def addBlacklist(self, deviceID, cardInfos):
    try:
      self.stub.AddBlacklist(card_pb2.AddBlacklistRequest(deviceID=deviceID, cardInfos=cardInfos))
    except grpc.RpcError as e:
      print(f'Cannot add the cards to the blacklist: {e}')
      raise

  def deleteBlacklist(self, deviceID, cardInfos):
    try:
      self.stub.DeleteBlacklist(card_pb2.DeleteBlacklistRequest(deviceID=deviceID, cardInfos=cardInfos))
    except grpc.RpcError as e:
      print(f'Cannot delete the cards from the blacklist: {e}')
      raise

      
