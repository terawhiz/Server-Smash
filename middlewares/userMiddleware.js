const mongoose = require('mongoose');

const Users = require('../models/User');
const Posts = require('../models/Posts');

module.exports.followingInc = function (userId, followId) {
    try {
        const following = Users.findByIdAndUpdate(
            userId,
            { $push: { following: followId } },
            { new: true }
        );
        return following
    } catch (error) {
        console.log('ERROR 1');
        return error
    }
}


module.exports.followersInc = function (userId, followId) {
    try {
        const followers = Users.findByIdAndUpdate(
            followId,
            { $push: { followers: userId } },
            { new: true }
        );
        return followers
    } catch (error) {
        console.log('ERROR 2');
        return error
    }
}

module.exports.followingDec = function (userId, followId) {
    try {
        const following = Users.findByIdAndUpdate(
            userId,
            { $pull: { following: followId } },
            { new: true }
        );
        return following
    } catch (error) {
        console.log('ERROR 1');
        return error
    }
}

module.exports.followersDec = function (userId, followId) {
    try {
        const followers = Users.findByIdAndUpdate(
            followId,
            { $pull: { followers: userId } },
            { new: true }
        );
        return followers
    } catch (error) {
        console.log('ERROR 2');
        return error
    }
}

module.exports.profile = userId => {
    try {
        const blah = Posts.find({ postedBy: userId }).populate('postedBy');
        return blah;
    } catch (error) {
        return error;
    }
}