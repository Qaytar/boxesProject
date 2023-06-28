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

/*Listents to GET requests and its cookies from the React app when lifeBoard data is needed */
/*Replies with either empty lifeBoard or the one stored in db for that specific user*/
router.get('/getLifeBoard', async (req, res) => {
    try {
        // Check if a token exists
        if (req.cookies && req.cookies.token) {
            const { user } = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

            // If there's a user, try to get their lifeBoard from the DB
            if (user) {
                const userData = await User.findOne({ id: user.id });
                return res.json(userData ? userData.lifeBoard : createEmptyLifeBoard());
            }
        }

        // No user (or no token), return an empty lifeBoard
        return res.json(createEmptyLifeBoard());

    } catch (error) {
        console.error("Error getting lifeBoard:", error);
        res.status(500).json({ error: 'Failed to get lifeBoard' });
    }
});


module.exports = router;

