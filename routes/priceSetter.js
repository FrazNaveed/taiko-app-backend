const express = require("express");
const router = express.Router();

router.get("/", async (req, res, next) => {
  return res.status(200).json({
    message: "price setter",
  });
});

module.exports = router;
