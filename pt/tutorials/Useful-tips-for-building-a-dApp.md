---
title: Useful tips for building a dApp by using Connex2
date: 2021-07-15
description: This article is helping you to understand how to use connex2 to build a Dapp and also how it interacts between the user,application, and Sync2.
sidebar: auto
sidebarDepth: 2
tags:
    - connex
    - sync
---

## Intro
This article is helping you to understand how to use `connex2` to build a Dapp and also how it interacts between the **user**,**application**, and **Sync2**. 

> `connex` is the standard interface between VeChainThor and the user.

## Something you might ....
### Need
- [Connex](/connex/)
- [Sync2](https://sync.vecha.in/)
- [VeChain Docs](https://docs.vechain.org)
- [VeChain Explorer](https://explore.vechain.org) / [Insight explorer](https://insight.vecha.in) 
- [Development Resources](/others/development-resources.md) / [miscellaneous](/others/miscellaneous.md)

### Know
- [Connex API](/connex/api.html)
- [Transaction - fee calculation](/thor/learn/transaction-calculation.html)
- [Transaction - fee delegation](/thor/learn/fee-delegation.html)
- [Sync2 - User guide](/sync2/user-guide/)

## Before play around 
1. Create testnet wallet
   1. Download Sync2 [here](https://sync.vecha.in/)
   2. Launch Sync2
   3. Sync2 - [setup](/sync2/user-guide/)
   4. Sync2 - [create testnet wallet](/sync2/user-guide/wallet.html#custom-network-wallet)

2. Claim testnet token
   - Visit [omg.outofgas.io](https://omg.outofgas.io)- *VIP191 feature/ sign transaction* 
   - Visit [Testnet faucet](https://faucet.vecha.in)- *sign certificate*

## Learn & play
### connex.thor.ticker
The ticker is a concept that describes chain increment. when there is a new block added to the chain, the ticker will be triggered. This API will create a ticker that has a function that creates a Promise that will resolve when a new block is truly added, please be advised that it never rejects.

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="xjwx89" data-slug-hash="XWpPggw" data-preview="true" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="Connex env- Get Status">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/XWpPggw">
  Connex env- Get Status</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

:::tip 📖 Tips
- **progress**: A number [0-1] indicates the syncing progress of the currently connected node
:::

ref: [connex API - create a ticker](/connex/api.html#create-a-ticker)

---
### connex.thor.account
Account visitor is a bunch of APIs to get account details and interact with account methods.

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="xjwx89" data-slug-hash="eYvGJJR" data-preview="true" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="connex.thor.account - balance">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/eYvGJJR">
  connex.thor.account - balance</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

:::tip 📖 Tips
- **balance**: hex form of VET balance in unit *wei*
- **energy**: hex form of VTHO balance in unit *wei*
- **hasCode**: when it equal to *true*, it means that its a smart contract
:::

ref: [connex API - account visitor](/connex/api.html#account-visitor)

---

### connex.thor.transaction
Transaction visitor is a bunch of APIs to get transaction details.

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="xjwx89" data-slug-hash="gOmqjXm" data-preview="true" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="connex.thor.transaction">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/gOmqjXm">
  connex.thor.transaction</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


:::tip 📖 Tips
Transaction receipt
- **reverted**: Several reasons can cause the transaction to revert. It means that the transaction data is passed through to a virtual machine(aka. VM) but not able to process. The most common reasons are `insufficient balance` and smart contract `not able to execute data`.

- **gasPayer**: the address which paid the transaction fee. It is an important factor to determine the transaction is whether using fee delegation or not. If the transaction is paid by another address, the `txOrigin` and `gasPayer` will be different..
 
- **txOrigin**: the address which signed the transaction
:::

ref: [connex API - transaction visitor](/connex/api.html#transaction-visitor)

---
### connex.thor.filter
It allows you to filter transfer and event logs on the blockchain. The filter usually works with `Connex.thor.account`, either creates a filter from an event or packs criteria and then assembles several criteria and sets them to a filter.

:::tip 📖 Tips
- **criteria**: is a set of an array which contain a `event.criteria` or `transfer.criteria`. The items in the criteria array will be combined by `OR` operator to filter the events: <br>
*example:<br>
[{"ConA": "A"}, {"ConB": "B", "ConC": "C"}] is 'ConA=A `OR` (ConB=B `AND` ConC=C)'*
- **filterRange**: Filtering a specific time frame transfer or event logs by setting `block number` or `timestamp` in second to the filter 
:::
#### • transfer
Filter VET transfer by setting the criteria to `txOrigin`,`sender`, and `recipient`.In addition, set the `filterRange` of filter to determine the transfer flog in the specific period

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="RwVagQX" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/RwVagQX">
  connex.thor.filter - transfer</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
<br>

#### • event
Filter event by setting criteria base on the contract methods(Contract ABI).
<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="xxdOxya" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/xxdOxya">
  connex.thor.filter - event</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


ref:[connex API - filter](https://docs.vechain.org/connex/api.html#filter)

---
### connex.vendor 
In some cases, the application may not need the ability to access the entire blockchain. You can just create `connex.vendor` module instead of `connex.thor` module.`connex.vendor` is a way that allows dapps to interact with a *user* such as signing a certificate or transaction.

#### Certificate: connex.vendor.sign
The certificate is a message signing-based mechanism that can easily request the user's `identification`(*address*) or user to agree to the `agreements`.


<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="xjwx89" data-slug-hash="xxqxPBv" data-preview="true" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="VeChain sync - request certificate ">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/xxqxPBv">
  VeChain sync - request certificate </a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


ref: [connex API - certificate signing service](/connex/api.html#certificate-signing-service)

---          
#### Transaction: connex.vendor.sign
Signing a transaction is the most common interaction between dApp and user.A transaction may contains *one* more *multiple* clauses(operation) that requesting the user to *confirm*(sign) the transaction. 

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-user="xjwx89" data-slug-hash="OJprbQX" data-preview="true" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="OJprbQX">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/OJprbQX">
  OJprbQX</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

:::tip 📖 Tips
- Transaction can contains multiple clauses and each clause contains three majors content: `to` ,`value` and `data`.
- Provide a brief `comment` to the transaction or a clause to help the user to understand
- Provide a `link` to reveal transaction-related information, the link will be used for connex to assemble a callback url by replacing the placeholder *{txid}* by Transaction ID 
:::


ref: [connex API - transaction signing service](/connex/api.html#transaction-signing-service)

----

## Demos

### 1. Buy an item with user login 

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="OJpeRmb" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/OJpeRmb">
  Purchase item with login </a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


----
### 2. Token transfer 

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="RwpzWaq" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/RwpzWaq">
  TokenList</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>


----
### 3. Buy me a coffee

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="PopgXWj" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/PopgXWj">
  localStorage</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---
### 4. Address avatar

> Address avatar is generated by [Picasso](https://github.com/vechain/picasso) a general purpose deterministic identity icon library in svg format

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="xxqBrwQ" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/xxqBrwQ">
  picasso</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

---

### 5. Sign tx and check receipt

<br>
<p class="codepen" data-height="500" data-theme-id="light" data-default-tab="result" data-slug-hash="vYmGymd" data-preview="true" data-user="xjwx89" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;">
  <span>See the Pen <a href="https://codepen.io/xjwx89/pen/vYmGymd">
  Demo - sign tx and check</a> by shaohuaiW (<a href="https://codepen.io/xjwx89">@xjwx89</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>
