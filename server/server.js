const express = require('express');
const mongoose = require('mongoose');
// mongoose.set('debug', true);

const app = express();
const cors = require('cors');
const authRoutes = require('./authRoutes');
const dbRoutes = require('./dbRoutes');
const bodyParser = require('body-parser');
require('dotenv').config();

//middleware
app.use(cors({
    origin: ['https://www.lifecalendarapp.com'],   
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
}));
app.use(bodyParser.json({ limit: '2mb' })); // Increase limit
app.use(express.json())

//router
app.use('/auth', authRoutes);
app.use('/db', dbRoutes);



/*Connects to Mongodb*/

//const dbUrl = 'mongodb://127.0.0.1:27017/boxesProjectLocal';
const dbUrl = process.env.MONGODB_URL;

mongoose.connect(dbUrl)
    .then(() => {
        //console.info('mongo connection open')
    })
    .catch((err) => {
        console.error('mongo connection error')
        //console.info(err)
    })


/* Server listens on port 5000*/
//local. This will need to be changed in production
//app.listen(5000, () => console.log('Server started on port 5000'));

/* Vercel's serverless-ness works better with exporting vs listening*/
module.exports = app;