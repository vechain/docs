---
sidebarDepth: 2
editLink: false 
---
# FAQ

## Add custom network
see [Add node](../sync2/user-guide/settings.html#add-node) for more details

## Custom wallet
see [Specific network](../sync2/user-guide/wallet.md#specific-network) for more details

## Signing warning
Many reasons may cause the transaction failed/reverted. below are some causes: 

### Insufficient VTHO
it means that the address does not have enough VTHO to send the transaction. Please make sure you have enough VTHO before sending the transaction. 

### Failed to request transaction fee delegation
Network condition may affect connection between Sync2 and fee delegation service. You may try the following: 

1. Retry signing process
2. Check your network connection status
3. Disconnect Wi-Fi and try with cellular data 

:::tip 
If the error still occurs, please contact the Dapp developers for further assistance
:::

### Requested address not owned
Before the user confirms the transaction/certificate details, Sync2 will automatically ensure the designated signer(address) exists in Sync2.

## Ledger troubleshoots
### INS_NOT_SUPPORTED (0x6d00)
   - Ensuring your device runs the latest firmware version.
   - Reinstalling the apps on your device so you run the latest versions. Uninstalling apps does not affect your crypto assets, that are secured on the blockchain.

### INCORRECT_DATA (0x6a80)
   1. Navigate to VeChain App on your Ledger device
   2. Navigate to Setting 
   3. Set **Contract data** to **Yes**
   4. Set **Multi-clause** to **Yes**

### Unable to connect your device
   - Close other applications (Ledger apps, crypto wallets, Geth, Parity, Mist, Bitcoin Core, etc).
   - Turn OFF VPN and anti-virus temporarily. If that works, make sure to whitelist Sync. 
   - Change the USB cable if possible. Try removing any dongles or docks you're using. 
   - Try different USB ports.
   - Restart your computer.
   - Try another computer.
### Check status failed
The reason causes the result check status failed due to the device is not the selected(enforce) address. if you have multiple Ledger devices, please make sure you are connected with the correct device. sometimes update firmware may reset the ledger device. please follow the instructions to restore your device. 

Ledger support: 
- [Troubleshoot firmware update](https://support.ledger.com/hc/en-us/articles/360003117594-Troubleshoot-firmware-update)
- [Restore from recovery phrase](https://support.ledger.com/hc/en-us/articles/360005434914)

### Mis-transfer the funds to ethereum address
Please check the [Ledger support-Export your accounts](https://support.ledger.com/hc/en-us/articles/115005297709-Export-your-accounts) instruction. Once the private key / keystore is exported, import to Sync wallet. 

:::tip 
If all the steps can't solve the issue, Please contact [Ledger Support](https://support.ledger.com/hc/requests/new).
:::