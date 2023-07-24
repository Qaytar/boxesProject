const express = require('express');
const router = express.Router();
const User = require('./models');
const jwt = require('jsonwebtoken');

// Function to create an empty lifeBoard
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
        const { isLoggedIn } = req.body;

        if (isLoggedIn) {
            // Check if a token exists
            if (req.cookies && req.cookies.token) {
                const { user } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

                // If there's a user, try to get their lifeBoard from the DB
                if (user) {
                    const userData = await User.findOne({ userId: user.id });
                    return res.json(userData ? userData.lifeBoard : createEmptyLifeBoard());
                }
            }
        }

        // If isLoggedIn is false, or no user (or no token), return an empty lifeBoard
        return res.json(createEmptyLifeBoard());

    } catch (error) {
        console.error("Error getting lifeBoard:", error);
        res.status(500).json({ error: 'Failed to get lifeBoard' });
    }
});


/*Listents to POST requests and its cookies from the React app when changes in the lifeboard need to be saved */
/*Replies with a status message of the operation*/
router.post('/saveLifeBoard', async (req, res) => {
    //console.log('saveLifeBoard route hit');
    //console.log('Request body:', req.body);

    const updatedLifeBoardData = req.body;

    let user;

    if (req.cookies && req.cookies.token) {
        try {
            const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);
            user = decoded.user;
            //console.log('User from token:', user);
        } catch (error) {
            console.error('Failed to decode token:', error);
            return res.status(403).json({ error: 'Failed to decode token' });
        }
    }

    if (!user) {
        console.error('No user info provided');
        return res.status(403).json({ error: 'No user info provided' });
    }

    try {
        let userData = await User.findOne({ userId: user.id });

        if (!userData) {
            //console.log('User not found in DB, creating a new one');
            userData = new User({
                userId: user.id,
                lifeBoard: updatedLifeBoardData,
            });
            await userData.save();
            console.log('New user created and saved in DB');
        } else {
            console.log('User found in DB, updating lifeBoard');
            userData.lifeBoard = updatedLifeBoardData;
            await userData.save();
            console.log('User lifeBoard updated in DB');
        }

        return res.json({ message: 'LifeBoard saved successfully' });
    } catch (error) {
        console.error('Error saving lifeBoard:', error);
        return res.status(500).json({ error: 'Failed to save lifeBoard' });
    }
});






module.exports = router;

