require('dotenv').config({path:'./config/.env'});
require('./config/database');

const express = require('express');
const app = express();

app.use(require('body-parser').json());
app.use(require('cors')({credentials: true, origin: process.env.LOCAL_HOST}));

//app.use(require('./routes/users'));
app.use(require(`./routes/products.js`))

app.listen(process.env.SERVER_PORT, () => {
    console.log('Connected to port: ' + process.env.SERVER_PORT);
});

app.use((req, res, next) => {
    next(createError(404));
});

app.use((err, req, res, next) => {
    console.log(err.message);
    if(!err.statusCode){
        err.statusCode = 500;
    }
    res.status(err.statusCode).send(err.message);
});
