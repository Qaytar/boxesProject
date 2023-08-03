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
    // selectedBoxes object will look like {r1-0: true, r1-1: true} if the first two boxes are selected
    const [selectedBoxes, setSelectedBoxes] = useState({});

    // helper state to facilitate the multi selection of boxes thru pressing shift-key (selectBoxesInRange function)
    const [firstBox, setFirstBox] = useState(null);

    // selects boxes main logic. used onClick of Box component
    const selectBox = (row, week, shiftPressed) => {
        if (!shiftPressed || firstBox === null) {
            // add the box to the current selection (setState is always supplied with the current state in the 1st argument of a callback function)
            setSelectedBoxes(prev => ({ ...prev, [`${row}-${week}`]: true }));
            // the selected box becomes 'FirstBox' in case the user will use bulk selection thru pressing shift key
            setFirstBox({ row, week });
            //console.log(`Box at row ${row}, week ${week} set as first box`);
        } else {
            // this was the 'second box', hence select the whole range
            selectBoxesInRange(firstBox, { row, week });
        }
    };

    // deselects box
    const deselectBox = (row, week) => {
        setSelectedBoxes(prev => {
            const newBoxes = { ...prev };
            delete newBoxes[`${row}-${week}`];
            return newBoxes;
        });
    };

    // helper function that selects all boxes between 2
    //..selectedBoxes object looks like {r1-0: true, r1-1: true} if the first two boxes are selected as an example
    const selectBoxesInRange = (first, second) => {
        //calling sort() with a callback to slice the r and parseInt
        const [startRow, endRow] = [first.row, second.row].sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

        const [startWeek, endWeek] = [first.week, second.week].sort((a, b) => parseInt(a) - parseInt(b));

        let newSelectedBoxes = { ...selectedBoxes };

        // iterates over all rows and weeks between start and end. Making sure it starts on week 0 if the row is not the starting one and it ends on week 51 if row is not the ending one
        for (let row = parseInt(startRow.slice(1)); row <= parseInt(endRow.slice(1)); row++) {
            for (let week = (row === parseInt(startRow.slice(1)) ? startWeek : 0); week <= (row === parseInt(endRow.slice(1)) ? endWeek : 51); week++) {
                newSelectedBoxes[`r${row}-${week}`] = true;
            }
        }

        setSelectedBoxes(newSelectedBoxes);

        // resets firstBox
        setFirstBox(null);

        //console.log(`Boxes between row ${first.row}, week ${first.week} and row ${second.row}, week ${second.week} selected`);
    };

    // deselets all boxes
    const deselectAllBoxes = () => {
        setSelectedBoxes({});
    };


    return (
        <BoxSelectionContext.Provider value={{ selectedBoxes, selectBox, deselectBox, deselectAllBoxes }}>
            {children}
        </BoxSelectionContext.Provider>
    );
};

