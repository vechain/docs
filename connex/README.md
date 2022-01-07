---
sidebarDepth: 1
---
# Connex

Connex is the standard interface to connect dApps with VeChain blockchain and users. Aiming to help developers building decentralized applications.

## Installation

Installing connex into your web-based applications.

### Include in `<script>` tag

Just include the CDN link within a script tag. `Connex` will then be registered as a global variable.

```html
<!-- install the latest v2 -->
<script src="https://unpkg.com/@vechain/connex@2" />
```

### NPM

It's recommended when your project is a bit large.

``` sh
npm i @vechain/connex
```

```ts
import Connex from '@vechain/connex'
```

## Setup

### Create a Connex object connects to VeChain mainnet

```ts
const connex = new Connex({
    node: 'https://mainnet.veblocks.net/', // veblocks public node, use your own if needed
    network: 'main' // defaults to mainnet, so it can be omitted here
})
```

### Connect to testnet

```ts
const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
```

### Or connect to a private network

```ts
const connex = new Connex({
    node: '<the API url of your node>',
    // the genesis block of your private network
    network: {
        id: '0x...',
        ...
    }
})
```

### Create `Vendor` module only

In some cases, e.g. the classic ['Buy me a coffee'](https://codepen.io/qianbin/pen/YzGBeOB) demo, you don't need the ability to access the blockchain. You can opt-out `Connex.Thor` module, and just create `Connex.Vendor` module.

```ts
const vendor = new Connex.Vendor('main') // 'main','test' or genesis ID if it's private network
```

## Using in Node.js environment

This package, **@vechain/connex** is designed only working in browser, if you are interested running it in Node.js, try [@vechain/connex-framework](https://github.com/vechain/connex/tree/master/packages/framework).

## Playground
 
 Package [@vechain/connex-repl](https://www.npmjs.com/package/@vechain/connex-repl) provides a quick way to try out connex interface.

## Source Code

+ [connex](https://github.com/vechain/connex/blob/master/packages/connex): The out of the box Connex implementation for browser.
+ [framework](https://github.com/vechain/connex/blob/master/packages/framework): Implements Connex interface.
+ [driver](https://github.com/vechain/connex/blob/master/packages/driver): Implements Connex.Driver interface.
+ [repl](https://github.com/vechain/connex/blob/master/packages/repl): The REPL style command-line playground.
+ [types](https://github.com/vechain/connex/blob/master/packages/types): Connex interface declarations presented in Typescript.
