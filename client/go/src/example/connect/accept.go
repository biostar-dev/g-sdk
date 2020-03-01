package connect

import (
	"fmt"
	"context"
	"biostar/service/connect"
)

func (s *ConnectSvc) GetPendingList() ([]*connect.PendingDeviceInfo, error) {
	req := &connect.GetPendingListRequest{}
	
	resp, err := s.client.GetPendingList(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the pending device list: %v", err)
		return nil, err
	}

	return resp.GetDeviceInfos(), nil
}


func (s *ConnectSvc) GetAcceptFilter() (*connect.AcceptFilter, error) {
	req := &connect.GetAcceptFilterRequest{}

	resp, err := s.client.GetAcceptFilter(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get accept filter: %v\n", err)
		return nil, err
	}

	return resp.GetFilter(), nil
}


func (s *ConnectSvc) SetAcceptFilter(filter *connect.AcceptFilter) error {
	req := &connect.SetAcceptFilterRequest{
		Filter: filter,
	}

	_, err := s.client.SetAcceptFilter(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot set accept filter: %v\n", err)
		return err
	}

	return nil
}


func (s *ConnectSvc) AddDeviceToAcceptFilter(deviceIDs []uint32) error {
	getReq := &connect.GetAcceptFilterRequest{}

	getResp, err := s.client.GetAcceptFilter(context.Background(), getReq)

	if err != nil {
		fmt.Printf("Cannot get accept filter: %v\n", err)
		return err
	}

	filter := getResp.GetFilter()
	filter.AllowAll = false

	for _, deviceID := range deviceIDs {
		exist := false;

		for i := 0; i < len(filter.DeviceIDs); i++ {
			if filter.DeviceIDs[i] == deviceID {
				exist = true;
				break
			}
		}

		if !exist {
			filter.DeviceIDs = append(filter.DeviceIDs, deviceID)
		}
	}

	setReq := &connect.SetAcceptFilterRequest{
		Filter: filter,
	}

	_, err = s.client.SetAcceptFilter(context.Background(), setReq)

	if err != nil {
		fmt.Printf("Cannot set accept filter: %v\n", err)
		return err
	}

	return nil
}


func (s *ConnectSvc) DeleteDeviceFromAcceptFilter(deviceIDs []uint32) error {
	getReq := &connect.GetAcceptFilterRequest{}

	getResp, err := s.client.GetAcceptFilter(context.Background(), getReq)

	if err != nil {
		fmt.Printf("Cannot get accept filter: %v\n", err)
		return err
	}

	filter := getResp.GetFilter()
	filter.AllowAll = false

	for _, deviceID := range deviceIDs {
		for i := 0; i < len(filter.DeviceIDs); i++ {
			if filter.DeviceIDs[i] == deviceID {
				filter.DeviceIDs = append(filter.DeviceIDs[:i], filter.DeviceIDs[i+1:]...)
				break
			}
		}
	}

	setReq := &connect.SetAcceptFilterRequest{
		Filter: filter,
	}

	_, err = s.client.SetAcceptFilter(context.Background(), setReq)

	if err != nil {
		fmt.Printf("Cannot set accept filter: %v", err)
		return err
	}

	return nil
}
