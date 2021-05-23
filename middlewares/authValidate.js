

const registerValidation = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).send(error);
    }
}

const loginValidation = () => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        return next();
    } catch (error) {
        return res.status(400).send(error);
    }
}


module.exports.registerValidation = registerValidation;

module.exports.loginValidation = loginValidation;