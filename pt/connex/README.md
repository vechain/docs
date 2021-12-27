---
sidebarDepth: 1
---
# Connex

Connex é a interface padrão para conectar dApps com o VeChain blockchain e usuários. Tem como objetivo ajudar programadores a desenvolver aplicações decentralizadas.

## Instalação

### Incluir `<script>` tag

Basta incluir script tag com link do CDN. `Connex` estará então registrada como uma variável global.

```html
<!-- install the latest v2 -->
<script src="https://unpkg.com/@vechain/connex@2" />
```

### NPM

Recomendado caso seu projeto seja muito grande.

``` sh
npm i @vechain/connex
```

```ts
import Connex from '@vechain/connex'
```

## Configuração

### Criando objeto Connex e conectando com VeChain mainnet

```ts
const connex = new Connex({
    node: 'https://mainnet.veblocks.net/', // veblocks public node, use your own if needed
    network: 'main' // defaults to mainnet, so it can be omitted here
})
```

### Conectando com testnet

```ts
const connex = new Connex({
    node: 'https://testnet.veblocks.net/',
    network: 'test'
})
```

### Conectando à uma rede privada

```ts
const connex = new Connex({
    node: '<the API url of your node>',
    // the genesis block of your private network
    network: {
        id: '0x...',
        ...
    }
})
```

### Criando módulo `Vendor`

Em alguns casos, por exemplo o clássico ['Buy me a coffee'](https://codepen.io/qianbin/pen/YzGBeOB), você não precisa da abilidade de acessar o blockchain. Você pode optar por não utilizar o módulo `Connex.Thor`, e apenas criar o módulo `Connex.Vendor`.

```ts
const vendor = new Connex.Vendor('main') // 'main','test' or genesis ID if it's private network
```

## Playground
 
 O pacote [@vechain/connex-repl](https://www.npmjs.com/package/@vechain/connex-repl) contém uma forma rápida de experimentar a interface connex.

## Código Fonte

+ [connex](https://github.com/vechain/connex/blob/master/packages/connex): Implemantação Connex para browsers, pronta pra usar.
+ [framework](https://github.com/vechain/connex/blob/master/packages/framework): Implementação da interface Connex.
+ [driver](https://github.com/vechain/connex/blob/master/packages/driver): Implementação Connex. Interface driver.
+ [repl](https://github.com/vechain/connex/blob/master/packages/repl): Playground linha de comando em estilo REPL.
+ [types](https://github.com/vechain/connex/blob/master/packages/types): Declarações da interface Connex em Typescript.
