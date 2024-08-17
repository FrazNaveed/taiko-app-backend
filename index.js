require("dotenv").config();
const cors = require("cors");
const http = require("http");
const express = require("express");
const init = require("./runner");

const dummyBets1 = require("./routes/dummyBets1");
const dummyBets2 = require("./routes/dummyBets2");
const timeAndEpoch = require("./routes/getTimeAndEpoch");
const prizePool = require("./routes/getPrizePool");
const getLiveCardData = require("./routes/getLiveCardData");
const getHistoricalData = require("./routes/getHistoricalData");
const getAlreadyBetted = require("./routes/getAlreadyBetted");
const getMinimumBetAmount = require("./routes/getMinimumBetAmount");
const getUserTotalRewards = require("./routes/getUserTotalRewards");

const app = express();
app.use(express.json());
app.use(cors());
app.use(require("body-parser").urlencoded({ extended: false }));
app.use(require("body-parser").json());

app.use("/getCurrentEpochAndTime", timeAndEpoch);
app.use("/getPrizePool", prizePool);
app.use("/getLiveCardData", getLiveCardData);
app.use("/getHistoricalData", getHistoricalData);
app.use("/getAlreadyBetted", getAlreadyBetted);
app.use("/getMinimumBetAmount", getMinimumBetAmount);
//app.use("/getUserTotalRewards", getUserTotalRewards);

app.use("/dummyBets1", dummyBets1);
app.use("/dummyBets2", dummyBets2);

const server = http.createServer(app);

// Start the server
const port = process.env.PORT || 9001;
server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
  init();
});

module.exports = app;
