const express = require("express");
const getEpochAndTime = require("../funcs/getEpochAndTime.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { currentEpoch, timeRemaining } = await getEpochAndTime();
  return res.status(200).json({
    currentEpoch: currentEpoch,
    timeRemaining: timeRemaining,
  });
});

module.exports = router;
