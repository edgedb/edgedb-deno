import {BaseClientPool, Client, ConnectOptions} from "./baseClient.ts";
import {FetchClientPool} from "./browserClient.ts";
import {parseConnectArguments} from "./conUtils.server.ts";
import {Options} from "./options.ts";
import {RawConnection} from "./rawConn.ts";

class ClientPool extends BaseClientPool {
  isStateless = false;
  _connectWithTimeout = RawConnection.connectWithTimeout.bind(RawConnection);
}

export function createClient(
  options?: string | ConnectOptions | null
): Client {
  return new Client(
    new ClientPool(
      parseConnectArguments,
      typeof options === "string" ? {dsn: options} : options ?? {}
    ),
    Options.defaults()
  );
}

export function createHttpClient(
  options?: string | ConnectOptions | null
): Client {
  return new Client(
    new FetchClientPool(
      parseConnectArguments,
      typeof options === "string" ? {dsn: options} : options ?? {}
    ),
    Options.defaults()
  );
}
