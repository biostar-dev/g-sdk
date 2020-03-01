package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
	"google.golang.org/grpc"
)

type ConnectSvc struct {
	client connect.ConnectClient
}

func NewConnectSvc(conn *grpc.ClientConn) *ConnectSvc {
	return &ConnectSvc{
		client: connect.NewConnectClient(conn),
	}
}

func (s *ConnectSvc) GetDeviceList() ([]*connect.DeviceInfo, error) {
	req := &connect.GetDeviceListRequest{
	}

	resp, err := s.client.GetDeviceList(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the device list: %v\n", err)

		return nil, err
	}

	return resp.GetDeviceInfos(), nil
}


func (s *ConnectSvc) SearchDevice(timeout uint32) ([]*connect.SearchDeviceInfo, error) {
	req := &connect.SearchDeviceRequest{
		Timeout: timeout,
	}

	resp, err := s.client.SearchDevice(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot search the devices: %v\n", err)
		return nil, err
	}

	return resp.GetDeviceInfos(), nil
}