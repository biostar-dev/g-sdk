package main

import (
	"fmt"
	"math/rand"
	"biostar/service/user"
	"biostar/service/finger"
)

const (
	TEMPLATE_FORMAT = finger.TemplateFormat_TEMPLATE_FORMAT_SUPREMA

	NUM_OF_NEW_USER = 3
	NUM_OF_TEMPLATE_PER_FINGER = 2
)


func testUser(deviceID uint32) error {
	userHdrs, err := userSvc.GetList(deviceID)

	if err != nil {
		return err
	}

	fmt.Printf("User list: %v\n\n", userHdrs)

	userIDs := make([]string, len(userHdrs))
	for i := 0; i < len(userHdrs); i++ {
		userIDs[i] = userHdrs[i].ID
	}

	userInfos, err := userSvc.GetUser(deviceID, userIDs)

	if err != nil {
		return err
	}

	for _, userInfo := range userInfos {
		fmt.Printf("User: %v %v %v\n", userInfo.Name, userInfo.Hdr, userInfo.Setting)
	}

	newUsers := make([]*user.UserInfo, NUM_OF_NEW_USER)
	newUserIDs := make([]string, NUM_OF_NEW_USER)

	for i := 0; i < NUM_OF_NEW_USER; i++ {
		newUsers[i] = &user.UserInfo{
			Hdr: &user.UserHdr{
				ID: fmt.Sprintf("%v", rand.Int31()),
			},
		}

		newUserIDs[i] = newUsers[i].Hdr.ID
	}

	err = userSvc.Enroll(deviceID, newUsers)

	if err != nil {
		return err
	}

	userHdrs, _ = userSvc.GetList(deviceID)
	fmt.Printf("\nUser list after enrolling new users: %v\n\n", userHdrs)	

	err = testSetFinger(deviceID, newUserIDs[0])
	if err != nil {
		fmt.Printf("Cannot test fingerprints: %v\n", err)
	}

	err = userSvc.Delete(deviceID, newUserIDs)

	if err != nil {
		return err
	}

	userHdrs, _ = userSvc.GetList(deviceID)
	fmt.Printf("User list after deleting new users: %v\n\n", userHdrs)	

	return nil
}


func testSetFinger(deviceID uint32, userID string) error {
	userInfos, err := userSvc.GetUser(deviceID, []string{ userID })

	if err != nil {
		return err
	}

	fmt.Printf("\nUser without fingerprint: %v\n\n", userInfos[0])

	userFingerData := &user.UserFinger{
		UserID: userID,
		Fingers: []*finger.FingerData{},
	}

	fingerData := &finger.FingerData{
		Templates: make([][]byte, NUM_OF_TEMPLATE_PER_FINGER),
	}

	fmt.Printf(">>> Scan a finger for user %v\n", userID)

	fingerData.Templates[0], _, err = fingerSvc.Scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD)
	if err != nil {
		return err
	}

	fmt.Printf(">>> Scan the same finger for user %v\n", userID)
	fingerData.Templates[1], _, err = fingerSvc.Scan(deviceID, TEMPLATE_FORMAT, QUALITY_THRESHOLD)
	if err != nil {
		return err
	}

	userFingerData.Fingers = append(userFingerData.Fingers, fingerData)

	err = userSvc.SetFinger(deviceID, []*user.UserFinger{ userFingerData })
	if err != nil {
		return err
	}

	userInfos, err = userSvc.GetUser(deviceID, []string{ userID })

	if err != nil {
		return err
	}

	fmt.Printf("\nUser after adding fingerprints: %v\n\n", userInfos[0])	

	return nil
}