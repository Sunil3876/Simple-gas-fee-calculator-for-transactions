// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GasFeeCalculator {

    // Function to calculate the gas fee for a transaction
    function calculateGasFee(uint256 gasLimit, uint256 gasPrice) public pure returns (uint256) {
        return gasLimit * gasPrice;
    }

    // Function to get the current gas price from the Ethereum network
    function getCurrentGasPrice() public view returns (uint256) {
        return tx.gasprice;
    }

    // Function to get the gas limit for a transaction (a rough estimate)
    function getGasLimitEstimate() public pure returns (uint256) {
        // A basic estimate, can vary based on actual contract execution
        return 21000; // The base gas limit for a simple transaction
    }
}
