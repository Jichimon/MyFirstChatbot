const Client = require('./../models/client.model');
const Prospect = require('./../models/prospect.model');
const Product = require('./../models/product.model');

exports.saveClient = async (prospect, clientInfo) => {

    if (!clientInfo || !prospect) {
        return "No se han enviado todos los datos requeridos";
    }

    var email = clientInfo.email;
    if (!Client.validateEmail(email)) {
        return "El email no cumple con el formato";   
    }

    var existentProspect = await Prospect.findByPersonId(prospectPersonId);
    
    var client = new Client({
        email: clientInfo.email,
        prospect: existentProspect
    });

    var res = await Client.add(client);

    if (!res)  return "No se pudo agregar como cliente.";

    return "Se agregó a " + existentProspect.firstName + " como un nuevo cliente a la base de datos";
}