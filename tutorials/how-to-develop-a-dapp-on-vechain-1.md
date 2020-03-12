---
title: How To Develop a DApp on VeChain (I)： Intro
date: 2019-02-26
description: In this tutorial, I will walk through with you guys about *how to* build up an ERC20 standard token transfer web page on VeChain.
author: abyteahead
sidebar: auto
tags:
    - Connex
    - Sync
prev: false
next: /tutorials/how-to-develop-a-dapp-on-vechain-2
---


# How To Develop a DApp on VeChain (I)：Intro

Recently I have been working on a DApp tool on VeChain. However, I searched a lot but couldn't find any hands-on tutorial for developers. I decided to go for it and shed some light on this topic. In this tutorial, I will walk through with you guys about *how to* build up an ERC20 VIP180 standard token transfer web page** on VeChain.

This tutorial splits into 3 parts, the topics are:

* [Intro](https://medium.com/@laalaguer/how-to-develop-a-dapp-on-vechain-i-intro-86ccc48ef079).

* [Setup & Walk Around](https://medium.com/@laalaguer/how-to-develop-a-dapp-on-vechain-ii-setup-walk-around-109a01bf7ae9).

* [Components & Coding](https://medium.com/@laalaguer/how-to-develop-a-dapp-on-vechain-iii-components-coding-8c4eea965684).

Ready? Let us get our hands dirty! 😉

## What is DApp?

![](https://cdn-images-1.medium.com/max/2000/1*qpy5NueXgD2PJFJWupJP5g.jpeg)

Many people ask me as a blockchain developer, what is a ***DApp***? In one of my simpler version of the answers, “**DApp = Web + Blockchain**”. Yep, the current web technologies are still heavily used. We simply move some data and authentications onto the blockchain, that’s it. It’s the same idea behind [Web3.js](https://github.com/ethereum/web3.js/), as well as the [Connex.js](https://www.npmjs.com/package/@vechain/connex) we will be talking about later.

To answer that, we first look at what a traditional ***web application*** looks like:

![Web app: client, server and database.](https://cdn-images-1.medium.com/max/3528/1*tY6R3nkcaTEEDNFR4RD49g.jpeg)*Web app: client, server and database.*

### What’s Web Application?

A ***web application*** in a simplified scenario is a typical client-server application. It contains several critical parts:

* **Client**: web browsers.

* **Server**: operates the database, serves the clients data.

* **Database**: stores the data as valuable assets. 😛

Interestingly, in a web application, ***data is at the core heart***. It flows, displayed, transformed and stored in the system. End users view the data from the web pages on the browsers.

A web application also has several characteristics in common:

* The server interfaces with the database, ***not*** clients.

* The database is hidden and holds ***valuable*** assets.

* The user has** *no direct control*** of the data, only the server can. 😛

So blockchain promises the future of “**Users in charge of their data**”, what does a DApp look like exactly?

Simple. It looks like a web app, except we have one add-on: Blockchain.

![DApp: Web + Blockchain](https://cdn-images-1.medium.com/max/3536/1*2AOjTQhr1lRlXs7JQiQ9YA.jpeg)*DApp: Web + Blockchain*

### What is DApp?

***DApp*** is an application that is backed up by a distributed blockchain service. To make an analog to the web apps we use today, ***DApp relies partially on blockchain data*** but still is a web application (or web page).

* Client: Browser/IoT devices.

* Server: Serves code fragments or static assets like images.

* Blockchain: **Partial replacement** of database, stores/processes critical user data.
> # A public blockchain is a openly readable, slow, expensive database running by a network consists of hundreds of nodes.

***DApp*** also has several characteristics in common:

* DApp interfaces with **both** blockchain and traditional server.

* The blockchain **cannot** be easily shut down as it contains multiple nodes.

* The user can **directly control** data on the blockchain via DApp.

Great, now you know what does a DApp do and where the data is coming from, let us focus on how to write one.

## Write a DApp: Sync and Connex

![Sync: Browser of VeChain apps.](https://cdn-images-1.medium.com/max/4256/1*rbq_5MkZBujA3qDGsvsvWw.png)*Sync: Browser of VeChain apps.*
> # ***DApp*** shall both know how to communicate with traditional server backend as well as read/write from a blockchain network. **Connex.js** helps with the blockchain part, makes the developer life easier.

VeChain published **Connex.js** to substitute **Web3.js** in Ethereum. It is a huge step from Web3 and I am glad to use it in my first VeChain project:

* [**Sync](https://env.vechain.org)**: Web browser of VeChain apps.

* [**Connex.js](https://www.npmjs.com/package/@vechain/connex)**: Standard Javascript library that helps to communicate with VeChain, ***included*** in Sync.

## Token Transfer: A Simple DApp in Javascript

Starting from the next article, we will start to build a demo DApp named as “Token Transfer”. We will use an existing smart contract on VeChain as the data source**. **And I will help you to familiar with the environment**:**

1. How to read data from a VeChain blockchain smart contract.

1. How to display data to the user.

1. How to update data on blockchain via Javascript calls.

With the help of **Connex** in the **Sync** browser, we will do it in the blink of an eye! Follow the hands-on tutorials below to start coding! 😝
