---
title: Connex1 升级到 Connex2
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

# Connex1 升级到 Connex2

随着 Sync2 的发布，Connex2 也随之诞生，并作为单独的 npm package 发布，让 DApp 与 Sync2 变得更加独立。

## Compat Mode
-   基于 Connex2 的 Dapp 运行在网络环境相同的 Sync1 中。
## Connex1 与 2 区别概述
-   Connex1 是内置于 Sync1 中的, 所以基于 Connex1 的 DApp 强依赖于Sync1。需要在Sync1 中运行，这样才能使用 Connex1 的签名服务，且网络环境依赖于 Sync1。

-   Connex2 是独立的开发包，需要 Dapp 直接引入使用，且自行决定网络环境，非必须在 Sync 中运行。且同时兼容全部 Sync2 和 大部分Sync1 的功能。Dapp 变的更加独立。

## Connex2 的变更

### 安装 Connex2
- 使用标签引入 Connex2
``` html
<!-- install the latest v2 -->
<script src="https://unpkg.com/@vechain/connex@2" />
```
- npm 安装

```
npm i @vechain/connex
```

### 创建 Connex
在 Sync1 中 connex 是内置于 window 上的且网络环境确定，但是 Connex2 是需要手动创建的并指定节点及网络。

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

### 创建 SigningService
Connex2 SigningService 创建方式变化

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

### TX SigningService.delegate 参数变化

[更多详情](/connex/api.html#transaction-signing-service)
```diff
    const txMsg: Vendor.TxMessage

    // Connex1
-   const txSigningSvc = new connex.vendor.sign('tx')
    txSigningSvc.delegate( async (unsigned): Promise<string> => {})

    // Connex2
+   const txSigningSvc = new connex.vendor.sign('tx', txMsg)
+   txSigningSvc.delegate(url, signer?)
```

## Connex2 新增的 api

新增 API 仅在使用 Connex2 且非 Compat mode 时起效

[更多](/connex/api.html)

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
