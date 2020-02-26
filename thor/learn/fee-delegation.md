# Fee Delegation

## Summary

### Multi-Party Payment (Prototype)

Multi-Party Payment(MPP) was designed from the point of view of a DApp owner who controls a bunch of contracts running on chain.Moreover, MPP requires writing data on chain.

### Designated Gas Payer (VIP191)

Designated Gas Payer is aimed to supplement MPP to provide more flexibility for TX fee delegation on VeChainThor. In particular, it allows a TX sender to seek for an arbitrary party, not necessarily the TX recipient, who is willing to pay for the TX.

### Comparison 
Compared with MPP, Designated Gas Payer(VIP-191) gives control back to TX senders to activate the protocol. Moreover, it does not introduce any overhead cost. However, it requires the TX sender and gas-payer to be both online to complete the TX while MPP does not. In terms of transparency, MPP is the better option since the gas-payer will have to explicitly put his/her intension to fund TXs from a particular account on chain.

|  | Common To | Backend | User list Storage  | Native Feature | Flexibility |
| --- | --- | --- | --- | --- | --- |
| Multi-Party Payment | ✓ | X  | BlockChain | ✓ | Configuration for all user |
| Designated Gas Payer | X  | ✓ | Backend | ✓ | Configuration for individuals  |


## Multi-Party Payment (Prototype)
One of the major obstacles for ordinary people, or even enterprises, to adopt a public blockchain is the uncertainty and complexity in dealing with crypto assets. On one hand, users have to face the high price volatility when acquiring crypto from the market; on the other hand, they need to understand related concepts and get familiar with various tools to be able to use and manage their crypto assets. 

Can we find a way around the above-mentioned difficulties? For the existing blockchain networks such as Bitcoin and Ethereum, the answer is most likely negative. This is due to the fact that for those systems transaction fee has to be paid by whom sends the transaction and sending transactions is the way we interact with a public blockchain.

In VeChainThor, we come up with the multi-party payment protocol (MPP) to tackle this problem. Basically, MPP says that transaction fee can be paid by someone other than who sends the transaction if certain conditions meet. In this way, users can interact with VeChainThor even with a zero balance. 

Let us first define the terminology to be used to describe MPP as follows:

* *Sender* - account that signs the transaction;
* *Recipient* - account to which the transaction is sent;
* *Sponsor* - account that sponsors the recipient to pay for the transaction fee;
* *User* - VeChainTor allows any account to register other accounts as its users and conditionally pay for the cost of the transactions sent them;
* *Credit* - available VHTO for paying for transaction cost for a particular user of a particular account. 

![mpp](~@public/images/thor/mpp.png)

The above figure shows the decision-making flow within MPP. When it comes to the question of who should pay for a transaction, VeChainThor first checks the usership and sponsorship associated with the *Sender* and *Recipient*. It then tries to deduct the transaction fee from the corresponding account. For instance, if both the usership and sponsorship are in place, the system will first try to deduct the transaction fee from the *Sponsor*’s balance; if it fails, then from the *Recipient*'s balance; and if it fails again, from the *Sender*’s balance. 

In practice, a DApp is most likely built upon multiple smart contracts deployed on VeChainThor. Its users interact with our public blockchain through sending transactions to the smart contracts to call a certain function. With MPP, the DApp owner can register its users' accounts as the *User* of the smart contracts such that all the legit transactions from the DApp users can be paid by the owner. In this way, people can use the DApp almost in the same way they use other apps without dealing with crypto. Moreover, the owner can set up a single account to sponsor all the smart contract, which makes the maintenance a lot easier. 

### Credit Plan

To prevent MPP from being abused by malicious users, the owner of a smart contract can set a credit plan for the contract to set up rules on how to pay for the transactions from users. In particular, a credit plan can be defined as: 

```go
type creditPlan struct {
	Credit       *big.Int
	RecoveryRate *big.Int
}
```

where `RecoveryRate` is the amount of VTHO (in wei) accumulated per block to pay for transactions for each user and `Credit` the maximum amount of VTHO (in Wei) that can be accumulated.

When the system checks whether an account's user has a sufficient amount of credit to pay for the transaction, it calculates the available credit $C$ as:

$$c = \min{\big(C,C-c_{\textrm{used}}+r\cdot\max{(0, h-h_0)}\big)}$$

where $C$ denotes `Credit`, $r$ `RecoverRate`, $h$ the current block height, $h_0$ the block height when the user uses credit last time and $u_{\textrm{used}}$ the amount of credit consumed after the user's last transaction is paid by the account. Note that $C-c_{\textrm{used}}$ is the remaining credit  after the last transaction is paid.

### Master Account

In VeChainThor, we introduce the concept of the master account to make it easier for dapp owners to user MPP and manage their dapps. Specifically, every account, including a smart contract, can have a *Master* account which is allowed by the system to register/remove *Users*, set a credit plan and select the active *Sponsor* for the account. Note that the account that deploys a smart contract becomes the *Master* of the contract by default. A normal account can also set its *Master* through calling function `setMaster` implemented in the built-in contract `Prototype`. We will describe the implementation of MPP shortly.

In practice, we may most likely build a dapp based on multiple smart contracts. Each contract may have its own *Users* and be sponsored by multiple *Sponsors*. How to manage these accounts suddenly becomes a challenging task the dapp owner has to think about. With the *Master* mechanism and built-in contract `Prototype`, the owner does not have to implement anything on the contract code level to user MPP. He/she can now use even a single *Master* to manage all the contracts through calling functions of contract `Prototype`. 

### MPP Implementation

The multi-party payment protocol is implemented by the built-in smart contract `Prototype` deployed at `0x000000000000000000000050726f746f74797065` in the genesis block of VeChainThor. 

#### Functions related to *User*

`isUser`

Check whether an account is a registered *User* of another account.

Input:

* `address _self`: account address
* `address _user`: *User* address

Return:

* `true` if `_user` is a *User* of `_self` or `false` otherwise

---

`addUser` / `removeUser`

Add / remove a *User* for an account. The transaction sender has to be the account itself or its current *Master*.

Input:

* `address _self`: account address
* `address _user`: *User* address

#### Functions related to the *credit plan*

`creditPlan`

Get the credit plan associated with an account.

Input:

* `address _self`: account address

Return:

* `uint256 credit`: maximum amount of credit (VTHO in wei) allowed for each  *User* of the account
* `uint256 recoveryRate`: amount of credit (VTHO in wei) generated per block for  each *User* of the account

---

`setCreditPlan`

Set a credit plan for an account. The transaction sender has to be either the account itself and its current *Master*.

Input: 

* `uint256 credit`: maximum amount of credit (VTHO in wei) allowed for each  *User* of the account
* `uint256 recoveryRate`: amount of credit (VTHO in wei) generated per block for  each *User* of the account

---

`userCredit`

Get the available credit for a particular *User* of an account.

Input:

* `address _self`: account address
* `address _user`: *User* address

Return:

* `uint256`: available credit (VTHO in wei) for the *User*

#### Functions related *Master*

`master`

Get the *Master* address of the given account address.

Input:

* `address _self`: account address

Return:

* `address`: address of the *Master* of `_self`.

---

`setMaster`

Set the *Master* for a particular account. The transaction sender has to be either the account itself or its current *Master*.

Input:

* `address _self`: account address
* `address _newMaster`: address of the new *Master* of `_self`

#### Functions related to *Sponsor* 

`sponsor` / `unsponsor`

Sponsor / unsponsor an account. The transaction sender has to be the *Sponsor* account.

Input:

* `address _self`: address of the account to be sponsored / unsponsored

---

`isSponsor`

Check whether an input account is a *Sponsor* of another account.

Input:

* `address _self`: account address
* `address _sponsor`: *Sponsor* address

Return:

* `true` if `_sponsor` is a *Sponsor* of `_self`

---

`selectSponsor`

Select a *Sponsor*. The transaction sender has to be either the sponsored account or its *Master*.

Input:

* `address _self`: account address
* `address _sponsor`: *Sponsor* address

---

`currentSponsor`

Get the current active *Sponsor*.

Input:

* `address _self`: account address

Return:

* `address`: address of the current active *Sponsor* of `_self`. 

## Designated Gas Payer (VIP191)
VIP191 is an upgrade proposed by Totient that adds generalized native fee delegation to the VeChain blockchain. This innovative feature allows anyone to use a decentralized application regardless of their knowledge of blockchain technology by removing the toughest barriers for adoption.

MPP was designed from the point of view of a dapp owner who controls a bunch of contracts running on chain. It is the sole responsibility of the owner to set up MPP and the protocol can only affect TXs sent to those contracts.

Moreover, since MPP requires writing data on chain and therefore, causes certain overhead cost, it is more cost-effective to use the protocol for a relatively stable relationship between a user and the dapp, rather than some temporary arrangement.

VIP-191 is aimed to supplement MPP to provide more flexibility for TX fee delegation on VeChainThor. In particular, it allows a TX sender to seek for an arbitrary party, not necessarily the TX recipient, who is willing to pay for the TX.

### How Designated Gas Payer works
The protocol works quite simple actually. It requires both the TX sender and the party who wants to pay for the TX fee to put their digital signatures in the TX. The sender also need to turn on the VIP-191 feature (which will be discussed later) to inform the system that this is a VIP-191 enabled TX. Let's call the party the Gas-Payer to be consistent with the naming in the source code. Once the TX is accepted and executed, the TX fee will be deducted from the gas-payer's VeThor balance.

There have been two major changes made to implement VIP-191:
1. Extending the TX model by adding Delegator signature
2. Adding Field Fee Delegated Flag for deciding the actual gas-payer for a VIP-191 enabled TX.

### TX Model Extension
Field `Reserved` in the TX body structure has been re-defined to be of type `reserved` as shown below:

```go
type reserved struct {
	Features Features
	Unused   []rlp.RawValue
}
``` 

Within the structure, we define field `Features` as 32-bit unsigned integer. We can think of it as a bit map. Each bit marks the status (1 for on and 0 for off) of a particular feature. For VIP-191, the least significant bit is used.

Recall that VIP-191 requires two valid signatures to be included in the TX. In practice, the TX sender's signature is concatenated by the gas-payer's signature and assigned to field `Signature` as usual. Moreover, the protocol requires the gas-payer to sign the TXID which is a unique identifier of the TX.

### Gas-Payer-Deciding Logic
The gas-payer-deciding logic brought by VIP-191 is added in function `BuyGas` in the Go source file `THORDIR/runtime/resolved_tx.go`. 

```go
if r.Delegator != nil {
	if energy.Sub(*r.Delegator, prepaid) {
		return baseGasPrice, gasPrice, *r.Delegator, func(rgas uint64) { doReturnGas(rgas) }, nil
	}
	return nil, nil, thor.Address{}, nil, errors.New("insufficient energy")
}
```

It can be seen that the system first checks whether there is a designated gas-payer (`r.Delegator`). If there is one, it will try to deduct the initial cost of the TX from the gas-payer's VeThor balance. If the balance is too low, the system will stop processing the TX and return an error. Otherwise, it will mark the gas-payer in the runtime context associated with the TX and pass on the context to the code that executes individual clauses. 

Interested readers are encouraged to have a look at the[ proposal ](https://github.com/vechain/VIPs/blob/master/vips/VIP-191.md)for full details.