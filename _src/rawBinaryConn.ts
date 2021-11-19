/*!
 * This source file is part of the EdgeDB open source project.
 *
 * Copyright 2019-present MagicStack Inc. and the EdgeDB authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Buffer} from "./globals.deno.ts";

import {NULL_CODEC} from "./codecs/codecs.ts";
import {CodecsRegistry} from "./codecs/registry.ts";
import {EMPTY_TUPLE_CODEC} from "./codecs/tuple.ts";
import {NormalizedConnectConfig} from "./conUtils.ts";
import {PrepareMessageHeaders, ProtocolVersion} from "./ifaces.ts";
import {WriteBuffer} from "./primitives/buffer.ts";
import {RawConnection} from "./rawConn.ts";
import {retryingConnect} from "./retry.ts";
import {versionGreaterThanOrEqual} from "./utils.ts";

export class RawBinaryConnection {
  // Note that this class, while exported, is not documented.
  // Its API is subject to change.

  constructor(
    private _connection: RawConnection,
    private _config: NormalizedConnectConfig,
    private _registry: CodecsRegistry
  ) {}

  static async retryingConnectWithTimeout(
    config: NormalizedConnectConfig,
    registry: CodecsRegistry = new CodecsRegistry()
  ): Promise<RawBinaryConnection> {
    const conn = await retryingConnect(config, registry);

    return new RawBinaryConnection(conn, config, registry);
  }

  async reconnect(): Promise<void> {
    if (!this._connection.isClosed()) {
      await this._connection.close();
    }
    this._connection = await retryingConnect(this._config, this._registry);
  }

  async close(): Promise<void> {
    await this._connection.close();
  }

  public async rawParse(
    query: string,
    headers?: PrepareMessageHeaders
  ): Promise<[Buffer, Buffer, ProtocolVersion]> {
    const result = await this._connection._parse(query, false, false, true, {
      headers,
    });
    return [result[3]!, result[4]!, this._connection.protocolVersion];
  }

  public async rawExecute(encodedArgs: Buffer | null = null): Promise<Buffer> {
    const result = new WriteBuffer();
    let inCodec = EMPTY_TUPLE_CODEC;
    if (versionGreaterThanOrEqual(this._connection.protocolVersion, [0, 12])) {
      inCodec = NULL_CODEC;
    }
    await this._connection._executeFlow(
      encodedArgs, // arguments
      inCodec, // inCodec -- to encode lack of arguments.
      EMPTY_TUPLE_CODEC, // outCodec -- does not matter, it will not be used.
      result
    );
    return result.unwrap();
  }
}
