# Transaction Calculation
## Intrinsic Gas Calculation
The intrinsic gas for a transaction is the amount of the transaction used before any code runs. in other words, it's a constant "transaction fee" plus a fee for every byte of data supplied with the transaction.The gas in the transaction needs to be **greater than or equal to** the intrinsic gas used by the transaction.

$$g_{\textrm{intrinsic}} = g_{\textrm{0}} + g_{\textrm{type}} + g_{\textrm{data}}$$

- $g_{\textrm{0}}$ is the constant transaction fee 5,000
- There are two types of $g_{\textrm{type}}$
  - Regular transaction : 16,000
  - Contract creation : 48,000
- $g_{\textrm{data}} = 4 * n_{z} + 68 * n_{nz}$ 
  - $n_{nz}$ is the number of bytes **equal to zero** within the data in the $i^{\,\textrm{th}}$  clause and $n_{nz}$ the number of bytes **not equal to zero**

## Total Transaction Gas Calculation
VeChainThor clauses allows a single transaction to carry out multiple tasks. Therefore, it needs to execute all the clauses cost in the transaction.

The total gas, $g_{\textrm{total}}$, required for a transaction can be computed as:
$$g_{\textrm{total}}=g_0+\sum_i\big(g_{\textrm{type}}^i+g_{\textrm{data}}^i+g_{\textrm{vm}}^i\big)$$

- where $g_0=5,000$

- There are two types of $g_{\textrm{type}}$
  - Regular transaction : 16,000
  - Contract creation : 48,000
  
- $g_{\textrm{data}}^i = 4 * n_{z}^i + 68 * n_{nz}^i$ 
  - $n_{nz}^i$ is the number of bytes **equal to zero** within the data in the $i^{\,\textrm{th}}$  clause and $n_{nz}^i$ the number of bytes **not equal to zero**
  
- $g_{\textrm{vm}}^i$ is the gas cost returned by the **virtual machine** for executing the $i^{\,\textrm{th}}$ clause.

## Proof of Work
VeChainThor allows the transaction-level proof of work and converts the proved work into extra gas price that will be used by the system to generate more reward to the block generator that validates the transaction. In other words, users can utilize their local computational power to make their transactions more likely to be included in a new block.

In particular, the computational work can be proved through fields `Nonce` and `BlockRef` in the transaction model. Let $n$ and $g$ represent the values of TX fields `Nonce` and `Gas`, respectively. We use $b$ to denote the number of the block indexed by TX field `BlockRef` and $h$ the number of the block that includes the TX. Let Ω denote the TX without fields `Nonce` and `Signature`, $S$ the TX sender's account address, $P$ the base gas price, $H$ the hash function and $E$ the RLP encoding function.

The PoW, $w$, is defined as:

$$w=\min\left(2^{64}-1,\frac{2^{256}-1}{H\Big(H\big(E(\Omega\,\vert\vert\,S)\big)\,\big\vert\big\vert\,n\Big)}\right)$$

The extra gas price, $\Delta$, is computed as:

$$\Delta P=P_0\left(\frac{1}{g}\min
\left[g,\frac{w}{10^3}\left(\frac{1}{1.04}\right)^{\frac{h-1}{3600\times 24\times 3}}\right]\right)$$

with the following constraint

$$|h-h_0| <= 30$$

The VTHO reward $r$ for packing the TX into a new block is computed as:

$$r=\frac{3}{10}\,g^*\Big(P_0\,(1+\phi)+\Delta P\Big)$$

where $\phi \in [0,1]$  is the gas price coefficient and $g^*$ the actual amount of gas used for executing the TX.

From the above equations, we know that

1. Since $h_0$ is a valid block number, `BlockRef` must refer to an existing block, that is, its value must equal the first four bytes of an existing block ID;
2. The TX must be packed into a block within the period of 30 blocks after block $b$, or otherwise, the PoW would not be recognized by the system;
3. The extra gas price $\Delta P$ can not be greater than base gas price P.

## Total Gas Price
The total gas price for the transaction sender is computed as:

$$p^{\textrm{total}}=p^{\textrm{base}}+p^{\textrm{base}}\frac{\phi}{255}$$

and the total price for block generators as 
$$p^{\textrm{total}}=p^{\textrm{base}}+p^{\textrm{base}}\frac{\phi}{255}+\Delta p$$
where $\phi$ is the value of field `GasPriceCoef`(is the bounded interval between **0-255**) and $\Delta p$ the extra gas price converted from the proven local computational work. 

It can be seen that the gas price used to calculate the transaction cost depends solely on the input gas-price coefficient while the reward for packing the transaction into a block varies due to the transaction-level proof-of-work mechanism.
