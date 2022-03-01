# Subgraph

NEAR collect's subgraph. It listens for actions on the order-book and common-good contracts, then constructs Token and Order entities to be easily queried.
To understand more about how this works, read more about [subgraphs](https://thegraph.com/docs/en/explorer#subgraphs) and [The Graph](https://thegraph.com/en/).


To view and query the subgraph, it can be found here: 
- [near-testnet](https://thegraph.com/hosted-service/subgraph/elliotbraem/common-good)
- [near-mainnet]() - not yet deployed


To learn more about how the subgraph is defined and created, explore the following files:
- subgraph.yaml - configuration
- schema.graphql - defines entity schemas
- src/handlers/common-good.ts - defines the handlers for the common-good contract methods
- src/handlers/order-book.ts - defines the handlers for the order-book contract methods


## Usage

After making any changes to the schema, run
```shell
yarn codegen
```
This will compile and generate the entities to be used in the handlers.

Then, to build the graph for deployment, run
```shell
yarn build
```


## Deployment

Only developers with the access token can deploy subgraphs.

If you have the access token, first login:
```shell
yarn auth {{access-token}}
```

Then deploy:

```shell
yarn deploy
```

The subgraph will then resync from the start block designated in the subgraph.yml

