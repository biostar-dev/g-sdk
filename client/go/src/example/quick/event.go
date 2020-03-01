package main

import (
	"fmt"
	"time"
	"io/ioutil"
)

const (
	MAX_NUM_OF_LOG = 16
	MAX_NUM_OF_IMAGE_LOG = 2

	LOG_IMAGE_NAME = "./image_log.jpg"
)


func testEvent(deviceID uint32) error {
	events, err := eventSvc.GetLog(deviceID, 0, MAX_NUM_OF_LOG)

	if err != nil {
		return err
	}

	fmt.Printf("Events: %v\n\n", events)

	imageEvents, err := eventSvc.GetImageLog(deviceID, 0, MAX_NUM_OF_IMAGE_LOG)

	if err != nil {
		return err
	}

	fmt.Printf("Num of image events: %v\n\n", len(imageEvents))

	if len(imageEvents) > 0 {
		ioutil.WriteFile(LOG_IMAGE_NAME, imageEvents[0].JPGImage, 0644)
	}

	cancelFunc, err := eventSvc.StartMonitoring(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf(">>> Generate real-time events for 10 seconds\n")

	time.Sleep(10 * time.Second)

	eventSvc.StopMonitoring(deviceID)

	cancelFunc()

	return nil
}




