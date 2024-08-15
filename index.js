require("dotenv").config();
const http = require("http");
const express = require("express");
const cors = require("cors"); // Import cors
const WebSocket = require("ws");
const init = require("./runner");

const dummyBets1 = require("./routes/dummyBets1");
const dummyBets2 = require("./routes/dummyBets2");
const currentEpoch = require("./routes/getcurrentEpoch");
const timeRemaining = require("./routes/gettimeRemaining");
const prizePool = require("./routes/getPrizePool");
const getLiveCardData = require("./routes/getLiveCardData");
const getHistoricalData = require("./routes/getHistoricalData");
const getAlreadyBetted = require("./routes/getAlreadyBetted");
const getMinimumBetAmount = require("./routes/getMinimumBetAmount");

const app = express();

app.use(express.json());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json());

// Route setup
app.use("/currentEpoch", currentEpoch);
app.use("/timeRemaining", timeRemaining);
app.use("/prizePool", prizePool);
app.use("/getLiveCardData", getLiveCardData);
app.use("/getHistoricalData", getHistoricalData);
app.use("/getAlreadyBetted", getAlreadyBetted);
app.use("/getMinimumBetAmount", getMinimumBetAmount);

app.use("/dummyBets1", dummyBets1);
app.use("/dummyBets2", dummyBets2);

const server = http.createServer(app);
// const wss = new WebSocket.Server({ server });
// require("./sockets")(wss);

// Start the server
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  // init();
});

module.exports = app;
