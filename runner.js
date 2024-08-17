const ethers = require("ethers");
const contractInstance = require("./contractInstance/contractInstance.js");
const setStartPrice = require("./funcs/setStartPrice.js");
const setClosePrice = require("./funcs/setClosePrice.js");
const getTimeAndEpoch = require("./funcs/getEpochAndTime.js");

async function init() {
  try {
    let { currentEpoch } = await getTimeAndEpoch();
    const epochToBetOn = currentEpoch + 1;

    console.log("currentEpoch", currentEpoch);
    console.log("epochToBetOn", epochToBetOn);

    const privateKey = process.env.PRIVATE_KEY;
    if (!privateKey) {
      throw new Error("Private key not found in environment variables");
    }

    const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
    const wallet = new ethers.Wallet(privateKey, provider);
    const contractWithSigner = contractInstance.connect(wallet);

    const eligible = await contractInstance.ledger(
      epochToBetOn,
      wallet.address
    );

    if (eligible[2] == parseInt(0)) {
      const minBetAmount = await contractInstance.minBetAmount();
      const gasPrice = ethers.parseUnits("100", "gwei");
      const gasLimit = 1000000;
      try {
        const txn = await contractWithSigner.betBull(epochToBetOn, {
          value: ethers.parseUnits(minBetAmount.toString(), "wei"),
          gasPrice: gasPrice,
          gasLimit: gasLimit,
        });
        await txn.wait();
        console.log("Txn success", txn.hash);
      } catch (transactionError) {
        console.error("Transaction failed:", transactionError);
      }
    } else {
      console.log("No need to place a bet here");
    }
    let { timeRemaining } = await getTimeAndEpoch();

    const delay = 5000;
    timeRemaining = timeRemaining + delay;
    setTimeout(() => {
      firstFunction();
    }, timeRemaining);
  } catch (error) {
    console.error("Error initializing the function:", error);
    setTimeout(() => {
      firstFunction();
    }, timeRemaining);
  }
}

async function firstFunction() {
  console.log("here in 1st function");
  let { currentEpoch } = await getTimeAndEpoch();
  if (parseInt(currentEpoch) - 1 != 0) {
    try {
      await setStartPrice(parseInt(currentEpoch) - 1); // -1 epoch
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Error: can't set price on 0 epoch");
  }
  let { timeRemaining } = await getTimeAndEpoch();
  timeRemaining = timeRemaining;
  console.log("timeRemaining to call the 2nd function", timeRemaining);
  setTimeout(() => {
    secondFunction();
  }, timeRemaining);
}

async function secondFunction() {
  console.log("here in 2nd function");
  try {
    let { currentEpoch } = await getTimeAndEpoch();

    await setClosePrice(parseInt(currentEpoch) - 2); // -2 epoch
  } catch (e) {
    console.log(e);
    setTimeout(init, 10000);
  }
  setTimeout(init, 10000);
}

module.exports = init;
