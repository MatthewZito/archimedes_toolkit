from selenium import webdriver
import re
# a favor for a friend
chrome_browser = webdriver.Chrome('./chromedriver')

chrome_browser.get("https://learnjapanesedaily.com/most-common-japanese-words.html")

lines = []
for i in range(1,18):
    chrome_browser.get(f"https://learnjapanesedaily.com/most-common-japanese-words.html/{str(i)}")
    elems = chrome_browser.find_elements_by_tag_name('p')
    for elem in elems:
        print(elem.text)
        match = re.match(r"(?m)^[0-9].*", elem.text)
        if (match):
            lines.append(match.group(0))
            
chrome_browser.close()

with open('japanese_words.txt', 'w') as file:
    for item in lines:
        file.write("%s\n" % item)
