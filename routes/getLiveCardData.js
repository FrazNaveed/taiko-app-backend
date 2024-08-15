const express = require("express");
const { default: axios } = require("axios");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const epoch = await contractInstance.getCurrentEpoch();

  const roundData = await contractInstance.rounds(1); // parseInt(epoch) - 1
  const lockedPrice = BigInt(roundData[1]).toString();
  const response = await axios.get(process.env.PRICE_FEED);
  const decimals = response.data.parsed[0].price.expo;
  const betsBull = BigInt(roundData[3]).toString();
  const betsBear = BigInt(roundData[4]).toString();
  const totalPoolReward = parseInt(betsBull) + parseInt(betsBear);
  return res.status(200).json({
    lockedPrice: lockedPrice,
    poolReward: totalPoolReward,
    decimals: decimals,
  });
});

module.exports = router;
