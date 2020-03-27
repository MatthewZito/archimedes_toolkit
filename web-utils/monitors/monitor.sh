#!/bin/bash
# monitor allows one to detect updates in a given webpage. 
# emails upon detected changes
# USAGE: $ nohup ./monitor.sh & # run as cron in bg
ADDRESS=""
PASSWORD=""
URL=""
for (( ; ; )); do
    mv new.html old.html 2> /dev/null
    curl $URL -L --compressed -s > new.html
    DIFF_OUTPUT="$(diff new.html old.html)"
    if [ "0" != "${#DIFF_OUTPUT}" ]; then
        sendEmail -f $ADDRESS -s smtp.gmail.com:587 \
            -xu $ADDRESS -xp $PASSWORD -t $ADDRESS \
            -o tls=yes -u "Change detected." \
            -m "Visit $URL"
        sleep 1000
    fi
done