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

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
const redirectURL = 'https://www.lifecalendarapp.com/oauth2callback';

const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectURL
);

//endpoint used to test server once deployed
router.get('/test', async function (req, res, next) {
    res.json({ response: "OK" });
})


/* Listens to post requests from the frontend (component /OAuth2Callback) which carries the Google code for authentication
/* Replies success for a 'redirect' to the appPage from the frontend */
router.post('/google/callback', async function (req, res, next) {    
    //console.info('/google/callback endpoint been hit')
    const { code } = req.body;

    if (!code) {
        return res.status(400).json({ error: 'No code provided' });
    }

    try {
        const r = await oAuth2Client.getToken(code);
        // Setting the credentials on the OAuth2 client
        await oAuth2Client.setCredentials(r.tokens);

        //console.info('Tokens from Google acquired.');
        const user = oAuth2Client.credentials;
        //console.info('credentials', user);

        /*Creates JWT to be sent to the client side to be stored in local storage*/
        //.. JWT works in a stateless manner. The server only holding a key and all user and session data being holded (encrypted) in the token itself, so no session data is stored anywhere else
        const decodedIdToken = jwt.decode(user.id_token);
        if (!decodedIdToken) {
            return res.status(400).json({ error: 'Error decoding ID token' });
        }

        // Create the payload for the JWT
        // In the React App, this information will be stored in the user state by the checkAuth function in the authContext 
        const expiryDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 1 day from now
        const payload = {
            user: {
                id: decodedIdToken.sub,
                name: decodedIdToken.name,
                picture: decodedIdToken.picture
            },
            exp: expiryDate
        };
        //console.info('payload:', payload);

        // Sign the JWT
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        if (!token) {
            return res.status(500).json({ error: 'Error signing JWT token' });
        }   

        res.json({ success: true, token })

    } catch (err) {
        console.error('Error processing Google callback:', err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});



/*Listents to GET requests and a token on the header from the React app when verification/authorization is needed */
/*Replies with either res.redirect to login page if failure, or with user data if success*/
router.get('/verify', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(400).json({ error: 'No token found. Auth Failed' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from the 'Bearer <token>' format
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
        if (err) { // Token validation failed            
            return res.status(401).json({ error: 'Authentication failed' });
        } else { // Token validation successful            
            res.json(decodedToken.user);
        }
    });
});

module.exports = router;