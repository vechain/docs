#  Block
VeChainThor defines a [block](https://github.com/vechain/thor/blob/master/block/block.go) in Golang as:

```go
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

where `ParentID` is the ID of the parent block, `Beneficiary` is the address assigned by the block generator to receive reward (in VTHO), and `TotalScore` is the accumulated witness number of the chain branch headed by the block. We will describe what the score means when describing the [Proof of Authority consensus algorithm](#proof\of\authority).

Let <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CGamma" height = "14px" align=center /> denote `headerBody`. The block ID (`thor.Bytes32`) can be computed as:

![image-8](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20BlkID%20%3D%20h%20%5Ccirc%20%5Cbig%28hash%5C%2C%28%5CGamma-%5C%7Bsig%5C%7D%29%5Cbig%29%5B4%3A%5D)

where $h$ is the block number stored as a `uint32` and $[4:]$ the operation that discards the first four bytes.