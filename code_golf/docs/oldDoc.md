
## Table of Contents

 - [Introduction](#intro) 
   * [Documentation](#docs)
     + [Extensive Password Validation w/SHA1, SHA256, MD5](#passvalidator)
     + [Automated Web Monitoring](#shmonitor)

### <a name="intro"></a> Introduction
A personal /etc repository.

This directory contains several custom utilities spanning myriad domains, among them scripting, validation, general I/O applications, web plugins, and code golf.

### <a name="docs"></a> Documentation

#### <a name="passvalidator"></a> Local Password Validation w/SHA1, SHA256, MD5 ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/automation/pass_validator.py))

The validator is interesting and I'm pleased with my implementation. Passwords get leaked all the time. My validator accepts as input your actual passes. It first encrypts the pass with SHA1, or MD5 if we are checking against your wireless network (perhaps someone captured a 4-way handshake and has the MD5 hash to your network). Then, the validator strips the hashed pass to five chars, and makes an API call to HaveIBeenPwnd?, perhaps the most robust open database of broken passes. 

We strip to five chars because we don't actually want to make an API request that submits our actual full pass to the remote service. What happens, then, is the API validates against the first five chars of our hashed pass. Then, it returns all matches, which we loop through and match against our full pass (we store the tail in a local variable). This way, actual full pass validation is done locally in our cache. Passes only exist for the session.

#### <a name="shmonitor"></a> Automated Web Monitoring: Detect Changes on a Given Website ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/web-utils/monitor.sh))

Monitor is a dynamic-input shell script which is intrinsically quite simple but in execution readily subject to the whims of UNIX, cron, and processes. I wrote Monitor after DD missed another record release from her favorite musician. I thought "let's just make a cron job that monitors the page for updates."

Okay, admittedly my first idea was that maybe I could directionally DDOS them or something to clog up their server's threads (leaving a few for me to choose from). This has several obvious flaws, notable among them that it is illegal and per my ethic improper and unethical computing. It's also patently ridiculous and absurd. Time to get serious...

It'd be simple to just utilize `curl` or `wget` (I went with the superior-qua-this-purpose `curl`) to pull the page source as it exists at time of execution, write it in a variable, and subsequently do the same into a second variable at regular intervals, comparing the two on each iteration. If the two vars are the same (the source hasn't changed), open a stream and `cat` var two into var one. We can dump any errors along the way to our friendly neighborhood black hole, `/dev/null`. We repeat this check at intervals configured such that we aren't slamming the webpage with GET requests (we'd know - the source would become a timeout page). 

Now, when the two vars do not eval to true, we use `sendEmail` to email ourselves an alert. Excellent. No worrying about coordinating timezones and missing the next vinyl release :D The moment Bladee releases a new record, we'll know before everyone and the newsletter. Of course, this script has many wonderful use-cases that I intend to endeavor upon.

Note the two variables are instantiated in the home directory as `old.html` and `new.html`. It is preferable to run this script as a cron job; we can push it into the bg and check it periodically. We can do this with `nohup ./monitor.sh &`.

### <a name="notes"></a> Development Notes

