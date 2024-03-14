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

source_ip = "157.51.21.151"
source_port = 10000
destination_ip = "157.51.165.65"
destination_port = 4000
payload_data = {
    "regno": "21BIT0143"
}

# Convert payload_data to JSON format
payload_json = json.dumps(payload_data)

forge_and_send_udp_packet(source_ip, source_port, destination_ip, destination_port, payload_json)
