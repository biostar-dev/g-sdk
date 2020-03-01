package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
)

func (s *ConnectSvc) AddAsyncConnection(connInfos []*connect.AsyncConnectInfo) error {
	req := &connect.AddAsyncConnectionRequest{
		ConnectInfos: connInfos,
	}

	_, err := s.client.AddAsyncConnection(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot set async connectlion list: %v\n", err)
		return err
	}

	return nil
}


func (s *ConnectSvc) DeleteAsyncConnection(deviceIDs []uint32) error {
	req := &connect.DeleteAsyncConnectionRequest{
		DeviceIDs: deviceIDs,
	}

	_, err := s.client.DeleteAsyncConnection(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot delete async connection: %v\n", err)
		return err
	}

	return nil
}
