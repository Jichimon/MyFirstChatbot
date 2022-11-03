const TargerUser = require('../models/targetUser.model');
const Product = require('./../models/product.model');

exports.saveClient = async (prospect, clientInfo) => {

    if (!clientInfo || !prospect) {
        return "No se han enviado todos los datos requeridos";
    }

    var email = clientInfo.email;
    if (!TargerUser.validateEmail(email)) {
        return "El email no cumple con el formato";   
    }

    var existentProspect = await TargerUser.findByPersonId(prospectPersonId);
    
    var client = new TargerUser({
        email: clientInfo.email,
        prospect: existentProspect
    });

    var res = await TargerUser.add(client);

    if (!res)  return "No se pudo agregar como cliente.";

    return "Muchas gracias " + existentProspect.firstName + ", hemos registrado sus datos.";
}