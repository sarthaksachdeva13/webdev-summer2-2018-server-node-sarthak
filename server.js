const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://sarthaksachdeva:webdevsummer2@ds147589.mlab.com:47589/webdev_summer2_mongo');
// mongoose.connect('mongodb://localhost/webdev-summer2-mongo');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get('/', (req, res) =>
    res.send('Hello World'));

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://sarthakangular.herokuapp.com");
    // res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string',
    maxAge: Date.now() + (30 * 1800000),
}));


require('./services/user.service.server')(app);
require('./services/section.service.server')(app);
require('./services/quiz.service.server')(app);
require('./services/submission.service.server')(app);


app.listen(process.env.PORT || 3000);

