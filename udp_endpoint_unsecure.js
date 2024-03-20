const dgram = require("dgram");

const server = dgram.createSocket("udp4");

const {
  verifyIPUDP,
  addattendanceudp,
  add_ip_log,
} = require("./controller/api_controller");

server.on("message", async (message, remote) => {
  try {
    const valid = await verifyIPUDP(remote.address);
    const date = new Date();
    if (!valid) {
      add_ip_log(remote.address, "reject", message, date);
    } else {
      const msg = JSON.parse(message);
      console.log(msg);
      await addattendanceudp(msg.regno);
      await add_ip_log(remote.address, "accept", message, date);
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

const PORT = 4000;

server.bind(PORT, "127.0.0.1");
