
# Get Started 
Connex is the standard interface to connect VeChain apps with VeChain blockchain and user. Connex is a set of well-designed APIs for developers, with injected Connex Object in web applications they can easily build decentralized applications.Before we start, you might need to know some basic knowledge about VeChainThor. it may help you to have a bigger picture to understand the feature and basic knowleage to develope an applicaton 

## VeChain App Bootstrapping

VeChain apps are usually web apps. On app load, you always need to detect Connex component. If Connex is not available, you may instruct people to setup Connex environment.

To simplify these steps, simply perform redirection:

```javascript
if(!window.connex) {
    location.href = 'https://env.vechain.org/r/#' + encodeURIComponent(location.href)
}
```

Additionally, network can be specified:

```javascript
if(!window.connex) {
    // the app prefers running on test net
    location.href = 'https://env.vechain.org/r/#/test/' + encodeURIComponent(location.href)
}
```

## Installation

TypeScript(Recommended)

``` bash
npm install @vechain/connex --save-dev
```

Add `@vechain/connex` to `compilerOptions.types`  in `tsconfig.json` then you are good to go!

Looking for other options?
* [connex-framework](https://github.com/vechain/connex-framework) - Connex Framework is a library implements Connex interface. It helps various wallet instances offer consistent Connex interface to VeChain DApps.
* [connex.driver](https://github.com/vechain/connex.driver) - Defines the interface to drive connex framework
* [connex.driver-nodejs](https://github.com/vechain/connex.driver-nodejs) - It drives Connex Framework to work in NodeJS environment. Now you can use Connex in NodeJS backend project.


### Usage

``` javascript
const el = document.createElement('h1')

const status = connex.thor.status
el.innerText = 'You are \'connexed\' to vechain, the status is ' + (status.progress === 1 ? 'synced': 'syncing')

document.querySelector('body').append(el)
```


## Architecture explained
![connex-architecture](~@public/images/connex/architecture.png)

## Implementation Test
Implementation test is a `BDD` test for connex client implementation. you can test for @vechain/connex in [here](https://connex-impl-test.vecha.in/)


### Requirements

+ [Running thor](/thor/get-started/installation.md#running-thor) under `TestNet`
+ `Connex.Vendor` needs user to interact (Signing should be complected in 40 seconds or it will fail)
+ `0x7567d83b7b8d80addcb281a71d54fc7b3364ffed` need to be added to wallet

:::tip note
You can find `0x7567d83b7b8d80addcb281a71d54fc7b3364ffed` private key under [solo mode](/thor/get-started/installation.md#sub-commands)
:::

### Project setup
```bash
npm install
```

#### Compiles and hot-reloads for development
```bash
npm run serve
```

#### Compiles and minifies for production
```bash
npm run build
```

## Compatible Client
### Desktop
- [Sync](https://github.com/vechain/thor-sync.electron) : The official desktop wallet firstly supports Connex. It provides seamless experience for users and developers. Which is designed to provide the superior user experiences for VeChain Apps, and serves as the dApp environment to provide unlimited potential for developers and users.

### Mobile
- VeChainThor Mobile Wallet ([iOS](https://apps.apple.com/us/app/id1397679485)
/ [Android](https://cdn.vechain.com/vechainthorwallet/client/VeChainThorWallet.apk)) : VeChainThor Wallet is a light mobile wallet app. We aim to provide users with a powerful, secure, simple, fully functional portal of the VeChainThor blockchain.

- Sync Mobile [beta](https://testflight.apple.com/join/UepoMMnP) : Official mobile wallet fully supports Connex. Provide superior user experience for VeChain Apps, and serves as the dApp environment to provide unlimited potential for developers and users.