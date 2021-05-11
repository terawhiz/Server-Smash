const Joi = require('joi');

// REGISTER VALIDATION 
const registerValidation = function (data) {
    const schema = new Joi.object({
        username: Joi.string().alphanum().min(4).max(30),
        name: Joi.string().alphanum().max(256),
        email: Joi.string().email(),
        password: Joi.string(),
    });

    return schema.validate(data);
}


// LOGIN VALIDATION 
const loginValidation = function (data) {
    const schema = new Joi.object({
        username: Joi.string().alphanum().min(4).max(30),
        password: Joi.string(),
    });

    return schema.validate(data);
}


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;