// MODULES
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// APP 
dotenv.config();
const app = express();


// MIDDLEWARES
const authRoute = require('./router/userAuth');


// MONGODB CONNECT 
mongoose.connect("mongodb://127.0.0.1:27017/stacksmash", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('DB CONNECTED');
});

app.use(express.json());
app.use('/api/user', authRoute);



// PORT listen
app.listen(2000, () => {
    console.log('LIstening on port 2000...');
});

