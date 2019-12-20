## Consensus
VeChainThor adopts the PoA (Proof-of-Authority) consensus protocol, instead of neither PoW (Proof-of-Work) nor PoS (Proof-of-Stake). Members in the whitelist requiring KYC (know-your-customer) identity verification are in charge of and responsible for the operation of the blockchain network. Concerning the safety issue, we leverage DPRP protocol to mess up the order of packer who pack the block, making sure the sequence of order of packers varies each time when packing the block. 


## Block Generation Speed
The default interval of block generation is `10` seconds, but the concrete timestamp interval depends on the specific situation.

## Orphan Generation/suggestion 
It is possible to generate orphan block and it is suggested to verify the fork situation every `12` block interval. 

## Dual token precision 
The precision of both `VET` and `VTHO` is $10^{18}$ Wei. VTHO is generated from staking the VET and it is consumed for payments and smart contract execution on the VeChainThor blockchain


## Are the failed transactions going to be recorded on the chain? Is the transaction gas going to be deducted?

When you send tokens, interact with a contract, send `VET`/`VTHO`, or do anything else on the blockchain, you must pay for computation. That payment is calculated in Gas and the gas is paid in VTHO. Regardless of whether your transaction succeeds or fails. Even if it fails, the proposer(authority node) must validate and execute your transaction (compute) , therefore, you must pay for that computation just like you would pay for a successful transaction.

## How does the token swap from ERC20 VeChain token to VET work?
•The ticker symbol for the VeChainThor Mainnet token will changed to `VET`.

•Token swap ratio is 1:100. One ERC20 VeChain token will be split to 100 VETs on the VeChainThor Mainnet.


## Where can I find the contract address which I just deployed?
Once contract successfully deployed, the contract address can be found in **transaction receipt**. 

## Why I Cannot synchronize blocks?
The reason for having an issue to synchronize with blocks is because the local time might be inaccurate. Please synchronized with NTP(Network Time Protocol) server . 

## What is the base generation rate of VTHO generation speed?
The generation speed of VTHO is **0.000432** per VET per Day

>The generation speed shown here is indicative only. the actual generation speed should subject to actual network

## What is intrinsic gas ?
The intrinsic gas for a transaction is the amount of the transaction used before any code runs. in other words, it's a constant "transaction fee" plus a fee for every byte of data supplied with the transaction.The gas in the transaction needs to be **greater than or equal** to the intrinsic gas used by the transaction. 


$$Intrinsic gas = txGas + clauses.type + dataGas$$

- txGas = 5,000
-  Clauses type:
    1. Normal transaction : 16,000
    2. Contract creation : 48,000


## How to calculate total transaction gas ?
In VeChain Thor clauses allows a single transaction to carry out multiple tasks. Therefore, it needs to execute all the clauses cost in the transaction. 

**Formula for total transaction gas**<br>
$$totalTransactionGas = txGas + \sum_{n}^{i} Clauses[i] *(typeGas +dataGas+vmGas)$$