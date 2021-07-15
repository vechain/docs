/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "e75833831372c5ab1c75d0697a0b0a63"
  },
  {
    "url": "assets/css/0.styles.3e4faf6e.css",
    "revision": "2b05a5f02b9af194ad3c8c9ceab42707"
  },
  {
    "url": "assets/img/activities.36116c16.png",
    "revision": "36116c16687c3473ca786d4c7d62e016"
  },
  {
    "url": "assets/img/add_circle_outline.c5b0d45d.svg",
    "revision": "c5b0d45d9ff3b78a9ac4ac72a70ea50c"
  },
  {
    "url": "assets/img/add.0e3e08bc.svg",
    "revision": "0e3e08bcb441c2cb39bdfff7f56f06a2"
  },
  {
    "url": "assets/img/address-bar.a15ff370.png",
    "revision": "a15ff370eed2f8f0b8219ea3d4976318"
  },
  {
    "url": "assets/img/address.8c163b8f.png",
    "revision": "8c163b8f3c49e340a7c9546af4ed690e"
  },
  {
    "url": "assets/img/content_copy.72dd793a.svg",
    "revision": "72dd793a97203adfad3c50ebad310ee4"
  },
  {
    "url": "assets/img/control_point_duplicate.0028d2cc.svg",
    "revision": "0028d2cca15e5c298bc49d9f8058a0d3"
  },
  {
    "url": "assets/img/delete_forever.01754524.svg",
    "revision": "017545249afd67806be943eae9f18bc2"
  },
  {
    "url": "assets/img/directions_car.c9b170b8.svg",
    "revision": "c9b170b848c5d4b8dd0e61f16bd75c75"
  },
  {
    "url": "assets/img/directions_walk.27f1ba22.svg",
    "revision": "27f1ba221570d364f986a1bc342c3e05"
  },
  {
    "url": "assets/img/done_all.28f39764.svg",
    "revision": "28f397644d2d6fe6c3fde0446891cf26"
  },
  {
    "url": "assets/img/done.89e6f120.svg",
    "revision": "89e6f1201212082536271f14401d3d41"
  },
  {
    "url": "assets/img/flight.1eb2837a.svg",
    "revision": "1eb2837abbb46c402e137802482339bc"
  },
  {
    "url": "assets/img/ledger_logo.8d1c9c23.svg",
    "revision": "8d1c9c23425c3b507e87663b24e54d0e"
  },
  {
    "url": "assets/img/link.98f4f684.svg",
    "revision": "98f4f6841f3d482b15c3a9d79c8db50f"
  },
  {
    "url": "assets/img/logoSync.7d4e71a5.svg",
    "revision": "7d4e71a555356bf3338258bfd8ba32b2"
  },
  {
    "url": "assets/img/menu.55f68494.svg",
    "revision": "55f6849429de279d473c459c7ead3249"
  },
  {
    "url": "assets/img/message.759cf5c9.svg",
    "revision": "759cf5c9195a7ba83dfe7b47cd809ffe"
  },
  {
    "url": "assets/img/more_horiz.d644ed95.svg",
    "revision": "d644ed957e2662b1d22adb890310e64f"
  },
  {
    "url": "assets/img/mpp.58a89201.png",
    "revision": "58a892017c66b562945baeee15505c80"
  },
  {
    "url": "assets/img/preview.2a0e91e4.svg",
    "revision": "2a0e91e455559dd783005560c3ffcbe0"
  },
  {
    "url": "assets/img/qr_code_2.b60a5eec.svg",
    "revision": "b60a5eec09a98201dd9a090a00e521bb"
  },
  {
    "url": "assets/img/query_builder.3c7597b2.svg",
    "revision": "3c7597b2a77f9fe763c44489b872ac31"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/img/search.db5d8122.svg",
    "revision": "db5d8122836517965b6e0247a3a9691c"
  },
  {
    "url": "assets/img/send.5b08a89d.svg",
    "revision": "5b08a89d2dd3351ce4ef110d2909cb23"
  },
  {
    "url": "assets/img/settings.d31d71f9.png",
    "revision": "d31d71f992404bd7970a450cfe4ec99c"
  },
  {
    "url": "assets/img/signing.d77cdae1.png",
    "revision": "d77cdae154a592744275a3b510bf722a"
  },
  {
    "url": "assets/img/unfold_more.52bd8411.svg",
    "revision": "52bd8411f8aea9dba1e636497a1c3d3e"
  },
  {
    "url": "assets/img/wallet-detail-activity.0f9d89a3.png",
    "revision": "0f9d89a34631323541d04818f4a00ac4"
  },
  {
    "url": "assets/img/wallet.08efbe38.png",
    "revision": "08efbe38b38fce44fa3542a9a0dd156d"
  },
  {
    "url": "assets/js/10.4e3fcf79.js",
    "revision": "11d873becc28e9da80fe60da7cd54fb7"
  },
  {
    "url": "assets/js/11.369d0257.js",
    "revision": "0eb139aed84eb27a63c5d68487cdb55c"
  },
  {
    "url": "assets/js/12.140810f9.js",
    "revision": "68bf1eaffd05bee4bb9bec89878b5465"
  },
  {
    "url": "assets/js/13.5596cf97.js",
    "revision": "b687fd14171e9ec7eb7ca4b1b0ad7cb8"
  },
  {
    "url": "assets/js/14.5f70f0ab.js",
    "revision": "6a7e48aa3dc89c3b56b38b6ad5d5a402"
  },
  {
    "url": "assets/js/15.def0cbf2.js",
    "revision": "c350bcddad8f57fe90fd83ae4615bb8b"
  },
  {
    "url": "assets/js/16.3e712dd7.js",
    "revision": "65c7b06d882e36bd8824c18d36cf7204"
  },
  {
    "url": "assets/js/17.0e5f5783.js",
    "revision": "2dc0d9398ac80589d079f1b34a875d36"
  },
  {
    "url": "assets/js/18.bd289573.js",
    "revision": "bb93c2d9664fab75108cf6abf4b45771"
  },
  {
    "url": "assets/js/19.d4383804.js",
    "revision": "3ef174fe7f6e8cf773a97340d40e7390"
  },
  {
    "url": "assets/js/20.b4efe8a6.js",
    "revision": "f6432ca4c949375f88bf5bf9336654de"
  },
  {
    "url": "assets/js/21.d30cf464.js",
    "revision": "0aff829313bc35a436fe4e54d2fbe93d"
  },
  {
    "url": "assets/js/22.99e0da62.js",
    "revision": "6670e0225eeec06b21b50d4a67615733"
  },
  {
    "url": "assets/js/23.de6e4663.js",
    "revision": "132fa0c402d145143436089a1fc48ea7"
  },
  {
    "url": "assets/js/24.1273d6a0.js",
    "revision": "ecfe8bcb2a9bc25204460d327c87b3a2"
  },
  {
    "url": "assets/js/25.ad3a7a81.js",
    "revision": "73df6bbab482405c7c8de2fbc75c919f"
  },
  {
    "url": "assets/js/26.0a559db1.js",
    "revision": "b4771140397879f74ec0445fb7a4c6f8"
  },
  {
    "url": "assets/js/27.403b3b8c.js",
    "revision": "b4a212c5cb03f48616f6aafb8ad2193b"
  },
  {
    "url": "assets/js/28.f6e83dbf.js",
    "revision": "6e8574469e51294b146d60390e1cd246"
  },
  {
    "url": "assets/js/29.84880ec5.js",
    "revision": "31255c499ee29f08a8e3d52d5ac832ad"
  },
  {
    "url": "assets/js/3.ff89bc5d.js",
    "revision": "759e4057624950c95fb0cc8d12ebced2"
  },
  {
    "url": "assets/js/30.853cec30.js",
    "revision": "8c80151fbe49e31730b8aaa4421900ab"
  },
  {
    "url": "assets/js/31.35cc5dc3.js",
    "revision": "cb000f84965a5cbbb90e4edcc634def7"
  },
  {
    "url": "assets/js/32.d24108d9.js",
    "revision": "9826167fa7b62610ee2d44a271585d66"
  },
  {
    "url": "assets/js/33.63a93fb3.js",
    "revision": "92a13fecdeece781caaae1d1674dae33"
  },
  {
    "url": "assets/js/34.2b927d5e.js",
    "revision": "1b596a515a8eddeaeb3ae473de57807a"
  },
  {
    "url": "assets/js/35.4687689f.js",
    "revision": "4b7149ce60222bf1b115624f59abeeff"
  },
  {
    "url": "assets/js/36.72de80a4.js",
    "revision": "bd8f7914b4b217cabaa0e45448703e45"
  },
  {
    "url": "assets/js/37.04b7ee4b.js",
    "revision": "05a5c2439ab14d85497bab8715f927c8"
  },
  {
    "url": "assets/js/38.23df670f.js",
    "revision": "4cc8af8cf61bf4b95525d384f9b68f9a"
  },
  {
    "url": "assets/js/39.c72fff63.js",
    "revision": "07939279e099200961c7f33a97ea18e3"
  },
  {
    "url": "assets/js/4.a2421e38.js",
    "revision": "6a69313c6b6f94d0b2896abec8a2c66f"
  },
  {
    "url": "assets/js/40.797eeefc.js",
    "revision": "3240f6c68207fef3b0b772c5862a37a7"
  },
  {
    "url": "assets/js/41.968be522.js",
    "revision": "dae0feb8a55053bd11651e6822c80b3b"
  },
  {
    "url": "assets/js/42.27e44915.js",
    "revision": "5f83b6417cd45a774c2ff13e078de969"
  },
  {
    "url": "assets/js/43.81b890d3.js",
    "revision": "69f2715b8bd3503779750439124b4371"
  },
  {
    "url": "assets/js/44.d11aad4b.js",
    "revision": "a1e61a09199b3f9ef0495fd3ebb09dc4"
  },
  {
    "url": "assets/js/45.0c3578eb.js",
    "revision": "46537347de6d3035c87594cb9f30452e"
  },
  {
    "url": "assets/js/46.868ae992.js",
    "revision": "3dfce5f797149bf656a5eee829526670"
  },
  {
    "url": "assets/js/47.546ee99a.js",
    "revision": "a64977e311b2b2e80c53d7f59b8adf42"
  },
  {
    "url": "assets/js/48.2ed929d1.js",
    "revision": "4972713c62bd03b51d09ec207734b4c1"
  },
  {
    "url": "assets/js/49.c71ad938.js",
    "revision": "96004d00c98d1bc8385640e3d36f378f"
  },
  {
    "url": "assets/js/5.3782963d.js",
    "revision": "9dc88839659188b73a3d1a9b351fe1e6"
  },
  {
    "url": "assets/js/50.f295de15.js",
    "revision": "ffadeac3e0c29276a5940a3c2f383a2c"
  },
  {
    "url": "assets/js/51.74cf1056.js",
    "revision": "b94f71892eba3822752274cf351f50bb"
  },
  {
    "url": "assets/js/52.80407952.js",
    "revision": "f7d04f30e165e095b3029288419ed15f"
  },
  {
    "url": "assets/js/53.edb2da20.js",
    "revision": "7450a8c0243e69450f899d1d98b536e4"
  },
  {
    "url": "assets/js/54.3daee5fd.js",
    "revision": "b5c8d0c651223e0eca6b91de5a84e03f"
  },
  {
    "url": "assets/js/55.818a27a7.js",
    "revision": "17e032c4727a8b25935565a09e23edbf"
  },
  {
    "url": "assets/js/56.bedab2ea.js",
    "revision": "c8f083dec307bc611558aad66acabf16"
  },
  {
    "url": "assets/js/57.88c35ba6.js",
    "revision": "1f7be34276493b422107278c7e3059a9"
  },
  {
    "url": "assets/js/6.4f8a0bf9.js",
    "revision": "0161a0e7aa88f526d487e16032919c18"
  },
  {
    "url": "assets/js/7.e99590a8.js",
    "revision": "dfc500504e2fd83d4bee60548990910b"
  },
  {
    "url": "assets/js/8.537e75eb.js",
    "revision": "68216f1263a9d2e8e68b1e52e2905c22"
  },
  {
    "url": "assets/js/9.3d1b80b3.js",
    "revision": "e674642d2f16e8105e24b7b4b45dff42"
  },
  {
    "url": "assets/js/app.741ca24c.js",
    "revision": "2f9d1eabddcafd36274b848fa888314b"
  },
  {
    "url": "assets/js/vendors~docsearch.b15e65d3.js",
    "revision": "b74cf40fe83ff3b84902ef5b48bbc8f5"
  },
  {
    "url": "connex/api.html",
    "revision": "47656dde0b40e938812482619e0b7dd4"
  },
  {
    "url": "connex/index.html",
    "revision": "18431f4288d72f3e112736e3c6e52570"
  },
  {
    "url": "icons/144.png",
    "revision": "ef022f52c54f8ee6ccc8f005d52b99de"
  },
  {
    "url": "icons/168.png",
    "revision": "cd596353879cab531903b1f9c0f8d6dc"
  },
  {
    "url": "icons/192.png",
    "revision": "6aaa85947b9a315ac47970a54c3a66f4"
  },
  {
    "url": "icons/48.png",
    "revision": "2d20f253068748053fc7082400c88f4b"
  },
  {
    "url": "icons/72.png",
    "revision": "02b333d138cc4764e770eb1d7274e7ea"
  },
  {
    "url": "icons/96.png",
    "revision": "b3240f2ffb00f383cbc3783370a782cc"
  },
  {
    "url": "index.html",
    "revision": "10c01a50085902c7929bea2afcc6b277"
  },
  {
    "url": "logo.png",
    "revision": "1f7569a7fb96e141f556669c77877f1f"
  },
  {
    "url": "others/development-resources.html",
    "revision": "6e1ee3578ca669e73dca6924675d9a5c"
  },
  {
    "url": "others/miscellaneous.html",
    "revision": "1acb7d2241de6b47efd4c2673b400e58"
  },
  {
    "url": "sync/download-and-install.html",
    "revision": "d39e0c46fc97a09468c125a9275ab851"
  },
  {
    "url": "sync/faq.html",
    "revision": "db8f9d6ee27501206cedae5e67a96676"
  },
  {
    "url": "sync/user-guide/activities.html",
    "revision": "6a63872a2626414b45911bd7c1e7ec66"
  },
  {
    "url": "sync/user-guide/browse-dapp-and-web.html",
    "revision": "437ebb874a7af9a7405814d3bcea3c04"
  },
  {
    "url": "sync/user-guide/contribute.html",
    "revision": "111c0fd39d7f13b2cd8be93eeaca49bf"
  },
  {
    "url": "sync/user-guide/contributing.html",
    "revision": "cbf10316c63d74231cc74bb0260206d2"
  },
  {
    "url": "sync/user-guide/import-ledger.html",
    "revision": "2c5148f2cfd34d5711e64fd1019e1ea1"
  },
  {
    "url": "sync/user-guide/index.html",
    "revision": "21c0d8991a3aa316ea751905538cd0fa"
  },
  {
    "url": "sync/user-guide/interact-with-dapps.html",
    "revision": "dacb0d29fc1541de34e986de15480b8c"
  },
  {
    "url": "sync/user-guide/report-issue.html",
    "revision": "1fcc1752e458e8f7e7b5a315aeb538b1"
  },
  {
    "url": "sync/user-guide/settings.html",
    "revision": "1eb410f7307b23caefdf3051f8198bc0"
  },
  {
    "url": "sync2/faq.html",
    "revision": "59cc73e0876f40f1d4957d16b7bdd83a"
  },
  {
    "url": "sync2/get-started.html",
    "revision": "3b1ccc89682c46f7def97f19a9f7e3b9"
  },
  {
    "url": "sync2/user-guide/activities.html",
    "revision": "cc9e133835936a793867746739af9e6f"
  },
  {
    "url": "sync2/user-guide/index.html",
    "revision": "46a9d9130b4b6e917ac10466ae31af41"
  },
  {
    "url": "sync2/user-guide/settings.html",
    "revision": "5614d48673976caa625ee078da66b2ec"
  },
  {
    "url": "sync2/user-guide/signing.html",
    "revision": "369e19cd7acb96547cca0da068728b1c"
  },
  {
    "url": "sync2/user-guide/wallet.html",
    "revision": "28f165682fdfe58717a6f32acca4fe91"
  },
  {
    "url": "thor/get-started/api.html",
    "revision": "aa97824a40a8686ee0a60d656d5c019d"
  },
  {
    "url": "thor/get-started/custom-network.html",
    "revision": "b9e26e5205e9905dd9d5844ba3afcd4e"
  },
  {
    "url": "thor/get-started/installation.html",
    "revision": "9493c81961c7fef48c6b3e7d767ab1b0"
  },
  {
    "url": "thor/learn/block.html",
    "revision": "cc98a4bb418a940afda9ae177dd3a2f7"
  },
  {
    "url": "thor/learn/builtin-contracts.html",
    "revision": "8f6abba37e5d045c8e35e2337bf2b7ff"
  },
  {
    "url": "thor/learn/faq.html",
    "revision": "4cee2d025fd12c97161a287ca62cb944"
  },
  {
    "url": "thor/learn/fee-delegation.html",
    "revision": "273fe5dae1ce3c97c12799e5f033e471"
  },
  {
    "url": "thor/learn/index.html",
    "revision": "f80961904899eb8314d6e6e8d3093c56"
  },
  {
    "url": "thor/learn/proof-of-authority.html",
    "revision": "c796cb9c2f6dfceb3a91065f7f0a832e"
  },
  {
    "url": "thor/learn/transaction-calculation.html",
    "revision": "099f99f102ca07d3e33964272ce250f0"
  },
  {
    "url": "thor/learn/transaction-model.html",
    "revision": "4d0b311c9665e7b06be17a9cec781060"
  },
  {
    "url": "thor/learn/two-token-design.html",
    "revision": "20f8293dfe3d51d0a45048fe86d74db3"
  },
  {
    "url": "tutorials/Connex-upgrade-Connex2_en.html",
    "revision": "619d7c7f45fb9a12f6c750aa6e6d491b"
  },
  {
    "url": "tutorials/Connex-upgrade-Connex2.html",
    "revision": "c6b99eda966c71ec4ddcc89359142b79"
  },
  {
    "url": "tutorials/contribute.html",
    "revision": "17af2f8c970ba787c65a5dd4b648247f"
  },
  {
    "url": "tutorials/designated-fee-delegation.html",
    "revision": "223095de540f97f17a4c152be54c4799"
  },
  {
    "url": "tutorials/forcible-transaction-dependency.html",
    "revision": "7e4e3260bf7e4d543125a8bf6944e392"
  },
  {
    "url": "tutorials/how-to-develop-a-dapp-on-vechain-1.html",
    "revision": "6f1606aeddf52ddc8e60ddd6095a1716"
  },
  {
    "url": "tutorials/how-to-develop-a-dapp-on-vechain-2.html",
    "revision": "aa252116173ca98054f81beb5c3bacce"
  },
  {
    "url": "tutorials/how-to-develop-a-dapp-on-vechain-3.html",
    "revision": "4e482a2ca2c200f39601bcb9cd3d1582"
  },
  {
    "url": "tutorials/how-to-integrate-VIP-191-1.html",
    "revision": "d110e78d1e7e1ff82d540a319f91efa1"
  },
  {
    "url": "tutorials/how-to-integrate-VIP-191-2.html",
    "revision": "8e6cbf5d777a8479e860e52bcea2bebb"
  },
  {
    "url": "tutorials/how-to-integrate-VIP-191-3.html",
    "revision": "ef279ffd80a7441ae8b7c8abbf3301b7"
  },
  {
    "url": "tutorials/index.html",
    "revision": "ac170658b81d84cca7b57125e44eccc3"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
