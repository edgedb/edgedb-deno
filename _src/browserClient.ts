import { BaseClientPool, Client, ConnectOptions } from "./baseClient.ts";
import { getConnectArgumentsParser } from "./conUtils.ts";
import cryptoUtils from "./browserCrypto.ts";
import { EdgeDBError } from "./errors/index.ts";
import { FetchConnection } from "./fetchConn.ts";
import { getHTTPSCRAMAuth } from "./httpScram.ts";
import { Options } from "./options.ts";

const parseConnectArguments = getConnectArgumentsParser(null);
const httpSCRAMAuth = getHTTPSCRAMAuth(cryptoUtils);

class FetchClientPool extends BaseClientPool {
  isStateless = true;
  _connectWithTimeout = FetchConnection.createConnectWithTimeout(httpSCRAMAuth);
}

export function createClient(): Client {
  throw new EdgeDBError(
    `'createClient()' cannot be used in browser (or edge runtime) environment, ` +
      `use 'createHttpClient()' API instead`
  );
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
