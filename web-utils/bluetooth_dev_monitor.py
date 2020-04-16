from bluetooth import *
devList = discover_devices()
for device in devList:
    name = str(lookup_name(device))
    print(f"[+] Found Bluetooth Device {str(name)}")
    print(f"[+] MAC address: {str(device)}")