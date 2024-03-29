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
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

function MyArea(props) {
    const { setUser, user } = useContext(AuthContext);
    const { birthDate, setBirthDate } = useContext(LifeBoardDataContext)
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';
    

    // State and Handler for the 'Delete account and all data' btn. Which triggers a confirmation popup
    const [deleteConfirmationPopup, setDeleteConfirmationPopup] = useState('closed');    
    function deleteDataPopupToggler(){
        setDeleteConfirmationPopup(deleteConfirmationPopup ==='closed' ? 'open' : 'closed')
    }

    // Handler for the 'Yes, delete it all' btn. Which triggers a request to the relevant endpoint
    
    const deleteAllData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`${backendUrl}/db/deleteAllData`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {                
                setUser(null);                
                localStorage.removeItem('token');                
                window.location.href = 'https://www.lifecalendarapp.com';
            } else {
                // Handle non-OK responses
                console.error('Failed to delete data');                
            }
        } catch (error) {
            console.error('Error during deletion:', error);            
        }
    }
    

    // Function to handle date change in the form
    function handleDateChange(event) {
        //console.log('handleDateChange function is called')
        const updatedDate = event.target.value;
        const formattedDate = new Date(updatedDate).toISOString();
        //console.log('about to update birthDate state with', formattedDate)
        setBirthDate(formattedDate);
    }

    // //Logs user out
    // function logOut() {
    //     // Set user state to null
    //     setUser(null);

    //     //sends request to delete cookie and redirect to homepage
    //     window.location.href = `${backendUrl}/auth/logout`;
    // }

    // Logs user out
    function logOut() {
        // Set user state to null
        setUser(null);

        // Remove the JWT from Local Storage
        localStorage.removeItem('token');

        // Redirect to the homepage or login page        
        window.location.href = '/';
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
                    <p className={styles.title}>Set yor birth date and click save</p>
                    <p className={styles.subTitle}>If you need help to navigate the app, you can find the tutorial on the top right corner of the screen</p>
                    <input
                        type="date"
                        value={birthDate ? new Date(birthDate).toISOString().substring(0, 10) : ""}
                        onChange={handleDateChange}
                        id="input"
                    />
                    <button className={styles.mainButton} onClick={() => { saveBirthDate(birthDate); props.onModalClick(); }}>Save</button>
                </div>                
                <div className={`${styles.othersWrapper}`}>
                <span className={`${styles.others}`} onClick={logOut}>Logout and back to Homepage</span>
                <span className={`${styles.others}`} ><Link to="/privacyPolicy" className={`${styles.others}`} >Privacy Policy</Link></span>                
                <span className={`${styles.others}`} onClick={deleteDataPopupToggler} >Delete account and all data</span>
                </div>                
            </div>
            {deleteConfirmationPopup === 'open' ? (<div className={styles.deleteConfirmationPopup}>
                <p className={styles.confirmationTitle}>Are you sure?</p>
                <p className={styles.subTitle}>This will permanently and irreversibly delete all the data and work you have done on your Life Calendar</p>
                <p className={styles.subTitle}>It will also cause an immediate logout and redirect you to the home page</p>
                <div className={styles.options}>
                    <span className={`${styles.confirmationOptions}`} onClick={deleteAllData}>Yes, delete it all</span>
                    <span className={`${styles.confirmationOptions}`} onClick={deleteDataPopupToggler}>Cancel</span>
                </div>
              
            </div>) : null}
            
        </div>
    )
}

export default MyArea;
