package main

import (
	"flag"
	"fmt"
	"sniffer/internal"
)

const usage = `
	sniffer 
		--iface device
		--list
	Sniff packets in transfer on ports 80 and 443.
`

var iface = flag.String("iface", "", "Interface on which to sniff.")
var list = flag.Bool("list", false, "Enumerate all interfaces.")

func main() {
	flag.Parse()
	if len(*iface) > 0 {
		if err := internal.Sniff(*iface); err != nil {
			fmt.Println("[-] Failed to sniff packets. See: ", err)
			return
		}
	}

	if *list {
		if err := internal.Enumerate(); err != nil {
			fmt.Println("[-] Unable to read network interfaces. See: ", err)
			return
		}
	}

}
