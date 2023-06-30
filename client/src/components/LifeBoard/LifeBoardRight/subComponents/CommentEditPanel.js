import EditPanel from "./EditPanel";
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './CommentEditPanel.module.css';  // import CSS module

function CommentEditPanel() {
    const { selectedBoxes } = useContext(BoxSelectionContext);

    // New state variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [radioValue, setRadioValue] = useState("https://cdn-icons-png.flaticon.com/512/105/105220.png");

    // Update functions
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleRadioChange = (event) => setRadioValue(event.target.value);

    const { updateBox } = useContext(LifeBoardDataContext);
    const { lifeBoardData } = useContext(LifeBoardDataContext);

    const handleSubmit = () => {
        // Getting the selected box key
        const selectedBoxKey = Object.keys(selectedBoxes)[0];
        if (selectedBoxKey) {
            const [row, week] = selectedBoxKey.split("-");
            // Call updateBox to update the selected box with the new values
            updateBox(row, week, {
                comment: {
                    commentText: textAreaValue,
                    commentIcon: radioValue
                }
            });
        }
    };

    useEffect(() => {
        const selectedBoxKeys = Object.keys(selectedBoxes);
        if (selectedBoxKeys.length === 1) {
            const [row, week] = selectedBoxKeys[0].split("-");
            const selectedBox = lifeBoardData[row][week];
            if (selectedBox.comment) {
                setTextAreaValue(selectedBox.comment.commentText);
                setRadioValue(selectedBox.comment.commentIcon);
            } else {
                setTextAreaValue('');
                setRadioValue("Option 1");
            }
        } else {
            setTextAreaValue('');
            setRadioValue("Option 1");
        }
    }, [selectedBoxes, lifeBoardData]);



    const selectedBoxesCount = Object.keys(selectedBoxes).length;
    const options = [
        { name: "Travel", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Housing", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Love", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Work", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Others", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
    ];
    return (
        selectedBoxesCount <= 1 ?
            <div className={styles.container}>
                <EditPanel>
                    <p>Comments Edit Panel</p>

                    {/* Text area */}
                    <textarea value={textAreaValue} onChange={handleTextAreaChange} />

                    {/* Radio buttons */}
                    <div className={styles.radioGroup}>
                        {options.map(option => (
                            <div key={option.name}>
                                <input type="radio" id={option.name} name="radioGroup" value={option.icon}
                                    checked={radioValue === option.icon}
                                    onChange={handleRadioChange} />
                                <label htmlFor={option.name}>{option.name}</label>
                                <img src={option.icon} alt={option.name} className={styles.icon} />
                            </div>
                        ))}
                    </div>

                    {/* Submit button */}
                    {selectedBoxesCount === 0 ? null : <button onClick={handleSubmit}>Submit</button>}
                </EditPanel>
            </div>
            : null
    )
}

export default CommentEditPanel;





