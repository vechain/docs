---
sidebarDepth: 1
---
# Implementation

This documentation is for the developers who wants to implement a connex compatible client.

## Architecture

In [SYNC](https://github.com/vechain/thor-sync.electron)

<p align="center">
<img src="~@public/images/connex/architecture.png" alt="implementation architecture" width=400>
</p>

## Implementation Test
Implementation test is a `BDD` test for connex client implementation. you can test for @vechain/connex in [here](https://connex-impl-test.vecha.in/)


### Requirements

+ [Running thor](../thor/get-started/installation.md#running-thor) under `TestNet`
+ `Connex.Vendor` needs user to interact (Signing should be complected in 40 seconds or it will fail)
+ `0x7567d83b7b8d80addcb281a71d54fc7b3364ffed` need to be added to wallet

:::tip note
You can find `0x7567d83b7b8d80addcb281a71d54fc7b3364ffed` private key under [solo mode](../thor/get-started/installation.md#sub-commands)
:::

