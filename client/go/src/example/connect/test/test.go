package main

import (
	"os"
	"fmt"
	connectService "biostar/service/connect"
	"example/client"
	"example/connect"
	"example/connect/test/cli"
)

const (
	CA_FILE = "../../../../../cert/ca.crt"
	SERVER_IP = "192.168.0.2"
	SERVER_PORT = 4000
)

var (
	grpcClient *client.GrpcClient

	connectSvc *connect.ConnectSvc
)


func main() {
	grpcClient = client.NewGrpcClient()

	err := grpcClient.Connect(CA_FILE, SERVER_IP, SERVER_PORT)
	if err != nil {
		os.Exit(1)
	}

	connectSvc = connect.NewConnectSvc(grpcClient.GetConn())

	statusStream, cancelFunc, err := connectSvc.Subscribe()

	if err != nil {
		grpcClient.Close()
		os.Exit(1)
	}

	defer cancelFunc()

	go receiveDeviceStatus(statusStream) 

	done := make(chan interface{})

	cli.InitMainMenu(connectSvc)

	go func() {
		cli.ShowMainMenu(done)
	} ()

	<- done

	grpcClient.Close()

	return
}


func receiveDeviceStatus(statusStream connectService.Connect_SubscribeStatusClient) {
	for {
		statusChange, err := statusStream.Recv()

		if err != nil {
			fmt.Printf("Cannot get device status: %v", err)
			return
		}

		if statusChange.Status != connectService.Status_TCP_NOT_ALLOWED && statusChange.Status != connectService.Status_TLS_NOT_ALLOWED {
			fmt.Printf("\n[STATUS] Device status change: %v\n", *statusChange)
		}
	}
}