const dgram = require("dgram");

const server = dgram.createSocket("udp4");

const {
  verifyIPUDP,
  addattendanceudp,
  add_ip_log,
  verify_message,
} = require("./controller/api_controller");

server.on("message", async (message, remote) => {
  try {
    const msg = JSON.parse(message);

    const valid = await verifyIPUDP(remote.address);
    const status = await verify_message(msg);

    const date = new Date();
    if (!valid || !status) {
      const convmsg = JSON.stringify(JSON.parse(message));
      add_ip_log(remote.address, "secure reject", convmsg, date);
    } else {
      await addattendanceudp(msg.regno);
      const convmsg = JSON.stringify(JSON.parse(message));
      await add_ip_log(remote.address, "secure accept", convmsg, date);
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

const PORT = 7000;

server.bind(PORT, "127.0.0.1");
