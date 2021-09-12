const hre = require("hardhat");

async function lendingPool( signer) {
    const Pool = await hre.ethers.getContractFactory("LendingPoolMock", signer);
    const pool = await Pool.deploy();
    await pool.deployed();
    await pool.deployTransaction.wait();
    
    return pool
}

async function token(holders, signer) {
    const Token = await hre.ethers.getContractFactory("ASBToken", signer);
    const token = await Token.deploy(holders);
    await token.deployed();
    await token.deployTransaction.wait();
    
    return token
}

async function dao(token, signer) {
    const DAO = await hre.ethers.getContractFactory("GovAgave", signer);
    const dao = await DAO.deploy(token)
    await dao.deployed()
    await dao.deployTransaction.wait()

    return dao
}

module.exports = {
        deployToken: token,
        deployDao: dao,
        deployLendingPoolMock: lendingPool
    }