const router = require('express').Router();

const { followingInc, followersInc, followingDec, followersDec, profile } = require('../middlewares/user');

router.post('/follow/:followId', async (req, res) => {
    try {

        const followingIncrement = await followingInc(req.userId, req.params.followId);
        const followersIncrement = await followersInc(req.userId, req.params.followId);

        res.send({ followersIncrement, followingIncrement }).status(200);
    } catch (error) {
        console.log('ERROR');
        res.send(error).status(400);
    }
});

router.post('/unfollow/:followId', async (req, res) => {
    try {
        const followingDecrement = await followingDec(req.userId, req.params.followId);
        const followersDecrement = await followersDec(req.userId, req.params.followId);

        res.send({ followersDecrement, followingDecrement }).status(200);
    } catch (error) {
        console.log('ERROR');
        res.send(error).status(400);
    }
});


router.post('/profile/', async (req, res) => {
    try {
        const profileId = req.body.profileId;
        const result = await profile(profileId);
        res.send(result);
    } catch (error) {
        res.send(error.message);
    }
});

module.exports = router;
