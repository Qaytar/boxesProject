/**
 * AuthPage.js
 * 
 * Accessed thru the route /login 
 * Renders the Google Button for users to authenticate via Google
 */


import styles from "./AuthPage.module.css"
const dotenv = require('dotenv');
dotenv.config();

const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Reaches /auth/google endpoint responsible for generating (and replying with) a Google URL
// After getting response from server, it navigates to said Google Url for users to log in to their Google Accounts
// async function auth() {
//     const response = await fetch(`${backendUrl}/auth/google`, { method: 'post' }, { credentials: 'include' });
//     const data = await response.json();
//     window.location.href = data.url; //Navigates to Google's URL
// }
console.log('clientID:',process.env.CLIENT_ID )
//new version of auth function
function auth() {
    const GOOGLE_CLIENT_ID = process.env.CLIENT_ID;     
    const REDIRECT_URI = 'https://boxesproject-server.vercel.app/auth/google/callback';

    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
        redirect_uri: REDIRECT_URI,
        client_id: GOOGLE_CLIENT_ID,
        access_type: 'offline',
        response_type: 'code',
        prompt: 'consent',
        scope: 'https://www.googleapis.com/auth/userinfo.profile openid'
    };

    const qs = new URLSearchParams(options);
    const authorizeUrl = `${rootUrl}?${qs.toString()}`;

    window.location.href = authorizeUrl;
}


// The Google Auth flow will continue like: Google will send the codes and token from succesfull auth to another endpoint (/callback)
//.. there, the express server will handle the response from Google and prepare the JWT and reply to this frontend with a cookie named 'token' holding the signed JWT


function AuthPages() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <h3>Please Sign In to access your own <span>Life Calendar</span></h3>
                <h4>We're limited to Google authentication at this time. Apologies for any inconvenience</h4>
                <button className={styles.gsiMaterialButton} onClick={() => auth()}>
                    <div className={styles.gsiMaterialButtonState}></div>
                    <div className={styles.gsiMaterialButtonContentWrapper}>
                        <div className={styles.gsiMaterialButtonIcon}>
                            <svg version="1.1" viewBox="0 0 48 48" style={{ display: 'block' }}>
                                <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                                <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                                <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                                <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                                <path fill="none" d="M0 0h48v48H0z"></path>
                            </svg>
                        </div>
                        <span className={styles.gsiMaterialButtonContents}>Sign in with Google</span>
                        <span style={{ display: 'none' }}>Sign in with Google</span>
                    </div>
                </button>
            </div>
        </div>
    );
}

export default AuthPages;