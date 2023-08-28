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
            // add the week to the current selection
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





    // Helper function that selects all weeks between two points 'first' and 'second'
    //(context:) selectedWeeks object looks like {r1-0: true, r1-1: true} if the first two weeks are selected as an example
    const selectWeeksInRange = (first, second) => {
        // Parse row information from strings to integers for easier comparisons
        const startRow = parseInt(first.row.slice(1));
        const endRow = parseInt(second.row.slice(1));

        // Determine if the selection is going upwards or downwards based on rows and weeks.
        const isSelectingUpwards = startRow > endRow || (startRow === endRow && first.week > second.week);

        // Initialize newSelectedWeeks with existing selected weeks
        let newSelectedWeeks = { ...selectedWeeks };

        // Loop through each row from the smallest to the largest row number between 'first' and 'second'
        for (let row = Math.min(startRow, endRow); row <= Math.max(startRow, endRow); row++) {
            let startWeekInLoop, endWeekInLoop;

            // If we're in the same row for both 'first' and 'second', then we sort based on week numbers.
            if (row === startRow && row === endRow) {
                startWeekInLoop = Math.min(first.week, second.week);
                endWeekInLoop = Math.max(first.week, second.week);
            }
            // If we are at the starting row, we check if we're selecting upwards to set the week range accordingly.
            else if (row === startRow) {
                startWeekInLoop = isSelectingUpwards ? 0 : first.week;
                endWeekInLoop = isSelectingUpwards ? first.week : 51;
            }
            // If we are at the ending row, we again check if we're selecting upwards to set the week range.
            else if (row === endRow) {
                startWeekInLoop = isSelectingUpwards ? second.week : 0;
                endWeekInLoop = isSelectingUpwards ? 51 : second.week;
            }
            // For all other rows between the start and end, we select all weeks (from 0 to 51)
            else {
                startWeekInLoop = 0;
                endWeekInLoop = 51;
            }

            // Loop through each week in the determined range for the current row and add it to newSelectedWeeks
            for (let week = startWeekInLoop; week <= endWeekInLoop; week++) {
                newSelectedWeeks[`r${row}-${week}`] = true;
            }
        }

        // Update the selectedWeeks state
        setSelectedWeeks(newSelectedWeeks);

        // Reset firstWeek to null since we've completed a range selection
        setFirstWeek(null);
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

