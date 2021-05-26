const mongoose = require('mongoose');

const Users = require('../models/User');

const followingInc = function (userId, followId) {
    try {
        const following = Users.findByIdAndUpdate(
            userId,
            { $push: { following: followId } },
            { new: true }
        );
        return following
    } catch (error) {
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