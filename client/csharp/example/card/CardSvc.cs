using System;
using Card;
using Grpc.Core;
using Google.Protobuf.Collections;

namespace example
{
  class CardSvc
  {
    private Card.Card.CardClient cardClient;

    public CardSvc(Channel channel) {
      cardClient = new Card.Card.CardClient(channel);
    }

    public CardData Scan(uint deviceID) {
      var request = new ScanRequest{ DeviceID = deviceID };
      var response = cardClient.Scan(request);

      return response.CardData;
    }

    public RepeatedField<Card.BlacklistItem> GetBlacklist(uint deviceID) {
      var request = new GetBlacklistRequest{ DeviceID = deviceID };
      var response = cardClient.GetBlacklist(request);

      return response.Blacklist;
    }

    public void AddBlacklist(uint deviceID, Card.BlacklistItem[] cardInfos) {
      var request = new AddBlacklistRequest{ DeviceID = deviceID };
      request.CardInfos.AddRange(cardInfos);

      cardClient.AddBlacklist(request);
    }

    public void DeleteBlacklist(uint deviceID, Card.BlacklistItem[] cardInfos) {
      var request = new DeleteBlacklistRequest{ DeviceID = deviceID };
      request.CardInfos.AddRange(cardInfos);

      cardClient.DeleteBlacklist(request);
    }
  }
}