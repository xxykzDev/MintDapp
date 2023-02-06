require("@nomicfoundation/hardhat-toolbox"); // => Importamos el plugin brindado por hardhat toolbox
import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan"; // instalamos el plugin de etehrscan que nos disponibiliza hardhat
import * as dotenv from "dotenv";

dotenv.config();

const DEFAULT_GAS_MULTIPLIER: number = 1; //  setea el valor al estimateGas, en caso de necesitarlo se podria hacer indicar 1.1, haciendo un 10% extra en gas en comparacion con el costo del gas

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    truffle: {
      url: "http://localhost:24012/rpc",
      timeout: 60000,
      gasMultiplier: DEFAULT_GAS_MULTIPLIER,
    },
  },
  etherscan: {
    apiKey: {
      // Ethereum
      goerli: process.env.BLOCK_EXPLORER_API_KEY || "",
      mainnet: process.env.BLOCK_EXPLORER_API_KEY || "",
    },
  },
};

export default config;
