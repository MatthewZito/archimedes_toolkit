package internal

const Usage = `usage: cloak interface_name`

var Prompts map[string]string = map[string]string{
	"noread":   "[-] Unable to read MAC address of device %v",
	"read":     "[+] Current MAC address for device %v is %v",
	"init":     "[*] Changing MAC address for device %v to %v",
	"validate": "[*] Validating persistence of new MAC address %v for device %v",
	"success":  "[+] Successfully updated device %v MAC address to %v",
	"fail":     "[-] Failed to update/persist device %v MAC address to %v",
}
