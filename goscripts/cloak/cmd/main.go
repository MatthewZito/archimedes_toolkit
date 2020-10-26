package main

import (
	"cloak/internal"
	"fmt"
	"os"
)

/*
	TODOS
	- parse flag args
	- optionally run script as root user
	- accept arg for specific vendor prefix
*/

// accepts as input a wireless interface; updates said interface's MAC address with a randomly generated, IEEE 802-compliant address
func main() {

	var iface string

	if input := os.Args[1:]; len(input) < 1 {
		fmt.Println(internal.Usage)
		return
	}

	iface = os.Args[1]

	failedRead := internal.Info(internal.Prompts["noread"], iface)

	// get curr MAC addr
	curr, err := internal.GetCurrentMAC(iface, failedRead)
	if err != nil {
		fmt.Println(err)
		return
	}
	// get curr MAC success
	fmt.Println(internal.Info(internal.Prompts["read"], iface, curr))

	// generate new random MAC addr
	newAddr, err := internal.GenerateRandomMAC()

	if err != nil {
		fmt.Printf("[-] An internal error occurred; see: %v\n", err)
		return
	}

	// format iface
	fmt.Println(internal.Info(internal.Prompts["init"], iface, newAddr))
	internal.FormatInterface(iface, newAddr, internal.Info(internal.Prompts["fail"], iface, newAddr))

	// validate persistence of new addr
	fmt.Println(internal.Info(internal.Prompts["validate"], newAddr, iface))
	curr, err = internal.GetCurrentMAC(iface, failedRead)
	if err != nil {
		fmt.Println(err)
		return
	}

	if curr != newAddr {
		// did not persist
		fmt.Println(internal.Info(internal.Prompts["fail"], iface, newAddr))
	} else {
		// persisted
		fmt.Println(internal.Info(internal.Prompts["success"], iface, newAddr))
	}
}
