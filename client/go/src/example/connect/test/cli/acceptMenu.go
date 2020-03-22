package cli

import (
	"fmt"
	"example/cli"
	"biostar/service/connect"
)

var (
	acceptMenuItems []*cli.MenuItem
)

func init() {
	acceptMenuItems = []*cli.MenuItem{
		&cli.MenuItem{
			"1", "Add devices to the filter", addDevicesToFilter, false,
		},
		&cli.MenuItem{
			"2", "Delete devices from the filter", deleteDevicesFromFilter, false,
		},
		&cli.MenuItem{
			"3", "Allow all devices", allowAllDevices, false,
		},
		&cli.MenuItem{
			"4", "Disallow all devices", disallowAllDevices, false,
		},
		&cli.MenuItem{
			"5", "Refresh the pending device list", showPendingList, false,
		},		
		&cli.MenuItem{
			"q", "Return to Main Menu", nil, true,
		},
	}
}

func showAcceptMenu() error {
	err := showAcceptFilter()

	if err != nil {
		return err
	}

	err = showPendingList()

	if err != nil {
		return err
	}

	cli.ShowMenu("Accept Menu", acceptMenuItems)
	return nil
}


func showAcceptFilter() error {
	filter, err := connectSvc.GetAcceptFilter()

	if err != nil {
		newErr := fmt.Errorf("Cannot get the accept filter: %v", err)
		fmt.Println(newErr)
		return newErr
	}

	fmt.Printf("\n***** Accept filter: %v\n", filter)

	return nil
}


func showPendingList() error {
	devList, err := connectSvc.GetPendingList()

	if err != nil {
		newErr := fmt.Errorf("Cannot get the pending device list: %v", err)
		fmt.Println(newErr)
		return newErr
	}

	fmt.Printf("\n***** Pending devices: %v\n", len(devList))

	for _, device := range devList {
		fmt.Printf("%v\n", device)
	}	

	return nil
}


func addDevicesToFilter() error {
	fmt.Printf("\nEnter the device IDs to add\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}

	fmt.Printf("Adding %d devices to the accept filter...\n", len(devIDs))

	err = connectSvc.AddDeviceToAcceptFilter(devIDs)

	if err != nil {
		return err
	}

	showAcceptFilter()

	return nil	
}


func allowAllDevices() error {
	fmt.Printf("Allowing all devices...\n")

	filter := &connect.AcceptFilter{
		AllowAll: true,
		DeviceIDs: []uint32{},
	}

	err := connectSvc.SetAcceptFilter(filter)

	if err != nil {
		return err
	}

	showAcceptFilter()

	return nil		
}


func disallowAllDevices() error {
	fmt.Printf("Disallowing all devices...\n")

	filter := &connect.AcceptFilter{
		AllowAll: false,
		DeviceIDs: []uint32{},
	}

	err := connectSvc.SetAcceptFilter(filter)

	if err != nil {
		return err
	}

	showAcceptFilter()

	return nil		
}


func deleteDevicesFromFilter() error {
	fmt.Printf("\nEnter the device IDs to delete\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}

	fmt.Printf("Deleting %d devices from the accept filter...\n", len(devIDs))

	err = connectSvc.DeleteDeviceFromAcceptFilter(devIDs)

	if err != nil {
		return err
	}

	showAcceptFilter()

	return nil	
}