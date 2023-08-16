/**
 * LifeBoardRightHelper.js
 * 
 * Contains function helper triggered by the onClick of reset selected weeks in LifeBoardRight.js
 *  
 */

/**
 * Main purpose is to reset all properties of all weeks selected (using updateWeek)
 * ..while keeping usedColors updated (in case all weeks using a color are deleted, said color should removed from usedColor).
 * 
 * 3 inner functions defined first - followed by 'main logic' * 
 * 
 * @param {object} selectedWeeks - Weeks currently selected, object looks like {r1-0: true, r1-1: true} if the first two weeks (from row/year 1) are selected
 * @param {object} lifeBoardData - State from the context lifeBoardDataContext. Object looks like {r1, r2 .. r100} where r1 is an array of 52 objects (representing weeks) with properties {modifes, color and comment}, color looking like:     color: {colorName: String, colorDescription: String}
 * @param {function} updateWeek - Function from the context lifeBoardDataContext. Will updated selected weeks by passing an empty week
 * @param {function} setUsedColors - State Function from the context lifeBoardDataContext. Will remove colors, if no weeks using that color are left
 */
export function resetSelectedWeeksV2(selectedWeeks, lifeBoardData, setUsedColors, updateWeek, deselectAllWeeks, usedColors) {

    /*
    *
    *
    *INNER FUNCTIONS
    * 
    * 
    */

    //Inner Function 1
    //returns a simple array of colorName's within selectedWeeks
    //..output is an array of strings with hexa color codes [#FF0000, #00FF00]
    const usedColorsInSelectedWeeks = () => {
        const colors = [];

        // Iterate over each selected week's identifier
        for (const weekId in selectedWeeks) {
            // Extract the row (year) and week index from the weekId
            const [row, weekIndex] = weekId.split('-');

            // Get the color of this week
            const weekColorName = lifeBoardData[row][weekIndex].color.colorName;

            // Check if the color is valid (non-empty) and hasn't been added to the array yet
            if (weekColorName && !colors.includes(weekColorName)) {
                colors.push(weekColorName);
            }
        }

        return colors;
    };


    //Inner Function 2
    //updates all selected weeks by setting them to an 'empty week'
    function cleanSelectedWeeks() {
        Object.keys(selectedWeeks).forEach(key => {
            const [row, week] = key.split('-');

            updateWeek(row, week, {
                modified: 'n',
                color: {
                    colorName: "",
                    colorDescription: ""
                },
                comment: {
                    commentText: "",
                    commentIcon: ""
                }
            });
        });
    }

    //Inner Function 3
    //Takes a color as an argument and looks for it in lifeBoardData (ignoring the weeks in selectedWeeks) and returns False if the color is not found at all (in 'lifeBoardData minus selectedWeeks), True if at least one week uses that color.
    function findUsedColorInLifeBoard(color) {
        // Iterate over rows r1 to r100
        for (let i = 1; i <= 100; i++) {
            const rowName = 'r' + i;

            // Iterate over the 52 weeks of this row
            for (let j = 0; j < 52; j++) {
                const weekId = `${rowName}-${j}`;

                // Check if this week is not in the selectedWeeks
                if (!selectedWeeks[weekId]) {
                    const currentColor = lifeBoardData[rowName][j].color.colorName;

                    // Check if color exists and matches the target color
                    if (currentColor && currentColor === color) {
                        //console.log(color, "was found")
                        return true; // Found a week with the target color
                    }
                }
            }
        }

        // If the loops complete without returning, then the color was not found
        //console.log(color, "wasn't found")
        return false;
    }




    /*
    *
    *
    *MAING LOGIC
    * 
    * 
    */

    const colors = usedColorsInSelectedWeeks();

    //For each color within selectedWeeks, find out whether the color should be eliminated from usedColors (because color will still be found in lifeBoardData after resetting seletecWeeks) or not.
    colors.forEach((color) => {
        if (!findUsedColorInLifeBoard(color)) { //if the color isn't found anywhere else, meaning it's found only in the selectedWeeks, it should be removed from usedColors, since those weeks are about to be reseted
            //console.log('inside the if, inside the forEach. This is usedColors before filter:', usedColors)
            setUsedColors(prevColors => {
                return prevColors.filter(usedColor => usedColor.colorName !== color);
            });
            //console.log('inside the if, inside the forEach. This is usedColors after filter:', usedColors)
        }
    })
    cleanSelectedWeeks(); //regardless of colors, all selectedWeeks must be resetted to empty
    deselectAllWeeks();
}


