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
    "revision": "8954b41cb12c80fd3bcfdec26db97a68"
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
    "url": "assets/js/10.694ead51.js",
    "revision": "09d041d58b6c804f6d2fd250ea105fc1"
  },
  {
    "url": "assets/js/100.69de5222.js",
    "revision": "8413d037fda9e80114c3218a3bba2e56"
  },
  {
    "url": "assets/js/101.c112e028.js",
    "revision": "b1ff121aa338f91c7e80967b8fa04de2"
  },
  {
    "url": "assets/js/102.1b158bf6.js",
    "revision": "5540b81b99e3d8326e4987ad2321411c"
  },
  {
    "url": "assets/js/103.f6c70881.js",
    "revision": "a3cbe55278d81777602d4c3b8164d8c5"
  },
  {
    "url": "assets/js/104.9deaead9.js",
    "revision": "079bd7e431531aac94a408a27048fb8c"
  },
  {
    "url": "assets/js/105.f779af09.js",
    "revision": "0d91d38770719e7d2abf5e742c45ea75"
  },
  {
    "url": "assets/js/106.8b3fad22.js",
    "revision": "0f1ee0770958909f8d6e2096c50bc7c7"
  },
  {
    "url": "assets/js/107.1ff5dc39.js",
    "revision": "b164bcb8b6706cd6b33dbeccd98c0253"
  },
  {
    "url": "assets/js/11.2529a28e.js",
    "revision": "365518331d948df1d06327acded66bb8"
  },
  {
    "url": "assets/js/12.3fa1dc23.js",
    "revision": "fe6958cdb71fe5d18846dbc1d7f12e2f"
  },
  {
    "url": "assets/js/13.a59b6543.js",
    "revision": "0b5e3168ba301e1ee7539d876d761fa8"
  },
  {
    "url": "assets/js/14.e3667f8b.js",
    "revision": "804147f0327fd13226f28b1b408cc165"
  },
  {
    "url": "assets/js/15.66ef4414.js",
    "revision": "dd3073d17d9b4b4dca227c55158d06fd"
  },
  {
    "url": "assets/js/16.cad6f982.js",
    "revision": "7f707a324c125e2635d5dc8ed32a4cb7"
  },
  {
    "url": "assets/js/17.544f97dc.js",
    "revision": "2f6ecde9ca678b5401ec17684c50c786"
  },
  {
    "url": "assets/js/18.585cf9e3.js",
    "revision": "8f9e7ff3130ed7dee3406e2ad929d004"
  },
  {
    "url": "assets/js/19.56051040.js",
    "revision": "37cc76d573ab2836320c163af219f8ae"
  },
  {
    "url": "assets/js/20.e801da5b.js",
    "revision": "777261cc2a55e6d68d8a830fbaf8b673"
  },
  {
    "url": "assets/js/21.e55ea010.js",
    "revision": "83a3f3ca1b22299cff3c8fda2e02592f"
  },
  {
    "url": "assets/js/22.508702fa.js",
    "revision": "337b705d6034da52836a1f47744ecf68"
  },
  {
    "url": "assets/js/23.2ce8eb40.js",
    "revision": "a8fed7a8147b12097ded2fc1aa93ed85"
  },
  {
    "url": "assets/js/24.501d283d.js",
    "revision": "f9309852fb1b549d909a4a2780206996"
  },
  {
    "url": "assets/js/25.dbcd6f95.js",
    "revision": "517524ab9e62188778aaa6a833705145"
  },
  {
    "url": "assets/js/26.fb9e3edb.js",
    "revision": "a6bff89800bff397051cd92c80f750be"
  },
  {
    "url": "assets/js/27.99b1fecb.js",
    "revision": "179130ef7d736e0900e352df27c8359f"
  },
  {
    "url": "assets/js/28.69fad62f.js",
    "revision": "23b278233a9b8e24e14c0a9943729409"
  },
  {
    "url": "assets/js/29.347150de.js",
    "revision": "5660f07561db51d4282cae44997bf36d"
  },
  {
    "url": "assets/js/3.4d15505d.js",
    "revision": "7d72a9af271c050d3d8e6ab700ea9854"
  },
  {
    "url": "assets/js/30.b0ea5628.js",
    "revision": "f34f7439a6cda34c7e600987ff29c893"
  },
  {
    "url": "assets/js/31.9cfbaae0.js",
    "revision": "585008ab013bc1c629201f64823067e8"
  },
  {
    "url": "assets/js/32.112eabdd.js",
    "revision": "4581ee2b9d665f857ac49f0327f55aad"
  },
  {
    "url": "assets/js/33.172a48e0.js",
    "revision": "690631ca577e1be762cb08ab49c48903"
  },
  {
    "url": "assets/js/34.777c964e.js",
    "revision": "8ce7cb039e1a737b434282d93b21af98"
  },
  {
    "url": "assets/js/35.fe719197.js",
    "revision": "f02d94e1f8729b3e327c1b9e01329ca6"
  },
  {
    "url": "assets/js/36.ae6e0c34.js",
    "revision": "e0fe05736bcc6f24d1858bd2921ae426"
  },
  {
    "url": "assets/js/37.a6478f53.js",
    "revision": "462621eb549a1b54fe941fca868da8b2"
  },
  {
    "url": "assets/js/38.0ceb1eb9.js",
    "revision": "2c5566abdcb22cdb37b745e0287f4f0b"
  },
  {
    "url": "assets/js/39.f2a2ef74.js",
    "revision": "d7f0f54cee803a2f3e7014ba472b9118"
  },
  {
    "url": "assets/js/4.45804240.js",
    "revision": "d37909da2cc4ddfcfe2a6d162f965a58"
  },
  {
    "url": "assets/js/40.a2db98a8.js",
    "revision": "2f6240175a6f106adbf00b12081031ac"
  },
  {
    "url": "assets/js/41.bf13ef19.js",
    "revision": "6c82e2a6dabd018126aca8bda43e7eb4"
  },
  {
    "url": "assets/js/42.2137bbba.js",
    "revision": "4f8a5b671f3c70e5de1312f6dd537579"
  },
  {
    "url": "assets/js/43.acc3cc81.js",
    "revision": "f1f2834e58cb43d80e12c3449eb0f5a6"
  },
  {
    "url": "assets/js/44.5419475b.js",
    "revision": "3027ffa34f54e36fc6a6dfa0620884b1"
  },
  {
    "url": "assets/js/45.1d1169d8.js",
    "revision": "205240e0cb99048607da6708cbc79b8a"
  },
  {
    "url": "assets/js/46.8fc4c13d.js",
    "revision": "b8640562f2e0a24e597bfe0ea52b7e58"
  },
  {
    "url": "assets/js/47.18e13c2e.js",
    "revision": "0f271359cf689105feb28125f931d60f"
  },
  {
    "url": "assets/js/48.8e52e794.js",
    "revision": "8bfc7a08500dcb7ae0f09ed292322565"
  },
  {
    "url": "assets/js/49.f694ffb4.js",
    "revision": "b8723df091e7158d85b73dfe8668ae7c"
  },
  {
    "url": "assets/js/5.e43b6327.js",
    "revision": "75d615a6e3d743a593a676ac68ad514b"
  },
  {
    "url": "assets/js/50.682abf64.js",
    "revision": "c5d2b54eb99e2243c83741d57da9d0d7"
  },
  {
    "url": "assets/js/51.edf1e039.js",
    "revision": "35565af9d69c1eb83c6c14eafef30e17"
  },
  {
    "url": "assets/js/52.1d36ffc0.js",
    "revision": "83294a998ae72162d16de287802b8564"
  },
  {
    "url": "assets/js/53.7a1de32c.js",
    "revision": "4991ddc6c29d5cb87afe3a43279079c1"
  },
  {
    "url": "assets/js/54.af3b3e82.js",
    "revision": "293dc0847d9c1673fdf95c593ba3e026"
  },
  {
    "url": "assets/js/55.379dbfae.js",
    "revision": "cde70196a7c47739d38c056267f3df7b"
  },
  {
    "url": "assets/js/56.f79c4db8.js",
    "revision": "73bb227ad99310f38d1b580273d9a443"
  },
  {
    "url": "assets/js/57.5937cc2e.js",
    "revision": "54803849f7df1f5b4810e847f9c9f23e"
  },
  {
    "url": "assets/js/58.39e4e0fc.js",
    "revision": "5ef693c6cfd3f2d7d9e169f4826b3186"
  },
  {
    "url": "assets/js/59.7b54f7f4.js",
    "revision": "f89af80789ab32210dc908f55769d9fa"
  },
  {
    "url": "assets/js/6.f5ca39ac.js",
    "revision": "b066328509c27ecff4a501ec4246bf13"
  },
  {
    "url": "assets/js/60.42d518c5.js",
    "revision": "6d8e797abcb04d98c96b54bad69e8f2c"
  },
  {
    "url": "assets/js/61.ce2cd750.js",
    "revision": "1eee08f4b7e05157f805e56a22e47175"
  },
  {
    "url": "assets/js/62.f56ccfc4.js",
    "revision": "c32f6344102b159303fb943dcb89e656"
  },
  {
    "url": "assets/js/63.7ff3688d.js",
    "revision": "5d05ca1a545f68896688b187395b94dc"
  },
  {
    "url": "assets/js/64.e0ffbed9.js",
    "revision": "85996f7d7e5d85798300b97aadec07c9"
  },
  {
    "url": "assets/js/65.b036c22f.js",
    "revision": "12c1dbd345d9a473afd978e62ca69193"
  },
  {
    "url": "assets/js/66.187673b2.js",
    "revision": "f5f3995ca8764ed72a3ec1f7c73a9f0c"
  },
  {
    "url": "assets/js/67.cef2ea87.js",
    "revision": "1ea3445c71f1fad9f630dbb7855c5b44"
  },
  {
    "url": "assets/js/68.67973f73.js",
    "revision": "15ce60f81c069b06985f7c030cd5676c"
  },
  {
    "url": "assets/js/69.3c92b0ed.js",
    "revision": "2de4d9bf3cb8c42b0e751d192bc2dded"
  },
  {
    "url": "assets/js/7.408a4531.js",
    "revision": "c20d263cdbee12b911a236af4416d87e"
  },
  {
    "url": "assets/js/70.cf8b45c9.js",
    "revision": "c5fd5d0f9d0e2215661a27231a5cb7dc"
  },
  {
    "url": "assets/js/71.cb63eb13.js",
    "revision": "5f53ebc01a4a8c3b269fbc891e91a32d"
  },
  {
    "url": "assets/js/72.219193ea.js",
    "revision": "0f312f0ba7272d8753408bb930b01c9d"
  },
  {
    "url": "assets/js/73.16dfd38c.js",
    "revision": "d1d26572831be1b47bb3bc2a5e2cd1f3"
  },
  {
    "url": "assets/js/74.3307e1eb.js",
    "revision": "9cdbd17412459e4f49a0e7b7208d49f8"
  },
  {
    "url": "assets/js/75.09511393.js",
    "revision": "174866a59c7eb71e5648648ba7da4918"
  },
  {
    "url": "assets/js/76.dadd4e57.js",
    "revision": "f07098a0c59a1d471ee876fb914d5c7f"
  },
  {
    "url": "assets/js/77.f0318240.js",
    "revision": "9afd241b38b601a7b1dce262f6a8920b"
  },
  {
    "url": "assets/js/78.14f0b327.js",
    "revision": "8fa593661234215fe232985ec2c867a1"
  },
  {
    "url": "assets/js/79.e2eb56dc.js",
    "revision": "990857a1bf578c3b0cbc88b605f1a4ed"
  },
  {
    "url": "assets/js/8.ab6ca9a0.js",
    "revision": "6b39c2528cbd90c0e02da20927592a4d"
  },
  {
    "url": "assets/js/80.3157595b.js",
    "revision": "8e0b7e03ba57876d5dd0452773d015d1"
  },
  {
    "url": "assets/js/81.271fd932.js",
    "revision": "1fb5331ff44afbe32e670bf4197e6c92"
  },
  {
    "url": "assets/js/82.51731c48.js",
    "revision": "f9e36ee79295fdccae981c18dd824a43"
  },
  {
    "url": "assets/js/83.99177532.js",
    "revision": "dbabf7e34ca23109e301fbf53851323a"
  },
  {
    "url": "assets/js/84.94e04a72.js",
    "revision": "bda2f596751f67ab12c0be6aa579b57f"
  },
  {
    "url": "assets/js/85.1adb920f.js",
    "revision": "373aa9947dcc8efca3312a4735cbd293"
  },
  {
    "url": "assets/js/86.fcea88f2.js",
    "revision": "1287e7ef71d80b9b979b31a08f0b6f94"
  },
  {
    "url": "assets/js/87.6130bf31.js",
    "revision": "e44cc46aed9a8e9cfd2250a29ea0abda"
  },
  {
    "url": "assets/js/88.5adca661.js",
    "revision": "62fd1f56b0eb36c4d37d32ab999b5724"
  },
  {
    "url": "assets/js/89.4d7c5e9e.js",
    "revision": "e868f6863f736040cf6fb3d4b145b693"
  },
  {
    "url": "assets/js/9.5145463a.js",
    "revision": "8238e8f22a9ecca807c0a05db07f0b3c"
  },
  {
    "url": "assets/js/90.8ceed48c.js",
    "revision": "7244007fbe6b5b612fe46cc5b471eef2"
  },
  {
    "url": "assets/js/91.95568576.js",
    "revision": "73486377ba567d9a30fa6d6d792acb69"
  },
  {
    "url": "assets/js/92.f6a0befa.js",
    "revision": "0f068a07f3c2cc126afbbe5af4236d5e"
  },
  {
    "url": "assets/js/93.1738a0fe.js",
    "revision": "78156931d9a88947b4baa367ac27fc5a"
  },
  {
    "url": "assets/js/94.60238599.js",
    "revision": "cac77841f67ea1c847317fe07b7cbca9"
  },
  {
    "url": "assets/js/95.b840cd5e.js",
    "revision": "8d53e9ae8a956c168441e5c4e361f10f"
  },
  {
    "url": "assets/js/96.9dc1dbc0.js",
    "revision": "ea1a9268b68f766dfdceb758c916ebde"
  },
  {
    "url": "assets/js/97.52b5bf25.js",
    "revision": "9565688a72d828d477d65646df52e95e"
  },
  {
    "url": "assets/js/98.928117ff.js",
    "revision": "fb83b75b4fd032b55c3119821a816849"
  },
  {
    "url": "assets/js/99.30d6a224.js",
    "revision": "e29d25d997136bb6f91ae5c1d24992ac"
  },
  {
    "url": "assets/js/app.f6ee0754.js",
    "revision": "14399393d38b53d36220918bca2a1d65"
  },
  {
    "url": "assets/js/vendors~docsearch.b15e65d3.js",
    "revision": "b74cf40fe83ff3b84902ef5b48bbc8f5"
  },
  {
    "url": "connex/api.html",
    "revision": "0b01941d6e0ffeaa669c353e5b73ff2f"
  },
  {
    "url": "connex/index.html",
    "revision": "0123d10e480f816946571bf4756cbe29"
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
    "revision": "7636e5ab76b33163dabf624ba2c98dbe"
  },
  {
    "url": "logo.png",
    "revision": "1f7569a7fb96e141f556669c77877f1f"
  },
  {
    "url": "others/development-resources.html",
    "revision": "c8aca26506b8de2b42d7af3d4ea4e029"
  },
  {
    "url": "others/miscellaneous.html",
    "revision": "0fc0f0e9357ff96c680d708225192c37"
  },
  {
    "url": "pt/connex/api.html",
    "revision": "6b9e3093fa659cef465b3a18dcb637a7"
  },
  {
    "url": "pt/connex/index.html",
    "revision": "349d51b01fa2b45058a6b9abce9cf686"
  },
  {
    "url": "pt/index.html",
    "revision": "85253110a386ffc365a93e1c8871cc2b"
  },
  {
    "url": "pt/others/development-resources.html",
    "revision": "045b1413e93a0156891c2c676cd4572e"
  },
  {
    "url": "pt/others/miscellaneous.html",
    "revision": "4579eea80a56966661892ccb98b62575"
  },
  {
    "url": "pt/sync/download-and-install.html",
    "revision": "6fc95c90f902e4b70e4b16a539c1b692"
  },
  {
    "url": "pt/sync/faq.html",
    "revision": "214cfed8bc2bec0ad3fc2f081cf23474"
  },
  {
    "url": "pt/sync/user-guide/activities.html",
    "revision": "d3bda1d57f8ab16f40721daa2bd6caf9"
  },
  {
    "url": "pt/sync/user-guide/browse-dapp-and-web.html",
    "revision": "b81e9fcaea8959e6e536d66e6fa73484"
  },
  {
    "url": "pt/sync/user-guide/contribute.html",
    "revision": "28643179e8a2972a5741fdb1d7938d3b"
  },
  {
    "url": "pt/sync/user-guide/contributing.html",
    "revision": "588cff4cd40d98fc675d8052530c6e54"
  },
  {
    "url": "pt/sync/user-guide/import-ledger.html",
    "revision": "b5086dfc9c7a19e1944f08af0e31666b"
  },
  {
    "url": "pt/sync/user-guide/index.html",
    "revision": "44eb2cbb1f7cc624f60291822f47f873"
  },
  {
    "url": "pt/sync/user-guide/interact-with-dapps.html",
    "revision": "26392afae1b836f30baf47712baf6ba3"
  },
  {
    "url": "pt/sync/user-guide/report-issue.html",
    "revision": "4c1ea24f9cce4c261a05a6a896168521"
  },
  {
    "url": "pt/sync/user-guide/settings.html",
    "revision": "6079915d85fa2cc186744794e3302bc0"
  },
  {
    "url": "pt/sync2/faq.html",
    "revision": "ed6e1ddf523d1c5903fef010f5b40d47"
  },
  {
    "url": "pt/sync2/get-started.html",
    "revision": "b1e861f9ad546cf22d234ab771870aa2"
  },
  {
    "url": "pt/sync2/user-guide/activities.html",
    "revision": "8010a87aacafac554200d3ac7a56523f"
  },
  {
    "url": "pt/sync2/user-guide/index.html",
    "revision": "b09b5017eea1c72e76b7b43491e8bdb1"
  },
  {
    "url": "pt/sync2/user-guide/settings.html",
    "revision": "e294a825e529fd03d560e9202e9999bc"
  },
  {
    "url": "pt/sync2/user-guide/signing.html",
    "revision": "7f8c28394d7aa894879330e771eeb8a4"
  },
  {
    "url": "pt/sync2/user-guide/wallet.html",
    "revision": "0e423bb14e2366108d90274e65e5f4d0"
  },
  {
    "url": "pt/thor/get-started/api.html",
    "revision": "e65f19a0571d2ce99d813cbdd43f8810"
  },
  {
    "url": "pt/thor/get-started/custom-network.html",
    "revision": "107c4df8f472c5876487a2cb6babde0c"
  },
  {
    "url": "pt/thor/get-started/installation.html",
    "revision": "a0595504ea9ee5af8319cfe01ac0db7c"
  },
  {
    "url": "pt/thor/learn/block.html",
    "revision": "1e623e3cbbf2896542c34fbf7b3eddaa"
  },
  {
    "url": "pt/thor/learn/builtin-contracts.html",
    "revision": "2da35370a0006beb1841cd1b76297242"
  },
  {
    "url": "pt/thor/learn/faq.html",
    "revision": "8962be2b4da8561f99b46f346247062f"
  },
  {
    "url": "pt/thor/learn/fee-delegation.html",
    "revision": "28eee2c58ed2cf3671e6c607127d4297"
  },
  {
    "url": "pt/thor/learn/index.html",
    "revision": "8f952c2e5940af8f778a6db38b8aa9f6"
  },
  {
    "url": "pt/thor/learn/proof-of-authority.html",
    "revision": "96ac04628d19977240c02eee861ded90"
  },
  {
    "url": "pt/thor/learn/transaction-calculation.html",
    "revision": "2b51c56ace9ebe60eabe52e7e8e1b922"
  },
  {
    "url": "pt/thor/learn/transaction-model.html",
    "revision": "61c3bea9e70b0e883d3eafdb9a02d4ba"
  },
  {
    "url": "pt/thor/learn/two-token-design.html",
    "revision": "e98931ea6221637b867707217fd4e37d"
  },
  {
    "url": "pt/tutorials/Connex-upgrade-Connex2_en.html",
    "revision": "26cb810c91d42c350a44d92543acf203"
  },
  {
    "url": "pt/tutorials/Connex-upgrade-Connex2.html",
    "revision": "9a53e04fcb24523adbd60f45a68c5be1"
  },
  {
    "url": "pt/tutorials/contribute.html",
    "revision": "2018cbb5b0eef1140f0dadd109ddfc65"
  },
  {
    "url": "pt/tutorials/designated-fee-delegation.html",
    "revision": "7055633cbeea0a277879d1f6dcb24a7c"
  },
  {
    "url": "pt/tutorials/forcible-transaction-dependency.html",
    "revision": "8cac0bd415874bc57ab898042c86d39a"
  },
  {
    "url": "pt/tutorials/how-to-develop-a-dapp-on-vechain-1.html",
    "revision": "8e5826c5bd738e99443fff9d4a895609"
  },
  {
    "url": "pt/tutorials/how-to-develop-a-dapp-on-vechain-2.html",
    "revision": "424b536d27afb7a40c6164f647c883cf"
  },
  {
    "url": "pt/tutorials/how-to-develop-a-dapp-on-vechain-3.html",
    "revision": "1cbb0e56f8558dd591f9747baddd787c"
  },
  {
    "url": "pt/tutorials/how-to-integrate-VIP-191-1.html",
    "revision": "6c1bc84a2581e6c28f8782c7ac0d8363"
  },
  {
    "url": "pt/tutorials/how-to-integrate-VIP-191-2.html",
    "revision": "fe161f6a8c9b12d42e8b106a6bf2ff5c"
  },
  {
    "url": "pt/tutorials/how-to-integrate-VIP-191-3.html",
    "revision": "2b015d747980e5683dd024a4ca499e21"
  },
  {
    "url": "pt/tutorials/index.html",
    "revision": "d2f17880af5a8cc75f66a76296da1c08"
  },
  {
    "url": "pt/tutorials/Useful-tips-for-building-a-dApp.html",
    "revision": "f8d207630ac8a1dc609e37a3c336bfea"
  },
  {
    "url": "sync/download-and-install.html",
    "revision": "145cbd280645de4b5a193f497064562f"
  },
  {
    "url": "sync/faq.html",
    "revision": "71a9712d29c0cd3ebb0f0b34c691589e"
  },
  {
    "url": "sync/user-guide/activities.html",
    "revision": "c060f384a2f022e04f29a6e55a190999"
  },
  {
    "url": "sync/user-guide/browse-dapp-and-web.html",
    "revision": "3eb65d9a0299ec1f942eecfb5e8b39d3"
  },
  {
    "url": "sync/user-guide/contribute.html",
    "revision": "2a75606363bfa771870972e5047b840c"
  },
  {
    "url": "sync/user-guide/contributing.html",
    "revision": "bda05824dbcf78e896178b05219c7504"
  },
  {
    "url": "sync/user-guide/import-ledger.html",
    "revision": "ab57d362ccca336871e7d42023c615c4"
  },
  {
    "url": "sync/user-guide/index.html",
    "revision": "f3c271d44f3ed7e2dc2cbbcf09e32c9c"
  },
  {
    "url": "sync/user-guide/interact-with-dapps.html",
    "revision": "5d5347734f5c37dc511dc0c09cd92eeb"
  },
  {
    "url": "sync/user-guide/report-issue.html",
    "revision": "b5f6f2d4426db4ffc8c38a72b758c4a9"
  },
  {
    "url": "sync/user-guide/settings.html",
    "revision": "7944f307c2b3d2858b1a10ad68d9cafe"
  },
  {
    "url": "sync2/faq.html",
    "revision": "d1ea7a24b53e1381315d24c975e60b80"
  },
  {
    "url": "sync2/get-started.html",
    "revision": "e7e123183d780c24a58fd8ab494486c6"
  },
  {
    "url": "sync2/user-guide/activities.html",
    "revision": "cedfa9ac35b362643d36eb1179fc5069"
  },
  {
    "url": "sync2/user-guide/index.html",
    "revision": "810d1b524ff5efc766c69a88755873fd"
  },
  {
    "url": "sync2/user-guide/settings.html",
    "revision": "d21b7e732a9b591024b8e55bde7ed320"
  },
  {
    "url": "sync2/user-guide/signing.html",
    "revision": "a8621f7b0a3efd1eedfc07d58b184f26"
  },
  {
    "url": "sync2/user-guide/wallet.html",
    "revision": "cf7d4558ee9e90465c5e2973c43a657a"
  },
  {
    "url": "thor/get-started/api.html",
    "revision": "dc596781836be2e9daaf6b44e361f181"
  },
  {
    "url": "thor/get-started/custom-network.html",
    "revision": "74e28fae16a472334a02aa8bbea64629"
  },
  {
    "url": "thor/get-started/installation.html",
    "revision": "80beb1f1eee959ab0bb6174fde51b93e"
  },
  {
    "url": "thor/learn/block.html",
    "revision": "4acc1984efd0db99d4d8cfec2160aba7"
  },
  {
    "url": "thor/learn/builtin-contracts.html",
    "revision": "e59f865ad066de1e7187df9f78b88bf1"
  },
  {
    "url": "thor/learn/faq.html",
    "revision": "07c8446198259e344e44d7dc0860aaf8"
  },
  {
    "url": "thor/learn/fee-delegation.html",
    "revision": "d8efe5e7457561f1e478260cdc705de6"
  },
  {
    "url": "thor/learn/index.html",
    "revision": "c88551520ced81d1b5b7063fc4fa9c2e"
  },
  {
    "url": "thor/learn/proof-of-authority.html",
    "revision": "c88e7370756e0b22dbf500cd4932586b"
  },
  {
    "url": "thor/learn/transaction-calculation.html",
    "revision": "d354c81159a6984d14d3d747c48773ef"
  },
  {
    "url": "thor/learn/transaction-model.html",
    "revision": "87e9ab24d314e3930ee3eab97b2d3d40"
  },
  {
    "url": "thor/learn/two-token-design.html",
    "revision": "0efb8f9f54495a4e9a3cda2ff09687b3"
  },
  {
    "url": "tutorials/Connex-upgrade-Connex2_en.html",
    "revision": "891ccb87a2940fcd39ca1e260e2c04ae"
  },
  {
    "url": "tutorials/Connex-upgrade-Connex2.html",
    "revision": "70a076c694437803a755131db7565e1b"
  },
  {
    "url": "tutorials/contribute.html",
    "revision": "3a79a4062d4527425a3aa1917db5f3b1"
  },
  {
    "url": "tutorials/designated-fee-delegation.html",
    "revision": "31abb23fa88b12f40ef69dd86197a54a"
  },
  {
    "url": "tutorials/forcible-transaction-dependency.html",
    "revision": "cef20be23a1f4cdac55256a3abb4d4e8"
  },
  {
    "url": "tutorials/how-to-connect-sync2-to-solo-node.html",
    "revision": "7380506f8e90b4d6b2403f2cda59b52e"
  },
  {
    "url": "tutorials/how-to-develop-a-dapp-on-vechain-1.html",
    "revision": "fb536bc925b5417224228c3666ba8f51"
  },
  {
    "url": "tutorials/how-to-develop-a-dapp-on-vechain-2.html",
    "revision": "807a66d72f0ed6c6fa976ea5971a14f7"
  },
  {
    "url": "tutorials/how-to-develop-a-dapp-on-vechain-3.html",
    "revision": "de8648c55b26550bcbb09918d2f2a5bd"
  },
  {
    "url": "tutorials/how-to-integrate-VIP-191-1.html",
    "revision": "b1f24fdcec09bd8bb740d6e45df15826"
  },
  {
    "url": "tutorials/how-to-integrate-VIP-191-2.html",
    "revision": "0a1357a507886cd7265c277d62b9120d"
  },
  {
    "url": "tutorials/how-to-integrate-VIP-191-3.html",
    "revision": "9985cbfad50049b7e60dac4b040b56bf"
  },
  {
    "url": "tutorials/index.html",
    "revision": "0e9d3b2ae058fa6e458d6a45d73f0c1c"
  },
  {
    "url": "tutorials/Useful-tips-for-building-a-dApp.html",
    "revision": "413a406c70bf209e4686beb4c6d8a61e"
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
