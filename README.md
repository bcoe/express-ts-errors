# Demonstrate Express Having Stack Trace Issues With TypeScript

This repo can be used as a starting point to add better stack trace support to
depd, and eventually express as a whole see: [nodejs-depd/issues/39]([https://github.com/dougwilson/nodejs-depd/issues/39]).

1. install dependencies, `npm i`.
1. run the server, `npm run serve`.
1. hit the route, `/exceptional`, note that the lines in the stack trace
  do not map back to `src/index.ts`.

## Reproducing error in node/issues/29994

You can reproduce the error discussed in [node/issues/29994](https://github.com/nodejs/node/issues/29994), by running:

```bash
NODE_OPTIONS=--enable-source-maps npm run serve
```

## Ideal Output

Here's output that, in my opinion, would be good for us to move towards:

```bash
Error: my stack trace stinks
    at /Users/bencoe/oss/express-ts-errors/build/src/index.js:14:15
        -> /Users/bencoe/oss/express-ts-errors/src/index.ts:19:11
```

☝️ see how it includes the correct line in the `.ts` file, along with the
transpiled line.

## Userland source-map-support

There is a userland module called [source-map-support](https://github.com/evanw/node-source-map-support), which does work with express.

You can try this out by running:

```bash
npm run serve-source-map-suppport
```

This module does seem to work in conjunction with `depd`, you can test this
out by hitting the endpoint `/success` (which is "deprecated").

```bash
Error: my stack trace stinks
    at /Users/bencoe/oss/express-ts-errors/src/index.ts:19:11
```