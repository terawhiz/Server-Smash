const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const Users = require('../models/User');
const { registerValidation, loginValidation } = require('../middlewares/authValidate');
const { registerSchema, loginSchema } = require('../validations/userValidations');



dotenv.config();


const router = express.Router();

// REGISTRATION API ROUTE
router.post('/register', registerValidation(registerSchema), async (req, res) => {

    // EMAIL CHECK 
    const emailExist = await Users.findOne({ email: req.body.email });

    if (emailExist) return res.send('User already exists').status(400);

    // USERNAME CHECK 
    const usernameExist = await Users.findOne({ username: req.body.username });
    if (usernameExist) return res.send('Username already exists').status(400);

    user = new Users({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    try {
        const savedUser = await user.save();
        // console.log(savedUser);
        res.status(201).send(savedUser);
    } catch (error) {
        res.send(error).status(400);
    }
});

// LOGIN API ROUTE 
router.post('/login', loginValidation(loginSchema), async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return res.send('User not found').status(401);

    if (user.password === req.body.password) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 1800 });
        res.status(200).cookie('auth_token', token).send({ auth: true, message: 'you are logged in' });
    } else {
        res.send('WRONG PASSWORD').status(401);
    }

});



module.exports = router;
