import Web3 from 'web3'
import HDWalletProvider from '@truffle/hdwallet-provider'
import * as dotenv from "dotenv"

dotenv.config()

const GOERLI_RPC_URL = `${process.env.GOERLI_RPC_URL}`
const MNEMONIC = `${process.env.MNEMONIC}`

let provider: HDWalletProvider
provider = new HDWalletProvider(MNEMONIC, GOERLI_RPC_URL)
const web3 = new Web3(provider)

const ttokenContract = require("../artifacts/contracts/TToken.sol/TToken.json")
// contract address
const TTOKEN_CONTRACT_ADDRESS = process.env.TTOKEN_CONTRACT_ADDRESS
console.log("ttoken contract ",TTOKEN_CONTRACT_ADDRESS)

let ttokenInst = new web3.eth.Contract(
  ttokenContract.abi, TTOKEN_CONTRACT_ADDRESS
)

const htlcContract = require("../artifacts/contracts/HTLC.sol/HTLC.json")
// contract address
const HTLC_CONTRACT_ADDRESS = process.env.HTLC_CONTRACT_ADDRESS
console.log("htlc contract ",HTLC_CONTRACT_ADDRESS)

let htlcInst = new web3.eth.Contract(
  htlcContract.abi, HTLC_CONTRACT_ADDRESS
)

async function setupAS() {
  let accounts: string[] = await web3.eth.getAccounts()
  console.log('account0', accounts[0])
  console.log('account1', accounts[1])

  //get latest nonce
  const nonce: number = await web3.eth.getTransactionCount(accounts[0], "latest")
  console.log(`nonce ${nonce}`)

  try {
    const gasPrice = await web3.eth.getGasPrice()
    console.log(`gasPrice ${gasPrice}`)

    // approve 
    const data0 = await ttokenInst.methods.approve(HTLC_CONTRACT_ADDRESS, 1)
      .send({from: accounts[0]})
    console.log(data0)

    // fund
    const data1 = await htlcInst.methods.fund().send({from: accounts[0]})
    console.log(data1)

    //withdraw to recipient (must supply the correct "secret")
    const data2 = await htlcInst.methods.withdraw("secret").send({from: accounts[1]})
    console.log(data2);

    //check balance of recipient
    const balance = await ttokenInst.methods.balanceOf(accounts[1]).call()
    console.log(balance)
  } catch (err) {
    console.log(err)
  } 
}

setupAS()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })