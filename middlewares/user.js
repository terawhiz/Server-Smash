const Users = require('../models/User');



const profileUpload = async (req, res) => {
    try {
        const url = `${process.env.MEDIA_BASE_URL}:${process.env.PORT}/${req.file.path}`
        const blah = await Users.findByIdAndUpdate(req.body.userId, { profileUrl: url });
        res.send(blah);
    } catch (error) {
        res.send(error);
    }
}

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
            {
                $push: {
                    followers: userId
                }
            },
            {
                new: true
            }
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
            {
                $pull: {
                    following: followId
                }
            },
            {
                new: true
            }
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
            {
                $pull: {
                    followers: userId
                }
            },
            {
                new: true
            }
        );
        return followers
    } catch (error) {
        return error
    }
}


const profile = async (req, res) => {
    try {
        const profileId = req.body.profileId;
        const result = await Users.findById(profileId);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
}


const follow = async (req, res) => {
    try {
        const followingIncrement = await followingInc(req.userId, req.params.followId);
        const followersIncrement = await followersInc(req.userId, req.params.followId);

        res.send({
            error: false,
            message: `you are following ${followersIncrement.username}`
        }).status(200);
    } catch (error) {
        res.send({
            error: true,
            message: error.message
        }).status(400);
    }
}


const unfollow = async (req, res) => {
    try {
        const followingDecrement = await followingDec(req.userId, req.params.followId);
        const followersDecrement = await followersDec(req.userId, req.params.followId);

        res.send({
            error: false,
            message: `You unfollowed ${followersDecrement.username}`
        }).status(200);
    } catch (error) {
        res.send(error).status(400);
    }
}


module.exports = {
    profile,
    follow,
    unfollow,
    profileUpload
}