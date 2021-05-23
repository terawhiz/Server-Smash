const yup = require('yup');

const postSchema = new yup.object({
    content: yup.string().required(),
    postedBy: yup.string().required()
});

module.exports.postSchema = postSchema;