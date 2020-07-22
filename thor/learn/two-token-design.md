# Two-token Design
## Concept
Financial characteristics are inherent in every blockchain. A proper economic model is one of the fundamental elements in a blockchain ecosystem, and a key factor for its success. We have learned from our business partners, especially corporations and enterprise business owners, that one of major obstacles to adopting blockchain technologies is the unpredictability of the cost of using blockchain, thanks to the volatility of cryptocurrencies. 
To tackle the problem, we design a bi-token system that includes the VeChain Token (VET) and VeThor Token (VTHO). The function of VET is to serve as value-transfer medium, or in other words, smart money, to enable rapid value circulation within the VeChainThor ecosystem. On the other hand, VTHO represents the underlying cost of using VeChainThor and will be consumed (or, in other words, destroyed) after on-chain operations are performed. According to our design, VTHO is generated from holding VET with a constant speed. In this way, we are able to detach the direct cost of using VeChainThor from the VET price.
Let $V$  be the amount of VET, $t$  the amount of time (in terms of the number of blocks) and $v$  the VTHO generation speed. Mathematically, we can write

$$E_{\textrm{gen}} = v \cdot V \cdot t$$

where $E_{\textrm{gen}}$ denotes the amount of VTHO generated from holding $V$  VET. On the other hand, for each transaction, given $G$  be the amount of Gas required to process the transaction by the system and$p$  the gas price in VTHO given by the transaction sender, we can calculate the amount of VTHO consumed for the transaction as:

$$E_{\textrm{con}} = p\cdot G$$

Velocity $v$  is a constant equal to $5\times10^{-8}$ VTHO per VET per block. In other words, if you had 10K VET, you would be given at most 4.32 VTHO every 24 hours. The gas price $p$ can vary in the range $\big[p^{\textrm{base}},2\cdot p^{\textrm{base}}\big]$ where $p^{\textrm{base}}$ is a parameter that can be adjusted according to the market supply and demand of VTHO. Currently, we set $p^{\textrm{base}} = 1 \,\textrm{VTHO}\,/\,\textrm{Kgas}$.

## VeChain Token (VET)

| VET | |
| --- | --- |
| Type | Native Coin |
| Precision | 18 decimal places |
| Total supply | 86,712,634,466  |

## VeThor Token (VTHO)

| VTHO | |
| --- | --- |
| Type | [VIP180](https://github.com/vechain/VIPs/blob/master/vips/VIP-180.md)  |
| Token contract address | 0x0000000000000000000000000000456E65726779 |
| Precision | 18 decimal places |
| Supply | VTHO is the energy or the cost of carrying on the payment and smart contract transactions on the VeChainThor blockchain. VTHO is generated from VET in each block over time in a linear manner. (0.00000005VTHO is generated per VET per block)  |
| Consumption | 70% of the transaction fee paid in VTHO in each block is burned and the remaining 30% is rewarded to the Authority Masternode which produces the block |
