---
sidebarDepth: 2
---

# Activities 
<p align="center">
<img height="480" src="~@public/images/sync2/activities.png" >
</p>

## Activities status

### Ongoing 
- <img src="~@public/images/sync2/done.svg" align=center /> **Sending** :  Signed content is awaiting to be processed and not being packed into a block.

- <img src="~@public/images/sync2/query_builder.svg" align=center /> **Confirming** : Transaction is packed into a block and can be "View" on the blockchain but required 12 blocks to confirm. 

:::tip Note
- Unstable connection to the transaction pool may cause the transactions to fail. Sync2 will automatically retry the transaction request until it expires. Once expired, Sync2 will update the status to "expired".

- Transaction required 12 blocks to be confirmed.
:::
### Completed
- <img src="~@public/images/sync2/done_all.svg" align=center /> **Confirmed**: Transaction has been confirmed more than 12 blocks or signed a certificate. 

- **Expired**: The transaction reached the limit of expiration or the VTHO is not enough to compute the transaction. 

- **Reverted**: Several reasons may cause the transaction to revert.

:::tip Note
- Reverted transaction will deduct the VTHO due to vm(virtual machine) computed 
- All the signed transactions/certificates are **stored in local**, therefore, it only shows the transaction/content which you signed on the device.
:::

## View On explorer <badge text="Transaction Only"/>
1. Click the transaction to expand the details
2. Click <img src="~@public/images/sync2/search.svg" align=center /> to check on [explorer](https://explorer.vechain.org)
## Copy TxID <badge text="Transaction Only"/>
1. Click the transaction to expand the details
2. Click <img src="~@public/images/sync2/content_copy.svg" align=center /> to copy the transaction ID
## Link to DApp
1. Click the transaction to expand the details
2. Click <img src="~@public/images/sync2/link.svg" align=center /> to direct to the link which DApps provided

## View signed content <badge text="Certificate Only"/>
1. Click the certificate to check the details
2. Click <img src="~@public/images/sync2/message.svg" align=center /> to check original signed content