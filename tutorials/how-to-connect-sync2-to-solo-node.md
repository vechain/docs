---
title: How to connect Sync2 to solo node
date: 2022-04-12
description: This guide will show every step to running a solo node and connecting it to Sync2
sidebar: auto
sidebarDepth: 2
tags:
    - Connex
    - Sync
    - Thor
prev: false
next: false
---
# Intro
This guide will show every step to running a solo node and connecting it to Sync2. The SOLO node is a sandbox development mode for the VeChain Thor blockchain, that can be started (and is only available) on a single server. It is not publicly accessible and the generated blocks will be lost if the SOLO node is stopped.Sync2 is designed to work with all mainstream web browsers (e.g., Chrome, Safari, MS Edge, Firefox, etc), desktop, and mobile devices.

## Step 1 : Launch the solo node


### Running Thor solo with Docker

```sh
docker run  -p 127.0.0.1:8669:8669  vechain/thor:latest solo --api-cors '*' --api-addr 0.0.0.0:8669
```


<details>
<summary>Build & Run from the source code</summary>

#### 1. Get the the source code

:::tip Note 
Thor requires Go 1.13+ and C compiler to build. To install Go, follow this [link](https://golang.org/doc/install)
:::

Clone the [thor repo](https://github.com/vechain/thor)


```sh
git clone https://github.com/vechain/thor.git
cd thor
```

#### 2.Build the thor

```sh
//Build main thor only 
make

// Build the full suite
make all
```

:::tip Note
If no error is reported, all built executable binaries will appear in folder ***bin***.
:::

#### 3. Run the Solo mode

```
bin/thor solo --api-cors '*'
```

</details>

### Solo sub-commands
```sh
solo --on-demand               # create a new block when there is a pending transaction
solo --persist                 # save blockchain data to disk(default to memory)
solo --persist --on-demand     # Both persist and on-demand can be used together 
```

## Step 2 : Connect Sync2 node to solo node
Sync2 is designed to work with all mainstream web browsers (e.g., Chrome, Safari, MS Edge, Firefox, etc), desktop, and mobile devices.

The main advantage and purpose of Sync2 is the massive simplification of dApps and dApp usage. All editions of Sync2, no matter whether the native app is built for desktop or mobile or the automatically invoked SPA version, are designed to appear and function pretty much in the same way, therefore providing a consistent and comfortable user experience for users across different OS and devices.

Compared to Sync v1, the most significant change is that the built-in dApp browser is abandoned. That means now dApps can freely run in your favorite web browser.

### Get Sync2

:::tip System requirements:
- **MacOS** : Minimum macOS version supported is macOS 10.10 (Yosemite). Native support for Apple Silicon (arm64) devices.
- **Windows**: Windows 7 and later are supported, and older operating systems are not supported (and do not work).
- **Linux** : Ubuntu 14.04 and newer/ Fedora 24 and newer/ Debian 8 and newer
:::

You can get Sync2 either download the installation file [here](https://sync.vecha.in/) or built from the source code.
 
<details>
<summary>Build & Run from the source code</summary>

```sh
git clone https://github.com/vechain/sync2.git
cd sync2

//install dependencies
npm install

//Start the app in development mode 

//web mode
quasar dev

//electron(desktop) mode 
quasar dev -m electron

```
</details>

### Connect Sync2 to solo node

#### Step1:  Add node
1. Click **Node** 
2. Click <img src="~@public/images/sync2/add.svg" align=center /> at upper right 
3. Enter the node's url `http:localhost:8669`
4. Click **Add** to add node

#### Step2: Import the solo built-in wallet
1. Click upper left <img src="~@public/images/sync2/menu.svg" align=center /> to open wallet list
2. Click the upper area <img src="~@public/images/sync2/add_circle_outline.svg" align=center /> to new wallet page
3. Click upper right <img src="~@public/images/sync2/more_horiz.svg" align=center />
4. Select the **Private-ea69f6** 
5. Click **Import**
6. Enter your mnemonic words

:::tip Mnemonic phrase of the solo built-in wallet

denial kitchen pet squirrel other broom bar gas better priority spoil cross

:::

5. Enter your password to authorize the import


Congrats! You have successfully connect to solo node with the Sync2, and you can now deploy/integrate by using  [inspector](https://inspector.vecha.in/) or you can check out the [connex tutorial](../tutorials/Useful-tips-for-building-a-dApp.md) to build your own dApp.


## Step 3: Launch Devpal
Devpal is a set of tools to help your development and testing on solo mode and start your blockchain journey smoothly.Devpal contains two tools:

- **Insight**: a serverless VeChain explorer. It allows you to explore and search for blocks, transactions, and accounts.

- **Inspector**: a tool that allows you to deploy and interact with the contract.

You can simply run the devpal by running the following command:

```sh
npx @vechain/devpal
```

:::tip Note
***http://locahost:8669*** is set as the default node url.if you want to change it, please use `npx @vechain/devpal [Thor REST URL]`
:::

