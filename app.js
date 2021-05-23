// MODULES
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// APP 
const app = express();


// IMPORT MIDDLEWARES
const authRoute = require('./router/userAuth');
const userRoute = require('./router/userHandle');
const postRoute = require('./router/userPost');


// MONGODB CONNECT 
mongoose.connect("mongodb://127.0.0.1:27017/stacksmash", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB CONNECTED');
});
mongoose.set('useFindAndModify', false);


// MIDDLEWARES
app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/post', postRoute);



// PORT listen
app.listen(2000, '0.0.0.0', () => {
    console.log('LIstening on port 2000...');
});

