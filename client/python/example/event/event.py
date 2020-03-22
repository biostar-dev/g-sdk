import grpc

import event_pb2_grpc
import event_pb2


class EventSvc:
  stub = None

  def __init__(self, channel): 
    try:
      self.stub = event_pb2_grpc.EventStub(channel)
    except grpc.RpcError as e:
      print(f'Cannot get the event stub: {e}')
      raise

  def getLog(self, deviceID, startEventID, maxNumOfLog):
    try:
      response = self.stub.GetLog(event_pb2.GetLogRequest(deviceID=deviceID, startEventID=startEventID, maxNumOfLog=maxNumOfLog))
      return response.events
    except grpc.RpcError as e:
      print(f'Cannot get the event log: {e}')
      raise

  def getImageLog(self, deviceID, startEventID, maxNumOfLog):
    try:
      response = self.stub.GetImageLog(event_pb2.GetImageLogRequest(deviceID=deviceID, startEventID=startEventID, maxNumOfLog=maxNumOfLog))
      return response.imageEvents
    except grpc.RpcError as e:
      print(f'Cannot get the image events: {e}')
      raise    

  def enableMonitoring(self, deviceID):
    try:
      self.stub.EnableMonitoring(event_pb2.EnableMonitoringRequest(deviceID=deviceID))
    except grpc.RpcError as e:
      print(f'Cannot enable monitoring: {e}')
      raise

  def disableMonitoring(self, deviceID):
    try:
      self.stub.DisableMonitoring(event_pb2.DisableMonitoringRequest(deviceID=deviceID))
    except grpc.RpcError as e:
      print(f'Cannot disable monitoring: {e}')
      raise

  def subscribe(self, queueSize): 
    try:
      return self.stub.SubscribeRealtimeLog(event_pb2.SubscribeRealtimeLogRequest(queueSize=queueSize))
    except grpc.RpcError as e:
      print(f'Cannot subscribe: {e}')
      raise
