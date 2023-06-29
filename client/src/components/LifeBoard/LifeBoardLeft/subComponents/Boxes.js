import React, { useContext } from 'react';
import styles from "./Boxes.module.css"
import Box from "./Box"
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';

function Boxes() {
    const { lifeBoardData } = useContext(LifeBoardDataContext);

    if (!lifeBoardData) return '';

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

