/**
 * Week.js
 * 
 * Renders an empty rounded div representing a week
 * 
 * Here is one of the main uses of the WeekSelectionContext provider
 *  
 */

import React, { useContext, useState } from 'react';
import styles from "./Week.module.css";
import { WeekSelectionContext } from '../../../../contexts/weekSelectionContext';
import { icons } from '../../../../helpers/icons'

function Week(props) {
    const { selectedWeeks, selectWeek, deselectWeek } = useContext(WeekSelectionContext);
    const [renderWeekInfo, setRenderWeekInfo] = useState();

    // Within the array containing all selectedWeeks, tries to access the 'current' week. Meaning if it can access it, it's already selected, other wise it's not
    const isSelected = selectedWeeks[`${props.row}-${props.week}`];

    // calls selectWeek and deselectWeek onClick
    const handleClick = (event) => {
        if (isSelected) {
            deselectWeek(props.row, props.week);
        } else {
            selectWeek(props.row, props.week, event.shiftKey);
        }
    };

    const handleMouseEnter = (event) => {
        let message;

        if (props.date.status === 'future') {
            message = `This is the future.. Week Nr ${props.week + 1} of ${props.date.year}, monday ${props.date.mondayDate}, you will be ${props.date.age}`;
        }
        else if (props.date.status === 'today') {
            message = `You are here (.. and ${props.date.age})`
        } else if (props.date.age === -1) {
            message = 'You were not born yet'
        } else if (props.week === 0) {
            message = `First week of ${props.date.year}`;
        } else if (props.week === 51) {
            message = `Last week of ${props.date.year}`;
        } else {
            message = `Week Nr ${props.week + 1} of ${props.date.year}, monday ${props.date.mondayDate}, you were ${props.date.age}`;
        }
        setRenderWeekInfo(message);
    };


    const handleMouseLeave = (event) => {
        setRenderWeekInfo(null)
    };

    // renders an icon if it's been commented and a color if it's been colored
    return (
        <div>
            <div
                className={`
                    ${styles.week}
                    ${isSelected ? styles.selectedWeek : ''}
                    ${props.date.status === 'today' ? styles.isCurrentWeek : ''}
                    ${props.date.age === -1 ? styles.notBornedYet : ''}

                    `}
                style={{ backgroundColor: props.color || 'transparent' }}
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {props.comment.commentIcon && (
                    <img src={icons[props.comment.commentIcon]} alt="icon" className={styles.commentIcon} />
                )}
            </div>
            {renderWeekInfo ? <div className={styles.renderWeekInfo}>
                {renderWeekInfo}
            </div> : null}

        </div>

    );
}

export default React.memo(Week); // Using memo under the belief that may improve performance through saved re-renders


