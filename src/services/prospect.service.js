const Prospect = require('./../models/prospect.model');
const Product = require('./../models/product.model');

exports.saveCommentAboutProduct = async (productName, email, prospectName, comment, points) => {
    
    if (!productName || !email || !comment || !points) {
        return "No se han enviado todos los datos requeridos";
    }
    
    if (!Prospect.ValidateEmail(email)) { return "No se ha enviado una correcta dirección de correo" }

    var product = await Product.findByName(productName);
    if (!product) {
        return "El producto no está disponible en el catálogo";
    }
 
    var prospect = await Prospect.findByEmail(email);
    if (!prospect) {
        console.log("Prospect doesnt exists yet. Creating prospect.")
        prospect = await createNewProspect(email, prospectName);
        if (!prospect)  return "No se pudo crear el prospecto";
        console.log("Prospect created.");
    }

    var assessment = await prospect.makeAssessment(product, points, comment);
    console.log("Assessment Made: " + assessment.toString());

    return "Gracias " + prospectName + "! tu comentario se ha guardado! Eso no ayudará mucho a brindarte un mejor servicio.";
};

exports.saveProspect = async (email, name, phone) => {
    
    if (!name || !email) { return "No se han enviado todos los datos requeridos" }
    if (!Prospect.ValidateEmail(email)) { return "No se ha enviado una correcta dirección de correo" }

    var prospect = await Prospect.findByEmail(email);
    if (prospect) {
        return "Ya existe un prospecto con este usuario!";
    }

    var res = await createNewProspect(email, name, phone);

    return res == null ? "Se creó el prospecto!" : "No se creó el prospecto.";
}


createNewProspect = async (email, name, phone) => {
    var nuevo = new Prospect({
        email,
        name,
        phone
    });

    var response = null;
    await nuevo.save().then((o) => { response = o });
    return response;
}

