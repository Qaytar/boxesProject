/**
 * MyArea.js
 * 
 * Renders a simple menu on top of Background when LogInMyAreaBtn is clicked
 * It's used in LogInMyAreaBtn.js
 */

import Backdrop from "./Backdrop";
import styles from "./MyArea.module.css"
import { AuthContext } from '../../contextsAndHooks/authContext';
import { LifeBoardDataContext } from '../../contextsAndHooks/lifeBoardDataContext';
import { saveBirthDate } from '../../helpers/databaseOpsHelper';
import React, { useContext } from 'react';

function MyArea(props) {
    const { setUser } = useContext(AuthContext);
    const { birthDate, setBirthDate } = useContext(LifeBoardDataContext)
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    // Function to handle date change in the form
    function handleDateChange(event) {
        console.log('handleDateChange function is called')
        const updatedDate = event.target.value;
        const formattedDate = new Date(updatedDate).toISOString();
        console.log('about to update birthDate state with', formattedDate)
        setBirthDate(formattedDate);
    }

    //Logs user out
    function logOut() {
        // Set user state to null
        setUser(null);

        //sends request to delete cookie and redirect to homepage
        window.location.href = `${backendUrl}/auth/logout`;
    }

    // improves usability of date picker
    document.addEventListener('DOMContentLoaded', function () {
        const dateInput = document.getElementById('input');

        dateInput.addEventListener('focus', function () {
            this.type = 'date';
        });

        dateInput.addEventListener('blur', function () {
            this.type = 'text';
        });
    });

    return (
        <div>
            <Backdrop onBackdropClick={props.onModalClick} />
            <div className={styles.modal}>
                <div className={styles.dateWrapper}>
                    <p>Set yor birth date and click save</p>
                    <input
                        type="date"
                        value={birthDate ? new Date(birthDate).toISOString().substring(0, 10) : ""}
                        onChange={handleDateChange}
                        id="input"
                    />
                    <button className={styles.mainButton} onClick={() => { saveBirthDate(birthDate); props.onModalClick(); }}>Save</button>
                </div>
                <span className={`${styles.logout}`} onClick={logOut}>Logout and back to Homepage</span>
            </div>
        </div>
    )
}

export default MyArea;
