import grpc
import card_pb2

from example.card.card import CardSvc

NUM_OF_NEW_BLACKLIST = 2
FIRST_BLACKLISTED_CARD_ID = 100000
ISSUE_COUNT = 3

def makeCardInfos():
  cardInfos = []

  for i in range(0, NUM_OF_NEW_BLACKLIST):
    buf = str(FIRST_BLACKLISTED_CARD_ID + i).encode()
    cardInfo = card_pb2.BlacklistItem(cardID=buf, issueCount=ISSUE_COUNT)
    cardInfos.append(cardInfo)

  return cardInfos


def testCard(cardSvc, deviceID):
  try:
    print('>>> Scan a card...', flush=True)

    cardData = cardSvc.scan(deviceID)
    print(f'Card data: {cardData}', flush=True)

    blacklist = cardSvc.getBlacklist(deviceID)
    print(f'Initial blacklist: {blacklist}', flush=True)

    cardInfos = makeCardInfos()
    cardSvc.addBlacklist(deviceID, cardInfos)

    blacklist = cardSvc.getBlacklist(deviceID)
    print(f'Blacklist after adding cards: {blacklist}', flush=True)

    cardSvc.deleteBlacklist(deviceID, cardInfos)

    blacklist = cardSvc.getBlacklist(deviceID)
    print(f'Blacklist after deleting cards: {blacklist}', flush=True)

  except grpc.RpcError as e:
    print(f'Cannot complete the card test: {e}')
