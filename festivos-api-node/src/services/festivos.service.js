import { calcularPascua } from "../utils/pascua.util.js";
import {
  fechasFijas,
  fechasTrasladables,
  fechasPascua,
} from "../utils/festivos.util.js";

function format(fecha) {
  return fecha.toISOString().slice(0, 10);
}

export async function esFestivo(fecha) {
  const year = fecha.getUTCFullYear();
  const pascua = calcularPascua(year);
  const conjunto = new Set([
    ...(await fechasFijas(year)).map(format),
    ...(await fechasTrasladables(year)).map(format),
    ...(await fechasPascua(pascua)).map(format),
  ]);
  return conjunto.has(format(fecha));
}

export async function descripcionFestivo(fecha) {
  const year = fecha.getUTCFullYear();
  const pascua = calcularPascua(year);
  const mapa = new Map();
  for (const f of await fechasFijas(year)) mapa.set(format(f.fecha), f.nombre);
  for (const f of await fechasTrasladables(year))
    mapa.set(format(f.fecha), f.nombre);
  for (const f of await fechasPascua(pascua)) mapa.set(format(f.fecha), f.nombre);
  return mapa.get(format(fecha)) || null;
}

export async function listarFestivosAnio(year) {
  const pascua = calcularPascua(year);
  const lista = [
    ...(await fechasFijas(year)),
    ...(await fechasTrasladables(year)),
    ...(await fechasPascua(pascua)),
  ];
  lista.sort((a, b) => a.fecha - b.fecha);
  return lista;
}

export async function analizarFestivos(year) {
  const crudos = await listarFestivosAnio(year);
  const grupos = new Map();
  for (const item of crudos) {
    const key = item.fecha.toISOString().slice(0, 10);
    if (!grupos.has(key)) grupos.set(key, []);
    grupos.get(key).push(item.nombre);
  }
  const festivos = Array.from(grupos.entries())
    .map(([fecha, descripciones]) => ({ fecha, descripciones }))
    .sort((a, b) => (a.fecha < b.fecha ? -1 : a.fecha > b.fecha ? 1 : 0));
  const solapados = festivos.filter(f => f.descripciones.length > 1);
  return { festivos, solapados };
}
