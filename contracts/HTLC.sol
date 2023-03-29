// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "hardhat/console.sol";

contract HTLC {
  uint public startTime;
  uint public lockTime = 10000 seconds;
  string public secret = "secret";
  address public recipient;
  address public owner;
  bytes32 public hashLockKey;
  uint public amount;
  IERC20 public token;

  event HashValue (
    bytes32 a,
    bytes32 b
  );

  constructor(address _recipient,
      address _token,
      uint _amount,
      bytes32 _hashLockKey) {
    recipient = _recipient;
    owner = msg.sender;
    amount = _amount;
    token = IERC20(_token);
    hashLockKey = keccak256(abi.encodePacked(secret));
  }

  modifier hashLockMatches(string memory _x) {
    console.logBytes32(hashLockKey);
    console.logBytes32(keccak256(abi.encodePacked(_x)));
    emit HashValue(hashLockKey, keccak256(abi.encodePacked(_x)));
    require(
        hashLockKey == keccak256(abi.encodePacked(_x)),
        "hashlock key does not match");
    _;
  }

  modifier withdrawable() {
    require(block.timestamp > startTime + lockTime, 'too early');
    _;
  }

  function fund() external {
    startTime = block.timestamp;
    token.transferFrom(msg.sender, address(this), amount);
  }

  function withdraw(string memory _secret) hashLockMatches(_secret) external {
    secret = _secret;
    token.transfer(recipient, amount);
  }

  function refund() withdrawable external {
    token.transfer(owner, amount);
  }
}