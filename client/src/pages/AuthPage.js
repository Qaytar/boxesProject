/**
 * AuthPage.js
 * 
 * Accessed thru the route /login 
 * Renders the Google Button for users to authenticate via Google
 */


import googleButton from '../assets/btn_google_signin_light_normal_web.png'


// Reaches /auth/google endpoint responsible for generating (and replying with) a Google URL
// After getting response from server, it navigates to said Google Url for users to log in to their Google Accounts
async function auth() {
    const response = await fetch('http://localhost:5000/auth/google', { method: 'post' });
    const data = await response.json();
    window.location.href = data.url; //Navigates to Google's URL
}
// The Google Auth flow will continue like: Google will send the codes and token from succesfull auth to another endpoint (/callback)
//.. there, the express server will handle the response from Google and prepare the JWT and reply to this frontend with a cookie named 'token' holding the signed JWT


function AuthPages() {


    return (
        <>
            <h3>Google OAuth!</h3>

            <button className="btn-auth" type="button" onClick={() => auth()}>
                <img className="btn-auth-img" src={googleButton} alt='google sign in' />
            </button>
        </>
    )
}

export default AuthPages;