---
sidebar: auto
collapsable: true
sidebarDepth: 1
---
# Miscellaneous

## authority.sol
**Address** :0x0000000000000000000000417574686f72697479

[Code](https://github.com/vechain/thor/blob/master/builtin/gen/authority.sol) / [ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/authority.json)

<details>
<summary>Show ABI</summary>

```json
[
    {
        "constant": true,
        "inputs": [],
        "name": "first",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_nodeMaster",
                "type": "address"
            }
        ],
        "name": "revoke",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_nodeMaster",
                "type": "address"
            }
        ],
        "name": "next",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_nodeMaster",
                "type": "address"
            }
        ],
        "name": "get",
        "outputs": [
            {
                "name": "listed",
                "type": "bool"
            },
            {
                "name": "endorsor",
                "type": "address"
            },
            {
                "name": "identity",
                "type": "bytes32"
            },
            {
                "name": "active",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "executor",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_nodeMaster",
                "type": "address"
            },
            {
                "name": "_endorsor",
                "type": "address"
            },
            {
                "name": "_identity",
                "type": "bytes32"
            }
        ],
        "name": "add",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "nodeMaster",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "action",
                "type": "bytes32"
            }
        ],
        "name": "Candidate",
        "type": "event"
    }
]
```

</details>


## energy.sol
**Address** :0x0000000000000000000000000000456e65726779

[Code](https://github.com/vechain/thor/blob/master/builtin/gen/energy.sol) / [ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/energy.json)

<details>
<summary>Show ABI</summary>

```json
[
    {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_spender",
                "type": "address"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "approve",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transferFrom",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "decimals",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            }
        ],
        "name": "balanceOf",
        "outputs": [
            {
                "name": "balance",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
            {
                "name": "",
                "type": "string"
            }
        ],
        "payable": false,
        "stateMutability": "pure",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "transfer",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_from",
                "type": "address"
            },
            {
                "name": "_to",
                "type": "address"
            },
            {
                "name": "_amount",
                "type": "uint256"
            }
        ],
        "name": "move",
        "outputs": [
            {
                "name": "success",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "totalBurned",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_owner",
                "type": "address"
            },
            {
                "name": "_spender",
                "type": "address"
            }
        ],
        "name": "allowance",
        "outputs": [
            {
                "name": "remaining",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_from",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_to",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Transfer",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "_owner",
                "type": "address"
            },
            {
                "indexed": true,
                "name": "_spender",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "Approval",
        "type": "event"
    }
]
```
</details>

## executor.sol
**Address** : 0x0000000000000000000000004578656375746f72

[Code](https://github.com/vechain/thor/blob/master/builtin/gen/executor.sol) / [ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/executor.json)

<details>
<summary>Show ABI</summary>

```json
[
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "approvers",
        "outputs": [
            {
                "name": "identity",
                "type": "bytes32"
            },
            {
                "name": "inPower",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "approverCount",
        "outputs": [
            {
                "name": "",
                "type": "uint8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_approver",
                "type": "address"
            }
        ],
        "name": "revokeApprover",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "name": "proposals",
        "outputs": [
            {
                "name": "timeProposed",
                "type": "uint64"
            },
            {
                "name": "proposer",
                "type": "address"
            },
            {
                "name": "quorum",
                "type": "uint8"
            },
            {
                "name": "approvalCount",
                "type": "uint8"
            },
            {
                "name": "executed",
                "type": "bool"
            },
            {
                "name": "target",
                "type": "address"
            },
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_approver",
                "type": "address"
            },
            {
                "name": "_identity",
                "type": "bytes32"
            }
        ],
        "name": "addApprover",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_target",
                "type": "address"
            },
            {
                "name": "_data",
                "type": "bytes"
            }
        ],
        "name": "propose",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_contract",
                "type": "address"
            }
        ],
        "name": "attachVotingContract",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_proposalID",
                "type": "bytes32"
            }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_contract",
                "type": "address"
            }
        ],
        "name": "detachVotingContract",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_proposalID",
                "type": "bytes32"
            }
        ],
        "name": "execute",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "votingContracts",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "proposalID",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "action",
                "type": "bytes32"
            }
        ],
        "name": "Proposal",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "approver",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "action",
                "type": "bytes32"
            }
        ],
        "name": "Approver",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "contractAddr",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "action",
                "type": "bytes32"
            }
        ],
        "name": "VotingContract",
        "type": "event"
    }
]
```
</details>


## extension.sol
**Address** : 0x0000000000000000000000457874656e73696f6e

[V1 Code](https://github.com/vechain/thor/blob/master/builtin/gen/extension.sol) / [V2 code](https://github.com/vechain/thor/blob/master/builtin/gen/extension-v2.sol) / [ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/extension.json)

<details>
<summary>Show ABI</summary>

```json
[
    {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "data",
                "type": "bytes"
            }
        ],
        "name": "blake2b256",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "blockTime",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "blockSigner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "blockTotalScore",
        "outputs": [
            {
                "name": "",
                "type": "uint64"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "txExpiration",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "txID",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "txProvedWork",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "num",
                "type": "uint256"
            }
        ],
        "name": "blockID",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "txBlockRef",
        "outputs": [
            {
                "name": "",
                "type": "bytes8"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
```
</details>


## params.sol
**Address** : 0x0000000000000000000000000000506172616d73

[Code](https://github.com/vechain/thor/blob/master/builtin/gen/params.sol) / [ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/params.json)

<details>
<summary>Show ABI</summary>

```json
[
    {
        "constant": false,
        "inputs": [
            {
                "name": "_key",
                "type": "bytes32"
            },
            {
                "name": "_value",
                "type": "uint256"
            }
        ],
        "name": "set",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_key",
                "type": "bytes32"
            }
        ],
        "name": "get",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "executor",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "key",
                "type": "bytes32"
            },
            {
                "indexed": false,
                "name": "value",
                "type": "uint256"
            }
        ],
        "name": "Set",
        "type": "event"
    }
]
```
</details>

## Key of Governance Params
```
{
  executor: '0x0000000000000000000000000000000000000000000000006578656375746f72',
  rewardRatio: '0x00000000000000000000000000000000000000007265776172642d726174696f',
  baseGasPrice: '0x000000000000000000000000000000000000626173652d6761732d7072696365',
  proposerEndorsement: '0x00000000000000000000000070726f706f7365722d656e646f7273656d656e74'
}
```

## prototype.sol
**Address** : 0x000000000000000000000050726f746f74797065

[Code](https://github.com/vechain/thor/blob/master/builtin/gen/prototype.sol) / [ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/prototype.json) / [Event ABI](https://raw.githubusercontent.com/vechain/b32/master/ABIs/prototype-event.json) 

<details>
<summary>Show ABI</summary>

```json
[
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_newMaster",
                "type": "address"
            }
        ],
        "name": "setMaster",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "isUser",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_key",
                "type": "bytes32"
            }
        ],
        "name": "storageFor",
        "outputs": [
            {
                "name": "",
                "type": "bytes32"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_blockNumber",
                "type": "uint256"
            }
        ],
        "name": "energy",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "removeUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            }
        ],
        "name": "currentSponsor",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_credit",
                "type": "uint256"
            },
            {
                "name": "_recoveryRate",
                "type": "uint256"
            }
        ],
        "name": "setCreditPlan",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_sponsor",
                "type": "address"
            }
        ],
        "name": "selectSponsor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_blockNumber",
                "type": "uint256"
            }
        ],
        "name": "balance",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            }
        ],
        "name": "sponsor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            }
        ],
        "name": "creditPlan",
        "outputs": [
            {
                "name": "credit",
                "type": "uint256"
            },
            {
                "name": "recoveryRate",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "addUser",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            }
        ],
        "name": "hasCode",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            }
        ],
        "name": "master",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_user",
                "type": "address"
            }
        ],
        "name": "userCredit",
        "outputs": [
            {
                "name": "",
                "type": "uint256"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": false,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            }
        ],
        "name": "unsponsor",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_self",
                "type": "address"
            },
            {
                "name": "_sponsor",
                "type": "address"
            }
        ],
        "name": "isSponsor",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    }
]
```
</details>

---

<details>
<summary>Show event ABI</summary>

```json
[
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "newMaster",
                "type": "address"
            }
        ],
        "name": "$Master",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "credit",
                "type": "uint256"
            },
            {
                "indexed": false,
                "name": "recoveryRate",
                "type": "uint256"
            }
        ],
        "name": "$CreditPlan",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "user",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "action",
                "type": "bytes32"
            }
        ],
        "name": "$User",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "name": "sponsor",
                "type": "address"
            },
            {
                "indexed": false,
                "name": "action",
                "type": "bytes32"
            }
        ],
        "name": "$Sponsor",
        "type": "event"
    }
]
```

</details>

## VeThor Token
- **Address**: 0x0000000000000000000000000000456e65726779
- **Precision** : 18 decimal places
- **Generation** : 0.00000005 VTHO is generated per VET per block
- **Consumption** : 70% of the transaction fee paid in VTHO in each block is burned and the remaining 30% is rewarded to the Authority Masternode which produces the block

## ChainTag
Last byte of the genesis block ID 
- **Mainnet** : **0x4a**
- **Testnet** : **0x27**

## Token list
- Mainnet : 
  - Info:  [https://vechain.github.io/token-registry/main.json](https://vechain.github.io/token-registry/main.json)
  - Icon: https://vechain.github.io/token-registry/assets/{item.icon}.png
  
- Testnet : 
  - Info:  [https://vechain.github.io/token-registry/test.json](https://vechain.github.io/token-registry/test.json)
  - Icon: https://vechain.github.io/token-registry/assets/{item.icon}.png

## Address Identity Icon
[Picasso](https://github.com/vechain/picasso#vanilla-js) - General purpose deterministic identity icon library in svg format, mostly for vechain thor addresses.

## Testnet Faucet
[Testnet faucet](https://faucet.vecha.in/)

## Signature Collection of Contract Method & Event
[b32](https://b32.vecha.in)

