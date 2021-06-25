---
title: Upgrading Connex1 to Connex2
date: 2021-06-08
description: simple codes for upgrading Connex
author: Breeze
sidebar: false
tags:
    - Connex
    - Sync
prev: false
next: false
---

# Upgrading Connex1 to Connex2

Connex2 was born as a js lib with Sync2 published. That's make the Dapp and Sync2 independent.

## Compat Mode
-   Dapp build on Connex2 and running in Sync1 with same network.

## Differences between Connex1 and Connex2
-   Connex1 is Sync1's build-in api. The DApps build on Connex1 are dependent on Sync1.

-   Connex2 is a JS lib. The Dapp need import, and create the instance. Completely Support Sync2 and almost Sync1.


## Connex2 changes

### Install Connex2
- Include in ``` <script> ```tag
``` html
<!-- install the latest v2 -->
<script src="https://unpkg.com/@vechain/connex@2" />
```
- NPM

```
npm i @vechain/connex
```

### Connex Creation
Connex1 is a build-in property of window in Sync1 with clearly network, but Connex2 is created by assigned network.

``` ts
// connex v2
import Connex from '@vechain/connex'
// Create a Connex object connects to VeChain mainnet
const connex = new Connex({
    node: 'https://mainnet.veblocks.net/', // veblocks public node, use your own if needed
    network: 'main' // defaults to mainnet, so it can be omitted here
})

// Connect to testnet
const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})

// Or connect to private network
const connex = new Connex({
    node: '<the API url of your node>',
    // the genesis block of your private network
    network: {
        id: '0x...',
        ...
    }
})

```

### Thor.Filter Creation
``` diff
    const type: 'event' | 'transfer'
    const criteria: Connex.Thor.Criteria<T extends 'event' | 'transfer'>

    // Connex v1
-   const filter = new connex.thor.filter(type)
-   filter.criteria(criteria).apply(offset, limit)

    // Connex v2
+   const filter = new connex.thor.filter(type, criteria)
+   filter.apply(offset, limit)

```
### SigningService Creation

```diff

    const txMsg: Vendor.TxMessage
    const certMsg: Vendor.CertMessage
    // Connex v1
-   const txSigningSvc = new connex.vendor.sign('tx')
-   const certSigningSvc = new connex.vendor.sign('cert')

    // Connex v2
+   const txSigningSvc = new connex.vendor.sign('tx', txMsg)
+   const certSigningSvc = new connex.vendor.sign('cert', certMsg)
```

### TX SigningService.delegate params

[More](/connex/api.html#transaction-signing-service)
```diff
    const txMsg: Vendor.TxMessage

    // Connex1
-   const txSigningSvc = new connex.vendor.sign('tx')
    txSigningSvc.delegate( async (unsigned): Promise<string> => {})

    // Connex2
+   const txSigningSvc = new connex.vendor.sign('tx', txMsg)
+   txSigningSvc.delegate(url, signer?)
```

## Connex2 new apis

The new apis only worked uncompat mode.
[More](/connex/api.html)

```typescript
const address: string
const abi: Object
const kind: 'event' | 'transfer'
const criteria: Thor.Filter<T extends 'event' | 'transfer'>.Criteria<T>[]
const clauses: Thor.Clause[]

thor.account(address).method(abi).gasPayer(address)

thor.account(address).method(abi).transact(...args) // ...args => abi inputs

thor.account(address).event(abi).cache()

thor.filter(kind, criteria).cache()

thor.explain(clauses).cache()

thor.explain(clauses).gasPayer(address)

vendor.sign.accepted(callback)
```
