/**
 * LogInMyAreaBtn.js
 * 
 * Renders on top right of the screen either 'Log In' or 'My Area' depending on someone being logged in or not
 * It's used in both AppPage and HomePage components
 */


import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contexts/authContext';
import styles from "./LogInMyAreaBtn.module.css"
import { Link } from 'react-router-dom';
import MyArea from './MyArea';


function LogInMyAreaBtn() {

    // State variable and toggler to control 'my area' menu is opened or not
    const [isMyAreaOpen, setIsMyAreaOpen] = useState('closed');
    function myAreaToggler() {
        setIsMyAreaOpen(isMyAreaOpen === 'closed' ? 'open' : 'closed');
    }

    // Imports user from AuthContext
    const { user } = useContext(AuthContext);
    return (
        <div className={styles.LogInMyAreaBtn}>
            {user ? (
                <>
                    <span onClick={myAreaToggler}>My Area</span>
                    {isMyAreaOpen === 'open' ? <MyArea onModalClick={myAreaToggler} /> : null}
                </>
            ) : (
                <Link to="/login">Log In</Link>
            )}
        </div >
    );

}

export default LogInMyAreaBtn;
