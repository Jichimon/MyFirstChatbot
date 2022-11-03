var mongoose = require('mongoose');
var Schema = mongoose.Schema;


const inquireModel = new Schema({
    message: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Message',
        required: [true, 'message is mandatory']         
    },
    product: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'Product',
        required: [true, 'product is mandatory']         
    },
    targetUser: {
        type: mongoose.Schema.Types.ObjectId  ,
        ref: 'TargetUser',
        required: [true, 'targetUser is mandatory']         
    }
});


inquireModel.methods.toString = () => {
    return 'product: ' + this.product.name + 
    ' | targetUser: ' + this.targetUser.name + 
    ' | message: ' + this.messgea.content;
}

inquireModel.statics.add = function (aInquire, callback) {
    this.create(aInquire, callback);
}

inquireModel.statics.findByTargetUserAndProduct = async function (aTargetUser, aProduct) {
    return await this.findOne({ targetUser: aTargetUser._id, product: aProduct._id }).exec();
}

inquireModel.statics.findByTargetUser = async function (aTargetUser) {
    return await this.find({ targetUser: aTargetUser }).exec();
}

inquireModel.statics.findByProduct = async function (aProduct) {
    return await this.find({ product: aProduct }).exec();
}

module.exports = mongoose.model('Inquire', inquireModel);