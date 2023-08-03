/**
 * Boxes.js
 * 
 * Component responsible of accessing LifeBoardData and rendering the 5200 boxes
 * 
 *  
 */

import React, { useContext } from 'react';
import styles from "./Boxes.module.css"
import Box from "./Box"
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';

function Boxes() {
    // This state holds the 5200 objects with its color and comment properties, specific to the user
    const { lifeBoardData } = useContext(LifeBoardDataContext);

    // loading state
    if (!lifeBoardData) return '';

    // nested .map to iterate over rows and weeks to render all Boxes passing by props all its properties
    return (
        <div>
            {Object.entries(lifeBoardData).map(([rowKey, weeksData]) => (
                <div key={rowKey} className={styles.row}>
                    {weeksData.map((boxData, weekKey) => (
                        <Box
                            key={weekKey}
                            row={rowKey}
                            week={weekKey}
                            color={boxData.color}
                            comment={boxData.comment}
                            mod={boxData.modified}
                        />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Boxes;

