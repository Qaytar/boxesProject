/**
 * MyArea.js
 * 
 * Renders a simple menu on top of Background when LogInMyAreaBtn is clicked
 * It's used in LogInMyAreaBtn.js
 */

import Backdrop from "./Backdrop";
import styles from "./MyArea.module.css"
import { AuthContext } from '../../contexts/authContext';
import React, { useContext } from 'react';

function MyArea(props) {
    const { setUser } = useContext(AuthContext);

    //Logs user out
    function logOut() {
        // Set user state to null
        setUser(null);

        //sends request to delete cookie and redirect to homepage
        window.location.href = 'http://localhost:5000/auth/logout';
    }

    return (
        <div>
            <Backdrop onBackdropClick={props.onModalClick} />
            <div className={styles.modal}>
                <button onClick={logOut}>Logout and back to Homepage</button>
            </div>
        </div>

    )
}

export default MyArea;
