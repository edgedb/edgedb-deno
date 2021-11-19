import {Executor} from "../../ifaces.ts";
import {StrictMap} from "../strictMap.ts";

import {Param, Typemod} from "./getFunctions.ts";
import {genutil, typeutil} from "../util/util.ts";
import {OperatorKind} from "../enums.ts";

export type {Typemod};

export interface OperatorDef {
  id: string;
  name: string;
  originalName: string;
  operator_kind: OperatorKind;
  description?: string;
  return_type: {id: string; name: string};
  return_typemod: Typemod;
  params: Param[];
}

export type OperatorTypes = typeutil.depromisify<
  ReturnType<typeof getOperators>
>;

export const getOperators = async (cxn: Executor) => {
  const operatorsJson = await cxn.queryJSON(`
    with module schema
    select Operator {
      id,
      name,
      annotations: {
        name,
        @value
      } filter .name in {'std::identifier', 'std::description'},
      operator_kind,
      return_type: {id, name},
      return_typemod,
      params: {
        name,
        type: {id, name},
        kind,
        typemod,
      } order by @index,
    } filter not .internal and not .abstract
  `);

  const operators = new StrictMap<string, OperatorDef[]>();

  for (const op of JSON.parse(operatorsJson)) {
    const identifier = op.annotations.find(
      (anno: any) => anno.name === "std::identifier"
    )?.["@value"];

    if (!identifier) {
      continue;
    }

    const {mod} = genutil.splitName(op.name);

    const name = `${mod}::${identifier}`;

    if (!operators.has(name)) {
      operators.set(name, []);
    }

    operators.get(name).push({
      ...op,
      name,
      kind: op.operator_kind,
      originalName: op.name,
      description: op.annotations.find(
        (anno: any) => anno.name === "std::description"
      )?.["@value"],
      annotations: undefined,
    });
  }

  return operators;
};
