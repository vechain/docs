Proof of Authority 

One of the biggest decisions when designing a public blockchain system is about designing the consensus algorithm. The protocol not only dictates how blockchain participants agree on the blockchain grows but embodies the governance model imposed upon the system. 

Recall that the underlying design philosophy of our governance model is that 

*neither a total centralization nor a total decentralization would be the correct answer, but a compromise from and balance of both would*. 

VeChainThor implements the Proof of Authority (PoA) consensus algorithm which suits our governance model which states that there would not be anonymous block producers, but a fixed number of known validators (Authority Masternodes) authorized by the steering committee of the VeChain Foundation. 

>“It takes twenty years to build a reputation and five minutes to ruin it. If you think about that, you’ll do things differently.” – Warren Buffet

To be an Authority Masternode (AM), the individual or entity voluntarily discloses who they are (identity and reputation by extension) to the VeChain Foundation in exchange for the right to validate and produce blocks. It is their identities and reputations placed at stake that give all the AMs additional incentives to behave and keep the network secure. In VeChainThor, each AM has to go through a strict know-your-customer (KYC) procedure and satisfy the minimum requirements set by the Foundation.

When discussing a consensus algorithm, we must answer the following questions: 

* When is a new block produced? 
* Who generates the block? 
* How to choose the "trunk" from two legitimate blockchain branches?

## When

VeChainThor schedules a new block to be generated once every <img src="https://latex.codecogs.com/svg.latex?\large&space;\Delta" height = "14px" align=center /> seconds. We set <img src="https://latex.codecogs.com/svg.latex?\large&space;\Delta" height = "14px" align=center />=10, which is based on our estimation of the usage of VeChainThor.  Let <img src="https://latex.codecogs.com/svg.latex?\large&space;t_0" height = "14px" align=center /> be the timestamp of the genesis block. The timestamp of the block with height  <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20h%3E0" height ="14px" align=center /> , <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20t_h" height ="14px" align=center />,must satisfy <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%24t_h%3Dt_0&plus;m%5CDelta%24" height ="14px" align=center /> where <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%24m%5Cin%20%5Cmathbb%7BN%7D%5E&plus;%24" height ="14px" align=center /> and <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%24m%5Cgeq%20h%24" height ="14px" align=center />. 

## Who

PoA allows every available AM to have an equal opportunity to be selected to produce blocks. To do that, we introduce a deterministic pseudo-random process (DPRP) and the “active/inactive” AM status to decide whether a particular AM  <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20a" height = "14px" align=center /> is legitimate for producing a block <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%24B%28h%2Ct%29%24" height = "14px" align=center /> with height <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20h" height = "16px" align=center /> (`uint32`) and timestamp <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20t" height = "16px" align=center />(`uint64`). Here <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20t" height = "16px" align=center /> must satisfy <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%28t-t_0%29%5C%2C%5Ctextrm%7Bmod%7D%5C%2C%5CDelta%3D0" height = "14px" align=center />. We first define the DPRP to generate a pseudo-random number <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cgamma%28h%2Ct%29" height = "14px" align=center /> as:

![image1](https://latex.codecogs.com/svg.latex?%5Clarge%20%24%5Cgamma%28h%2Ct%29%3DDPRP%5C%2C%28h%2Ct%29%3D%20hash%5C%2C%28h%5Ccirc%20t%29%24)


where <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Ccirc" height = "8px" align=center /> denotes the operation that concatenates two byte arrays. 

Let <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20A_B" height = "16px" align=center /> denote the sorted set of AMs with the “active” status in the state associated with block <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B" height = "16px" align=center /> . Note that in VeChainThor each AM is given a fixed index number and the numbers are used to sort elements in <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20A_B" height = "16px" align=center />. To verify whether <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20a" height = "14px" align=center /> is the legitimate AM for producing <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct%29" height = "16px" align=center />, we first define 

![image-1](https://latex.codecogs.com/svg.latex?%5Clarge%20A_%7BB%28h%2Ct%29%7D%5Ea%3Dsort%5Cbig%28A_%7BPA%28B%28h%2Ct%29%29%7D%20%5Ccup%20a%5Cbig)

where <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20PA%28%5Ccdot%29" height = "16px" align=center /> returns the parent block. We then compute index <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20i%5Ea%28h%2Ct%29" height = "16px" align=center />  as:

![image-2](https://latex.codecogs.com/svg.latex?%5Clarge%20i%5Ea%20%28h%2Ct%29%3D%5Cgamma%28h%2Ct%29%5C%2C%5Ctextrm%7Bmod%7D%5C%2C%5C%7CA_%7BB%28h%2Ct%29%7D%5Ea%5C%7C)


AM<img src="https://latex.codecogs.com/svg.latex?%5Clarge%20a" height = "14px" align=center /> is the legitimate producer of <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct%29" height = "16px" align=center />  if and only if <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20A_%7BB%28h%2Ct%29%7D%5Ea%5Cbig%5Bi%5Ea%20%28h%2Ct%29%5Cbig%5D%3Da" height = "16px" align=center />. Note that we put double quotes around the word “active” to emphasize that the status does not directly reflect the physical condition of a certain AM, but merely a status derived from the incoming information from the network. 

### AM Status Updating
Given the latest block <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct_1%29" height = "16px" align=center /> and its parent<img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h-1%2Ct_0%29" height = "16px" align=center />, for any <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20t_0%3Ct%3Ct_1" height = "16px" align=center /> and <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%24%28t-t_0%29%5C%2C%5Ctextrm%7Bmod%7D%5C%2C%5CDelta%3D0%24" height = "16px" align=center />, the system computes AM <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20a_t" height = "16px" align=center /> such that 

![image-3](https://latex.codecogs.com/svg.latex?%5Clarge%20A_%7BB%28h%2Ct_1%29%7D%5E%7Ba_t%7D%5Cbig%5Bi%5E%7Ba_t%7D%28h%2Ct%29%5Cbig%5D%3Da_t)

and mark <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20a_t" height = "16px" align=center /> as "inactive" in the state associated with <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct_1%29" height = "16px" align=center />. In addition, the system always sets the status of the AM that generates <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct_1%29" height = "16px" align=center /> as "active". Note that we set all the AMs as "active" from the beginning.

## Trunk

The final question we need to answer is how to choose the “trunk” from two legitimate blockchain branches. Since there is no computational competition in PoA, the “longest chain” rule does not apply. Instead, we consider the better branch as the one witnessed by more AMs. 

To do that, we compute the accumulated witness number (AWN),  <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi" height = "8 px" align=center />, for block <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct%29" height = "16 px" align=center /> as:

![image-4](https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB%28h%2Ct%29%7D%3D%5Cpi_%7BPA%28B%28h%2Ct%29%29%7D&plus;%5C%7CA_%7BB%28h%2Ct%29%7D%5C%7C)

with <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB_%7B%5Ctextrm%7Bgenesis%7D%7D%7D%3D0" height = "16 px" align=center />. Since <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5C%7CA_%7BB%28h%2Ct%29%7D%5C%7C" height = "16 px" align=center /> computes the number of AMs with “active” status associated with <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct%29" height = "16 px" align=center />, it can be viewed as the number of AMs that witness the generation of <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B%28h%2Ct%29" height = "16 px" align=center />. Therefore, we select the branch with the larger AWN as the trunk. If the AWNs are the same, we choose the branch with less length. Note that the AWN is stored in the block header as `TotalScore`.

Formally, given two branches <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cmathcal%7BB%7D_1" height = "16 px" align=center /> and <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cmathcal%7BB%7D_2" height = "16 px" align=center /> with their latest blocks  <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B_1%28h_1%2Ct_1%29" height = "16 px" align=center /> and <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20B_2%28h_2%2Ct_2%29" height = "16 px" align=center />, respectively, we first calculate their AWNs <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB_1%7D" height = "16 px" align=center /> and <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB_2%7D" height = "16 px" align=center />. The system then makes the following decision: choose <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%7BB%7D_1" height = "16 px" align=center /> as the trunk if <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB_1%7D%3E%5Cpi_%7BB_2%7D" height = "16 px" align=center />, or <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%7BB%7D_2" height = "16 px" align=center />  if <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB_1%7D%3C%5Cpi_%7BB_2%7D" height = "16 px" align=center />. In case  <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%5Cpi_%7BB_1%7D%3D%5Cpi_%7BB_2%7D" height = "16 px" align=center />, choose <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%7BB%7D_1" height = "16 px" align=center />  if <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20h_1%3Ch_2" height = "16 px" align=center /> or <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20%7BB%7D_2" height = "16 px" align=center /> if <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20h_1%3Eh_2" height = "16 px" align=center />. If <img src="https://latex.codecogs.com/svg.latex?%5Clarge%20h_1%3Dh_2" height = "16 px" align=center />, keep the current trunk.