// MODULES
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// APP 
dotenv.config();
const app = express();


// MIDDLEWARES
const authRoute = require('./router/userAuth');
const postRoute = require('./router/userPost');


// MONGODB CONNECT 
mongoose.connect("mongodb://127.0.0.1:27017/stacksmash", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB CONNECTED');
});
mongoose.set('useFindAndModify', false);

app.use(express.json());
app.use(cors());
app.use('/api/user', authRoute);
app.use('/api/post', postRoute);



// PORT listen
app.listen(2000, () => {
    console.log('LIstening on port 2000...');
});

