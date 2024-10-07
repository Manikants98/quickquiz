import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}


console.log(process.env.MONGODB_URI);

interface MongooseCache {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {

    var mongoose: MongooseCache;
}


let cached: MongooseCache = global.mongoose || { conn: null, promise: null };

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect(): Promise<typeof mongoose> {
    if (cached.conn) {
        console.log('MongoDB already connected');
        return cached.conn;
    }

    if (!cached.promise) {
        console.log('Connecting to MongoDB...');
        const opts = {
            bufferCommands: false,
        };

        cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongooseInstance) => {
            console.log('MongoDB connected successfully');
            return mongooseInstance;
        }).catch((error) => {
            console.error('MongoDB connection error:', error);
            throw error;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
}

export default dbConnect;