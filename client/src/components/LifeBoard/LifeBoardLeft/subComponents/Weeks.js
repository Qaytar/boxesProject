/**
 * Weeks.js
 * 
 * Component responsible of accessing LifeBoardData and rendering the 5200 weeks 
 *  
 */

import React, { useContext, useState, useEffect } from 'react';
import styles from "./Weeks.module.css"
import Week from "./Week"
import { LifeBoardDataContext } from '../../../../contextsAndHooks/lifeBoardDataContext';
import { getDateDetails } from '../../../../helpers/datesFunctions'
import sheepIcon from "../../../../assets/icons/others/sheep.png"
import dataIcon from "../../../../assets/icons/others/data.png"

function Weeks() {
    // imports from the context retrieving user specific data from db. lifeBoardData is the main object being rendered.
    const { lifeBoardData, birthDate } = useContext(LifeBoardDataContext);

    //Boolean state to render 'onHover' a background for the popup in <Week>. Otherwise when the user hovers over the space between weeks, that popup flickers and it's not good UX
    const [renderPopupBackground, setRenderPopupBackground] = useState(false);
    // onMouseEnter and Leave handlers
    const handleMouseEnter = (event) => {
        setRenderPopupBackground(true)
    };
    const handleMouseLeave = (event) => {
        setRenderPopupBackground(false)
    };

    //State to switch from 'gathering data message' to 'please refresh page' whenever lifeboardData hasn't arrived from the server yet
    //.. this is implemented due to a bug with very low frequency that causes data never to arrive
    // const [isTooLong, setIsTooLong] = useState(false);

    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (!lifeBoardData) {
    //             setIsTooLong(true);
    //         }
    //     }, 5000); // After 5 seconds, a fallback message asking the user to refresh will render

    //     return () => {
    //         clearTimeout(timer);
    //     };
    // }, [lifeBoardData]);


    // loading state
    // if (!lifeBoardData) return (
    //     <div className={styles.loadingState}>
    //         {isTooLong ?
    //             <>
    //                 <div className={styles.fallbackMessage}>
    //                     This is taking too long, sorry about that
    //                 </div>
    //                 <div className={styles.fallbackMessage}>
    //                     Please, refresh the page and it should work fine
    //                 </div>
    //             </>
    //             :
    //             (<>
    //                 <div className={styles.icons}>
    //                     <img src={sheepIcon} alt={'icon for the loading state'} />
    //                     . . .
    //                     <img src={dataIcon} alt={'icon for the loading state'} />
    //                 </div>
    //                 This sheep is gathering your data, 1 second
    //             </>
    //             )}
    //     </div>
    // );

    // to render before data arrives
    if (!lifeBoardData) return (
        <div className={styles.loadingState}>
            fetching data
        </div>
    );

    // Stores the year the user was born
    const startYear = new Date(birthDate).getFullYear()

    // JSX iterates over rows and weeks to render all Weeks passing by props all its properties
    //.. Also updates weekNumber (from 1 to 5200) and currentYear values
    return (
        <div>
            <div
                className={styles.wrapper}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {Object.entries(lifeBoardData).map(([rowKey, weeksData], rowIndex) => (
                    <div key={rowKey} className={styles.row}>
                        <span className={`${styles.year} ${styles.unselectable}`}>{startYear + rowIndex}&nbsp;&nbsp;&nbsp;</span>
                        {weeksData.map((weekData, weekKey) => {
                            const weekNumber = (rowIndex * weeksData.length) + weekKey + 1; //counts total weeks from 1 to 5200. It's key to all the date calculations in getDateDetails() in weeksHelper.js
                            return (
                                <Week
                                    key={weekKey}
                                    row={rowKey}
                                    week={weekKey}
                                    color={weekData.color}
                                    comment={weekData.comment}
                                    date={getDateDetails(weekNumber, birthDate)}
                                />
                            );
                        })}
                    </div>
                ))}
            </div>
            {renderPopupBackground ? <div className={styles.renderPopupBackground}>

            </div> : null}
        </div>

    );
}

export default Weeks;

