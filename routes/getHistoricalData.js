const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const epoch = await contractInstance.getCurrentEpoch();
    const roundData1 = await contractInstance.rounds(5); //parseInt(epoch) - 3

    const startPrice1 = BigInt(roundData1[1]).toString();
    const closePrice1 = BigInt(roundData1[2]).toString();
    const betsBull1 = BigInt(roundData1[3]).toString();
    const betsBear1 = BigInt(roundData1[4]).toString();
    const totalPoolReward1 = parseInt(betsBull1) + parseInt(betsBear1);

    return res.status(200).json({
      startPrice: startPrice1,
      closePrice: closePrice1,
      totalPoolReward: BigInt(totalPoolReward1).toString(),
    });
  } catch (error) {
    console.error("Error expired card data from contract", error);
    return res.status(500).json({ error: "Error fetching data from contract" });
  }
});

module.exports = router;
