const { ethers } = require("ethers");

/**
 * Scenario: The DAO wants to transfer 1000 USDC from the Treasury 
 * to a specific contributor's address.
 */
async function main() {
    const treasuryAddress = "0x..."; // The address controlled by the Timelock
    const usdcAddress = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
    const beneficiary = "0x70997970C51812dc3A010C7d01b50e0d17dc79C8";
    const amount = ethers.parseUnits("1000", 6); // USDC has 6 decimals

    // 1. Create interface for the target contract
    const erc20Interface = new ethers.Interface([
        "function transfer(address to, uint256 amount)"
    ]);

    // 2. Encode the function call
    const calldata = erc20Interface.encodeFunctionData("transfer", [
        beneficiary,
        amount
    ]);

    // 3. Prepare Proposal Arrays
    const targets = [usdcAddress];
    const values = [0]; // No ETH sent
    const calldatas = [calldata];
    const description = "Proposal #1: Reward lead contributor for Q1 development";
    const descriptionHash = ethers.id(description);

    console.log("--- PROPOSAL DATA ---");
    console.log("Targets:", targets);
    console.log("Values:", values);
    console.log("Calldatas:", calldatas);
    console.log("Description Hash:", descriptionHash);

    // 4. Calculate Proposal ID (how the Governor tracks it)
    // This matches the OpenZeppelin Governor calculation logic
    const proposalId = ethers.keccak256(
        ethers.abiCoder.encode(
            ["address[]", "uint256[]", "bytes[]", "bytes32"],
            [targets, values, calldatas, descriptionHash]
        )
    );

    console.log("Generated Proposal ID:", proposalId);
}

main().catch(console.error);
