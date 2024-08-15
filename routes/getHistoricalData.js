const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const epoch = await contractInstance.getCurrentEpoch();
    const roundData1 = await contractInstance.rounds(1); //parseInt(epoch) - 3
    const roundData2 = await contractInstance.rounds(1); //parseInt(epoch) - 4

    const startPrice1 = BigInt(roundData1[1]).toString();
    const closePrice1 = BigInt(roundData1[2]).toString();
    const betsBull1 = BigInt(roundData1[3]).toString();
    const betsBear1 = BigInt(roundData1[4]).toString();
    const totalPoolReward1 = parseInt(betsBull1) + parseInt(betsBear1);

    const startPrice2 = BigInt(roundData2[1]).toString();
    const closePrice2 = BigInt(roundData2[2]).toString();
    const betsBull2 = BigInt(roundData2[3]).toString();
    const betsBear2 = BigInt(roundData2[4]).toString();
    const totalPoolReward2 = parseInt(betsBull2) + parseInt(betsBear2);

    return res.status(200).json({
      round1: {
        startPrice: startPrice1,
        closePrice: closePrice1,
        totalPoolReward: totalPoolReward1,
      },
      round2: {
        startPrice: startPrice2,
        closePrice: closePrice2,
        totalPoolReward: totalPoolReward2,
      },
    });
  } catch (error) {
    console.error("Error fetching data from contract", error);
    return res.status(500).json({ error: "Error fetching data from contract" });
  }
});

module.exports = router;
