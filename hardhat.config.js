require("@nomiclabs/hardhat-waffle");
const { types, task } = require("hardhat/config");
const { useFrame } = require("./helpers/useFrame");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
	const accounts = await hre.ethers.getSigners();

	for (const account of accounts) {
		console.log(account.address);
	}
});

task("deploy:lendingPoolMock", "Deploys mock lending pool")
	.addOptionalParam("frame", "Use Frame?", false, types.boolean)
	.setAction(async (taskArgs) => {
		console.log(taskArgs);

		let signer;
		taskArgs.frame
			? (signer = useFrame())
			: (signer = await hre.ethers.getSigners()[0]);

		const { deployLendingPoolMock } = require("./scripts/deploy");

		const lendingPool = await deployLendingPoolMock(signer);

		console.log("LendingPool: ", lendingPool.address);
	});

task("deploy:dao", "Deploys DAO and Token")
	.addVariadicPositionalParam("holders", "Initial set of ASB Token holders")
	.addOptionalParam("frame", "Use Frame?", false, types.boolean)
	.setAction(async (taskArgs) => {
		console.log(taskArgs);

		let signer;
		taskArgs.frame
			? (signer = useFrame())
			: (signer = await hre.ethers.getSigners()[0]);

		const { deployToken, deployDao } = require("./scripts/deploy");

		const token = await deployToken(taskArgs.holders, signer);
		const dao = await deployDao(token.address, signer);

		console.log("ASBToken: ", token.address);
		console.log("DAO:      ", dao.address);
	});

task("LendingPoolMock:setPoolPause", "Pause/Unpause protocol")
  .addPositionalParam("pause", "set pause state", false, types.boolean)
	.addOptionalParam("frame", "Use Frame?", false, types.boolean)
	.setAction(async (taskArgs) => {
		let signer;
		taskArgs.frame
			? (signer = useFrame())
			: (signer = await hre.ethers.getSigners()[0]);

		const context = require("./scripts/context");
		const dao = await context.dao(signer);
		const lendingPool = await context.lendingPoolMock(signer);

		const callData = lendingPool.interface.encodeFunctionData("setPoolPause", [
			taskArgs.pause,
		]);

		await dao.propose(
			[lendingPool.address],
			[0],
			[callData],
			"Proposal #0: Pause lending pool"
		);
	});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
	solidity: "0.8.4",
};
