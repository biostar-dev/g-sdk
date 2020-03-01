package cli

import (
	"fmt"
)

const (
	SEARCH_TIMEOUT_MS = 5000
)

func searchDevice() error {
	fmt.Printf("Searching devices in the subnet...\n")

	devices, err := connectSvc.SearchDevice(SEARCH_TIMEOUT_MS)

	if err != nil {
		fmt.Printf("Cannot search devices: %v\n", err)
		return err
	}

	fmt.Printf("\n***** Found %v devices\n", len(devices))

	for _, dev := range devices {
		fmt.Printf("%v\n", dev)
	}

	return nil
}

