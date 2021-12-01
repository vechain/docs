# Built-in Contract

Examples of how to use the built-in contracts can be found [here](https://github.com/vechain/thor-builtins).

Addresses of contracts on testnet/mainnet can be found [here](../../others/miscellaneous.md).


## authority.sol

[authority.sol](https://github.com/vechain/thor/blob/master/builtin/gen/authority.sol) is related to the POA(proof of authority) consensus mechanism. The Authority contract manages a list of candidates proposers who is responsible for packing transactions into a block. The proposers are authorized by a voting committee, but only the first 101 proposers in the candidates list can pack block. A candidates proposer include signer address, endorsor address and identity. Signer address is related to sign a block, endorsor address is used for charging miner's fee and identity is used for identifying the proposer.

## energy.sol
 
 [energy.sol](https://github.com/vechain/thor/blob/master/builtin/gen/energy.sol) represents the sub-token in VeChainThor which conforms VIP180(ERC20) standard. The name of token is "VeThor" and 1 VeThor equals to 1e18 wei. The main function of VeThor is to pay for the transaction fee. VeThor is generated from VET, so the initial supply of VeThor is zero in the genesis block. The growth rate of VeThor is 5000000000 wei per token(VET) per second, that is to say 1 VET will produce about 0.000432 VeThor per day. The miner will charge 30 percent of transaction fee and 70 percent will be burned. So the total supply of VeThor is dynamic.
 
  ## executor.sol

 [executor.sol](https://github.com/vechain/thor/blob/master/builtin/gen/executor.sol) represents the core code for the on-chain governance. The contract enables a proposal to be executed automatically on VeChainThor if it is approved by at least two-third of the steering committee members. A proposal can be registered either by an approver (a steering committee member) or by an authorized voting contract. 
 


## extension-v2.sol

[extension-v2.sol](https://github.com/vechain/thor/blob/master/builtin/gen/extension-v2.sol) extends EVM functions. it gives an opportunity for the developer to get information of the current transaction and any history block within the range of genesis to best block. The information obtained based on block number includes blockID, blockTotalScore, blockTime and blockSigner . The developer can also get the current transaction information, including  txGasPayer, txProvedWork, txID, txBlockRef and txExpiration.  

::: tip Note
Before implement the VIP-191 , [extension.sol](https://github.com/vechain/thor/blob/master/builtin/gen/extension.sol) is the main contract 
:::



## params.sol
  
[params.sol](https://github.com/vechain/thor/blob/master/builtin/gen/params.sol) stores the governance params of VeChain thor. The params can be set by the executor, a contract that is authorized to modify governance params by a voting Committee. Anyone can get the params just by calling "get" function. The governance params is written in genesis block at launch time. You can find the list of the governance parameters in [params.go](https://github.com/vechain/thor/blob/master/thor/params.go).
 
## prototype.sol

 [prototype.sol](https://github.com/vechain/thor/blob/master/builtin/gen/prototype.sol) is an account management model of VeChainThor. In the account management model every contract has a master account, which, by default, is the creator of a contract. The master account plays the role of a contract manager, which has some authorities including "setMaster", "setCreditPlan", "addUser", "removeUser" and "selectSponsor". Every contract keeps a list of users who can call the contract for free but limited by credit. The user of a specific contract can be either added or removed by the contract master. Although from a user's perspective the fee is free, it is paid by a sponsor of the contract. Anyone can be a sponsors of a contract, just by calling sponsor function, and also the sponsor identity can be cancelled by calling unsponsor function. A contract may have more than one sponsors, but only the current sponsor chosen by master need to pay the fee for the contract. If the current sponsor is out of energy, master can select sponsors from other sponsors candidates by calling selectSponsor function. The creditPlan can be set by the master which includes credit and recoveryRate. Every user have the same original credit. Every Transaction consumes some amount of credit which is equal to the fee of the Transaction, and the user can also pay the fee by itself if the gas payer is out of the credit. The credit can be recovered based on recoveryRate (per block).
