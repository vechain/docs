# Ledger Device
## Requirements
- [You've initialized your device](https://support.ledger.com/hc/en-us/articles/360000613793)
- [Device firmware is up to date](https://support.ledger.com/hc/en-us/articles/360002731113)
- [Ledger live is ready to use](https://support.ledger.com/hc/en-us/articles/360006395233)
- [VeChain Application is latest version(≥1.0.4)](https://support.ledger.com/hc/en-us/articles/360006523674)
- [Sync is latest version (≥1.2.0)](https://env.vechain.org/)

## Install VeChain Ledger app 
1. Open the Manager in Ledger Live.
Connect and unlock your Ledger Nano S.
2. If asked, allow the manager on your device by pressing the right button.
3. Find VeChain in the app catalog.
4. Click the Install button of the app.
5. Follow the instruction when installation window appears.

## Import Ledger Device 
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center /> , it will direct to wallet app
3. At the top, click **Ledger** 
4. Follow the steps appears on Sync

## Remove Ledger Device 
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center /> , it will direct to wallet app
3. Select the ledger wallet which you would like to remove
4. Click the remove on the middle top
5. Input the wallet name and then click remove

## Troubleshooting
:::tip 
If all the steps cant solved the issue, Please contact [Ledger Support](https://support.ledger.com/hc/requests/new).
:::

1. **Ledger device: INS_NOT_SUPPORTED (0x6d00).**
 
   - Ensuring your device runs the latest firmware version.
   - Reinstalling the apps on your device so you run the latest versions. Uninstalling apps does not affect your crypto assets, that are secured on the blockchain.

2. **Ledger device: INCORRECT_DATA (0x6a80).**

   - In VeChain App Setting ,set **Contract data** to **Yes**
   - In VeChain App Setting ,set **Multi-clause** to **Yes**

3. **Sync :Unable to connect your device, please retry.**

   - Close other applications (Ledger apps, crypto wallets, Geth, Parity, Mist, Bitcoin Core, etc).
   - Turn OFF VPN and anti-virus temporarily. If that works, make sure to whitelist Ledger Live. 
   - Change the USB cable if possible. Try removing any dongles or docks you're using. 
   - Try different USB ports.
   - Restart your computer.
   - Try another computer.

