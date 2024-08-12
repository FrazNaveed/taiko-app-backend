const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.post("/", async (req, res, next) => {
  return res.status(200).json({
    message: "Bet bear",
  });
});

module.exports = router;
