const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
var router = express.Router();
const authRoutes = require('./authRoutes');
const dbRoutes = require('./dbRoutes');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cookieParser());

// Use cors
app.use(cors({
    origin: 'https://boxesproject-client.vercel.app', // Allow this origin
    credentials: true, // Allow cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));

//Enables parsing of JSON request bodies 
app.use(bodyParser.json({ limit: '2mb' })); // Increase limit
app.use(express.json())

/* Use the router */
app.use('/auth', authRoutes);
app.use('/db', dbRoutes);



/*Connects to Mongodb*/

//const dbUrl = 'mongodb://127.0.0.1:27017/boxesProjectLocal';
const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        console.error('mongo connection open')
    })
    .catch((err) => {
        console.error('mongo connection error')
        console.info(err)
    })


/* Server listens on port 5000*/
//local. This will need to be changed in production
app.listen(5000, () => console.log('Server started on port 5000'));