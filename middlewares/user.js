const mongoose = require('mongoose');

const Users = require('../models/User');
const Posts = require('../models/Posts');

const followingInc = function (userId, followId) {
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


const followersInc = function (userId, followId) {
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

const followingDec = function (userId, followId) {
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

const followersDec = function (userId, followId) {
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

const profile = userId => {
    try {
        const blah = Users.findById(userId);
        return blah
    } catch (error) {
        return error
    }
}

module.exports = {
    profile,
    followersDec,
    followingDec,
    followingInc,
    followersInc
}