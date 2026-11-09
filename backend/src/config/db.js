import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config();

export async function connectDB() {
    try {

        const dbURI = process.env.MONGODB_URI;

        if(!dbURI){
            throw new Error('MONGODB_URI is not defined in environment variable');
        }
        await mongoose.connect(dbURI);
        console.log('================================');
        console.log('        MongoDB connected');
        console.log('================================');
    } catch (error) {
        console.error(error);
    }
}