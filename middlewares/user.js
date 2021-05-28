const Users = require('../models/User');



const profileUpload = async (req, res) => {
    try {
        const url = `${process.env.MEDIA_BASE_URL}:${process.env.PORT}/${req.file.path}`
        const blah = await Users.findByIdAndUpdate(req.body.userId, { profileUrl: url });
        res.json({
            error: false,
            username: blah.username,
            name: blah.name,
            email: blah.email,
            following: blah.following,
            followers: blah.followers,
            profileUrl: blah.profileUrl
        });
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
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
        res.json({
            _id: result._id,
            username: result.username,
            name: result.name,
            email: result.email,
            profileUrl: result.profileUrl,
            following: result.following,
            followers: result.followers
        });
        // res.send(result);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
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
        res.status(400).json({
            error: true,
            message: error.message
        });
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
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


module.exports = {
    profile,
    follow,
    unfollow,
    profileUpload
}