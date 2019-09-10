There are six smart contracts deployed in VeChainThor's genesis block. Their source code can be found [here](https://github.com/vechain/thor/tree/master/builtin/gen). We describe briefly what they do as follows:

* `authority.sol` 

 facilitates the Proof of Authority consensus algorithm. The contract manages a list of candidate proposers for generating new blocks. They are authorized by the steering committee of the VeChain Foundation. Only the first 101 of them in the list, the so-called authority masternodes, can generate new blocks at the moment. Information of a candidate proposer stored in the system includes the signer address, endorsor address and identity. They need to use the private key corresponding to the signer address to sign any block they assemble and put sufficient VET as a deposit at the endorsor address. The identity is the hash of the proposer's real identity.

* `energy.sol` 
 
 is the smart contract that creates the VeThor token (VTHO) on VeChainThor. It conforms the VIP180 (or equivalently, the ERC20) standard. The smallest unit of VTHO is wei where 1 VTHO = 1e18 wei.
 
* `executor.sol`

 contains the core code for the on-chain governance. The contract enables a proposal to be executed automatically on VeChainThor if it is approved by at least two-third of the steering committee members. A proposal can be registered either by an approver (a steering committee member) or by an authorized voting contract. 
 
* `extension.sol`

 defines functions to get information of a certain block or transaction. 
 
* `params.sol` 

 defines functions to get and set the governance parameters of VeChainThor. Note that only the built-in "Executor" contract is allowed to set new values for the parameters. You can find the list of the governance parameters in [`params.go`](https://github.com/vechain/thor/blob/master/thor/params.go).
 
* `prototype.sol`

 is the smart contract that implements the [multi-party payment protocol](#mpp) which will be discussed in detail shortly.  

Examples of how to use the built-in contracts can be found [here](https://github.com/vechain/thor-builtins). 