(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{392:function(t,e,s){t.exports=s.p+"assets/img/menu.55f68494.svg"},393:function(t,e,s){t.exports=s.p+"assets/img/more_horiz.d644ed95.svg"},394:function(t,e,s){t.exports=s.p+"assets/img/add_circle_outline.c5b0d45d.svg"},407:function(t,e,s){t.exports=s.p+"assets/img/add.0e3e08bc.svg"},534:function(t,e,s){"use strict";s.r(e);var o=s(56),a=Object(o.a)({},(function(){var t=this,e=t.$createElement,o=t._self._c||e;return o("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[o("h1",{attrs:{id:"how-to-connect-sync2-to-solo-node"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#how-to-connect-sync2-to-solo-node"}},[t._v("#")]),t._v(" How to connect Sync2 to solo node")]),t._v(" "),o("p",[t._v("This guide will show every step to running a solo node and connecting it to Sync2. The SOLO node is a sandbox development mode for the VeChain Thor blockchain, that can be started (and is only available) on a single server. It is not publicly accessible and the generated blocks will be lost if the SOLO node is stopped.Sync2 is designed to work with all mainstream web browsers (e.g., Chrome, Safari, MS Edge, Firefox, etc), desktop, and mobile devices.")]),t._v(" "),o("h2",{attrs:{id:"step-1-launch-the-solo-node"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#step-1-launch-the-solo-node"}},[t._v("#")]),t._v(" Step 1 : Launch the solo node")]),t._v(" "),o("h3",{attrs:{id:"running-thor-solo-with-docker"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#running-thor-solo-with-docker"}},[t._v("#")]),t._v(" Running Thor solo with Docker")]),t._v(" "),o("div",{staticClass:"language-sh extra-class"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[t._v("docker run  -p "),o("span",{pre:!0,attrs:{class:"token number"}},[t._v("127.0")]),t._v(".0.1:8669:8669  vechain/thor:latest solo --api-cors "),o("span",{pre:!0,attrs:{class:"token string"}},[t._v("'*'")]),t._v(" --api-addr "),o("span",{pre:!0,attrs:{class:"token number"}},[t._v("0.0")]),t._v(".0.0:8669\n")])])]),o("details",[o("summary",[t._v("Build & Run from the source code")]),t._v(" "),o("h4",{attrs:{id:"_1-get-the-the-source-code"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_1-get-the-the-source-code"}},[t._v("#")]),t._v(" 1. Get the the source code")]),t._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[t._v("Note")]),t._v(" "),o("p",[t._v("Thor requires Go 1.13+ and C compiler to build. To install Go, follow this "),o("a",{attrs:{href:"https://golang.org/doc/install",target:"_blank",rel:"noopener noreferrer"}},[t._v("link"),o("OutboundLink")],1)])]),t._v(" "),o("p",[t._v("Clone the "),o("a",{attrs:{href:"https://github.com/vechain/thor",target:"_blank",rel:"noopener noreferrer"}},[t._v("thor repo"),o("OutboundLink")],1)]),t._v(" "),o("div",{staticClass:"language-sh extra-class"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[o("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/vechain/thor.git\n"),o("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" thor\n")])])]),o("h4",{attrs:{id:"_2-build-the-thor"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_2-build-the-thor"}},[t._v("#")]),t._v(" 2.Build the thor")]),t._v(" "),o("div",{staticClass:"language-sh extra-class"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[t._v("//Build main thor only \n"),o("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v("\n\n// Build the full suite\n"),o("span",{pre:!0,attrs:{class:"token function"}},[t._v("make")]),t._v(" all\n")])])]),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[t._v("Note")]),t._v(" "),o("p",[t._v("If no error is reported, all built executable binaries will appear in folder "),o("em",[o("strong",[t._v("bin")])]),t._v(".")])]),t._v(" "),o("h4",{attrs:{id:"_3-run-the-solo-mode"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#_3-run-the-solo-mode"}},[t._v("#")]),t._v(" 3. Run the Solo mode")]),t._v(" "),o("div",{staticClass:"language- extra-class"},[o("pre",{pre:!0,attrs:{class:"language-text"}},[o("code",[t._v("bin/thor solo --api-cors '*'\n")])])])]),t._v(" "),o("h3",{attrs:{id:"solo-sub-commands"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#solo-sub-commands"}},[t._v("#")]),t._v(" Solo sub-commands")]),t._v(" "),o("div",{staticClass:"language-sh extra-class"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[t._v("solo --on-demand               "),o("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# create a new block when there is a pending transaction")]),t._v("\nsolo --persist                 "),o("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# save blockchain data to disk(default to memory)")]),t._v("\nsolo --persist --on-demand     "),o("span",{pre:!0,attrs:{class:"token comment"}},[t._v("# Both persist and on-demand can be used together ")]),t._v("\n")])])]),o("h2",{attrs:{id:"step-2-connect-sync2-node-to-solo-node"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#step-2-connect-sync2-node-to-solo-node"}},[t._v("#")]),t._v(" Step 2 : Connect Sync2 node to solo node")]),t._v(" "),o("p",[t._v("Sync2 is designed to work with all mainstream web browsers (e.g., Chrome, Safari, MS Edge, Firefox, etc), desktop, and mobile devices.")]),t._v(" "),o("p",[t._v("The main advantage and purpose of Sync2 is the massive simplification of dApps and dApp usage. All editions of Sync2, no matter whether the native app is built for desktop or mobile or the automatically invoked SPA version, are designed to appear and function pretty much in the same way, therefore providing a consistent and comfortable user experience for users across different OS and devices.")]),t._v(" "),o("p",[t._v("Compared to Sync v1, the most significant change is that the built-in dApp browser is abandoned. That means now dApps can freely run in your favorite web browser.")]),t._v(" "),o("h3",{attrs:{id:"get-sync2"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#get-sync2"}},[t._v("#")]),t._v(" Get Sync2")]),t._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[t._v("System requirements:")]),t._v(" "),o("ul",[o("li",[o("strong",[t._v("MacOS")]),t._v(" : Minimum macOS version supported is macOS 10.10 (Yosemite). Native support for Apple Silicon (arm64) devices.")]),t._v(" "),o("li",[o("strong",[t._v("Windows")]),t._v(": Windows 7 and later are supported, and older operating systems are not supported (and do not work).")]),t._v(" "),o("li",[o("strong",[t._v("Linux")]),t._v(" : Ubuntu 14.04 and newer/ Fedora 24 and newer/ Debian 8 and newer")])])]),t._v(" "),o("p",[t._v("You can get Sync2 either download the installation file "),o("a",{attrs:{href:"https://sync.vecha.in/",target:"_blank",rel:"noopener noreferrer"}},[t._v("here"),o("OutboundLink")],1),t._v(" or built from the source code.")]),t._v(" "),o("details",[o("summary",[t._v("Build & Run from the source code")]),t._v(" "),o("div",{staticClass:"language-sh extra-class"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[o("span",{pre:!0,attrs:{class:"token function"}},[t._v("git")]),t._v(" clone https://github.com/vechain/sync2.git\n"),o("span",{pre:!0,attrs:{class:"token builtin class-name"}},[t._v("cd")]),t._v(" sync2\n\n//install dependencies\n"),o("span",{pre:!0,attrs:{class:"token function"}},[t._v("npm")]),t._v(" "),o("span",{pre:!0,attrs:{class:"token function"}},[t._v("install")]),t._v("\n\n//Start the app "),o("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("in")]),t._v(" development mode \n\n//web mode\nquasar dev\n\n//electron"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("desktop"),o("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" mode \nquasar dev -m electron\n\n")])])])]),t._v(" "),o("h3",{attrs:{id:"connect-sync2-to-solo-node"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#connect-sync2-to-solo-node"}},[t._v("#")]),t._v(" Connect Sync2 to solo node")]),t._v(" "),o("h4",{attrs:{id:"step1-add-node"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#step1-add-node"}},[t._v("#")]),t._v(" Step1:  Add node")]),t._v(" "),o("ol",[o("li",[t._v("Click "),o("strong",[t._v("Node")])]),t._v(" "),o("li",[t._v("Click "),o("img",{attrs:{src:s(407),align:"center"}}),t._v(" at upper right")]),t._v(" "),o("li",[t._v("Enter the node's url "),o("code",[t._v("http:localhost:8669")])]),t._v(" "),o("li",[t._v("Click "),o("strong",[t._v("Add")]),t._v(" to add node")])]),t._v(" "),o("h4",{attrs:{id:"step2-import-the-solo-built-in-wallet"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#step2-import-the-solo-built-in-wallet"}},[t._v("#")]),t._v(" Step2: Import the solo built-in wallet")]),t._v(" "),o("ol",[o("li",[t._v("Click upper left "),o("img",{attrs:{src:s(392),align:"center"}}),t._v(" to open wallet list")]),t._v(" "),o("li",[t._v("Click the upper area "),o("img",{attrs:{src:s(394),align:"center"}}),t._v(" to new wallet page")]),t._v(" "),o("li",[t._v("Click upper right "),o("img",{attrs:{src:s(393),align:"center"}})]),t._v(" "),o("li",[t._v("Select the "),o("strong",[t._v("Private-ea69f6")])]),t._v(" "),o("li",[t._v("Click "),o("strong",[t._v("Import")])]),t._v(" "),o("li",[t._v("Enter your mnemonic words")])]),t._v(" "),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[t._v("Mnemonic phrase of the solo built-in wallet")]),t._v(" "),o("p",[t._v("denial kitchen pet squirrel other broom bar gas better priority spoil cross")])]),t._v(" "),o("ol",{attrs:{start:"5"}},[o("li",[t._v("Enter your password to authorize the import")])]),t._v(" "),o("p",[t._v("Congrats! You have successfully connect to solo node with the Sync2, and you can now deploy/integrate by using  "),o("a",{attrs:{href:"https://inspector.vecha.in/",target:"_blank",rel:"noopener noreferrer"}},[t._v("inspector"),o("OutboundLink")],1),t._v(" or you can check out the "),o("RouterLink",{attrs:{to:"/tutorials/Useful-tips-for-building-a-dApp.html"}},[t._v("connex tutorial")]),t._v(" to build your own dApp.")],1),t._v(" "),o("h2",{attrs:{id:"step-3-launch-devpal"}},[o("a",{staticClass:"header-anchor",attrs:{href:"#step-3-launch-devpal"}},[t._v("#")]),t._v(" Step 3: Launch Devpal")]),t._v(" "),o("p",[t._v("Devpal is a set of tools to help your development and testing on solo mode and start your blockchain journey smoothly.Devpal contains two tools:")]),t._v(" "),o("ul",[o("li",[o("p",[o("strong",[t._v("Insight")]),t._v(": a serverless VeChain explorer. It allows you to explore and search for blocks, transactions, and accounts.")])]),t._v(" "),o("li",[o("p",[o("strong",[t._v("Inspector")]),t._v(": a tool that allows you to deploy and interact with the contract.")])])]),t._v(" "),o("p",[t._v("You can simply run the devpal by running the following command:")]),t._v(" "),o("div",{staticClass:"language-sh extra-class"},[o("pre",{pre:!0,attrs:{class:"language-sh"}},[o("code",[t._v("npx @vechain/devpal\n")])])]),o("div",{staticClass:"custom-block tip"},[o("p",{staticClass:"custom-block-title"},[t._v("Note")]),t._v(" "),o("p",[o("em",[o("strong",[t._v("http://locahost:8669")])]),t._v(" is set as the default node url.if you want to change it, please use "),o("code",[t._v("npx @vechain/devpal [Thor REST URL]")])])])])}),[],!1,null,null,null);e.default=a.exports}}]);