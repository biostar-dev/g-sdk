package com.supremainc.sdk.example.card;

import java.util.List;

import com.supremainc.sdk.card.AddBlacklistRequest;
import com.supremainc.sdk.card.DeleteBlacklistRequest;
import com.supremainc.sdk.card.BlacklistItem;
import com.supremainc.sdk.card.CardData;
import com.supremainc.sdk.card.CardGrpc;
import com.supremainc.sdk.card.GetBlacklistRequest;
import com.supremainc.sdk.card.GetBlacklistResponse;
import com.supremainc.sdk.card.ScanRequest;
import com.supremainc.sdk.card.ScanResponse;

public class CardSvc {
  private final CardGrpc.CardBlockingStub cardStub;

  public CardSvc(CardGrpc.CardBlockingStub stub) {
    cardStub = stub;
  }

  public CardData scan(int deviceID) throws Exception {
    ScanRequest request = ScanRequest.newBuilder().setDeviceID(deviceID).build();
    ScanResponse response = cardStub.scan(request);

    return response.getCardData();
  } 

  public List<BlacklistItem> getBlacklist(int deviceID) throws Exception {
    GetBlacklistRequest request = GetBlacklistRequest.newBuilder().setDeviceID(deviceID).build();
    GetBlacklistResponse response = cardStub.getBlacklist(request);

    return response.getBlacklistList();
  }

  public void addBlacklist(int deviceID, List<BlacklistItem> cardInfos) throws Exception {
    AddBlacklistRequest request = AddBlacklistRequest.newBuilder().setDeviceID(deviceID).addAllCardInfos(cardInfos).build();
    cardStub.addBlacklist(request);
  }

  public void deleteBlacklist(int deviceID, List<BlacklistItem> cardInfos) throws Exception {
    DeleteBlacklistRequest request = DeleteBlacklistRequest.newBuilder().setDeviceID(deviceID).addAllCardInfos(cardInfos).build();
    cardStub.deleteBlacklist(request);
  }

}