const dgram = require("dgram");

function forgeAndSendUDPPacket(srcIP, srcPort, dstIP, dstPort, payload) {
  // Create a UDP socket
  const udpClient = dgram.createSocket("udp4");

  // Convert payload to JSON string
  const payloadJSON = JSON.stringify(payload);

  // Create the message buffer
  const messageBuffer = Buffer.from(payloadJSON);

  // Send the UDP packet
  udpClient.send(
    messageBuffer,
    0,
    messageBuffer.length,
    dstPort,
    dstIP,
    (err) => {
      if (err) {
        console.error("Error sending UDP packet:", err);
      } else {
        console.log("UDP packet sent successfully.");
      }
      // Close the socket when done
      udpClient.close();
    }
  );
}

const sourceIP = "157.51.98.156";
const sourcePort = 10000;
const destinationIP = "3.110.92.45";
const destinationPort = 3001;
const payloadData = {
  regno: "98984thanskse",
};

// Forge and send the UDP packet
forgeAndSendUDPPacket(
  sourceIP,
  sourcePort,
  destinationIP,
  destinationPort,
  payloadData
);
