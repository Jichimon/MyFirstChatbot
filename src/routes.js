var express = require('express');
var controller = require('./controller');
const Routes = express.Router();

Routes.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa myFirstChatbot :D");
});

module.exports = Routes;