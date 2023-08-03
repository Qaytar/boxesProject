/**
 * LifeBoard.js
 * 
 * Renders the LEFT side of the application (where the grid/LifeBoard is)
 * Renders the RIGHT side of the application (where the editting panels are)
 */

import LifeBoardLeft from "./LifeBoardLeft/LifeBoardLeft";
import LifeBoardRight from "./LifeBoardRight/LifeBoardRight";
import styles from "./LifeBoard.module.css"
import { BoxSelectionProvider } from '../../contexts/boxSelectionContext';
import { LifeBoardDataProvider } from "../../contexts/lifeBoardDataContext";

//boxSelectionContext is made available to all LifeBoard sub components. It holds an object/state with all selectedBoxes as well as function to select and deselect

//lifeBoardDataContext as well. It holds the object/state with the data that's rendered as well as function to interact with data base

function LifeBoard() {
    return (
        <LifeBoardDataProvider>
            <BoxSelectionProvider>
                <div className={styles.wrapper}>
                    <div className={styles.lifeBoard}>
                        <LifeBoardLeft />
                        <LifeBoardRight />
                    </div>
                </div>
            </BoxSelectionProvider >
        </LifeBoardDataProvider>
    )
}

export default LifeBoard;