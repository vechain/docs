# Two-token Design
Financial characteristics are inherent in every blockchain. A proper economic model is one of the fundamental elements in a blockchain ecosystem, and a key factor for its success. We have learned from our business partners, especially corporations and enterprise business owners, that one of major obstacles to adopting blockchain technologies is the unpredictability of the cost of using blockchain, thanks to the volatility of cryptocurrencies. 

To tackle the problem, we design a bi-token system that includes the VeChain Token (VET) and VeThor Token (VTHO). The function of VET is to serve as value-transfer medium, or in other words, smart money, to enable rapid value circulation within the VeChainThor ecosystem. On the other hand, VTHO represents the underlying cost of using VeChainThor and will be consumed (or, in other words, destroyed) after on-chain operations are performed. According to our design, VTHO is generated from holding VET with a constant speed. In this way, we are able to detach the direct cost of using VeChainThor from the VET price.

Let <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20V" height = "14px" align=center />  be the amount of VET, <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20t" height = "14px" align=center />  the amount of time (in terms of the number of blocks) and <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20v" height = "14px" align=center />  the VTHO generation speed. Mathematically, we can write

![eGneration](https://latex.codecogs.com/svg.latex?E_%7B%5Ctextrm%7Bgen%7D%7D%20%3D%20v%20%5Ccdot%20V%20%5Ccdot%20t)

where <img src="https://latex.codecogs.com/svg.latex?E_%7B%5Ctextrm%7Bgen%7D%7D" height = "14px" align=center /> denotes the amount of VTHO generated from holding <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20V" height = "14px" align=center />  VET. On the other hand, for each transaction, given <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20G" height = "14px" align=center />  be the amount of Gas required to process the transaction by the system and<img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20p" height = "14px" align=center />  the gas price in VTHO given by the transaction sender, we can calculate the amount of VHTO consumed for the transaction as:

![energyconsumed](https://latex.codecogs.com/svg.latex?E_%7B%5Ctextrm%7Bcon%7D%7D%20%3D%20p%5Ccdot%20G)

Velocity <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20v" height = "14px" align=center />  is a constant equal to <img src="https://latex.codecogs.com/svg.latex?5%5Ctimes10%5E%7B-8%7D" height = "14px" align=center /> VTHO per VET per block. In other words, if you had 10K VET, you would be given at most 4.32 VTHO every 24 hours. The gas price <img src="https://latex.codecogs.com/svg.latex?%5Cinline%20%5Clarge%20p" height = "14px" align=center />  can vary in the range <img src="https://latex.codecogs.com/svg.latex?%5Cbig%5Bp%5E%7B%5Ctextrm%7Bbase%7D%7D%2C2%5Ccdot%20p%5E%7B%5Ctextrm%7Bbase%7D%7D%5Cbig%5D"  align=center /> where <img src="https://latex.codecogs.com/svg.latex?p%5E%7B%5Ctextrm%7Bbase%7D%7D"  align=center /> is a parameter that can be adjusted according to the market supply and demand of VTHO. Currently, we set <img src="https://latex.codecogs.com/svg.latex?p%5E%7B%5Ctextrm%7Bbase%7D%7D%20%3D%201%20%5C%2C%5Ctextrm%7BVTHO%7D%5C%2C/%5C%2C%5Ctextrm%7BKgas%7D" align=center />.

# Tokens

| VET | |
| --- | --- |
| Type | Native Coin |
| Precision | 18 decimal places |
| Total supply | 86,712,634,466  |

## VTHO

| VTHO | |
| --- | --- |
| Type | VIP180 token |
| Token contract address | 0x0000000000000000000000000000456E65726779 |
| Precision | 18 decimal places |
| Supply | VTHO is the energy or the cost of carrying on the payment and smart contract transactions on the VeChainThor blockchain. VTHO is generated from VET in each block over time in a linear manner. (0.00000005VTHO is generated per VET per block)  |
| Consumption | 70% of the transaction fee paid in VTHO in each block is burned and the remaining 30% is rewarded to the Authority Masternode which produces the block |
