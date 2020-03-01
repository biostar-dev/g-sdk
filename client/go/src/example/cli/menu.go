package cli

import (
	"fmt"
	"bufio"
	"os"
	"strconv"
	"strings"
)

type MenuCallback func () error

type MenuItem struct {
	Key string
	Text string
	Callback MenuCallback
	ExitMenu bool
}

func ShowMenu(title string, items []*MenuItem) {
	scanner := bufio.NewScanner(os.Stdin)

	for true {
		fmt.Printf("\n===== %v =====\n\n", title)

		for _, item := range items {
			fmt.Printf("(%v) %v\n", item.Key, item.Text)
		}
	
		fmt.Printf("\n>>>>> Select a menu: ")
	
		if !scanner.Scan() {
			err := scanner.Err()
			fmt.Printf("Cannot get the input: %v\n", err)
			continue
		}
	
		inputStr := strings.ToLower(strings.TrimSpace(scanner.Text()))

		for _, item := range items {
			if item.Key == inputStr {
				if item.Callback != nil {
					item.Callback()
				}

				if item.ExitMenu {
					return
				}

				break
			}
		}
	}
}

type UserInput struct {
	Text string
	Default string
	Input *string
}

func GetUserInput(inputs []*UserInput) error {
	scanner := bufio.NewScanner(os.Stdin)

	for _, input := range inputs {
		fmt.Printf(">> %v: ", input.Text)

		if !scanner.Scan() {
			err := scanner.Err()
			fmt.Printf("Cannot get the input: %v\n", err)
			return err
		}		

		*(input.Input) = scanner.Text()

		if *(input.Input) == "" && input.Default != "" {
			*(input.Input) = input.Default
		}
	}

	return nil
}


func GetDeviceIDs() ([]uint32, error) {
	devIDs := []uint32{}

	for true {
		var devIDStr string
	
		inputs := []*UserInput{
			&UserInput{
				"Enter the device ID (Press just ENTER if no more device)", "", &devIDStr,
			},
		}

		err := GetUserInput(inputs)
	
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

		devIDs = append(devIDs, uint32(devID))
	}

	return devIDs, nil
}
