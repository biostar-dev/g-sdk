package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
)

const (
	QUEUE_SIZE = 32
)

func (s *ConnectSvc) Subscribe() (connect.Connect_SubscribeStatusClient, context.CancelFunc, error) {
	ctx, cancel := context.WithCancel(context.Background())

	req := &connect.SubscribeStatusRequest{
		QueueSize: QUEUE_SIZE,
	}

	statusStream, err := s.client.SubscribeStatus(ctx, req)
	if err != nil {
		fmt.Printf("Cannot subscribe: %v", err)
		return nil, nil, err
	}

	return statusStream, cancel, nil
}


