const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
var router = express.Router();
const authRoutes = require('./authRoutes');
const dbRoutes = require('./dbRoutes');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Use cors
app.use(cors({
    origin: 'http://localhost:3000', // Allow this origin
    credentials: true // Allow cookies
}));

/* Use the router */
app.use('/auth', authRoutes);
app.use('/db', dbRoutes);



/*Connects to Mongodb*/
//local
const dbUrl = 'mongodb://127.0.0.1:27017/boxesProjectLocal';
mongoose.connect(dbUrl)
    .then(() => {
        console.error('mongo connection open')
    })
    .catch((err) => {
        console.error('mongo connection error')
        console.info(err)
    })


/* Server listens on port 5000*/
//local
app.listen(5000, () => console.log('Server started on port 5000'));