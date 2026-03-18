import "dotenv/config";
import readline from "readline/promises";
import { stdin as input, stdout as output } from "process";
import { listarFestivosAnio, analizarFestivos } from "../src/services/festivos.service.js";

function printTable(rows) {
  const header = "FECHA       DESCRIPCION";
  const lines = rows.map(x => `${x.fecha.padEnd(12)}${x.descripcion}`);
  console.log(header);
  for (const l of lines) console.log(l);
}

function printAnalisis(data) {
  console.log("FESTIVOS");
  for (const x of data.festivos) {
    console.log(`${x.fecha.padEnd(12)}${x.descripciones.join(" | ")}`);
  }
  console.log("");
  console.log("SOLAPADOS");
  for (const x of data.solapados) {
    console.log(`${x.fecha.padEnd(12)}${x.descripciones.join(" | ")}`);
  }
}

async function main() {
  const argYear = process.argv[2];
  const envYear = process.env.YEAR;
  let yearStr = envYear ?? argYear;

  const rl = (!yearStr) ? readline.createInterface({ input, output }) : null;
  if (!yearStr) {
    yearStr = await rl.question("Ingrese el año a analizar: ");
    await rl.close();
  }
  const year = Number(yearStr);
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    console.error("Año inválido");
    process.exit(1);
  }
  const listaCruda = await listarFestivosAnio(year);
  const lista = listaCruda.map(i => ({
    fecha: i.fecha.toISOString().slice(0, 10),
    descripcion: i.nombre,
  }));
  printTable(lista);
  console.log("");
  const analisis = await analizarFestivos(year);
  printAnalisis(analisis);
}

main();
