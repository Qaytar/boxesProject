/**
 * LogInMyAreaBtn.js
 * 
 * Renders on top right of the screen either 'Log In' or 'My Area' depending on someone being logged in or not
 * It's used in both AppPage and HomePage components
 */


import React, { useContext, useState } from 'react';
import { AuthContext } from '../../contextsAndHooks/authContext';
import { LifeBoardDataContext } from '../../contextsAndHooks/lifeBoardDataContext';
import styles from "./LogInMyAreaBtn.module.css"
import { Link } from 'react-router-dom';
import MyArea from './MyArea';
import useDeviceType from '../../contextsAndHooks/useDeviceType';
import userIcon from '../../assets/icons/others/user.png';


function LogInMyAreaBtn() {
    const { user } = useContext(AuthContext);
    const { birthDate } = useContext(LifeBoardDataContext);
    const { isDesktop } = useDeviceType();  
    

    // State variable and toggler to control 'my area' menu is opened or not
    const [isMyAreaOpen, setIsMyAreaOpen] = useState();
    function myAreaToggler() {
        setIsMyAreaOpen(isMyAreaOpen === 'closed' ? 'open' : 'closed');
    }

    useEffect(() => {
        setIsMyAreaOpen(birthDate ? 'closed' : 'open');
    }, [birthDate]); 


    
    return (
        isDesktop ? (
            <div className={styles.LogInMyAreaBtn} >
                <img className={styles.icon} src={userIcon} alt="user icon"></img>
                {user ? (
                    <>
                        <span onClick={myAreaToggler}>My Area</span>
                        {isMyAreaOpen === 'open' ? <MyArea onModalClick={myAreaToggler} /> : null}
                    </>
                ) : (
                    <Link className={styles.link} to="/login">Log In</Link>
                )}
            </div>
        ) : null
    );

}

export default LogInMyAreaBtn;
