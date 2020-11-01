#!/bin/bash

# Store binary stream or static string in var x. Convert each binary number to decimal.
# $((2#$a)) is binary to decimal conversion in bash; printf will convert this to hex. 
# Last, pipe output to xxd.

for a in $x; do printf "%x" $((2#$a)); done | xxd -r -p 

# If binary input is contained in a file, read line by line, then word by word. 
# Another option is using only printf, but then you need octal numbers, so using printf twice:

for a in $x; do printf \\$(printf "%o" $((2#$a))); done
