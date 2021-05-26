const router = require('express').Router();
const Posts = require('../models/Posts');
const {
    postValidation,
    homeFeed,
    newPost,
    allPosts,
    likePost,
    dislikePost,
    comment,
    userPosts,
} = require('../middlewares/post');
const { postSchema } = require('../validations/postValidation');


// ROUTES
router.post('/homeFeed', homeFeed);
router.post('/new', postValidation(postSchema), newPost);
router.get('/getPosts', allPosts);
router.post('/like/:postId', likePost);
router.post('/dislike/:postId', dislikePost);
router.post('/comment/:postId', comment);
router.post('/userPosts', userPosts);



module.exports = router;