# Wallet
## Create  Wallet
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center /> , it will direct to wallet app
3. At the top, click **New** 
4. Fill in fields to create your wallet 
5. Write down the mnemonic words
6. Verify the mnemonic words 

>Always keep your mnemonic words in safe place. To prevent the mnemonic words get lost,you’d better write more than one copy.

Reference Article :
[Keep your wallet safe](/sync/user-guide/wallet.md#keep-your-wallet-safe) 

## Import Wallet
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center /> , it will direct to wallet app
3. At the top, click **Import** 
4. Select a method to import(Only keystore need to enter the keystore password)
5. Once the information verified, you can fill in fields to import your wallet 

More : [Import from Ledger](/sync/user-guide/import-ledger)

## Wallet Security 
### Keep Your Wallet Safe
The mnemonic words/keystore stores all the information that is needed at any point in time to recover your wallet. The mnemonic words/keystore should be stored in a secure place. It ensures you have had a back-up in a scenario where your computer breaks down or becomes unusable due to any reason. In such cases, all you need is your mnemonic words/keystore to recover your wallet.

### Export Keystore
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center />  , it will direct to wallet app
3. Click the wallet you which needs to export the key store
4. Click **Backup**
5. Enter the wallet password to continue process 
6. Copy the keystore or export it to the custom path

### Reset Password 
You can change your wallet's name and password after wallet's password verified. 
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center />  , it will direct to wallet app
3. Click the wallet you which needs to change the password
4. Click **Reset Password**
5. Enter the wallet password to continue process
6. Enter New password and click save

### Wallet Recovery
1. On your computer, open Sync
2. At top right, click <img src="~@public/images/sync/wallets.png" width = "16px" height = "16px" align=center /> , it will direct to wallet app
3. At the top, click **Import** 
4. Select a method to import(Only keystore need to enter the keystore password)
5. Once the information verified, you can fill in fields to import your wallet 
   
> If the wallet already existed, please checked the box to reset the wallet 

## Wallet Activity
![activity](~@public/images/sync/wallet-detail-activity.png)

### Transaction
- Date : Show the date which you signed the transaction.
- Status : There are 4 status of a transaction
    1. **Sending** <img src="~@public/images/sync/sending.png"  height = "20px" align=center />
  : After signing a transaction , sync will send the signed transaction to node. If the transaction can not be sent , you can click  <img src="~@public/images/sync/retry.png"  height = "20px" align=center /> to resend. 
    2. **Confirming** <img src="~@public/images/sync/confirming.png"  height = "20px" align=center /> : The transaction is confirming.
    3. **Confirmed** <img src="~@public/images/sync/confirmed.png"  height = "20px" align=center /> : The transaction is confirmed.
    4. **Dropped** <img src="~@public/images/sync/error.png"  height = "20px" align=center />  :  The transaction is expired, can not be resend. 
- Category: Transfer / Call / Create
- Link : Application URL.
- Action : Reveal transaction in insight.

### Certificate
- Date : Show the date which you signed the transaction.
- status : Always <img src="~@public/images/sync/confirmed.png"  height = "20px" align=center /> (Only signed certificate will be record.)
- Category : Identification / Agreement 
- Link : Application URL.
- Action : Show the signed content.
