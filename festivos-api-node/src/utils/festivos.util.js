import { obtenerTipos } from "../repositories/tipos.repo.js";

function utcDate(year, month, day) {
  return new Date(Date.UTC(year, month - 1, day));
}

function trasladarALunes(fecha) {
  const dia = fecha.getUTCDay();
  if (dia === 1) return fecha;
  const diff = (8 - dia) % 7;
  const moved = new Date(fecha.getTime());
  moved.setUTCDate(moved.getUTCDate() + diff);
  return moved;
}

export async function fechasFijas(year) {
  const tipos = await obtenerTipos();
  const fijo = tipos.find(t => t.tipo === "Fijo");
  if (!fijo) return [];
  return fijo.festivos.map(f => ({
    fecha: utcDate(year, f.mes, f.dia),
    nombre: f.nombre
  }));
}

export async function fechasTrasladables(year) {
  const tipos = await obtenerTipos();
  const puente = tipos.find(t => t.tipo && t.tipo.includes("Puente"));
  if (!puente) return [];
  return puente.festivos.map(f => {
    const base = utcDate(year, f.mes, f.dia);
    return { fecha: trasladarALunes(base), nombre: f.nombre };
  });
}

export async function fechasPascua(pascua) {
  const tipos = await obtenerTipos();
  const conDias = tipos.filter(t => Array.isArray(t.festivos) && t.festivos.some(x => typeof x.diasPascua === "number"));
  const lista = [];
  for (const t of conDias) {
    for (const f of t.festivos) {
      if (typeof f.diasPascua !== "number") continue;
      const d = new Date(pascua.getTime());
      d.setUTCDate(d.getUTCDate() + f.diasPascua);
      const esTrasladablePorPascua = f.diasPascua > 0;
      lista.push({
        fecha: esTrasladablePorPascua ? trasladarALunes(d) : d,
        nombre: f.nombre
      });
    }
  }
  return lista;
}
