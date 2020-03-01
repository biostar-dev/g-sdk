package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
)

func (s *ConnectSvc) EnableSSL(deviceIDs []uint32) error {
	req := &connect.EnableSSLMultiRequest{
		DeviceIDs:      deviceIDs,
	}

	resp, err := s.client.EnableSSLMulti(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot enable SSL: %v %v", err, resp)
		return err
	}

	return nil
}


func (s *ConnectSvc) DisableSSL(deviceIDs []uint32) error {
	req := &connect.DisableSSLMultiRequest{
		DeviceIDs:      deviceIDs,
	}

	resp, err := s.client.DisableSSLMulti(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot disable SSL: %v %v", err, resp)
		return err
	}

	return nil
}

