from scapy.all import *
import json

def forge_and_send_udp_packet(src_ip, src_port, dst_ip, dst_port, payload):
    # Create an IP layer with specified source and destination IP addresses
    ip_layer = IP(src=src_ip, dst=dst_ip)
    
    # Create a UDP layer with specified source and destination ports
    udp_layer = UDP(sport=src_port, dport=dst_port)
    
    # Construct the packet by combining the IP and UDP layers with the payload
    packet = ip_layer / udp_layer / payload
    
    # Send the packet
    send(packet)

source_ip = "192.168.16.65"
source_port = 10000
destination_ip = "192.168.16.133"
destination_port = 3001
payload_data = {
    "regno": "21BIT0349",
    "sign":"BJr3djKyb6l1B+ZD3jvx17dTdaZkiWGRg8O+g72D2yljFLyNhZLI3d7HnImc4UKdTpqYyKaEObg7uZT5p5M2MDPnPOZCrmrZV/dcx0r0ui+L2zx1ue5qi6Ao9BCVrr7c/ityJQArzEQEGctZthBbsjcwqmPJX0NmHzTfY8nYGCNN6TZt9gKxSO4VcrKDS9wjc7JZJY2XpVD7FcOiaVZ401UkTtTT8m6AZZtilN2QqU/P6XQ+oS88nJPb0ohVWAAPSjbdJgYE3vJiyh0e2QYzhC0aMWtxWFdQ04mpWBD9"
}

# Convert payload_data to JSON format
payload_json = json.dumps(payload_data)

forge_and_send_udp_packet(source_ip, source_port, destination_ip, destination_port, payload_json)
