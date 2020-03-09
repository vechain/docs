---
title: How to Integrate VIP-191 (II)
date: 2020-03-05
description: From the previous episode, we have learned the basic “terminologies” of VeChain VIP-191 fee delegation. To summarize, the process can be simply described as below
author: abyteahead
sidebar: auto
tags:
    - VIP191
    - Connex
---
# How to Integrate VIP-191 (II)

From the previous episode, we have learned the basic “terminologies” of VeChain VIP-191 fee delegation. To summarize, the process can be simply described as below:

1. The “user” creates a transaction body.

1. The “user” generates a “user signature”.

1. The transaction is sent to a “sponsor” to get a “sponsor signature”.

1. The two signatures are combined to forge a “final signature”.

1. The final transaction is posted to the VeChain network.

To get an overview, the idea is depicting as below:

![Overview of VIP-191 Fee Delegation.](https://cdn-images-1.medium.com/max/3140/1*sn2Hy9U6PYsA5xCSqspBBQ.png)*Overview of VIP-191 Fee Delegation.*

Our example will involve a user with an “empty wallet” tries to call a smart contract (which costs gas) then the sponsor pays for the operation. Let’s break it down step by step.

### Deploy the Smart Contract

First, we need to deploy a simple contract on test-net for us to interact with. The source code of the smart contract is as simple as below. It contains a counter variable which will be increased each time the function increaseAmount is called by any user.

```
pragma solidity ^0.5.11;

contract Hello {
    uint public counter;

    constructor () public {
        counter = 0;
    }

    function increaseAmount () public {
        counter = counter + 1;
    }
}
```

Many tools can be used to deploy the smart contract, we won’t cover the process in this article, but you can read it from [this tutorial](https://medium.com/@abyteahead/how-to-fast-deploy-a-smart-contract-on-vechain-with-bare-hands-eab8d7d96b43).
> Also, I have deployed it on test-net already, on address: 0x6d48628bb5bf20e5b4e591c948e0394e0d5bb078
We will go with this address in the rest of the article.

### Build a Transaction Body

We employ the thor-devkit.js library to help us with the building of a transaction. To call the method, we build a simple transaction like this:

```
// Using thor-devkit.js
const Transaction = require('thor-devkit/dist/transaction').Transaction

// Construct transaction body.
const txBody = {
    // Test-net: 0x27,  Main-net: 0x4a.
    chainTag: 0x27,
    // After which block this tx should happen?
    // 16 characters of block ID.
    blockRef: '0x004984e1064ed410',
    // Expires after 30 days.
    expiration: 30 * 8640,
    // Call the contract method "increaseAmount"
    clauses: [{
        to: '0x6d48628bb5bf20e5b4e591c948e0394e0d5bb078',
        value: 0,
        data: '0x74f667c4'
    }],
    gasPriceCoef: 0,
    gas: 50000,
    dependsOn: null,
    nonce: '0xa3b6232f', // Random number
    // Must include this field to activate VIP-191.
    reserved: { 
        features: 1
    }
}

// Construct a transaction.
const tx = new Transaction(txBody)
```

Some fields need clarification:

In the above, to the field is pointing to the contract we want to call;

The data field (data: ‘0x74f667c4’) is exactly the encoded method increaseAmount that we want to call.

The nonce field needs to be a random hex number, don’t repeat yourself!

The reserved field is included to notify that this transaction is using the feature of vip-191 fee delegation.

### Generate a User Signature

Since the user wants to call the smart contract, a signature from the user is required. We import an empty wallet and generate a “user signature” of the transaction.
> The user wallet is as below:
> Public address: 0x881Ab2380017870C49a9A114806C05F3CFE406e2
> Private key: 2a0cbfe49ea7c18e89b87be4237e1717823fc16b52dc02e91fb30af122fba9b3
> Balance: [[Link](https://explore-testnet.vechain.org/accounts/0x881ab2380017870c49a9a114806c05f3cfe406e2)]

```

// Import library
const cry = require('thor-devkit/dist/cry')
const Transaction = require('thor-devkit/dist/transaction').Transaction

// User private key.
const originPriv = Buffer.from(
    '2a0cbfe49ea7c18e89b87be4237e1717823fc16b52dc02e91fb30af122fba9b3',
    'hex'
)
// User public address: 0x881Ab2380017870C49a9A114806C05F3CFE406e2
const originAddress = cry.publicKeyToAddress(cry.secp256k1.derivePublicKey(originPriv))

// Construct the hash for signing.
const originHash = tx.signingHash()

// Construct the user signature.
const originSignature = cry.secp256k1.sign(originHash, originPriv)
```

From the above code, the program has obtained a“user” signature as originSignature. Next step we need to obtain the “sponsor” signature. Usually, the sponsor exists over the internet as a service. So we will use the HTTP protocol to obtain it.

### Get a Sponsor Signature

This step requires us to send the original transaction to the sponsoring service and let the sponsor generate a signature for us. On the user’s side, the network operation is can be wrapped into a getSponsorSignature function:

```

// HTTP function definition
async function getSponosrSignature(sender, txBody) {
    const url = 'http://localhost:3000/'
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            'sender': sender,
            'txBody': txBody
        })
    })

    const r = await response.json()
    return r['sponsor_signature']
}

// Fetch the sponsor signature.
const sponsorSignature = await getSponosrSignature(
    '0x'+originAddress.toString('hex'),
    txBody
)
```

Pay attention to the following details:

[http://localhost:3000/](http://localhost:3000/) is the destination we post our request;

We have posted two things: sender which is the user’s address, and txBody is the original transaction itself;

We expect sponsorSignature to be sent back from the sponsor and the user can finally assemble the signature.

## Next Steps

If you have followed the above steps faithfully, then the job on the user’s side is almost done. The remote sponsor needs to react to the request and return the signature or reject it. We will continue in the next tutorial about:

* Write a sponsor service to generate “sponsor signature”.

* Combine the user signature with the sponsor’s signature.

* Assemble the final transaction and post to the VeChain network.

## Continue Reading:

* [How to Integrate VIP-191 (I) — Intro](https://medium.com/@abyteahead/how-to-integrate-vip-191-i-f50971bb89eb)

* [How to integrate VIP-191 (II) — User’s side](https://medium.com/@abyteahead/how-to-integrate-vip-191-ii-1b4e32d7960d)

* [How to integrate VIP-191 (III) — Sponsor’s side](https://medium.com/@abyteahead/how-to-integrate-vip-191-iii-f08e9b66e457)
