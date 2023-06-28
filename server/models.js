const mongoose = require('mongoose');
const { Schema } = mongoose;

const BoxSchema = new Schema({
    modified: {
        type: String,
        enum: ['y', 'n'],
        default: 'n'
    },
    color: {
        colorName: String,
        colorDescription: String
    },
    comment: {
        commentText: String,
        commentIcon: String
    }
});

let lifeBoardSchema = {};
for (let i = 1; i <= 100; i++) {
    lifeBoardSchema[`r${i}`] = [BoxSchema];
}

const UserSchema = new Schema({
    name: String,
    image: String,
    lifeBoard: lifeBoardSchema
});

module.exports = mongoose.model('User', UserSchema);
