 
#step one: waits two hours
#step two: opens web browser
#step three: loops steps one and two

import time
import webbrowser

total_breaks = 3
break_count = 0

print("This program started on "+time.ctime())
while break_count<total_breaks:
    time.sleep(7200)
    webbrowser.open("https://www.youtube.com/watch?v=Km0LKiGs_8g")
    break_count+=1