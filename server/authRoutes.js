/**
 * authRoutes.js
 * 
 * Express.js code containing four endpoints related to authentification 
 */

const express = require('express');
var router = express.Router();
const dotenv = require('dotenv');
dotenv.config();
const jwt = require('jsonwebtoken');


const { OAuth2Client } = require('google-auth-library');
const redirectURL = 'http://localhost:5000/auth/google/callback';
const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
);

/*
The two endpoints that follow allow Google Authentification. /google and /google/callback
*/

/* Listens to post request from the React app when user presses Google Log In button */
/* Replies with Google Url for user to select account and Log In*/
router.post('/google', async function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    // Generates the 'google url' users will go to sign up to their Google Accounts
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent'
    });

    res.json({ url: authorizeUrl })
});

/* Listens to get requests from Google after users log in in their Google Accounts
/* Extracts from Google code and credentials */
/* Replies with res.redirect to the app with a cookie named 'token' holding a signed JWT */
router.get('/google/callback', async function (req, res, next) {
    //console.log('/auth/google callback has been hit')
    const code = req.query.code;

    try {
        const r = await oAuth2Client.getToken(code);
        // Setting the credentials on the OAuth2 client
        await oAuth2Client.setCredentials(r.tokens);
        //console.info('Tokens from Google acquired.');
        const user = oAuth2Client.credentials;
        //console.log('credentials', user);

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    /*Creates JWT to be send in a cookie to the client side*/
    //.. JWT works in a stateless manner. The server only holding a key and all user and session data being holded (encrypted) in the token/cookie itself, so no session data is stored anywhere else
    const decodedIdToken = jwt.decode(oAuth2Client.credentials.id_token)
    const expiryDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 1 days hour from now

    // Create the payload for the JWT
    // In the React App, this information will be stored in the user state by the checkAuth function in the authContext 
    const payload = {
        user: {
            id: decodedIdToken.sub,
            name: decodedIdToken.name,
            picture: decodedIdToken.picture
        },
        exp: expiryDate
    }
    //console.log('payload:', payload);
    // Sign the JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET);


    res.cookie('token', token, { httpOnly: true });
    res.redirect(303, 'http://localhost:3000/app');
});


/*Listents to GET requests and its cookies from the React app when verification/authorization is needed */
/*Replies with either res.redirect to login page if failure, or with user data if success*/
router.get('/verify', (req, res) => {
    //console.log('/auth/verify has been hit')
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            // Token validation failed
            res.status(401).json({ error: 'Authentication failed' });
        } else {
            // Token validation successful
            //console.log('user', token.user)
            res.json(token.user);
        }
    });
});


/*Listents to GET requests from the React app when log out is needed */
/*Eliminates cookies name 'token' and redirects to the homepage of the app*/
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('http://localhost:3000');
});


module.exports = router;