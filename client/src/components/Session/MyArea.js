/**
 * MyArea.js
 * 
 * Renders a simple menu on top of Background when LogInMyAreaBtn is clicked
 * It's used in LogInMyAreaBtn.js
 */

import Backdrop from "./Backdrop";
import styles from "./MyArea.module.css"
import { AuthContext } from '../../contexts/authContext';
import { LifeBoardDataContext } from '../../contexts/lifeBoardDataContext';
import { saveBirthDate } from '../../helpers/databaseOpsHelper';
import React, { useContext } from 'react';

function MyArea(props) {
    const { setUser } = useContext(AuthContext);
    const { birthDate, setBirthDate } = useContext(LifeBoardDataContext)


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
        window.location.href = 'http://localhost:5000/auth/logout';
    }

    return (
        <div>
            <Backdrop onBackdropClick={props.onModalClick} />
            <div className={styles.modal}>
                <button onClick={logOut}>Logout and back to Homepage</button>
                <input
                    type="date"
                    value={birthDate ? new Date(birthDate).toISOString().substring(0, 10) : ""}
                    onChange={handleDateChange}
                />
                <button onClick={() => { saveBirthDate(birthDate) }}>Save Changes</button>
            </div>
        </div>
    )
}

export default MyArea;
