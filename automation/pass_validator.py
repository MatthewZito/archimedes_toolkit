import requests
import hashlib 
from sys import argv

''' Here, we strip password strings to first five chars prior to interpolating them
into the API call URI string so as not to give actual passes to the remote service. Then, we take all returned
matches to the first five chars of the hash and validate them against the full password locally.
'''

# return hashed pass w/specified alg, else loop until valid input given
def hash_pass(password, algorithm):
    if (algorithm == 'sha256'):
        return hashlib.sha256(password.encode('utf-8')).hexdigest().upper()
    elif (algorithm == 'sha1'): 
        return hashlib.sha1(password.encode('utf-8')).hexdigest().upper()
    elif (algorithm == 'md5'): 
        return hashlib.md5(password.encode('utf-8')).hexdigest().upper()
    else:
        algorithm_verify = input("Enter one of the following encoding types: 'sha1', 'sha256', 'md5': " )
        return hash_pass(password, algorithm_verify)

# fetch all hashes that match our hash substr
def request_api_data(stripped_hash):
    url = f'https://api.pwnedpasswords.com/range/{stripped_hash}'
    res = requests.get(url)
    if res.status_code != 200:
        raise RunTimeError(f'The following error is most likely attributable to the `password` input: {res.status_code}')
    return res.text

# match returned hashes against full hash
def match_passes(tail, array):
    hashes = (line.split(':') for line in array.splitlines())
    for h, count in hashes:
        if h == tail:
            return count
    return 0
def main(password, algorithm):
    # assign hashed pass and strip to 5 chars
    hashed_pass = hash_pass(password, algorithm)
    stripped_hashed_pass, hash_tail = hashed_pass[:5], hashed_pass[5:]

    # pull results and compare to original hashed pass 
    hash_array = request_api_data(stripped_hashed_pass)
    count = match_passes(hash_tail, hash_array)

    if count:
        print(f'Pass found {count} times.')
    else:
        print('Pass presumed safe.')

if __name__ == '__main__':
    main(argv[1], argv[2])

