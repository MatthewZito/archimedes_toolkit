package internal

import (
	"crypto/rand"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"regexp"
)

// redirect stdout/stderr, exec cmd
func executeCommand(command string, args []string, prompt string) error {
	cmd := exec.Command(command, args...)
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr

	if err := cmd.Run(); err != nil {
		return errors.New(prompt)
	}
	return nil
}

// Info accepts a format string and variable arguments to interpolate therein
// Returns formatted string
func Info(format string, args ...interface{}) string {
	msg := fmt.Sprintf(format, args...)
	return msg
}

// GetCurrentMAC reads ifconfig output for a given wireless interface
// Returns either the device's current MAC address or an error if said address could not be read
func GetCurrentMAC(iface string, prompt string) (string, error) {
	re := regexp.MustCompile(`\w\w:\w\w:\w\w:\w\w:\w\w:\w\w`)
	// read current MAC and output
	if out, err := exec.Command("ifconfig", iface).Output(); err != nil {
		return "", errors.New(prompt)
	} else if currAddr := re.FindStringSubmatch(fmt.Sprintf("%s", out)); currAddr == nil {
		return "", errors.New(prompt)
	} else {
		return currAddr[0], nil
	}
}

// GenerateRandomMAC generates and returns a random IEEE 802-compliant MAC address
// Returns an error if generation fails
func GenerateRandomMAC() (string, error) {
	buf := make([]byte, 6)
	if _, err := rand.Read(buf); err != nil {
		return "", errors.New("an error occurred during MAC address generation")
	}
	// set local bit to prevent collission w/possible globally administered addr
	buf[0] |= 2
	return fmt.Sprintf("%02x:%02x:%02x:%02x:%02x:%02x", buf[0], buf[1], buf[2], buf[3], buf[4], buf[5]), nil
}

// FormatInterface executes system commands to reassign the MAC address of the given wireless interface
func FormatInterface(iface string, newAddr string, prompt string) error {
	// bring iface down
	if err := executeCommand("ifconfig", []string{iface, "down"}, prompt); err != nil {
		return err
	}
	// reassign MAC addr
	if err := executeCommand("ifconfig", []string{iface, "hw", "ether", newAddr}, prompt); err != nil {
		return err
	}
	// bring iface online
	if err := executeCommand("ifconfig", []string{iface, "up"}, prompt); err != nil {
		return err
	}
	return nil
}
