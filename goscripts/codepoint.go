package main

import (
	"fmt"
	"os"
	"strings"
)

const (
	usage = `Usage:
	pnt <char>`

	header = "lit\tdec\thex\tuni"
)

func main() {
	var char rune

	if args := os.Args[1:]; len(args) == 1 {
		char = rune(args[0][0])
	} else {
		fmt.Println(usage)
		return
	}
	fmt.Println(strings.Repeat("-", 45))
	fmt.Println(header)
	fmt.Printf("%c\t%[1]d\t%[1]x\t%[1]U\n", char)
}
