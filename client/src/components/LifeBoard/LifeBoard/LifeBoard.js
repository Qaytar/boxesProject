/**
 * LifeBoard.js
 * 
 * Renders the LEFT side of the application (where the grid/LifeBoard is)
 * Renders the RIGHT side of the application (where the editting panels are)
 */

import React, { useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LifeBoardLeft from "../LifeBoardLeft/LifeBoardLeft"
import LifeBoardRight from "../LifeBoardRight/LifeBoardRight";
import styles from "./LifeBoard.module.css"
import { WeekSelectionProvider } from '../../../contextsAndHooks/weekSelectionContext';
import { LifeBoardDataContext } from '../../../contextsAndHooks/lifeBoardDataContext';
import { fetchData } from '../../../helpers/databaseOpsHelper';
import lifeBoardExampleData from '../../../helpers/lifeBoardExampleData.json'



function LifeBoard(props) {
    const { birthDate, lifeboarddata, setLifeBoardData, setUsedColors, setBirthDate } = useContext(LifeBoardDataContext);
    const location = useLocation();  

    useEffect(() => {
        if (location.pathname === '/') {
            setLifeBoardData(lifeBoardExampleData.lifeBoard)
            setUsedColors(lifeBoardExampleData.usedColors)
            setBirthDate(lifeBoardExampleData.birthDate)
        } else if (location.pathname === '/app') {
            fetchData(setLifeBoardData, setUsedColors, setBirthDate);
        }
    }, [location.pathname]);

    //weekSelectionContext is made available to all LifeBoard sub components. It holds an object/state with all selectedWeeks as well as function to select and deselect
    return (
        <WeekSelectionProvider>
            <div className={styles.wrapper}>
                <div>
                    {lifeboarddata && !birthDate && props.location === 'appPage' ? (
                        <p>There's no birthdate registered so this won't work quite as it should. Go to my area and set it in few clicks :)</p>
                    ) : null}
                </div>
                <div className={styles.lifeBoard}>
                    <LifeBoardLeft />
                    <LifeBoardRight location={props.location} />
                </div>

            </div>
        </WeekSelectionProvider>


    )
}

export default LifeBoard;