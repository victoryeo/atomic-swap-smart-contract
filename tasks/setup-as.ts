import { task, types } from "hardhat/config";
import TToken from "../artifacts/contracts/TToken.sol/TToken.json";
import HTLC from "../artifacts/contracts/HTLC.sol/HTLC.json"

task("setup-as", "Setup Atomic Swap")
  .addParam("ttokenAddress", "TToken Contract Address", undefined, types.string)
  .addParam("htlcAddress", "HTLC Contract Address", undefined, types.string)
  .setAction(async (
    { ttokenAddress, htlcAddress }: { ttokenAddress: string, htlcAddress: string },
    { ethers }
  ) => {
    try {
      const [deployer, recipient] = await ethers.getSigners();
      console.log("deployer", deployer.address)
      console.log("recipient", recipient.address)

      const ttokenContractDeployer = new ethers.Contract(ttokenAddress, TToken.abi, deployer);
      const ttokenContractRecipient = new ethers.Contract(ttokenAddress, TToken.abi, recipient);

      const htlcContract = new ethers.Contract(htlcAddress, HTLC.abi)
      const htlcContractWithDeployer = htlcContract.connect(deployer)
      const htlcContractWithRecipient = htlcContract.connect(recipient)

      //approve
      let nonce = await deployer.getTransactionCount()
      console.log("Nonce", nonce)
      const tx = await ttokenContractDeployer.approve(htlcAddress, 1, { nonce })
      await tx.wait()
      console.log('Successfully approve htlc address', htlcAddress);

      //fund
      nonce = await deployer.getTransactionCount()
      console.log("Nonce", nonce)
      const tx1 = await htlcContractWithDeployer.fund({nonce})
      await tx1.wait()
      console.log('Successfully fund htlc contract address', htlcAddress);

      //withdraw to recipient (must supply the correct "secret")
      nonce = await recipient.getTransactionCount()
      console.log("Nonce", nonce)
      const tx2 = await htlcContractWithRecipient.withdraw("secret", {nonce})
      await tx2.wait()
      console.log('Successfully withdraw to', recipient.address);

      //check balance of recipient
      const balance = await ttokenContractRecipient.balanceOf(recipient
        .address)
      console.log(balance)
    } catch ({ message }) {
      console.error(message)
    }
  })