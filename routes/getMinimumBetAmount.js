const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await contractInstance.minBetAmount();
  return res.status(200).json({
    minBet: BigInt(response).toString(),
  });
});

module.exports = router;
