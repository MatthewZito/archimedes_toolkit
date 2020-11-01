package internal

import (
	"fmt"

	"github.com/google/gopacket"
	"github.com/google/gopacket/pcap"
)

// Enumerate lists all wireless interfaces and their respective IPs, netmasks
func Enumerate() error {
	dev, err := pcap.FindAllDevs()
	if err != nil {
		return err
	}

	for _, d := range dev {

		for i, addr := range d.Addresses {
			if len(addr.IP) > 0 {
				if i == 0 {
					fmt.Println(d.Name)
					fmt.Println("-------------")
				}
				fmt.Println("IP: ", addr.IP)
				fmt.Println("Netmask: ", addr.Netmask)
				fmt.Print("\n")
			}
		}
	}
	return nil
}

// Sniff intercepts and prints in-transfer packets on ports 80, 443 via the given wireless interface
func Sniff(iface string) error {
	var (
		snaplen     = int32(1600)
		timeout     = pcap.BlockForever
		filter      = "tcp and (port 443 or port 80)"
		promiscuous = false
	)

	handler, err := pcap.OpenLive(iface, snaplen, promiscuous, timeout)
	if err != nil {
		return err
	}
	defer handler.Close()

	err = handler.SetBPFFilter(filter)
	if err != nil {
		return err
	}

	// decode
	src := gopacket.NewPacketSource(handler, handler.LinkType())
	fmt.Printf("[+] Initiating sniffer on interface %s...", iface)
	for p := range src.Packets() {
		fmt.Println(p)
	}
	return nil
}
