# Type 
## Thor.Status

+ `progress` - `number`: A number [0-1] indicates the syncing progress of the currently connected node
+ `head`: Summarized block info that indicates the head block of the currently connected node
    + `id` - `string`: Identifier of the block (bytes32)
    + `number` - `number`: Number of the block
    + `timestamp` - `number`: Unix timestamp of the block
    + `parentID` - `string`: ID of the parent block (bytes32)

## Thor.Block

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

## Thor.Account

+ `balance` - `string`: Account balance in hex string
+ `energy` - `string`: Account energy in hex string
+ `hasCode` - `bool`: Whether the account is a smart contract

## Thor.Transaction

+ `id` - `string`: Identifier of the transaction
+ `chainTag` - `number`: Last byte of genesis block ID
+ `blockRef` - `string`: The BlockRef (an eight-byte array string) includes two parts: the first four bytes contains the block height (number) and the rest four bytes is part of the referred block’s ID. If the referred block is future block, blockNumber + "00000000" should be added
+ `expiration` - `number` : Expiration relative to blockRef (in unit block)
+ `clauses` - [`Array<Thor.Clause>`](#thorclause)
+ `gasPriceCoef` - `number`: Coefficient used to calculate the final gas price
+ `gas`  - `number`: Maximum of gas can be consumed to execute this transaction
origin
+ `nonce` - `string`: Transaction nonce
+ `dependsOn` - `string|null`: ID of the transaction which the current transaction depends (bytes32)
+ `size` - `number`: Byte size of the transaction that is RLP encoded
+ `meta` - [`Thor.Transaction.Meta`](#thortransaction.meta)

## Thor.Clause

+ `to` - `string|null`: The destination address of the message, null for a contract-creation transaction
+ `value`- `string|number`: The value, with a unit of `wei`, transferred through the transaction. Specifically, it plays the role of endowment when the transaction is contract-creation type
+ `data` - `string`: Either the [ABI byte string](http://solidity.readthedocs.io/en/latest/abi-spec.html) containing the data of the function call on a contract or the initialization code of a contract-creation transaction

## Thor.Transaction.Meta

+ `blockID` - `string`: Block identifier of transaction
+ `blockNumber` - `number`: Block number of transaction
+ `blockTimestamp` - `number`: Block unix timestamp of transaction

## Thor.Receipt

+ `gasUsed` - `number`: Actual gas used of block
+ `gasPayer` - `string`: Address of account who paid used gas
+ `paid` - `string`: Hex form of amount of paid energy
+ `reward` - `string`: Hex form of amount of reward
+ `reverted` - `boolean`: true means the transaction was reverted
+ `outputs` - [`Array<Thor.Receipt.Output>`](#thorreceiptoutput): Clause's corresponding outputs
+ `meta` - [`Thor.Log.Meta`](#thorlogmeta)

## Thor.Receipt.Output

+ `contractAddress` - `string`: Deployed contract address, if the corresponding clause is a contract deployment clause
+ `events` - [`Array<Thor.Log.Event>`](#thorlogevent): Event log objects produced during clause execution
+ `transfers` - [`Array<Thor.Log.Transfer>`](#thorlogtransfer) Transfer log produced during clause execution

## Thor.Log.Event

+ `address` - `string`: The address of contract which produces the event (bytes20)
+ `topics` - `Array<string>`: an array with max 5 32 Byte topics, topic 1-4 contains indexed parameters of the log
+ `data` - `string`: The data containing non-indexed log parameter
+ `meta`  - [`Thor.Log.Meta`](#thorlog.meta)
+ `decoded`  - [`Thor.Decoded(optional)`](#thordecoded): Decoded event log based on the event ABI

## Thor.Log.Transfer

+ `sender` - `string`: Address that sends vet.
+ `recipient` - `string`: Address that receives vet.
+ `amount` - `string`: Amount of vet in `wei`.
+ `meta`  - [`Thor.Log.Meta`](#thorlogmeta)

## Thor.Log.Meta

+ `blockID` - `string`: Block identifier of log
+ `blockNumber` - `number`: Block number of log
+ `blockTimestamp` - `number`: Block unix timestamp of log
+ `txID` - `string`: Transaction identifier of the log
+ `txOrigin` - `string`: Transaction signer the log

## Thor.VMOutput

+ `data` - `string`: The returned data of the operation(hex string), e.g. a smart contract function returned value
+ `vmError` - `string`: VM error that occurred during the execution
+ `reverted` - `boolean`: Indicated whether the execution is reverted by the VM
+ `events` - [`Array<Thor.Log.Event>`](#thorlogevent): Event logs that produced during the execution
+ `transfer` - [`Array<Thor.Log.Transfer`](#thorlogtransfer): Transfer logs that produced during the execution
+ `decoded`  - [`Thor.Decoded(optional)`](#thordecoded): Decoded returned data based on the method ABI

## Thor.Filter.Result

+ `Thor.Filter.Event.Result` - [`Thor.Log.Event`](#thorlogevent)
+ `Thor.Filter.Transfer.Result` - [`Thor.Log.Transfer`](#thorlogtransfer)

## Thor.Decoded

`Decoded` is a mixed object that produced by `ABI.decode` with the ABI definition of `EVENT` or `METHOD`. Decoded will be present only at the ABI definition is provided.

+ {index} - `number`: Decoded property by parameter index
+ {name} - `string`: Decoded property by parameter name if any
+ `revertReason` - `string(optional)`: Reason message when method call reverted. It's usually the second argument of `require` statement in Solidity, and helpful to diagnose contract code.

For example if a method's definition is `function name() public pure returns(string name)` after perform the simulate call `decoded` will be like following: 

``` javascript
{
    "0": "VeThor",
    "name": "VeThor"
}
```

You can access the name by calling `decoded['name']` or `decoded['0']`(Number index is for non-named outputs).

Another example if an event's definition is `event Transfer(address indexed _from, address indexed _to, uint256 _value)` after performing the filter `decoded` will be the following: 

``` javascript
{
    "0": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
    "1": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
    "2": "1000000000000000000",
    "_from": "0x7567D83b7b8d80ADdCb281A71d54Fc7B3364ffed",
    "_to": "0x00F34f4462c0f6a6f5E76Fb1b6D63F05A32eD2C6",
    "_value": "1000000000000000000"
}
```