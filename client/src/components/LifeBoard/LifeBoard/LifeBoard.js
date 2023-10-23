/**
 * LifeBoard.js
 * 
 * Renders the LEFT side of the application (where the grid/LifeBoard is)
 * Renders the RIGHT side of the application (where the editting panels are)
 */

import React, { useContext } from 'react';
import LifeBoardLeft from "../LifeBoardLeft/LifeBoardLeft"
import LifeBoardRight from "../LifeBoardRight/LifeBoardRight";
import LifeBoardHomePageText from "./LifeBoardHomePageText"
import LifeBoardMobile from "./LifeBoardMobile"
import styles from "./LifeBoard.module.css"
import { WeekSelectionProvider } from '../../../contextsAndHooks/weekSelectionContext';
import { LifeBoardDataContext } from '../../../contextsAndHooks/lifeBoardDataContext';
import useDeviceType from '../../../contextsAndHooks/useDeviceType'





function LifeBoard(props) {
    const { birthDate, lifeboarddata } = useContext(LifeBoardDataContext);
    const { isDesktop } = useDeviceType();

    //weekSelectionContext is made available to all LifeBoard sub components. It holds an object/state with all selectedWeeks as well as function to select and deselect
    return (
        <WeekSelectionProvider>
            <div className={styles.wrapper}>
                <div>
                    {props.location === 'homePage' ? (<LifeBoardHomePageText isDesktop={isDesktop} />) : null}
                </div>
                <div>
                    {lifeboarddata && !birthDate && props.location === 'appPage' ? (
                        <p>There's no birthdate registered so this won't work quite as it should. Go to my area and set it in few clicks :)</p>
                    ) : null}
                </div>
                <div className={styles.lifeBoard}>
                    {isDesktop ? (
                        <>
                            <LifeBoardLeft />
                            <LifeBoardRight location={props.location} />
                        </>
                    ) : (
                        <LifeBoardMobile />
                    )}
                </div>

            </div>
        </WeekSelectionProvider>


    )
}

export default LifeBoard;