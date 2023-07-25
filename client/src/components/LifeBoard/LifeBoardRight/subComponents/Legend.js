import StickyTop from "../../Others/StickyTop";
import React, { useContext } from 'react';
import styles from "./Legend.module.css";
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';

function Legend() {
    const { usedColors } = useContext(LifeBoardDataContext);

    return (
        <div className={styles.legend}>
            <StickyTop></StickyTop>
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

