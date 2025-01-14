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

import {
  type ReadBuffer,
  type WriteBuffer,
  uuidToBuffer,
} from "../primitives/buffer.ts";
import { KNOWN_TYPES } from "./consts.ts";

export type uuid = string;

export type CodecKind =
  | "array"
  | "tuple"
  | "namedtuple"
  | "object"
  | "set"
  | "scalar"
  | "sparse_object"
  | "range"
  | "multirange"
  | "record";

export interface ICodec {
  readonly tid: uuid;
  readonly tidBuffer: Uint8Array;

  encode(buf: WriteBuffer, object: any): void;
  decode(buf: ReadBuffer): any;

  getSubcodecs(): ICodec[];
  getKind(): CodecKind;
  getKnownTypeName(): string;
}

export interface IArgsCodec {
  encodeArgs(args: any): Uint8Array;
}

export abstract class Codec {
  readonly tid: uuid;
  readonly tidBuffer: Uint8Array;

  constructor(tid: uuid) {
    this.tid = tid;
    this.tidBuffer = uuidToBuffer(tid);
  }

  getKnownTypeName(): string {
    return "anytype";
  }
}

export abstract class ScalarCodec extends Codec {
  private derivedFromTid: uuid | null = null;
  private typeName: string | null = null;

  constructor(
    tid: uuid,
    typeName: string | null,
    derivedFromTid: uuid | null = null,
  ) {
    super(tid);
    this.derivedFromTid = derivedFromTid;
    this.typeName = typeName;
  }

  /** @internal */
  setTypeName(typeName: string): void {
    this.typeName = typeName;
  }

  derive(tid: uuid, typeName: string | null): Codec {
    const self = this.constructor;
    return new (self as any)(tid, this.tid, typeName) as Codec;
  }

  getSubcodecs(): ICodec[] {
    return [];
  }

  getKind(): CodecKind {
    return "scalar";
  }

  readonly tsType: string = "unknown";
  readonly tsModule: string | null = null;

  override getKnownTypeName(): string {
    if (this.typeName) {
      return this.typeName;
    }

    if (this.derivedFromTid) {
      return KNOWN_TYPES.get(this.derivedFromTid)!;
    }

    return KNOWN_TYPES.get(this.tid) || "anytype";
  }
}
