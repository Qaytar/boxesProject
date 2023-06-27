import googleButton from '../assets/btn_google_signin_light_normal_web.png'


// Asks the server to contact Google and replies with (and navigaes to) Google URL
async function auth() {
    const response = await fetch('http://localhost:5000/auth/google', { method: 'post' });
    const data = await response.json();
    window.location.href = data.url; //Navigates to Google's URL
}

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