import socket

def send_udp_message(message, host, port):
    """
    Send a UDP message to a specified host and port.
    
    Args:
        message (str): The message to be sent.
        host (str): The hostname or IP address of the receiver.
        port (int): The port number on the receiver's machine.
    """
    try:
        # Create a UDP socket
        sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
        
        # Send the message
        sock.sendto(message.encode(), (host, port))
        
        print(f"Sent message: {message}")
    except Exception as e:
        print(f"Error while sending UDP message: {e}")
    finally:
        # Close the socket
        sock.close()

# Example usage:
if __name__ == "__main__":
    message = "Hello, UDP!"
    host = "127.0.0.1"  # Change this to the IP address or hostname of the receiver
    port = 7000         # Change this to the port number of the receiver
    send_udp_message(message, host, port)
