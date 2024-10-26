require("dotenv").config();
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.27",
  defaultNetwork: "aiaTestnet",
  networks: {
    hardhat: {},
    aiaTestnet: {
      url: "https://aia-dataseed1-testnet.aiachain.org",
      chainId: 0x528,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
