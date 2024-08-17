const express = require("express");
const contractInstance = require("../contractInstance/contractInstance.js");
const getCurrentEpochAndTime = require("../funcs/getEpochAndTime.js");
const ethers = require("ethers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const { userAddress } = req.query;
  console.log(userAddress);
  let totalReward = BigInt(0);

  try {
    let { currentEpoch } = await getCurrentEpochAndTime();

    currentEpoch = parseInt(currentEpoch);

    for (let epoch = 1; epoch <= currentEpoch; epoch++) {
      const round = await contractInstance.rounds(epoch);
      console.log("round", round);
      const roundStatus = round[0];
      const betInfo = await contractInstance.ledger(epoch, userAddress);

      if (!betInfo.claimed && parseInt(betInfo[2] != 0)) {
        //   if (
        //     round.status === 7 || // Draw
        //     (round.status === 5 && round.bullAmount.eq(0)) || // Bear wins, no bull bets
        //     (round.status === 6 && round.bearAmount.eq(0)) // Bull wins, no bear bets
        //   ) {
        //     totalReward = totalReward.add(betInfo.amount);
        //   } else if (
        //     betInfo.position === 1 && // Bear
        //     round.status === 5 // Bear wins
        //   ) {
        //     totalReward = totalReward.add(
        //       betInfo.amount.mul(round.rewardAmount).div(round.bearAmount)
        //     );
        //   } else if (
        //     betInfo.position === 0 && // Bull
        //     round.status === 6 // Bull wins
        //   ) {
        //     totalReward = totalReward.add(
        //       betInfo.amount.mul(round.rewardAmount).div(round.bullAmount)
        //     );
        //   }
      }
    }
  } catch (e) {
    console.log(e);
  }

  return res.status(200).json({
    userTotalRewards: BigInt(totalReward).toString(),
  });
});

module.exports = router;
