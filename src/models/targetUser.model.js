var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Assessment = require('./assessment.model');
const Inquire = require('./inquire.model');

const validateEmail = function(email) {
    const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.([a-zA-Z]{2,4})+$/;
    return re.test(email);
};

const targetUser = new Schema({
    docNumber: {
        type: String,
        unique: true,
        required: false
    },
    birthDate: {
        type: Date,
        required: [true, 'birth date is mandatory']
    },
    userType: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'UserType',
        required: [true, 'user type date is mandatory']         
    },
    Address: {
        type: String,
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
    },
    name: {
        type: String,
        required: [true, 'name is mandatory']
    },
    profilePictureUrl: {
        type: String
    }
});

targetUser.methods.makeAssessment= async (prospect, product, points, comment) => {
    var assessment = new Assessment({
        points: points,
        comment: comment || "",
        product: product,
        prospect: prospect,
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


targetUser.methods.makeInquire = async (prospect, product) => {

    var inquireAlreadyMade = await Inquire.findByProspectAndProduct(prospect, product);
    
    if (inquireAlreadyMade) {
        inquireAlreadyMade.count = inquireAlreadyMade.count + 1;
        inquireAlreadyMade.lastTime = Date.now();

        await inquireAlreadyMade.save();
        return inquireAlreadyMade;
    }

    var inquire = new Inquire({
        count: 1,
        product: product,
        prospect: prospect,
        lastTime: Date.now()
    });

    await inquire.save();
    return inquire;
}

targetUser.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | prospect: ' + this.prospect.name + 
    ' | count: ' + this.count;
}

targetUser.statics.add = async function (aClient) {
    return this.create(aClient).exec();
}

targetUser.statics.findByProspect = async function (aProspect) {
    return this.find({ prospect: aProspect }).exec();
}

targetUser.statics.findByPersonId = async function (anId) {
    console.log("Buscando prospect con id: " + anId + ".");
    return await this.findOne({ id: anId }).exec();
}

targetUser.statics.findByDocNumber = async function (aDocNumber) {
    return this.findOne({ docNumber: aDocNumber }).exec();
}

targetUser.statics.ValidateEmail = validateEmail;

module.exports = mongoose.model('TargetUser', targetUser);