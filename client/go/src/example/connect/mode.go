package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
)


func (s *ConnectSvc) SetConnectionMode(deviceID uint32, mode connect.ConnectionMode) error {
	req := &connect.SetConnectionModeRequest{
		DeviceID:       deviceID,
		ConnectionMode: mode,
	}

	_, err := s.client.SetConnectionMode(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot set connection mode: %v", err)
		return err
	}

	return nil
}

func (s *ConnectSvc) SetConnectionModeMulti(deviceIDs []uint32, mode connect.ConnectionMode) error {
	req := &connect.SetConnectionModeMultiRequest{
		DeviceIDs:      deviceIDs,
		ConnectionMode: mode,
	}

	resp, err := s.client.SetConnectionModeMulti(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot set connection mode multi: %v %v", err, resp)
		return err
	}

	return nil
}

