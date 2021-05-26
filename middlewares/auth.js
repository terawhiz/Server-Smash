const jwt = require('jsonwebtoken');
const Users = require('../models/User');


const registerValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).send(error);
    }
}


const register = async (req, res) => {

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
}


const loginValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).send(error);
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
                    return res.json({ auth: 'false', message: 'something went wrong' });
                }

            } else {
                return res.send(error);
            }
        });
    } catch (error) {
        return res.status(400).send(error)
    }
}


const login = async (req, res) => {
    const user = await Users.findOne({ username: req.body.username });
    if (!user) return res.send('User not found').status(401);

    if (user.password === req.body.password) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: 1800 });
        res.status(200).cookie('auth_token', token).send({ auth: true, message: 'you are logged in' });
    } else {
        res.send('WRONG PASSWORD').status(401);
    }

}


module.exports = {
    registerValidation,
    loginValidation,
    authJwt,
    register,
    login
};