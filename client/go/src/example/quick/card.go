package main

import (
	"fmt"
	"biostar/service/card"
)

const (
	NUM_OF_NEW_BLACKLIST = 2

	FIRST_BLACKLISTED_CARD_ID = 100000
	ISSUE_COUNT = 3
)


func testCard(deviceID uint32) error {
	fmt.Printf(">>> Scan a card...\n")

	cardData, err := cardSvc.Scan(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf("Card: %v\n\n", cardData)

	blacklist, err := cardSvc.GetBlacklist(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf("Blacklist: %v\n\n", blacklist)

	cardInfos := []*card.BlacklistItem{}

	for i := 0; i < NUM_OF_NEW_BLACKLIST; i++ {
		cardInfo := &card.BlacklistItem{
			CardID: []byte(fmt.Sprintf("%v", FIRST_BLACKLISTED_CARD_ID + i)),
			IssueCount: ISSUE_COUNT,
		}

		cardInfos = append(cardInfos, cardInfo)
	}

	err = cardSvc.AddBlacklist(deviceID, cardInfos)

	if err != nil {
		return err
	}

	blacklist, _ = cardSvc.GetBlacklist(deviceID)
	fmt.Printf("Blacklist after adding new items: %v\n\n", blacklist)	

	err = cardSvc.DeleteBlacklist(deviceID, cardInfos)

	if err != nil {
		return err
	}

	blacklist, _ = cardSvc.GetBlacklist(deviceID)
	fmt.Printf("Blacklist after deleting new items: %v\n\n", blacklist)	

	return nil
}


