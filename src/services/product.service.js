const Promotion = require('./../models/promotion.model');
const Outlet = require('./../models/outlet.model');
const Product = require('./../models/product.model');
const Prospect = require('./../models/prospect.model');

exports.getProductInfo = async (productName, prospect) => {

    if (!productName || !prospect) {
        return "No se han enviado todos los datos requeridos";
    }

    var product = await Product.findByName(productName);
    if (!product) {
        return "El producto no está disponible en el catálogo";
    }

    var dbProspect = await Prospect.findByPersonId(prospect.id);
    if (!dbProspect) {
        return "El prospecto no existe";
    }
    await dbProspect.makeInquire(product);
    
    return product.toString();
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

