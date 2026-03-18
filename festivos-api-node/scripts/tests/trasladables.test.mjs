import { strict as assert } from "assert";
import { listarFestivosAnio } from "../../src/services/festivos.service.js";

export default async function run() {
  const lista = await listarFestivosAnio(2026);
  const found = lista.find(x => x.nombre === "San José");
  assert.ok(found);
  const iso = found.fecha.toISOString().slice(0, 10);
  assert.equal(iso, "2026-03-23");
}
