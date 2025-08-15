import express from 'express';
import { ENV } from './config/env.js';
import { connect } from './config/db.js';
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});
connect().then(()=>{
    console.log("Connected to the database successfully");
})

app.listen(ENV.PORT , ()=>{
    console.log("Server is running on port", ENV.PORT);
})
