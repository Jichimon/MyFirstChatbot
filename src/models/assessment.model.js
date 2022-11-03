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
    targetUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TargetUser',
        required: [true, 'targetUser date is mandatory']         
    },
    message: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Message',
        required: [true, 'message date is mandatory']         
    }
});


assessmentModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | targetUser: ' + this.targetUser.name + 
    ' | message: ' + this.message.content + 
    ' | points: ' + this.points + 
    ' | count: ' + this.count;
}

assessmentModel.statics.add = function (anAssessment, callback) {
    this.create(anAssessment, callback);
}

assessmentModel.statics.findByTargetUserAndProduct = async function (aTargetUser, aProduct) {
    return await this.findOne({ TargetUser: aTargetUser, product: aProduct }).exec();
}

assessmentModel.statics.findByTargetUser = async function (aTargetUser) {
    return await this.find({ TargetUser: aTargetUser }).exec();
}

assessmentModel.statics.findByProduct = async function (aProduct) {
    return await this.find({ product: aProduct }).exec();
}

module.exports = mongoose.model('Assessment', assessmentModel);