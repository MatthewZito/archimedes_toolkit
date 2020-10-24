package main

import (
	"fmt"
	"log"
	"net"
	"os"
	"sort"
	"time"
)

const maxPorts = 65535

func sortResults(ports []int) {
	sort.Ints(ports)
	for _, p := range ports {
		log.Printf("[+] Open port found: %d\n", p)
	}
}

// chan receives work; wg tracks said work's progress
func worker(ports chan int, results chan int, addr string) {
	for p := range ports {
		target := fmt.Sprintf("%s:%d", addr, p)

		conn, err := net.DialTimeout("tcp", target, 500*time.Millisecond)

		if err != nil {
			// port is closed
			results <- 0
			continue
		}

		conn.Close()
		// comm results to main thread
		results <- p
	}
}

func main() {
	args := os.Args[1:]
	if len(args) < 1 {
		log.Fatal("[-] A URL must be provided.")
	}

	addr := args[0]

	// channel to send ports to workers
	ports := make(chan int, 100)
	// channel to send results back to main thread
	results := make(chan int)

	var open []int

	for i := 0; i < cap(ports); i++ {
		go worker(ports, results, addr)

	}

	go func() {
		for i := 1; i < maxPorts; i++ {
			ports <- i
		}
	}()

	for i := 0; i < maxPorts; i++ {
		// recv ports - open or 0 - from worker thread
		port := <-results
		if port != 0 {
			open = append(open, port)
		}
	}

	close(ports)
	close(results)

	sortResults(open)
}
