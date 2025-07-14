import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
let cachedClient: MongoClient | null = null;
let cachedDb: any = null;

async function connectToDatabase() {
  if (cachedClient && cachedDb) {
    return { client: cachedClient, db: cachedDb };
  }

  const client = new MongoClient(uri);
  await client.connect();

  const db = client.db(); // defaults to DB from connection string, or specify name: client.db('your-db-name')

  cachedClient = client;
  cachedDb = db;

  return { client, db };
}

export async function POST(request: Request) {
  try {
    const { db } = await connectToDatabase();

    const data = await request.json();

    // Validate data (adjust fields as per your needs)
    if (!data || Object.keys(data).length === 0) {
      return NextResponse.json({ error: 'No data provided' }, { status: 400 });
    }

    // Insert data into a collection, e.g., 'summaries'
    const result = await db.collection('summaries').insertOne(data);

    return NextResponse.json({
      message: 'Data inserted successfully',
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error('MongoDB connection or insertion error:', error);
    return NextResponse.json({ error: 'Failed to connect or insert data' }, { status: 500 });
  }
}
