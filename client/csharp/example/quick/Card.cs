using System;
using Google.Protobuf;

namespace example
{
    class CardTest
    {
        private const int NUM_OF_BLACKLIST_ITEM = 2;      
        private const int FIRST_BLACKLISTED_CARD_ID = 100000;
        private const int ISSUE_COUNT = 3;

        private CardSvc cardSvc;

        public CardTest(CardSvc svc) {
            cardSvc = svc;
        }

        public void Test(uint deviceID) {
            Console.WriteLine(">>> Scan a card...");
            
            var cardData = cardSvc.Scan(deviceID);

            Console.WriteLine("Card data: {0}" + Environment.NewLine, cardData);

            var blacklist = cardSvc.GetBlacklist(deviceID);

            Console.WriteLine("Blacklist: {0}" + Environment.NewLine, blacklist);

            var newCardInfos = new Card.BlacklistItem[NUM_OF_BLACKLIST_ITEM];

            for(int i = 0; i < NUM_OF_BLACKLIST_ITEM; i++) {
            newCardInfos[i] = new Card.BlacklistItem{ CardID = ByteString.CopyFromUtf8(String.Format("{0}", FIRST_BLACKLISTED_CARD_ID + i)), IssueCount = ISSUE_COUNT };
            }

            cardSvc.AddBlacklist(deviceID, newCardInfos);

            blacklist = cardSvc.GetBlacklist(deviceID);
            Console.WriteLine("Blacklist after adding new items: {0}" + Environment.NewLine, blacklist);

            cardSvc.DeleteBlacklist(deviceID, newCardInfos);
            blacklist = cardSvc.GetBlacklist(deviceID);
            Console.WriteLine("Blacklist after deleting new items: {0}" + Environment.NewLine, blacklist);
        }        
    }
}

