//This component renders on top right screen either 'Log In' or 'My Area' depending on someone being logged in or not

import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../../context';
import styles from "./LogInMyAreaBtn.module.css"
import { Link } from 'react-router-dom';
import MyArea from './MyArea';


function LogInMyAreaBtn() {

    // State variable to control whether user is logged in or not
    const [isLogged, setIsLogged] = useState(false);

    // State variable to control my area menu is opened or not
    const [isMyAreaOpen, setIsMyAreaOpen] = useState('closed');
    function myAreaToggler() {
        setIsMyAreaOpen(isMyAreaOpen === 'closed' ? 'open' : 'closed');
    }

    //Use context to find out if a User is logged in and update the state
    const { checkAuth } = useContext(AuthContext);


    useEffect(() => {
        const fetchData = async () => {
            const userData = await checkAuth();
            userData ? setIsLogged(true) : setIsLogged(false);
            console.log('inside useEffect within component. User:', userData);
        };
        fetchData();
    }, []);



    return (
        <div className={styles.LogInMyAreaBtn}>
            {isLogged === true ? (
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
