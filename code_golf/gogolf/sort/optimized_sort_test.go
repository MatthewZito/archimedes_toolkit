package utils

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

// go test -bench=.
func TestBubbleSortWorstCase(t *testing.T) {
	items := []int{9, 8, 7, 6, 5}
	Sort(items)

	assert.NotNil(t, items)
	assert.EqualValues(t, 5, len(items))

	assert.EqualValues(t, 5, items[0])
	assert.EqualValues(t, 6, items[1])
	assert.EqualValues(t, 7, items[2])
	assert.EqualValues(t, 8, items[3])
	assert.EqualValues(t, 9, items[4])
}

func TestBubbleSortBestCase(t *testing.T) {
	items := []int{5, 6, 7, 8, 9}

	Sort(items)

	assert.NotNil(t, items)
	assert.EqualValues(t, 5, len(items))

	assert.EqualValues(t, 5, items[0])
	assert.EqualValues(t, 6, items[1])
	assert.EqualValues(t, 7, items[2])
	assert.EqualValues(t, 8, items[3])
	assert.EqualValues(t, 9, items[4])
}

func getElements(n int) []int {
	result := make([]int, n)
	i := 0
	for j := n - 1; j >= 0; j-- {
		result[i] = j
		i++

	}
	return result
}

func TestGetElements(t *testing.T) {
	items := getElements(5)
	assert.NotNil(t, items)
	assert.EqualValues(t, 5, len(items))
	assert.EqualValues(t, 4, items[0])
	assert.EqualValues(t, 3, items[1])
	assert.EqualValues(t, 2, items[2])
	assert.EqualValues(t, 1, items[3])
	assert.EqualValues(t, 0, items[4])
}

func BenchmarkBubbleSort10(b *testing.B) {
	items := getElements(10)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkSort10(b *testing.B) {
	items := getElements(10)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkBubbleSort1000(b *testing.B) {
	items := getElements(1000)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkSort1000(b *testing.B) {
	items := getElements(1000)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkBubbleSort100000(b *testing.B) {
	items := getElements(100000)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkSort100000(b *testing.B) {
	items := getElements(100000)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkBubbleSort50000(b *testing.B) {
	items := getElements(50000)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}

func BenchmarkSort50000(b *testing.B) {
	items := getElements(50000)
	for i := 0; i < b.N; i++ {
		Sort(items)
	}
}
