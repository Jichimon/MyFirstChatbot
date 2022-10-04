var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
var routes = require('./src/routes');
const mongodb = require('./src/providers/mongodb.connection');

var app = express();

//Conectando a MongoDB
mongodb.Connect();
//Cargando los seeders
var seeder = require('./src/seeders/main.seeder');
seeder.loadSeeds();

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