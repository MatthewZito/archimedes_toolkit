import requests
from bs4 import BeautifulSoup
import pprint
import sys

target_url = sys.argv[1]
res = requests.get(f'{target_url}')
html_obj = BeautifulSoup(res.text, 'html.parser')

def sort_alpha(links):
    return sorted(links, key= lambda x:x['title'])

def extract_links(links):
    title = html_obj.find('title')
    arr = []
    for idx in enumerate(links):
        title = links[idx].getText()
        href = links[idx].get('href', None)
        arr.append({'title': title, 'url': href})
    return sort_alpha(arr)

def main():
  links = html_obj.find_all('a')
  pprint.pprint(extract_links(links))




  if __name__ == '__main__':
      main()