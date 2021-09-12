const { ethers } = require('ethers')
const ethProvider = require('eth-provider')

const useFrame = () => {
  const provider = new ethers.providers.Web3Provider(ethProvider())
  const signer = provider.getSigner()
  return signer
}

module.exports = {
  useFrame
}
