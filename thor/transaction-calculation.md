# Transaction Calculation
## Transaction Gas Calculation

The total gas, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btotal%7D%7D" height = "14px" align=center />, required for a transaction can be computed as:

![image-4](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%24g_%7B%5Ctextrm%7Btotal%7D%7D%3Dg_0&plus;%5Csum_i%5Cbig%28g_%7B%5Ctextrm%7Btype%7D%7D%5Ei&plus;g_%7B%5Ctextrm%7Bdata%7D%7D%5Ei&plus;g_%7B%5Ctextrm%7Bvm%7D%7D%5Ei%5Cbig%29%24)

where 
<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_0%3D5%2C000" height = "14px" align=center />

<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btype%7D%7D%5Ei%3D48%2C000"  align=center /> if the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20i%5E%7B%5Ctextrm%7Bth%7D%7D" height = "14px" align=center /> clause is to create a contract or <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btype%7D%7D%5Ei%3D16%2C000"  align=center /> otherwise,

<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Bdata%7D%7D%5Ei%20%3D%204%20*%20n_%7Bz%7D%5Ei%20&plus;%2068%20*%20n_%7Bnz%7D%5Ei"  align=center /> where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Btype%7D%7D%5Ei%3D48%2C000"  align=center /> if the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n_%7Bz%7D%5Ei" height = "14px" align=center />is the number of bytes equal to zero within the data in the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20i%5E%7B%5C%2C%5Ctextrm%7Bth%7D%7D" height = "14px" align=center />clause and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n_%7Bnz%7D%5Ei" align=center /> the number of bytes not equal to zero,

and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20i%5E%7B%5C%2C%5Ctextrm%7Bth%7D%7D" height = "14px" align=center /> is the gas cost returned by the virtual machine for executing the <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g_%7B%5Ctextrm%7Bdata%7D%7D%5Ei" height = "14px" align=center /> clause.



## Proof of Work

VeChainThor allows the transaction-level proof of work and converts the proved work into extra gas price that will be used by the system to generate more reward to the block generator that includes the transaction. In other words, users can utilize their local computational power to make their transactions more likely to be included in a new block. 

In particular, the computational work can be proved through fields `Nonce` and `BlockRef` in the transaction model. Let <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n" height = "14px" align=center /> be the value of `Nonce`, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h_0" height = "14px" align=center /> the height of the block referred by `BlockRef`, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h" height = "14px" align=center /> the height of the block that includes the transaction and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20g" height = "14px" align=center /> the value of field `Gas`. The extra gas price <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center /> can be computed as:

![image-5](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20w%20%3D%20%5Cfrac%7B2%5E%7B256%7D-1%7D%7Bhash%5C%2C%5Cbig%28rlp%5C%2C%28%5COmega%5C%2C-%5C%7Bn%2C%5C%2Csig%5C%7D%5C%2C&plus;%5C%2Csigner%29%5C%2C%5Ccirc%5C%2Cn%5Cbig%29%7D)

![image-6](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p%3Dp%5E%7B%5Ctextrm%7Bbase%7D%7D%5CBig%28%5Cfrac%7B1%7D%7Bg%7D%5Cbig%28%5Cfrac%7Bw%7D%7B10%5E3%7D%5Cbig%29%5Cbig%28%5Cfrac%7B1%7D%7B1.04%7D%5Cbig%29%5E%7B%5Cfrac%7Bh%7D%7B2.592%5Ctimes%2010%5E5%7D%7D%5CBig%29)


where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5Ccirc" height = "8px" align=center /> denotes the operator that concatenates two byte array, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20rlp" height = "14px" align=center /> the function that performs the RLP encoding, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20sig" height = "14px" align=center /> the transaction signature and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20signer" height = "14px" align=center /> the address of the account that signs the transaction. 

Using the above formula, users can keep trying various *Nonce* value to maximize <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center />. However, a transaction sender is not given an infinite amount time to search for the desirable <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20n" height = "14px" align=center />.  In particular, a transaction has to satisfy <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5Cvert%20h-h_0%5Cvert%5Cleq%2030" height = "14px" align=center /> or otherwise <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center /> no matter how large <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p=0" height = "14px" align=center /> can be computed. Moreover, to prove that the local computation starts no later than the block with height <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20h_0" height = "14px" align=center />, the transaction sender has to fill `BlockRef` with the value equal to the first eight bytes of the ID of the referred block. 

## Total Gas Price

The total gas price for the transaction sender is computed as:

![image-7](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20p%5E%7B%5Ctextrm%7Btotal%7D%7D%3Dp%5E%7B%5Ctextrm%7Bbase%7D%7D&plus;p%5E%7B%5Ctextrm%7Bbase%7D%7D%5Cfrac%7B%5Cphi%7D%7B255%7D)

and the total price for block generators as 

![image-8](https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20p%5E%7B%5Ctextrm%7Btotal%7D%7D%3Dp%5E%7B%5Ctextrm%7Bbase%7D%7D&plus;p%5E%7B%5Ctextrm%7Bbase%7D%7D%5Cfrac%7B%5Cphi%7D%7B255%7D&plus;%5CDelta%20p)


where <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5Cphi" height = "14px" align=center /> is the value of field `GasPriceCoef` and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20%5CDelta%20p" height = "14px" align=center /> the extra gas price converted from the proven local computational work. 

It can be seen that the gas price used to calculate the transaction cost depends solely on the input gas-price coefficient while the reward for packing the transaction into a block varies due to the transaction-level proof-of-work mechanism.