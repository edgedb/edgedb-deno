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

import _connect from "./_src/client.ts";
export const connect = _connect;
export default connect;

export {RawConnection as _RawConnection} from "./_src/client.ts";

export {createPool} from "./_src/pool.ts";

export type {Connection, Pool} from "./_src/ifaces.ts";

export {IsolationLevel, RetryCondition, RetryOptions} from "./_src/options.ts";
export {defaultBackoff} from "./_src/options.ts";
export type {BackoffFunction} from "./_src/options.ts";

export * from "./_src/index.shared.ts";
