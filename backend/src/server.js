import express from 'express';
import { ENV } from './config/env.js';
import { connect } from './config/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import userRoutes from './routes/user.route.js';
import postRoutes from './routes/post.route.js';
import commentRoutes from './routes/comments.route.js'
import notificationRoutes from './routes/notification.route.js'
// import { arcjetMiddleware } from './middleware/arcjet.middleware.js';
const app = express();
app.use(cors()) 
app.use(express.json()); // access JSON data in request body
app.use(clerkMiddleware()); // Clerk middleware for authentication
// app.use(arcjetMiddleware); // arcjet middleware for security itself is an object 

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// start with user routes 
app.use('/api/users',userRoutes);
app.use('/api/post',postRoutes);
app.use('/api/comment',commentRoutes);
app.use('/api/notification',notificationRoutes);
const startServer = async ()=>{
    try {
        await connect();
        console.log("Database connected successfully ✅🎉");
        if(ENV.NODE_ENV !="production"){
            app.listen(ENV.PORT , ()=>{
                console.log("Server is running on port http://localhost:"+ENV.PORT);
            })
        }
    } catch (error) {
        console.error("Error connecting to the database:", error);
        process.exit(1);        
    }
}
startServer();

// export for vercel
export default app;