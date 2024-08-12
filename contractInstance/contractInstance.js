const { ethers } = require("ethers");
const { contractAddress, abi } = require("./contractConfig");

const provider = new ethers.JsonRpcProvider("https://rpc.hekla.taiko.xyz");
const contract = new ethers.Contract(contractAddress, abi, provider);

module.exports = contract;
