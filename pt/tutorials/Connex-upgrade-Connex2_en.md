---
title: Upgrading Connex1 to Connex2
date: 2021-06-08
description: Code examples for upgrading Dapps
author: Breeze
sidebar: false
tags:
    - Connex
    - Sync
prev: false
next: false
---

# Upgrading Dependencies from Connex1 to Connex2

Connex2 is published as a javascript library as Sync2 published. Making the Dapps and Sync2 more independent from each other.

## Differences between Connex1 and Connex2

-   Connex1 is a build-in api within Sync1. The DApps build on Connex1 are dependent on Sync1.

-   Connex2 is a JS library. The Dapp needs to manually import Connex2 and create the instance of it.

## Compatible Mode

Dapps primarily built with Connex2 can be run in Sync1, however:
- If the network requirement is different, eg. main-net Dapp running on test-net environment, it treats Sync1 as a plain browser and tries to launch Sync2.
- If the network requirement is the same, eg. main-net Dapp running on main-net environment, it runs in compatible mode, and most common apis works.
- New Connex2 APIs are not avaialbe even in compatible mode, they are available for Connex2 exclusively.

## Connex2 Changes

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
Connex1 is a build-in property of window in Sync1 with network chosen for you, but Connex2 is created by assigned network.

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

[More Info](/connex/api.html#transaction-signing-service)
```diff
    const txMsg: Vendor.TxMessage

    // Connex1
-   const txSigningSvc = new connex.vendor.sign('tx')
    txSigningSvc.delegate( async (unsigned): Promise<string> => {})

    // Connex2
+   const txSigningSvc = new connex.vendor.sign('tx', txMsg)
+   txSigningSvc.delegate(url, signer?)
```

## New Connex2 APIs

The new APIs **only** work in non-compatible mode.

[More Info](/connex/api.html)

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
