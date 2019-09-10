# Designated Fee Delegation 

The TX-fee-delegation mechanism (both VIP-191 and MPP) on VeChainThor. The demo is built using tools [connex-framework](https://github.com/vechain/connex-framework) and [connex.driver-nodejs](https://github.com/vechain/connex.driver-nodejs) that implement the [Connex](https://github.com/vechain/connex) interface in a NodeJS environment. 

There are three accounts used in the demo:

1. `SENDER` whose address begins with `0xd551`,
2. `DELEGATOR` (or gas-payer) whose address begins with `0xe466`, and
3. `RECIPIENT` whose address begins with `0x9143`.
To demonstrate VIP-191, I created one TX from `SENDER` to `RECIPIENT`. The TX was co-signed by `SENDER` and `DELEGATOR` to allow TX fee paid by `DELEGATOR`.

To demonstrate MPP, I created two TXs sent from `DELEGATOR` to call functions of the built-in contract Prototype to add a payer-user relation and funding plan as described above. I then created one TX from `SENDER` to `DELEGATOR` to demonstrate the effect of MPP. Note that `DELEGATOR` is the master of itself since it is a normal account rather than a contract. The TX can only be sent to `DELEGATOR` or otherwise it wouldn't be funded by `DELEGATOR` according to the rules set by MPP.

## CONNEX INTERFACE FOR VIP-191

The Connex interface has been updated to support VIP-191. I want to show you that it is pretty easy to use Connex to construct a VIP-191 enabled TX.

There are two extra things you need to do on top of the normal procedure of constructing a TX:

Create your own function with the following definition:

`function (unsignedTx: { raw: string, origin: string }): Promise`

This function is typically responsible for send data to the gas-payer, waiting for its response and returns a Promise, if resolved, carrying the gas-payer's digital signature on the corresponding TXID.

Pass the function to the instance of `Connex.Vendor.TxSigningService`, as you've already created for TX construction, via the `delegate` method. For instance, you may add a line such as:

`signingService.delegate(MyFunc);`

That's it!

>Note that the function I made in the demo code is NOT a typical function you would see in a real application. It is created purely for this demo and should not be considered as an example of creating such a function.

Results output

```
--------------------------
VIP-191
--------------------------
TXID       = 0xb58e1d1bf9da3414c24df51926003ebcbac7eb10246dd25548ccfd9202d4276e
From       = 0xd55100eedb61f1e553a38c33a234ce07952c43f2
To         = 0x91436f1E5008B2E6093E114A25842F060012685d
GasPayer   = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
GasUsed    = 21000
...
```

The first part shows information of the VIP-191 enabled TX. It can be seen that the actual gas-payer was indeed DELEGATOR rather than `SENDER`.

```
--------------------------
MPP - Add User
--------------------------
TXID       = 0x508f50692c88054c5f8df982937b2871cae3cde002a4bc58e975277acca53c87
From       = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
To         = 0x000000000000000000000050726f746f74797065
GasPayer   = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
GasUsed    = 25074
...
--------------------------
MPP - Add Credit Plan
--------------------------
TXID       = 0x57329507daadb47a8ea68375577f9699fce3f1329df4703451be36d3804aa853
From       = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
To         = 0x000000000000000000000050726f746f74797065
GasPayer   = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
GasUsed    = 44811
...
```

The second part shows information of the two TXs `DELEGATOR` sent to the built-in contract Prototype to activate MPP for `SENDER`. The overhead costs for adding a user and a credit plan are 25k and 45k gas, respectively.

```
--------------------------
MPP - User Sends TX
--------------------------
TXID       = 0x87b68a65105f2cc5746b88e1e0fd5e1cf4f6d2dbf8459bb8ef2599957ffcb655
From       = 0xd55100eedb61f1e553a38c33a234ce07952c43f2
To         = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
GasPayer   = 0xe4660c72dea1d9fc2a0dc2b3a42107d37edc6327
GasUsed    = 21000
```

The last part shows the TX sent from `SENDER` to `DELEGATOR` is indeed paid by `DELEGATOR` under MPP.