import { MongoClient } from 'mongodb';
import { createClient } from '@supabase/supabase-js';

// Environment variables
const mongoUri = process.env.MONGODB_URI!;
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_KEY!;

// MongoDB client initialization
const mongoClient = new MongoClient(mongoUri);
let isMongoConnected = false;

async function connectMongo() {
  if (!isMongoConnected) {
    await mongoClient.connect();
    isMongoConnected = true;
  }
}

// Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// ✅ Save to MongoDB
export async function saveToMongo(blogUrl: string, fullText: string) {
  try {
    await connectMongo();

    const db = mongoClient.db('your_database_name'); // ✅ Replace with your actual DB name
    const collection = db.collection('summaries');

    await collection.insertOne({
      blogUrl,
      fullText,
      createdAt: new Date(),
    });
  } catch (error) {
    console.error('MongoDB save error:', error);
  }
}

// ✅ Save to Supabase
export async function saveToSupabase(
  blogUrl: string,
  summary: string,
  urduSummary?: string
) {
  try {
    const { error } = await supabase.from('blog_summarizer').insert([
      {
        blog_url: blogUrl,
        summary,
        urdu_summary: urduSummary || null,
        created_at: new Date(),
      },
    ]);

    if (error) {
      console.error('Supabase insert error:', error);
      throw error;
    }
  } catch (error) {
    console.error('Supabase save error:', error);
  }
}
