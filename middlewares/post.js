const Users = require('../models/User');
const Posts = require('../models/Posts');


const postValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


const homeFeed = async (req, res) => {
    // GIMME YOUR UESR ID AND ME GIVE YOU POSTS
    try {
        const result = await Users.findById(req.body.userId);
        const following = result.following;

        const sendData = await Promise.all(following.map(async (userId) => {
            return Posts.find({
                postedBy: userId
            });
        }));
        res.status(200).send(sendData);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


const newPost = async (req, res) => {
    try {
        if (req.file) {
            const url = `${process.env.MEDIA_BASE_URL}:${process.env.PORT}/${req.file.path}`
            const post = new Posts({
                postedBy: req.body.userId,
                content: req.body.content,
                imgUrl: url,
                comments: [],
                likedBy: [],
            });
            const savedPost = await post.save();
            res.send(savedPost);
        } else {
            const post = new Posts({
                postedBy: req.body.userId,
                content: req.body.content,
                comments: [],
                likedBy: [],
            });
            const savedPost = await post.save();
            res.send(savedPost);
        }
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}

const allPosts = async (req, res) => {
    if (req.admin) {
        const allPosts = await Posts.find();
        res.status(201).send(allPosts);
    } else {
        res.status(403).json({
            status: 403, message: 'you\'are not allowed'
        });
    }
}


const likePost = async (req, res) => {

    // REQUEST: POST ID FROM PARAMS AND USER ID FROM DATA 

    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { likedBy: req.body.userId } },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


const dislikePost = async (req, res) => {
    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            {
                $pull: {
                    likedBy: req.body.userId
                }
            },
            {
                new: true
            }
        );
        res.send(result);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}

const comment = async (req, res) => {
    try {
        const value = { content: req.body.content, postedBy: req.body.userId };
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { comments: value } },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


const userPosts = async (req, res) => {
    try {
        const blah = await Posts.find({
            postedBy: req.body.posterId
        });
        res.send(blah);
    } catch (error) {
        res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


module.exports = {
    postValidation,
    homeFeed,
    newPost,
    allPosts,
    likePost,
    dislikePost,
    comment,
    userPosts
};