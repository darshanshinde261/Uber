const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors());
dotenv.config();
const connectDB = require("./database/database");
const userRoutes = require('./routes/userRoutes');
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use('/api/v1/users', userRoutes);
app.get('/',(req,res)=>{
    res.send('hello world');
})

module.exports = app;