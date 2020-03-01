package finger

import (
	"fmt"
	"context"
	"biostar/service/finger"
	"google.golang.org/grpc"
)

type FingerSvc struct {
	client finger.FingerClient
}

func NewFingerSvc(conn *grpc.ClientConn) *FingerSvc {
	return &FingerSvc{
		client: finger.NewFingerClient(conn),
	}
}

func (s *FingerSvc) Scan(deviceID uint32, templateFormat finger.TemplateFormat, qualityThreshold uint32) ([]byte, uint32, error) {
	req := &finger.ScanRequest{
		DeviceID: deviceID,
		TemplateFormat: templateFormat,
		QualityThreshold: qualityThreshold,
	}

	resp, err := s.client.Scan(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot scan a fingerprint: %v\n", err)

		return nil, 0, err
	}

	return resp.GetTemplateData(), resp.GetQualityScore(), nil
}


func (s *FingerSvc) GetImage(deviceID uint32) ([]byte, error) {
	req := &finger.GetImageRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.GetImage(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the last fingerprint image: %v\n", err)

		return nil, err
	}

	return resp.GetBMPImage(), nil
}


func (s *FingerSvc) GetConfig(deviceID uint32) (*finger.FingerConfig, error) {
	req := &finger.GetConfigRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.GetConfig(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the fingerprint config: %v\n", err)

		return nil, err
	}

	return resp.GetConfig(), nil
}