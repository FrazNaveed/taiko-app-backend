require("dotenv").config();
const contractInstance = require("../contractInstance/contractInstance.js");

const getCurrentEpochAndTimeRemaining = async () => {
  try {
    const gameData = await contractInstance.game();
    const intervalSeconds = BigInt(gameData[3]);
    const launchDate = BigInt(gameData[4]);

    const nowtime = BigInt(Math.floor(Date.now() / 1000));

    let currentEpoch;
    let nextEpochStartTime;
    let timeRemaining;

    if (nowtime <= launchDate) {
      currentEpoch = 0n;
      timeRemaining = launchDate - nowtime;
    } else {
      currentEpoch = (nowtime - launchDate) / intervalSeconds;
      nextEpochStartTime = (currentEpoch + 1n) * intervalSeconds + launchDate;
      timeRemaining = nextEpochStartTime - nowtime;
    }

    return {
      currentEpoch: Number(currentEpoch),
      timeRemaining: Number(timeRemaining) * 1000,
    };
  } catch (error) {
    console.error("Error fetching game data or calculating epoch:", error);
    return null;
  }
};

module.exports = getCurrentEpochAndTimeRemaining;
