const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await contractInstance.timeUntilNextEpoch();
  return res.status(200).json({
    timeLeft: BigInt(response).toString(),
  });
});

module.exports = router;
