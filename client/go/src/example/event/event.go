package event

import (
	"fmt"
	"context"
	"biostar/service/event"
	"google.golang.org/grpc"
)

type EventSvc struct {
	client event.EventClient
}

func NewEventSvc(conn *grpc.ClientConn) *EventSvc {
	return &EventSvc{
		client: event.NewEventClient(conn),
	}
}

func (s *EventSvc) GetLog(deviceID, startEventID, maxNumOfLog uint32) ([]*event.EventLog, error) {
	req := &event.GetLogRequest{
		DeviceID: deviceID,
		StartEventID: startEventID, 
		MaxNumOfLog: maxNumOfLog,
	}

	resp, err := s.client.GetLog(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the log events: %v\n", err)

		return nil, err
	}

	return resp.GetEvents(), nil
}


func (s *EventSvc) GetImageLog(deviceID, startEventID, maxNumOfLog uint32) ([]*event.ImageLog, error) {
	req := &event.GetImageLogRequest{
		DeviceID: deviceID,
		StartEventID: startEventID, 
		MaxNumOfLog: maxNumOfLog,
	}

	resp, err := s.client.GetImageLog(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the image logs: %v\n", err)

		return nil, err
	}

	return resp.GetImageEvents(), nil
}


const (
	MONITORING_QUEUE_SIZE = 8
)

var (
	eventStream event.Event_SubscribeRealtimeLogClient
)

func (s *EventSvc) StartMonitoring(deviceID uint32) (context.CancelFunc, error) {
	enableReq := &event.EnableMonitoringRequest{
		DeviceID: deviceID,
	}

	_, err := s.client.EnableMonitoring(context.Background(), enableReq)

	if err != nil {
		fmt.Printf("Cannot enable log monitoring: %v\n", err)
		return nil, err
	}

	subReq := &event.SubscribeRealtimeLogRequest{
		QueueSize: MONITORING_QUEUE_SIZE,
		DeviceIDs: []uint32 { deviceID },
	}

	ctx, cancelFunc := context.WithCancel(context.Background())

	eventStream, err = s.client.SubscribeRealtimeLog(ctx, subReq)

	if err != nil {
		fmt.Printf("Cannot enable log monitoring: %v\n", err)
		return nil, err
	}

	go func() {
		fmt.Printf("Start receiving real-time events\n")

		for {
			eventLog, err := eventStream.Recv()

			if err != nil {
				fmt.Printf("Cannot receive real-time events: %v\n", err)
				return
			}

			fmt.Printf("Event: %v\n", eventLog)
		}

	} ()

	return cancelFunc, nil
}


func (s *EventSvc) StopMonitoring(deviceID uint32) error {
	disableReq := &event.DisableMonitoringRequest{
		DeviceID: deviceID,
	}

	_, err := s.client.DisableMonitoring(context.Background(), disableReq)

	if err != nil {
		fmt.Printf("Cannot disable log monitoring: %v\n", err)
		return err
	}

	fmt.Printf("Stop receiving real-time events\n")

	return nil
}