const express = require('express');
const path = require('path');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const homework1Index = require('./routes/homework1/index');
const homework1Users = require('./routes/homework1/users');
const homework1Countries = require('./routes/homework1/countries');
const homework1Contests = require('./routes/homework1/contests');
const homework1Razor = require('./routes/homework1/razor');

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/scripts', express.static(path.join(__dirname, 'node_modules')));

app.use('/hw1', homework1Index);
app.use('/hw1/users', homework1Users);
app.use('/hw1/countries', homework1Countries);
app.use('/hw1/contests', homework1Contests);
app.use('/hw1/razor', homework1Razor);

module.exports = app;
