# Fee Delegation Comparison

## Multi-Party Payment (Prototype)

MPP was designed from the point of view of a DApp owner who controls a bunch of contracts running on chain.Moreover, MPP requires writing data on chain.

## Designated Fee Delegation (VIP191)

VIP-191 is aimed to supplement MPP to provide more flexibility for TX fee delegation on VeChainThor. In particular, it allows a TX sender to seek for an arbitrary party, not necessarily the TX recipient, who is willing to pay for the TX.


## Comparison 
Compared with MPP, VIP-191 gives control back to TX senders to activate the protocol. Moreover, it does not introduce any overhead cost. However, it requires the TX sender and gas-payer to be both online to complete the TX while MPP does not. In terms of transparency, MPP is the better option since the gas-payer will have to explicitly put his/her intension to fund TXs from a particular account on chain.

|  | Common To | Backend | User list Storage  | Native Fature | Flexibility |
| --- | --- | --- | --- | --- | --- |
| MPP | ✓ | X  | BlockChain | ✓ | Configuration for all user |
| VIP191 | X  | ✓ | Backend | ✓ | Configuration for individuals  |