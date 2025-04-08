import { MongoClient } from "mongodb";

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

const MONGODB_URI = "mongodb+srv://olakareemomobolarinwa:5fouoAMTjLZ17WEJ@cluster0.okrpagt.mongodb.net/";

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in .env.local");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(MONGODB_URI);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(MONGODB_URI);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    const client = await clientPromise;

    // Verify connection
    await client.db().admin().ping();
    console.log("Pinged deployment. Connection established");

    return client;
  } catch (error) {
    console.error("Connection verification failed:", error);
    throw error;
  }
}
