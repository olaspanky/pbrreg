// lib/db.ts
import { MongoClient } from 'mongodb';

const uri = "mongodb+srv://olakareemomobolarinwa:5fouoAMTjLZ17WEJ@cluster0.okrpagt.mongodb.net/";

if (!uri) {
  throw new Error('MONGODB_URI environment variable not found');
}

let cachedClient: MongoClient;

export async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri as string);
  cachedClient = client;
  return client;
}