const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");
const getCurrentEpochAndTime = require("../funcs/getEpochAndTime");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { currentEpoch } = await getCurrentEpochAndTime();
  const response = await contractInstance.getPrizePool(
    parseInt(currentEpoch) + 1
  );
  return res.status(200).json({
    prizePool: BigInt(response).toString(),
  });
});

module.exports = router;
