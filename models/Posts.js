const mongoose = require('mongoose');
const { number } = require('yup');

const postSchema = mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectID,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String
    },
    comments: [
        {
            content: String,
            postedBy: {
                type: mongoose.Schema.Types.ObjectID,
                ref: 'User'
            },
            likedBy: [
                {
                    type: mongoose.Schema.Types.ObjectID,
                    ref: 'User'
                },
            ],
            likeCount: {
                type: number,
                default: 0
            },
            time: {
                type: Date,
                default: Date.now(),
            }
        },
    ],
    likedBy: [
        {
            type: mongoose.Schema.Types.ObjectID,
            ref: 'User'
        },
    ],
    likeCount: {
        type: number,
        default: 0
    },
    time: {
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Post', postSchema);