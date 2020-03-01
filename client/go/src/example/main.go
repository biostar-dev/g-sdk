package main

import (
	"context"
	"fmt"
	"flag"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials"
	"biostar/service/device"
	deviceEx "example/device"
	"biostar/service/user"
	userEx "example/user"	
	"biostar/service/event"
	eventEx "example/event"		
)

const (
	GRPC_PORT = 4000
	CA_CERT_FILE = "../../../cert/ca.crt"
)

func main() {
	var serverAddr = flag.String("s", "", "server address in ipaddr:port format")	
	var deviceFile = flag.String("d", "device.json", "devices to register")	

	flag.Parse()

	if *serverAddr == "" {
		*serverAddr = fmt.Sprintf("localhost:%d", GRPC_PORT)
	}

	creds, err := credentials.NewClientTLSFromFile(CA_CERT_FILE, "")

	if err != nil {
		fmt.Printf("Cannot initialize TLS credential: %v\n", err)
		return
	}

	conn, err := grpc.Dial(*serverAddr, grpc.WithTransportCredentials(creds))

	if err != nil {
		fmt.Printf("Cannot connect to the GRPC server: %v\n", err)
		return
	}

	defer conn.Close()

	ctx := context.Background()

	deviceClient := device.NewDeviceClient(conn)




	deviceInfo, err := exDevice.SearchDevice(ctx, deviceClient)

	if err != nil {
		fmt.Printf("Cannot search device: %v\n", err)
	}

	fmt.Printf("Found Device List: %+v\n", deviceInfo) 

	deviceList, err := exDevice.GetDeviceList(ctx, deviceClient)

	if err != nil {
		fmt.Printf("Cannot get the devicve list: %v\n", err)
		return
	}

	fmt.Printf("Device List: %+v\n", deviceList)
	deviceID := deviceList[0]

	userClient := user.NewUserClient(conn)

	exUser.TestEnrollUser(ctx, userClient, deviceID)  

	eventClient := event.NewEventClient(conn)

	eventList, err := exEvent.GetLog(ctx, eventClient, deviceID)

	if err != nil {
		fmt.Printf("Cannot get the event list: %v\n", err)
		return
	}

	for _, eventLog := range eventList {
		fmt.Printf("Event: %+v\n", *eventLog)
	}

	exEvent.TestMonitoring(ctx, eventClient, deviceID) 
}