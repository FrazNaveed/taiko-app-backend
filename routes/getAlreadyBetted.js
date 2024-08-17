const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");
const getCurrentEpochAndTime = require("../funcs/getEpochAndTime");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { address } = req.query;
  let betted;
  const { currentEpoch } = await getCurrentEpochAndTime();

  const response = await contractInstance.ledger(
    parseInt(currentEpoch) + 1,
    address
  );
  if (BigInt(response[2]).toString() == BigInt(0)) {
    betted = false;
  } else {
    betted = true;
  }
  return res.status(200).json({
    betted: betted,
  });
});

module.exports = router;
