const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());
const udpserver_secure = require("./udp_endpoint_secure");
const udpserver_unsecure = require("./udp_endpoint_unsecure");

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const attendance_router = require("./routes/attendance_route");
const ip_router = require("./routes/ip_route");

app.use("/attendance", attendance_router);
app.use("/ip", ip_router);

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "response from the application" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Api-Server at http://0.0.0.0:${PORT}/`);
});
