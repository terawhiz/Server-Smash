const router = require('express').Router();
const multer = require('multer');
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
const { authJwt } = require('../middlewares/auth');


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(
            null,
            '_dsfjhsdjfh/posts'
        )
    },
    filename: (req, file, cb) => {
        cb(
            null,
            Date.now() + '-' + file.originalname
        )
    }
});

const upload = multer({
    storage: storage
});


// ROUTES
router.post(
    '/new',
    upload.single('postImg'),
    postValidation(postSchema),
    newPost
);

router.use(authJwt);
router.post(
    '/homeFeed',
    homeFeed
);
router.get(
    '/getPosts',
    allPosts
);
router.post(
    '/like/:postId',
    likePost
);
router.post(
    '/dislike/:postId',
    dislikePost
);
router.post(
    '/comment/:postId',
    comment
);
router.post(
    '/userPosts',
    userPosts
);



module.exports = router;