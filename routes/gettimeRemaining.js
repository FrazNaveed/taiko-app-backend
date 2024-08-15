const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const gameData = await contractInstance.game();
    const intervalSeconds = BigInt(gameData[3]);
    const launchDate = BigInt(gameData[4]);

    const nowTime = BigInt(Math.floor(Date.now() / 1000));

    let nextEpochStartTime;
    let timeUntilNextEpoch;

    if (nowTime <= launchDate) {
      timeUntilNextEpoch = launchDate - nowTime;
    } else {
      const currentEpoch = (nowTime - launchDate) / intervalSeconds;
      nextEpochStartTime =
        (currentEpoch + BigInt(1)) * intervalSeconds + launchDate;

      if (nowTime < nextEpochStartTime) {
        timeUntilNextEpoch = nextEpochStartTime - nowTime;
      } else {
        timeUntilNextEpoch = BigInt(0);
      }
    }

    const timeUntilNextEpochMs = Number(timeUntilNextEpoch) * 1000;

    return res.status(200).json({ timeUntilNextEpoch: timeUntilNextEpochMs });
  } catch (error) {
    console.error("Error calculating time until next epoch:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
