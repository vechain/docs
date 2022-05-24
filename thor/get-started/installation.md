# Install

## Requirements

Thor requires `Go` 1.13+ and `C` compiler to build. To install `Go`, follow this [link](https://golang.org/doc/install). 

## Getting the source

Clone the Thor [repo](https://github.com/vechain/thor):

```bash
git clone https://github.com/vechain/thor.git
cd thor
```

### Building

To build the main app `thor`, just run

```bash
make
```

or build the full suite:

```bash
make all
```

If no error reported, all built executable binaries will appear in folder *bin*.

## Running Thor

Connect to VeChain's mainnet:

```bash
bin/thor --network main
```


Connect to VeChain's testnet:

```bash
bin/thor --network test
```

or startup a custom network
```bash
bin/thor --network <custom-net-genesis.json>
```
example genesis config file can be found at [genesis/example.json](https://raw.githubusercontent.com/vechain/thor/master/genesis/example.json).


To find out usages of all command line options:

```bash
bin/thor -h
```


- `--network value`             the network to join (main|test) or path to genesis file
- `--data-dir value`            directory for block-chain databases
- `--cache value`               megabytes of ram allocated to internal caching (default: 2048)
- `--beneficiary value`         address for block rewards
- `--target-gas-limit value`    target block gas limit (adaptive if set to 0) (default: 0)
- `--api-addr value`            API service listening address (default: "localhost:8669")
- `--api-cors value`            comma separated list of domains from which to accept cross origin requests to API
- `--api-timeout value`         API request timeout value in milliseconds (default: 10000)
- `--api-call-gas-limit value`  limit contract call gas (default: 50000000)
- `--api-backtrace-limit value` limit the distance between `position` and best block for subscriptions APIs (default: 1000)
- `--verbosity value`           log verbosity (0-9) (default: 3)
- `--max-peers value`           maximum number of P2P network peers (P2P network disabled if set to 0) (default: 25)
- `--p2p-port value`            P2P network listening port (default: 11235)
- `--nat value`                 port mapping mechanism (any|none|upnp|pmp|extip:\<IP>\) (default: "none")
- `--bootnode value`            comma separated list of bootnode IDs
- `--skip-logs`                 skip writing event|transfer logs (/logs API will be disabled)
- `--pprof`                     turn on go-pprof
- `--disable-pruner`            disable state pruner to keep all history
- `--help, -h`                  show help
- `--version, -v`               print the version


### Sub-commands

- `solo`                client runs in solo mode for test & dev

```bash
bin/thor solo --on-demand               # create new block when there is pending transaction
bin/thor solo --persist                 # save blockchain data to disk(default to memory)
bin/thor solo --persist --on-demand     # two options can work together
```

- `master-key`          master key management

```bash
# print the master address
bin/thor master-key

# export master key to keystore
bin/thor master-key --export > keystore.json


# import master key from keystore
cat keystore.json | bin/thor master-key --import
```

## Docker


**This method needs running all commands by docker with the data directory mapped to the container.**


### Pull image

```sh
docker pull vechain/thor
```

### Export Master Key

First, start an interactive shell by docker:

```sh
docker run -it --rm\
-v {path-to-your-data-directory}:/root/.org.vechain.thor\
--entrypoint /bin/sh vechain/thor
```

Then export master key in the shell:

```sh
thor master-key --export > /root/.org.vechain.thor/keystore.json
```

Enter your password and check the generated file, then exit.


### Import Master Key

```sh
docker run -it --rm\
-v {path-to-your-data-directory}:/root/.org.vechain.thor\
vechain/thor master-key --import
```

Follow the instruction by the program, input the `KeyStore` and also the password.

### Check Master Key

```sh
docker run -it --rm\
-v {path-to-your-data-directory}:/root/.org.vechain.thor\
vechain/thor master-key
```

This command will print the Master Key.

### Start the Authority Masternode

```sh
docker run -d\
-v {path-to-your-data-directory}:/root/.org.vechain.thor\
-p 127.0.0.1:8669:8669 -p 11235:11235 -p 11235:11235/udp\
--name thor-node vechain/thor --network main --skip-logs
```

## Public Nodes
Please visit [Public Nodes](../../others/development-resources.md#public-nodes) for more information.