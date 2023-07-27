/**
 * dbRoutes.js
 * 
 * Express.js code containing two endpoints to bridge reactp App with Mongodb
 * First endpoint post at /getLifeBoard, provides the frontend with data from the database
 * Second endpoint post at /saveLifeBoard, saves changes from the user into the database 
 */

const express = require('express');
const router = express.Router();
const User = require('./models');
const jwt = require('jsonwebtoken');

// Function to create an empty lifeBoard
// returns an object with a 100 properties named r1, r2.. (rows)
// For each row/property, there is an array of 52 objects with properties of a <Box>: modified, color and comment.
// So it's a relatively large object, with 5200 objects each with the properties specificed below (modified, color, comment)
function createEmptyLifeBoard() {
    let lifeBoard = {};
    for (let i = 1; i <= 100; i++) {
        lifeBoard[`r${i}`] = Array(52).fill({
            modified: 'n',
            color: { colorName: '', colorDescription: '' },
            comment: { commentText: '', commentIcon: '' },
        });
    }
    return lifeBoard;
}

/*Listents to POST requests and its cookies from the React app when lifeBoard data is needed */
/*Replies with either empty lifeBoard or the one stored in db for that specific user*/
router.post('/getLifeBoard', async (req, res) => {
    try {
        const isLoggedIn = req.body.isLoggedIn;

        if (isLoggedIn) {
            // Check if a token exists to avoid errors when callinf jwt.veritfy()
            if (req.cookies && req.cookies.token) {
                const { user } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

                // If there's a user object, try to get their lifeBoard from the DB
                if (user) {
                    const userData = await User.findOne({ userId: user.id });

                    if (userData) {
                        // Return lifeBoard and usedColors if the user exists
                        return res.json({
                            lifeBoard: userData.lifeBoard,
                            usedColors: userData.usedColors
                        });
                    } else {
                        // Return an empty lifeBoard and empty usedColors array if the user wasn't found in the db
                        return res.json({
                            lifeBoard: createEmptyLifeBoard(),
                            usedColors: []
                        });
                    }
                }
            }
        }

        // If isLoggedIn is false, or there wasn't a token or it couldn't be verified, return an empty lifeBoard and empty usedColors array
        return res.json({
            lifeBoard: createEmptyLifeBoard(),
            usedColors: []
        });

    } catch (error) {
        console.error("Error getting lifeBoard:", error);
        res.status(500).json({ error: 'Failed to get lifeBoard' });
    }
});


/*Listents to POST requests and its cookies from the React app when changes in the lifeboard need to be saved */
/*Replies with a status message of the operation*/
router.post('/saveLifeBoard', async (req, res) => {
    const updatedLifeBoardData = req.body.lifeBoardData;
    const updatedUsedColors = req.body.usedColors;

    let user;
    //First, checks for authorization. 
    if (req.cookies && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            user = decoded.user;
            //If the decoded token from the request contains an object called user, it's assumed the request is legit (even if user isn't in the database, see below)
        } catch (error) {
            console.error('Failed to decode token:', error);
            return res.status(403).json({ error: 'Failed to decode token' });
        }
    }
    //If user object isnt in the decoded token (or decodification fails).. 
    if (!user) {
        console.error('No user info provided');
        return res.status(403).json({ error: 'No user info provided' });
    }
    //Proceeds to find the user in the db and save changes
    try {
        let userData = await User.findOne({ userId: user.id });
        //the case where the user.id isn't found in the database, is expected
        //users aren't added in the database and the moment of first log in, but here: The moment they save changes for the first time
        if (!userData) {
            userData = new User({
                userId: user.id,
                lifeBoard: updatedLifeBoardData,
                usedColors: updatedUsedColors
            });
            await userData.save();
            console.log('New user created and saved in DB');
        } else {
            console.log('User found in DB, updating lifeBoard and usedColors');
            userData.lifeBoard = updatedLifeBoardData;
            userData.usedColors = updatedUsedColors;
            await userData.save();
            console.log('User lifeBoard and usedColors updated in DB');
        }

        return res.json({ message: 'LifeBoard and usedColors saved successfully' });
    } catch (error) {
        console.error('Error saving lifeBoard and usedColors:', error);
        return res.status(500).json({ error: 'Failed to save lifeBoard and usedColors' });
    }
});







module.exports = router;

