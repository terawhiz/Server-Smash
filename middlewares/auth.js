const jwt = require('jsonwebtoken');
const Users = require('../models/User');


const registerValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


const register = async (req, res) => {

    // EMAIL CHECK 
    const emailExist = await Users.findOne({ email: req.body.email });

    if (emailExist) return res.send('User already exists').status(400);

    // USERNAME CHECK 
    const usernameExist = await Users.findOne({ username: req.body.username });
    if (usernameExist) return res.status(400).json({
        error: true,
        message: 'Username already exists'
    });

    user = new Users({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        profileUrl: `${process.env.MEDIA_BASE_URL}:${process.env.PORT}/_dsfjhsdjfh/users/default.jpg`
    });
    try {
        const savedUser = await user.save();
        res.status(201).json({
            error: false,
            message: 'user registered successfully',
            redirect: '/login'
        });
    } catch (error) {
        res.status(400).send({
            error: true,
            message: error.message
        });
    }
}


const loginValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        });
    }
}


const authJwt = async (req, res, next) => {
    try {
        const token = req.headers["x-access-token"];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, decoded) => {
            if (!error) {
                if (decoded.id === req.body.userId) {
                    req.userId = decoded.id;
                    return next();
                } else {
                    return res.json({ error: true, message: 'something went wrong' });
                }

            } else {
                return res.status(401).json({
                    error: true,
                    message: error.message
                });
            }
        });
    } catch (error) {
        return res.status(400).json({
            error: true,
            message: error.message
        })
    }
}


const login = async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return res.status(401).json({
        error: true,
        message: 'User not found'
    });

    if (user.password === req.body.password) {
        const token = jwt.sign({
            id: user._id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: 1800
        });
        res.status(200).cookie('auth_token', token).json({
            error: false, message: 'you are logged in'
        });
    } else {
        res.status(401).json({
            error: true,
            message: 'pasword doesn\'t match'
        });
    }

}


module.exports = {
    registerValidation,
    loginValidation,
    authJwt,
    register,
    login
};