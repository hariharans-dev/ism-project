const {
  verifyIPUDP,
  addattendanceudp,
  add_ip_log,
} = require("./controller/api_controller");

const dgram = require("dgram");

const udpServer = dgram.createSocket("udp4");
const UDP_PORT = 6000;

udpServer.on("error", (err) => {
  udpServer.close();
});

udpServer.on("message", async (message, remote) => {
  try {
    const msgs = message.toString("utf-8");
    console.log(msgs);
    const valid = await verifyIPUDP(remote.address);
    const date = new Date();
    if (!valid) {
      add_ip_log(remote.address, "reject", msgs, date);
    } else {
      const parsedMessage = JSON.parse(msgs);
      const regno = parsedMessage.regno; // Extracting regno from the message
      const msg = JSON.stringify(parsedMessage);
      await addattendanceudp(regno);
      await add_ip_log(remote.address, "accept", msg, date);
    }
    return "success";
  } catch (error) {
    return "error";
  }
});

udpServer.on("listening", () => {
  const address = udpServer.address();
  console.log(
    "Udp-Secure-Server at http://" + address.address + ":" + address.port + "/"
  );
});

udpServer.bind(UDP_PORT);
