const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const response = await contractInstance.getCurrentEpoch();
  return res.status(200).json({
    epoch: BigInt(response).toString(),
  });
});

module.exports = router;
