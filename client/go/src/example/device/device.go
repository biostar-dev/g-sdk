package device

import (
	"fmt"
	"context"
	"biostar/service/device"
	"google.golang.org/grpc"
)

type DeviceSvc struct {
	client device.DeviceClient
}

func NewDeviceSvc(conn *grpc.ClientConn) *DeviceSvc {
	return &DeviceSvc{
		client: device.NewDeviceClient(conn),
	}
}

func (s *DeviceSvc) GetInfo(deviceID uint32) (*device.FactoryInfo, error) {
	req := &device.GetInfoRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.GetInfo(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the device info: %v\n", err)

		return nil, err
	}

	return resp.GetInfo(), nil
}

func (s *DeviceSvc) GetCapabilityInfo(deviceID uint32) (*device.CapabilityInfo, error) {
	req := &device.GetCapabilityInfoRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.GetCapabilityInfo(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the device capability info: %v\n", err)

		return nil, err
	}

	return resp.GetCapInfo(), nil
}
