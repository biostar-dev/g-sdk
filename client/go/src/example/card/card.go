package card

import (
	"fmt"
	"context"
	"biostar/service/card"
	"google.golang.org/grpc"
)

type CardSvc struct {
	client card.CardClient
}

func NewCardSvc(conn *grpc.ClientConn) *CardSvc {
	return &CardSvc{
		client: card.NewCardClient(conn),
	}
}

func (s *CardSvc) Scan(deviceID uint32) (*card.CardData, error) {
	req := &card.ScanRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.Scan(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot scan a card: %v\n", err)

		return nil, err
	}

	return resp.GetCardData(), nil
}

func (s *CardSvc) GetBlacklist(deviceID uint32) ([]*card.BlacklistItem, error) {
	req := &card.GetBlacklistRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.GetBlacklist(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get blacklist: %v\n", err)

		return nil, err
	}

	return resp.GetBlacklist(), nil
}

func (s *CardSvc) AddBlacklist(deviceID uint32, cardInfos []*card.BlacklistItem) error {
	req := &card.AddBlacklistRequest{
		DeviceID: deviceID,
		CardInfos: cardInfos,
	}

	_, err := s.client.AddBlacklist(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot add blacklist items: %v\n", err)

		return err
	}

	return nil
}


func (s *CardSvc) DeleteBlacklist(deviceID uint32, cardInfos []*card.BlacklistItem) error {
	req := &card.DeleteBlacklistRequest{
		DeviceID: deviceID,
		CardInfos: cardInfos,
	}

	_, err := s.client.DeleteBlacklist(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot delete blacklist items: %v\n", err)

		return err
	}

	return nil
}