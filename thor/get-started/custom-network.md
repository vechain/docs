# Custom Network

To start your own custom network, you need to manually configure the genesis file. Once you finished the setup, it allows you to connect to your own network rather than connect to official network(mainnet/testnet)

## Requirement

1. Make sure the network has at least **two** nodes running as a authority master node
2. Thor version ≥ [v1.0.7](https://github.com/vechain/thor/releases/tag/v1.0.7)

::: tip Note
Build your custom network requires understanding the mechanism of blockchain. Make sure you go through [Builtin Contract](/thor/learn/builtin-contracts) and [Proof of Authority](/thor/learn/proof-of-authority). This will help you understanding the next steps.
:::

## Configure Your Genesis File

You can find an example genesis file [by this link](https://github.com/vechain/thor/blob/master/genesis/example.json)

### Genesis Description Object

+ `launchTime`: Launch time(unix timestamp) of your network(I.e. the time of genesis block). If you set the time in the future, master node would not propose block before that.
+ `gasLimit`: Initial block gas limit
+ `extraData`: Additional data set to genesis block, limited to 28 characters.
+ `accounts`: Preallocated accounts in genesis block, including `balance`, `energy`, `storage` and `code`.
+ `authority`: Authority master nodes.
+ `params`: Governance parameters.
+ `executor`: Executor params for on-chain governance, setting approvers means using vechain builtin executor, omit means an external address.

### Authority

For setting the authority node, you need to get your authority node's master address first, simply running the following command

``` bash
thor master-key
``` 

The master address will be shown. `Endorsor Address` is the endorser's address for authority node, you need to ensure the `Endorsor Address`  reach the minimum amount of `proposerEndorsement`. You can adjust the minimum endorsement amount of VET by changing `proposerEndorsement”`. `Identity` is an identifier of the authority node.

### Params

- `rewardRatio`: Reward ratio for block proposer.
- `baseGasPrice`: Base gas price in `wei`.
- `proposerEndorsement`: Authority node endorsement in `wei`.
- `executorAddress`: Executor address, if there is approver in `executor`, the address will be set code of `Builtin Executor Contract` and set up the approves, otherwise the executor will be an external address.

## Launch Custom Network 

Start all your nodes by running `thor --network genesis.json`, waiting for the nodes connects to each other and the master nodes will start packing the blocks.

## Custom Bootnode

Start a custom network will use the foundation's bootnode to discover nodes by default. This means you need at least 1 node with public IP attached. Thor provides the ability to specify bootnode.

1. Start thor by `thor --network genesis.json` then get `Node ID` in the startup info, it looks like `enode://0b9f...6932@[extip]:11235`.
2. Replace `[extip]` with the real ip address of your machine.
3. Launch nodes by running `thor --network genesis.json --bootnode "NodeID-1,NodeID-2..."`.
