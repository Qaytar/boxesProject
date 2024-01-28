/**
 * databaseOpsHelper.js * 
 * 
 * Contains funtions to save/retrieve data to/from db triggered at different points of the app
 *  
 */
const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

// Reaches endpoint responsible of saving changes made by the user into the db
export async function saveData(lifeBoardData, usedColors) {
    //console.log('calling saveData');
    //console.log('usedColors inside saveData', usedColors);

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/db/saveData`, {
            method: 'POST',            
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lifeBoardData, usedColors })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //const data = await response.json();
        //console.log(data.message);  

        // Use data.message elsewhere as needed, or manage state based on it
    } catch (error) {
        console.error("There was an error saving the life board:", error);
    }
};



// Reaches endpoint responsible of saving user's birthDate
export async function saveBirthDate(birthDate) {
    //console.log('calling saveBirthDate, with argument:', birthDate);

    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/db/saveBirthDate`, {
            method: 'POST',            
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ birthDate })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        //const data = await response.json();
        //console.log(data.message);  

        // Use data.message elsewhere as needed, or manage state based on it
    } catch (error) {
        console.error("There was an error saving the birth date:", error);
    }
};

// Loads main states from db by reaching to endpoint
export async function fetchData(setLifeBoardData, setUsedColors, setBirthDate) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`${backendUrl}/db/getLifeBoard`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            }            
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setLifeBoardData(data.lifeBoard);
        setUsedColors(data.usedColors || []);
        setBirthDate(data.birthDate || null);
    } catch (error) {
        console.error("There was an error fetching the life board data:", error);
    }
};


