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


/* Listens to post request from the React app when user presses Google button */
/* Replies with Google Url for user to select account and Log In*/
router.post('/google', async function (req, res, next) {
    res.header("Access-Control-Allow-Origin", 'http://localhost:3000');
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header("Referrer-Policy", "no-referrer-when-downgrade");

    // Generate the url that will be used for the consent dialog
    const authorizeUrl = oAuth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: 'https://www.googleapis.com/auth/userinfo.profile  openid ',
        prompt: 'consent'
    });

    res.json({ url: authorizeUrl })
});


/* Listens to get requests from Google and extracts code and credentials. */
/* Replies with res.redirect with a JWT on a cookie */
router.get('/google/callback', async function (req, res, next) {
    /*gets back from Google codes and tokens*/
    const code = req.query.code;
    //console.log('code:', code);
    try {
        const r = await oAuth2Client.getToken(code);
        // Setting the credentials on the OAuth2 client
        await oAuth2Client.setCredentials(r.tokens);
        console.info('Tokens from Google acquired.');
        const user = oAuth2Client.credentials;
        //console.log('credentials', user);

    } catch (err) {
        console.log('Error logging in with OAuth2 user', err);
    }

    /*Creates JWT to be send in a cookie to the client side*/
    const decodedIdToken = jwt.decode(oAuth2Client.credentials.id_token)
    const expiryDate = Math.floor(Date.now() / 1000) + (60 * 60 * 24); // 1 days hour from now

    // Create the payload for the JWT
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

/*Listents to GET requests and its cookies from the React app when verification is needed */
/*Replies with either res.redirect if failure or with user data if success*/
router.get('/auth/verify', (req, res) => {

    jwt.verify(req.cookies.token, process.env.JWT_SECRET, (err, token) => {
        if (err) {
            // Token validation failed
            res.redirect(303, 'http://localhost:3000/auth');
        } else {
            // Token validation successful
            res.json(token.user);
        }
    });
});

module.exports = router;