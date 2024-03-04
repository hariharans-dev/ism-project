const express = require("express");
const app = express();
const cors = require("cors");
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

const attendance_router = require("./routes/unsecure/attendance_route");
const ip_router = require("./routes/unsecure/ip_route");

app.use("/attendance", attendance_router);
app.use("/ip", ip_router);

app.get("/health", (req, res) => {
  return res.status(200).json({ message: "response from the application" });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
