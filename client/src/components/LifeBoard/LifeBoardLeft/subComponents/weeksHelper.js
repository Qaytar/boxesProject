/**
 * weeksHelper.js
 * 
 * Contains 3 functions used in <Weeks> component to perform date calculations
 * 
 *  
 */



// Object used to memoize the results of getSecondWeekMondayDate()
//.. it's memoized because it requires few evaluations but it changes once a year and not once a week
const yearCache = {};

/**
 * Computes the Monday date of the 2nd week of a given year.
 * 
 * @param {number} year - The year for which we want the date.
 * @returns {Date} - Date object representing the Monday of the 2nd week of that year.
 */
function getSecondWeekMondayDate(year) {
    // Check if the year's details are already cached
    if (yearCache[year]) {
        return yearCache[year];
    }

    // Calculate the Monday date of the 2nd week of the year
    const firstDayOfTheYear = new Date(year, 0, 1).getDay();
    const daysUntilNextMonday = (8 - firstDayOfTheYear) % 7;
    const secondWeekMondayDate = new Date(year, 0, 1 + daysUntilNextMonday);

    // Cache the result for future use
    yearCache[year] = secondWeekMondayDate;

    return secondWeekMondayDate;
}

/**
 * Computes various details about a given year and week number, relative to a birthdate.
 *  
 * @param {number} weekNumber - The target week number.
 * @param {string} birthDate - The user's birth date.
 * @returns {object} - Contains details about the computed date including its formatted value, year, age, and status. To be passed by props to <Week>
 */
export function getDateDetails(weekNumber, birthDate) {
    const startYear = new Date(birthDate).getFullYear();
    const currentYear = startYear + Math.floor((weekNumber - 1) / 52);

    // Retrieve the Monday date of the 2nd week of the currentYear (from cache or calculate it)
    const secondWeekMondayDate = getSecondWeekMondayDate(currentYear);

    // Calculates desiredMondayDate based on secondWeekMondayDate + daysToAdd (based on the weekNumber counter which increments by 1, every time a <Week> is rendered)
    const daysToAdd = (weekNumber - 2) % 52 * 7;
    const desiredMondayDate = new Date(secondWeekMondayDate);
    desiredMondayDate.setDate(secondWeekMondayDate.getDate() + daysToAdd);

    const age = calculateAge(birthDate, desiredMondayDate);

    return {
        mondayDate: formatDateToDMon(desiredMondayDate),
        year: desiredMondayDate.getFullYear(),
        age: age,
        status: determineDateStatus(desiredMondayDate)
    };
}



/**
 * Determines the status of the given date relative to the current week.
 *
 * @param {Date} date - The date to check.
 * @returns {string} - 'today' if the date is in the current week, 'future' if the date is after the current week, 'past' otherwise.
 */
export function determineDateStatus(date) {
    const today = new Date();

    const startOfWeek = new Date(today);
    const dayOffset = today.getDay() === 0 ? -6 : 1 - today.getDay(); // Adjusts for Sundays
    startOfWeek.setDate(today.getDate() + dayOffset);
    startOfWeek.setHours(0, 0, 0, 0); // Set time to midnight

    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    endOfWeek.setHours(23, 59, 59, 999); // Set time to the last moment of the day

    if (date >= startOfWeek && date <= endOfWeek) {
        return 'today';
    } else if (date > endOfWeek) {
        return 'future';
    } else {
        return 'past';
    }
}


/**
 * Calculates age of the user.
 *
 * @param {string} birthDate - Users birth date.
 * @param {string} desiredMondayDate - The monday to crosscheck the birthDate with.
 * @returns {number} - The age of the user. Returns -1 if the user hasn't been born yet (desiredMondayDate is prior to birthDate)
 */
export function calculateAge(birthDate, desiredMondayDate) {
    const birthDateObj = new Date(birthDate);
    // Reset both date to of the day (midnight) to ensure comparability
    birthDateObj.setHours(0, 0, 0, 0);
    desiredMondayDate.setHours(0, 0, 0, 0);

    let age = desiredMondayDate.getFullYear() - birthDateObj.getFullYear();

    // If the week's year and birth year are the same
    if (desiredMondayDate.getFullYear() === birthDateObj.getFullYear()) {
        if (desiredMondayDate < birthDateObj) {
            age = -1;
        } else {
            age = 0;
        }
    } else {
        const birthDayThisYear = new Date(desiredMondayDate.getFullYear(), birthDateObj.getMonth(), birthDateObj.getDate());
        // If the week's year is after the birth year and the week's Monday is before this year's birthday
        if (desiredMondayDate < birthDayThisYear) {
            age -= 1;
        }
    }
    return age;
}


/**
 * Formats a date to a string in the format "D Mon", e.g., "7 Aug".
 *
 * @param {Date} date - The date to format.
 * @returns {string} - The formatted string.
 */
export function formatDateToDMon(date) {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
}


