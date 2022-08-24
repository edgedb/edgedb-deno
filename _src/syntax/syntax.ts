import type {TypeSet, setToTsType} from "../reflection/index.ts";

export * from "./literal.ts";
export * from "./path.ts";
export * from "./set.ts";
export * from "./cast.ts";
export * from "./select.ts";
export * from "./update.ts";
export * from "./insert.ts";
export * from "./group.ts";
export * from "./collections.ts";
export * from "./funcops.ts";
export * from "./for.ts";
export * from "./with.ts";
export * from "./params.ts";
export * from "./globals.ts";
export * from "./detached.ts";
export * from "./toEdgeQL.ts";
export * from "./range.ts";

export type $infer<A extends TypeSet> = setToTsType<A>;
