require("dotenv").config();
const { ethers } = require("ethers");
const { contractAddress, abi } = require("./contractConfig");
const provider = new ethers.JsonRpcProvider(process.env.RPC_PROVIDER);
const contract = new ethers.Contract(contractAddress, abi, provider);

module.exports = contract;
