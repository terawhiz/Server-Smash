const router = require('express').Router();

const { followingInc, followersInc, followingDec, followersDec, profile } = require('../middlewares/userMiddleware');

router.post('/follow/:followId', async (req, res, next) => {
    try {

        const followingIncrement = await followingInc(req.body.userId, req.params.followId);
        const followersIncrement = await followersInc(req.body.userId, req.params.followId);

        res.send({ followersIncrement, followingIncrement }).status(200);
    } catch (error) {
        console.log('ERROR');
        res.send(error).status(400);
    }
});

router.post('/unfollow/:followId', async (req, res, next) => {
    try {

        const followingDecrement = await followingDec(req.body.userId, req.params.followId);
        const followersDecrement = await followersDec(req.body.userId, req.params.followId);

        res.send({ followersDecrement, followingDecrement }).status(200);
    } catch (error) {
        console.log('ERROR');
        res.send(error).status(400);
    }
});


router.get('/profile/:userId', async (req, res) => {
    try {
        const result = await profile(req.params.userId);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
