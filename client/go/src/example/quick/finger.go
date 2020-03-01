package main

import (
	"biostar/service/finger"
	"io/ioutil"
	"fmt"
)

const (
	QUALITY_THRESHOLD uint32 = 50
	FINGERPRINT_IMAGE_NAME = "./finger.bmp"
)

func testFinger(deviceID uint32) error {
	fmt.Printf(">>> Scan a finger...\n")

	templData, score, err := fingerSvc.Scan(deviceID, finger.TemplateFormat_TEMPLATE_FORMAT_SUPREMA, QUALITY_THRESHOLD)

	if err != nil {
		return err
	}

	fmt.Printf("Template: %v %v\n\n", score, templData)

	bmpImage, err := fingerSvc.GetImage(deviceID)

	if err != nil {
		return err
	}

	ioutil.WriteFile(FINGERPRINT_IMAGE_NAME, bmpImage, 0644)

	fingerConfig, err := fingerSvc.GetConfig(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf("Fingerprint config: %v\n\n", fingerConfig)

	return nil
}


