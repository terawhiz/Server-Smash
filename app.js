// MODULES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const cors = require('cors');

// APP 
const app = express();


// IMPORT MIDDLEWARES
const authRoute = require('./router/userAuth');
const userRoute = require('./router/userHandle');
const postRoute = require('./router/userPost');
const userMedia = require('./router/userMedia');
const { authJwt } = require('./middlewares/auth');


// MONGODB CONNECT 
mongoose.connect("mongodb://127.0.0.1:27017/stacksmash", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB CONNECTED');
});
mongoose.set('useFindAndModify', false);


// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use(compression());
app.use('/_dsfjhsdjfh', express.static(__dirname + '/_dsfjhsdjfh'));
app.use('/api/auth', authRoute);
app.use('/api/user', authJwt, userRoute);
app.use('/api/post', authJwt, postRoute);
app.use('/api/media', userMedia);



// PORT listen
const port = process.env.PORT;
app.listen(port, '0.0.0.0', () => {
    console.log(`Listening on port ${port}...`);
});

