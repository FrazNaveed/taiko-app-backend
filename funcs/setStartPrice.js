require("dotenv").config();
const ethers = require("ethers");
const contractInstance = require("../contractInstance/contractInstance.js");
const { default: axios } = require("axios");

const setStartPrice = async () => {
  try {
    const epoch = await contractInstance.getCurrentEpoch();
    const response = await contractInstance.timeUntilNextEpoch();
    console.log(response, epoch);
    const lastEpoch = parseInt(epoch) - 1;
    const latestPriceResponse = await axios.get(process.env.PRICE_FEED);
    const latestPrice = BigInt(
      latestPriceResponse.data.parsed[0].price.price
    ).toString();
    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key not found in environment variables");
    }
    const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = contractInstance.connect(wallet);
    const tx = await contractWithSigner.setStartPrice(0, latestPrice);
    await tx.wait();
    console.log(`Transaction successful with hash: ${tx.hash}`);
  } catch (e) {
    console.error("Error setting start price:", e);
  }
};
module.exports = setStartPrice;
