const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
app.use(cors());
dotenv.config();
const connectDB = require("./database/database");
connectDB();
app.get('/',(req,res)=>{
    res.send('hello world');
})

module.exports = app;