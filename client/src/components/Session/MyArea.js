import Backdrop from "./Backdrop";
import styles from "./MyArea.module.css"
import { AuthContext } from '../../context';
import React, { useContext } from 'react';

function MyArea(props) {
    const { setUser } = useContext(AuthContext);
    function logOut() {
        // Set user state to null
        setUser(null);

        //sends request to delete cookie
        // with fetch() the cookie would not be deleted so using window.location
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
