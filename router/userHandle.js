const router = require('express').Router();

const { profile,
    follow,
    unfollow
} = require('../middlewares/user');

router.post(
    '/follow/:followId',
    follow
);
router.post(
    '/unfollow/:followId',
    unfollow
);
router.post(
    '/profile/',
    profile
);

module.exports = router;
