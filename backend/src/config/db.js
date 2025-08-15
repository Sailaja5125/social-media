import mongoose from 'mongoose';
import { ENV } from './env.js';
export const connect = async()=>{
    try {
        console.log(ENV.MONGODB_URI)
        await mongoose.connect(ENV.MONGODB_URI);
        console.log("Database connected successfully ✅🎉");
    } catch (error) {
        console.log("Error connecting to database:", error);
        process.exit(1);
    }
}