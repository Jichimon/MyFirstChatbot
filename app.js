var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
var routes = require('./src/routes');

var app = express();

//configurando CORS
app.use( cors({
    origin: '*',
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: 'content-type, Authorization, Origin, X-Requested-With, Accept'
  }));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//------ routes ----------
app.use('/', routes);


module.exports = app;