import hashlib

word = "Hello"
hash = hashlib.sha1(word.encode('utf-8')).hexdigest().upper()
print(hash)