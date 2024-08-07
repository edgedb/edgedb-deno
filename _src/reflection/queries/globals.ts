import type { Executor } from "../../ifaces.ts";
import type { Cardinality } from "../enums.ts";
import type { UUID } from "./queryTypes.ts";
import type { StrictMap } from "../strictMap.ts";

export type Global = {
  id: UUID;
  name: string;
  has_default: boolean;
  target_id: UUID;
  card: Cardinality;
};

export type Globals = StrictMap<UUID, Global>;

export async function globals(cxn: Executor): Promise<Globals> {
  const globalsMap = new Map();
  const version = await cxn.queryRequiredSingle<number>(
    `select sys::get_version().major;`,
  );
  if (version === 1) {
    return globalsMap;
  }

  const QUERY = `
    WITH
      MODULE schema
    SELECT schema::Global {
      id,
      name,
      target_id := .target.id,
      card := ("One" IF .required ELSE "One" IF EXISTS .default ELSE "AtMostOne")
        IF <str>.cardinality = "One" ELSE
        ("AtLeastOne" IF .required ELSE "Many"),
      has_default := exists .default,
    }
    ORDER BY .name;
  `;

  const allGlobals: Global[] = JSON.parse(await cxn.queryJSON(QUERY));
  for (const g of allGlobals) {
    globalsMap.set(g.id, g);
  }

  return globalsMap;
}
