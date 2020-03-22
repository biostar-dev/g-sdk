import grpc
import finger_pb2

from example.finger.finger import FingerSvc

QUALITY_THRESHOLD = 50
IMAGE_FILENAME = './finger.bmp'

def testFinger(fingerSvc, deviceID):
  try:
    print('>>> Scan a finger...', flush=True)

    templateData = fingerSvc.scan(deviceID, finger_pb2.TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD)
    print(f'Template data: {templateData}', flush=True)

    fingerImage = fingerSvc.getImage(deviceID)
    f = open(IMAGE_FILENAME, 'wb')
    f.write(fingerImage)
    f.close()

    fingerConfig = fingerSvc.getConfig(deviceID)
    print(f'\nFingerprint config: \n{fingerConfig}', flush=True)
 
  except grpc.RpcError as e:
    print(f'Cannot complete the finger test: {e}')
