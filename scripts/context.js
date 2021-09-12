const hre = require("hardhat");
const addresses = require("./addresses");

const context = {
	dao: async (signer) => {
		return hre.ethers.getContractAt("GovAgave", addresses.rinkeby.dao, signer);
	},
	asbToken: async (signer) => {
		return hre.ethers.getContractAt("ASBToken", addresses.rinkeby.asbToken, signer);
	},
	lendingPoolMock: async (signer) => {
		return hre.ethers.getContractAt(
			"LendingPoolMock",
			addresses.rinkeby.lendingPoolMock,
			signer
		);
	},
};

module.exports = context;
