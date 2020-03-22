import grpc
import event_pb2

from example.event.event import EventSvc

MAX_NUM_OF_LOG = 16
MAX_NUM_OF_IMAGE_LOG = 2
LOG_IMAGE_NAME = './image_log.jpg'
EVENT_QUEUE_SIZE = 16
QUEUE_SIZE = 16
MAX_REALTIME_LOG = 2

def testRealtimeLog(eventSvc, deviceID):
  try:
    eventSvc.enableMonitoring(deviceID)

    print(f'\n>>> Generate {MAX_REALTIME_LOG} events...', flush=True)
    eventCh = eventSvc.subscribe(QUEUE_SIZE)
    eventCount = 0

    for event in eventCh:
      print(f'Event: {event}', flush=True)
      eventCount += 1
      if eventCount >= MAX_REALTIME_LOG:
        eventCh.cancel()

    eventSvc.disableMonitoring(deviceID)

  except grpc.RpcError as e:
    if e.code() == grpc.StatusCode.CANCELLED:
      print('Subscription is cancelled', flush=True)    
    else:
      print(f'Cannot complete the realtime event test: {e}', flush=True)    
    

def testEvent(eventSvc, deviceID):
  try:
    events = eventSvc.getLog(deviceID, 0, MAX_NUM_OF_LOG)
    print(f'Events: \n{events}', flush=True)

    imageEvents = eventSvc.getImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG)
    print(f'Num of image events: {len(imageEvents)}', flush=True)

    if len(imageEvents) > 0:
      f = open(LOG_IMAGE_NAME, 'wb')
      f.write(imageEvents[0].JPGImage)
      f.close()

    testRealtimeLog(eventSvc, deviceID)

  except grpc.RpcError as e:
    print(f'Cannot complete the event test: {e}')    

