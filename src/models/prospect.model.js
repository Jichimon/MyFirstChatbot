var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Assessment = require('./assessment.model');
const Inquire = require('./inquire.model');

const prospectModel = new Schema({
    personId: {
        type: String,
        unique: true,
        required: [true, 'personId is mandatory']
    },
    firstName: {
        type: String,
        required: [true, 'name is mandatory']
    },
    lastName: {
        type: String,
        required: [true, 'name is mandatory']
    },
    profilePhoto: {
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


prospectModel.methods.makeInquire = async (personId, product) => {
    

    var prospect = await prospectModel.statics.findByPersonId(personId);
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


prospectModel.methods.toString = () => {
    return 'name: ' + this.firstName + " " + this.lastName ;
}


prospectModel.statics.add = async function (aProspect) {
    console.log("Guardando el prospect: " + aProspect.toString() + ".");
    return await aProspect.save();
}


prospectModel.statics.findByPersonId = async function (anId) {
    console.log("Buscando prospect con id: " + anId + ".");
    return await this.findOne({ personId: anId }).exec();
}


module.exports = mongoose.model('Prospect', prospectModel);