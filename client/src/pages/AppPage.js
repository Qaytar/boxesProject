import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LifeBoard from "../components/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn";
import styles from "./AppPage.module.css";
import { AuthContext } from '../contexts/authContext';

function AppPage() {
    const { user, checkAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAuth = async () => {
            const userData = await checkAuth();
            if (!userData) {
                navigate('/login');
            }
        };

        verifyAuth();
    }, [checkAuth, navigate]);

    return (
        <div className={styles.wrapper}>
            {user && (
                <>
                    <LogInMyAreaBtn />
                    <LifeBoard />
                </>
            )}
        </div>
    );
}

export default AppPage;
