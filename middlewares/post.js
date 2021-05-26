const Users = require('../models/User');
const Posts = require('../models/Posts');


const postValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).send(error);
    }
}


const homeFeed = async (req, res) => {
    // GIMME YOUR UESR ID AND ME GIVE YOU POSTS
    try {
        const result = await Users.findById(req.body.userId);
        const following = result.following;

        const sendData = await Promise.all(following.map(async (userId) => {
            return Posts.find({ postedBy: userId });
        }));


        res.status(404).send(sendData);
    } catch (error) {
        res.status(404).send(error.message);
    }
}


const newPost = async (req, res) => {

    // request -->
    //     "userId": user id of the user,
    //     "content ": content of the post

    const post = new Posts({
        postedBy: req.body.userId,
        content: req.body.content,
        comments: [],
        likedBy: [],
    });
    try {
        const savedPost = await post.save();
        res.send(savedPost);
    } catch (error) {
        res.send(error).status(400);
    }
}

const allPosts = async (req, res) => {
    if (req.admin) {
        const allPosts = await Posts.find();
        res.status(201).send(allPosts);
    } else {
        res.status(403).json({ status: 403, message: 'you\'are not allowed' });
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
        res.status(400).send(error.message);
    }
}


const dislikePost = async (req, res) => {

    // REQUEST --> POST ID FROM THE URL PARAMETER AND USER ID FROM THE REQYUEST BODY 

    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $pull: { likedBy: req.body.userId } },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const comment = async (req, res) => {

    // REQUEST --> POST ID FROM THE URL PARAMETER
    //             USER ID AND COMMENT VALUE FROM THE REQUEST BODY 

    try {
        const value = { content: req.body.content, postedBy: req.body.userId };
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { comments: value } },
            { new: true }
        );
        // console.log(result);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
}


const userPosts = async (req, res) => {
    try {
        const blah = await Posts.find({ postedBy: req.body.posterId });
        res.send(blah);
    } catch (error) {
        res.send(error.message);
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