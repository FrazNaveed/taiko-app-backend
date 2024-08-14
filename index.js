// Import packages
require("dotenv").config();
const http = require("http");
const express = require("express");
const WebSocket = require("ws");
const bodyParser = require("body-parser");
const cors = require("cors");

// Controllers
const dummyBets1 = require("./routes/dummyBets1");
const dummyBets2 = require("./routes/dummyBets2");
const currentEpoch = require("./routes/getcurrentEpoch");
const timeRemaining = require("./routes/gettimeRemaining");
const prizePool = require("./routes/getPrizePool");
// const setStartPrice = require("./routes/setStartPrice");
// const setClosePrice = require("./routes/setClosePrice");

// Create an Express app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.use("/currentEpoch", currentEpoch);
app.use("/timeRemaining", timeRemaining);
app.use("/prizePool", prizePool);
app.use("/dummyBets1", dummyBets1);
app.use("/dummyBets2", dummyBets2);

// Create an HTTP server and attach the Express app to it
const server = http.createServer(app);

// Create a WebSocket server and attach it to the HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connections
wss.on("connection", (ws) => {
  console.log("Client connected");

  // Send data to the client every second
  const interval = setInterval(() => {
    ws.send(
      JSON.stringify({
        message: `Hello from WebSocket at ${new Date().toLocaleTimeString()}`,
      })
    );
  }, 1000);

  ws.on("close", () => {
    clearInterval(interval);
    console.log("Client disconnected");
  });
});

// Start the server
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
