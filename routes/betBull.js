const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");
const router = express.Router();

router.post("/", async (req, res, next) => {
  const data = await contractInstance.admin();

  return res.status(200).json({
    message: "Bet bull",
  });
});

module.exports = router;
