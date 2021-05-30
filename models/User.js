const mongoose = require('mongoose');


const userShema = mongoose.Schema({
    username: {
        type: String,
        min: 4,
        max: 39,
        required: true,
    },
    name: {
        type: String,
        min: 5,
        max: 40,
        required: true,
    },
    about: {
        type: String,
        min: 5,
        max: 256
    },
    profileUrl: {
        type: String,
        required: true
    },
    email: {
        type: String,
        min: 7,
        required: true,
    },
    password: {
        type: String,
        required: true,
        min: 10,
        max: 70
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
    githubUsername: {
        type: String,
        max: 39
    },
    twitterUsername: {
        type: String,
        max: 15
    },
    instagramUsername: {
        type: String,
        max: 30
    },
    country: {
        type: String,
        min: 3,
        max: 20
    },
    city: {
        type: String,
        min: 3,
        max: 20
    },
    contact: {
        type: Number,
        min: 10,
        max: 10,
    },
    status: {
        type: String
    },
    work: {
        type: String,
    },
    university: {
        type: String,
    },
    school: {
        type: String
    },
    previousPassword: {
        type: String,
    }
    date: {
        type: Date,
        default: Date.now()
    }
});


module.exports = mongoose.model('User', userShema);