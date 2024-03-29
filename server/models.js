const mongoose = require('mongoose');
const { Schema } = mongoose;

const WeekSchema = new Schema({
    color: String,
    comment: {
        commentText: String,
        commentIcon: String
    }
});

let lifeBoardSchema = {};
for (let i = 1; i <= 100; i++) {
    lifeBoardSchema[`r${i}`] = [WeekSchema];
}

const UserSchema = new Schema({
    userId: String,
    name: String,
    image: String,
    lifeBoard: lifeBoardSchema,
    birthDate: Date,
    usedColors: [
        {
            colorName: String,
            colorDescription: String,
            count: Number
        }
    ]
});



module.exports = mongoose.model('User', UserSchema);
