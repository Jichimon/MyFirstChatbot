const Promotion = require('./../models/promotion.model');
const Outlet = require('./../models/productOutlet.model');
const Product = require('./../models/product.model');
const TargetUser = require('./../models/targetUser.model');

exports.getProductInfo = async (productName, targetUser) => {

    if (!productName || !targetUser) {
        return "No se han enviado todos los datos requeridos";
    }

    var product = await Product.findByName(productName);
    console.log('el producto es: ');
    console.log(product);
    if (!product) {
        return "El producto no está disponible en el catálogo";
    }

    var dbProspect = await TargetUser.findByPersonId(targetUser.id);
    if (!dbProspect) {
        return "El prospecto no existe";
    }
    await dbProspect.makeInquire(dbProspect, product);
    
    return Product.toString(product);
}


exports.getAllProducts = async () => {
    var products = await Product.find({});
    var response = "Productos disponibles: ";
    products.forEach( p => {
        response = response + p.name + ", ";
    });

    return response;
}


exports.getProductsInCurrentPromotion = async () => {
    var promotion = await Promotion.getCurrentPromotion();
    var response = "La promoción actual es: " + promotion.name + ". ";
    response = response + "Cuenta con los siguientes productos: ";
    var productIDs = [];

    var outletsFromPromotion = await Outlet.findByPromotion(promotion);
    outletsFromPromotion.forEach(outlet => {
        var productID = outlet.product;
        productIDs.push(productID);
    });

    response = response + await getProductNameList(productIDs) + " ... Elige el que te parezca mejor!";
    return response;
}


getProductNameList = async (productIDs) => {
    var response = "";
    for (let index = 0; index < productIDs.length; index++) {
        const p = productIDs[index];
        var product = await Product.findById(p);
        response = response + product.name + ", ";
    }
    return response;
}

