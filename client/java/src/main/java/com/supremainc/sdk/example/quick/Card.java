package com.supremainc.sdk.example.quick;

import java.util.ArrayList;
import java.util.List;

import com.google.protobuf.ByteString;
import com.supremainc.sdk.card.BlacklistItem;
import com.supremainc.sdk.card.CardData;
import com.supremainc.sdk.example.card.CardSvc;

class CardTest {
  private static final int NUM_OF_BLACKLIST_ITEM = 2;

  private static final int FIRST_BLACKLISTED_CARD_ID = 100000;
  private static final int ISSUE_COUNT = 3;

  private CardSvc cardSvc;

  public CardTest(CardSvc svc) {
    cardSvc = svc;
  }

  public void test(int deviceID) throws Exception {
    System.out.println(">>> Scan a card...");

    CardData cardData = cardSvc.scan(deviceID);

    System.out.printf("Card data: \n%s\n\n", cardData);    

    List<BlacklistItem> blacklist = cardSvc.getBlacklist(deviceID);

    System.out.printf("Blacklist: \n%s\n\n", blacklist);

    List<BlacklistItem> newBlacklist = new ArrayList<BlacklistItem>();

    for(int i = 0; i < NUM_OF_BLACKLIST_ITEM; i++) {
      BlacklistItem item = BlacklistItem.newBuilder().setCardID(ByteString.copyFromUtf8(Integer.toString(FIRST_BLACKLISTED_CARD_ID + i))).setIssueCount(ISSUE_COUNT).build();
      newBlacklist.add(item);
    }

    cardSvc.addBlacklist(deviceID, newBlacklist);

    blacklist = cardSvc.getBlacklist(deviceID);
    System.out.printf("Blacklist after adding new items: \n%s\n\n", blacklist);

    cardSvc.deleteBlacklist(deviceID, newBlacklist);

    blacklist = cardSvc.getBlacklist(deviceID);
    System.out.printf("Blacklist after deleting new items: \n%s\n\n", blacklist);
  }
}

