import EditPanel from "./EditPanel";
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './ColorEditPanel.module.css';
function ColorEditPanel() {

    // State variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Update functions
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleColorSelect = (color) => setSelectedColor(color);

    const { updateBox } = useContext(LifeBoardDataContext);
    const { selectedBoxes, deselectAllBoxes } = useContext(BoxSelectionContext);
    const { lifeBoardData } = useContext(LifeBoardDataContext);

    const handleSubmit = () => {
        // Getting the selected boxes keys
        const selectedBoxKeys = Object.keys(selectedBoxes);

        // Update all the selected boxes with the new color data
        selectedBoxKeys.forEach((selectedBoxKey) => {
            const [row, week] = selectedBoxKey.split("-");
            updateBox(row, week, {
                color: {
                    colorName: selectedColor,
                    colorDescription: textAreaValue
                }
            });
        });
        deselectAllBoxes();
    };

    useEffect(() => {
        // If any boxes are selected, update the ColorEditPanel state with their data
        if (selectedBoxes && Object.keys(selectedBoxes).length > 0) {
            // Get the color data from the first selected box (assuming all selected boxes have the same color)
            const [row, week] = Object.keys(selectedBoxes)[0].split("-");
            const selectedBox = lifeBoardData[row][week];
            if (selectedBox.color) {
                setTextAreaValue(selectedBox.color.colorDescription);
                setSelectedColor(selectedBox.color.colorName);
            } else {
                setTextAreaValue('');
                setSelectedColor("");
            }
        } else {
            // If no boxes are selected, reset the state
            setTextAreaValue('');
            setSelectedColor("");
        }
    }, [selectedBoxes, lifeBoardData]);

    const colors = [
        { name: "Red", color: "#FF0000" },
        { name: "Blue", color: "#0000FF" },
        { name: "Green", color: "#00FF00" },
        { name: "Yellow", color: "#FFFF00" },
        { name: "Purple", color: "#800080" },
    ];

    return (
        <div className={styles.container}>
            <EditPanel>
                <p>Color Edit Panel</p>

                {/* Text area */}
                <textarea value={textAreaValue} onChange={handleTextAreaChange} />

                {/* Color selector */}
                <div className={styles.colorSelector}>
                    {colors.map((colorOption) => (
                        <div
                            key={colorOption.name}
                            className={`${styles.colorOption} ${selectedColor === colorOption.name ? styles.selected : ''}`}
                            style={{ backgroundColor: colorOption.color }}
                            onClick={() => handleColorSelect(colorOption.color)}
                        />
                    ))}
                </div>

                {/* Submit button */}
                {Object.keys(selectedBoxes).length > 0 && <button onClick={handleSubmit}>Submit</button>}
            </EditPanel>
        </div>
    )
}

export default ColorEditPanel;
