import ColorEditPanel from "./subComponents/ColorEditPanel";
import CommentEditPanel from "./subComponents/CommentEditPanel";
import Legend from "./subComponents/Legend";
import styles from "./LifeBoardRight.module.css";
import React, { useState } from "react";
import Toggle from "../../UI/Toggle"

function LifeBoardRight() {
    // Tracks the current mode
    const [isMode, setIsMode] = useState('edit');

    // Toggles the grading system when clicked
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };

    return (
        <div className={styles.content}>
            <Toggle
                onClickFunction={toggleMode}
                isState={isMode}
                checkState={'edit'}
                options={['legend', 'edit']}
            />
            {isMode === 'edit' ? (
                <div>
                    <ColorEditPanel />
                    <CommentEditPanel />
                </div>
            ) : (
                <Legend />
            )}
        </div>

    )
}

export default LifeBoardRight;