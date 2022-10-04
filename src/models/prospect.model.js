var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Assessment = require('./assessment.model');
const Inquire = require('./inquire.model');




const validateEmail = function(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
};

const prospectModel = new Schema({
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    email: {
        type: String,
        trim: true,
        required: [true, 'El email es obligatorio'],
        lowercase: true,
        unique: true,
        validate: [validateEmail, 'Por favor, ingrese un email Válido'],
        match: [/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/]
    },
    phone: {
        type: String
    }
});



prospectModel.methods.makeAssessment= async (product, points, comment) => {
    var assessment = new Assessment({
        points: points,
        comment: comment || "",
        product: product,
        prospect: this,
        lastTime: Date.now()
    });

    var assessmentAlreadyMade = await Assessment.findByProspectAndProduct(this, product);
    if(assessmentAlreadyMade) {

        assessmentAlreadyMade.points = points;
        assessmentAlreadyMade.comment = comment;
        assessmentAlreadyMade.lastTime = Date.now();

        await assessmentAlreadyMade.save();
        return assessmentAlreadyMade;
    }

    await assessment.save();
    return assessment;
}


prospectModel.methods.makeInquire = async (product) => {
    
    var inquireAlreadyMade = await Inquire.findByProspectAndProduct(this, product);
    
    if (inquireAlreadyMade) {
        inquireAlreadyMade.count = inquireAlreadyMade.count + 1;
        inquireAlreadyMade.lastTime = Date.now();

        await inquireAlreadyMade.save();
        return inquireAlreadyMade;
    }

    var inquire = new Inquire({
        count: 1,
        product: product,
        prospect: this,
        lastTime: Date.now()
    });

    await inquire.save();
    return inquire;
}


prospectModel.methods.toString = () => {
    return 'name: ' + this.name + ' | email: ' + this.email + ' | phone: ' + this.phone;
}


prospectModel.statics.add = function (aProspect, callback) {
    this.create(aProspect, callback);
}

prospectModel.statics.findByName = async function (aName) {
    return this.findOne({ name: aName }).exec();
}

prospectModel.statics.findByEmail = async function (anEmail) {
    return this.findOne({ email: anEmail }).exec();
}

prospectModel.statics.ValidateEmail = validateEmail;


module.exports = mongoose.model('Prospect', prospectModel);