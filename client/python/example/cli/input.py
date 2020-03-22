class UserInput:
  text = ''
  defaultVal = ''

  def __init__(self, text, defaultVal):
    self.text = text
    self.defaultVal = defaultVal

def getUserInput(userInputs):
  inputVals = []

  for userInput in userInputs:
    inputVal = input(f'>> {userInput.text}: ')
    if inputVal == '' and userInput.defaultVal != '':
      inputVals.append(userInput.defaultVal)
    else:
      inputVals.append(inputVal)

  return inputVals


def getDeviceIDs():
  deviceIDs = []

  while True:
    devIDStr = input(f'Enter the device ID (Press just ENTER if no more device): ')

    if devIDStr.strip() == '':
      break

    try:
      devID = int(devIDStr)
      deviceIDs.append(devID)
    except ValueError as verr:
      print(f'Invalid device ID {devIDStr}: {verr}')
      break
  
  return deviceIDs
