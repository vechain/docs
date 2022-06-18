---
sidebarDepth: 2
---
# API Specification

## Connex.Thor

### Get Genesis Block Info

Returns [Thor.Block](#thor-block)

``` typescript
console.log(connex.thor.genesis)

>{
    "beneficiary": "0x0000000000000000000000000000000000000000",
    "gasLimit": 10000000,
    "gasUsed": 0,
    "id": "0x000000000b2bce3c70bc649a02749e8687721b09ed2e15997f466536b20bb127",
    "number": 0,
    "parentID": "0xffffffff00000000000000000000000000000000000000000000000000000000",
    "receiptsRoot": "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
    "signer": "0x0000000000000000000000000000000000000000",
    "size": 170,
    "stateRoot": "0x4ec3af0acbad1ae467ad569337d2fe8576fe303928d35b8cdd91de47e9ac84bb",
    "timestamp": 1530014400,
    "totalScore": 0,
    "transactions": [],
    "txsRoot": "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0"
}
```

### Get Blockchain Status

Returns [Thor.Status](#thor-status)

``` typescript
console.log(connex.thor.status)

>{
    "progress": 1,
    "head": {
        "id": "0x0016611b340204e5bd76a83f70eea4731575309f23a27e11011169c491359b7d",
        "number": 1466651,
        "timestamp": 1544688650,
        "parentID": "0x0016611a3fc23044b8b4cbb27283b50f04deb4d132dfdd72342770f35206a8ad",
        "txsFeatures": 1,
        "gasLimit": 16000000
    }
}
```

### Create a Ticker

`Ticker` is a concept that describes chain increment, when there is a new block added to the chain, ticker will be triggered. This API will create a ticker which has a function that creates a `Promise` that will resolve when a new block is truly added, please be advised that it never rejects.

Returns `Thor.Ticker`

+ `next` - [(): Promise<Thor.Status['head']>](#thor-status): Call `next` will create a promise that resolves with the summary of head block when there is a new block added

``` typescript
const ticker = connex.thor.ticker()
ticker.next().then((head)=>{
    console.log(head)
})

// After a few seconds
> {
    "id": "0x00379f79ce016975dab2aa6ee21669b6ad4f4aa3fbb1ef1dfb151c52e13a8437",
    "number": 3645305,
    "parentID": "0x00379f781a0035250669e6f5e5170b8cb384decbbb6a83917f823d920de5eed1",
    "timestamp": 1566874740,
    "txsFeatures": 1,
    "gasLimit": 16000000
}
```

### Account Visitor

Account visitor is a bunch of APIs to get account details and interact with account methods.

#### Create an Account Visitor

``` typescript
const acc = connex.thor.account('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed')
```

**Parameters**

+ `address` - `string`: Account to visit

Returns `AccountVisitor`
    
+ `address` - `string(readonly)`: The address of account to be visited
+ `get` - `(): Promise<Thor.Account>`: Get the account detail
+ `getCode` - `(): Promise<Thor.Account>`: Get the account code
+ `getStorage` - `(key: string): Promise<Thor.Account>`: Get the account storage
+ `method` - `(abi: object): Method`: Create a method object, to perform contract call, or build transaction clause
+ `event` - `(abi: object): EventVisitor`: Create an event visitor

#### Get Account Detail

Returns [Promise<Thor.Account>](#thor-account)

``` typescript
const acc = connex.thor.account('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed')
acc.get().then(accInfo=>{
    console.log(accInfo)
})

>{
    "balance": "0xe95ea52e8e07eddd24e",
    "energy": "0x920d91d3ff3bb7f1d527",
    "hasCode": false
}
```

#### Get Account Code

Returns `Promise<Thor.Code>`

+ `code` - `string`: Contract code of an account

``` typescript
const acc = connex.thor.account('0x0000000000000000000000000000456E65726779')
acc.getCode().then(code=>{
    console.log(code)
})

>{
    "code": "0x6080604052600436106100af576000357c010000000000000000000000000000000000..."
}
```

#### Get Account Storage

**Parameters**

+ `key` - `string`: The key to accessing in  account storage

Returns `Promise<Thor.Storage>`

+ `value` - `string`: The value to the key in account storage

``` typescript
const acc = connex.thor.account('0x0000000000000000000000000000456E65726779')
acc.getStorage('0x0000000000000000000000000000000000000000000000000000000000000001').then(storage=>{
    console.log(storage)
})

>{
    "value": "0x7107c9b15a7254dd92173d5421359b33bf40ea4ef0fa278ceaf1d320659d5c7b..."
}
```

#### Contract Method

Given the ABI of a contract, a `Thor.Method` object can be created to simulate a contract all without altering the contract state as well as pack a method with arguments to a clause that is ready to be signed.

``` typescript
const nameABI = {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}

const acc = connex.thor.account('0x0000000000000000000000000000456E65726779')
const method = acc.method(nameABI)
```

**Parameters**

+ `abi` - `object`: ABI definition of a contract method

Returns `Thor.Method`

+ `value` - `(val: string|number):this`: Set value for call and as Clause
+ `caller` - `(addr: string):this`: Set caller for call
+ `gas` - `(gas: string):this`: Set maximum gas allowed for call 
+ `gasPrice` - `(gp: string):this`: Set gas price for call in wei
+ `gasPayer` - `(addr: string):this`: Set gas payer for call
+ `call`: Simulate calling the method to obtain the output without altering the blockchain state
+ `asClause`: Pack arguments and value into a clause
+ `transact`: Pack arguments and value into an [Vendor.TxSigningService](#transaction-signing-service) for committing to the blockchain

##### Simulate a Contract Call

``` typescript
Method.call(...arguments: Array<any>): Promise<VM.Output&Decoded>
```

**Parameters**

+ `...arguments` - `Array<any>`: Arguments defined in method ABI

Returns [Promise<VM.Output&Decoded>](#vm-output)

*Decoded will be present only the ABI definition is provided*

``` typescript
// Simulate get name from a VIP-180 compatible contract
// Solidity: function name() public pure returns(string)
const nameABI = {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}
const nameMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(nameABI)
nameMethod.call().then(output=>{
    console.log(output)
})
>{
    "data": "0x0000000000000000000000...",
    "events": [],
    "transfers": [],
    "gasUsed": 605,
    "reverted": false,
    "vmError": "",
    "decoded": {
        "0": "VeThor"
    }
}

// Simulate the VIP-180 transfer 1 wei token from Alex to Bob
// Solidity: function transfer(address _to, uint256 _amount) public returns(bool success)
const transferABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}
const transferMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(transferABI)
// Set the args for simulate call
transferMethod
    .caller('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed') // Bob's address
    .gas(100000) // Max gas for simulate 
    .gasPrice('1000000000000000') // 1 VeThor can buy 1000 gas

// Alice's address and amount in wei
transferMethod.call('0xd3ae78222beadb038203be21ed5ce7c9b1bff602', 1).then(output=>{
    console.log(output)
})
>{
    "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
    "events": [
        {
            "address": "0x0000000000000000000000000000456e65726779",
            "topics": [
                "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                "0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed",
                "0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602"
            ],
            "data": "0x0000000000000000000000000000000000000000000000000000000000000001"
        }
    ],
    "transfers": [],
    "gasUsed": 13326,
    "reverted": false,
    "vmError": "",
    "decoded": {
        "0": true,
        "success": true
    }
}

// Simulate EnergyStation convertForEnergy call
// Solidity:  function convertForEnergy(uint256 _minReturn) public payable
const convertForEnergyABI = {"constant":false,"inputs":[{"name":"_minReturn","type":"uint256"}],"name":"convertForEnergy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"}
const convertForEnergyMethod = connex.thor.account('0xd015d91b42bed5feaf242082b11b83b431abbf4f').method(convertForEnergyABI)
// Set value, leave other arguments unset
convertForEnergyMethod
    .value('1000000000000000000') // 1e18 wei

// minReturn in wei(1e16 wei)
convertForEnergyMethod.call('10000000000000000').then(output=>{
    console.log(output)
})
> ...
```

##### Caching a Contract Call

:::tip Quote
There are only two hard things in Computer Science: **cache invalidation** and **naming things**. 

-- Phil Karlton
:::
Caching method calls would help developers to speed up their applications. Addresses are ideal to be the conditions of the cache invalidation because they are building states in smart contracts. We recommend developers use this caching mechanism carefully since it is primitive. 

``` typescript
Method.cache(hints: Array<string>): this
``` 

**Parameters**

+ `hints` - `Array<string>`: Turn on caching for the method and set the condition of cache invalidation.

After turning cache on, connex will check everything on the blockchain that can be treated as address(included but not limited to):

+ `Block.Signer`
+ `Block.Beneficiary`
+ `Transaction.Signer`
+ `Receipt.GasPayer`
+ `Receipt.Output.Event.Address`
+ `Receipt.Output.Event.ContractAddress` 
+ `Receipt.Output.Event.Topics`
+ `Receipt.Output.Transfer.Sender`
+ `Receipt.Output.Transfer.Recipient`

Once any address in the set is observed by connex, the cache would be expired.

``` typescript
// Caching for method name, return value should never expire
// Solidity: function name() public pure returns(string)
const nameABI = {"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"pure","type":"function"}
const nameMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(nameABI)
nameMethod.cache([])  // Set this method to never expire
nameMethod.call().then(output=>{
    console.log(output)
}) // This will hit cache forever

// Caching for method balanceOf, for my addresses
// Solidity function balanceOf(address _owner) public view returns(uint256 balance) 
const balanceOfABI = {"constant":true,"inputs":[{"name":"_owner","type":"address"}],"name":"balanceOf","outputs":[{"name":"balance","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"}
const balanceOfMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(balanceOfABI)
// Set this method to expire when my account being seen
balanceOfMethod.cache(['0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'])
// Get balance of my account, we will get cached result on most blocks
// Event Transfer(_from = '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed', ....) would make cache expired
balanceOfMethod.call('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed').then(output=>{
    console.log(output)
})

// Caching a DEX market's vet balance
// Solidity: function vetVirtualBalance() public returns(bool uint104)
const vetBalanceABI = {"constant":true,"inputs":[],"name":"vetVirtualBalance","outputs":[{"name":"","type":"uint104"}],"payable":false,"stateMutability":"view","type":"function"}
const vetBalanceMethod = connex.thor.account('0xD015D91B42BEd5FeaF242082b11B83B431abBf4f').method(vetBalanceABI)
// Set this method to expire when the contract address being seen
// Why? Because I am the developer of EnergyStation and I know the detail of the contract
// vetVirtualBalance changes when there is any conversion executed and every conversion would trigger an event
// and every event's output will contain contractAddress, so I set the contractAddress to the condition
vetBalanceMethod.cache(['0xD015D91B42BEd5FeaF242082b11B83B431abBf4f'])
vetBalanceMethod.call('0xD015D91B42BEd5FeaF242082b11B83B431abBf4f').then(output=>{
    console.log(output)
})// This will get the vetVirtualBalance efficiently
```

##### Commit to blockchain

``` typescript
Method.transact(...arguments: Array<any>): Vendor.TxSigningService
```

**Parameters**

+ `...arguments` - `Array<any>`: Arguments defined in method ABI

Returns [Vendor.TxSigningService](#transaction-signing-service)

``` typescript
// Perform a VIP-180 transfer 1 wei token from Alex to Bob
// Solidity: function transfer(address _to, uint256 _amount) public returns(bool success)
const transferABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}
const transferMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(transferABI)

transferMethod
    // Bob's address and amount in wei
    .transact('0xd3ae78222beadb038203be21ed5ce7c9b1bff602', 1)
    .comment('transfer 1 wei to Alice')
    .request()
    .then(result=>{
        console.log(result)
    })
>{
    "signer": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
    "txId": "0x4e9a7eec33ef6cfff8ff5589211a94070a0284df17c2ead6267f1913169bd340"
}

// Converts 1 VET to VeThor
// Solidity: function convertForEnergy(uint256 _minReturn) public payable
const convertForEnergyABI = {"constant":false,"inputs":[{"name":"_minReturn","type":"uint256"}],"name":"convertForEnergy","outputs":[{"name":"","type":"uint256"}],"payable":true,"stateMutability":"payable","type":"function"}
const convertForEnergyMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(convertForEnergyABI)

convertForEnergyMethod
    .value('1000000000000000000') // Set value to 1e18
    .transact('10000000000000000') // minReturn in wei(1e16 wei)
    .comment('Convert 1 VET to VeThor')
    .request()
    .then(result=>{
        console.log(result)
    })
>{
    "signer": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
    "txId": "0x4e9a7eec33ef6cfff8ff5589211a94070a0284df17c2ead6267f1913169bd340"
}
```

##### Create a Clause for Signing

``` typescript
Method.asClause(...arguments: Array<any>): VM.Clause
```

**Parameters**

+ `...arguments` - `Array<any>`: Arguments defined in method ABI

Returns [VM.Clause](#vm-clause)

``` typescript
// Convert 1 VeThor to VET, which needs to perform two action approve VeThor and convertForVET
const dex = '0xD015D91B42BEd5FeaF242082b11B83B431abBf4f'
const approveABI = {"constant":false,"inputs":[{"name":"_spender","type":"address"},{"name":"_value","type":"uint256"}],"name":"approve","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}
const approveMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(approveABI)
const convertForVetABI= {"constant":false,"inputs":[{"name":"_sellAmount","type":"uint256"},{"name":"_minReturn","type":"uint256"}],"name":"convertForVET","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}
const convertForVetMethod = connex.thor.account(dex).method(convertForVetABI)

// approve dex to move my 1e18 wei VeThor
const c1 = approveMethod.asClause(dex, '1000000000000000000')
// convert 1e18 wei VeThor to VET, minimum return at 1e16 wei VET
const c2 = convertForVetMethod.asClause('1000000000000000000', '10000000000000000')

connex.vendor
    .sign('tx', [c1, c2])
    .comment('convert 1 VeThor to VET')
    .request()
    .then(result=>{
        console.log(result)
    })

>{
    "to": "0x0000000000000000000000000000456E65726779",
    "value": "0",
    "data": "0xa9059cb......"
}
```

#### Contract Event

Given the ABI of a contract, we can create a `Thor.Event` object that will be able to filter contracts events with arguments or pack the arguments to criteria for assembling combined filters.

``` typescript
const transferEventABI = {"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}
const acc = connex.thor.account('0x0000000000000000000000000000456E65726779')

const event = acc.event(transferEventABI)
```

**Parameters**

+ `abi` - `object`: ABI definition of contract event

Returns `Thor.Event`

+ `asCriteria`: Pack indexed arguments into criteria for future use, see [Thor.Filter](#filter)
+ `filter`: Create an event filter, only accept indexed arguments, see [Thor.Filter](#filter)

##### Pack into Criteria

``` typescript
Event.asCriteria(indexed: object): Thor.Filter.Criteria
```

**Parameters**

+ `indexed` - `object`: Indexed arguments defined in event ABI that needs to be filtered, the items in the object will be combined with `AND` operator: e.g. {"ConA": "A", "ConB": "B"} is '`ConA=A` AND `ConB=B`'

Returns `Thor.Filter.Criteria`

``` typescript
// Solidity: event Transfer(address indexed _from, address indexed _to, uint256 _value)
const transferEventABI = {"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}
const transferEvent = connex.thor.account('0x0000000000000000000000000000456E65726779').event(transferEventABI)

// Pack into criteria filters events that the '_to' is Bob's address
const criteria = transferEvent.asCriteria({
    _to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'
})
console.log(criteria)
>{
    "address": "0x0000000000000000000000000000456E65726779",
    "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "topic2": "0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602"
}
// Next you can combine different criteria together and put them into filter
```

##### Create a filter

``` typescript
Event.filter(indexed: object): Thor.Filter
```

**Parameters**

+ `indexed` - `Array<object>`: Array of filter conditions of indexed arguments, the items in the array will be combined by `OR` operator to filter the events: e.g. [{"ConA": "A"}, {"ConB": "B", "ConC": "C"}] is '`ConA=A` OR (`ConB=B` AND `ConC=C`)'

Returns [Thor.Filter](#filter)

``` typescript
// Solidity: event Transfer(address indexed _from, address indexed _to, uint256 _value)
const transferEventABI = {"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}
const transferEvent = connex.thor.account('0x0000000000000000000000000000456E65726779').event(transferEventABI)

// Filter the events whether '_to' is Bob's address or '_from' is Alice's address
const filter = transferEvent.filter([{
    _to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'
},{
    _from: '0x733b7269443c70de16bbf9b0615307884bcc5636'
}])
// Next you can call the methods of Thor.Filter
```

##### Execute the filter

``` typescript
Filter.apply(offset:number, limit: number): Promise<Array<Thor.Filter.Result.Log&Decoded>>
```

Returns [Promise<Array<Thor.Filter.Result.Log&Decoded>>](#thor-filter-result)

*Decoded will be present only the ABI definition is provided*

```typescript
// Solidity: event Transfer(address indexed _from, address indexed _to, uint256 _value)
const transferEventABI = {"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}
const transferEvent = connex.thor.account('0x0000000000000000000000000000456E65726779').event(transferEventABI)

// Create a filter from eventABI
const filter = transferEvent.filter([{
    _to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'
}])

// Apply the filter, get the first one
filter.apply(0, 1).then(logs=>{
    console.log(logs)
})
>[
    {
        "address": "0x0000000000000000000000000000456e65726779",
        "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed",
            "0x00000000000000000000000000f34f4462c0f6a6f5e76fb1b6d63f05a32ed2c6"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
        "meta": {
            "blockID": "0x0000813fbe48421dfdc9400f1f4e1d67ce34256538afd1c2149c4047d72c4175",
            "blockNumber": 33087,
            "blockTimestamp": 1530345270,
            "txID": "0x29b0af3ffb8eff4cc48a24ce9a800aaf4d0e92b72dbcf17ce01b14fd01af1290",
            "txOrigin": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
            "clauseIndex": 0
        },
        "decoded": {
            "0": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
            "1": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
            "2": "1000000000000000000",
            "_from": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
            "_to": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
            "_value": "1000000000000000000"
        }
    }
]
```

### Block Visitor

``` typescript
const blk = connex.thor.block(0)
```

**Parameters**

+ `revision` - `number|string|undefined`: Block number or ID to visit or leave it unset the function will get the latest block ID as the revision (As long as the revision is set, it can't be changed again)

Returns `Thor.BlockVisitor`

+ `revision` - `number|string(readonly)`: Block number or ID to be visited.

#### Get Block Detail

Returns [Promise<Thor.Block>](#thor-block)

``` typescript
const blk=connex.thor.block(0)

blk.get().then(block=>{
    console.log(block)
})
>{
    "number": 0,
    "id": "0x000000000b2bce3c70bc649a02749e8687721b09ed2e15997f466536b20bb127",
    "size": 170,
    "parentID": "0xffffffff00000000000000000000000000000000000000000000000000000000",
    "timestamp": 1530014400,
    "gasLimit": 10000000,
    "beneficiary": "0x0000000000000000000000000000000000000000",
    "gasUsed": 0,
    "totalScore": 0,
    "txsRoot": "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
    "stateRoot": "0x4ec3af0acbad1ae467ad569337d2fe8576fe303928d35b8cdd91de47e9ac84bb",
    "receiptsRoot": "0x45b0cfc220ceec5b7c1c62c4d4193d38e4eba48e8815729ce75f9c0ab0e4c1c0",
    "signer": "0x0000000000000000000000000000000000000000",
    "isTrunk": true,
    "transactions": []
}
```

### Transaction Visitor

``` typescript
const tx = connex.thor.transaction('0x9daa5b584a98976dfca3d70348b44ba5332f966e187ba84510efb810a0f9f851')
```

**Parameters**

+ `id` - `string`: Transaction ID to be visited (As long as the revision is set, it can't be changed again)

Returns `Thor.TransactionVisitor`

+ `id` - `number|string(readonly)`: Block number or ID to be visited
+ `get` - `(): Promise<Thor.Transaction>`: Get the transaction detail
+ `getReceipt` - `(): Promise<Thor.Receipt>`: Get the transaction receipt

#### Get Transaction Detail

Returns [Thor.Transaction](#thor-transaction)

``` typescript
const transaction=connex.thor.transaction('0x9daa5b584a98976dfca3d70348b44ba5332f966e187ba84510efb810a0f9f851')

transaction.get().then(tx=>{
    console.log(tx)
})
>{
    "id": "0x9daa5b584a98976dfca3d70348b44ba5332f966e187ba84510efb810a0f9f851",
    "chainTag": 39,
    "blockRef": "0x00003abac0432454",
    "expiration": 720,
    "clauses": [
        {
            "to": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
            "value": "0x152d02c7e14af6800000",
            "data": "0x"
        }
    ],
    "gasPriceCoef": 128,
    "gas": 21000,
    "origin": "0xe59d475abe695c7f67a8a2321f33a856b0b4c71d",
    "nonce": "0x12256df6fb",
    "dependsOn": null,
    "size": 128,
    "meta": {
        "blockID": "0x00003abbf8435573e0c50fed42647160eabbe140a87efbe0ffab8ef895b7686e",
        "blockNumber": 15035,
        "blockTimestamp": 1530164750
    }
}
```

#### Get Transaction Receipt


``` typescript
const tx = connex.thor.transaction('0x9daa5b584a98976dfca3d70348b44ba5332f966e187ba84510efb810a0f9f851')
const receipt = await tx.getReceipt()
```

Returns [Thor.Receipt](#thor-receipt)

``` typescript
const transaction=connex.thor.transaction('0x9daa5b584a98976dfca3d70348b44ba5332f966e187ba84510efb810a0f9f851')

transaction.getReceipt().then(tx=>{
    console.log(tx)
})
>{
    "gasUsed": 21000,
    "gasPayer": "0xe59d475abe695c7f67a8a2321f33a856b0b4c71d",
    "paid": "0x1b5b8c4e33f51f5e8",
    "reward": "0x835107ddc632302c",
    "reverted": false,
    "meta": {
        "blockID": "0x00003abbf8435573e0c50fed42647160eabbe140a87efbe0ffab8ef895b7686e",
        "blockNumber": 15035,
        "blockTimestamp": 1530164750,
        "txID": "0x9daa5b584a98976dfca3d70348b44ba5332f966e187ba84510efb810a0f9f851",
        "txOrigin": "0xe59d475abe695c7f67a8a2321f33a856b0b4c71d"
    },
    "outputs": [
        {
            "contractAddress": null,
            "events": [],
            "transfers": []
        }
    ]
}
```

### Filter

Filter event and transfer logs on the blockchain. Filter often works with `Connex.Thor.Account`, either creates a filter from an event or packs criteria and then assembles several criteria and sets to a filter. But also there is a way of creating a filter and assembling criteria as per your need then apply it.

``` typescript
const f = connex.thor.filter(kind: 'event'|'transfer', criteria: Array<Thor.Filter.Criteria>)
```

**Parameters**

+ `kind` - `'event'|'transfer'`: Kind of filter
+ `criteria` - `Array<Thor.Filter.Criteria>`: Criteria set for the filter, either array of `Event.Criteria` or an array of `Transfer.Criteria`, items in the criteria array will be combined by `OR` operator to filter the events: e.g. [{"ConA": "A"}, {"ConB": "B", "ConC": "C"}] is '`ConA=A` OR (`ConB=B` AND `ConC=C`)'

`Thor.Filter.Criteria`:

Filters support two different types of log: `event` and `transfer` so there are two types of `Thor.Filter.Criteria`.

`Thor.Filter.Event.Criteria:`

+ `address` - `string(optional)`: The address to get logs from
+ `topic0` - `string(optional)`: Topic0 to match
+ `topic1` - `string(optional)`: Topic1 to match
+ `topic2` - `string(optional)`: Topic2 to match
+ `topic3` - `string(optional)`: Topic3 to match
+ `topic4` - `string(optional)`: Topic4 to match

`Thor.Filter.Transfer.Criteria:`

+ `txOrigin` - `string(optional)`: Signer address of tx 
+ `sender` - `string(optional)`: VET sender address
+ `recipient` - `string(optional)`: VET recipient address

Returns `Thor.Filter`

+ `order` - `(order: 'asc'|'desc'): this`: Set the order for filter
+ `range` - `(range: Thor.Filter.Range): this`: Set the range for the filter 
+ `apply` - `(offset: number, limit: number): Promise<Thor.Filter.Result>`: Apply the filter and get the result

[Thor.Filter.Result](#thor-filter-result)

``` typescript
connex.thor.filter('event',[
    // Matches VIP-180 Transfer from '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'
    {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic1": "0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602"
    },
    // Matches VIP-180 Transfer to '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'
    {
        "address": "0x0000000000000000000000000000456E65726779",
        "topic0": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
        "topic2": "0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed"
    }
])
// Next you can set other options or executes the filter
```

#### Set filter range

**Parameters**

`Thor.Filter.Range:`

+ `unit` - `'block'|'time'`: Range unit, can be filtered by block number or timestamp in second
+ `from` - `Number`: Start point in unit
+ `to` - `Number`: Stop point in unit

Returns `this`

``` typescript
const filter =  connex.thor.filter('transfer')

// Set the filter range as block 0 to block 100
filter.range({
    unit: 'block',
    from: 0,
    to: 100
})
// Next you can set other options or executes the filter
```

#### Execute the filter

**Parameters**

+ `offset` - `Number`: Start cursor in the result 
+ `limit` - `Number`: Constrain the number of result returned

Returns [Promise<Array<Thor.Filter.Result>>](#thor-filter-result)

``` typescript
// Solidity: event Transfer(address indexed _from, address indexed _to, uint256 _value)
const transferEventABI = {"anonymous":false,"inputs":[{"indexed":true,"name":"_from","type":"address"},{"indexed":true,"name":"_to","type":"address"},{"indexed":false,"name":"_value","type":"uint256"}],"name":"Transfer","type":"event"}
const transferEvent = connex.thor.account('0x0000000000000000000000000000456E65726779').event(transferEventABI)

// Create a filter from eventABI
const filter = transferEvent.filter([{
    _to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602'
}])
// Set filter options
filter
    .order('desc') // Work from the last event
    .range({
        unit: 'block',
        from: 10000,
        to: 40000
    }) // Set the range
// Apply the filter, get the first one
filter.apply(0, 1).then(logs=>{
    console.log(logs)
})
>[
    {
        "address": "0x0000000000000000000000000000456e65726779",
        "topics": [
            "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
            "0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed",
            "0x00000000000000000000000000f34f4462c0f6a6f5e76fb1b6d63f05a32ed2c6"
        ],
        "data": "0x0000000000000000000000000000000000000000000000000de0b6b3a7640000",
        "meta": {
            "blockID": "0x0000813fbe48421dfdc9400f1f4e1d67ce34256538afd1c2149c4047d72c4175",
            "blockNumber": 33087,
            "blockTimestamp": 1530345270,
            "txID": "0x29b0af3ffb8eff4cc48a24ce9a800aaf4d0e92b72dbcf17ce01b14fd01af1290",
            "txOrigin": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
            "clauseIndex": 0
        },
        "decoded": {
            "0": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
            "1": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
            "2": "1000000000000000000",
            "_from": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
            "_to": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
            "_value": "1000000000000000000"
        }
    }
]

// Filter the transfer log that from 0x7567d83b7b8d80addcb281a71d54fc7b3364ffed
const filter = connex.thor.filter('transfer', [{
    sender: '0x7567d83b7b8d80addcb281a71d54fc7b3364ffed'
}])

filter.apply(0,1).then(logs=>{
    console.log(logs)
})
>[
    {
        "sender": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
        "recipient": "0x3cc190d342a0d3a7365538d94adffec34f789cd0",
        "amount": "0xde0b6b3a7640000",
        "meta": {
            "blockID": "0x00005be5d2129f01cb60ef20b43208091722bf6e0086ac24745cd26698e9d93d",
            "blockNumber": 23525,
            "blockTimestamp": 1530249650,
            "txID": "0xd08e959c0ae918ab72d4da162856e7a4556c576b8ae849d09dbd38e5a419e94b",
            "txOrigin": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
            "clauseIndex": 0
        }
    }
] 
```

### Explainer

Explainer gets what would be produced after blockchain executes a tx, without committing to the blockchain.

``` typescript
const exp = connex.thor.explain([{
    to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602',
    value: 1,
    data: '0x'
}])
``` 
**Parameters**

- `Clauses`  - [Array<VM.Clause>](#vm-clause)

Returns `Thor.Explainer`

+ `caller` - `(addr: string): this`: Set caller
+ `gas` - `(gas: number): this`: Set max allowed gas 
+ `gasPrice` - `(gp: string): this`: Set gas price in hex string
+ `gasPayer` - `(addr: string):this`: Set gas payer
+ `cache` - `(hints: string[]): this`: Turn on caching for the explainer and set the condition of cache invalidation, read [more](#caching-a-contract-call).
+ `execute` - `(): Promise<Array<VM.Output>>`: execute to get the output

#### Execute the explainer

Returns [Promise<Array<VM.Output>>](#vm-output)

``` typescript
// Prepare energy transfer clause
const transferABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}
const transferMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(transferABI)
// Alice's address and amount in wei
const energyClause = transferMethod.asClause('0xd3ae78222beadb038203be21ed5ce7c9b1bff602', 1)

const exp = connex.thor.explain([
    {
        to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602',
        value: 1,
        data: '0x'
    },
    energyClause
])

exp
    .gas(200000) // Set maximum gas
    .caller('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed') // Set caller
    .execute()
    .then(outputs=>{
        console.log(outputs)
    })
>[
    {
        "data": "0x",
        "events": [],
        "transfers": [
            {
                "sender": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
                "recipient": "0xd3ae78222beadb038203be21ed5ce7c9b1bff602",
                "amount": "0x1"
            }
        ],
        "gasUsed": 0,
        "reverted": false,
        "vmError": ""
    },
    {
        "data": "0x0000000000000000000000000000000000000000000000000000000000000001",
        "events": [
            {
                "address": "0x0000000000000000000000000000456e65726779",
                "topics": [
                    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
                    "0x0000000000000000000000007567d83b7b8d80addcb281a71d54fc7b3364ffed",
                    "0x000000000000000000000000d3ae78222beadb038203be21ed5ce7c9b1bff602"
                ],
                "data": "0x0000000000000000000000000000000000000000000000000000000000000001"
            }
        ],
        "transfers": [],
        "gasUsed": 13326,
        "reverted": false,
        "vmError": ""
    }
 ]
``` 

## Connex.Vendor

### Acquire a Signing Service

``` typescript
Vendor.sign(kind: 'tx'|'cert', msg: Array<TxMessage|CertMessage>): TxSigningService|CertSigningService
```

**Parameters**

+ `kind` - `'tx'|'cert'`: Kind of signing service
+ `msg` - `Array<TxMessage|CertMessage>`: Message to sign

`TxMessage:`
+ `to`:  Same as [`VM.Clause.To`](#vm-clause)
+ `value`:  Same as [`VM.Clause.Value`](#vm-clause)
+ `data`:  Same as [`VM.Clause.Data`](#vm-clause)
+ `comment` - `string(optional)`: Comment to the clause
+ `abi` - `object(optional)`: ABI definition of this clause, for User-Agent decoding the data

`CertMessage:`
+ `purpose` - `'identification' | 'agreement'`:  Purpose of the request, `identification` means request the user to sign a random message to get the address and `agreement` means ask user to sign the agreement for using the VeChain apps
+ `payload`:
    + `type` - `'text'`: Payload type,only `text` is supported
    + `content` - `string`: Content of of the request

Returns `Connex.Vendor.TxSigningService` or `Connex.Vendor.CertSigningService`

### Transaction Signing Service

`Connex.Vendor.TxSigningService:`

+ `signer` - `(addr: string): this`: Enforces the specified address to sign the transaction
+ `gas` - `(gas: number): this`: Enforces the specified number as the maximum gas that can be consumed for the transaction
+ `dependsOn` - `(txid: string): this`: Set another txid as dependency ([Reference](../thor/learn/transaction-model.md#dependson))
+ `link` - `(url: string): this`: Set the link to reveal transaction-related information, the link will be used for connex to assemble a `callback url` by replacing the placeholder `{txid}` by `Transaction ID`
+ `comment` - `(text: string): this`: Set the comment for the transaction that will be revealed to the user
+ `delegate` - `(url: string, signer: string): this`: Enable VIP-191 by setting the url and the fee payer's address. Wallets(Sync2) will request fee payer's signature with the url and required parameters, read [this](https://github.com/vechain/VIPs/blob/master/vips/VIP-201.md#explicit-grant-flow) to get the detail about building a VIP-191 service
+ `accepted` - `(cb: ()=>void): this`: Register a callback function which will be fired once user's wallet accepted the request
+ `request` - `(): Promise<Connex.Vendor.TXResponse>`: Perform the request

#### Perform Transaction Signing Request

Returns `Promise<Connex.Vendor.TXResponse>:`
+ `txid` - `string`: Transaction identifier
+ `signer` - `string`: Signer address

``` typescript
// Prepare energy transfer clause
const transferABI = {"constant":false,"inputs":[{"name":"_to","type":"address"},{"name":"_amount","type":"uint256"}],"name":"transfer","outputs":[{"name":"success","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"}
const transferMethod = connex.thor.account('0x0000000000000000000000000000456E65726779').method(transferABI)
// Connex author's address and amount in wei
const energyClause = transferMethod.asClause('0xd3ae78222beadb038203be21ed5ce7c9b1bff602', '1000000000000000000000')

connex.vendor.sign('tx', [
    {
        to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602',
        value: '100000000000000000000',
        data: '0x',
        comment: 'Transfer 100 VET'
    },
    {
        comment: 'Transfer 1000 VeThor',
        ...energyClause
    }
])
.signer('0x7567d83b7b8d80addcb281a71d54fc7b3364ffed') // Enforce signer
.gas(200000) // Set maximum gas
.link('https://connex.vecha.in/{txid}') // User will be back to the app by the url https://connex.vecha.in/0xffff....
.comment('Donate 100 VET and 1000 VeThor to the author of connex')
.request()
.then(result=>{
    console.log(result)
})
>{
    "signer": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
    "txId": "0x4e9a7eec33ef6cfff8ff5589211a94070a0284df17c2ead6267f1913169bd340"
}
```

#### Perform a VIP-191 enabled request

``` typescript
const service = 'https://pay-tx-fee-for-you.vecha.in/requests'
const payer = '0x733b7269443c70de16bbf9b0615307884bcc5636'

connex.vendor.sign('tx',[{
    to: '0xd3ae78222beadb038203be21ed5ce7c9b1bff602',
    value: '100000000000000000000',
    data: '0x',
    comment: 'Transfer 100 VET'
}])
.delegate(service, payer)
.request().then(result=>{
    console.log(result)
})
>{
    "signer": "0x7567d83b7b8d80addcb281a71d54fc7b3364ffed",
    "txId": "0x4e9a7eec33ef6cfff8ff5589211a94070a0284df17c2ead6267f1913169bd340"
}
```

### Certificate Signing Service

The certificate is a message signing based mechanism which can easily request user's identification(address) or user to agree to your terms or agreements.

`Connex.Vendor.CertSigningService:`

+ `signer` - `(addr: string): this`: Enforces the specified address to sign the certificate
+ `link` - `(url: string): this`: Set the link to reveal certificate-related information, the link will be used for connex to assemble a `callback url` by replacing the placeholder `{certid}` by `Certificate ID`, which is computed by `blake2b256(Certificate.encode(cert))`
+ `accepted` - `(cb: ()=>void): this`: Register a callback function which will be fired once user's wallet accepted the request
+ `request` - `(): Promise<Connex.Vendor.CertResponse>`: Send the request

#### Perform Certificate Signing Request

Returns `Promise<Connex.Vendor.CertResponse>`:
+ `annex`:
    + `domain` - `string`: Domain of the VeChain apps
    + `timestamp` - `number`: Head block timestamp when user accepts the request
    + `signer` - `string`: Signer address
+ `signature` - `string`: Signature

``` typescript
connex.vendor.sign('cert',{
    purpose: 'identification',
    payload: {
        type: 'text',
        content: 'random generated string'
    }
})
.link('https://connex.vecha.in/{certid}') // User will be back to the app by the url https://connex.vecha.in/0xffff....
.request()
.then(result=>{
    console.log(result)
})

>{
    "annex": {
        "domain": "vechain.github.io",
        "timestamp": 1545826680,
        "signer": "0xf6e78a5584c06e2dec5c675d357f050a5402a730"
    },
    "signature": "0x30db85935f620f7c506462f3ec7552479a56db8cbd0c2a3f295a92ad4e2f37ae2d2b2a2a212c45c43eeaf6e5caa8b3348038c01192ed226d12a118f204c6729200"
}

// Ask user to sign the agreement
connex.vendor.sign('cert',{
    purpose: 'agreement',
    payload: {
        type: 'text',
        content: 'agreement'
    }
})
.request()
.then(result=>{
    console.log(result)
})

>{
    "annex": {
        "domain": "vechain.github.io",
        "timestamp": 1545826770,
        "signer": "0xf6e78a5584c06e2dec5c675d357f050a5402a730"
    },
    "signature": "0x2078a8a2fdfa61df579516162d373cd18b889fc5cb5c5ab51f4e1d71b21742ec6a8072f645502c82bf997529a126bcaefd38df385a079c94f9b2fd03b546aa1400"
}
```

## Types
### Thor.Status

+ `progress` - `number`: A number [0-1] indicates the syncing progress of the currently connected node
+ `head`: Summarized block info that indicates the head block of the currently connected node
    + `id` - `string`: Identifier of the block (bytes32)
    + `number` - `number`: Number of the block
    + `timestamp` - `number`: Unix timestamp of the block
    + `parentID` - `string`: ID of the parent block (bytes32)
    + `txFeatures` - `number`: Bitset of supported txs features
    + `gasLimit` - `number`: Block gaslimit

### Thor.Block

+ `id` - `string`: Identifier of the block (bytes32)
+ `number` - `number`: Number of block
+ `parentID` - `string`: ID of parent block (bytes32)
+ `timestamp` - `number`: Unix timestamp of block
+ `gasLimit` - `number`: Gas limit of the block
+ `beneficiary` - `string`: Address of account to receive block reward
+ `gasUsed` - `number`: Actual gas used of block
+ `totalScore` - `number`: Score of the main chain
+ `txRoot` - `string`: Root hash of transaction in the block (bytes32)
+ `stateRoot` - `string`: Root hash of state (bytes32)
+ `signer` - `string`: Address of who signed the block (bytes20)
+ `transactions` - `Array<string>`: Array of transaction IDs
+ `isTrunk` - `bool`: Whether the block is in trunk
+ `txFeatures` - `number`: Bitset of supported txs features

### Thor.Account

+ `balance` - `string`: Account balance in hex string
+ `energy` - `string`: Account energy in hex string
+ `hasCode` - `bool`: Whether the account is a smart contract

### Thor.Transaction

+ `id` - `string`: Identifier of the transaction
+ `chainTag` - `number`: Last byte of genesis block ID
+ `blockRef` - `string`: The BlockRef (an eight-byte array string) includes two parts: the first four bytes contains the block height (number) and the rest four bytes is part of the referred block’s ID. If the referred block is future block, blockNumber + "00000000" should be added
+ `expiration` - `number` : Expiration relative to blockRef (in unit block)
+ `clauses` - [Array<VM.Clause>](#vm-clause)
+ `gasPriceCoef` - `number`: Coefficient used to calculate the final gas price
+ `gas`  - `number`: Maximum of gas can be consumed to execute this transaction
origin
+ `nonce` - `string`: Transaction nonce
+ `origin` - `string`: The one who signed the transaction
+ `delegator` - `string`: The delegator who paid the gas fee
+ `dependsOn` - `string|null`: ID of the transaction which the current transaction depends (bytes32)
+ `size` - `number`: Byte size of the transaction that is RLP encoded
+ `meta` - [Thor.Transaction.Meta](#thor-transaction-meta)

### Thor.Transaction.Meta

+ `blockID` - `string`: Block identifier of transaction
+ `blockNumber` - `number`: Block number of transaction
+ `blockTimestamp` - `number`: Block unix timestamp of transaction

### Thor.Receipt

+ `gasUsed` - `number`: Actual gas used of block
+ `gasPayer` - `string`: Address of account who paid used gas
+ `paid` - `string`: Hex form of amount of paid energy
+ `reward` - `string`: Hex form of amount of reward
+ `reverted` - `boolean`: true means the transaction was reverted
+ `outputs` - [Array<Thor.Receipt.Output>](#thor-receipt-output): Clause's corresponding outputs
+ `meta` - [Thor.Receipt.Meta](#thor-receipt-meta)

### Thor.Receipt.Output

+ `contractAddress` - `string`: Deployed contract address, if the corresponding clause is a contract deployment clause
+ `events` - [Array<Thor.Log.Event>](#thor-log-event): Event log objects produced during clause execution
+ `transfers` - [Array<Thor.Log.Transfer>](#thor-log-transfer) Transfer log produced during clause execution

### Thor.Receipt.Meta

+ `blockID` - `string`: Block identifier of log
+ `blockNumber` - `number`: Block number of log
+ `blockTimestamp` - `number`: Block unix timestamp of log
+ `txID` - `string`: Transaction identifier of the log
+ `txOrigin` - `string`: Transaction signer the log

### Thor.Filter.Result

Either `Event` - [VM.Event&Thor.Filter.Log.Meta](#vm-event) or `Transfer` - [VM.Transfer&Thor.Filter.Log.Meta](#vm-transfer)

### Thor.Filter.Log.Meta

+ `blockID` - `string`: Block identifier of log
+ `blockNumber` - `number`: Block number of log
+ `blockTimestamp` - `number`: Block unix timestamp of log
+ `txID` - `string`: Transaction identifier of the log
+ `txOrigin` - `string`: Transaction signer the log
+ `clauseIndex` - `number`: Clause index of transaction 

### VM.Clause

+ `to` - `string|null`: The destination address of the message, null for a contract-creation transaction
+ `value`- `string|number`: The value, with a unit of `wei`, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type
+ `data` - `string`: Either the [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract or the initialization code of a contract-creation transaction

### VM.Output

+ `data` - `string`: The returned data of the operation(hex string), e.g. a smart contract function returned value
+ `vmError` - `string`: VM error that occurred during the execution
+ `reverted` - `boolean`: Indicated whether the execution is reverted by the VM
+ `events` - [Array<VM.Event>](#vm-event): Event logs that produced during the execution
+ `transfer` - [Array<VM.Transfer>](#vm-transfer): Transfer logs that produced during the execution

### VM.Event

+ `address` - `string`: The address of contract which produces the event (bytes20)
+ `topics` - `Array<string>`: an array with max 5 32 Byte topics, topic 1-4 contains indexed parameters of the log
+ `data` - `string`: The data containing non-indexed log parameter

### VM.Transfer

+ `sender` - `string`: Address that sends vet.
+ `recipient` - `string`: Address that receives vet.
+ `amount` - `string`: Amount of vet in `wei`.

### Decoded

`Decoded` is a mixed object that produced by `ABI.decode` with the ABI definition of `EVENT` or `METHOD`. Decoded will be present only at the ABI definition is provided.

+ `{index}` - `number`: Decoded property by parameter index
+ `{name}` - `string`: Decoded property by parameter name if present
+ `revertReason` - `string(optional)`: Reason message when method call reverted. It's usually the second argument of `require` statement in Solidity, and helpful to diagnose contract code.

For example if a method's definition is `function name() public pure returns(string name)` after perform the simulate call `decoded` will be like following: 

``` typescript
{
    "decoded": {
        "0": "VeThor",
        "name": "VeThor"
    }
}
```

You can access the name by calling `decoded['name']` or `decoded['0']`(Number index is for non-named outputs).

Another example if an event's definition is `event Transfer(address indexed _from, address indexed _to, uint256 _value)` after performing the filter `decoded` will be the following: 

``` typescript
{
    "decoded": {
        "0": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
        "1": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
        "2": "1000000000000000000",
        "_from": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
        "_to": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
        "_value": "1000000000000000000"
    }
}
```
