import { BaseClientPool, Client, type ConnectOptions } from "./baseClient.ts";
import { parseConnectArguments } from "./conUtils.server.ts";
import cryptoUtils from "./adapter.crypto.deno.ts";
import { Options } from "./options.ts";
import { RawConnection } from "./rawConn.ts";
import { FetchConnection } from "./fetchConn.ts";
import { getHTTPSCRAMAuth } from "./httpScram.ts";

class ClientPool extends BaseClientPool {
  isStateless = false;
  _connectWithTimeout = RawConnection.connectWithTimeout.bind(RawConnection);
}

export function createClient(options?: string | ConnectOptions | null): Client {
  return new Client(
    new ClientPool(
      parseConnectArguments,
      typeof options === "string" ? { dsn: options } : options ?? {}
    ),
    Options.defaults()
  );
}

const httpSCRAMAuth = getHTTPSCRAMAuth(cryptoUtils);

class FetchClientPool extends BaseClientPool {
  isStateless = true;
  _connectWithTimeout = FetchConnection.createConnectWithTimeout(httpSCRAMAuth);
}

export function createHttpClient(
  options?: string | ConnectOptions | null
): Client {
  return new Client(
    new FetchClientPool(
      parseConnectArguments,
      typeof options === "string" ? { dsn: options } : options ?? {}
    ),
    Options.defaults()
  );
}
