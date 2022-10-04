var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const assessmentModel = new Schema({
    points: {
        type: Number,
        required: [true, 'points is mandatory']
    },
    comment: {
        type: String,
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'product date is mandatory']         
    },
    prospect: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prospect',
        required: [true, 'prospect date is mandatory']         
    },
    lastTime: {
        type: Date
    }
});


assessmentModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | prospect: ' + this.prospect.name + 
    ' | points: ' + this.points + 
    ' | count: ' + this.count;
}

assessmentModel.statics.add = function (anAssessment, callback) {
    this.create(anAssessment, callback);
}

assessmentModel.statics.findByProspectAndProduct = async function (aProspect, aProduct) {
    return await this.findOne({ prospect: aProspect, product: aProduct }).exec();
}

assessmentModel.statics.findByProspect = async function (aProspect) {
    return await this.find({ prospect: aProspect }).exec();
}

assessmentModel.statics.findByProduct = async function (aProduct) {
    return await this.find({ product: aProduct }).exec();
}

module.exports = mongoose.model('Assessment', assessmentModel);