const router = require('express').Router();

const { followingInc, followersInc, followingDec, followersDec } = require('../middlewares/userMiddleware');

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

        res.send({ followingDecrement, followersDecrement }).status(200);
    } catch (error) {
        console.log('ERROR');
        res.send(error).status(400);
    }
});


module.exports = router;
