const dgram = require("dgram");
const crypto = require("crypto");

const client = dgram.createSocket("udp4");

const sensorData = {
  temperature: 25,
  humidity: 60,
  pressure: 1013,
};

const PORT = 7000;
const HOST = "192.168.16.96";

// Convert sensorData object to JSON string
const sensorDataString = JSON.stringify(sensorData);

// Send encrypted message to server
client.send(Buffer.from(sensorDataString), PORT, HOST, (err) => {
  if (err) {
    console.log("Error sending message:", err);
  } else {
    console.log("Encrypted message sent to server");
  }
});

client.on("error", (err) => {
  client.close();
});
