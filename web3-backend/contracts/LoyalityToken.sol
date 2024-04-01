
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
contract LoyalityToken is ERC20Burnable, Ownable {
    constructor() ERC20("TokenMartLoyality", "TML") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount * (10**18));
    }

    function burn(uint256 value) public override {
        _burn(msg.sender, value);
    }
}