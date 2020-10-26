package main

import (
	"cloak/internal"
	"fmt"
	"os"
)

var prompts map[string]string = map[string]string{
	"noread":   "[-] Unable to read MAC address of device %v",
	"read":     "[+] Current MAC address for device %v is %v",
	"init":     "[*] Changing MAC address for device %v to %v",
	"validate": "[*] Validating persistence of new MAC address %v for device %v",
	"success":  "[+] Successfully updated device %v MAC address to %v",
	"fail":     "[-] Failed to update/persist device %v MAC address to %v",
}

// accepts as input a wireless interface; updates said interface's MAC address with a randomly generated, IEEE 802-compliant address
func main() {
	const usage = `usage: cloak interface_name`

	var iface string

	if input := os.Args[1:]; len(input) < 1 {
		fmt.Println(usage)
		return
	}

	iface = os.Args[1]

	failedRead := internal.Info(prompts["noread"], iface)

	// get curr MAC addr
	curr, err := internal.GetCurrentMAC(iface, failedRead)
	if err != nil {
		fmt.Println(err)
		return
	}
	// get curr MAC success
	fmt.Println(internal.Info(prompts["read"], iface, curr))

	// generate new random MAC addr
	newAddr, err := internal.GenerateRandomMAC()

	if err != nil {
		fmt.Printf("[-] An internal error occurred; see: %v\n", err)
		return
	}

	// format iface
	fmt.Println(internal.Info(prompts["init"], iface, newAddr))
	internal.FormatInterface(iface, newAddr, internal.Info(prompts["fail"], iface, newAddr))

	// validate persistence of new addr
	fmt.Println(internal.Info(prompts["validate"], newAddr, iface))
	curr, err = internal.GetCurrentMAC(iface, failedRead)
	if err != nil {
		fmt.Println(err)
		return
	}

	if curr != newAddr {
		// did not persist
		fmt.Println(internal.Info(prompts["fail"], iface, newAddr))
	} else {
		// persisted
		fmt.Println(internal.Info(prompts["success"], iface, newAddr))
	}
}
