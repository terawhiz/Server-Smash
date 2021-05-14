const express = require('express');


const Users = require('../models/User');
const Posts = require('../models/Posts');


const router = express.Router();

// NEW POST ROUTE 
router.post('/new', async (req, res) => {

    // request -->
    //     "userId": user id of the user,
    //     "content ": content of the post

    const newPost = new Posts({
        postedBy: req.body.userId,
        content: req.body.content,
        comments: [],
        likedBy: [],
    });
    try {
        const savedPost = await newPost.save();
        res.send(savedPost);
    } catch (error) {
        res.send(error).status(400);
    }
});

// GET ALL POSTS ROUTE 
router.get('/getPosts', async (req, res) => {
    const allPosts = await Posts.find().populate('postedBy', '_id');
    res.send(allPosts).status(200);
});


// LIKE A POST ROUTE 
router.post('/like/:postId', async (req, res) => {

    // REQUEST: POST ID FROM PARAMS AND USER ID FROM DATA 

    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { likedBy: req.body.userId } },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.send(error).status(400);
    }
});


// DISLIKE A POST ROUTE 
router.post('/dislike/:postId', async (req, res) => {

    // REQUEST --> POST ID FROM THE URL PARAMETER AND USER ID FROM THE REQYUEST BODY 

    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $pull: { likedBy: req.body.userId } },
            { new: true }
        );
        res.send(result);
    } catch (error) {
        res.send(error).status(400);
    }
});


// COMMENT ON A POST ROUTE 
router.post('/comment/:postId', async (req, res) => {

    // REQUEST --> POST ID FROM THE URL PARAMETER
    //             USER ID AND COMMENT VALUE FROM THE REQUEST BODY 

    try {
        const value = { content: req.body.value, postedBy: req.body.userId };
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { comments: value } },
            { new: true }
        );
        // console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error).status(400);
    }
});

router.post('/homeFeed', async (req, res) => {
    // GIMME YOUR UESR ID AND ME GIVE YOU POSTS
    try {
        const result = await Users.findById(req.body.userId);
        const following = result.following;

        const sendData = await Promise.all(following.map(async (userId) => {
            return Posts.find({ postedBy: userId });
        }));


        res.send(sendData).status(200);
    } catch (error) {
        res.send(error.message).status(404);
    }
});


module.exports = router;