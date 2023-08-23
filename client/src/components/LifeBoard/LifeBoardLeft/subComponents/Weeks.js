/**
 * Weeks.js
 * 
 * Component responsible of accessing LifeBoardData and rendering the 5200 weeks 
 *  
 */

import React, { useContext } from 'react';
import styles from "./Weeks.module.css"
import Week from "./Week"
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import { getDateDetails } from '../../../../helpers/datesFunctions'

function Weeks() {
    // imports from the context retrieving user specific data from db. lifeBoardData is the main object being rendered.
    const { lifeBoardData, birthDate } = useContext(LifeBoardDataContext);
    //console.log(lifeBoardData)

    // loading state
    if (!lifeBoardData) return '';

    // Stores the year the user was born
    const startYear = new Date(birthDate).getFullYear()
    // iterates over rows and weeks to render all Weeks passing by props all its properties
    //.. Also updates weekNumber (from 1 to 5200) and currentYear values
    return (
        <div className={styles.wrapper}>
            {Object.entries(lifeBoardData).map(([rowKey, weeksData], rowIndex) => (
                <div key={rowKey} className={styles.row}>
                    <span>{startYear + rowIndex}</span>
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
    );
}

export default Weeks;

