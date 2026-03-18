import { strict as assert } from "assert";
import { analizarFestivos } from "../../src/services/festivos.service.js";

export default async function run() {
  const data = await analizarFestivos(2026);
  assert.equal(Array.isArray(data.solapados), true);
  assert.equal(data.solapados.length, 0);
}
