package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
)


func (s *ConnectSvc) Connect(deviceIP string, devicePort int, useSSL bool) (uint32, error) {
	req := &connect.ConnectRequest{
		ConnectInfo: &connect.ConnectInfo{
			IPAddr: deviceIP,
			Port: int32(devicePort),
			UseSSL: useSSL,
		},
	}

	resp, err := s.client.Connect(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot connect to %v:%v: %v\n", deviceIP, devicePort, err)
		return 0, err
	}

	return resp.GetDeviceID(), nil
}


func (s *ConnectSvc) Disconnect(deviceIDs []uint32) error {
	req := &connect.DisconnectRequest{
		DeviceIDs: deviceIDs,
	}

	_, err := s.client.Disconnect(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot disconnect %v: %v\n", deviceIDs, err)
		return err
	}

	return nil
}


func (s *ConnectSvc) DisconnectAll() error {
	req := &connect.DisconnectAllRequest{
	}

	_, err := s.client.DisconnectAll(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot disconnect all: %v\n", err)
		return err
	}

	return nil
}
