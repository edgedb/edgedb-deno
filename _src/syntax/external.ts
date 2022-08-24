import type {TypeSet, setToTsType} from "../reflection/index.ts";

export {literal} from "./literal.ts";
export {} from "./path.ts";
export {set} from "./set.ts";
export {cast} from "./cast.ts";
export {
  ASC,
  DESC,
  EMPTY_FIRST,
  EMPTY_LAST,
  is,
  delete,
  select,
} from "./select.ts";
export {update} from "./update.ts";
export {insert} from "./insert.ts";
export {array, tuple} from "./collections.ts";
export {} from "./funcops.ts";
export {for} from "./for.ts";
export {alias, with} from "./with.ts";
export {optional, params} from "./params.ts";
export {detached} from "./detached.ts";
export {} from "./toEdgeQL.ts";

export type $infer<A extends TypeSet> = setToTsType<A>;
