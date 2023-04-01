# atomic swap smart contract

For testing of atomic swap on evm compatible blockchain, we can use mumbai and goerli testnet.  

### compile smart contract
npx hardhat compile

### deploy smart contract to ganache (tested)
npx hardhat deploy --network ganache

### setup atomic swap on ganache network (tested)
npx hardhat setup-as --ttoken-address 0xe78A0F7E598Cc8b0Bb87894B0F60dD2a88d6a8Ab --htlc-address 0x5b1869D9A4C187F2EAa108f3062412ecf0526b24 --network ganache
(the address are obtained from hardhat deploy)

### deploy smart contract to goerli testnet (tested)
npx hardhat deploy --network goerli

### setup atomic swap on goerli testnet (tested)
npx hardhat setup-as --ttoken-address 0x222D8Ba538D091b0875ed19B4aD52A9c7F5fDaB1  --htlc-address 0x1b4F8517C6B1D6a0D47D67bE6e95F169e7293E73 --network  goerli
* or *  
npx hardhat run scripts/setupAS_web3.ts

### deploy smart contract to mumbai testnet
npx hardhat deploy --network mumbai

### setup atomic swap on mumbai testnet
npx hardhat setup-as --ttoken-address <address>  --htlc-address <address> --network  mumbai

### deploy smart contract to hardhat network
npx hardhat deploy

### setup atomic swap on hardhat network
npx hardhat setup-as --ttoken-address 0x5FbDB2315678afecb367f032d93F642f64180aa3 --htlc-address 0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512  
(the address are obtained from hardhat deploy)
