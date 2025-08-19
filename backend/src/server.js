import express from 'express';
import { ENV } from './config/env.js';
import { connect } from './config/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/clerk-sdk-node';
import userroutes from './routes/user.route.js';
const app = express();
app.use(cors()) 
app.use(express.json()); // access JSON data in request body
app.use(clerkMiddleware()); // Clerk middleware for authentication
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// start with user routes 
app.use('/api/users',userroutes)
const startServer = async ()=>{
    try {
        await connect();
        console.log("Database connected successfully ✅🎉");
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);        
    }
}
startServer();
app.listen(ENV.PORT , ()=>{
    console.log("Server is running on port", ENV.PORT);
})
