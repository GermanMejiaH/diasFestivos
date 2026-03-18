import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const dbName = process.env.MONGODB_DB || "festivos";

let client;
let db;

export async function getDb() {
  if (db) return db;
  if (!client) {
    client = new MongoClient(uri, { serverSelectionTimeoutMS: 2000 });
  }
  await client.connect();
  db = client.db(dbName);
  return db;
}

export async function closeDb() {
  if (client) {
    await client.close();
    client = undefined;
    db = undefined;
  }
}
