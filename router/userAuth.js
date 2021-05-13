const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');


const Users = require('../models/User');
const { registerValidation, loginValidation } = require('../middlewares/userValidate');

dotenv.config();


const router = express.Router();

// REGISTRATION API ROUTE
router.post('/register', async (req, res) => {
    // DATA VALIDATOIN
    const { error } = registerValidation(req.body);
    if (error) return res.send({ message: error.details[0].message }).status(400);

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
        res.send(savedUser).status(201);
    } catch (error) {
        res.send(error).status(400);
    }
});

// LOGIN API ROUTE 
router.post('/login', async (req, res) => {

    // DATA VALIDATION 
    const { error } = loginValidation(req.body);
    if (error) return res.send({ message: error.details[0].message }).status(400);

    const user = await Users.findOne({ username: req.body.username });
    if (!user) return res.send('User not found').status(401);

    if (user.password === req.body.password) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
        res.cookie('auth_token', token).status(200).send('YOU ARE LOGGED IN');
    } else {
        res.send('WRONG PASSWORD').status(401);
    }

});



module.exports = router;
