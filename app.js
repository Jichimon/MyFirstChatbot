var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');

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


// Ruta de la pagina index
app.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa myFirstChatbot :D");
});


module.exports = app;