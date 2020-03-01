package main

import (
	"os"
	"fmt"
	
	"example/client"
	"example/connect"
	"example/device"
	"example/user"
	"example/finger"
	"example/card"
	"example/event"
)

const (
	CA_FILE = "../../../../cert/ca.crt"
	SERVER_IP = "192.168.0.2"
	SERVER_PORT = 4000
	
	A2_IP = "192.168.0.110"
	A2_PORT = 51211
	USE_SSL = false
)

var (
	grpcClient *client.GrpcClient

	connectSvc *connect.ConnectSvc
	deviceSvc *device.DeviceSvc
	userSvc *user.UserSvc
	fingerSvc *finger.FingerSvc
	cardSvc *card.CardSvc
	eventSvc *event.EventSvc
)


func testConnect() (uint32, error) {
	devList, err := connectSvc.GetDeviceList()

	if err != nil {
		return 0, err
	}

	fmt.Printf("Device list before connection: %v\n\n", devList)

	deviceID, err := connectSvc.Connect(A2_IP, A2_PORT, USE_SSL)

	if err != nil {
		return 0, err
	}	

	devList, err = connectSvc.GetDeviceList()

	if err != nil {
		return 0, err
	}

	fmt.Printf("Device list after connection %v\n\n", devList)

	return deviceID, nil
}


func testDevice(deviceID uint32) error {
	devInfo, err := deviceSvc.GetInfo(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf("Device info: %v\n\n", devInfo)

	capInfo, err := deviceSvc.GetCapabilityInfo(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf("Device capability info: %v\n\n", capInfo)

	return nil
}


func main() {
	grpcClient = client.NewGrpcClient()

	err := grpcClient.Connect(CA_FILE, SERVER_IP, SERVER_PORT)
	if err != nil {
		os.Exit(1)
	}

	connectSvc = connect.NewConnectSvc(grpcClient.GetConn())
	deviceSvc = device.NewDeviceSvc(grpcClient.GetConn())
	userSvc = user.NewUserSvc(grpcClient.GetConn())
	fingerSvc = finger.NewFingerSvc(grpcClient.GetConn())
	cardSvc = card.NewCardSvc(grpcClient.GetConn())
	eventSvc = event.NewEventSvc(grpcClient.GetConn())

	deviceID, err := testConnect()

	if err != nil {
		fmt.Printf("Cannot connect to the device: %v\n", err)
		os.Exit(1)
	}

	testDevice(deviceID)
	
	testFinger(deviceID)
	testCard(deviceID) 

	testUser(deviceID)

	testEvent(deviceID) 

	connectSvc.Disconnect([]uint32{ deviceID })

	grpcClient.Close()

	return
}