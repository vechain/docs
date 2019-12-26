---
sidebarDepth: 3
---
# Thorest API <Badge text="1.2.0" type="tip"/>
RESTful API to access VeChain Thor Network


**License:** [LGPL 3.0](https://www.gnu.org/licenses/lgpl-3.0.en.html)

---

## Accounts
Access to account objects

### **GET** /accounts/{address}

#### Summary:

Retrieve account detail includes `balance`, `energy` and `hasCode`. If the account with `hasCode` is *true* then ,it is a contract.

Historical account detail can be queried by specifying `revision` query string.

 
#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|address|string|Yes|address of account|0x5034aa590125b64023a0262112b98d72e3c8e40e|
|revision|string|Optional|can be block number or id (best block is assumed if omitted).| `3877527` (block# 3877527) <br> `0x003dc697f70205861a70fd3e52a24a542613b564bf6d8b7b4149c6b3ee6e015d` (block#3877527 ID)|


#### Responses

- curl

```
curl -X GET "https://sync-testnet.vechain.org/accounts/0x5034aa590125b64023a0262112b98d72e3c8e40e?revision=0x003dc697f70205861a70fd3e52a24a542613b564bf6d8b7b4149c6b3ee6e015d" -H "accept: application/json"
```

- Request url

```
https://sync-testnet.vechain.org/accounts/0x5034aa590125b64023a0262112b98d72e3c8e40e?revision=0x003dc697f70205861a70fd3e52a24a542613b564bf6d8b7b4149c6b3ee6e015d
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body

``` json
{
  "balance": "0x1e1fb2aca578373db2",
  "energy": "0x45dc094003ac610617eb81",
  "hasCode": false
}
```
Relate Model : [Account](#account)

---

### **POST** /accounts/*

#### Summary:

Execute a batch of codes to simulate execution of a transaction.


#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|revision|string|Optional|can be block number or id (best block is assumed if omitted).| `3877527` (block# 3877527) <br> `0x003b2a97095a93d92b8dd45db88f0f90beaec398717ffd1d356b519c35ead4d0` (block#3877527 ID)|

#### Request body
> all fields are required 

| Name | Type  | Description |
| ---- | ----------- | -------- |  
| clauses | [ [Clause](#clause) ] | an array of *Clause* objects each of which contains fields `To`, `Value` and `Data` to enable a single transaction to carry multiple tasks issued by the transaction sender | 
| gas | integer (uint64) | max allowed gas for execution | 
| gasPrice | string | absolute gas price | 
| caller | string | caller address (msg.sender) | 
| provedWork | string | tx proved work(for extension contract) | 
| gasPayer | string | gas payer(for extension contract) | 
| expiration | integer (uint32) | tx expiration(for extension contract) | 
| blockRef | string | block reference(for extension contract) | 
#### Responses
- Curl

```
curl -X POST "https://sync-testnet.vechain.org/accounts/*?revision=100" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"clauses\":[{\"to\":\"0x5034aa590125b64023a0262112b98d72e3c8e40e\",\"value\":\"0xde0b6b3a7640000\",\"data\":\"0x5665436861696e2054686f72\"}],\"gas\":50000,\"gasPrice\":\"1000000000000000\",\"caller\":\"0x7567d83b7b8d80addcb281a71d54fc7b3364ffed\",\"provedWork\":\"1000\",\"gasPayer\":\"0xd3ae78222beadb038203be21ed5ce7c9b1bff602\",\"expiration\":1000,\"blockRef\":\"0x00000000851caf3c\"}"
```

- Request URL

```
https://sync-testnet.vechain.org/accounts/*?revision=100
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
[
  {
    "data": "0x103556a73c10e38ffe2fc4aa50fc9d46ad0148f07e26417e117bd1ece9d948b5",
    "events": [
      {
        "address": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
        "topics": [
          "0x4de71f2d588aa8a1ea00fe8312d92966da424d9939a511fc0be81e65fad52af8"
        ],
        "data": "0x4de71f2d588aa8a1ea00fe8312d92966da424d9939a511fc0be81e65fad52af8"
      }
    ],
    "transfers": [
      {
        "sender": "0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d",
        "recipient": "0x5034aa590125b64023a0262112b98d72e3c8e40e",
        "amount": "0x47fdb3c3f456c0000"
      }
    ],
    "gasUsed": 21000,
    "reverted": false,
    "vmError": ""
  }
]
```
Relate Model : [batchCallData](#batchcalldata)

---

### **GET** /accounts/{address}/code

#### Summary:

Retrieve account code if any. Here the code is runtime bytecodes.


#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|address|string|Yes|address of account|0x5034aa590125b64023a0262112b98d72e3c8e40e|
|revision|string|Optional|can be block number or id (best block is assumed if omitted).| `3877527` (block# 3877527) <br> `0x003b2a97095a93d92b8dd45db88f0f90beaec398717ffd1d356b519c35ead4d0` (block#3877527 ID)|

#### Responses
- Curl

```
curl -X GET "https://sync-testnet.vechain.org/accounts/0x5034aa590125b64023a0262112b98d72e3c8e40e/code" -H "accept: application/json"
```


- Request URL

```
https://sync-testnet.vechain.org/accounts/0x5034aa590125b64023a0262112b98d72e3c8e40e/code
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "code": "0x"
}
```
Relate Model : [Code](#code)

---

### **GET** /accounts/{address}/storage/{key}

#### Summary:

Retrieve account storage value for given key.

#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|address|string|Yes|address of account|0x5034aa590125b64023a0262112b98d72e3c8e40e|
|key|string|Yes|the key(position) to access account storage|0x0000000000000000000000000000000000000000000000000000000000000001|
|revision|string|Optional|can be block number or id (best block is assumed if omitted).| `3877527` (block# 3877527) <br> `0x003b2a97095a93d92b8dd45db88f0f90beaec398717ffd1d356b519c35ead4d0` (block#3877527 ID)|

#### Responses
- Curl

```
curl -X GET "https://sync-testnet.vechain.org/accounts/0x5034aa590125b64023a0262112b98d72e3c8e40e/storage/0x0000000000000000000000000000000000000000000000000000000000000001" -H "accept: application/json"
```


- Request URL

```
https://sync-testnet.vechain.org/accounts/0x5034aa590125b64023a0262112b98d72e3c8e40e/storage/0x0000000000000000000000000000000000000000000000000000000000000001
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "value": "0x0000000000000000000000000000000000000000000000000000000000000000"
}
```
Relate Model : [Storage](#storage)

---

## Transaction
Access to transactions

### **GET** /transactions/{id}

#### Summary:

Retrieve transaction by ID.


#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|id|string|Yes|ID of transaction | 0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a|
|raw|boolean|Optional|whether retrieve a raw transaction| `ture` or `false`. false is assumed if omitted|
|id|string|Yes|ID of transaction | 0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477|
|head|string|Optional|ID of head block. best block is assumed if omitted|0x003dc697f70205861a70fd3e52a24a542613b564bf6d8b7b4149c6b3ee6e015d|

#### Responses

- Curl

```
curl -X GET "https://sync-testnet.vechain.org/transactions/0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a" -H "accept: application/json"
```

- Request URL

```
https://sync-testnet.vechain.org/transactions/0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "id": "0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a",
  "chainTag": 39,
  "blockRef": "0x003dc6957dcea347",
  "expiration": 32,
  "clauses": [
    {
      "to": "0xf2e7617c45c42967fde0514b5aa6bba56e3e11dd",
      "value": "0x1b1ae4d6e2ef500000",
      "data": "0x"
    },
    {
      "to": "0x0000000000000000000000000000456e65726779",
      "value": "0x0",
      "data": "0xa9059cbb000000000000000000000000f2e7617c45c42967fde0514b5aa6bba56e3e11dd00000000000000000000000000000000000000000000010f0cf064dd59200000"
    }
  ],
  "gasPriceCoef": 255,
  "gas": 100000,
  "origin": "0x4f6fc409e152d33843cf4982d414c1dd0879277e",
  "delegator": null,
  "nonce": "0xf2ed7cd2567c6dd4",
  "dependsOn": null,
  "size": 225,
  "meta": {
    "blockID": "0x003dc696cfdf49b068b8e5c0b31f0c8a1d604ca1def69f5505f6e05db882f9d0",
    "blockNumber": 4048534,
    "blockTimestamp": 1570514180
  }
}
```
Relate Models : [TxOrRawTxWithMEta](#txorrawtxwithmeta) / [TxWithMeta](#txwithmeta) / [RawTxWithMeta](#rawtxwithmeta)

---

### **GET** /transactions/{id}/receipt

#### Summary:

Retrieve transaction receipt by ID.

#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|id|string|Yes|ID of transaction | 0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477|
|head|string|Optional|ID of head block. best block is assumed if omitted|0x003dc697f70205861a70fd3e52a24a542613b564bf6d8b7b4149c6b3ee6e015d|

#### Responses

- Curl
```
curl -X GET "https://sync-testnet.vechain.org/transactions/0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a/receipt" -H "accept: application/json"
```

- Request URL
```
https://sync-testnet.vechain.org/transactions/0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a/receipt
```


| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "gasUsed": 52646,
  "gasPayer": "0x4f6fc409e152d33843cf4982d414c1dd0879277e",
  "paid": "0x5b53854239a6e0000",
  "reward": "0x1b65db2d77b210000",
  "reverted": false,
  "meta": {
    "blockID": "0x003dc696cfdf49b068b8e5c0b31f0c8a1d604ca1def69f5505f6e05db882f9d0",
    "blockNumber": 4048534,
    "blockTimestamp": 1570514180,
    "txID": "0xc61b01eae38e5511e5104656f553e1cc350847716cf090f70ff6a0410ac5d85a",
    "txOrigin": "0x4f6fc409e152d33843cf4982d414c1dd0879277e"
  },
  "outputs": [
    {
      "contractAddress": null,
      "events": [],
      "transfers": [
        {
          "sender": "0x4f6fc409e152d33843cf4982d414c1dd0879277e",
          "recipient": "0xf2e7617c45c42967fde0514b5aa6bba56e3e11dd",
          "amount": "0x1b1ae4d6e2ef500000"
        }
      ]
    },
    {
      "contractAddress": null,
      "events": [
        {
          "address": "0x0000000000000000000000000000456e65726779",
          "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000004f6fc409e152d33843cf4982d414c1dd0879277e",
            "0x000000000000000000000000f2e7617c45c42967fde0514b5aa6bba56e3e11dd"
          ],
          "data": "0x00000000000000000000000000000000000000000000010f0cf064dd59200000"
        }
      ],
      "transfers": []
    }
  ]
}
```
Relate Models : [Receipt](#receipt) / [ReceiptMeta](#receiptmeta)

---

### **POST** /transactions

#### Summary:

Use this method to commit transaction in raw.


#### Request body
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| raw | string | hex form of encoded transaction |0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400|

Relate Model : [RawTX](#rawtx)

#### Responses
- Curl

```
curl -X POST "https://sync-testnet.vechain.org/transactions" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"raw\":\"0xf87c278743b11e180ba16912dfde94f2e7617c45c42967fde0514b5aa6bba56e3e11dd872386f26fc1000080808252088088dd0e2a8c3986a7c5c0b841b610b19940246633b63b4f8cb8abdf10ea4086e5649cbf3554829ad4458f12a717b0840bcab1d30f83148a001d8cffab11fea7ac4a21b02ee00e6a0479d03f0401\"}"
```

- Request URL

```
https://sync-testnet.vechain.org/transactions
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "id": "0x605f10b7fea015db47c21bcc4d85578a621e88b1e8442644c8765b93439a6069"
}
```
Relate Model : [TxID](#txid)

---

## Blocks
Access to blocks

### **GET** /blocks/{revision}

#### Summary:

Retrieve block by ID or number, or 'best' for latest block.


#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|revision|string|Optional|block ID or number, or 'best' stands for latest block|`best` (latest block )<br> `3877527` (block# 3877527) <br> `0x003b2a97095a93d92b8dd45db88f0f90beaec398717ffd1d356b519c35ead4d0` (block#3877527 ID)|

#### Responses
- Curl

```
curl -X GET "https://sync-testnet.vechain.org/blocks/best" -H "accept: application/json"
```

- Request URL

```
https://sync-testnet.vechain.org/blocks/best
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body

``` json
{
  "number": 3878004,
  "id": "0x003b2c74a253110c393313d692164b7a4e098bf0e3afdb0654a3146a219016c9",
  "size": 242,
  "parentID": "0x003b2c73847312a523f954a28bf04af755a55f2ffde521e72ddacca8132c6802",
  "timestamp": 1569210360,
  "gasLimit": 16000000,
  "beneficiary": "0xf17e6c22f9eedfc8fd2f731da9b9154b87354764",
  "gasUsed": 0,
  "totalScore": 375344301,
  "txsRoot": "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
  "txsFeatures": 1,
  "stateRoot": "0x3ac02993f18b722716b35f66b7de69be619018c5f092c3aae99789ac9761bb07",
  "receiptsRoot": "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
  "signer": "0xbbf0e627b9bd36a956127ea0b74e39dc8b8e96b8",
  "isTrunk": true,
  "transactions": []
}
```

Relate Model : [Block](#block)

---

## Logs
Access to event & transfer logs

### **POST** /logs/event

#### Summary:

Filter event logs Event logs are produced by `OP_LOG` in EVM.


#### Request body
``` json
{
  "range": {
    "unit": "block",
    "from": 0,
    "to": 100000
  },
  "options": {
    "offset": 0,
    "limit": 10
  },
  "criteriaSet": [
    {
      "address": "0x0000000000000000000000000000456E65726779",
      "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
      "topic1": "0x0000000000000000000000005034aa590125b64023a0262112b98d72e3c8e40e"
    }
  ],
  "order": "asc"
}
```
Relate Models : [EventFilter](#eventfilter) / [FilterRange](#filterrange) / [FilterOptions](#filteroptions) / [EventCriteria](#eventcriteria)

#### Responses
- Curl

```
curl -X POST "https://sync-testnet.vechain.org/logs/event" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"range\":{\"unit\":\"block\",\"from\":0,\"to\":100000},\"options\":{\"offset\":0,\"limit\":10},\"criteriaSet\":[{\"address\":\"0x0000000000000000000000000000456E65726779\",\"topic0\":\"0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef\",\"topic1\":\"0x0000000000000000000000005034aa590125b64023a0262112b98d72e3c8e40e\"}],\"order\":\"asc\"}"
```

- Request URL

```
https://sync-testnet.vechain.org/logs/event
```


| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
[ 
   { 
      "address":"0x0000000000000000000000000000456e65726779",
      "topics":[ 
         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
         "0x0000000000000000000000005034aa590125b64023a0262112b98d72e3c8e40e",
         "0x0000000000000000000000005034aa590125b64023a0262112b98d72e3c8e40e"
      ],
      "data":"0x00000000000000000000000000000000000000000000124bc0ddd92e55fff280",
      "meta":{ 
         "blockID":"0x000060716a6decc7127d221e8a53cd7b33992db6236490f79d47585f9ae7ca14",
         "blockNumber":24689,
         "blockTimestamp":1530261290,
         "txID":"0x0ee8df3a9de6787ec0848ea8951ed8899bb053b6b4af167228dd7c0c012f5346",
         "txOrigin":"0x5034aa590125b64023a0262112b98d72e3c8e40e",
         "clauseIndex":0
      }
   },
   { 
      ........
   },   
   { 
      "address":"0x0000000000000000000000000000456e65726779",
      "topics":[ 
         "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
         "0x0000000000000000000000005034aa590125b64023a0262112b98d72e3c8e40e",
         "0x000000000000000000000000ebdb7c7bd6b46e9611101057e5b98a89697d38a7"
      ],
      "data":"0x00000000000000000000000000000000000000000000180863c9a3f1c3a40000",
      "meta":{ 
         "blockID":"0x000089c7b155093311a0ab543f46f2f52f83ca87cbfb04c26507ad134f25f6d2",
         "blockNumber":35271,
         "blockTimestamp":1530367110,
         "txID":"0x7234d0e34abe1e7e612fcd3aae108087ef5d85707333afecfa24b5ad31a7a4aa",
         "txOrigin":"0x5034aa590125b64023a0262112b98d72e3c8e40e",
         "clauseIndex":1
      }
   }
]
```

---

### **POST** /logs/transfer


#### Summary:

Filter transfer logs which  are recorded on VET transferring.

#### Request body

``` json
{
  "range": {
    "unit": "block",
    "from": 0,
    "to": 100000
  },
  "options": {
    "offset": 0,
    "limit": 10
  },
  "criteriaSet": [
    {
      "txOrigin": "0xe59d475abe695c7f67a8a2321f33a856b0b4c71d",
      "sender": "0xe59d475abe695c7f67a8a2321f33a856b0b4c71d",
      "recipient": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed"
    }
  ],
  "order": "asc"
}
```
#### Responses
- Curl

```
curl -X POST "https://sync-testnet.vechain.org/logs/transfer" -H "accept: application/json" -H "Content-Type: application/json" -d "{\"range\":{\"unit\":\"block\",\"from\":0,\"to\":100000},\"options\":{\"offset\":0,\"limit\":10},\"criteriaSet\":[{\"txOrigin\":\"0xe59d475abe695c7f67a8a2321f33a856b0b4c71d\",\"sender\":\"0xe59d475abe695c7f67a8a2321f33a856b0b4c71d\",\"recipient\":\"0x7567d83b7b8d80addcb281a71d54fc7b3364ffed\"}],\"order\":\"asc\"}"
```

- Request URL

```
https://sync-testnet.vechain.org/logs/transfer
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body

``` json
[
  {
    "sender": "0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d",
    "recipient": "0x5034aa590125b64023a0262112b98d72e3c8e40e",
    "amount": "0x47fdb3c3f456c0000",
    "meta": {
      "blockID": "0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215",
      "blockNumber": 325324,
      "blockTimestamp": 1533267900,
      "txID": "0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477",
      "txOrigin": "0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d",
      "clauseIndex": 0
    }
  }
]
```

---

## Node
Access to node status info


### **GET** /node/network/peers

#### Summary:

Retrieve connected peers

#### Responses

- Curl

```
curl -X GET "https://sync-testnet.vechain.org/node/network/peers" -H "accept: application/json"
```

- Request URL

```
https://sync-testnet.vechain.org/node/network/peers
```

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
[
  {
    "name": "thor/v1.1.3-48c1764-dev/linux/go1.11.5",
    "bestBlockID": "0x003b2e48a9973803462b9e1f90bb7dd03c01f4c7c99f75374c95a23826312a53",
    "totalScore": 375388137,
    "peerID": "a6607628a9ba139aaf5ccc4959c7faad52c6512da65276817eb6ee1f8387a2176f75f02eb9dc11e71168edc0e15a9e2050576b5f30fc18ad13c8dda4d94b62ec",
    "netAddr": "117.50.5.155:42896",
    "inbound": true,
    "duration": 413
  },
  {
    "name": "thor/v1.1.3-48c1764-dev/linux/go1.11.5",
    "bestBlockID": "0x003b2e63b4031966a4364d96d9ca8d1b89e7b6ededd5082778bac43cae4d4f3e",
    "totalScore": 375390675,
    "peerID": "ee6c337416d080aed6aa78380d6f5da4ac9e90df3c1f1c7188aed9f9ef64d18d82c558ac50d0c53220db682874d010fe42dfaca5ad2ff7d876f25f76a8ab702b",
    "netAddr": "128.1.35.68:11235",
    "inbound": false,
    "duration": 53232
  },
  {
   ........
   }
]
```

---

## Subscriptions
subscribe interested subject
### **GET** /subscriptions/block

#### Summary:

(Websocket) Subscribe new blocks

#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|pos|string|Optional|a saved block ID for resuming the subscription. best block ID is assumed if omitted.||

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body

``` json
{
  "number": 325324,
  "id": "0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215",
  "size": 373,
  "parentID": "0x0004f6cb730dbd90fed09d165bfdf33cc0eed47ec068938f6ee7b7c12a4ea98d",
  "timestamp": 1533267900,
  "gasLimit": 11253579,
  "beneficiary": "0xb4094c25f86d628fdd571afc4077f0d0196afb48",
  "gasUsed": 21000,
  "totalScore": 1029988,
  "txsRoot": "0x89dfd9fcd10c9e53d68592cf8b540b280b72d381b868523223992f3e09a806bb",
  "txsFeatures": 0,
  "stateRoot": "0x86bcc6d214bc9d8d0dedba1012a63c8317d19ce97f60c8a2ef5c59bbd40d4261",
  "receiptsRoot": "0x15787e2533c470e8a688e6cd17a1ee12d8457778d5f82d2c109e2d6226d8e54e",
  "signer": "0xab7b27fc9e7d29f9f2e5bd361747a5515d0cc2d1",
  "transactions": [
    "0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477"
  ],
  "obsolete": true
}
```

---

### **GET** /subscriptions/event

#### Summary:

(Websocket) Subscribe new events which satisfy criteria in query.

#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|pos|string|Optional|a saved block ID for resuming the subscription. best block ID is assumed if omitted.||
|addr|string|Optional|address of event emitter||
|t0|string|Optinal|topic0 of event||
|t1|string|Optinal|topic1 of event||
|t2|string|Optinal|topic2 of event||
|t3|string|Optinal|topic3 of event||
|t4|string|Optinal|topic4 of event||


#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body

``` json
{
  "address": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
  "topics": [
    "0x4de71f2d588aa8a1ea00fe8312d92966da424d9939a511fc0be81e65fad52af8"
  ],
  "data": "0x4de71f2d588aa8a1ea00fe8312d92966da424d9939a511fc0be81e65fad52af8",
  "obsolete": true,
  "meta": {
    "blockID": "0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215",
    "blockNumber": 325324,
    "blockTimestamp": 1533267900,
    "txID": "0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477",
    "txOrigin": "0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d",
    "clauseIndex": 0
  }
}
```

---

### **GET** /subscriptions/transfer

#### Summary:

(Websocket) Subscribe new transfers which satisfy criteria in query.


#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|pos|string|Optional|a saved block ID for resuming the subscription. best block ID is assumed if omitted.||
|txOrigin|string|Optional|signer address of tx which contains the transfer||
|sender|string|Optional|address of token sender|
|recipient|string| Optional | address of token recipient|


#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body 

``` json
{
  "sender": "0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d",
  "recipient": "0x5034aa590125b64023a0262112b98d72e3c8e40e",
  "amount": "0x47fdb3c3f456c0000",
  "obsolete": true,
  "meta": {
    "blockID": "0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215",
    "blockNumber": 325324,
    "blockTimestamp": 1533267900,
    "txID": "0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477",
    "txOrigin": "0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d",
    "clauseIndex": 0
  }
}
```

---


### **GET** /subscriptions/beat

#### Summary:

(Websocket) Subscribe block chain's beats which contain summary of new blocks, and bloom filters that composited with affected addresses.


#### Parameters

| Parameter | Type  |Required| Description |  Example |
| ---- | ---------- | ----------- | -------- | ---- |
|pos|string|Optional|a saved block ID for resuming the subscription. best block ID is assumed if omitted.||

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "number": 325324,
  "id": "0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215",
  "parentID": "0x0004f6cb730dbd90fed09d165bfdf33cc0eed47ec068938f6ee7b7c12a4ea98d",
  "timestamp": 1533267900,
  "txsFeatures": 0,
  "bloom": "0x000208001010800200c011000000020002040040008000100........02044020000000008000021000000000",
  "k": 3,
  "obsolete": true
}
```

---

## Debug
Debug utilities 

### **POST** /debug/tracers

#### Summary:

Create a tracer for a clause

#### Request body
``` json
{
  "name": "",
  "target": "0x000dabb4d6f0a80ad7ad7cd0e07a1f20b546db0730d869d5ccb0dd2a16e7595b/0/0"
}
```
Relate Model : [TracerOption](#traceroption)

#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

### **POST** /debug/storage-range

#### Summary:

Retrieve storage range of the account with given address


#### Request body 
``` json
{
  "address": "0xa4627036e2095eb71c2341054daa63577c062498",
  "keyStart": "0x0000000000000000000000000000000000000000000000000000000000000000",
  "maxResult": 10,
  "target": "0x000edefb448685f9c72fc2b946980ef51d8d208bbaa4d3fdcf0c57d4847aca2e/0/0"
}
```
Relate Model : [StorageRangeOption](#storagerangeoption)
#### Responses

| Code | Description |
| ---- | ----------- |
| 200 | OK |

#### Response Body
``` json
{
  "nextKey": null,
  "storage": {
    "0x33e423980c9b37d048bd5fadbd4a2aeb95146922045405accc2f468d0ef96988": {
      "key": "0x0000000000000000000000000000000000000000000000000000000000000001",
      "value": "0x00000000000000000000000000000000000000000000000000000000000000c8"
    }
  }
}
```
Relate Model : [StorageRange](#storagerange)

---

## Models

### account

| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|balance|string|balance in unit WEI, presented with hex string|0x47ff1f90327aa0f8e|
|energy|string|energy in unit WEI, presented with hex string|0x47ff1f90327aa0f8e|
|hasCode|boolean|whether the account has code|false|

### code
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|code|string| Runtime bytecodes|0x6060604052600080fd00a165627a7a72305820c23d3ae2dc86ad130561a2829d87c7cb8435365492bd1548eb7e7fc0f3632be90029|

### storage
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|value|string|account storage value|0x0000000000000000000000000000000000000000000000000000000000000001|

### txMeta
transaction meta info

| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|blockID|string|block identifier (bytes32)|0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215|
|blockNumber|integer(uint32)|block number (height)|325324|
|blockTimestamp|integer(uint64)|block unix timestamp|1533267900|

### receiptMeta
tx receipt meta info

| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|blockID|string|block identifier (bytes32)|0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215|
|blockNumber|integer(uint32)|block number (height)|325324|
|blockTimestamp|integer(uint64)|block unix timestamp|1533267900|
|txID|string|transaction identifier|0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477|
|txOrigin|string|transaction origin(signer)|0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d|

### logMeta
event or transfer log meta info

| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|blockID|string|block identifier (bytes32)|0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215|
|blockNumber|integer(uint32)|block number (height)|325324|
|blockTimestamp|integer(uint64)|block unix timestamp|1533267900|
|txID|string|transaction identifier|0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477|
|txOrigin|string|transaction origin(signer)|0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d|
|clauseIndex|integer(uint32)|index of clause which generates this log|0

### block
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|number|integer(uint32)|block number (height)|325324|
|id|string(bytes32)|block identifier|0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215|
|size|integer(uint32)|RLP encoded block size in bytes|373|
|parentID|string(bytes32)|parent block ID|0x0004f6cb730dbd90fed09d165bfdf33cc0eed47ec068938f6ee7b7c12a4ea98d|
|timestamp|integer(uint64)|block unix timestamp|1533267900|
|gasLimit|integer(uint64)|block gas limit (max allowed accumulative gas usage of transactions)|11253579|
|beneficiary|	string(bytes32)|address of account to receive block reward|0xb4094c25f86d628fdd571afc4077f0d0196afb48|
|gasUsed|	integer(uint64)|accumulative gas usage of transactions|21000|
|totalScore|integer(uint64)|sum of all ancestral blocks' score|1029988|
|txsRoot|string(bytes32)|root hash of transactions in the block|0x89dfd9fcd10c9e53d68592cf8b540b280b72d381b868523223992f3e09a806bb|
|txsFeatures|integer(uint32)|supported txs features bitset|0|
|stateRoot|string(byte32)|root hash of accounts state|0x86bcc6d214bc9d8d0dedba1012a63c8317d19ce97f60c8a2ef5c59bbd40d4261|
|receiptsRoot|string(byte32)|root hash of transaction receipts|0x15787e2533c470e8a688e6cd17a1ee12d8457778d5f82d2c109e2d6226d8e54e|
|signer|string(byte20)|the one who signed this block|0xab7b27fc9e7d29f9f2e5bd361747a5515d0cc2d1|
|transactions|array|transaction IDs|[0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477]
|isTrunk|boolean|whether the block is on the trunk| `true` or `false`. if it is `false`, the block is uncle block |


### clause
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|to|string|recipient of clause, null for contract deployment (bytes32)|0x5034aa590125b64023a0262112b98d72e3c8e40e|
|value|string|hex form of token to be transferred|0x47fdb3c3f456c0000|
|data|string|input data(bytes)|0x|

### txBody
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|chainTag|	integer(uint8)| last byte of genesis block ID|39|
|blockRef|string|8 bytes prefix of some block ID|0x0004f6cb730dbd90|
|expiration|integer(uint32)|expiration relative to blockRef,in unit block|720|
|clauses|[ [Clause](#clause) ]|an array of *Clause* objects each of which contains fields `To`, `Value` and `Data` |see more in [Clause](#clause)|
|gasPriceCoef|integer(uint8)|coefficient used to calculate the final gas price|0|
|gas|integer(uint64)|max amount of gas can be consumed to execute this transaction|21000|
|DependsOn|string*byte32)|ID of the transaction on which the current transaction depends on. can be null.|null|
|nonce|string|random nonce|0x29c257e36ea6e72a|

### rawTX
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| raw | string | hex form of encoded transaction |0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400|

### rawTxWithMeta
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| raw | string | hex form of encoded transaction |0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400 |
| meta | { [TxMeta](#txmeta) } | transaction meta info | see more in [TxMeta](#txmeta) |

### event
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| address | string | the address of contract which produces the event (bytes20) | 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed|
| topics | [ string ] |  | [0x4de71f2d588aa8a1ea00fe8312d92966da424d9939a511fc0be81e65fad52af8]|
| data | string |  |0x4de71f2d588aa8a1ea00fe8312d92966da424d9939a511fc0be81e65fad52af8 |

### transfer
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| sender | string | address that sends tokens | 0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d |
| recipient | string | address that receives tokens | 0x5034aa590125b64023a0262112b98d72e3c8e40e |
| amount | string | amount of tokens | 0x47fdb3c3f456c0000 |

### receipt
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| gasUsed | integer (uint64) | gas used during execution  | 21000 |
| gasPayer | string | address of account who paid used gas | 0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d |
| paid | string | hex form of amount of paid energy | 0x1236efcbcbb340000 |
| reward | string | hex form of amount of reward | 0x576e189f04f60000 |
| reverted | boolean | true means the transaction was reverted | false |
|ouput | array | include event output data and transfer ouput data |see more in [outputs](#output) |
| meta | [receiptMeta](#receiptmeta) | includes `blockID`,`blockNumber`,`blockTimestamp`,`txID` and `txOrigin` | |

### output
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
|contractAddress|string|deployed contract address, if the corresponding clause is a contract deployment clause|null|
|events|[event](#event)|event output|see more in [event](#event) |
|transfers|[transfer](#transfer)|transfer output|see more in [transfer](#transfer)|

### callData
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| value | string | amount of token to be transferred | |
| data | string | input data for contract call | |
| gas | integer (uint64) | max allowed gas for execution | |
| gasPrice | string | absolute gas price | |
| caller | string | caller address (msg.sender) | |

### callResult
| Name | Type  | Description |  Example |
| ---- | ----------- | -------- | -------- | 
| data | string | the output data | 0x103556a73c10e38ffe2fc4aa50fc9d46ad0148f07e26417e117bd1ece9d948b5 |
| events | [ [Event](#event) ] | event output |see more in [Event](#event) |
| transfers | [ [Transfer](#transfer) ] | transfer output | see more in [Transfer](#transfer)|
| gasUsed | integer (uint64) | gas used during execution | 21000 |
| reverted | boolean | whether the execution is reverted or not| false |
| vmError | string | error message will return when the execution is true  | insufficient balance for transfer |

### batchCallData
| Name | Type  | Description |
| ---- | ----------- | -------- |  
| clauses | [ [Clause](#clause) ] | an array of *Clause* objects each of which contains fields `To`, `Value` and `Data` to enable a single transaction to carry multiple tasks issued by the transaction sender | 
| gas | integer (uint64) | max allowed gas for execution | 
| gasPrice | string | absolute gas price | 
| caller | string | caller address (msg.sender) | 
| provedWork | string | tx proved work(for extension contract) | 
| gasPayer | string | gas payer(for extension contract) | 
| expiration | integer (uint32) | tx expiration(for extension contract) | 
| blockRef | string | block reference(for extension contract) | 

### batchCallResult

| Name | Type  | Description | 
| ---- | ----------- | -------- |
|batchCallResult|[callResult](#callresult)|return batch call result 

### filterOptions
pass these parameters if you need filtered results paged. e.g. 

``` json
{
  "options": {
    "offset": 0,
    "limit": 10   
  }
}
```
the above refers that page offset is 0, and the page size is 10.
pass options `null` if you don't need to demand paging.

| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| offset | integer | offset in matched record set  | 0 |
| limit | integer | limit of records to output  | 10 |

### filterRange
defines the range to filter in. e.g.

``` json
{
  "range": {
    "unit": "block",
    "from": 10,
    "to": 1000
  }
}
```

refers to the range from block 10 to block 1000.
`null` stands for the full range.

| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| unit | string | defines the unit of `from` and `to`. `block` means block number, `time` means block timestamp, default to `block` . | block |
| from | integer (uint64) | indicating the start point | 0 |
| to | integer (uint64) | indicating the end point  | 1000 |

### topicSetLegacy
a set of topics joined with `and` operator. `null` topics are ignored. e.g. 

``` json
{
  "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
  "topic1": null
}
```
matches events whose `topic0` equals `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`.

| Name | Type  | 
| ---- | ----------- | 
| topic0 | string |  
| topic1 | string |  
| topic2 | string |  
| topic3 | string |  
| topic4 | string |  

### eventFilterLegacy
| Name | Type  | 
| ---- | ----------- | 
| range | [FilterRange](#filterrange) |
| options | [FilterOptions](#filteroptions) | 
| topicSets | [ [TopicSetLegacy](#topicsetlegacy) ] | 

### addressSetLegacy
| Name | Type  | Example|
| ---- | ----------- |  ----------- | 
| txOrigin | string | 0xe59d475abe695c7f67a8a2321f33a856b0b4c71d| 
| sender | string | 0xe59d475abe695c7f67a8a2321f33a856b0b4c71d|
| recipient | string |  0x7567d83b7b8d80addcb281a71d54fc7b3364ffed|

### transferFilterLegacy
| Name | Type  | 
| ---- | ----------- | 
| range | [FilterRange](#filterrange) | 
| options | [FilterOptions](#filteroptions) |  
| addressSets | [ [AddressSetLegacy](#addresssetlegacy) ] |  |

### eventCriteria
criteria to filter out event. All fields are joined with `and` operator. `null` field are ignored. e.g. 

``` json
{
  "address": "0x0000000000000000000000000000456E65726779",
  "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"
}
```
matches events emitted by `0xe59d475abe695c7f67a8a2321f33a856b0b4c71d` and with `topic0` equals `0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef`.


| Name | Type  | Description | 
| ---- | ----------- | -------- | 
| address | string | address of event emitter | 
| topic0 | string |  | 
| topic1 | string |  | 
| topic2 | string |  | 
| topic3 | string |  | 
| topic4 | string |  | 

### eventFilter
| Name | Type  | Description | 
| ---- | ----------- | -------- | 
| range | [FilterRange](#filterrange) | Defines the filter range  | 
| options | [FilterOptions](#filteroptions) | Define the filter option  | 
| criteriaSet | [ [EventCriteria](#eventcriteria) ] | Set criteria to filter | 
| order | string | order of filters, defaults to `asc` (`asc` or `desc`)  |

### transferCriteria
| Name | Type  | Example | 
| ---- | ----------- | -------- | 
| txOrigin | string | 0xe59d475abe695c7f67a8a2321f33a856b0b4c71d | 
| sender | string | 0xe59d475abe695c7f67a8a2321f33a856b0b4c71d |
| recipient | string | 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed | 


### transferFilter
| Name | Type  | Description | 
| ---- | ----------- | -------- | 
| range | [FilterRange](#filterrange) | Defines the filter range |
| options | [FilterOptions](#filteroptions) | Define the filter option |
| criteriaSet | [ [TransferCriteria](#transfercriteria) ] | Set criteria to filter | 
| order | string | order of filters, defaults to `asc` (`asc` or `desc`) | 

### peerStats
| Name | Type  | Example | 
| ---- | ----------- | -------- | 
| name | string | thor/v1.0.0-6680b98-dev/linux/go1.10.3 |
| bestBlockID | string | 0x000087b3a4d4cdf1cc52d56b9704f4c18f020e1b48dbbf4a23d1ee4f1fa5ff94 | 
| totalScore | integer | 68497 | 
| peerID | string | 50e122a505ee55b84331068acfd857e37ad58f463a0fab9aaff2c1e4b2e2d22ae71dc14fdaf6eead74bd3f60594644aa35c588f9ca6be3341e2ce18ddc413321 | 
| netAddr | string |128.1.39.120:11235  | 
| inbound | boolean | false | 
| duration | integer | 28 | 

### txOrRawTxWithMeta
> Return [txWithMeta](#txwithmeta) or [rawTxWithMeta](#rawtxwithmeta) depends on the query type

### txWithMeta
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| chainTag | integer (uint8) | last byte of genesis block ID | 39 |
| blockRef | string | 8 bytes prefix of some block ID | 0x0004f6cb730dbd90 |
| expiration | integer (uint32) | expiration relative to blockRef, in unit block | 720 |
| clauses | [ [Clause](#clause) ] | an array of *Clause* objects each of which contains fields `To`, `Value` and `Data`  | |
| gasPriceCoef | integer (uint8) | coefficient used to calculate the final gas price | 0 |
| gas | integer (uint64) | max amount of gas can be consumed to execute this transaction | 21000 |
| dependsOn | string (bytes32) | ID of the transaction on which the current transaction depends on. can be null. | null |
| nonce | string |random nonce | 0x29c257e36ea6e72a |
| id | string | identifier of the transaction | 0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477 |
| origin | string | the one who signed the transaction | 0xdb4027477b2a8fe4c83c6dafe7f86678bb1b8a8d |
| delegator | string | the delegator who paid the gas fee | null |
| size | integer(uint32) | byte size of the transaction that is RLP encoded | 130 |
| meta | {[TxMeta](#txmeta)} | transaction meta info | |

#### rawTxWithMeta
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| raw | string | hex form of encoded transaction | 0xf86981ba800adad994000000000000000000000000000000000000746f82271080018252088001c0b8414792c9439594098323900e6470742cd877ec9f9906bca05510e421f3b013ed221324e77ca10d3466b32b1800c72e12719b213f1d4c370305399dd27af962626400 |
| meta | {[TxMeta](#txmeta)} |transaction meta info  | |

### txid
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| id | string | identifier of the transaction | 0x284bba50ef777889ff1a367ed0b38d5e5626714477c40de38d71cedd6f9fa477 |

### obsolete
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| obsolete | boolean | indicates whether the block containing this data become branch block  | false |

### tracerOption
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
|name|string|name of tracer. Empty name stands for default struct logger tracer.|4byte, bigram, call, evmdis, noop, opcount, prestate, trigram, unigram |
|target|string|the unified path of target to be traced. Currently, only clause is supported. Format: `blockID`/ (`txIndex` or `txId`)/ `clauseIndex`|0x000dabb4d6f0a80ad7ad7cd0e07a1f20b546db0730d869d5ccb0dd2a16e7595b|

### storageRangeOption
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| address | string | address of account  | 0xa4627036e2095eb71c2341054daa63577c062498 |
| keyStart | string |  | 0x0000000000000000000000000000000000000000000000000000000000000000 |
| maxResult | number |  | 10 |
| target | string |  | 0x000edefb448685f9c72fc2b946980ef51d8d208bbaa4d3fdcf0c57d4847aca2e | 

### storageRange
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| nextKey | string |  | null |
| storage | object |  | |

### beat
| Name | Type  | Description | Example|
| ---- | ----------- | -------- |  -------- |
| number | integer (uint32) | block number (height) | 325324 |
| id | string (bytes32) | block identifier | 0x0004f6cc88bb4626a92907718e82f255b8fa511453a78e8797eb8cea3393b215 |
| parentID | string (bytes32) | parent block ID | 0x0004f6cb730dbd90fed09d165bfdf33cc0eed47ec068938f6ee7b7c12a4ea98d |
| timestamp | integer (uint64) | block unix timestamp | 1533267900 |
| txsFeatures | integer (uint32) | supported txs features bitset | 0 |
| bloom | string (hex) | the bloom filter composited with affected addresses  |0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000 |
| k | integer (uint32) | the number of hash functions for bloom filter  | 3 |





