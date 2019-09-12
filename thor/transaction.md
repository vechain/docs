### Transaction Model

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
	Reserved     []interface{}
	Signature    []byte
}
```
 
Fields within the transaction `body`,  <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5COmega" height = "14px" align=center />, are defined as:

* `ChainTag` – last byte of the genesis block ID which is used to identify a blockchain to prevent the cross-chain replay attack;
* `BlockRef` - reference to a specific block;
* `Expiration` – how long, in terms of the number of blocks, the transaction will be allowed to be mined in VeChainThor;
* `Clauses` – an array of *Clause* objects each of which contains fields `To`, `Value` and `Data` to enable a single transaction to carry multiple tasks issued by the transaction sender;
* `GasPriceCoef` – coefficient used to calculate the gas price for the transaction.
* `Gas` – maximum amount of gas allowed to pay for the transaction;
* `DependsOn` – ID of the transaction on which the current transaction depends;
* `Nonce` – number set by user;
* `Reserved` - Reserved field for backward compatibility. It MUST be set empty for now otherwise the transaction will be considered invalid.
* `Signature` - transaction signature, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20sig%3Dsign%5CBig%28hash%5Cbig%28rlp%28%5COmega-%5C%7Bsig%5C%7D%29%5Cbig%29%2C%5C%2Csk%5CBig%29" align=center />,where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20sk" height = "14px" align=center /> is the transaction sender's private key.

### Transaction ID

Every blockchain system must find a way to uniquely identify each transaction. Otherwise the system would be vulnerable to the transaction replay attack. In VeChainThor, we give every transaction a unique ID to identify itself. In particular, the transaction ID, `TxID`, can be calculated as:

![image-1](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20TxID%3Dhash%5Cbig%28hash%28%5COmega-%5C%7Bsig%5C%7D%29%2C%5Ctextrm%7Bsigner_address%7D%5Cbig%29)

When validating a given transaction, VeChainThor computes its `TxID` and checks whether it has been used before. 

Suppose Alice has signed a transaction that sends 10 VET to Bob and Bob wants to re-use the transaction to get 10 VET from Alice. Obviously, this is not going to work for Bob. Since the two transactions have exactly the same ID, the one broadcast by Bob would be rejected due to the existence of the transaction ID. 

For any two transactions, as long as they had a field in <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5COmega-%5C%7Bsig%5C%7D" height = "14px" align=center /> with different values, their transaction IDs would be different. Moreover, we can always adjust the *Nonce* field to result in a new ID. In contrary to Ethereum, VeChainThor users can easily assemble multiple transactions sent from the same account with different IDs, which means that they could be sent off at the same time and would be processed by VeChainThor independently.

### Multi-Task Transaction

VeChainThor allows a single transaction to carry out multiple tasks. To do that, we introduce the `Clause` structure to represent a single task and allow multiple tasks defined in one transaction. 

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

#### Transaction Gas Calculation

The total gas, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btotal%7D%7D" height = "14px" align=center />, required for a transaction can be computed as:

![image-4](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%24g_%7B%5Ctextrm%7Btotal%7D%7D%3Dg_0&plus;%5Csum_i%5Cbig%28g_%7B%5Ctextrm%7Btype%7D%7D%5Ei&plus;g_%7B%5Ctextrm%7Bdata%7D%7D%5Ei&plus;g_%7B%5Ctextrm%7Bvm%7D%7D%5Ei%5Cbig%29%24)

where 
<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_0%3D5%2C000" height = "14px" align=center />

<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btype%7D%7D%5Ei%3D48%2C000"  align=center /> if the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20i%5E%7B%5Ctextrm%7Bth%7D%7D" height = "14px" align=center /> clause is to create a contract or <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btype%7D%7D%5Ei%3D16%2C000"  align=center /> otherwise,

<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Bdata%7D%7D%5Ei%20%3D%204%20*%20n_%7Bz%7D%5Ei%20&plus;%2068%20*%20n_%7Bnz%7D%5Ei"  align=center /> where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btype%7D%7D%5Ei%3D48%2C000"  align=center /> if the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n_%7Bz%7D%5Ei" height = "14px" align=center />is the number of bytes equal to zero within the data in the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20i%5E%7B%5C%2C%5Ctextrm%7Bth%7D%7D" height = "14px" align=center />clause and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n_%7Bnz%7D%5Ei" align=center /> the number of bytes not equal to zero,

and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20i%5E%7B%5C%2C%5Ctextrm%7Bth%7D%7D" height = "14px" align=center /> is the gas cost returned by the virtual machine for executing the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Bdata%7D%7D%5Ei" height = "14px" align=center /> clause.

### Other New Features

Besides *Clauses*, VeChainThor's transaction model includes fields `DependsOn`, `BlockRef` and `Expiration` to allow us to further empower a transaction. Let us first revisit these fields as follows:

* `DependsOn` stores the ID of the transaction on which the current transaction depends. In other words, the current transaction cannot be processed without the success of the transaction referred by `DependsOn`. Here by “success”, we mean that the referred transaction has been executed without state reversion.

* `BlockRef` stores the reference to a particular block whose next block is the earliest block the current transaction can be included. In particular, the first four bytes of `BlockRef` contains the block height, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h" height = "14px" align=center />, while the second four bytes can be used to prove that the referred block is known before the transaction is assembled. If that is the case, the value of `BlockRef` should match the first eight bytes of the ID of the block with height <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h" height = "14px" align=center />. 

* `Expiration` stores a number that can be used, together with `BlockRef`, to specify when the transaction expires. Specifically, the sum of `Expiration` and the first four bytes of `BlockRef` defines the height of the last block that the transaction can be included.

`DependsOn` allows us to systematically define an order for a sequence of transactions and such an order is guaranteed by the rules hard-coded as part of the consensus of VeChainTor. Moreover, the system requires the prior transaction depended on by the current transaction to be truly executed, adding another useful layer of security on the dependency.

`BlockRef` and `Expiration` allows us to set the life cycle of a transaction that has not been included in a block. The former defines the starting point and the latter its active period. With such a handful feature, we would no longer be troubled by the situation that a transaction was stuck for hours or even days waiting to be processed and we could not do anything about it. The inclusion of two fields would make transactions safer since it prevents them from being hijacked and later re-used to cause problems.

### Proof of Work

VeChainThor allows the transaction-level proof of work and converts the proved work into extra gas price that will be used by the system to generate more reward to the block generator that includes the transaction. In other words, users can utilize their local computational power to make their transactions more likely to be included in a new block. 

In particular, the computational work can be proved through fields `Nonce` and `BlockRef` in the transaction model. Let <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n" height = "14px" align=center /> be the value of `Nonce`, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h_0" height = "14px" align=center /> the height of the block referred by `BlockRef`, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h" height = "14px" align=center /> the height of the block that includes the transaction and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g" height = "14px" align=center /> the value of field `Gas`. The extra gas price <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center /> can be computed as:

![image-5](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20w%20%3D%20%5Cfrac%7B2%5E%7B256%7D-1%7D%7Bhash%5C%2C%5Cbig%28rlp%5C%2C%28%5COmega%5C%2C-%5C%7Bn%2C%5C%2Csig%5C%7D%5C%2C&plus;%5C%2Csigner%29%5C%2C%5Ccirc%5C%2Cn%5Cbig%29%7D)

![image-6](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p%3Dp%5E%7B%5Ctextrm%7Bbase%7D%7D%5CBig%28%5Cfrac%7B1%7D%7Bg%7D%5Cbig%28%5Cfrac%7Bw%7D%7B10%5E3%7D%5Cbig%29%5Cbig%28%5Cfrac%7B1%7D%7B1.04%7D%5Cbig%29%5E%7B%5Cfrac%7Bh%7D%7B2.592%5Ctimes%2010%5E5%7D%7D%5CBig%29)


where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5Ccirc" height = "8px" align=center /> denotes the operator that concatenates two byte array, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20rlp" height = "14px" align=center /> the function that performs the RLP encoding, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20sig" height = "14px" align=center /> the transaction signature and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20signer" height = "14px" align=center /> the address of the account that signs the transaction. 

Using the above formula, users can keep trying various *Nonce* value to maximize <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center />. However, a transaction sender is not given an infinite amount time to search for the desirable <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n" height = "14px" align=center />.  In particular, a transaction has to satisfy <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5Cvert%20h-h_0%5Cvert%5Cleq%2030" height = "14px" align=center /> or otherwise <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center /> no matter how large <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p=0" height = "14px" align=center /> can be computed. Moreover, to prove that the local computation starts no later than the block with height <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h_0" height = "14px" align=center />, the transaction sender has to fill `BlockRef` with the value equal to the first eight bytes of the ID of the referred block. 

### Total Gas Price

The total gas price for the transaction sender is computed as:

![image-7](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20p%5E%7B%5Ctextrm%7Btotal%7D%7D%3Dp%5E%7B%5Ctextrm%7Bbase%7D%7D&plus;p%5E%7B%5Ctextrm%7Bbase%7D%7D%5Cfrac%7B%5Cphi%7D%7B255%7D)

and the total price for block generators as 

![image-8](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20p%5E%7B%5Ctextrm%7Btotal%7D%7D%3Dp%5E%7B%5Ctextrm%7Bbase%7D%7D&plus;p%5E%7B%5Ctextrm%7Bbase%7D%7D%5Cfrac%7B%5Cphi%7D%7B255%7D&plus;%5CDelta%20p)


where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5Cphi" height = "14px" align=center /> is the value of field `GasPriceCoef` and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center /> the extra gas price converted from the proven local computational work. 

It can be seen that the gas price used to calculate the transaction cost depends solely on the input gas-price coefficient while the reward for packing the transaction into a block varies due to the transaction-level proof-of-work mechanism.