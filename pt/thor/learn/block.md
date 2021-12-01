
#  Block
VeChainThor defines a [block](https://github.com/vechain/thor/blob/master/block/block.go) in Golang as:

```go
// block.go

type Block struct {
	header *Header
	txs    tx.Transactions
}

type Header struct {
	body headerBody
}

type headerBody struct {
	ParentID    thor.Bytes32
	Timestamp   uint64
	GasLimit    uint64
	Beneficiary thor.Address

	GasUsed    uint64
	TotalScore uint64

	TxsRoot      thor.Bytes32
	StateRoot    thor.Bytes32
	ReceiptsRoot thor.Bytes32

	Signature []byte
}

type Transactions []*Transaction
```

where `ParentID` is the ID of the parent block, `Beneficiary` is the address assigned by the block generator to receive reward (in VTHO), and `TotalScore` is the accumulated witness number of the chain branch headed by the block. We will describe what the score means when describing the [Proof of Authority consensus algorithm](./proof-of-authority.md).

Let $\Gamma$ denote `headerBody`. The block ID (`thor.Bytes32`) can be computed as:

 $BlkID = h \circ \big(hash\,(\Gamma-\{sig\})\big)[4:]$

where $h$ is the block number stored as a `uint32` and $[4:]$ the operation that discards the first four bytes.