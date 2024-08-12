const express = require("express");
const router = express.Router();

router.post("/", async (req, res, next) => {
  return res.status(200).json({
    message: "Bet bull",
  });
});

module.exports = router;
