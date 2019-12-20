# Transaction Model
## Model
VeChainThor adopts a new transaction model to tackle some of the fundamental problems that hinder a broader use of blockchain at the moment. The model is defined in Golang as:

```go
// transaction.go

type Transaction struct {
	body body
}

type body struct {
	ChainTag     byte			
	BlockRef     uint64
	Expiration   uint32
	Clauses      []*Clause
	GasPriceCoef uint8
	Gas          uint64
	DependsOn    *thor.Bytes32 `rlp:"nil"`
	Nonce        uint64
	Reserved     reserved
	Signature    []byte
}
```
 
Fields within the transaction `body`, $\Omega$, are defined as:

* `ChainTag` – last byte of the genesis block ID which is used to identify a blockchain to prevent the cross-chain replay attack;
* `BlockRef` - reference to a specific block;
* `Expiration` – how long, in terms of the number of blocks, the transaction will be allowed to be mined in VeChainThor;
* `Clauses` – an array of *Clause* objects each of which contains fields `To`, `Value` and `Data` to enable a single transaction to carry multiple tasks issued by the transaction sender;
* `GasPriceCoef` – coefficient used to calculate the gas price for the transaction.
* `Gas` – maximum amount of gas allowed to pay for the transaction;
* `DependsOn` – ID of the transaction on which the current transaction depends;
* `Nonce` – number set by user;
* `Reserved` - *reserved* Object contains two fields: `Features` and `Unused`. 
  * `Feature` as 32-bit unsigned integer and default set as `0`.For Designated Gas Payer(VIP191) must be set as `1`
  
  * `Unused` : an array of reserved field for backward compatibility,it **MUST** be set empty as empty array for now otherwise the transaction will be considered invalid.

* `Signature` - transaction signature, $sig=sign\Big(hash\big(rlp(\Omega-\{sig\})\big),\,sk\Big)$,where $sk$ is the transaction sender's private key.

## Transaction ID

Every blockchain system must find a way to uniquely identify each transaction. Otherwise the system would be vulnerable to the transaction replay attack. In VeChainThor, we give every transaction a unique ID to identify itself. In particular, the transaction ID, `TxID`, can be calculated as:

$$TxID=hash(hash(\Omega - \{sig\}),signer\_address)$$

When validating a given transaction, VeChainThor computes its `TxID` and checks whether it has been used before. 

Suppose Alice has signed a transaction that sends 10 VET to Bob and Bob wants to re-use the transaction to get 10 VET from Alice. Obviously, this is not going to work for Bob. Since the two transactions have exactly the same ID, the one broadcast by Bob would be rejected due to the existence of the transaction ID. 

For any two transactions, as long as they had a field in $\Omega-\{sig\}$ with different values, their transaction IDs would be different. Moreover, we can always adjust the *Nonce* field to result in a new ID. In contrary to Ethereum, VeChainThor users can easily assemble multiple transactions sent from the same account with different IDs, which means that they could be sent off at the same time and would be processed by VeChainThor independently.

## Clauses 

Clause(Multi-Task Transaction) allows a single transaction to carry out multiple tasks. To do that, we introduce the `Clause` structure to represent a single task and allow multiple tasks defined in one transaction. 

The structure is defined in Golang as follows:

```go
type Clause struct {
	body clauseBody
}

type clauseBody struct {
	To    *thor.Address `rlp:"nil"`
	Value *big.Int
	Data  []byte
}
```

and contains three fields:

* `To` – recipient’s address;
* `Value` – amount transferred to the recipient;
* `Data` – input data.

We then define `Clauses` as a `Clause` array in the transaction model to make it possible for a transaction to conduct multiple tasks. 

The multi-task mechanism has two interesting characteristics:

* Since tasks (clauses) are included in a single transaction, their executions can be considered as atomic, meaning that, they either all succeed, or all fail.

* Tasks (clauses) are processed one by one in the exact order defined in `Clauses`.

The multi-task mechanism provides us a secure and efficient way to handle, for instance, tasks such as fund distribution, token airdrop, mass product registration, etc. Moreover, due to the fact that the tasks are processed sequentially, it can be used to conduct a multi-step process. 

## Transaction Dependency

`DependsOn` allows us to systematically define an order for a sequence of transactions and such an order is guaranteed by the rules hard-coded as part of the consensus of VeChainTor. Moreover, the system requires the prior transaction depended on by the current transaction to be truly executed, adding another useful layer of security on the dependency.

`BlockRef` and `Expiration` allows us to set the life cycle of a transaction that has not been included in a block. The former defines the starting point and the latter its active period. With such a handful feature, we would no longer be troubled by the situation that a transaction was stuck for hours or even days waiting to be processed and we could not do anything about it. The inclusion of two fields would make transactions safer since it prevents them from being hijacked and later re-used to cause problems.

### DependsOn

 `DependsOn` stores the ID of the transaction on which the current transaction depends. In other words, the current transaction cannot be processed without the success of the transaction referred by `DependsOn`. Here by “success”, we mean that the referred transaction has been executed without state reversion.

 ### BlockRef

`BlockRef` stores the reference to a particular block whose next block is the earliest block the current transaction can be included. In particular, the first four bytes of `BlockRef` contains the block height, $h$, while the second four bytes can be used to prove that the referred block is known before the transaction is assembled. If that is the case, the value of `BlockRef` should match the first eight bytes of the ID of the block with height $h$. 

## Expiration
 `Expiration` stores a number that can be used, together with `BlockRef`, to specify when the transaction expires. Specifically, the sum of `Expiration` and the first four bytes of `BlockRef` defines the height of the last block that the transaction can be included.



## Reserved
The structure is defined in Golang as follows:
```go
type reserved struct {
	Features Features
	Unused   []rlp.RawValue
}
``` 
 * `Feature` as 32-bit unsigned integer and default set as `0`.For Designated Gas Payer(VIP191) must be set as `1`
  
  * `Unused` : an array of reserved field for backward compatibility,it **MUST** be set empty as empty array for now otherwise the transaction will be considered invalid.
