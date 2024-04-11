const dgram = require("dgram");

const client = dgram.createSocket("udp4");
const HOST = "192.168.16.133";
const PORT = 3001;

const sensorData = {
  regno: "21BIT0000",
};

// Convert sensorData object to JSON string
const sensorDataString = JSON.stringify(sensorData);
console.log(sensorDataString);

// Send encrypted message to server
client.send(Buffer.from(sensorDataString, "hex"), PORT, HOST, (err) => {
  if (err) {
    console.log("Error sending message:", err);
  } else {
    console.log("Encrypted message sent to server");
  }
});
