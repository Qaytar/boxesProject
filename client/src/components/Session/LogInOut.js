import React, { useState } from 'react';
import styles from "./LogInOut.module.css"

function LogInOut() {

    // State variable to control whether user is logged in or not
    const [isLogged, setIsLogged] = useState('notLogged');

    // Will need a function or prop that checks whether we're logged in or not and changes the state


    return (
        <div className={styles.LogInMyArea}>
            {isLogged === 'Logged' ? 'My Area' : 'Log In'}
        </div>
    )
}

export default LogInOut;

//useState to create those 2 states
//LogInOut Component: Renders either "Log In" or a "My Area" icon in top right of the website of both pages Home and Lifeboard