// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';

contract TToken is ERC20 {
  constructor(
    string memory name, 
    string memory ticker
  ) 
    ERC20(name, ticker) 
  {
    _mint(msg.sender, 1);
  }
}