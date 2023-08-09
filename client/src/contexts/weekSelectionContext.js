/**
 * weekSelectionContext.js
 * 
 * defines WeekSelectionContext and provides { selectedWeeks, selectWeek, deselectWeek, deselectAllWeeks } to the rest of the App
 * 
 */

import { createContext, useState } from 'react';

//creates context
export const WeekSelectionContext = createContext();

// defines provider
export const WeekSelectionProvider = ({ children }) => {
    // main state of the context: the weeks currently selected by the user
    // selectedWeeks object will look like {r1-0: true, r1-1: true} if the first two weeks are selected
    const [selectedWeeks, setSelectedWeeks] = useState({});

    // helper state to facilitate the multi selection of weeks thru pressing shift-key (selectWeeksInRange function)
    const [firstWeek, setFirstWeek] = useState(null);

    // selects weeks main logic. used onClick of Week component
    const selectWeek = (row, week, shiftPressed) => {
        if (!shiftPressed || firstWeek === null) {
            // add the week to the current selection (setState is always supplied with the current state in the 1st argument of a callback function)
            setSelectedWeeks(prev => ({ ...prev, [`${row}-${week}`]: true }));
            // the selected week becomes 'FirstWeek' in case the user will use bulk selection thru pressing shift key
            setFirstWeek({ row, week });
            //console.log(`Week at row ${row}, week ${week} set as first week`);
        } else {
            // this was the 'second week', hence select the whole range
            selectWeeksInRange(firstWeek, { row, week });
        }
    };

    // deselects week
    const deselectWeek = (row, week) => {
        setSelectedWeeks(prev => {
            const newWeeks = { ...prev };
            delete newWeeks[`${row}-${week}`];
            return newWeeks;
        });
    };

    // helper function that selects all weeks between 2
    //..selectedWeeks object looks like {r1-0: true, r1-1: true} if the first two weeks are selected as an example
    const selectWeeksInRange = (first, second) => {
        //calling sort() with a callback to slice the r and parseInt
        const [startRow, endRow] = [first.row, second.row].sort((a, b) => parseInt(a.slice(1)) - parseInt(b.slice(1)));

        const [startWeek, endWeek] = [first.week, second.week].sort((a, b) => parseInt(a) - parseInt(b));

        let newSelectedWeeks = { ...selectedWeeks };

        // iterates over all rows and weeks between start and end. Making sure it starts on week 0 if the row is not the starting one and it ends on week 51 if row is not the ending one
        for (let row = parseInt(startRow.slice(1)); row <= parseInt(endRow.slice(1)); row++) {
            for (let week = (row === parseInt(startRow.slice(1)) ? startWeek : 0); week <= (row === parseInt(endRow.slice(1)) ? endWeek : 51); week++) {
                newSelectedWeeks[`r${row}-${week}`] = true;
            }
        }

        setSelectedWeeks(newSelectedWeeks);

        // resets firstWeek
        setFirstWeek(null);

        //console.log(`Weeks between row ${first.row}, week ${first.week} and row ${second.row}, week ${second.week} selected`);
    };

    // deselets all weeks
    const deselectAllWeeks = () => {
        setSelectedWeeks({});
    };


    return (
        <WeekSelectionContext.Provider value={{ selectedWeeks, selectWeek, deselectWeek, deselectAllWeeks }}>
            {children}
        </WeekSelectionContext.Provider>
    );
};

