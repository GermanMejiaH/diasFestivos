import { esFechaValida } from "../utils/fechas.util.js";
import { esFestivo, descripcionFestivo, listarFestivosAnio, analizarFestivos } from "../services/festivos.service.js";
import { obtenerTipos } from "../repositories/tipos.repo.js";

export async function verificarFestivo(req, res) {
  const year = Number(req.params.year);
  const month = Number(req.params.month);
  const day = Number(req.params.day);

  if (!esFechaValida(year, month, day)) {
    return res.status(400).json({ error: "Fecha inválida" });
  }

  try {
    const fecha = new Date(Date.UTC(year, month - 1, day));
    const festivo = await esFestivo(fecha);
    const descripcion = festivo ? await descripcionFestivo(fecha) : null;
    return res.json({ festivo, descripcion });
  } catch (e) {
    return res.status(503).json({ error: "Servicio no disponible", detalle: e.message });
  }
}

export async function listarFestivos(req, res) {
  const year = Number(req.params.year);
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    return res.status(400).json({ error: "Año inválido" });
  }
  try {
    const listaCruda = await listarFestivosAnio(year);
    const lista = listaCruda.map(i => ({
      fecha: i.fecha.toISOString().slice(0, 10),
      descripcion: i.nombre,
    }));
    if (req.accepts("text") || req.query.format === "txt") {
      const header = "FECHA       DESCRIPCION";
      const lines = lista.map(x => `${x.fecha.padEnd(12)}${x.descripcion}`);
      return res.type("text").send([header, ...lines].join("\n"));
    }
    return res.json(lista);
  } catch (e) {
    return res.status(503).json({ error: "Servicio no disponible", detalle: e.message });
  }
}

export async function analizar(req, res) {
  const rawYear = req.params.year ?? req.query.year;
  const year = Number(rawYear);
  if (!Number.isInteger(year) || year < 1900 || year > 2100) {
    return res.status(400).json({ error: "Año inválido" });
  }
  try {
    const data = await analizarFestivos(year);
    if (req.accepts("text") || req.query.format === "txt") {
      const festivosHeader = "FESTIVOS";
      const festivosLines = data.festivos.map(x => `${x.fecha.padEnd(12)}${x.descripciones.join(" | ")}`);
      const solapadosHeader = "SOLAPADOS";
      const solapadosLines = data.solapados.map(x => `${x.fecha.padEnd(12)}${x.descripciones.join(" | ")}`);
      const sections = [
        festivosHeader,
        ...festivosLines,
        "",
        solapadosHeader,
        ...solapadosLines
      ];
      return res.type("text").send(sections.join("\n"));
    }
    return res.json(data);
  } catch (e) {
    return res.status(503).json({ error: "Servicio no disponible", detalle: e.message });
  }
}

export async function listarTipos(req, res) {
  try {
    const tipos = await obtenerTipos();
    return res.json(tipos);
  } catch (e) {
    return res.status(503).json({ error: "Servicio no disponible", detalle: e.message });
  }
}
