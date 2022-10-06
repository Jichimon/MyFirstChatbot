const Prospect = require('./../models/prospect.model');
const Product = require('./../models/product.model');
const Assessment = require('./../models/assessment.model');
const Client = require('./../models/client.model');

exports.saveCommentAboutProduct = async (productName, prospect, comment, points) => {
    
    if (!productName || !prospect || !comment || !points) {
        return "No se han enviado todos los datos requeridos";
    }
    

    var product = await Product.findByName(productName);
    if (!product) {
        return "El producto no está disponible en el catálogo";
    }

    var prospectFirstName = prospect.first_name;
    var prospectPersonId = prospect.id;
 
    var existentProspect = await Prospect.findByPersonId(prospectPersonId);
    if (!existentProspect) {
        console.log("Prospect doesnt exists yet. Creating prospect.")
        existentProspect = await createNewProspect(prospect);
        if (!existentProspect)  return "No se pudo crear el prospecto";
        console.log("Prospect created.");
    }

    var assessment = await existentProspect.makeAssessment(product, points, comment);
    console.log("Assessment Made: " + assessment.toString());

    return "Gracias " + prospectFirstName + "! tu comentario se ha guardado! Eso no ayudará mucho a brindarte un mejor servicio.";
};

exports.saveProspect = async (prospect) => {
    
    if (!prospect) { return "No se han enviado todos los datos requeridos" }

    var existentProspect = await Prospect.findByPersonId(prospect.id);
    if (existentProspect) {
        return "Ya existe un prospecto con este usuario :(";
    }

    var res = await createNewProspect(prospect);

    return res == null ? "Se creó el prospecto en base de datos para " + prospect.first_name + "!" : "No se creó el prospecto.";
}


exports.createNewProspect = async (prospect) => {
    if (!prospect) return null;

    var nuevo = new Prospect({
        personId:   prospect.id,
        firstName:  prospect.first_name,
        lastName:   prospect.last_name,
        profilePhoto: prospect.profile_pic
    }); 
    return await Prospect.add(nuevo);
}

