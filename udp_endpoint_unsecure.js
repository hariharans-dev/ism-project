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
      const msg = JSON.stringify(JSON.parse(message));
      add_ip_log(remote.address, "reject", msg, date);
    } else {
      const msg = JSON.stringify(JSON.parse(message));
      await addattendanceudp(msg.regno);
      await add_ip_log(remote.address, "accept", msg, date);
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

const PORT = 6000;

server.bind(PORT, "127.0.0.1");
