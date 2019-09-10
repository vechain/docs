# Transaction Dependency 
VeChainThor provides a safety mechanism that allows users to force a TX to depend on the success of another TX. In other words, if this feature is turned on, the system will check the status of the TX the current TX depends on. Only if the status says successful, then the current TX will be accepted for processing by the system.
Here by successful, we mean two things:
the TX has been included in the ledger, and
it has been successfully executed, or not reverted in the blockchain language.
The second requirement is particularly important since seeing a TX included in the ledger does not guarantee that it has been successfully executed. A TX can be included, but with a status “Reverted” which means that the system does not actually do what the TX asks it to do. In practice, a TX can be reverted due to the insufficient amount of gas provided by the sender. It can also be reverted by the smart-contract function it calls. For instance, a TX would be reverted by a token-transfer function if the sender did not have a larger enough token balance.
Note that you can make your TX to depend on any TX as long as you provide its *TXID*. For the depended TX, there is no limitation on who sends it or when it is sent or what it is about. It offers developers a lot of flexibilities and we can only do that thanks to the design of the VeChainThor’s TXID.
Let me explain how such a mechanism is implemented in VeChainThor.
It has been done with the help of a field in the TX model, called `DependsOn` (see the `body` structure defined in `$THORDIR/tx/transaction.go`) as well as some extra validation logic implemented by the code below for validating TXs within a block (see function verifyBlock in `$THORDIR/consensus/validator.go`).

```
// check depended tx 
if dep := tx.DependsOn(); dep != nil { 
  found, reverted, err := findTx(*dep) 
  if err != nil { 
    return nil, nil, err 
  } 
  if !found { 
    return nil, nil, consensusError("tx dep broken") 
  } 
  if reverted { 
    return nil, nil, consensusError("tx dep reverted") 
  } 
}
```
Now let us have a close look at the code.
According to its definition, `DependsOn` is a pointer pointing to the ID of the TX it depends on. The first thing the code does is to get the value of the current TX's `DependsOn` value via `dep := tx.DependsOn()`. If the field is set, it goes to check the status of the referred TX using its TXID through `found, reverted, err := findTx(*dep)`. The rest of code first checks whether the TX exists and then whether it's been reverted. It rejects the current TX if either check fails.
Demo
I made a little demo to demonstrate the effectiveness of the forcible-TX-dependency mechanism I just talked about. The demo code is written in TypeScript and can be found here. I used two newly developed tools connex-framework and connex.driver-nodejs in my code. Together, they provide a convenient way for developers to interact with VeChainThor through the Connex interface in a NodeJS environment.

I hard coded two account addresses, named acc1 and acc2 and acc1's private key,
```
const sk = '0x29a9...1a7'; 
const acc1 = '0x858...2c4'; 
const acc2 = '0x914...85d';
```
and used the VeChain [TestNet Faucet](https://faucet.vecha.in/) to acquire sufficient funds for running the demo on the VeChainThor testnet.
What does the demo do?
The demo does the following things:
1. It sends TX `TX1` that transfers 1 VET from `acc1` to `acc2`. `TX1` is given sufficient amount of gas to allow it be successfully executed;
2. It sends TX `TX2` that transfers 1 VTHO from `acc1` to `acc2`. `TX2` is given insufficient amount of gas to make it reverted;
3. It sends TX `TX3` that transfers 1 VET from `acc1` to `acc2` and depends on a TX not existing in the ledger;
4. It sends TX `TX4` that transfers 1 VET from `acc1` to `acc2` and depends on `TX1`;
5. It sends TX `TX5` that transfers 1 VET from `acc1` to `acc2` and depends on `TX2`;
6. It then checks the status of the above five TXs whenever a new block is incoming within the period of five new blocks. It will show that `TX3` and `TX5` cannot be found since the TXs they depend on prevent them from being processed.
Note that I constructed TXs depending on TXs sent from the same account just for convenience. In practice, you can make your TX to depend on any TX as long as you provide its TXID.
Results
Now let us have a look at what the demo outputs for my run.

```
Sent TX1 with ID = 0x6f7874438429ce31d89b68ceb1dacf3fba012149b57f9781f6d9b5c707eedde5
... 
Sent TX2 with ID = 0x9f8f9bec9593f74d9353ac7f1087afa32646638155e6a448dc35d60788d958b5 ... 
Sent TX3 with ID = 0x319b70009a8234107a2d08c3dbf9e93396330892badb03b5c4cebac391d68c2d TX3 depends on an nonexisting TXID 
... 
Sent TX4 with ID = 0x1c30f07aae653711ab3284062afe557f1674c56d625114326230b041d79f9931 TX4 depends on TX1 
... 
Sent TX5 with ID = 0xd92e5ffcf3e9ff11f33c59b814869c23df75c7cc49773fcb95ccc8b9bd420a43 TX5 depends on TX2 ...
```

The first few lines give me some information of the five TXs the demo just created and sent to the VeChainThor testnet. We can see their TXIDs as well as all the TX dependencies. Note that The demo deliberately sets the `DependsOn` value of `TX3` as `0x1`, which means that `TX3` depends on a TX with a TXID equal to 0x1. Such a TX has not been found by far.

```
-------------------------- 
Block Number = 3170840 
-------------------------- 
... 
Checking TX1 with ID = 0x6f7874438429ce31d89b68ceb1dacf3fba012149b57f9781f6d9b5c707eedde5 ... 
TX1 found! If reverted: false 
... 
Checking TX2 with ID = 0x9f8f9bec9593f74d9353ac7f1087afa32646638155e6a448dc35d60788d958b5 ... 
TX2 found! If reverted: true 
... 
Checking TX3 with ID = 0x319b70009a8234107a2d08c3dbf9e93396330892badb03b5c4cebac391d68c2d ... 
TX3 not found! 
... 
Checking TX4 with ID = 0x1c30f07aae653711ab3284062afe557f1674c56d625114326230b041d79f9931 ... 
TX4 not found! 
... 
Checking TX5 with ID = 0xd92e5ffcf3e9ff11f33c59b814869c23df75c7cc49773fcb95ccc8b9bd420a43 ... 
TX5 not found! 
...After sending the TXs, the demo starts to check their status in the ledger every time it detects a new block, lasting for five consecutive blocks. At the time I ran the code, the first incoming new block was at the height of 3170840. The corresponding output shows that TX1 and TX2 were already included in the ledger. Moreover, we can see that TX2 was reverted by the system as what we wanted it to be.
```

After sending the TXs, the demo starts to check their status in the ledger every time it detects a new block, lasting for five consecutive blocks. At the time I ran the code, the first incoming new block was at the height of 3170840. The corresponding output shows that TX1 and TX2 were already included in the ledger. Moreover, we can see that TX2 was reverted by the system as what we wanted it to be.

```
-------------------------- 
Block Number = 3170841 
-------------------------- 
... 
Checking TX3 with ID = 0x319b70009a8234107a2d08c3dbf9e93396330892badb03b5c4cebac391d68c2d ... 
TX3 not found! 
... 
Checking TX4 with ID = 0x1c30f07aae653711ab3284062afe557f1674c56d625114326230b041d79f9931 ... 
TX4 found! If reverted: false 
... 
Checking TX5 with ID = 0xd92e5ffcf3e9ff11f33c59b814869c23df75c7cc49773fcb95ccc8b9bd420a43 ... 
TX5 not found! 
...
At the next block height (3170841), TX4 was logged in the ledger, but not TX3 and TX5. As expected, they were not found in the ledger at the next three block heights.

```
## Conclusion
In this article, I have described and demonstrated one particular VeChainThor feature that allows users to force a transaction dependency. In particular, if a TX is made to depends on another TX, it would be accepted for processing only when the referred TX has existed in the ledger and not been reverted.