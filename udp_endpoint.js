const dgram = require("dgram");
const { validationResult } = require("express-validator");

const server = dgram.createSocket("udp4");

const {
  verifyIPUDP,
  addattendanceudp,
} = require("./controller/unsecure/api_controller");

const PORT = 4000;

server.on("message", async (message, remote) => {
  try {
    const valid = await verifyIPUDP(remote.address);
    if (!valid) {
      console.log("invalid message ip");
    } else {
      const msg = JSON.parse(message);
      addattendanceudp(msg.regno);
    }
    return "success";
  } catch (error) {
    return "error";
  }
});

server.on("listening", () => {
  const address = server.address();
  console.log(`UDP server listening on ${address.address}:${address.port}`);
});

server.bind(PORT);
