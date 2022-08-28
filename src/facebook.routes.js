var express = require('express');
var controller = require('./facebook.controller');
const Routes = express.Router();

Routes.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa myFirstChatbot :D");
});


Routes.get("/webhook", controller.verifyWebhookConnection);
Routes.post("/webhook", controller.captureEvent);


module.exports = Routes;