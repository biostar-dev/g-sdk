package cli

import (
	"fmt"
	"biostar/service/connect"
	"example/cli"
	"strconv"
	"strings"
)



func getConnectInfo() (*connect.ConnectInfo, error) {
	connInfo := &connect.ConnectInfo{}

	var ipAddr, portStr, useSSL string

	inputs := []*cli.UserInput{
		&cli.UserInput{
			"Enter the IP address of the device", "", &ipAddr,
		},
		&cli.UserInput{
			"Enter the port of the device (default: 51211)", "51211", &portStr,
		},
		&cli.UserInput {
			"Use SSL y/n (default: n)", "n", &useSSL,
		},
	}

	err := cli.GetUserInput(inputs)

	if err != nil {
		return nil, err
	}

	port, err := strconv.Atoi(portStr)

	if err != nil {
		newErr := fmt.Errorf("Invalid port %v: %v", portStr, err)
		fmt.Println(newErr)
		return nil, newErr
	}

	isSSL := strings.ToLower(strings.TrimSpace(useSSL))

	if isSSL != "n" && isSSL != "y" {
		newErr := fmt.Errorf("Use SSL should be y or n: %v", isSSL)
		fmt.Println(newErr)
		return nil, newErr
	}

	connInfo.IPAddr = ipAddr
	connInfo.Port = int32(port)
	connInfo.UseSSL = isSSL == "y"

	return connInfo, nil
}


func connectSync() error {
	fmt.Printf("Connect to a device synchronously...\n")

	connInfo, err := getConnectInfo()

	if err != nil {
		return err
	}

	fmt.Printf("Trying to connect to %v:%v", connInfo.IPAddr, connInfo.Port)

	if connInfo.UseSSL {
		fmt.Printf(" with SSL...\n")
	} else {
		fmt.Printf("...\n")
	}

	devID, err := connectSvc.Connect(connInfo.IPAddr, int(connInfo.Port), connInfo.UseSSL)

	if err != nil {
		newErr := fmt.Errorf("Cannot connect: %v", err)
		fmt.Println(newErr)
		return newErr
	}

	fmt.Printf("Connected to %v\n", devID)

	return nil
}



