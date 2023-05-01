# EdgeDB Deno driver

[![deno land](http://img.shields.io/badge/available%20on-deno.land/x-lightgrey.svg?logo=deno&labelColor=black)](https://deno.land/x/edgedb) [![Build Status](https://github.com/edgedb/edgedb-js/workflows/Tests/badge.svg?event=push&branch=master)](https://github.com/edgedb/edgedb-js/actions) [![Join GitHub discussions](https://img.shields.io/badge/join-github%20discussions-green)](https://github.com/edgedb/edgedb/discussions)

`edgedb-deno` is the official [EdgeDB](https://github.com/edgedb/edgedb)
driver for Deno. 🦕

This repo is automatically generated from the source of the `edgedb-js` driver.
For documentation, issues, or details about the development of `edgedb-deno`,
please refer to the [edgedb-js](https://github.com/edgedb/edgedb-js) repo.

## Import

```typescript
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";
```

Following Deno convention it is recommended to always import a specific tagged
version of `edgedb-deno`, and to not import from the underscored `/_src` path
(all of `edgedb-deno`'s public API is exported from the `/mod.ts` file).

The `main` branch of this repo mirrors the latest commits to the `master`
branch of [edgedb-js](https://github.com/edgedb/edgedb-js), though it not
recommended to import from this branch directly, as it may contain breaking
changes.

## Quick start

First install EdgeDB, then create and start an EdgeDB instance. The quickstart
guide in the EdgeDB docs is a good place to get started:
https://www.edgedb.com/docs/guides/quickstart

Now you're ready to import `edgedb-deno` and start querying your database:

```typescript
import * as edgedb from "https://deno.land/x/edgedb/mod.ts";

const client = edgedb.createClient();

console.log(await client.querySingle("SELECT 1 + <int64>$num", { num: 2 }));

await client.close();
```

For the full documentation see the
[edgedb-js docs](https://www.edgedb.com/docs/clients/01_js/index).

## Permissions

The permissions `edgedb-deno` may require are detailed below:

### `--allow-net` (required)

This permission is required to connect to EdgeDB instances.

### `--unstable` flag (required)

`edgedb-deno` uses the unstable `alpnProtocols` API on `Deno.connectTls`.

### `--allow-env` (optional)

Needed if connecting with an instance name, to get your home directory (where
the `.edgedb` directory is located).

### `--allow-read` (optional)

Needed if connecting with an instance name, to read the instance credentials
file from `<home-dir>/.edgedb/credentials`.

## Generating typed queries, interfaces and the QueryBuilder

**Follow the up to date guide [here](https://www.edgedb.com/docs/clients/js/index)**

### Prerequisites

1. Create the file `importMap.json` in the root of your Deno project with the following content:

```json
{
  "imports": {
    "edgedb": "https://deno.land/x/edgedb/mod.ts",
    "edgedb/": "https://deno.land/x/edgedb/"
  }
}
```

2. Create the file `deno.json` with the following content:

```json
{
  "importMap": "./importMap.json"
}
```


### Generating the QueryBuilder


```sh
deno run --allow-all --unstable https://deno.land/x/edgedb/generate.ts edgeql-js
```

### Generating typed queries


```sh
deno run --allow-all --unstable https://deno.land/x/edgedb/generate.ts queries
```


### Generating interfaces


```sh
deno run --allow-all --unstable https://deno.land/x/edgedb/generate.ts interfaces
```