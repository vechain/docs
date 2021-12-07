---
title: How To Develop a DApp on VeChain (III) ： Components & Coding
date: 2019-03-06
description: Congratulations! You have made to the last episode of this tutorial. Here we will put everything we know together and make a useful program  a VTHO token transfer tool. The official Sync only provides the VET transfer functionality, our VTHO tools is a very good supplement to the status quo.
author: abyteahead
sidebar: auto
tags:
    - Connex
    - Sync
prev: /tutorials/how-to-develop-a-dapp-on-vechain-2
next: false
---

# How To Develop a DApp on VeChain (III): Components & Coding

Congratulations! You have made to the last episode of this tutorial. Here we will put everything we know together and make a useful program: a VTHO token transfer tool. The official Sync only provides the VET transfer functionality, our VTHO tools is a very good supplement to the status quo.

## Preparation

Make sure you have the following things ready:

* [Sync](https://env.vechain.org) set up and running on your computer.

* A testing account, which is already presented in Sync.

* Some VET and VTHO in your testing account.

* Sync running on test net.

![](https://cdn-images-1.medium.com/max/7456/1*5sGTMuzQ8gaIiPG9COavjw.jpeg)
> If you don’t know how above requirements are done, check the previous episode: [https://medium.com/@laalaguer/how-to-develop-a-dapp-on-vechain-ii-setup-walk-around-109a01bf7ae9](https://medium.com/@laalaguer/how-to-develop-a-dapp-on-vechain-ii-setup-walk-around-109a01bf7ae9)

## Setup in 3 minutes

Great! Now we start to build the real web page DApp. Let us set up the project and necessities first. We will use [Vue](https://vuejs.org/).js and [BootstrapVue](https://bootstrap-vue.js.org/) as our foundation.
```bash
    > mkdir vtho-transfer
    > cd vtho-transfer/

    > npm install -g [@vue/cli](http://twitter.com/vue/cli) # Install vue-cli.
    
    > vue create -b -n my-project # Create a clean Vue project.

    > cd my-project # Now you are in a Vue workspace!

    > npm install vue bootstrap-vue bootstrap # Install BootstrapVue.

    > npm install bignumber.js # Math library.

    > npm run serve # Start development server on background.
```
We are all set! Now let us view our precious project in Sync. Open a tab and navigate to [http://localhost:8080.](http://localhost:8080.) It should be like this:

![](https://cdn-images-1.medium.com/max/7544/1*Sg-YkK-8W-WWbt8WV4F_uA.jpeg)

## Coding

Due to the length of this tutorial, we write **one core component** and demo the key functions. The rest of the code and a more complicated example can be found **at the bottom of this tutorial**.

### The Appearance

The app must be stylish! Clean up the default **main.js** and add a BootstrapVue library, quite simple:

```js
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue' // Here
import 'bootstrap/dist/css/bootstrap.css' // Here
import 'bootstrap-vue/dist/bootstrap-vue.css' // Here
import App from './App.vue'

Vue.use(BootstrapVue) // Here

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

Put the component on the radar screen by editing the **App.vue**:

```vue

<template>
  <div id="app">
    <div>
      <b-card style="max-width: 30rem;" header="My Address Here">
        <p>My Amount Here <span class="text-primary">VTHO</span></p>

        <b-form-group label="To Address:" label-for="toaddress">
          <b-form-input id="toaddress" v-model.trim="toaddress"></b-form-input>
        </b-form-group>

        <b-form-group label="Transfer Amount" label-for="toamount">
          <b-input-group append="VTHO">
            <b-form-input id="toamount" type="number" min="0" v-model.number="toamount">
            </b-form-input>
          </b-input-group>
        </b-form-group>

        <b-button variant="primary" v-on:click="transfer">
          Transfer
        </b-button>
      </b-card>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>
```

Great! Now save both the files and refresh the Sync tab, the dummy web page pretty much looks like this now:

![](https://cdn-images-1.medium.com/max/6952/1*MiQdFr5KYgT8NglI_f6_qg.jpeg)

Now that we have the skeleton, let’s move on to make the functions to make the app alive. Create a separate empty file alongside the **main.js**, name it **operations.js, **then put several functions into it.

### Query the VTHO Balance

Okay, let us first create a function queries the VTHO balance from the VTHO contract on test net, actually, it can be used to query any contract that is VIP180 compatible. It should be like this:

```js
/**
 * Get token amount of holder from a contract.
 * @param {String} addressContract 0x started address.
 * @param {String} addressHolder 0x started address.
 */
async function getTokenBalance (addressContract, addressHolder) {
  const balanceOfABI = {
      'constant': true,
      'inputs': [
      {
          'name': '_owner',
          'type': 'address'
      }
      ],
      'name': 'balanceOf',
      'outputs': [
      {
          'name': 'balance',
          'type': 'uint256'
      }
      ],
      'payable': false,
      'stateMutability': 'view',
      'type': 'function'
  }
  // eslint-disable-next-line
  const balanceOfMethod = connex.thor.account(addressContract).method(balanceOfABI)
  const balanceInfo = await balanceOfMethod.call(addressHolder)
  return balanceInfo
}
```

Quite self-explanatory, this getTokenBalance function queries the contract about how much token the user holds, when we call it, we feed it with the actual contract address and user’s account address. Notice that we used the call() function of connex.js, which we introduced in the previous episode.

### Sign Transaction and Send VTHO

How to sign the transaction and send it to the other person? Simple, we just use the sign-and-send API embedded in the **connex.js. **Let’s create a function for that, too. Still, in the **operation.js**, append this code:

```js
/**
 * Transfer token from one to another.
 * @param {String} addressContract Contract address.
 * @param {String} signerAddress Enforce who signs the transaction.
 * @param {String} toAddress Receiver of transfer.
 * @param {String} amountEVM Big number in string.
 * @param {Number} amountHuman Normal number in Javascript.
 * @param {String} symbol Symbol of token.
 */
async function transferToken (addressContract, signerAddress, toAddress, amountEVM, amountHuman, symbol) {
    const transferABI = {
      'constant': false,
      'inputs': [
        {
          'name': '_to',
          'type': 'address'
        },
        {
          'name': '_value',
          'type': 'uint256'
        }
      ],
      'name': 'transfer',
      'outputs': [
        {
          'name': '',
          'type': 'bool'
        }
      ],
      'payable': false,
      'stateMutability': 'nonpayable',
      'type': 'function'
    }
    // eslint-disable-next-line
    const transferMethod = connex.thor.account(addressContract).method(transferABI)
    const transferClause = transferMethod.asClause(toAddress, amountEVM)
    // eslint-disable-next-line
    const signingService = connex.vendor.sign('tx')
    signingService
      .signer(signerAddress) // Enforce signer
      .comment('Token transfer: ' + amountHuman.toString() + ' ' + symbol)
  
    let transactionInfo = await signingService.request([
      {
        comment: 'Hello! Transfer Demo!',
        ...transferClause
      }
    ])
    return transactionInfo
  }
  ```

The above snippet is mainly abouttransferToken , which is a general purpose transfer action. It takes the contract address, sender address, receiver address, amount of transfer, then asks the **connex** to sign the transaction and send out!

Now finish the **operations.js** file with the export section as usual:

```js
  export {
    getTokenBalance,
    transferToken
  }
```

### Formatting Numbers

In the smart contract, the decimals don’t exist. All numbers are integers. To present the numbers right to the decimal, we power it with 10 times precision. So when we say: **123.456** in human language, it should be presented in:
> 123.456 * (10 ^ 18) and then send to EVM. And vice versa.

So we need some utilities as a broker to help us with number formatting. Create a new file **utils.js** and place the following content inside:

```js
const BigNumber = require('bignumber.js')
const DECIMALS = function (points) {
  return new BigNumber(10 ** points) // Decimals = 18 on VTHO and most contracts.
}

/**
 * Turn a string to big number.
 * @param {String} aString a number string.
 */
const makeBN = function (aString) {
  return BigNumber(aString)
}

/**
 * Turn a BigNumber into a printable string.
 * @param {BigNumer} aBigNumber A big number.
 * @param {Integer} dp An integer of percision, default is 2.
 */
const printBN = function (aBigNumber, dp = 2) {
  return aBigNumber.toFixed(dp)
}

/**
 * Turn an EVM big number into normal human understandable percision.
 * @param {BigNumber} aBigNumber An EVM big number.
 * @param {Number} decimals Percisions that EVM number has. Default is 18.
 */
const evmToHuman = function (aBigNumber, decimals = 18) {
  return aBigNumber.dividedBy(DECIMALS(decimals))
}

/**
 * Turn a human understandable number to an EVM Big number.
 * @param {String} aNumber A normal float/int from user input.
 * @param {Number} decimals Percisions that EVM number has. Default is 18.
 * @returns {String} String represented number.
 */
const humanToEVM = function (aNumber, decimals = 18) {
  const a = makeBN(aNumber)
  return a.multipliedBy(DECIMALS(decimals)).toString(10)
}

/**
 * Shortcut turing EVM big number string into human readable short format.
 * @param {String} aString String representing the EVM big number.
 * @param {Number} decimals Percisions that EVM number has. Default is 18.
 * @param {BigNumber} dp decimal points that result shall keep.
 */
const evmToPrintable = function (aString, decimals = 18, dp = 2) {
  const evmNumber = makeBN(aString)
  const humanNumber = evmToHuman(evmNumber, decimals)
  return printBN(humanNumber, dp)
}

export {
  makeBN,
  printBN,
  evmToHuman,
  humanToEVM,
  evmToPrintable
}
```

Great! All is done, now we put things together and make our app alive!

## Put Things Together

Time to go back to **App.vue** to fill up the Javascript section.

Firstly, let’s call the VTHO contract and display our VTHO balance, here is what I did in code:

* Fix in the VTHO smart contract address.

* Fix in my account address. (Generated from the previous episode of tutorials)

* Initialization the VTHO balance query before the component is mounted.

```js
<script>
const operations = require('./operations.js')
const utils = require('./utils.js')
export default {
  data() {
    return {
      myaddress: '0xa7a609b928c4eac077d0e5640f3fa650746c4fcf',
      myamount: 0,
      contract: '0x0000000000000000000000000000456e65726779'
    }
  },
  beforeMount () {
    this.refreshTokenBalance()
  },
  methods: {
    refreshTokenBalance () {
      operations.getTokenBalance(this.contract, this.myaddress)
        .then(result => {
          this.myamount = utils.evmToPrintable(result['decoded']['balance'], this.decimals)
        })
        .then(() => {
          // eslint-disable-next-line
          const ticker = connex.thor.ticker()
          ticker.next().then(() => { this.refreshTokenBalance() })
        })
    }
  }
}
</script>
```
>  Note: you can always use ticker() instead of setTimeout() to recursively query the balance of your account. 😉

Secondly, we add the function of sending VTHO token transactions to the button, so we can get alert whenever it succeeds or fails.

```js
<script>
methods: {
 // ... add after refreshTokenBalance()
  transfer () { // Confrim and send out a transfer.
    const evmAmount = utils.humanToEVM(this.toamount.toString(), 18)
    operations.transferToken(this.contract, this.myaddress, this.toaddress, evmAmount, this.toamount, 'VTHO')
      .then(result => {alert('success!')})
      .catch(e => {alert('failed!')})
  }
}
</script>
```

Great! Now update our template to bind to those data:

```vue
<template>
  <div id="app">
    <div>
      <b-card style="max-width: 30rem;" :header="myaddress">
        <p>{{myamount}} <span class="text-primary">VTHO</span></p>

        <b-form-group label="To Address:" label-for="toaddress">
          <b-form-input id="toaddress" v-model.trim="toaddress"></b-form-input>
        </b-form-group>

        <b-form-group label="Transfer Amount" label-for="toamount">
          <b-input-group append="VTHO">
            <b-form-input id="toamount" type="number" min="0" v-model.number="toamount">
            </b-form-input>
          </b-input-group>
        </b-form-group>

        <b-button variant="primary" v-on:click="transfer">
          Transfer
        </b-button>
      </b-card>
    </div>
  </div>
</template>
```

Now all the code is finished, make sure you have saved the same:
> GitHub repo of all the source code: [[GitHub Link](https://github.com/laalaguer/token-transfer-demo)]

## Test the App

Now let us view our first triumph on the VeChain DApp journey!

On Sync browser, visit [http://localhost:8080](http://localhost:8080), then do the following:

1. Input a receiver: 0x422D582C08d7965cD5Fefef1572faaA15783f473

1. Input the amount: 10 VTHO

1. Clicking the little “Transfer” blue button.

Then wait for it…. the magic time! Sync prompts me to unlock my account to send the transaction:

![](https://cdn-images-1.medium.com/max/3856/1*1g_INpWjOspyEiFR_x2zdQ.png)

Of course, I input the password correctly, and you can see the transaction details on test net [here](https://explore-testnet.vechain.org/transactions/0xcd46a2ae14d44b612d9ee628770d4a65932352a9bb9861ca32ece4811878a5c8#info)

Finally, our example has finished! Thanks for hard working!

![](https://cdn-images-1.medium.com/max/2000/1*348CFajTrWZzeC-aPElJ5Q.jpeg)

## One More Thing

If you are interested, this source code also is available at the GitHub below:

[https://github.com/laalaguer/token-transfer-demo](https://github.com/laalaguer/token-transfer-demo)

The full VeChain token transfer is more complicated, the GitHub is below:

[https://github.com/laalaguer/vechain-token-transfer](https://github.com/laalaguer/vechain-token-transfer)
