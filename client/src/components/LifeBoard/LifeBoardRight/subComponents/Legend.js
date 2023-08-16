/**
 * Legend.js
 * 
 * Renders all colors being used by that user together with the description
 * The list of usedColors is available in LifeBoardData but it would be costy to retrieve so instead, there's an independent state keepin track of each addition
 * 
 */

import React, { useContext } from 'react';
import styles from "./Legend.module.css";
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';

function Legend() {
    const { usedColors } = useContext(LifeBoardDataContext);

    return (
        <div className={styles.legend}>

            {usedColors && usedColors.length > 0 ? (
                <div className={styles.colorList}>
                    {usedColors.map((color, index) => (
                        <div key={index} className={styles.colorItem}>
                            <div
                                className={styles.colorSwatch}
                                style={{ backgroundColor: color.colorName }}
                            />
                            <div className={styles.colorInfo}>
                                <div>{color.colorDescription}</div>
                            </div>
                        </div>
                    ))}

                </div>
            ) : (
                <div>No colors added yet</div>
            )}

        </div>
    );
}

export default Legend;

