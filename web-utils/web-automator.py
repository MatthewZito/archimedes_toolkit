from selenium import webdriver

# This is an automator skeleton; these methods are arranged in sequence.


# instantiate instance of browser
chrome_browser = webdriver.Chrome('./chromedriver')

chrome_browser.get('')

# validate page title w/regex
assert 'phrase or regex' in chrome_browser.title
# validate in src w/regex
assert 'phrase or regex' in chrome_browser.page_source
# select element
element = chrome_browser.find_element_by_class_name('class-name')
# read element inner text
print(element.get_attribute('innerHTML'))
# select form, input
form_element = chrome_browser.find_element_by_id('id')
form_element.clear()
form_element.send_keys('input')
# select form button, submit
button = chrome_browser.find_element_by_class_name('form-button-submit')
button.click()
# close browser instance
chrome_browser.close()
# quit all sessions, exit binary
chrome_browser.quit()


