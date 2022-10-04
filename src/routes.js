var express = require('express');
var fbController = require('./facebook.controller');
var dfTester = require('./tests/dialogflow.test.js');
var tester = require('./tests/prospect-product.test');
const Routes = express.Router();

Routes.get("/", function (req, res) {
    res.send("Se ha desplegado de manera exitosa myFirstChatbot :D");
});


Routes.get("/webhook", fbController.verifyWebhookConnection);
Routes.post("/webhook", fbController.captureEvent);

Routes.post("/test/dialogflow", dfTester.TestDialogFlowConnection);

Routes.post("/test/save-prospect", tester.TestSaveProspect);
Routes.post("/test/save-comment", tester.TestSaveCommentAboutProduct);
Routes.get("/test/promotion", tester.TestGetProductsInPromotion);
Routes.get("/test/product-info", tester.TestGetProductInfo);
Routes.get("/test/products", tester.TestGetProducts);

module.exports = Routes;