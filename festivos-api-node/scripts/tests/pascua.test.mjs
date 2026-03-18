import { strict as assert } from "assert";
import { calcularPascua } from "../../src/utils/pascua.util.js";

export default async function run() {
  const fecha = calcularPascua(2026);
  const iso = fecha.toISOString().slice(0, 10);
  assert.equal(iso, "2026-04-05");
}
