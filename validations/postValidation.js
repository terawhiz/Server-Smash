const yup = require('yup');

const postSchema = new yup.object({
    content: yup.string().required(),
    postedBy: yup.string(),
    imgUrl: yup.string()
});

module.exports.postSchema = postSchema;