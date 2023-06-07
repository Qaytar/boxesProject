const express = require('express');
const mongoose = require('mongoose');
const app = express();

/*Connects to Mongodb*/

/*local*/
const dbUrl = 'mongodb://127.0.0.1:27017/boxesProjectLocal';
mongoose.connect(dbUrl)
    .then(() => {
        console.error('mongo connection open')
    })
    .catch((err) => {
        console.error('mongo connection error')
        console.info(err)
    })

/*local*/
app.listen(5000, () => console.log('Server started on port 5000'));