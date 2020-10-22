package utils

import (
	"sort"
)

func BubbleSort(items []int) {
	endure := true
	for endure {
		endure = false

		for i := 0; i < len(items)-1; i++ {
			if items[i] > items[i+1] {
				items[i], items[i+1] = items[i+1], items[i]
				endure = true
			}
		}
	}
}

func Sort(items []int) {
	if len(items) < 1000 {
		BubbleSort(items)
		return
	}
	sort.Ints(items)
}
