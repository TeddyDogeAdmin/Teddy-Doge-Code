// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TeddyDoge is ERC20,Ownable {
    address public bridgeAddress;
    constructor() ERC20("TeddyDoge", "TEDDY") {
        transferOwnership(0xdbE8eF79A1A7b57fbb73048192eDF6427e8A5552);
    }
    function bridgeMint(address account, uint amount) external {
        require(msg.sender == bridgeAddress || msg.sender == owner(),"TEDDY: only bridge address can call");
       _mint(account,amount);
    }
    function setBridgeAddress(address _bridgeAddress) external onlyOwner {
       bridgeAddress = _bridgeAddress;
    }
    function burnFrom(address account, uint amount) external onlyOwner{
        _burn(account, amount);
    }
}