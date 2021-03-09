# EdgeDB Deno driver

`edgedb-deno` is the official [EdgeDB](https://github.com/edgedb/edgedb) driver for Deno. 🦕

This repo is automatically generated from the source of the
`edgedb-js` driver. For documentation, issues, or details about the development of `edgedb-deno`, please refer to the [edgedb-js](https://github.com/edgedb/edgedb-js) repo.

## Import

```typescript
import * as edgedb from "https://deno.land/x/...@.../mod.ts";
```

Following Deno convention it is recommended to always import a specific tagged version of `edgedb-deno`, and to not import from the underscored `/_src` path (all of `edgedb-deno`'s public API is exported from the `/mod.ts` file).

The `main` branch of this repo mirrors the latest commits to the `master` branch of [edgedb-js](https://github.com/edgedb/edgedb-js), though it not recommended to import from this branch directly, as may contain breaking changes.

## Quick start

First install EdgeDB, then create and start an EdgeDB instance. The tutorial in the EdgeDB docs is a good place to get started: https://www.edgedb.com/docs/tutorial/index/

Now you're ready to import `edgedb-deno` and start querying your database:

```typescript
import * as edgedb from "https://deno.land/x/...@.../mod.ts"

const conn = await edgedb.connect('tutorial');

console.log(
  await conn.fetchOne("SELECT 1 + <int64>$num", {num: 2});
);

await conn.close();
```

For the full documentation see the [edgedb-js docs](https://www.edgedb.com/docs/clients/01_js/index).

## Permissions

The permissions `edgedb-deno` may require are detailed below:

### `--allow-net` (required)

This permission is required to connect to EdgeDB instances.

### `--allow-env` (optional)

Needed if connecting with an instance name, to get your home directory (where the `.edgedb` directory is located).

### `--allow-read` (optional)

Needed if connecting with an instance name, to read instance credentials file from `<home-dir>/.edgedb/credentials`.

## `--unstable` flag

`edgedb-deno` supports connecting to an EdgeDB instance via a unix socket file, however this currently requires using the `--unstable` flag, and the `--allow-read` and `--allow-write` permissions for the socket file.
