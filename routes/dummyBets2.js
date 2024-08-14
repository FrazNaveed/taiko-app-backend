const express = require("express");
const ethers = require("ethers");
const { contractAddress } = require("../contractInstance/contractConfig.js");
const contractInstance = require("../contractInstance/contractInstance.js");

const router = express.Router();

router.post("/", async (req, res, next) => {
  const privateKeys = [
    "a59e784f38a6cb3c7d8cc1c9e8492fc74d0995a4426b10f9e9571e055902c91c",
    "3d48be04d9e2eb6c95c29b18b68af166c214d416722acf33c6afa32806c98a2c",
  ];
  const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
  const wallets = privateKeys.map((pk) => new ethers.Wallet(pk, provider));
  const amountInEther = "0.001";
  const amountInWei = ethers.parseEther(amountInEther);
  const epoch = await contractInstance.getCurrentEpoch();

  const betBull = async (wallet) => {
    try {
      const contractWithSigner = contractInstance.connect(wallet);
      const tx = await contractWithSigner.betBull(parseInt(epoch) + 1, {
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
      const tx = await contractWithSigner.betBear(parseInt(epoch) + 1, {
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
