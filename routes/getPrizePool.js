const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const epoch = await contractInstance.getCurrentEpoch();
  const response = await contractInstance.getPrizePool(parseInt(epoch) + 1);
  return res.status(200).json({
    prizePool: BigInt(response).toString(),
  });
});

module.exports = router;
