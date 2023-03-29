# atomic swap smart contract

## compile smart contract
npx hardhat compile

## deploy smart contract to hardhat network
npx hardhat deploy

## setup atomic swap on hardhat network
npx hardhat setup-as --ttoken-address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --htlc-address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  
(the address are obtained from hardhat deploy)

## deploy smart contract to goerli testnet
npx hardhat deploy --network goerli

## setup atomic swap on goerli testnet
npx hardhat run scripts/setupAS_web3.ts