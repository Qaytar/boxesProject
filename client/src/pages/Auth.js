import googleButton from '../assets/btn_google_signin_light_normal_web.png'

function navigate(url) {
    window.location.href = url;
}

async function auth() {
    const response = await fetch('http://localhost:5000/auth/google', { method: 'post' });

    const data = await response.json();
    console.log(data);
    navigate(data.url);

}


function Auth() {


    return (
        <>
            <h3>Google OAuth!</h3>

            <button className="btn-auth" type="button" onClick={() => auth()}>
                <img className="btn-auth-img" src={googleButton} alt='google sign in' />
            </button>
        </>
    )
}

export default Auth;