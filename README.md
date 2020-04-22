# The Archimedes Toolkit 
![version](https://img.shields.io/badge/version-0.2.0-blue)

## Table of Contents

 - [Introduction](#intro) 
 - [How it Works: Extensive Password Validation w/SHA1, SHA256, MD5](#passvalidator)
 - [How it Works: Automated Web Monitoring](#shmonitor)
 - [Archimedes Pentesting Suite](#security)
 - [How it Works: MAC Changer](#macchanger)
 - [How it Works: ARP-driven Network Scanner](#networkscanner)
 - [How it Works: Automated ARP Spoofing](#arpspoof)
 - [Development Notes](#notes)

### <a name="intro"></a> Introduction
This directory contains several custom utilities spanning myriad domains, among them scripting, validation, general I/O applications, and web plugins.
These utilities are first built in a generalized, 'boilerplate' manner; they are each later expounded upon, in some cases to such a degree that I have published them (e.g. the [pynotes command-line utility](https://github.com/MatthewZito/py_notes), or the [putlocker userscript](https://github.com/MatthewZito/utils/blob/master/web-utils/putlockerstyle.js)).

They may be of use to you. Otherwise, I store these programs and scripts here so as to facilitate the aggregation thereof into a scalable, portable library of personal computing utilities. I use them as remote modules quite a bit.

For the remainder of this documentation, I will discuss the more interesting (in my opinion, anyway) among these tools, outlining their design, usage, and implementation theory. If you would like to know more about a program I have yet to document with such a degree of granularity, do let me know and I will add it to this README.

### <a name="passvalidator"></a> How it Works: Extensive Password Validation w/SHA1, SHA256, MD5 ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/automation/pass_validator.py))

The validator is interesting and I'm pleased with my implementation. Passwords get leaked all the time. My validator accepts as input your actual passes. It first encrypts the pass with SHA1, or MD5 if we are checking against your wireless network (perhaps someone captured a 4-way handshake and has the MD5 hash to your network). Then, the validator strips the hashed pass to five chars, and makes an API call to HaveIBeenPwnd?, perhaps the most robust open database of broken passes. 

We strip to five chars because we don't actually want to make an API request that submits our actual full pass to the remote service. What happens, then, is the API validates against the first five chars of our hashed pass. Then, it returns all matches, which we loop through and match against our full pass (we store the tail in a local variable). This way, actual full pass validation is done locally in our cache. Passes only exist for the session.

### <a name="shmonitor"></a> How it Works: Automated Web Monitoring ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/web-utils/monitor.sh))

Monitor is a dynamic-input shell script which is intrinsically quite simple but in execution readily subject to the whims of UNIX, cron, and processes. I wrote Monitor after DD missed another record release from her favorite musician. I thought "let's just make a cron job that monitors the page for updates."

Okay, admittedly my first idea was that maybe I could directionally DDOS them or something to clog up their server's threads (leaving a few for me to choose from). This has several obvious flaws, notable among them that it is illegal and per my ethic improper and unethical computing. It's also patently ridiculous and absurd. Time to get serious...

It'd be simple to just utilize `curl` or `wget` (I went with the superior-qua-this-purpose `curl`) to pull the page source as it exists at time of execution, write it in a variable, and subsequently do the same into a second variable at regular intervals, comparing the two on each iteration. If the two vars are the same (the source hasn't changed), open a stream and `cat` var two into var one. We can dump any errors along the way to our friendly neighborhood black hole, `/dev/null`. We repeat this check at intervals configured such that we aren't slamming the webpage with GET requests (we'd know - the source would become a timeout page). 

Now, when the two vars do not eval to true, we use `sendEmail` to email ourselves an alert. Excellent. No worrying about coordinating timezones and missing the next vinyl release :D The moment Bladee releases a new record, we'll know before everyone and the newsletter. Of course, this script has many wonderful use-cases that I intend to endeavor upon.

Note the two variables are instantiated in the home directory as `old.html` and `new.html`. It is preferable to run this script as a cron job; we can push it into the bg and check it periodically. We can do this with `nohup ./monitor.sh &`.

## <a name="security"></a> Security and Penetration Testing Suite
There is, in the web utilities directory (/web-utils), a sub-directory dedicated to pen-testing tools. These programs should only be used for research purposes, and never an illegal capacity.

That said, let's explore how some of these programs I wrote work:

### <a name="macchanger"></a>  How it Works: 48-bit MAC Address Changer ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/pentesting/mac_changer.py))

NOTE: This tool is for 48-bit MACs, with a %02x default byte format.

MAC (Media Access Control) is a permanent, physical, and unique address assigned to network interfaces by device manufacturers. This means even your wireless card, for instance, has its own unique MAC address.

The MAC address, analogous to an IP on the internet, is utilized within a network in order to facilitate the proper delivery of resources and data (i.e. packets). An interaction will generally consist of a source MAC and a destination MAC. MAC addresses can identify you, be filtered, or otherwise access-restricted.

Important to note is these unique addresses are not ephemeral; they are persistent and will remain associated with a device were a user to install it in another machine. But the two don't have to be inextricably intertwined...

The MAC Address Changer (I'll come up with a more *nix-like name later) will
accept as user-provided arguments any given wireless device and any valid MAC address to which the user wishes to reassign said device. The program is simple such that I need not explain it much further: it utilizes the subprocess module to automate the sequence of the necessary shell commands to bring the wireless interface down, reassign the MAC, and reinitialize it. 

What I enjoy about this program, however, is the security it affords the user. If you are actively changing your MAC address, it might be prudent to have some sort of validation structure or higher order method to ensure that 1) the wireless device exists, 2) the wireless device accommodates a MAC address, 3) the user-input MAC address is of a valid format, and 4) the wireless device's MAC address has successfully been updated.

It's rather nice; give it a try.

Update: I've crossed off another TODO - I added a MAC address generator option. By using the `--auto` option in lieu of a specific MAC address, the program will generate a valid MAC address per IEEE specifications. Soon, I will add an option that allows the user to specify a vendor prefix for MAC generation. This is becoming a great Layer 2 solution.

Update 0.2.0: I'm excited to have implemented extended functionality for generating not only wholly random (and valid) MAC addresses, but MAC addresses which either begin with a specific vendor prefix (OUI), or are generated with multicast and/or UAA options. These options trigger byte-code logic in the generator method, which are augmented per IEEE specifications. Learn more about MAC addresses [here](https://en.wikipedia.org/wiki/Organizationally_unique_identifier#Bit-reversed_representation).


### <a name="networkscanner"></a>  How it Works: ARP-Based Network Scanner ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/pentesting/network_scanner.py))

The network scanner is another very useful tool, and a formidable one when used in conjunction with the aforementioned MAC changer. This scanner utilizes ARP request functionality by accepting as user input a valid ipv4 or ipv6 IP address and accompanying - albeit optional - subnet range. 

The program then takes the given IP and/or range, then validates them per IEEE
specifications (again, this validation is run against ipv4 and ipv6 standards). Finally, a broadcast object is instantiated with the given IP and a generated ethernet frame; this object returns to us a list of all connected devices within the given network and accompanying range, mapping their IPs to respective MAC addresses.

The program outputs a table with these associations, which then might be used as input for the MAC changer should circumstances necessitate it.

### <a name="arpspoof"></a>  How it Works: Automated ARP Spoofing ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/pentesting/arp_spoof.py))

The ARP Spoof program enables us to redirect the flow of packets in a given network by simulateously manipulating the ARP tables of a given target client and its network's gateway. This program auto-enables port forwarding during this process, and dynamically constructs and sends ARP packets.  

When the program is terminated by the user, the targets' ARP tables are reset, so as not to leave the controller in a precarous situation (plus, it's the nice thing to do). 

Because this program places the controller in the middle of the packet-flow between the client and AP, the controller therefore has access to all dataflow (dealing with potential encryption of said data is a task for another script). From here, our myriad options for packet-flow orchestration become readily apparent: surrogation of code by way of automation and regex matching, forced 300-status redirects, remote access, et al.

### <a name="packetsniff"></a>  How it Works: HTTP Packet Sniffer ([view source](https://github.com/MatthewZito/archimedes_toolkit/blob/master/pentesting/packet_sniffer.py))

The packet sniffer is an excellent program to execute after running the ARP Spoofer; it creates a dataflow of all intercepted HTTP packets' data which includes either URLs, or possible user credentials. 

The scipt is extensible and can accomodate a variety of protocols by instantiating the listener object with one of many available filters.

### <a name="notes"></a> Development Notes

Seems these scripts I've been writing have manifested something new in its own right; I have been drafting the system architecture for a tool which aggregates all of the utilities, payloads, and compilers currently being added to the pentesting sub-directory here in this repository.

You may notice many of these scripts are not yet optimized. Payload code has not been obfuscated, connections are left unencrypted, and many of the programs should be classes. These are tasks I am putting off until I have finished writing all base payloads and utils. Only then will I best be able to plan an object-oriented architecture under which to organize all of this as a single, open-source utility.