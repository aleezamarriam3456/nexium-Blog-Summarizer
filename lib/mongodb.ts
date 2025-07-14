import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const options = {}; // You can add options here if needed

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  // This is to avoid multiple connections in development due to module reloads
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient>;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise;

export default clientPromise;
