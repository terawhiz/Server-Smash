const mongoose = require('mongoose');


const userShema = mongoose.Schema({
    username: {
        type: String,
        min: 4,
        max: 30,
        required: true,
    },
    name: {
        type: String,
        min: 5,
        max: 40,
        required: true,
    },
    email: {
        type: String,
        min: 7,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 8,
        max: 1024
    },
    following: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    followers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    ],
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('User', userShema);