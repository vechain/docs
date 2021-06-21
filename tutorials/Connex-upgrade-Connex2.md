---
title: 关于Connex1 升级到 Connex2，需要了解哪些
date: 2021-06-08
description: simple codes for upgrade
author: Breeze
sidebar: false
tags:
    - Connex2
prev: false
next: false
---

# 关于 Connex1 升级到 Connex2，需要了解哪些

随着 Sync2 的发布，Connex2 也随之诞生，并作为单独的 npm package 发布，让 DApp 与 Sync2 变得更加独立。

-   connex1 是内置于 Sync1 中的 DApp 运行环境，为 Dapp 提供签名请求，及区块链访问的 api。为了 DApp 有效运行，基于 Connex1 的 DApp 只能在 Sync1 或（雷神钱包） 的内置浏览器中运行

-   随着 Sync2 发布，与之配套的 Connex2 诞生，基于 Connex2 的 Dapp 可以独立于钱包，在浏览器中使用，并使用由 Sync2 提供钱包签名服务；当在 Sync1 中使用时（compat mode，网络相同的情况下 ）会兼容 Sync1（不包括新增 API）使用 Sync1 的交互方式，网络不同时行为符合一般浏览器行为，与 sync2 交互。

## Connex2 变更的 api

### 创建 Connex, 
在 Sync1 中 connex 是内置于 window 上的，但是 Connex2 是需要手动创建的并指定节点及网络

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

### 创建 SigningService 的方式改变
Connex2 Signing service 构建方式变化，并且 delegate 只需要一个请求地址， Compat mode 下 connex2 的 delegate 在 Sync1中 将会失效。

```diff

    const txMsg: Vendor.TxMessage
    const certMsg: Vendor.CertMessage
    // Connex v1
-   const txSigningSvc = new connex.vendor.sign('tx')
-   txSigningSvc.delegate(DelegationHandler).request(txMsg)

-   const certSigningSvc = new connex.vendor.sign('cert')
-   certSigningSvc.request(certMsg)

    // Connex v2
+   const txSigningSvc = new connex.vendor.sign('tx', txMsg)
+   txSigningSvc.delegate('delegate request url').request()

+   const certSigningSvc = new connex.vendor.sign('cert', certMsg)
+   certSigningSvc.request()
```

## Connex2 新增的 api

新增 API 只在非 Compat mode 时起效

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

thor.explain(clauses). gasPayer(address)

vendor.sign.accepted(callback)
```
