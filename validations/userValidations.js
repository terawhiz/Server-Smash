const yup = require('yup');
// REGISTER VALIDATION 
const registerSchema = new yup.object({
    username: yup.string().min(4).max(30).required(),
    name: yup.string().max(256).required(),
    email: yup.string().email().required(),
    password: yup.string().min(10).max(40).required()
});


// LOGIN VALIDATION 
const loginSchema = new yup.object({
    username: yup.string().min(4).max(30).required("username is required"),
    password: yup.string().min(10).max(40).required("password is required"),
});

module.exports.registerSchema = registerSchema;
module.exports.loginSchema = loginSchema;

