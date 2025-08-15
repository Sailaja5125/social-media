import express from 'express';
import { ENV } from './config/env.js';
import { connect } from './config/db.js';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
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
