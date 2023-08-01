/**
 * boxSelectionContext.js
 * 
 * defines BoxSelectionContext and provides { selectedBoxes, selectBox, deselectBox, deselectAllBoxes } to the rest of the App
 * 
 */

import { createContext, useState } from 'react';

//creates context
export const BoxSelectionContext = createContext();

// defines provider
export const BoxSelectionProvider = ({ children }) => {
    // main state of the context: the boxes currently selected by the user
    const [selectedBoxes, setSelectedBoxes] = useState({});

    // helper state to facilitate the multi selection of boxes thru pressing shift-key (selectBoxesInRange function)
    const [firstBox, setFirstBox] = useState(null);

    const selectBox = (row, week, shiftPressed) => {
        if (!shiftPressed || firstBox === null) {
            setSelectedBoxes(prev => ({ ...prev, [`${row}-${week}`]: true }));
            setFirstBox({ row, week });
            //console.log(`Box at row ${row}, week ${week} set as first box`);
        } else {
            selectBoxesInRange(firstBox, { row, week });
        }
    };

    const deselectBox = (row, week) => {
        setSelectedBoxes(prev => {
            const newBoxes = { ...prev };
            delete newBoxes[`${row}-${week}`];
            return newBoxes;
        });
    };

    const selectBoxesInRange = (first, second) => {
        const [startRow, endRow] = [first.row, second.row].sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));
        const [startWeek, endWeek] = [first.week, second.week].sort((a, b) => parseInt(a) - parseInt(b));

        let newSelectedBoxes = { ...selectedBoxes };

        for (let row = parseInt(startRow.slice(1)); row <= parseInt(endRow.slice(1)); row++) {
            for (let week = (row === parseInt(startRow.slice(1)) ? startWeek : 0); week <= (row === parseInt(endRow.slice(1)) ? endWeek : 51); week++) {
                newSelectedBoxes[`r${row}-${week}`] = true;
            }
        }

        setSelectedBoxes(newSelectedBoxes);
        setFirstBox(null);
        //console.log(`Boxes between row ${first.row}, week ${first.week} and row ${second.row}, week ${second.week} selected`);
    };

    const deselectAllBoxes = () => {
        setSelectedBoxes({});
    };


    return (
        <BoxSelectionContext.Provider value={{ selectedBoxes, selectBox, deselectBox, deselectAllBoxes }}>
            {children}
        </BoxSelectionContext.Provider>
    );
};

