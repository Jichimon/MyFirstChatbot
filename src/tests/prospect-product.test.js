const productService = require('./../services/product.service');
const prospectService = require('./../services/prospect.service');

exports.TestGetProducts = async function (req, res, next) {
    var response;
    try {
        response = await productService.getAllProducts();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}


exports.TestGetProductsInPromotion = async function (req, res, next) {
    var response;
    try {
        response = await productService.getProductsInCurrentPromotion();
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}


exports.TestGetProductInfo = async function (req, res, next) {
    const product = req.body.productName;
    const prospect = req.body.prospect;
    var response;
    try {
        response = await productService.getProductInfo(product, prospect);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}


exports.TestSaveCommentAboutProduct = async function (req, res, next) {
    const productName = req.body.productName;
    const prospect = req.body.prospect;
    const comment = req.body.comment;
    const points = req.body.points;
    var response;
    try {
        response = await prospectService.saveCommentAboutProduct(
            productName, 
            prospect, 
            comment, 
            points);
        res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}


exports.TestSaveProspect = async function (req, res, next) {
    const message = "deprecated";
    try {
        res.status(200).send(message);
    } catch (error) {
        console.log(error);
        res.status(402).send(error.details);
    }
}