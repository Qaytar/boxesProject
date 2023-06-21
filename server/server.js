const express = require('express');
const mongoose = require('mongoose');
const app = express();
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();

const { OAuth2Client } = require('google-auth-library');


/* Listens to post request from the client when user presses Google button and replies with Google Url*/
router.post('/auth/google', async function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");
    const redirectURL = 'http://localhost:5000/auth/google/callback';

    const oAuth2Client = new OAuth2Client(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        redirectURL
    );

    // Generate the url that will be used for the consent dialog.
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent'
    });

    res.json({ url: authorizeUrl })

});

//not super sure if this 100% required or just gets some info that I might no be using. It's used in the get request handler below, tho
async function getUserData(access_token) {

    const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`);

    //console.log('response',response);
    const data = await response.json();
    console.log('data', data);
}

/* Listens to get requests from Google and extracts code and credentials. Redirects back to the frontend */
router.get('/auth/google/callback', async function (req, res, next) {

    const code = req.query.code;

    console.log(code);
    try {
        const redirectURL = 'http://localhost:5000/auth/google/callback'
        const oAuth2Client = new OAuth2Client(
            process.env.CLIENT_ID,
            process.env.CLIENT_SECRET,
            redirectURL
        );
        const r = await oAuth2Client.getToken(code);
        // Make sure to set the credentials on the OAuth2 client.
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens acquired.');
        const user = oAuth2Client.credentials;
        console.log('credentials', user);
        await getUserData(oAuth2Client.credentials.access_token);

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }


    res.redirect(303, 'http://localhost:3000/');
});

/*Connects to Mongodb*/

//local code
const dbUrl = 'mongodb://127.0.0.1:27017/boxesProjectLocal';
mongoose.connect(dbUrl)
    .then(() => {
        console.error('mongo connection open')
    })
    .catch((err) => {
        console.error('mongo connection error')
        console.info(err)
    })


/* Use the router*/
app.use('/', router);

/* Listents for request on port 5000*/
//local code
app.listen(5000, () => console.log('Server started on port 5000'));