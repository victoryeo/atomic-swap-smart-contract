import { task, types } from "hardhat/config";
import TToken from "../artifacts/contracts/TToken.sol/TToken.json";

task("setup-as", "Setup Atomic Swap")
  .addParam("ttokenAddress", "TToken Contract Address", undefined, types.string)
  .addParam("htlcAddress", "HTLC Contract Address", undefined, types.string)
  .setAction(async (
    { ttokenAddress, htlcAddress }: { ttokenAddress: string, htlcAddress: string },
    { ethers }
  ) => {
    try {
      const [deployer] = await ethers.getSigners();
      const ttokenContract = new ethers.Contract(ttokenAddress, TToken.abi);
      const ttokenContractWithSigner = ttokenContract.connect(deployer);

      const nonce = await deployer.getTransactionCount();
      console.log("Nonce", nonce)
      const tx = await ttokenContractWithSigner.approve(htlcAddress, 1, { nonce });
      await tx.wait();
      console.log('Successfully approve address', htlcAddress);
    } catch ({ message }) {
      console.error(message)
    }
  })