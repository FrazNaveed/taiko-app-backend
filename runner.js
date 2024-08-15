const ethers = require("ethers");
const contractInstance = require("./contractInstance/contractInstance.js");
const setStartPrice = require("./funcs/setStartPrice.js");
const setClosePrice = require("./funcs/setClosePrice.js");

async function init() {
  const epoch = await contractInstance.getCurrentEpoch();
  const privateKey = process.env.PRIVATE_KEY;
  if (!privateKey) {
    throw new Error("Private key not found in environment variables");
  }
  const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
  const wallet = new ethers.Wallet(privateKey, provider);
  const contractWithSigner = contractInstance.connect(wallet);

  const eligible = await contractInstance.ledger(
    parseInt(epoch) + 1,
    wallet.address
  );

  if (eligible[2] == parseInt(0)) {
    const txn = await contractWithSigner.betBull(parseInt(epoch) + 1, {
      value: ethers.parseEther("0.00000001"),
    });
    txn.wait();
    console.log(txn.hash);
  } else {
    console.log("no need to place bet here");
  }
  const timeRemaining = await contractInstance.timeUntilNextEpoch();

  const timeRemainingInSeconds = await contractInstance.timeUntilNextEpoch();
  const delay = 20;
  console.log("Time remaining in seconds:", timeRemainingInSeconds);
  const timeRemainingInMilliseconds = (parseInt(timeRemaining) + delay) * 1000;
  setTimeout(firstFunction, timeRemainingInMilliseconds);
}

async function firstFunction() {
  console.log("here in 1st function");
  let timeRemaining;
  const epoch = await contractInstance.getCurrentEpoch();
  if (parseInt(epoch) - 1 != 0) {
    try {
      await setStartPrice();
      timeRemaining = await contractInstance.timeUntilNextEpoch();
    } catch (e) {
      console.log(e);
    }
  } else {
    console.log("Error: can't set price on 0 epoch");
  }
  setTimeout(secondFunction, parseInt(timeRemaining));
}

async function secondFunction() {
  console.log("here in 2nd function");

  let timeRemaining;
  try {
    await setClosePrice();
    timeRemaining = await contractInstance.timeUntilNextEpoch();
  } catch (e) {
    console.log(e);
  }
  const timeRemainingInMilliseconds = parseInt(timeRemaining) * 1000;
  setTimeout(firstFunction, timeRemainingInMilliseconds);
}

module.exports = init;
