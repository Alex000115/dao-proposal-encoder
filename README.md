# DAO Proposal Encoder

Submitting a governance proposal is a high-stakes operation. If the calldata is slightly wrong, the proposal may pass but fail to execute, wasting weeks of community effort. This tool ensures your proposal is perfect before it hits the mainnet.

## Features
* **Function Encoding**: Convert any contract interaction into the `calldata` format required by the Governor.
* **Proposal Hashing**: Generate the unique `proposalId` used for tracking and voting.
* **Local Simulation**: Uses Hardhat's mainnet forking to "Dry Run" the proposal and verify that the intended state change actually happens.

## The Workflow
1. **Define**: Identify the target contract and the function to call.
2. **Encode**: Use this script to generate the `targets[]`, `values[]`, and `calldatas[]`.
3. **Submit**: Pass these arrays to the `propose()` function on the Governor contract.
