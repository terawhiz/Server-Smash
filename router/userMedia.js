const router = require('express').Router();
const multer = require('multer');
const Users = require('../models/User');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '_dsfjhsdjfh/users')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage
});


router.post('/user', upload.single('profilePhoto'), async (req, res) => {
    try {
        // http://127.0.0.1:2000/_dsfjhsdjfh/users/default.jpg
        const url = `${process.env.MEDIA_BASE_URL}:${process.env.PORT}/${req.file.path}`
        const blah = await Users.findByIdAndUpdate(req.body.userId, { profileUrl: url });
        await res.send(blah);
    } catch (error) {
        res.send(error);
    }
});



module.exports = router;