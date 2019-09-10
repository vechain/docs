# Prototype
One of the major obstacles for ordinary people, or even enterprises, to adopt a public blockchain is the uncertainty and complexity in dealing with crypto assets. On one hand, users have to face the high price volatility when acquiring crypto from the market; on the other hand, they need to understand related concepts and get familiar with various tools to be able to use and manage their crypto assets. 

Can we find a way around the above-mentioned difficulties? For the existing blockchain networks such as Bitcoin and Ethereum, the answer is most likely negative. This is due to the fact that for those systems transaction fee has to be paid by whom sends the transaction and sending transactions is the way we interact with a public blockchain.

In VeChainThor, we come up with the multi-party payment protocol (MPP) to tackle this problem. Basically, MPP says that transaction fee can be paid by someone other than who sends the transaction if certain conditions meet. In this way, users can interact with VeChainThor even with a zero balance. 

Let us first define the terminology to be used to describe MPP as follows:

* *Sender* - account that signs the transaction;
* *Recipient* - account to which the transaction is sent;
* *Sponsor* - account that sponsors the recipient to pay for the transaction fee;
* *User* - VeChainTor allows any account to register other accounts as its users and conditionally pay for the cost of the transactions sent them;
* *Credit* - available VHTO for paying for transaction cost for a particular user of a particular account. 

![mpp](https://github.com/vechain/thor-wiki/blob/master/Images/MPP_text.png)

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

When the system checks whether an account's user has a sufficient amount of credit to pay for the transaction, it calculates the available credit <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20c" height = "14px" align=center /> as:

![image-10](https://latex.codecogs.com/svg.latex?c%20%3D%20%5Cmin%7B%5Cbig%28C%2CC-c_%7B%5Ctextrm%7Bused%7D%7D&plus;r%5Ccdot%5Cmax%7B%280%2C%20h-h_0%29%7D%5Cbig%29%7D)

where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20C" height = "14px" align=center /> denotes `Credit`, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20r" height = "14px" align=center /> `RecoverRate`, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h" height = "14px" align=center /> the current block height, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h_0" height = "14px" align=center /> the block height when the user uses credit last time and <img src="https://latex.codecogs.com/svg.latex?u_%7B%5Ctextrm%7Bused%7D%7D" height = "14px" align=center /> the amount of credit consumed after the user's last transaction is paid by the account. Note that <img src="https://latex.codecogs.com/svg.latex?C-c_%7B%5Ctextrm%7Bused%7D%7D" height = "14px" align=center /> is the remaining credit  after the last transaction is paid.

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

