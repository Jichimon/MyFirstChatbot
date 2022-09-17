var express = require('express');
var fbController = require('./facebook.controller');
var dfTester = require('./tests/dialogflow.test.js');
const Routes = express.Router();

Routes.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa myFirstChatbot :D");
});


Routes.get("/webhook", fbController.verifyWebhookConnection);
Routes.post("/webhook", fbController.captureEvent);

Routes.post("/test/dialogflow", dfTester.TestDialogFlowConnection);

module.exports = Routes;