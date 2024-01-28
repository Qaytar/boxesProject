/**
 * dbRoutes.js
 * 
 * Express.js code containing two endpoints to bridge reactp App with Mongodb
 * First endpoint post at /getLifeBoard, provides the frontend with data from the database
 * Second endpoint post at /saveData, saves changes from the user into the database 
 */

const express = require('express');
const router = express.Router();
const User = require('./models');
const jwt = require('jsonwebtoken');

// Function to create an empty lifeBoard
// returns an object with a 100 properties named r1, r2.. (rows)
// For each row/property, there is an array of 52 objects with properties of a <Week>: color and comment.
// So it's a relatively large object, with 5200 objects each with the properties specificed below (modified, color, comment)
function createEmptyLifeBoard() {
    let lifeBoard = {};
    for (let i = 1; i <= 100; i++) {
        lifeBoard[`r${i}`] = Array(52).fill({
            color: '',
            comment: { commentText: '', commentIcon: '' },
        });
    }
    return lifeBoard;
}

/*Listents to POST requests from the React app when lifeBoard data is needed */
/*Replies with either empty lifeBoard or the one stored in db for that specific user*/
router.post('/getLifeBoard', async (req, res) => {
    //console.log('/getLifeBoard endpoint got git by a post request')
    try {
        // Check if a token exists to avoid errors when calling jwt.veritfy()
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
        const { user } = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT sent by client

            
            // A user is logged in
            if (user) {
                const userData = await User.findOne({ userId: user.id });
                //console.log('userData', userData)
                if (userData) {
                    // User is found in db
                    return res.json({
                        lifeBoard: userData.lifeBoard,
                        usedColors: userData.usedColors,
                        birthDate: userData.birthDate
                    });
                } else {
                    // A user is logged in but not in db yet. Return empty lifeboard                    
                    return res.json({
                        lifeBoard: createEmptyLifeBoard()                        
                    });
                }
            }
         
    } catch (error) {
        console.error("Error getting data from server:", error);
        res.status(500).json({ error: 'Failed to get data from server' });
    }
});


/*Listents to POST requests from the React app when changes in the lifeboard need to be saved */
/*Replies with a status message of the operation*/
router.post('/saveData', async (req, res) => {
    //console.log('saveData got hit');
    const updatedLifeBoardData = req.body.lifeBoardData;
    const updatedUsedColors = req.body.usedColors;
    //console.log('usedColors received:', req.body.usedColors)

    
    //First, checks for authorization. 
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
    const { user } = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT sent by client
    //If user object isnt in the decoded token (or decodification fails).. 
    if (!user) {
        console.error('No user info provided');
        return res.status(403).json({ error: 'No user info provided' });
    }
    //Proceeds to find the user in the db and save changes
    try {
        //console.log('looking for user in db');
        let userData = await User.findOne({ userId: user.id });
        //the case where the user.id isn't found in the database, is expected
        //users aren't added in the database and the moment of first log in, but here: The moment they save changes for the first time
        if (!userData) {
            userData = new User({
                userId: user.id,
                lifeBoard: updatedLifeBoardData,
                usedColors: updatedUsedColors,
                name: user.name
            });
            await userData.save();
            //console.log('New user created and saved in DB');
        } else {
            //console.log('User found in DB, updating lifeBoard and usedColors');
            userData.lifeBoard = updatedLifeBoardData;
            userData.usedColors = updatedUsedColors;
            if (!userData.name) {
                userData.name = user.name;
            }
            await userData.save();
            //console.log('User lifeBoard and usedColors updated in DB');
        }

        return res.json({ message: 'LifeBoard and usedColors saved successfully' });
    } catch (error) {
        console.error('Error saving lifeBoard and usedColors:', error);
        return res.status(500).json({ error: 'Failed to save lifeBoard and usedColors' });
    }
});

//Saves birthDate in db
router.post('/saveBirthDate', async (req, res) => {
    //console.log('saveBirthDate has been hit')
    const updatedBirthDate = req.body.birthDate;
    //console.log('birthdate received', updatedBirthDate)

    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
    const { user } = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT sent by client

    //If user object isnt in the decoded token (or decodification fails).. 
    if (!user) {
        console.error('No user info provided');
        return res.status(403).json({ error: 'No user info provided' });
    }
    //Proceeds to find the user in the db and save changes
    try {
        let userData = await User.findOne({ userId: user.id });
        //console.log('userData', userData)
        if (userData) {
            //console.log('date about to be attempted to save:', updatedBirthDate)
            userData.birthDate = updatedBirthDate;
            await userData.save();
        } else if (!userData) { //Logged in user without an account yet. User will be created in db now        
            userData = new User({
                userId: user.id,
                birthDate: updatedBirthDate,
                lifeBoard: createEmptyLifeBoard()
            });
            await userData.save();
            //console.log('New user created and saved in DB. With its birthDate');
        }
        return res.json({ message: 'birth date saved succesfully' });

    } catch (error) {
        console.error('Error saving birth date:', error);
        return res.status(500).json({ error: 'Failed to save birth date' });
    }
});

/*Listents to POST requests from the React app */
/*Deletes all data and redirects to home page*/
router.post('/deleteAllData', async (req, res) => {
    
    const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({ error: 'No token provided' });
        }

        const token = authHeader.split(' ')[1]; // Extract the token from 'Bearer <token>'
        const { user } = jwt.verify(token, process.env.JWT_SECRET); // Decode JWT sent by client
    //If user object isnt in the decoded token (or decodification fails).. 
    if (!user) {
        console.error('No user info provided');
        return res.status(403).json({ error: 'No user info provided' });
    }
    //Proceeds to find the user in the db and save changes
    try {         
        
        await User.deleteOne({ userId: user.id });
        //console.log('User data deleted successfully');

        return res.status(200);
        
    } catch (err) {               
        return res.status(500).json({ error: 'Failed to delete data' });
    }
});

module.exports = router;

