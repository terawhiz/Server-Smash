const jwt = require('jsonwebtoken');

const registerValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).send(error);
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
                if (decoded.devIsHere) {
                    req.admin = true;
                }
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


module.exports = {
    registerValidation,
    loginValidation,
    authJwt
};