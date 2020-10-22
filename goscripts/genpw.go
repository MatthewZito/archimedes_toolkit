package main

import (
	"encoding/base64"
	"fmt"
	"os"
)

const usage = `Usage:
	genpw <service> [-n]
`

var salt = "" // your key here

func main() {
	args := os.Args

	if len(args) < 2 || len(args) > 3 {
		fmt.Printf("%s", usage)
		return
	}

	input := args[1]

	if len(args) == 3 {
		if args[2] == "-n" {
			salt += "\n"
		}
	}

	raw := []byte(input + salt)

	r := base64.StdEncoding.EncodeToString(raw)

	fmt.Printf("%s\n", r)
}
