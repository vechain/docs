---
sidebarDepth: auto
---
# Sync FAQ

## General
### Does new sync has a folder store the keystore file  ?
No, only if user backup(export)  the wallet will generate the keystore file. 

Please check [Export wallet](./user-guide/#export-keystore)

### How to connect custom node ?
1. [Run thor](../../thor/get-started/installation.html#running-thor)
2. Open Sync
3. Follow the step to [add custom node](./user-guide/browse-dapp-and-web.html#connect-to-a-node)

### Certificate of Identification / Agreement
The certificate is a message signing based mechanism which can easily request a user's identification(address) or a user agree to DApp term of use or service.

The purpose of the certificate of identification is a way that allows Dapps to send you a random challenge to prove that you are the owner of the wallet. **It proves that you are the owner of the wallet.**

On other hands, the certificate of agreement is a certificate that you agree to DApp's term of use or service. The agreement come in many forms before you agree to the content, please always review the content which provided by DApp. Once you signed the agreement. **it  proves that you are the wallet owner and agree to the DApp's term of use or service.**

### How to get test token ?
You can visit [Faucet](https://faucet.vecha.in/)

### How to open developer tools?

#### Main Processor(ONLY Available in Dev Mode)
1. Move your cursor to tab area
2. Right click the mouse
3. Click "**Inspect Element**"

#### Web Content
1. At upper right, Click <img src="~@public/images/sync/menu.png"  height = "20px" align=center />
2. Click"**Toggle Developer Tools**"


## Transaction Related 

### How to transfer all VTHO?
Due to the transaction required VTHO to send a transaction, you need to deduct the transaction fee (VTHO) before sending it. 

$$T_{\textrm{amount}} = VTHO_{\textrm{total}} - VTHO_{\textrm{fee}}$$

### Insufficient energy while signing a transaction
If you see this error during the signing process, it means that "Not enough VTHO to send transaction." Please make sure you have enough VTHO before sending the transaction. 
