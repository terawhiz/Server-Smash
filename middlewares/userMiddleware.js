const mongoose = require('mongoose');

const Users = require('../models/User');

module.exports.followingInc = async function (userId, followId) {
    try {
        const following = await Users.findByIdAndUpdate(
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


module.exports.followersInc = async function (userId, followId) {
    try {
        const followers = await Users.findByIdAndUpdate(
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

module.exports.followingDec = async function (userId, followId) {
    try {
        const following = await Users.findByIdAndUpdate(
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

module.exports.followersDec = async function (userId, followId) {
    try {
        const followers = await Users.findByIdAndUpdate(
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
