/**
 * LifeBoard.js
 * 
 * Renders the LEFT side of the application (where the grid/LifeBoard is)
 * Renders the RIGHT side of the application (where the editting panels are)
 */

import React, { useContext } from 'react';
import LifeBoardLeft from "./LifeBoardLeft/LifeBoardLeft";
import LifeBoardRight from "./LifeBoardRight/LifeBoardRight";
import styles from "./LifeBoard.module.css"
import { WeekSelectionProvider } from '../../contexts/weekSelectionContext';
import { LifeBoardDataContext } from '../../contexts/lifeBoardDataContext';




function LifeBoard() {
    const { birthDate } = useContext(LifeBoardDataContext);
    console.log('birthDate', birthDate)
    //weekSelectionContext is made available to all LifeBoard sub components. It holds an object/state with all selectedWeeks as well as function to select and deselect
    return (
        <WeekSelectionProvider>
            <div className={styles.wrapper}>
                <p>{!birthDate ? "There's no birthdate registered so this won't work quite as it should. Go to my area and set it quickly :) " : null}</p>
                <div className={styles.lifeBoard}>
                    <LifeBoardLeft />
                    <LifeBoardRight />
                </div>
            </div>
        </WeekSelectionProvider >

    )
}

export default LifeBoard;