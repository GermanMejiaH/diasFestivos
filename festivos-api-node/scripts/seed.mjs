import "dotenv/config";
import { MongoClient } from "mongodb";
import fs from "fs/promises";
import path from "path";

async function loadTiposFromFile() {
  const filePath =
    process.env.BDFESTIVOS_PATH ||
    path.join(process.cwd(), "data", "BDFestivos.mjs");
  const raw = await fs.readFile(filePath, "utf8");
  const match = raw.match(/insertMany\s*\(\s*\[(.*?)\]\s*\)/s);
  if (!match) throw new Error("No se encontró insertMany en el archivo");
  let jsonLike = `[${match[1]}]`;
  jsonLike = jsonLike.replace(/\buse\s+festivos;?/g, "");
  jsonLike = jsonLike.replace(/(\w+)\s*:/g, '"$1":');
  jsonLike = jsonLike.replace(/'/g, '"');
  return JSON.parse(jsonLike);
}

async function main() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
  const dbName = process.env.MONGODB_DB || "festivos";
  const client = new MongoClient(uri);
  await client.connect();
  const db = client.db(dbName);
  const tipos = await loadTiposFromFile();
  const col = db.collection("tipos");
  await col.deleteMany({});
  await col.insertMany(tipos);
  await client.close();
  console.log("Seed completado");
}

main().catch(e => {
  console.error("Error en seed:", e.message);
  process.exit(1);
});
