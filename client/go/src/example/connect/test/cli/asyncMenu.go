package cli

import (
	"fmt"
	"strconv"
	"strings"
	"example/cli"
	"biostar/service/connect"
)

var (
	asyncMenuItems []*cli.MenuItem
)

func init() {
	asyncMenuItems = []*cli.MenuItem{
		&cli.MenuItem{
			"1", "Add async connections", addAsyncConnection, false,
		},
		&cli.MenuItem{
			"2", "Delete async connections", deleteAsyncConnection, false,
		},
		&cli.MenuItem{
			"3", "Refresh the connection list", showAsyncConnection, false,
		},		
		&cli.MenuItem{
			"q", "Return to Main Menu", nil, true,
		},
	}
}

func showAsyncMenu() error {
	err := showAsyncConnection()

	if err != nil {
		return err
	}

	cli.ShowMenu("Async Menu", asyncMenuItems)
	return nil
}


func showAsyncConnection() error {
	devList, err := connectSvc.GetDeviceList()

	if err != nil {
		newErr := fmt.Errorf("Cannot get the device list: %v", err)
		fmt.Println(newErr)
		return newErr
	}

	asyncList := []*connect.DeviceInfo{}

	for _, device := range devList {
		if device.AutoReconnect {
			asyncList = append(asyncList, device)
		}
	}

	fmt.Printf("\n***** Async connections: %v\n", len(asyncList))

	for _, device := range asyncList {
		fmt.Printf("%v\n", device)
	}

	return nil
}


func getAsyncConnectInfo() ([]*connect.AsyncConnectInfo, error) {
	connInfos := []*connect.AsyncConnectInfo{}

	for true {
		connInfo := &connect.AsyncConnectInfo{}

		var devIDStr string
	
		inputs := []*cli.UserInput{
			&cli.UserInput{
				"Enter the device ID (Press just ENTER if no more device)", "", &devIDStr,
			},
		}

		err := cli.GetUserInput(inputs)
	
		if err != nil {
			return nil, err
		}	
	
		if strings.TrimSpace(devIDStr) == "" {
			break
		}

		devID, err := strconv.Atoi(devIDStr)

		if err != nil  {
			newErr := fmt.Errorf("Invalid device ID: %v", err)
			fmt.Println(newErr)
			return nil, newErr
		}

		connInfo.DeviceID = uint32(devID)
	
		syncConnInfo, err := getConnectInfo()

		if err != nil {
			return nil, err
		}

		connInfo.IPAddr = syncConnInfo.IPAddr
		connInfo.Port = syncConnInfo.Port
		connInfo.UseSSL = syncConnInfo.UseSSL

		connInfos = append(connInfos, connInfo)
	}

	return connInfos, nil
}


func addAsyncConnection() error {
	connInfos, err := getAsyncConnectInfo()

	if err != nil {
		return err
	}

	if len(connInfos) == 0 {
		err := fmt.Errorf("No device information")
		fmt.Println(err)
		return err
	}

	fmt.Printf("Adding asynchronous connections for %d devices...\n", len(connInfos))

	err = connectSvc.AddAsyncConnection(connInfos)

	if err != nil {
		return err
	}

	showAsyncConnection()

	return nil
}


func deleteAsyncConnection() error {
	fmt.Printf("\nEnter the device IDs to delete\n")

	devIDs, err := cli.GetDeviceIDs()

	if err != nil {
		return err
	}

	fmt.Printf("Deleting asynchronous connections for %v devices...\n", len(devIDs))

	err = connectSvc.DeleteAsyncConnection(devIDs)

	if err != nil {
		return err
	}

	showAsyncConnection()

	return nil
}