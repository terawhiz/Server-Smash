const Joi = require('joi');
// REGISTER VALIDATION 
const registerSchema = new Joi.object({
        username: Joi.string().alphanum().min(4).max(30).required(),
        name: Joi.string().alphanum().max(256).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(10).max(40)
    });


// LOGIN VALIDATION 
const loginSchema = new Joi.object({
        username: Joi.string().alphanum().min(4).max(30),
        password: Joi.string().min(10).max(40),
    });

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;