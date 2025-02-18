import * as errors from "./errors/index.ts";
import { utf8Encoder } from "./primitives/buffer.ts";

export type BackoffFunction = (n: number) => number;

export function defaultBackoff(attempt: number): number {
  return 2 ** attempt * 100 + Math.random() * 100;
}

export enum IsolationLevel {
  Serializable = "SERIALIZABLE",
}

export enum RetryCondition {
  TransactionConflict,
  NetworkError,
}

class RetryRule {
  readonly attempts: number;
  readonly backoff: BackoffFunction;
  constructor(attempts: number, backoff: BackoffFunction) {
    this.attempts = attempts;
    this.backoff = backoff;
  }
}

export interface PartialRetryRule {
  condition?: RetryCondition;
  attempts?: number;
  backoff?: BackoffFunction;
}

export interface SimpleRetryOptions {
  attempts?: number;
  backoff?: BackoffFunction;
}

export type WarningHandler = (warnings: errors.EdgeDBError[]) => void;

export function throwWarnings(warnings: errors.EdgeDBError[]) {
  throw new Error(
    `warnings occurred while running query: ${warnings.map((warn) => warn.message)}`,
    { cause: warnings },
  );
}

export function logWarnings(warnings: errors.EdgeDBError[]) {
  for (const warning of warnings) {
    console.warn(
      new Error(`EdgeDB warning: ${warning.message}`, { cause: warning }),
    );
  }
}

export class RetryOptions {
  readonly default: RetryRule;
  private overrides: Map<RetryCondition, RetryRule>;

  constructor(attempts = 3, backoff: BackoffFunction = defaultBackoff) {
    this.default = new RetryRule(attempts, backoff);
    this.overrides = new Map();
  }

  withRule(
    condition: RetryCondition,
    attempts?: number,
    backoff?: BackoffFunction,
  ): RetryOptions {
    const def = this.default;
    const overrides = new Map(this.overrides);
    overrides.set(
      condition,
      new RetryRule(attempts ?? def.attempts, backoff ?? def.backoff),
    );
    const result = Object.create(RetryOptions.prototype);
    result.default = def;
    result.overrides = overrides;
    return result;
  }

  getRuleForException(err: errors.EdgeDBError): RetryRule {
    let result;
    if (err instanceof errors.TransactionConflictError) {
      result = this.overrides.get(RetryCondition.TransactionConflict);
    } else if (err instanceof errors.ClientError) {
      result = this.overrides.get(RetryCondition.NetworkError);
    }
    return result ?? this.default;
  }

  static defaults(): RetryOptions {
    return new RetryOptions();
  }
}

export interface SimpleTransactionOptions {
  isolation?: IsolationLevel;
  readonly?: boolean;
  deferrable?: boolean;
}

export class TransactionOptions {
  readonly isolation: IsolationLevel;
  readonly readonly: boolean;
  readonly deferrable: boolean;
  constructor({
    isolation = IsolationLevel.Serializable,
    readonly = false,
    deferrable = false,
  }: SimpleTransactionOptions = {}) {
    this.isolation = isolation;
    this.readonly = readonly;
    this.deferrable = deferrable;
  }

  static defaults(): TransactionOptions {
    return new TransactionOptions();
  }
}

const TAG_ANNOTATION_KEY = "tag";

export interface SessionOptions {
  module?: string;
  moduleAliases?: Record<string, string>;
  config?: Record<string, any>;
  globals?: Record<string, any>;
}

export interface SerializedSessionState {
  module?: string;
  aliases?: [string, string][];
  config?: { [name: string]: unknown };
  globals?: { [name: string]: unknown };
}

export class Session {
  readonly module: string;
  readonly moduleAliases: Record<string, string>;
  readonly config: Record<string, any>;
  readonly globals: Record<string, any>;

  /** @internal */
  annotations = new Map<string, string>();

  get tag(): string | null {
    return this.annotations.get(TAG_ANNOTATION_KEY) ?? null;
  }

  constructor({
    module = "default",
    moduleAliases = {},
    config = {},
    globals = {},
  }: SessionOptions = {}) {
    this.module = module;
    this.moduleAliases = moduleAliases;
    this.config = config;
    this.globals = globals;
  }

  private _clone(mergeOptions: SessionOptions) {
    const session = new Session({ ...this, ...mergeOptions });
    session.annotations = this.annotations;
    return session;
  }

  withModuleAliases({
    module,
    ...aliases
  }: {
    [name: string]: string;
  }): Session {
    return this._clone({
      module: module ?? this.module,
      moduleAliases: { ...this.moduleAliases, ...aliases },
    });
  }

  withConfig(config: { [name: string]: any }): Session {
    return this._clone({
      config: { ...this.config, ...config },
    });
  }

  withGlobals(globals: { [name: string]: any }): Session {
    return this._clone({
      globals: { ...this.globals, ...globals },
    });
  }

  withQueryTag(tag: string | null): Session {
    const session = new Session({ ...this });
    session.annotations = new Map(this.annotations);
    if (tag != null) {
      if (tag.startsWith("edgedb/")) {
        throw new errors.InterfaceError("reserved tag: edgedb/*");
      }
      if (tag.startsWith("gel/")) {
        throw new errors.InterfaceError("reserved tag: gel/*");
      }
      if (utf8Encoder.encode(tag).length > 128) {
        throw new errors.InterfaceError("tag too long (> 128 bytes)");
      }
      session.annotations.set(TAG_ANNOTATION_KEY, tag);
    } else {
      session.annotations.delete(TAG_ANNOTATION_KEY);
    }
    return session;
  }

  /** @internal */
  _serialise() {
    const state: SerializedSessionState = {};
    if (this.module !== "default") {
      state.module = this.module;
    }
    const _aliases = Object.entries(this.moduleAliases);
    if (_aliases.length) {
      state.aliases = _aliases;
    }
    if (Object.keys(this.config).length) {
      state.config = this.config;
    }
    const _globals = Object.entries(this.globals);
    if (_globals.length) {
      state.globals = _globals.reduce(
        (globals, [key, val]) => {
          globals[key.includes("::") ? key : `${this.module}::${key}`] = val;
          return globals;
        },
        {} as { [key: string]: any },
      );
    }
    return state;
  }

  static defaults(): Session {
    return defaultSession;
  }
}

const defaultSession = new Session();

export class Options {
  readonly retryOptions: RetryOptions;
  readonly transactionOptions: TransactionOptions;
  readonly session: Session;
  readonly warningHandler: WarningHandler;

  constructor({
    retryOptions = RetryOptions.defaults(),
    transactionOptions = TransactionOptions.defaults(),
    session = Session.defaults(),
    warningHandler = logWarnings,
  }: {
    retryOptions?: RetryOptions;
    transactionOptions?: TransactionOptions;
    session?: Session;
    warningHandler?: WarningHandler;
  } = {}) {
    this.retryOptions = retryOptions;
    this.transactionOptions = transactionOptions;
    this.session = session;
    this.warningHandler = warningHandler;
  }

  withTransactionOptions(
    opt: TransactionOptions | SimpleTransactionOptions,
  ): Options {
    return new Options({
      ...this,
      transactionOptions:
        opt instanceof TransactionOptions ? opt : new TransactionOptions(opt),
    });
  }

  withRetryOptions(opt: RetryOptions | SimpleRetryOptions): Options {
    return new Options({
      ...this,
      retryOptions:
        opt instanceof RetryOptions
          ? opt
          : new RetryOptions(opt.attempts, opt.backoff),
    });
  }

  withSession(opt: Session): Options {
    return new Options({
      ...this,
      session: opt,
    });
  }

  withWarningHandler(handler: WarningHandler): Options {
    return new Options({ ...this, warningHandler: handler });
  }

  static defaults(): Options {
    return new Options();
  }
}
