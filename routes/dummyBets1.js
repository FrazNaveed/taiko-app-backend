const express = require("express");
const ethers = require("ethers");
const contractInstance = require("../contractInstance/contractInstance.js");

const getCurrentEpochAndTime = require("../funcs/getEpochAndTime");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const privateKeys = [
    "77cc8ae441c9dd466a5447e7e0b597adf89fd8f6984070b14ae86c6ff36d5867",
    "f9d1ecc06c9cd58a6dc10fef5956ccbb0443d7a59b26ff8e86a5b09fb7f67642",
  ];
  const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
  const wallets = privateKeys.map((pk) => new ethers.Wallet(pk, provider));
  const amountInEther = "0.01";
  const amountInWei = ethers.parseEther(amountInEther);
  const { currentEpoch } = await getCurrentEpochAndTime();
  const betBull = async (wallet) => {
    try {
      const contractWithSigner = contractInstance.connect(wallet);
      const tx = await contractWithSigner.betBull(parseInt(currentEpoch) + 1, {
        value: amountInWei,
      });
      await tx.wait();
      console.log(`Transaction confirmed for function 1`);
    } catch (error) {
      console.error(
        `Error calling function 1 with wallet ${wallet.address}:`,
        error
      );
    }
  };

  const betBear = async (wallet) => {
    try {
      const contractWithSigner = contractInstance.connect(wallet);
      const tx = await contractWithSigner.betBear(parseInt(currentEpoch) + 1, {
        value: amountInWei,
      });
      await tx.wait();
      console.log(`Transaction confirmed for function 2`);
    } catch (error) {
      console.error(
        `Error calling function 2 with wallet ${wallet.address}:`,
        error
      );
    }
  };

  await betBull(wallets[0]);
  await betBear(wallets[1]);
});

module.exports = router;
