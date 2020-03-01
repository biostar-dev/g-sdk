package user

import (
	"fmt"
	"context"
	"biostar/service/user"
	"google.golang.org/grpc"
)

type UserSvc struct {
	client user.UserClient
}

func NewUserSvc(conn *grpc.ClientConn) *UserSvc {
	return &UserSvc{
		client: user.NewUserClient(conn),
	}
}

func (s *UserSvc) GetList(deviceID uint32) ([]*user.UserHdr, error) {
	req := &user.GetListRequest{
		DeviceID: deviceID,
	}

	resp, err := s.client.GetList(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the user list: %v\n", err)

		return nil, err
	}

	return resp.GetHdrs(), nil
}


func (s *UserSvc) GetUser(deviceID uint32, userIDs []string) ([]*user.UserInfo, error) {
	req := &user.GetRequest{
		DeviceID: deviceID,
		UserIDs: userIDs,
	}

	resp, err := s.client.Get(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get user info: %v\n", err)
		return nil, err
	}

	return resp.GetUsers(), nil
}


func (s *UserSvc) Enroll(deviceID uint32, users []*user.UserInfo) error {
	req := &user.EnrollRequest{
		DeviceID: deviceID,
		Users: users,
	}

	_, err := s.client.Enroll(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot enroll user: %v\n", err)
		return err
	}

	return nil
}


func (s *UserSvc) EnrollMulti(deviceIDs []uint32, users []*user.UserInfo) error {
	req := &user.EnrollMultiRequest{
		DeviceIDs: deviceIDs,
		Users: users,
	}

	_, err := s.client.EnrollMulti(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot enroll user multi: %v\n", err)
		return err
	}

	return nil
}


func (s *UserSvc) Delete(deviceID uint32, userIDs []string) error {
	req := &user.DeleteRequest{
		DeviceID: deviceID,
		UserIDs: userIDs,
	}

	_, err := s.client.Delete(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot delete user: %v\n", err)
		return err
	}

	return nil
}


func (s *UserSvc) DeleteAll(deviceID uint32) error {
	req := &user.DeleteAllRequest{
		DeviceID: deviceID,
	}

	_, err := s.client.DeleteAll(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot delete all user: %v\n", err)
		return err
	}

	return nil
}


func (s *UserSvc) GetCard(deviceID uint32, userIDs []string) ([]*user.UserCard, error) {
	req := &user.GetCardRequest{
		DeviceID: deviceID,
		UserIDs: userIDs,
	}

	resp, err := s.client.GetCard(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the cards of the users: %v\n", err)
		return nil, err
	}

	return resp.GetUserCards(), nil
}


func (s *UserSvc) SetCard(deviceID uint32, userCards []*user.UserCard) error {
	req := &user.SetCardRequest{
		DeviceID: deviceID,
		UserCards: userCards,
	}

	_, err := s.client.SetCard(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot set the cards to the users: %v", err)
		return err
	}

	return nil
}


func (s *UserSvc) GetFinger(deviceID uint32, userIDs []string) ([]*user.UserFinger, error) {
	req := &user.GetFingerRequest {
		DeviceID: deviceID,
		UserIDs: userIDs,
	}

	resp, err := s.client.GetFinger(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot get the fingerprints of the users: %v\n", err)
		return nil, err
	}

	return resp.GetUserFingers(), nil
}


func (s *UserSvc) SetFinger(deviceID uint32, userFingers []*user.UserFinger) error {
	req := &user.SetFingerRequest{
		DeviceID: deviceID,
		UserFingers: userFingers,
	}

	_, err := s.client.SetFinger(context.Background(), req)

	if err != nil {
		fmt.Printf("Cannot set the fingerprints to the users: %v", err)
		return err
	}

	return nil
}
