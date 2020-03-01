package cli

import (
	"fmt"
	"strings"
	"biostar/service/connect"
	"example/cli"
)

var (
	devMenuItems []*cli.MenuItem
)

func init() {
	devMenuItems = []*cli.MenuItem{
		&cli.MenuItem{
			"1", "Set connection mode", setConnectionMode, false,
		},
		&cli.MenuItem{
			"2", "Enable SSL", enableSSL, false,
		},
		&cli.MenuItem{
			"3", "Disable SSL", disableSSL, false,
		},
		&cli.MenuItem{
			"4", "Disconnect", disconnect, false,
		},
		&cli.MenuItem{
			"5", "Disconnect All", disconnectAll, false,
		},
		&cli.MenuItem{
			"6", "Refresh the device list", showDeviceList, false,
		},
		&cli.MenuItem{
			"q", "Return to Main Menu", nil, true,
		},
	}
}

func showDeviceMenu() error {
	err := showDeviceList()

	if err != nil {
		return err
	}

	cli.ShowMenu("Device Menu", devMenuItems)
	return nil
}

func showDeviceList() error {
	devList, err := connectSvc.GetDeviceList()

	if err != nil {
		newErr := fmt.Errorf("Cannot get the device list: %v", err)
		fmt.Println(newErr)
		return newErr
	}

	if len(devList) == 0 {
		err := fmt.Errorf("No connected device. Connect some devices first.")
		fmt.Println(err)
		return err
	}

	fmt.Printf("\n***** Managed devices: %v\n", len(devList))
	for _, device := range devList {
		fmt.Printf("%v\n", device)
	}

	return nil
}


func setConnectionMode() error {
	fmt.Printf("\nEnter the device IDs to change the mode\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}	

	if len(devIDs) == 0 {
		err := fmt.Errorf("You have to enter at least one device ID!")
		fmt.Println(err)
		return err
	}

	var connMode string
	
	inputs := []*cli.UserInput{
		&cli.UserInput{
			"Select the connection mode (0: Gateway to Device(default), 1: Device to Gateway)", "0", &connMode,
		},
	}

	err = cli.GetUserInput(inputs)

	if err != nil {
		return err
	}	

	connMode = strings.TrimSpace(connMode)

	if connMode != "0" && connMode != "1" {
		err := fmt.Errorf("Invalid connection mode: %v", connMode)
		fmt.Println(err)
		return err
	}

	mode := connect.ConnectionMode_SERVER_TO_DEVICE
	if connMode == "1" {
		mode = connect.ConnectionMode_DEVICE_TO_SERVER
	}

	fmt.Printf("Changing the connection mode to %v for %v devices...\n", mode, len(devIDs))

	return connectSvc.SetConnectionModeMulti(devIDs, mode)
}


func enableSSL() error {
	fmt.Printf("\nEnter the device IDs to enable SSL\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}	

	if len(devIDs) == 0 {
		err := fmt.Errorf("You have to enter at least one device ID!")
		fmt.Println(err)
		return err
	}

	return connectSvc.EnableSSL(devIDs)
}


func disableSSL() error {
	fmt.Printf("\nEnter the device IDs to disable SSL\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}	

	if len(devIDs) == 0 {
		err := fmt.Errorf("You have to enter at least one device ID!")
		fmt.Println(err)
		return err
	}

	return connectSvc.DisableSSL(devIDs)
}


func disconnect() error {
	fmt.Printf("\nEnter the device IDs to disconnect\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}	

	if len(devIDs) == 0 {
		err := fmt.Errorf("You have to enter at least one device ID!")
		fmt.Println(err)
		return err
	}

	return connectSvc.Disconnect(devIDs)
}

func disconnectAll() error {
	fmt.Printf("Disconnecting all devices...\n")

	err := connectSvc.DisconnectAll()

	if err != nil {
		newErr := fmt.Errorf("Cannot disconnect: %v", err)
		fmt.Println(newErr)
		return newErr
	}

	return nil
}
