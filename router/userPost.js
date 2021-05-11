const express = require('express');


const Posts = require('../models/Posts');


const router = express.Router();

router.post('/new', async (req, res) => {
    const newPost = new Posts({
        postedBy: req.body.user,
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

router.get('/getPosts', async (req, res) => {
    const allPosts = await Posts.find();
    res.send(allPosts).status(200);
});

router.post('/like/:postId', async (req, res) => {
    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $push: { likedBy: req.body.userId } },
            { new: true }
        );
        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error).status(400);
    }
});

router.post('/dislike/:postId', async (req, res) => {
    try {
        const result = await Posts.findByIdAndUpdate(
            req.params.postId,
            { $pull: { likedBy: req.body.userId } },
            { new: true }
        );
        console.log(result);
        res.send(result);
    } catch (error) {
        res.send(error).status(400);
    }
});


module.exports = router;