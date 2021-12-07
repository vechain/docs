# Proof of Authority 

One of the biggest decisions when designing a public blockchain system is about designing the consensus algorithm. The protocol not only dictates how blockchain participants agree on the blockchain grows but embodies the governance model imposed upon the system. 

Recall that the underlying design philosophy of our governance model is that 

*neither a total centralization nor a total decentralization would be the correct answer, but a compromise from and balance of both would*. 

VeChainThor implements the Proof of Authority (PoA) consensus algorithm which suits our governance model which states that there would not be anonymous block producers, but a fixed number of known validators (Authority Masternodes) authorized by the steering committee of the VeChain Foundation. 

::: tip Quote
“It takes twenty years to build a reputation and five minutes to ruin it. If you think about that, you’ll do things differently.” – Warren Buffet
:::

To be an Authority Masternode (AM), the individual or entity voluntarily discloses who they are (identity and reputation by extension) to the VeChain Foundation in exchange for the right to validate and produce blocks. It is their identities and reputations placed at stake that give all the AMs additional incentives to behave and keep the network secure. In VeChainThor, each AM has to go through a strict know-your-customer (KYC) procedure and satisfy the minimum requirements set by the Foundation.

When discussing a consensus algorithm, we must answer the following questions: 

* When is a new block produced? 
* Who generates the block? 
* How to choose the "trunk" from two legitimate blockchain branches?

## When

VeChainThor schedules a new block to be generated once every $\Delta$ seconds. We set $\Delta=10$, which is based on our estimation of the usage of VeChainThor.  Let $t_0$ be the timestamp of the genesis block. The timestamp of the block with height $h>0$ and $t_h$ ,must satisfy $_h=t_0+m\Delta$ where $m\in \mathbb{N}^+$ and $>=h$. 

## Who

PoA allows every available AM to have an equal opportunity to be selected to produce blocks. To do that, we introduce a Deterministic Pseudo-Random Process (DPRP) and the “active/inactive” AM status to decide whether a particular AM  $a$ is legitimate for producing a block$(h,t)$ with height $h$(`uint32`) and timestamp $t$(`uint64`). Here $t$ must satisfy $(t-t_0)mod\Delta=0$. We first define the DPRP to generate a pseudo-random number $\gamma (h,t)$ as:

$$\gamma (h,t) = DPRP (h,t) = hash(h \circ t)$$

where $\circ$ denotes the operation that concatenates two byte arrays. 

Let $A_B$ denote the sorted set of AMs with the “active” status in the state associated with block $B$ . Note that in VeChainThor each AM is given a fixed index number and the numbers are used to sort elements in $A_B$. To verify whether $a$ is the legitimate AM for producing $B(h,t), we first define 

$$A_{B(h,t)}^a=sort\big(A_{PA(B(h,t))}) \cup a$$

where $PA(\cdot)$ returns the parent block. We then compute index $i^a(h,t)$  as:

$$i^a (h,t)=\gamma(h,t)\,\textrm{mod}\,\|A_{B(h,t)}^a\|$$

AM $a$ is the legitimate producer of $B(h,t)$ if and only if $A_{B(h,t)}^a\big[i^a (h,t)\big]=a$. Note that we put double quotes around the word “active” to emphasize that the status does not directly reflect the physical condition of a certain AM, but merely a status derived from the incoming information from the network. 

### AM Status Updating
Given the latest block $B(h,t_1)$ and its parent $B(h-1,t_0)$, for any $t_0<t<t_1$ and $(t-t_0)\,\textrm{mod}\,\Delta=0$, the system computes AM $a_t$ such that 

$$ A_{B(h,t_1)}^{a_t}\big[i^{a_t}(h,t)\big]=a_t$$

and mark $a_t$ as "inactive" in the state associated with $B(h,t_1)$. In addition, the system always sets the status of the AM that generates $B(h,t_1)$ as "active". Note that we set all the AMs as "active" from the beginning.

## Trunk

The final question we need to answer is how to choose the “trunk” from two legitimate blockchain branches. Since there is no computational competition in PoA, the “longest chain” rule does not apply. Instead, we consider the better branch as the one witnessed by more AMs. 

To do that, we compute the accumulated witness number (AWN),  $\pi$, for block $B(h,t)$ as:

$$\pi_{B(h,t)}=\pi_{PA(B(h,t))}+\|A_{B(h,t)}\|$$


with $\pi_{B_{\textrm{genesis}}}=0$. Since $\|A_{B(h,t)}\|$ computes the number of AMs with “active” status associated with $B(h,t)$, it can be viewed as the number of AMs that witness the generation of $B(h,t)$. Therefore, we select the branch with the larger AWN as the trunk. If the AWNs are the same, we choose the branch with less length. Note that the AWN is stored in the block header as `TotalScore`.

Formally, given two branches <$\mathcal{B}_1$ and $\mathcal{B}_2$ with their latest blocks  $B_1(h_1,t_1)$ and $B_2(h_2,t_2)$, respectively, we first calculate their AWNs $\pi_{B_1}$ and $\pi_{B_2}$. The system then makes the following decision: choose ${B}_1$ as the trunk if $\pi_{B_1}>\pi_{B_2}$, or ${B}_2$ if $\pi_{B_1}<\pi_{B_2}$. In case  $\pi_{B_1}=\pi_{B_2}$, choose ${B}_1$  if $h_1<h_2 $or ${B}_2$ if $h_1>h_2$. If $h_1=h_2$, keep the current trunk.