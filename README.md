# utils
various custom utilities 

This directory contains several custom utilities spanning myriad domains, among them scripting, validation, general I/O applications, and web plugins.
These utilities are first built in a generalized, 'boilerplate' manner; they are each later expounded upon, in some cases to such a degree that
I have published them (e.g. the [pynotes command-line utility](https://github.com/MatthewZito/py_notes), or the [putlocker userscript](https://github.com/MatthewZito/utils/blob/master/web/putlockerstyle.js)

They may be of use to you. Otherwise, I store these scripts here so as to facilitate the aggregation thereof into a scalable, portable library of personal computing utilities. 

# How it Works: Extensive Password Validation (SHA1, SHA256, MD5)

The password validator is interesting. Passwords get leaked all the time. My validator accepts as input your actual passes. It first encrypts the pass with SHA1, or MD5 if we are checking against your wireless network (perhaps someone captured a 4-way handshake and has the MD5 hash to your network). Then, the validator strips the hashed pass to five chars, and makes an API call to HaveIBeenPwnd?, perhaps the most robust open database of broken passes. 

We strip to five chars because we don't actually want to make an API request that passes our actual full pass to the remote service. What happens, then, is the API validates against the first five chars of our hashed pass. Then, it returns all matches, which we loop through and match against our full pass (we store the tail in a local variable). This way, actual full pass validation is done locally in our cache. Passes only exist for the session.

