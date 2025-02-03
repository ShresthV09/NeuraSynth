import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;


if(!MONGODB_URI) {
    throw new Error('No MongoDB URI provided');
}
let cached = (global as any).mongoose || { conn: null, promise: null };

export const connect = async () => {
    if(cached.conn) {
        return cached.conn;
    }
    if(!cached.promise){
        cached.promise = mongoose.connect(MONGODB_URI, {
        }).then((mongoose) => {
            return mongoose;
        });
        console.log('Connected to MongoDB');
    }
    cached.conn = await cached.promise;
    console.log('Connected to MongoDB2');
    return cached.conn;
};