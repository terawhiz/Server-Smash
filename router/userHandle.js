const router = require('express').Router();
const multer = require('multer');
const { authJwt } = require('../middlewares/auth');
const {
    profile,
    follow,
    unfollow,
    profileUpload
} = require('../middlewares/user');


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




router.post(
    '/profileUpload',
    upload.single('profilePhoto'),
    profileUpload
);


router.use(authJwt);

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
