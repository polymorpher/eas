import * as dotenv from 'dotenv'
import '@nomicfoundation/hardhat-ethers'
import { HardhatUserConfig } from 'hardhat/config'
import '@typechain/hardhat'
import 'hardhat-gas-reporter'
import 'hardhat-deploy'
import 'solidity-coverage'
import 'hardhat-abi-exporter'
import '@atixlabs/hardhat-time-n-mine'
import 'hardhat-spdx-license-identifier'
import 'hardhat-contract-sizer'
dotenv.config()

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.17',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  namedAccounts: {
    deployer: 0
  },
  typechain: {
    target: 'ethers-v6',
    // node16Modules: true
  },
  networks: {
    local: {
      url: process.env.LOCAL_URL || 'http://localhost:8545',
      accounts: { mnemonic: process.env.LOCAL_MNEMONIC },
      live: false,
      saveDeployments: false
    },
    testnet: {
      url: process.env.TESTNET_URL,
      accounts: { mnemonic: process.env.TEST_MNEMONIC },
      chainId: 1666700000,
      live: true,
      gasMultiplier: 2,
      saveDeployments: false
    },
    mainnet: {
      url: process.env.MAINNET_URL,
      accounts: { mnemonic: process.env.MNEMONIC },
      chainId: 1666600000,
      live: true,
      gasPrice: 100e+9,
      gasMultiplier: 2,
      gas: 10e+6
    },
    s1: {
      url: process.env.S1_URL,
      accounts: { mnemonic: process.env.MNEMONIC },
      chainId: 1666600001,
      live: true,
      gasPrice: 100e+9,
      gasMultiplier: 2,
      gas: 10e+6
    }
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: 'USD'
  },
  abiExporter: {
    path: './abi',
    runOnCompile: true,
    clear: true,
    flat: true,
    spacing: 2,
    format: 'json',
    only: ['EAS', 'IDC']
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true
  },
  contractSizer: {
    alphaSort: true,
    disambiguatePaths: false,
    runOnCompile: true,
    strict: true
  }
}

export default config
