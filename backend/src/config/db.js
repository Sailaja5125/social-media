import mongoose from 'mongoose';
import { ENV } from './env.js';

export const connect = async () => {
  const connectionState = mongoose.connection.readyState;

  // readyState values:
  // 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
  if (connectionState === 1) {
    console.log("Already connected to the database ✅");
    return;
  }

  try {
    await mongoose.connect(ENV.MONGODB_URI);
    console.log("Database connected successfully ✅🎉");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }
};