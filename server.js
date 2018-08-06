const express = require('express');
const app = express();
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/webdev-summer2-mongo');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:4200");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'any string'
}));


app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

function setSession(req, res) {
    const name = req.params['name'];
    req.session[name] = req.params['value'];
    res.send(req.session);
}

function getSession(req, res) {
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}


require('./services/user.service.server')(app);
require('./services/section.service.server')(app);


app.listen(3000);