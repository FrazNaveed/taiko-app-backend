const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  let counter = 0;
  counter++;
  return res.status(200).json({
    message: "Bet bear",
    counter: counter,
  });
});

module.exports = router;
