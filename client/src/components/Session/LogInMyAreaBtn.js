import React, { useState } from 'react';
import styles from "./LogInMyAreaBtn.module.css"
import { Link } from 'react-router-dom';
import MyArea from './MyArea';

function LogInMyAreaBtn() {

    // State variable to control whether user is logged in or not
    const [isLogged, setIsLogged] = useState('Logged');

    // Here, in the future I'll have code that uses setIsLogged to change the state depending on users being logged in or not

    // State variable to control whether user is logged in or not
    const [isMyAreaOpen, setIsMyAreaOpen] = useState('closed');
    function myAreaToggler() {
        setIsMyAreaOpen(isMyAreaOpen === 'closed' ? 'open' : 'closed');
    }

    return (
        <div className={styles.LogInMyAreaBtn}>
            {isLogged === 'Logged' ? (
                <>
                    <span onClick={myAreaToggler}>My Area</span>
                    {isMyAreaOpen === 'open' ? <MyArea onModalClick={myAreaToggler} /> : null}
                </>
            ) : (
                <Link to="/registration">Log In</Link>
            )}
        </div >
    );

}

export default LogInMyAreaBtn;
