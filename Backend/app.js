const express = require('express');
const dotenv = require('dotenv');
require("dotenv").config();
const app = express();
const cors = require('cors');
const axios = require("axios");
const connectToDb = require('./db/db');
app.use(express.json());
app.use(express.urlencoded({extended : true}));
const userRoutes = require('./routes/user_route');
const spotifyRoutes = require('./routes/spotify_auth_route');

connectToDb();
app.get('/', (req,res)=> {
  res.send("Hello World");
})
app.use(cors({
  origin: 'https://muysnc.onrender.com'  
}));


app.use('/user',userRoutes);
app.use('/musync', spotifyRoutes);

module.exports = app;