const ethers = require("ethers");
const contractInstance = require("../contractInstance/contractInstance.js");
const getCurrentEpochAndTime = require("./getEpochAndTime.js");
const { default: axios } = require("axios");

const setClosePrice = async (epochToSetClosePrice) => {
  console.log("epochToSetClosePrice", epochToSetClosePrice);
  const { currentEpoch } = await getCurrentEpochAndTime();
  console.log("Current epoch now:", currentEpoch);
  try {
    console.log("in close price");
    let startPrice;

    if (epochToSetClosePrice != 0) {
      startPrice = await contractInstance.rounds(epochToSetClosePrice);
      if (parseInt(startPrice) != 0) {
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
        const gasPrice = ethers.parseUnits("100", "gwei");
        const gasLimit = 1000000;
        const tx = await contractWithSigner.setClosePrice(
          epochToSetClosePrice,
          latestPrice,
          {
            gasPrice,
            gasLimit,
          }
        );
        await tx.wait();
        console.log(`Transaction successful with hash: ${tx.hash}`);
      }
    }
  } catch (e) {
    console.error("Error setting start price:", e);
  }
};

module.exports = setClosePrice;
