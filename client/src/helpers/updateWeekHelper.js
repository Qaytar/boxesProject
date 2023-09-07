/**
 * updateWeekHelper.js * 
 * 
 * Contains helper funtions only used in updateWeek function found in lifeBoardDataContext
 *  
 */


/**
 *  
 * Calculate the count of each color among the selected weeks in lifeBoardData.
 *
 * @param {Object} lifeBoardData - The main data object containing information about all the weeks.
 * @param {Object} selectedWeeks - An object representing the selected weeks. The keys are strings like 'r1-0' and the values are booleans.
 * @return {Array} Returns an array of objects, each containing a color name and its corresponding count among the selected weeks.
 */
export const getSelectedWeeksColorsCount = (lifeBoardData, selectedWeeks) => {
    // Initialize an empty object to keep track of each color count
    let colorCounter = {};

    // Iterate over selectedWeeks
    for (const selectedWeekKey of Object.keys(selectedWeeks)) {
        if (selectedWeeks[selectedWeekKey]) { // Check if the week is actually selected
            const [row, week] = selectedWeekKey.split("-");

            // Get the color property for the selected week
            const weekColor = lifeBoardData[row][week]?.color;

            // If there's a color, update the count in colorCounter
            if (weekColor) {
                colorCounter[weekColor] = (colorCounter[weekColor] || 0) + 1;
            }
        }
    }

    // Convert colorCounter object to selectedWeeksColorsCount array
    return Object.keys(colorCounter).map(colorName => {
        return { colorName, count: colorCounter[colorName] };
    });
};




/**
 *  
 * Update the counts of used colors based on the newly selected color and the previously selected colors among the selected weeks in lifeBoardData.
 *
 * @param {Function} setUsedColors - The state setter function for updating the `usedColors` state.
 * @param {Array} usedColors - An array of objects containing information about the colors that have been used and their counts.
 * @param {Array} selectedWeeksColorsCount - An array of objects, each containing a color name and its corresponding count among the selected weeks.
 * @param {Object} [updatingColorCount] - An optional object containing the color that is newly selected and the count of how many weeks have been selected with this new color. Structure: { colorName: String, count: Number }
 * @return {void} The function updates the `usedColors` state but does not return anything.
 */


export const updateUsedColors = (setUsedColors, usedColors, selectedWeeksColorsCount, updatingColorCount) => {
    // First, get a copy of the existing usedColors
    const usedColorsCopy = [...usedColors];

    // Add count for updatingColorCount, effectively adding the new color to usedColors
    if (updatingColorCount) {
        const updatingColorIndex = usedColorsCopy.findIndex(colorObj => colorObj.colorName === updatingColorCount.colorName);
        if (updatingColorIndex !== -1) {
            usedColorsCopy[updatingColorIndex].count += updatingColorCount.count;
        } else {
            usedColorsCopy.push(updatingColorCount);
        }
    }

    // Subtract counts for colors in selectedWeeksColorsCount
    selectedWeeksColorsCount.forEach(({ colorName, count }) => {
        const colorIndex = usedColorsCopy.findIndex(colorObj => colorObj.colorName === colorName);
        if (colorIndex !== -1) {

            usedColorsCopy[colorIndex].count -= count;
            if (usedColorsCopy[colorIndex].count <= 0) {
                // Optionally, remove the color from usedColors if count reaches zero
                usedColorsCopy.splice(colorIndex, 1);
            }
        }
    });
    setUsedColors(usedColorsCopy); // Finally, update the state
};


/**
 * Simply checks if the description of an alerady existing color has needs to be updated
 * 
 * @param {string} colorName - The name of the color to add or edit.
 * @param {string} colorDescription - The description for the color.
 * @param {Function} setUsedColors - The state-setting function for the usedColors state.
 */
export const editColorDescription = (colorName, colorDescription, setUsedColors) => {
    setUsedColors((currentUsedColors) => {

        // Check if the color name exists in currentUsedColors
        const matchingColor = currentUsedColors.find(color => color.colorName === colorName);

        if (matchingColor && matchingColor.colorDescription !== colorDescription) {
            // If colorName exists but the description is different, update the description
            return currentUsedColors.map(color => {
                if (color.colorName === colorName) {
                    return {
                        ...color,
                        colorDescription
                    };
                }
                // If colorDescription is the same, do nothing
                return color;
            });
        }
        return currentUsedColors; // If color already exists and its description matches, do nothing
    });
};


/**
 * Sorts usedColors. Criteria: order of appeareance in lifeBoardData
 * 
 * @param {string} lifeBoardData - The main data object containing information about all the weeks.
 * @param {string} usedColors - The state holding the array of used colors. Renderd as the legend
 * @param {Function} setUsedColors - The state-setting function for the usedColors state.
 */
export function sortUsedColors(lifeBoardData, usedColors) {

    // Create an empty array to hold the sorted colors
    let sortedColors = [];

    // Create a set to hold unique colors that we've already seen
    let seenColors = new Set();

    //console.log("printing usedColors at the beginning of sortUsedColors: ", JSON.stringify(usedColors));

    // Traverse lifeBoardData row by row and week by week
    for (let row = 1; row <= 100; row++) {
        for (let week = 0; week < 52; week++) {
            const weekData = lifeBoardData[`r${row}`][week];

            // If the week has a color
            if (weekData.color) {
                const color = weekData.color;

                // If this color hasn't been seen yet
                if (!seenColors.has(color)) {
                    //console.log(`New color found: ${color}`);

                    // Mark the color as seen
                    seenColors.add(color);

                    // Find the matching color object in usedColors
                    const colorObj = usedColors.find(obj => obj.colorName === color);

                    if (colorObj) {
                        // Add the color object to sortedColors
                        sortedColors.push(colorObj);
                    }
                }
            }
        }
    }
    //console.log("Sorted usedColors: ", JSON.stringify(sortedColors));
    return sortedColors;
}
