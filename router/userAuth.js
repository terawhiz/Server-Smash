
// IMPORTING MODULES
require('dotenv').config();
const router = require('express').Router();


// IMPORTING MODELS AND MIDDLEWARES
const {
    registerValidation,
    loginValidation,
    register,
    login
} = require('../middlewares/auth');
const {
    registerSchema,
    loginSchema
} = require('../validations/userValidations');


// AUTHENTICATION ROUTES
router.post(
    '/register',
    registerValidation(registerSchema),
    register
);
router.post(
    '/login',
    loginValidation(loginSchema),
    login
);



module.exports = router;
